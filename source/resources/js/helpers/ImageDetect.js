import axios from "axios";
import AiGenarate from "~/services/AiGenarate";
import {MAX_SIZE_HEIGHT, MAX_SIZE_WIDTH} from "../constants/constant";
export const decodeBase64 = (base64Data) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = `data:image/png;base64,${base64Data}`; // Replace with your Base64 data format
        image.addEventListener('load', () => {
            resolve(image.src)
        });
        image.addEventListener('error', (error) => {
            reject(error); // Handle potential errors during loading
        });
    })
}

export const dataURItoFile = (dataURI) => {
    // Split the data URI into components
    const parts = dataURI.split(';');
    const contentType = parts[0].split(':')[1];
    const base64Data = parts[1].split(',')[1];
    // Decode the base64 data using a more robust approach
    const decodedData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    // Create a blob directly from the decoded data (modern browsers)
    if (typeof Blob !== 'undefined' && Blob.prototype.constructor === Blob) {
        return new Blob([decodedData], { type: contentType });
    }

    // Fallback for older browsers using ArrayBuffer and Blob constructor
    const buffer = new ArrayBuffer(decodedData.length);
    const view = new Uint8Array(buffer);
    view.set(decodedData);
    const blob = new Blob([buffer], { type: contentType });
    const file = new File([blob], 'file.png', { type: 'image/png' });

    return file;
};

export const convertToImage = (strokesData, width = 354, height = 315) => {
    if (!strokesData || strokesData.length < 100) {
        return
    }
    const parsedStrokes = JSON.parse(strokesData);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // canvas.setAttribute("width", 450);
    // canvas.setAttribute("height", 400);
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    ctx.lineWidth = parsedStrokes[parsedStrokes.length - 1].width || 1; // Default to 1 if not specified
    // Default to black if not specified
    ctx.fillStyle = "#000000";
    ctx.lineCap = parsedStrokes[0].lineCap || "round";
    ctx.lineJoin = parsedStrokes[0].lineJoin || "round";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 5. Draw each stroke
    parsedStrokes.forEach((stroke, index) => {
        ctx.beginPath();
        ctx.moveTo(stroke.from.x, stroke.from.y);

        if (
            stroke.coordinates &&
            Array.isArray(stroke.coordinates) &&
            stroke.coordinates.length > 0
        ) {
            ctx.strokeStyle = parsedStrokes[index].color == '#000000' ? '#FFFFFF' : "#000000";
            const dashCoordinates = stroke.coordinates;
            ctx.moveTo(dashCoordinates[0].x, dashCoordinates[0].y);
            for (let i = 1; i < dashCoordinates.length; i++) {
                ctx.lineTo(dashCoordinates[i].x, dashCoordinates[i].y);
            }
        } else {
            console.warn(
                "Empty or invalid dashCoordinates for stroke:",
                stroke
            );
        }

        ctx.stroke();
    });

    const imageDataUrl = canvas.toDataURL("image/png");

    const blob = dataURItoFile(imageDataUrl)
    const file = new File([blob], 'file.png', { type: 'image/png' });
    return file
}

export const translateVnToEng = async (text) => {
    if (text) {
        try {
            const res = await AiGenarate.translateVnToEng(text);
            if (res.status == 200) {
                return res.data.text;
            } else {
                return ''
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        return ''
    }
}

export const validFile = (file) => {
    const ext = ['.jpg', '.jpeg', '.png'];
    return ext.some(el => file.endsWith(el));
}

export const isInValidFileSize = async (file, size) => {
    return new Promise((resolve) => {
        let error = false;
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            if (img.width * img.height > size.width * size.height) {
                error = true;
            }
            resolve(error);
        };
    });
}

export const convertFileToBase64 = async (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
            console.log(reader.result)
        };
    })
}