import { useState } from 'react';
import { Satellite, Shield, Zap, BarChart2, Globe2, AlertTriangle, Upload } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { ImageAnalysis } from './components/ImageAnalysis';
import { DetectionResult } from './types';

// Mock function to simulate AI processing
const processImage = async (file: File): Promise<DetectionResult> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Create object URL for demonstration
  const processedImage = URL.createObjectURL(file);

  return {
    debris: [
      {
        id: '1',
        type: 'Debris',
        size: 2.5,
        riskLevel: 'High',
        position: [0, 0, 0],
        velocity: [0.1, 0.1, 0],
        confidence: 0.95,
        boundingBox: { x: 50, y: 50, width: 250, height: 170 }
      },
      {
        id: '2',
        type: 'Debris',
        size: 1.2,
        riskLevel: 'Medium',
        position: [-3, 2, 1],
        velocity: [-0.1, 0, 0.1],
        confidence: 0.85,
        boundingBox: { x: 400, y: 300, width: 150, height: 100 }
      }
    ],
    timestamp: Date.now(),
    collisionProbability: 0.75,
    processedImage
  };
};

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [activeSection, setActiveSection] = useState<'home' | 'detection'>('home');

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true);
    setOriginalImage(URL.createObjectURL(file));
    
    try {
      const result = await processImage(file);
      setDetectionResult(result);
    } catch (error) {
      console.error('Error processing image:', error);
      // Handle error appropriately
    } finally {
      setIsProcessing(false);
    }
  };

  if (activeSection === 'detection') {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Satellite className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-white">Space Debris Detection</h1>
            </div>
            <button
              onClick={() => setActiveSection('home')}
              className="rounded-lg border border-gray-600 px-4 py-2 text-white hover:bg-gray-800"
            >
              Back to Home
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-6">
              <h2 className="mb-4 flex items-center text-xl font-semibold text-white">
                <Upload className="mr-2 h-6 w-6 text-blue-500" />
                Upload Image
              </h2>
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>

            {isProcessing ? (
              <div className="flex h-[400px] items-center justify-center rounded-lg bg-gray-800 p-6">
                <div className="text-center">
                  <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  <p className="text-gray-400">Processing image...</p>
                </div>
              </div>
            ) : (
              originalImage && detectionResult && (
                <div className="rounded-lg bg-gray-800 p-6">
                  <h2 className="mb-4 text-xl font-semibold text-white">Analysis Results</h2>
                  <ImageAnalysis
                    originalImage={originalImage}
                    detectionResult={detectionResult}
                  />
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {detectionResult.debris.map((debris) => (
                      <div
                        key={debris.id}
                        className="rounded-lg bg-gray-700 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{debris.type}</span>
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              debris.riskLevel === 'High'
                                ? 'bg-red-500/20 text-red-500'
                                : debris.riskLevel === 'Medium'
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-green-500/20 text-green-500'
                            }`}
                          >
                            {debris.riskLevel} Risk
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-400">
                          <p>Size: {debris.size}m</p>
                          <p>Confidence: {(debris.confidence * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"
            alt="Space background"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Satellite className="h-16 w-16 text-blue-500" />
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Space Debris Detection System
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
              Advanced AI-powered system for detecting and tracking space debris to ensure satellite and spacecraft safety.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => setActiveSection('detection')}
                className="rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Get Started
              </button>
              <button className="rounded-lg border border-gray-600 px-6 py-3 text-white hover:border-gray-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Advanced Detection Features</h2>
            <p className="mt-4 text-gray-400">Comprehensive tools for space debris monitoring and analysis</p>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Shield className="h-8 w-8 text-blue-500" />,
                title: 'Real-time Monitoring',
                description: 'Continuous tracking and analysis of space debris in real-time with advanced AI algorithms.',
              },
              {
                icon: <Zap className="h-8 w-8 text-yellow-500" />,
                title: 'Instant Alerts',
                description: 'Immediate notification system for potential collision risks and emergency situations.',
              },
              {
                icon: <BarChart2 className="h-8 w-8 text-green-500" />,
                title: 'Advanced Analytics',
                description: 'Detailed analysis of debris trajectories, sizes, and potential impact scenarios.',
              },
              {
                icon: <Globe2 className="h-8 w-8 text-purple-500" />,
                title: 'Global Coverage',
                description: 'Comprehensive monitoring of Earth\'s orbit with multiple detection systems.',
              },
              {
                icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
                title: 'Risk Assessment',
                description: 'Sophisticated risk evaluation system for debris impact probability.',
              },
              {
                icon: <Satellite className="h-8 w-8 text-indigo-500" />,
                title: 'Satellite Protection',
                description: 'Specialized tracking for protecting active satellites and spacecraft.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-800 p-8 transition-transform hover:scale-105"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-4 text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-gray-800 bg-gray-900 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '99.9%', label: 'Detection Accuracy' },
              { value: '<50ms', label: 'Response Time' },
              { value: '24/7', label: 'Monitoring' },
              { value: '50k+', label: 'Objects Tracked' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-500">{stat.value}</div>
                <div className="mt-2 text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center space-x-2">
              <Satellite className="h-6 w-6 text-blue-500" />
              <span className="text-lg font-semibold text-white">Space Debris Detection</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Space Debris Detection System. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
