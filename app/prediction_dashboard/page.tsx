'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
  Droplets,
  Thermometer,
  Gauge,
  CloudRain,
  AlertTriangle,
  CheckCircle,
  Activity,
  Clock,
  RefreshCw,
  Wifi,
  WifiOff,
  ArrowLeft
} from 'lucide-react'

interface SensorData {
  soil_moisture: number
  rainfall: number
  temperature: number
  humidity: number
  distance: number
}

interface PredictionResult {
  prediction: number
  message: string
}

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData>({
    soil_moisture: 2048,
    rainfall: 2048,
    temperature: 25.0,
    humidity: 60.0,
    distance: 150.0
  })
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  // Flask API URL - Update this to match your Flask server
  const API_URL = 'http://localhost:5000/predict'

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleReturnToDashboard = () => {
    router.push('/')
  }

  const fetchPrediction = async (data: SensorData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post(API_URL, data, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.data && typeof response.data.prediction !== 'undefined') {
        setPrediction(response.data)
        setLastUpdate(new Date())
        setIsConnected(true)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error: any) {
      console.error('Error fetching prediction:', error)
      setError(error.message || 'Failed to connect to server')
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }

  const handleManualPrediction = () => {
    if (!loading) {
      fetchPrediction(sensorData)
    }
  }

  const updateSensorData = (field: keyof SensorData, value: number) => {
    if (!isNaN(value) && isFinite(value)) {
      setSensorData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  // Simulate real-time data updates (replace with actual ESP32 data)
  useEffect(() => {
    const interval = setInterval(() => {
      const simulatedData = {
        soil_moisture: Math.floor(Math.random() * 4095),
        rainfall: Math.floor(Math.random() * 4095),
        temperature: 20 + Math.random() * 15,
        humidity: 40 + Math.random() * 40,
        distance: 50 + Math.random() * 200
      }
      setSensorData(simulatedData)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    if (!prediction) return 'bg-white/10 backdrop-blur-xl border-white/20'
    return prediction.prediction === 1
      ? 'bg-red-500/20 backdrop-blur-xl border-red-400/30'
      : 'bg-green-500/20 backdrop-blur-xl border-green-400/30'
  }

  const getStatusIcon = () => {
    if (!prediction) return <Activity className="w-8 h-8 text-blue-400" />
    return prediction.prediction === 1
      ? <AlertTriangle className="w-8 h-8 text-red-400" />
      : <CheckCircle className="w-8 h-8 text-green-400" />
  }

  const getStatusMessage = () => {
    if (error) return 'Connection Error'
    if (!prediction) return 'No prediction available'
    return prediction.message || 'Prediction received'
  }

  const getStatusDescription = () => {
    if (error) return error
    if (!prediction) return 'Click "Get Prediction" to analyze current sensor data'
    return `Confidence: ${prediction.prediction === 1 ? 'High Risk' : 'Low Risk'}`
  }

  const calculateSoilMoisturePercentage = (value: number) => {
    const percentage = (1 - (value / 4095)) * 100
    return isNaN(percentage) ? '0.0' : Math.max(0, Math.min(100, percentage)).toFixed(1)
  }

  const calculateRainfallMM = (value: number) => {
    const mm = (1 - (value / 4095)) * 243
    return isNaN(mm) ? '0.0' : Math.max(0, mm).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-900 relative overflow-hidden">
      {/* Dark Rainy Background */}
      <div className="absolute inset-0">
        {/* Dark Storm Clouds */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-800/60 to-transparent"></div>
        <div className="absolute top-10 left-1/4 w-96 h-32 bg-gradient-to-b from-gray-700/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/3 w-80 h-24 bg-gradient-to-b from-gray-700/50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-5 left-2/3 w-72 h-28 bg-gradient-to-b from-gray-700/30 to-transparent rounded-full blur-3xl"></div>
        
        {/* Rain Drops */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-400/60 to-transparent animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.8 + Math.random() * 0.4}s`
            }}
          />
        ))}
        
        {/* Heavy Rain Drops */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`heavy-${i}`}
            className="absolute w-1 h-12 bg-gradient-to-b from-blue-300/80 to-transparent animate-rain-heavy"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.2 + Math.random() * 0.6}s`
            }}
          />
        ))}
        
        {/* Misty Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 via-transparent to-gray-900/30"></div>
        
        {/* Dark Gradient Orbs (static, no animation) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl"></div>
        
        {/* Floating Particles (static, no animation) */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"></div>
      </div>

      {/* Mouse Follow Effect */}
      <div 
        className="fixed w-96 h-96 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md shadow-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  DripTect
                </h1>
                <p className="text-sm text-gray-300 font-medium">Flood Prediction System</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className={`flex items-center space-x-3 px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                isConnected 
                  ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                  : 'bg-red-500/20 text-red-300 border border-red-400/30'
              }`}>
                {isConnected ? (
                  <Wifi className="w-4 h-4" />
                ) : (
                  <WifiOff className="w-4 h-4" />
                )}
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
              {lastUpdate && (
                <div className="flex items-center space-x-2 text-sm text-gray-300 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <Clock className="w-4 h-4" />
                  <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pt-32">
        {/* Return to Dashboard Button */}
        <div className="mb-6">
          <button
            onClick={handleReturnToDashboard}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Return to Dashboard</span>
          </button>
        </div>

        {/* Prediction Status */}
        <div className="mb-10">
          <div className={`rounded-2xl border-2 p-8 shadow-lg ${getStatusColor()}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getStatusIcon()}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {getStatusMessage()}
                  </h2>
                  <p className="text-lg text-gray-300">
                    {getStatusDescription()}
                  </p>
                </div>
              </div>
              <button
                onClick={handleManualPrediction}
                disabled={loading}
                className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-lg"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Activity className="w-5 h-5" />
                )}
                <span>{loading ? 'Analyzing...' : 'Get Prediction'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sensor Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {/* Soil Moisture */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-200 hover:bg-white/15">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Gauge className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white">Soil Moisture</h3>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-white">
                {calculateSoilMoisturePercentage(sensorData.soil_moisture)}%
              </div>
              <div className="text-sm text-gray-300 bg-white/10 px-2 py-1 rounded">
                Raw: {sensorData.soil_moisture}
              </div>
              <div className="space-y-2">
                <label htmlFor="soil-moisture" className="block text-sm font-medium text-gray-300">Adjust Level</label>
                <input
                  id="soil-moisture"
                  type="range"
                  min="0"
                  max="4095"
                  value={sensorData.soil_moisture}
                  onChange={(e) => updateSensorData('soil_moisture', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  title="Adjust soil moisture level"
                />
              </div>
            </div>
          </div>

          {/* Rainfall */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-200 hover:bg-white/15">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <CloudRain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">Rainfall</h3>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-white">
                {calculateRainfallMM(sensorData.rainfall)} mm
              </div>
              <div className="text-sm text-gray-300 bg-white/10 px-2 py-1 rounded">
                Raw: {sensorData.rainfall}
              </div>
              <div className="space-y-2">
                <label htmlFor="rainfall" className="block text-sm font-medium text-gray-300">Adjust Level</label>
                <input
                  id="rainfall"
                  type="range"
                  min="0"
                  max="4095"
                  value={sensorData.rainfall}
                  onChange={(e) => updateSensorData('rainfall', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  title="Adjust rainfall level"
                />
              </div>
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-200 hover:bg-white/15">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Thermometer className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="font-semibold text-white">Temperature</h3>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-white">
                {sensorData.temperature.toFixed(1)}°C
              </div>
              <div className="text-sm text-gray-300 bg-white/10 px-2 py-1 rounded">
                Range: 20-35°C
              </div>
              <div className="space-y-2">
                <label htmlFor="temperature" className="block text-sm font-medium text-gray-300">Adjust Level</label>
                <input
                  id="temperature"
                  type="range"
                  min="20"
                  max="35"
                  step="0.1"
                  value={sensorData.temperature}
                  onChange={(e) => updateSensorData('temperature', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  title="Adjust temperature level"
                />
              </div>
            </div>
          </div>

          {/* Humidity */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-200 hover:bg-white/15">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Droplets className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white">Humidity</h3>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-white">
                {sensorData.humidity.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-300 bg-white/10 px-2 py-1 rounded">
                Range: 40-80%
              </div>
              <div className="space-y-2">
                <label htmlFor="humidity" className="block text-sm font-medium text-gray-300">Adjust Level</label>
                <input
                  id="humidity"
                  type="range"
                  min="40"
                  max="80"
                  step="0.1"
                  value={sensorData.humidity}
                  onChange={(e) => updateSensorData('humidity', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  title="Adjust humidity level"
                />
              </div>
            </div>
          </div>

          {/* Distance */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-200 hover:bg-white/15">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white">Distance</h3>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-white">
                {sensorData.distance.toFixed(1)} cm
              </div>
              <div className="text-sm text-gray-300 bg-white/10 px-2 py-1 rounded">
                Range: 50-250 cm
              </div>
              <div className="space-y-2">
                <label htmlFor="distance" className="block text-sm font-medium text-gray-300">Adjust Level</label>
                <input
                  id="distance"
                  type="range"
                  min="50"
                  max="250"
                  step="0.1"
                  value={sensorData.distance}
                  onChange={(e) => updateSensorData('distance', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  title="Adjust distance level"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Connection Instructions - Updated Color Scheme */}
        <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-700/50 rounded-2xl p-8 shadow-lg backdrop-blur-xl">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-amber-800/60 rounded-xl">
              <Wifi className="w-8 h-8 text-amber-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-amber-200 mb-3">Connection Setup</h3>
              <p className="text-amber-100 mb-4 text-lg">
                To connect your ESP32 hardware to this dashboard:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-amber-100 text-base">
                <li className="bg-amber-800/30 px-3 py-2 rounded-lg">
                  Make sure your Flask server (<code className="bg-amber-700/50 px-2 py-1 rounded font-mono">http://localhost:5000</code>) is running.
                </li>
                <li className="bg-amber-800/30 px-3 py-2 rounded-lg">
                  Update the ESP32 code to send POST requests to the <code className="bg-amber-700/50 px-2 py-1 rounded font-mono">/predict</code> endpoint.
                </li>
                <li className="bg-amber-800/30 px-3 py-2 rounded-lg">
                  The dashboard will automatically display predictions and sensor readings.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes rain {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes rain-heavy {
          0% {
            transform: translateY(-100vh) scaleY(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) scaleY(0.5);
            opacity: 0;
          }
        }

        .animate-rain {
          animation: rain linear infinite;
        }

        .animate-rain-heavy {
          animation: rain-heavy linear infinite;
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #6366f1);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #6366f1);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}
