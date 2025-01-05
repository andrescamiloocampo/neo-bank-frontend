export const formatCurrency = (value:number) => {
    return new Intl.NumberFormat('es-MX').format(value);
}