import { AlertTriangle, Bell, Shield } from 'lucide-react';
import { DetectionResult } from '../types';

interface AlertSystemProps {
  detectionResult: DetectionResult | null;
}

export function AlertSystem({ detectionResult }: AlertSystemProps) {
  if (!detectionResult) return null;

  const riskLevel = 
    detectionResult.collisionProbability > 0.7 ? 'Critical' :
    detectionResult.collisionProbability > 0.4 ? 'High' :
    detectionResult.collisionProbability > 0.2 ? 'Medium' : 'Low';

  const riskColor =
    riskLevel === 'Critical' ? 'bg-red-500' :
    riskLevel === 'High' ? 'bg-orange-500' :
    riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="rounded-lg bg-gray-800/50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
          <h3 className="text-xl font-semibold text-white">Collision Alert System</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-gray-400" />
          <Shield className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-gray-700/50 p-4">
          <div className="mb-2 text-sm text-gray-400">Risk Level</div>
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${riskColor}`} />
            <div className="text-lg font-medium text-white">{riskLevel}</div>
          </div>
        </div>

        <div className="rounded-md bg-gray-700/50 p-4">
          <div className="mb-2 text-sm text-gray-400">Collision Probability</div>
          <div className="text-lg font-medium text-white">
            {(detectionResult.collisionProbability * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}