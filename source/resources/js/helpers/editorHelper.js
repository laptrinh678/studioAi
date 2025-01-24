export const settingTextArea = (textarea, areaPosition, textNode) => {
    const fontStyle = textNode.fontStyle()
    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
    textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
    textarea.style.fontSize = textNode.fontSize() + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    textarea.style.textDecoration = textNode.textDecoration()
    textarea.style.textWrap = 'nowrap'
    if (fontStyle.includes('bold')) textarea.style.fontWeight = 'bold'
    if (fontStyle.includes('italic')) textarea.style.fontStyle = 'italic'

    // reset height
    textarea.style.height = 'auto';
    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 3 + 'px';

    textarea.focus();

    return textarea
}

export const handleDbClickTextNode = (props) => {
    // Ẩn textNode và transformNode
    props.textNode.hide();
    props.tr.hide();

    // Hiển thị textarea trên canvas ở vị trí textNode
    const textPosition = props.textNode.absolutePosition();

    // set vị trí cho textarea
    const scrollTop = document.documentElement.scrollTop
    const areaPosition = {
        x: props.stage.container().getBoundingClientRect().left + textPosition.x,
        y: props.stage.container().getBoundingClientRect().top + textPosition.y + scrollTop,
    };

    // style cho textarea
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    settingTextArea(textarea, areaPosition, props.textNode)

    function removeTextarea() {
        textarea.parentNode.removeChild(textarea);
        window.removeEventListener('click', handleOutsideClick);
        props.textNode.show();
        props.tr.setAttrs({})
        props.tr.show();
        props.tr.forceUpdate();
    }

    function setTextareaWidth(newWidth) {
        if (!newWidth) {
            // set width for placeholder
            newWidth = props.textNode.placeholder.length * props.textNode.fontSize();
        }
        // some extra fixes on different browsers
        const isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
        );
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isSafari || isFirefox) {
            newWidth = Math.ceil(newWidth);
        }

        textarea.style.width = newWidth + 'px';
    }

    textarea.addEventListener('keydown', function (e) {
        // hide on enter but don't hide on shift + enter
        if (e.keyCode === 13 && !e.shiftKey) {
            props.textNode.text(textarea.value);
            removeTextarea();
        }
        // on esc do not set value back to node
        if (e.keyCode === 27) {
            removeTextarea();
        }
    });

    textarea.addEventListener('keydown', function (e) {
        const scale = props.textNode.getAbsoluteScale().x;
        setTextareaWidth(props.textNode.width() * scale);
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + props.textNode.fontSize() + 'px';
    });

    function handleOutsideClick(e) {
        if (e.target !== textarea) {
            props.textNode.text(textarea.value);
            removeTextarea();
        }
    }

    setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
    });
}

export const setToolbar = (toolbarOptions, textNode) => {
    // Set lại toolbar theo những config của textNode
    // Set align
    if (textNode.align() === 'left') toolbarOptions.align = 0
    else if (textNode.align() === 'center') toolbarOptions.align = 1
    else toolbarOptions.align = 2

    // Set font style
    const fontStyle = textNode.fontStyle()
    toolbarOptions.bold = fontStyle.includes('bold')
    toolbarOptions.italic = fontStyle.includes('italic')

    // Set text decorate
    const textDecorate = textNode.textDecoration()
    toolbarOptions.underline = textDecorate.includes('underline')
    toolbarOptions.strike = textDecorate.includes('line-through')

    // Set font size
    toolbarOptions.fontSize = textNode.fontSize()

    // Set color
    toolbarOptions.color = textNode.fill() === 'black' ? 'rgba(0, 0, 0, 1)' : textNode.fill()

    // Set font family
    toolbarOptions.fontFamily = textNode.fontFamily()
}

export const removeActiveTextNode = (transformNode) => {
    const textNode = transformNode._nodes[0]
    const tr = transformNode

    tr.setAttrs({borderEnabled: false, enabledAnchors: []})
    textNode.on('mouseout', () => {
        tr.setAttr('borderEnabled', false)
    })
}

