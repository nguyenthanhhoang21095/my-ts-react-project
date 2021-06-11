import { clearDataLocal } from "controllers/redux/lib/reducerConfig";

const formatCurrency = (number: number): (string | number) => {
    if (isNaN(number)) return number;
    else return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

const sumPrice = (arr):number => {
    return arr.length && arr.map(item => item.finalPrice * item.quantity).reduce((acc, cur) => {
        return acc + cur;
    }, 0)
}

const clearLocalStorage = () => {
    clearDataLocal("access_token");
    clearDataLocal("refresh_token");
    clearDataLocal("persist:root");
}

export {
    formatCurrency,
    sumPrice,
    clearLocalStorage,
}