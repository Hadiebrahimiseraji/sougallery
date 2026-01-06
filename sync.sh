#!/bin/bash

echo "📋 روند رسانی داده‌ها به GitHub..."

git config --global user.email "store@sougallery.local"
git config --global user.name "Store Manager"

if [ -z "$(git status --porcelain)" ]; then
    echo "✅ هیچ تغییراتی وجود ندارد"
    exit 0
fi

echo "📑 افزودن فایل‌ها..."
git add -A

echo "📎 ایجاد كمیت..."
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "🔄 بروزرسانی داده‌ها - $TIMESTAMP"

echo "⬆️  ارسال به GitHub..."
git push origin main

echo "✅ روند رسانی موفق"

echo ""
echo "🔗 برای ارسال به Google Drive:"
echo "لطفاً فایل‌های زیر را دستی به Google Drive کشی دهید:"
echo "  - database.json"
echo "  - public/"
echo "مراجعه کنید: https://drive.google.com/drive/folders/1Aqsj6ThcsFyASKqAUygbLl98gPKl7ctn"