export const keepTextNodeInCanvas = (target, node, canvasWidth, canvasHeight) => {
    if (target.attrs.x < 0) node.x(0)
    if (target.attrs.y < 0) node.y(0)
    if (target.attrs.x > canvasWidth) node.x(Math.abs(canvasWidth - target.textWidth))
    if (target.attrs.y > canvasHeight) {
        const textRow = target.textArr.length
        const textHeight = target.textHeight * textRow
        node.y(Math.abs(canvasHeight - textHeight))
    }
}

export const keepImgNodeInCanvas = (target, node, canvasWidth, canvasHeight) => {
    if (target.attrs.x < 0) node.x(0)
    if (target.attrs.y < 0) node.y(0)
    if (target.attrs.x > canvasWidth) node.x(Math.abs(canvasWidth - target.attrs.width))
    if (target.attrs.y > canvasHeight) node.y(Math.abs(canvasHeight - target.attrs.height))
}

export const setEventToArtist = (props) => {
    props.artist.on('transform', function () {
        props.artist.setAttrs({
            width: props.artist.width() * props.artist.scaleX(),
            height: props.artist.height() * props.artist.scaleY(),
            scaleX: 1,
            scaleY: 1
        })
    })

    // Giữ ảnh của phát thanh viên luôn nằm trong canvas
    props.artist.on('transformend', function () {
        if (props.artist.height() > props.canvasHeight) {
            const crop = props.artist.height() - props.canvasHeight
            props.artist.height(props.canvasHeight)
            props.artist.width(props.artist.width() - crop)
            props.artist.y(0)
        } else {
            if (props.canvasHeight - props.artist.y() < props.artist.height()) props.artist.y(props.canvasHeight - props.artist.height())
        }

        if (props.artist.width() > props.canvasWidth) {
            const crop = props.artist.width() - props.canvasWidth.width
            props.artist.width(props.canvasWidth)
            props.artist.height(props.artist.height() - crop)
            props.artist.x(0)
        } else {
            if (props.canvasWidth - props.artist.x() < props.artist.width()) props.artist.x(props.canvasWidth - props.artist.width())
        }
    })

    // props.artist.on('dragend', function () {
    //     if (props.artist.x() < 0) props.artist.x(0)
    //     if (props.artist.y() < 0) props.artist.y(0)
    //     if (props.canvasHeight - props.artist.y() < props.artist.height()) props.artist.y(props.canvasHeight - props.artist.height())
    //     if (props.canvasWidth - props.artist.x() < props.artist.width()) props.artist.x(props.canvasWidth - props.artist.width())
    // })

    props.artist.on('dragmove', function () {
        if (props.artist.x() < 0) props.artist.x(0)
        if (props.artist.y() < 0) props.artist.y(0)
        if (props.canvasHeight - props.artist.y() < props.artist.height()) props.artist.y(props.canvasHeight - props.artist.height())
        if (props.canvasWidth - props.artist.x() < props.artist.width()) props.artist.x(props.canvasWidth - props.artist.width())
    })
}

export const setEventToImageDecorate = (props) => {
    props.image.draggable(true)
    props.image.name('imageDecorate')

    props.image.on('transform', function () {
        props.image.setAttrs({
            width: props.image.width() * props.image.scaleX(),
            height: props.image.height() * props.image.scaleY(),
            scaleX: 1,
            scaleY: 1
        })
    })

    // Di chuột vào node
    props.image.on('mouseover', () => {
        props.tr.setAttr('borderEnabled', true)
    })

    // Di chuột ra khỏi node
    props.image.on('mouseout', () => {
        if (!props.tr.hasName('imageDecorateTransformerSelected')) {
            props.tr.setAttr('borderEnabled', false)
        }
    })
}

export const setEventToTextNode = (props) => {
    // Di chuột vào node
    props.node.on('mouseover', () => {
        props.tr.setAttr('borderEnabled', true)
    })

    // Di chuột ra khỏi node
    props.node.on('mouseout', () => {
        if (!props.tr.hasName('textNodeTransformerSelected')) {
            props.tr.setAttr('borderEnabled', false)
        }
    })
}