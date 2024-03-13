import { MAIN_API_BASE_URL } from "@/constants/environtment";

export default function convertImageSrcUtil(imageSrc: string | null) {
    if (imageSrc === null || !imageSrc) {
        return "/images/default-image-placeholder.webp";
    }
    if (imageSrc.startsWith("http://") || imageSrc.startsWith("https://")) {
        return imageSrc;
    }

    if (imageSrc.startsWith("/")) {
        return `${MAIN_API_BASE_URL}${imageSrc}`;
    }

    return imageSrc;
}
