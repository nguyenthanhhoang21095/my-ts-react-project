const formatCurrency  = (number: number):(string | number) => {
    if (isNaN(number)) return number;
    else return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export {
    formatCurrency,
}