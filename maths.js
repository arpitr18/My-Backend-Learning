export function ADD(a, b) {
    return a + b;
}
export function SUBTRACT(a, b) {
    return a - b;
}
function MULTIPLY(a, b) {
    return a * b;
}   
function DIVIDE(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
} 
