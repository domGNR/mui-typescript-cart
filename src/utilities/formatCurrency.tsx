const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency:'EUR',
    style:'currency',
}) 

export const formatCurrency = (n:number) => {
    return CURRENCY_FORMATTER.format(n)
}
