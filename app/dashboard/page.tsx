'use client'

import { useState, useEffect } from 'react'
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
  RefreshCw
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

  // Flask API URL - Update this to match your Flask server
  const API_URL = 'http://localhost:5000/predict'

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
    if (!prediction) return 'bg-gray-100 text-gray-600 border-gray-200'
    return prediction.prediction === 1
      ? 'bg-red-100 text-red-800 border-red-200'
      : 'bg-green-100 text-green-800 border-green-200'
  }

  const getStatusIcon = () => {
    if (!prediction) return <Activity className="w-6 h-6" />
    return prediction.prediction === 1
      ? <AlertTriangle className="w-6 h-6" />
      : <CheckCircle className="w-6 h-6" />
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Droplets className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">DripTect</h1>
              <span className="text-sm text-gray-500">Flood Prediction System</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
              {lastUpdate && (
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Prediction Status */}
        <div className="mb-8">
          <div className={`rounded-lg border p-6 ${getStatusColor()}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon()}
                <div>
                  <h2 className="text-xl font-semibold">
                    {getStatusMessage()}
                  </h2>
                  <p className="text-sm opacity-75">
                    {getStatusDescription()}
                  </p>
                </div>
              </div>
              <button
                onClick={handleManualPrediction}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Activity className="w-4 h-4" />
                )}
                <span>{loading ? 'Analyzing...' : 'Get Prediction'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sensor Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Soil Moisture */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Gauge className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">Soil Moisture</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">
                {calculateSoilMoisturePercentage(sensorData.soil_moisture)}%
              </div>
              <div className="text-sm text-gray-500">
                Raw: {sensorData.soil_moisture}
              </div>
              <label htmlFor="soil-moisture" className="block text-sm font-medium text-gray-700">Soil Moisture</label>
              <input
                id="soil-moisture"
                type="range"
                min="0"
                max="4095"
                value={sensorData.soil_moisture}
                onChange={(e) => updateSensorData('soil_moisture', parseInt(e.target.value))}
                className="w-full"
                title="Adjust soil moisture level"
              />
            </div>
          </div>

          {/* Rainfall */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CloudRain className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Rainfall</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">
                {calculateRainfallMM(sensorData.rainfall)} mm
              </div>
              <div className="text-sm text-gray-500">
                Raw: {sensorData.rainfall}
              </div>
              <label htmlFor="rainfall" className="block text-sm font-medium text-gray-700">Rainfall</label>
              <input
                id="rainfall"
                type="range"
                min="0"
                max="4095"
                value={sensorData.rainfall}
                onChange={(e) => updateSensorData('rainfall', parseInt(e.target.value))}
                className="w-full"
                title="Adjust rainfall level"
              />
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Thermometer className="w-6 h-6 text-red-600" />
              <h3 className="font-semibold text-gray-900">Temperature</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">
                {sensorData.temperature.toFixed(1)}°C
              </div>
              <div className="text-sm text-gray-500">
                Range: 20-35°C
              </div>
              <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature</label>
              <input
                id="temperature"
                type="range"
                min="20"
                max="35"
                step="0.1"
                value={sensorData.temperature}
                onChange={(e) => updateSensorData('temperature', parseFloat(e.target.value))}
                className="w-full"
                title="Adjust temperature level"
              />
            </div>
          </div>

          {/* Humidity */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Droplets className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Humidity</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">
                {sensorData.humidity.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">
                Range: 40-80%
              </div>
              <label htmlFor="humidity" className="block text-sm font-medium text-gray-700">Humidity</label>
              <input
                id="humidity"
                type="range"
                min="40"
                max="80"
                step="0.1"
                value={sensorData.humidity}
                onChange={(e) => updateSensorData('humidity', parseFloat(e.target.value))}
                className="w-full"
                title="Adjust humidity level"
              />
            </div>
          </div>

          {/* Distance */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Distance</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">
                {sensorData.distance.toFixed(1)} cm
              </div>
              <div className="text-sm text-gray-500">
                Range: 50-250 cm
              </div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Distance</label>
              <input
                id="distance"
                type="range"
                min="50"
                max="250"
                step="0.1"
                value={sensorData.distance}
                onChange={(e) => updateSensorData('distance', parseFloat(e.target.value))}
                className="w-full"
                title="Adjust distance level"
              />
            </div>
          </div>
        </div>

        {/* Connection Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Connection Setup</h3>
          <p className="text-yellow-700 mb-4">
            To connect your ESP32 hardware to this dashboard:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-yellow-700 text-sm">
            <li>Make sure your Flask server (<code className="bg-yellow-100 px-1 rounded">http://localhost:5000</code>) is running.</li>
            <li>Update the ESP32 code to send POST requests to the <code className="bg-yellow-100 px-1 rounded">/predict</code> endpoint.</li>
            <li>The dashboard will automatically display predictions and sensor readings.</li>
          </ol>
        </div>
      </main>
    </div>
  )
}
