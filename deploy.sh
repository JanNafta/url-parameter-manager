#!/bin/bash
# Manual deployment script for URL Parameter Manager
# Usage: ./deploy.sh

set -e

echo "🔨 Building project..."
npm run build

echo "📦 Creating deployment package..."
cd dist
zip -r ../deploy.zip .
cd ..

echo "🚀 Uploading to server..."
# Using SFTP (requires SSH key or will prompt for password)
sftp hxqwcdho@sh-europe130.banahosting.com << 'EOF'
cd digitalnafta.com/url-builder
put deploy.zip
EOF

echo "📂 Extracting on server..."
ssh hxqwcdho@sh-europe130.banahosting.com << 'EOF'
cd ~/digitalnafta.com/url-builder
unzip -o deploy.zip
rm deploy.zip
EOF

rm deploy.zip
echo "✅ Deployment complete!"
echo "🌐 Visit: https://digitalnafta.com/url-builder/"
