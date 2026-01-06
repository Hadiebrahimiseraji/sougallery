# 🤖 Codespace Agent - خودکار تست و استقرار

## معرفی

این سند برای استفاده از **GitHub Codespace** به‌عنوان یک Agent خودکار برای تست، ساخت و استقرار پروژه **سوغاللری** است.

---

## 🚀 شروع کار

### مرحله 1: باز کردن Codespace

1. به repository بروید: https://github.com/Hadiebrahimiseraji/sougallery
2. دکمه **Code** را کلیک کنید
3. **Codespaces** را انتخاب کنید
4. **Create codespace on main** را کلیک کنید

```bash
# Codespace به‌طور خودکار با تنظیمات زیر باز می‌شود:
# - Ubuntu latest
# - Node.js 18+
# - Python 3.11+
# - Git pre-configured
```

---

## 📋 دستورات در ترمینال Codespace

### 1️⃣ تست خودکار

```bash
# تست تمام فایل‌ها
git push origin main
```

**خودکار اجرا می‌شود:**
- ✅ HTML Validation
- ✅ CSS Check
- ✅ JavaScript Syntax
- ✅ Python Validation
- ✅ Shell Scripts Check
- ✅ Integration Tests

---

### 2️⃣ دستورات دستی در ترمینال

#### تست فایل‌ها:

```bash
# تست HTML
grep "<!DOCTYPE html>" *.html

# تست CSS
wc -l styles.css

# تست JavaScript
node -c app.js
node -c api-backend.js

# تست Python
python3 -m py_compile database.py

# تست Shell Script
bash -n sync.sh
```

#### ایجاد Build:

```bash
# ایجاد پوشه dist
mkdir -p dist

# کپی فایل‌ها
cp *.html dist/
cp styles.css dist/
cp app.js dist/
cp manifest.json dist/
cp *.md dist/

# چک کنید
ls -la dist/
```

#### هماهنگ‌سازی Git:

```bash
# تغییرات را ببینید
git status

# اضافه کردن فایل‌ها
git add .

# Commit
git commit -m "تحدیث و تست"

# Push (این باعث اجرای Workflow می‌شود)
git push origin main
```

---

## 🔄 Workflows - Codespace Agent

### Trigger Events

#### 1. **خودکار (هر Push)**
```bash
git push origin main
```
→ **Codespace Agent فعال می‌شود** → تست → استقرار

#### 2. **دستی از GitHub UI**

برای اجرای دستی:

1. به https://github.com/Hadiebrahimiseraji/sougallery/actions بروید
2. **Codespace Agent - Auto Test & Deploy** را انتخاب کنید
3. **Run workflow** را کلیک کنید
4. انتخاب کنید:
   - `test` - تست فایل‌ها
   - `deploy` - استقرار
   - `build` - ساخت
   - `sync` - هماهنگ‌سازی
   - `export-db` - صادر کردن دیتابیس

---

## 📊 مراحل Workflow

### Job 1: Agent Test
```
┌─────────────────────────────────────────┐
│ 🔍 Codespace Agent - Test               │
├─────────────────────────────────────────┤
│ ✅ System Information                    │
│ ✅ File Structure Validation             │
│ ✅ HTML Validation                       │
│ ✅ CSS Validation                        │
│ ✅ JavaScript Validation                 │
│ ✅ Python Validation                     │
│ ✅ Shell Script Validation               │
│ ✅ Workflow Files Check                  │
│ ✅ Code Metrics                          │
│ ✅ Integration Tests                     │
│ ✅ Test Summary Report                   │
│ ✅ Upload Test Results                   │
└─────────────────────────────────────────┘
       ↓ (اگر موفق)
```

### Job 2: Agent Deploy
```
┌─────────────────────────────────────────┐
│ 🚀 Codespace Agent - Deploy             │
├─────────────────────────────────────────┤
│ ✅ Checkout                              │
│ ✅ Setup Pages                           │
│ ✅ Build Site                            │
│ ✅ Upload Pages Artifact                 │
│ ✅ Deploy to GitHub Pages                │
│ ✅ Deployment Notification               │
└─────────────────────────────────────────┘
       ↓ (اگر موفق)
```

### Job 3: Agent Export DB (اختیاری)
```
┌─────────────────────────────────────────┐
│ 💾 Codespace Agent - Export DB          │
├─────────────────────────────────────────┤
│ ✅ Setup Python                          │
│ ✅ Generate Database Export              │
│ ✅ Database Info                         │
│ ✅ Upload Export                         │
└─────────────────────────────────────────┘
```

---

## 📤 صادر کردن دیتابیس به Google Drive

### مرحله 1: صادر کردن JSON

```bash
# در Codespace
python3 -c "
import json
from datetime import datetime

export_data = {
    'store': 'sougallery',
    'exportDate': datetime.now().isoformat(),
    'categories': [],
    'products': []
}

with open('database-export.json', 'w') as f:
    json.dump(export_data, f, indent=2, ensure_ascii=False)
    
print('✅ Database exported')
"
```

### مرحله 2: دانلود فایل

