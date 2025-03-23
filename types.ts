export interface DebrisData {
  id: string;
  type: 'Satellite' | 'Rocket Body' | 'Debris';
  size: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  position: [number, number, number];
  velocity: [number, number, number];
  confidence: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface DetectionResult {
  debris: DebrisData[];
  timestamp: number;
  collisionProbability: number;
  processedImage?: string;
}