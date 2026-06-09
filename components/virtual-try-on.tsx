"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, Camera, RefreshCw, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import type { Product } from "@/lib/types"

interface VirtualTryOnProps {
  product: Product
}

export default function VirtualTryOn({ product }: VirtualTryOnProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [adjustments, setAdjustments] = useState({
    size: 50,
    position: { x: 50, y: 50 },
    brightness: 50,
    contrast: 50,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        const imageDataUrl = canvasRef.current.toDataURL("image/png")
        setSelectedImage(imageDataUrl)
        setResult(null)

        // Stop the camera stream
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
        videoRef.current.srcObject = null
      }
    }
  }

  const processImage = () => {
    if (!selectedImage) return

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      // In a real implementation, you would send the image to a backend service
      // that would apply the virtual try-on using AI/ML techniques
      setResult(`/images/products/${product.id}-tryon-demo.jpg`)
      setIsProcessing(false)
    }, 2000)
  }

  const handleAdjustmentChange = (type: string, value: number) => {
    setAdjustments((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const handlePositionChange = (axis: "x" | "y", value: number) => {
    setAdjustments((prev) => ({
      ...prev,
      position: {
        ...prev.position,
        [axis]: value,
      },
    }))
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-navy-700">Virtual Try-On</h2>
        <p className="text-gray-600">See how this {product.name} would look on you</p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-0 bg-gray-100">
          <TabsTrigger value="upload" className="py-3">
            <Upload className="mr-2 h-4 w-4" /> Upload Photo
          </TabsTrigger>
          <TabsTrigger value="camera" className="py-3">
            <Camera className="mr-2 h-4 w-4" /> Use Camera
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="p-6">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-navy-300 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Click to upload your photo</p>
            <p className="text-gray-400 text-sm">Supports JPG, PNG (Max 10MB)</p>
          </div>
        </TabsContent>

        <TabsContent value="camera" className="p-6">
          <div className="text-center">
            {!videoRef.current?.srcObject ? (
              <div>
                <Button onClick={handleCameraCapture} className="bg-navy-700 hover:bg-navy-800">
                  <Camera className="mr-2 h-4 w-4" /> Start Camera
                </Button>
                <p className="mt-2 text-sm text-gray-500">We'll request camera access</p>
              </div>
            ) : (
              <div>
                <div className="relative w-full max-w-md mx-auto rounded-lg overflow-hidden mb-4">
                  <video ref={videoRef} className="w-full" />
                </div>
                <Button onClick={takeSnapshot} className="bg-coral-500 hover:bg-coral-600">
                  Take Photo
                </Button>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </TabsContent>
      </Tabs>

      {selectedImage && !result && (
        <div className="p-6 border-t">
          <h3 className="font-medium text-navy-700 mb-4">Adjust Your Photo</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Your uploaded photo"
                fill
                className="object-cover"
                style={{
                  filter: `brightness(${adjustments.brightness / 50}) contrast(${adjustments.contrast / 50})`,
                }}
              />
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <Slider
                  value={[adjustments.size]}
                  min={25}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleAdjustmentChange("size", value[0])}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horizontal Position</label>
                <Slider
                  value={[adjustments.position.x]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handlePositionChange("x", value[0])}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vertical Position</label>
                <Slider
                  value={[adjustments.position.y]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handlePositionChange("y", value[0])}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brightness</label>
                <Slider
                  value={[adjustments.brightness]}
                  min={25}
                  max={75}
                  step={1}
                  onValueChange={(value) => handleAdjustmentChange("brightness", value[0])}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contrast</label>
                <Slider
                  value={[adjustments.contrast]}
                  min={25}
                  max={75}
                  step={1}
                  onValueChange={(value) => handleAdjustmentChange("contrast", value[0])}
                />
              </div>

              <Button
                className="w-full bg-coral-500 hover:bg-coral-600 text-white"
                onClick={processImage}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  "Try On This Outfit"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="p-6 border-t">
          <h3 className="font-medium text-navy-700 mb-4">Your Virtual Try-On Result</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image src={result || "/placeholder.svg"} alt="Virtual try-on result" fill className="object-cover" />
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Here's how the {product.name} looks on you! This is a preview of how this outfit might appear when worn.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-navy-700 hover:bg-navy-800 text-white">
                  <Download className="mr-2 h-4 w-4" /> Save Image
                </Button>
                <Button variant="outline" className="border-navy-300 text-navy-700">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button variant="outline" className="border-coral-300 text-coral-500" onClick={() => setResult(null)}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                </Button>
              </div>

              <div className="mt-6 p-4 bg-navy-50 rounded-lg">
                <h4 className="font-medium text-navy-700 mb-2">Like what you see?</h4>
                <p className="text-gray-600 mb-3">This {product.name} is available for purchase now.</p>
                <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white">
                  Add to Cart - ₹{product.price}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
