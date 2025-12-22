"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import { RotateCcw, RotateCw, ZoomIn } from "lucide-react";

export default function ImageEditor({ isOpen, onClose, imageSrc, onSave }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    try {
      // Create canvas to crop the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();

      image.onload = () => {
        // Set canvas size to cropped area
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        // Apply rotation if needed
        if (rotation !== 0) {
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);
        }

        // Draw the cropped image
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        // Convert to blob
        canvas.toBlob((blob) => {
          const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
          onSave({
            file: croppedFile,
            preview: canvas.toDataURL('image/jpeg')
          });
          onClose();
        }, 'image/jpeg', 0.95);
      };

      image.src = imageSrc;
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };


  const handleRotationChange = (direction) => {
    setRotation(prev => prev + (direction === 'left' ? -90 : 90));
  };

  const resetImage = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Cropper */}
          <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              cropShape="round"
              showGrid={false}
            />
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Zoom */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <ZoomIn className="w-4 h-4" />
                  Zoom
                </label>
                <span className="text-sm text-muted-foreground">{zoom.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Rotation */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Rotation</label>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRotationChange('left')}
                  className="flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  Left
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRotationChange('right')}
                  className="flex items-center gap-1"
                >
                  <RotateCw className="w-4 h-4" />
                  Right
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetImage}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
