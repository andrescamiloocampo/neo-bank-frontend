export const clearNumericInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    event.target.value = value.replace(/^0+(?=\d)/, "");
}