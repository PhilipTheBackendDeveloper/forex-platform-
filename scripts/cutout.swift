// Non-destructive subject cutout using Apple's on-device Vision framework (no upload).
// The subject's pixels are copied unchanged; only the background becomes transparent.
//
// Usage: swift scripts/cutout.swift <input.jpg> <output.png> [person|foreground] [featherSigma] [defringePx]
//   defringePx  — shrink the mask by N px first to drop light fringes from bright backdrops
// Output is trimmed to the subject's bounding box plus a 4% margin (bottom edge kept flush),
// so layouts can centre on the person instead of the empty space the backdrop occupied.
//   person      — VNGeneratePersonInstanceMaskRequest (best for people, hair detail)
//   foreground  — VNGenerateForegroundInstanceMaskRequest (any salient subject)
import CoreImage
import CoreImage.CIFilterBuiltins
import Foundation
import Vision

let args = CommandLine.arguments
guard args.count >= 3 else {
  print("usage: swift cutout.swift <input> <output.png> [person|foreground] [featherSigma]")
  exit(2)
}
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])
let mode = args.count > 3 ? args[3] : "person"
let feather = args.count > 4 ? Double(args[4]) ?? 0.8 : 0.8
let defringe = args.count > 5 ? Float(args[5]) ?? 0 : 0

guard let image = CIImage(contentsOf: input, options: [.applyOrientationProperty: true]) else {
  fputs("cannot read \(input.path)\n", stderr)
  exit(1)
}
let handler = VNImageRequestHandler(ciImage: image)

func maskBuffer() throws -> CVPixelBuffer {
  if mode == "person" {
    let request = VNGeneratePersonInstanceMaskRequest()
    try handler.perform([request])
    if let result = request.results?.first, !result.allInstances.isEmpty {
      return try result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
    }
    fputs("no person found, falling back to foreground\n", stderr)
  }
  let request = VNGenerateForegroundInstanceMaskRequest()
  try handler.perform([request])
  guard let result = request.results?.first else {
    fputs("no foreground subject found\n", stderr)
    exit(1)
  }
  return try result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
}

/// Bounding box of mask pixels above a small threshold, padded by 4%; keeps the bottom edge flush.
func subjectBounds(context: CIContext, mask: CIImage, extent: CGRect) -> CGRect {
  let width = Int(extent.width)
  let height = Int(extent.height)
  var pixels = [UInt8](repeating: 0, count: width * height)
  context.render(mask, toBitmap: &pixels, rowBytes: width, bounds: extent, format: .L8, colorSpace: nil)
  var minX = width, minY = height, maxX = -1, maxY = -1
  for y in 0..<height {
    for x in 0..<width where pixels[y * width + x] > 24 {
      minX = min(minX, x); maxX = max(maxX, x)
      minY = min(minY, y); maxY = max(maxY, y)
    }
  }
  guard maxX >= 0 else { return extent }
  let pad = Int(Double(max(width, height)) * 0.04)
  // Bitmap rows run top-down; Core Image's origin is bottom-left.
  let top = max(0, minY - pad)
  let left = max(0, minX - pad)
  let right = min(width, maxX + pad)
  let bottomRow = maxY >= height - pad ? height : min(height, maxY + pad)
  return CGRect(x: CGFloat(left), y: CGFloat(height - bottomRow), width: CGFloat(right - left), height: CGFloat(bottomRow - top))
}

do {
  var mask = CIImage(cvPixelBuffer: try maskBuffer())
  if defringe > 0 {
    let erode = CIFilter.morphologyMinimum()
    erode.inputImage = mask.clampedToExtent()
    erode.radius = defringe
    mask = (erode.outputImage ?? mask).cropped(to: mask.extent)
  }
  // A small feather avoids jagged, "pasted-on" edges without eating into hair or clothing.
  let softMask = mask.clampedToExtent().applyingGaussianBlur(sigma: feather).cropped(to: mask.extent)
  let blend = CIFilter.blendWithMask()
  blend.inputImage = image
  blend.backgroundImage = CIImage(color: .clear).cropped(to: image.extent)
  blend.maskImage = softMask
  guard let result = blend.outputImage?.cropped(to: image.extent) else { exit(1) }
  let context = CIContext()
  let srgb = CGColorSpace(name: CGColorSpace.sRGB)!
  let crop = subjectBounds(context: context, mask: softMask, extent: image.extent)
  try context.writePNGRepresentation(of: result.cropped(to: crop), to: output, format: .RGBA8, colorSpace: srgb)
  print("wrote \(output.path) (\(Int(crop.width))×\(Int(crop.height)) of \(Int(image.extent.width))×\(Int(image.extent.height)), mode=\(mode))")
} catch {
  fputs("vision error: \(error)\n", stderr)
  exit(1)
}