1. Codespace Explorer را باز کنید
2. به `database-export.json` کلیک راست کنید
3. **Download** را انتخاب کنید

### مرحله 3: آپلود به Google Drive

1. به Google Drive بروید: https://drive.google.com/drive/folders/1Aqsj6ThcsFyASKqAUygbLl98gPKl7ctn
2. فایل JSON را آپلود کنید
3. تأیید کنید

---

## 🖥️ دسترسی ترمینال در Codespace

### دستورات مفید

```bash
# معلومات سیستم
uname -a
pwd
ls -la

# Python
python3 --version
python3 database.py

# Node.js
node --version
node api-backend.js

# Git
git log --oneline -5
git branch -a
git status

# فایل‌ها
find . -name "*.html" -type f
find . -name "*.js" -type f
find . -name "*.py" -type f

# اندازه
du -sh .
du -h styles.css
wc -l app.js

# اجرا
python3 -m http.server 8000
node api-backend.js
```

---

## ✅ چک‌لیست قبل از Push

قبل از هر `git push`، تأیید کنید:

```bash
# ☑️ تمام فایل‌ها موجود هستند
ls -la index.html styles.css app.js database.py

# ☑️ تست syntax
node -c app.js
python3 -m py_compile database.py

# ☑️ Git status
git status

# ☑️ Commit message
git log --oneline -1
```

---

## 📊 نتیجه تست

هر تست شامل:

```
✅ Tests Passed:
   • HTML Structure Validation
   • CSS File Verification
   • JavaScript Syntax Check
   • Python Module Compilation
   • Shell Script Validation
   • Workflow Files Check
   • Integration Tests
   • File Structure Validation
   • Package Dependencies
   • Code Metrics

✅ Results:
   • 10/10 Tests PASSED
   • 100% Success Rate
   • Ready for Deployment
```

---

## 🚀 نتیجه Deployment

```
🟢 DEPLOYMENT SUCCESSFUL

✅ Status: DEPLOYED TO GITHUB PAGES

🌐 Live URLs:
  • Main: https://Hadiebrahimiseraji.github.io/sougallery/
  • Home: https://Hadiebrahimiseraji.github.io/sougallery/home.html
  • Dashboard: https://Hadiebrahimiseraji.github.io/sougallery/dashboard.html
  • Status: https://Hadiebrahimiseraji.github.io/sougallery/deploy-status.html
```

---

## 📁 ساختار Codespace

```
sougallery/
├── index.html              # صفحه اصلی
├── home.html              # صفحه خانگی
├── dashboard.html          # داشبورد
├── deploy-status.html      # وضعیت
├── styles.css             # استایل
├── app.js                 # لوجیک
├── api-backend.js         # API
├── database.py            # دیتابیس
├── sync.sh                # هماهنگ‌سازی
├── package.json           # npm config
├── manifest.json          # PWA
├── .gitignore            # Git ignore
├── README.md             # راهنما
├── DEPLOYMENT.md         # استقرار
├── PAGES.md              # صفحات
├── CODESPACE_AGENT.md    # این فایل
├── dist/                 # Output (Build)
├── .github/
│   └── workflows/
│       ├── test-and-deploy.yml
│       ├── deploy.yml
│       └── codespace-agent.yml
└── .git/                 # Git repo
```

---

## 🔐 نکات ایمنی

✅ **مطمئن باشید:**
- Secrets محفوظ نیست (در Codespace قابل رویت است)
- تنها Trusted Code اجرا کنید
- Personal Data محفوظ نگاه دارید
- Token‌ها را هرگز commit نکنید

---

## 📞 عیب‌یابی

### مشکل: Workflow ناموفق

**حل:**
1. Actions log را چک کنید
2. Test output را ببینید
3. فایل‌های حذف شده را بررسی کنید
4. Git status را چک کنید

### مشکل: Deployment ناموفق

**حل:**
1. GitHub Pages Settings را چک کنید
2. dist/ پوشه موجود است؟
3. Branch صحیح است؟

### مشکل: Database Export ناموفق

**حل:**
1. Python نسخه چک کنید
2. دسترسی فایل چک کنید
3. دستی export کنید

---

## 📚 منابع

- 📖 [GitHub Codespaces](https://docs.github.com/en/codespaces)
- 📖 [GitHub Actions](https://docs.github.com/en/actions)
- 📖 [GitHub Pages](https://pages.github.com/)
- 📖 [Python 3 Documentation](https://docs.python.org/3/)
- 📖 [Node.js Documentation](https://nodejs.org/docs/)

---

## ✨ خلاصه

| عملیات | دستور | خودکار | نتیجه |
|--------|--------|--------|--------|
| تست | `git push` | ✅ | 10/10 ✅ |
| استقرار | `git push` | ✅ | GitHub Pages ✅ |
| صادر DB | Workflow | ✅ | JSON ✅ |
| هماهنگ‌سازی | Workflow | ✅ | Git Sync ✅ |

---

**آخرین بروزرسانی:** 2026-01-06  
**وضعیت:** 🟢 فعال و آماده