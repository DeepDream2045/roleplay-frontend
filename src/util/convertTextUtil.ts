export function snakeCaseToTitle(snakeCaseStr: string): string {
    // Split the string by underscore, then map each segment to capitalize the first letter
    // and join them back together with spaces.
    return snakeCaseStr
        .split("_")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" ");
}
