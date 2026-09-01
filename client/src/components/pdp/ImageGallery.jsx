import React, { useState } from 'react';

const ImageGallery = ({ images = [], title = 'Product' }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[600px] no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-20 flex-shrink-0 rounded border overflow-hidden transition-all ${
                selectedImage === img
                  ? 'border-myntra-pink ring-1 ring-myntra-pink'
                  : 'border-gray-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${title} ${idx + 1}`} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      {/* Main High-Res Image with Zoom on Hover */}
      <div
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden cursor-crosshair aspect-[3/4] max-h-[600px]"
      >
        <img
          src={selectedImage || images[0]}
          alt={title}
          className={`w-full h-full object-cover object-top transition-transform duration-200 ${
            isZoomed ? 'scale-150 origin-center' : 'scale-100'
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                }
              : undefined
          }
        />
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
          Hover to Zoom
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
