export function ShimmerText(text: string, className = ""): HTMLSpanElement {
    const span = document.createElement("span");

    span.textContent = text;
    span.className = `shimmer-text ${className}`;

    return span;
}