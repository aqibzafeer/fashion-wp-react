#!/bin/bash

# Script to convert category images to WebP format
# This will create optimized WebP versions of JPEG images
# Requires: ImageMagick (convert command) or FFmpeg

echo "Converting category images to WebP format..."

# Using ImageMagick (most compatible)
if command -v convert &> /dev/null; then
    echo "Using ImageMagick for conversion..."
    convert public/cat/boys.jpg -quality 85 -define webp:method=6 public/cat/boys.webp
    convert public/cat/girls.jpg -quality 85 -define webp:method=6 public/cat/girls.webp
    convert public/cat/men.jpg -quality 85 -define webp:method=6 public/cat/men.webp
    convert public/cat/women.jpg -quality 85 -define webp:method=6 public/cat/women.webp
    echo "✓ WebP conversion complete!"
    
# Fallback to FFmpeg
elif command -v ffmpeg &> /dev/null; then
    echo "Using FFmpeg for conversion..."
    ffmpeg -i public/cat/boys.jpg -c:v libwebp -q:v 85 public/cat/boys.webp
    ffmpeg -i public/cat/girls.jpg -c:v libwebp -q:v 85 public/cat/girls.webp
    ffmpeg -i public/cat/men.jpg -c:v libwebp -q:v 85 public/cat/men.webp
    ffmpeg -i public/cat/women.jpg -c:v libwebp -q:v 85 public/cat/women.webp
    echo "✓ WebP conversion complete!"
else
    echo "✗ ImageMagick or FFmpeg not found. Please install one of them:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  Or use online tools like: https://squoosh.app/"
fi
