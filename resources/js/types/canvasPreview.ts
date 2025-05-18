import { PixelCrop } from 'react-image-crop';

// utils/canvasPreview.ts
export function canvasPreview(image: HTMLImageElement, canvas: HTMLCanvasElement, crop: PixelCrop) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use natural dimensions for accurate cropping
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
    );
}
