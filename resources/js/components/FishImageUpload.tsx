import { canvasPreview } from '@/types/canvasPreview';
import { useRef, useState } from 'react';
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );
}
const FishImageUpload = ({ Img }) => {
    const [imgSrc, setImgSrc] = useState('');
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const aspect = 9 / 16;
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImgSrc(reader.result?.toString() || '');
            });
            reader.readAsDataURL(file);
        }
    };
    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, aspect));
    }

    const handleCropComplete = (crop: PixelCrop) => {
        setCompletedCrop(crop);
    };

    const handleAcceptCrop = async () => {
        if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
            // We use canvasPreview as it's much faster than imgPreview.
            canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);

            // Convert canvas to blob
            previewCanvasRef.current.toBlob(
                (blob) => {
                    if (blob) {
                        const croppedFile = new File([blob], 'cropped-image.jpg', {
                            type: 'image/jpeg',
                        });
                        Img(croppedFile);
                        setPreviewUrl(URL.createObjectURL(blob));
                        setImgSrc(''); // Close the crop modal
                    }
                },
                'image/jpeg',
                0.9,
            );
        }
    };
    return (
        <div className="flex flex-col rounded-lg bg-gray-600 p-4">
            <label className="text-lg font-bold text-white">Fish Image</label>
            <input type="file" accept="image/*" className="rounded-lg bg-gray-800 px-4 py-2 text-white" onChange={handleImageChange} />

            {/* Image cropping modal */}
            {imgSrc && (
                <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="max-w-2xl rounded-lg bg-gray-800 p-4">
                        <h2 className="mb-4 text-xl font-bold text-white">Crop Image (9:16 aspect ratio)</h2>
                        <ReactCrop crop={crop} onChange={(c) => setCrop(c)} onComplete={handleCropComplete} aspect={aspect} className="max-h-[80vh]">
                            <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} className="max-h-[70vh]" />
                        </ReactCrop>
                        <div className="mt-4 flex justify-end gap-2">
                            <button type="button" onClick={() => setImgSrc('')} className="rounded bg-red-500 px-4 py-2 text-white">
                                Cancel
                            </button>
                            <button type="button" onClick={handleAcceptCrop} className="rounded bg-blue-500 px-4 py-2 text-white">
                                Accept Crop
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden canvas for cropping */}
            <div className="hidden">
                <canvas ref={previewCanvasRef} />
            </div>

            {previewUrl && !imgSrc && (
                <div className="mt-4">
                    <label className="font-semibold text-white">Preview:</label>
                    <img src={previewUrl} alt="Fish Preview" className="mx-auto mt-2 h-auto max-h-128 max-w-128 rounded-lg border border-gray-400" />
                </div>
            )}
        </div>
    );
};

export default FishImageUpload;
