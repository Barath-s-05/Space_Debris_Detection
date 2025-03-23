import { useRef, useEffect, useState } from 'react';
import { DetectionResult } from '../types';

interface ImageAnalysisProps {
  originalImage: string | null;
  detectionResult: DetectionResult | null;
}

export function ImageAnalysis({ originalImage, detectionResult }: ImageAnalysisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !originalImage || !detectionResult) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = originalImage;
    
    image.onload = () => {
      // Set canvas size to match container width while maintaining aspect ratio
      const containerWidth = canvas.parentElement?.clientWidth || image.width;
      const scale = containerWidth / image.width;
      const width = containerWidth;
      const height = image.height * scale;

      setCanvasSize({ width, height });
      canvas.width = width;
      canvas.height = height;

      let animationPhase = 0;

      const animate = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the original image
        ctx.drawImage(image, 0, 0, width, height);

        // Draw scanning effect
        const scanLineY = (animationPhase * height) % (height * 2);
        const gradient = ctx.createLinearGradient(0, scanLineY - 20, 0, scanLineY);
        gradient.addColorStop(0, 'rgba(0, 149, 255, 0)');
        gradient.addColorStop(1, 'rgba(0, 149, 255, 0.2)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, scanLineY - 20, width, 20);

        // Draw bounding boxes for detected debris
        detectionResult.debris.forEach(debris => {
          if (!debris.boundingBox) return;

          // Scale bounding box coordinates
          const scaledBox = {
            x: debris.boundingBox.x * scale,
            y: debris.boundingBox.y * scale,
            width: debris.boundingBox.width * scale,
            height: debris.boundingBox.height * scale
          };

          // Set style based on risk level with animation
          const alpha = 0.6 + Math.sin(animationPhase * 4) * 0.4;
          ctx.strokeStyle = 
            debris.riskLevel === 'High' ? `rgba(239, 68, 68, ${alpha})` :
            debris.riskLevel === 'Medium' ? `rgba(245, 158, 11, ${alpha})` :
            `rgba(34, 197, 94, ${alpha})`;
          ctx.lineWidth = 2;

          // Draw animated bounding box
          ctx.strokeRect(
            scaledBox.x,
            scaledBox.y,
            scaledBox.width,
            scaledBox.height
          );

          // Draw label background with animation
          const labelHeight = 24;
          const labelWidth = 160;
          const labelY = scaledBox.y - labelHeight - 4;
          
          ctx.fillStyle = `rgba(0, 0, 0, ${0.7 + Math.sin(animationPhase * 4) * 0.3})`;
          ctx.fillRect(scaledBox.x, labelY, labelWidth, labelHeight);

          // Draw label text
          ctx.fillStyle = '#ffffff';
          ctx.font = '14px sans-serif';
          ctx.fillText(
            `${debris.type} (${Math.round(debris.confidence * 100)}%)`,
            scaledBox.x + 8,
            labelY + 16
          );

          // Draw risk indicator dot
          ctx.beginPath();
          ctx.arc(
            scaledBox.x + labelWidth - 16,
            labelY + labelHeight/2,
            4,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fill();
        });

        animationPhase += 0.01;
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();
    };

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [originalImage, detectionResult]);

  if (!originalImage || !detectionResult) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-gray-900">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full object-contain"
      />
      <div className="absolute bottom-4 right-4 rounded bg-gray-800/80 px-3 py-2 text-sm text-gray-300">
        {detectionResult.debris.length} objects detected
      </div>
    </div>
  );
}