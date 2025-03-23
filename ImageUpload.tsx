import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files[0];

    if (imageFile) {
      if (!imageFile.type.match('image.*')) {
        setError('Please upload an image file');
        return;
      }
      setError(null);
      onImageUpload(imageFile);
    }
  }, [onImageUpload]);

  return (
    <div
      className={`relative rounded-lg border-2 border-dashed p-8 transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-50/10'
          : 'border-gray-600 hover:border-gray-500'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <Upload className="h-12 w-12 text-gray-400" />
        <div className="space-y-2">
          <p className="text-xl font-medium text-gray-300">
            Drop satellite images here
          </p>
          <p className="text-sm text-gray-500">
            Supports JPG, PNG, and TIFF formats
          </p>
        </div>
      </div>
      {error && (
        <div className="mt-4 flex items-center justify-center text-red-500">
          <AlertCircle className="mr-2 h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
}