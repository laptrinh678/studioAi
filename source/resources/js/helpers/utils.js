import {helpers} from "@vuelidate/validators";

const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const convertBase64 = (base64) => {
    return base64.replace('data:', '').replace(/^.+,/, '')
};

const upperCamelCaseToSnakeCase = (value) => {
    return value
        .replace(/^([A-Z])/, ($1) => $1.toLowerCase())
        .replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
};

const milliseconds = (h = 0, m = 0, s = 0) => (h * 60 * 60 + m * 60 + s) * 1000;
const aphaNumberHalfWidthRegex = /^[ A-Za-z0-9!#$%.@~]*$/;
const passwordRegex = /^[0-9a-zA-Z!#$%.@~]{6,}$/;
const halfWidth = helpers.regex(/[a-zA-Z0-9]/);
const aphaNumberHalfWidth = helpers.regex(aphaNumberHalfWidthRegex);
const emailExt = helpers.regex(/^[a-zA-Z0-9"'+_-]+(?:\.[a-zA-Z0-9_-]+)*@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+))$/);
const phone = helpers.regex(/^[0-9\- ]+$/);
const postCode = helpers.regex(/(^\d{3}-\d{4}$)/);
const katakana = helpers.regex(/^([ァ-ン]|ー|\u3000)+$/);
const address = helpers.regex(/^福岡県福岡市.*$/);
const categoryCode = helpers.regex(/^\d{3}$/);
const procedureCode = helpers.regex(/^[a-zA-Z0-9]{3}$/);
const password = helpers.regex(passwordRegex);

const checkAddressWard = (e) => {
    if(e){
        const ward = '区';
        return !(e.includes(ward) && (e.indexOf(ward) - 6) >= 10);
    }else{
        return true;
    }
}

const requiredPassword = (e) => {
    return !!e;
}

const checkValidatePassword = (e) => {
    if(e){
        if(!passwordRegex.test(e)){
            return false;
        }
    }
    return true;
}


const checkMatchPasswordRequiredConfirm = (passsword, passswordConfirm) => {
    return !((passsword && passswordConfirm) && passsword !== passswordConfirm);
}

const checkMatchPasswordNotRequiredConfirm = (passsword, passswordConfirm) => {
    return !((passsword || passswordConfirm) && passsword !== passswordConfirm);
}

const extractFloat = (text) => {
    const match = text.match(/\d+((\.|,)\d+)?/)
    return match && match[0]
  }

export {
    capitalize,
    convertBase64,
    upperCamelCaseToSnakeCase,
    milliseconds,
    katakana,
    emailExt,
    halfWidth,
    phone,
    postCode,
    address,
    categoryCode,
    procedureCode,
    checkAddressWard,
    password,
    requiredPassword,
    aphaNumberHalfWidth,
    checkValidatePassword,
    checkMatchPasswordRequiredConfirm,
    checkMatchPasswordNotRequiredConfirm,
    extractFloat
};