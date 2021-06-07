const formatCurrency = (number: number): (string | number) => {
    if (isNaN(number)) return number;
    else return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

const sumPrice = (arr):number => {
    return arr.length && arr.map(item => item.finalPrice * item.quantity).reduce((acc, cur) => {
        return acc + cur;
    }, 0)
}

export {
    formatCurrency,
    sumPrice
}