export function timeAgo(dateString: string): string[] {
    const date = new Date(dateString);
    const now = new Date();

    const secondsAgo = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutesAgo = Math.round(secondsAgo / 60);
    const hoursAgo = Math.round(minutesAgo / 60);
    const daysAgo = Math.round(hoursAgo / 24);
    const monthsAgo = Math.round(daysAgo / 30);
    const yearsAgo = Math.round(monthsAgo / 12);

    if (secondsAgo < 60) {
        return [String(secondsAgo), `Second${secondsAgo > 1 ? "s" : ""} ago`];
    } else if (minutesAgo < 60) {
        return [`${minutesAgo}`, `Minute${minutesAgo > 1 ? "s" : ""} ago`];
    } else if (hoursAgo < 24) {
        return [`${hoursAgo}`, `Hour${hoursAgo > 1 ? "s" : ""} ago`];
    } else if (daysAgo < 30) {
        return [`${daysAgo}`, `Day${daysAgo > 1 ? "s" : ""} ago`];
    } else if (monthsAgo < 12) {
        return [`${monthsAgo}`, `Month${monthsAgo > 1 ? "s" : ""} ago`];
    } else {
        return [`${yearsAgo}`, `Year${yearsAgo > 1 ? "s" : ""} ago`];
    }
}
