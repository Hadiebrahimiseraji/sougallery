# 🚀 راهنمای استقرار بر GitHub Pages

## وضعیت فعلی

### لینک‌های جاری

- **📄 صفحه اصلی**: https://Hadiebrahimiseraji.github.io/sougallery/
- **📊 داشبورد**: https://Hadiebrahimiseraji.github.io/sougallery/dashboard.html
- **📄 مستندات**: https://github.com/Hadiebrahimiseraji/sougallery/blob/main/README.md
- **🎧 GitHub Actions**: https://github.com/Hadiebrahimiseraji/sougallery/actions

## تعداد اینیشال GitHub Pages

### 1️⃣ مرحله اول: حساب راهنما GitHub

1. به [github.com](https://github.com) رفته و وارد شوید
2. به راهنما احراز GitHub Pages رفته:
   - **Settings** را کلیک کنید
   - **Pages** را از سمت چپ انتخاب کنید
   - **Source** را به **Deploy from a branch** تعیین کنید
   - **Branch** را **main** انتخاب کرده روی **Save** کلیک کنید

### 2️⃣ مرحله دوم: ورکفلو GitHub Actions

#### ورکفلو اول:ک `.github/workflows/test-and-deploy.yml`

**وظایف:**
- تست مترون تمام کدها
- ساختار فایل‌ها
- انتشار بر GitHub Pages

**آفعال:

```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:
```

#### ورکفلو دوم: `.github/workflows/deploy.yml`

**وظایف:**
- ارسال خودکار به GitHub
- ساختار بسته deployment

## فلوچرت تست‌ها

### تست‌های انجام‌شده:

✅ **HTML Validation**
- بررسی DOCTYPE
- اعتبارسنجی ساختار

✅ **CSS Check**
- فایل موجود و مباشر
- تعداد خطوط

✅ **JavaScript Validation**
- اعتبارسنجی syntax
- بررسی طول فایل

✅ **Python Module**
- Compile مودول‌ها
- اعتبارسنجی syntax

✅ **Node.js Backend**
- اعتبارسنجی API
- بررسی endpoints

✅ **Shell Scripts**
- اعتبارسنجی bash syntax
- بررسی script permissions

✅ **Integration Tests**
- بررسی فایل dependencies
- بررسی workflows

## دستورات و داشبورد

### ورکفلو Monitor

```bash
https://github.com/Hadiebrahimiseraji/sougallery/actions
```

### باز کردن صفحات:

#### 1. Dashboard
```
https://Hadiebrahimiseraji.github.io/sougallery/dashboard.html
```

#### 2. Deployment Help
```
https://Hadiebrahimiseraji.github.io/sougallery/index-help.html
```

#### 3. Store Manager
```
https://Hadiebrahimiseraji.github.io/sougallery/
```

## پروسه استقرار

### 1️⃣ Push به main branch
```bash
git add .
git commit -m "بروزرسانی و استقرار"
git push origin main
```

### 2️⃣ GitHub Actions شروع می‌شود
- تمام مراحل تست
- ساختار فایل‌ها
- Upload به GitHub Pages

### 3️⃣ المان لذاخره
- GitHub Actions تکمیل می‌شود
- صفحه ارزبابی می‌شود

## تشخیص مشكلات

### مشكله: ورکفلو شکست

**حل:
1. به GitHub repository رفته
2. **Actions** را کلیک کنید
3. ورکفلو را انتخاب کرده **Run workflow** را کلیک کنید

### مشکله: صفحه یافت نمی‌شود

**حل:
1. **Settings** را کلیک کنید
2. **Pages** را انتخاب کرده اتلاعات بررسی کنید
3. برنشانه را refreshed کرده

### مشکله: CORS errors

**حل:
صفحه بر GitHub Pages، CORS محدودیات ندارد. لوکال سرور استفاده کنید:

```bash
python -m http.server 8000
```

## تعریف لاینیه‌ها

### Badge Status

#### Build Status
![Build Status](https://github.com/Hadiebrahimiseraji/sougallery/workflows/Test%20%26%20Deploy%20to%20GitHub%20Pages/badge.svg)

#### Deployment Status  
![Deployment Status](https://img.shields.io/badge/deployment-active-brightgreen)

#### Last Update
![Last Update](https://img.shields.io/badge/last%20update-2026--01--06-blue)

## فایل‌های آماده‌شده

| فایل | وضعیت | نوع |
|--------|--------|--------|
| index.html | ✅ | Frontend |
| styles.css | ✅ | Frontend |
| app.js | ✅ | Frontend |
| dashboard.html | ✅ | Frontend |
| api-backend.js | ✅ | Backend |
| database.py | ✅ | Backend |
| sync.sh | ✅ | DevOps |
| .github/workflows/test-and-deploy.yml | ✅ | CI/CD |
| .github/workflows/deploy.yml | ✅ | CI/CD |
| package.json | ✅ | Config |
| README.md | ✅ | Docs |
| DEPLOYMENT.md | ✅ | Docs |

## پیوردها

### Frontend
- 📄 index.html - 6.4 KB
- 🎨 styles.css - 7.2 KB
- ⚙️ app.js - 11.3 KB
- 📊 dashboard.html - 16.9 KB

### Backend
- 🔧 api-backend.js - 2.2 KB
- 🐍 database.py - 3.7 KB

### DevOps
- 🔄 sync.sh - 0.9 KB
- 📦 package.json - 0.4 KB
- 🚀 deploy.yml - 2.7 KB
- 🚀 test-and-deploy.yml - 11.3 KB

**Total Size: ~66 KB** 📁

## ذخیره‌سازی خودکار

### هتین به main branch

```bash
./sync.sh
```

### از Google Drive

1. فایل JSON را درانلود کرده
2. به Google Drive آپلود کرده:

https://drive.google.com/drive/folders/1Aqsj6ThcsFyASKqAUygbLl98gPKl7ctn

## مدارککیث

✅ 🚀 Build & Test - Passing
✅ 🎧 Code Quality - Good
✅ 📄 Documentation - Complete
✅ ⚙️ DevOps - Configured
✅ 📁 Deployment - Active

---

**آخرین بروزرسانی: 2026-01-06**

**وضعیت: 🟢 Active**