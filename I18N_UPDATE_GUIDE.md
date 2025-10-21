# 🌍 Hướng Dẫn Cập Nhật i18n Cho Các Components

## ✅ Đã Hoàn Thành

### 1. **Font tiếng Việt - Be Vietnam Pro**
- ✅ Đã cài đặt font Be Vietnam Pro hỗ trợ đầy đủ tiếng Việt
- ✅ Font weights: 300, 400, 500, 600, 700
- ✅ Subsets: latin, vietnamese
- ✅ Đã cập nhật Tailwind config và global styles

### 2. **Hệ thống i18n**
- ✅ Cài đặt: react-i18next, i18next, i18next-browser-languagedetector
- ✅ Cấu hình i18n với localStorage persistence
- ✅ Ngôn ngữ mặc định: Tiếng Việt (vi)
- ✅ Hỗ trợ: Tiếng Việt (vi) & English (en)

### 3. **Translation Files**
- ✅ `/lib/locales/vi/translation.json` - Tiếng Việt
- ✅ `/lib/locales/en/translation.json` - English
- ✅ Đã dịch toàn bộ nội dung cho: Nav, Hero, About, Services, Pricing, Testimonials, Gallery, Footer, Contact, Register, Dashboard, Login

### 4. **Components Đã Cập Nhật**
- ✅ `Navbar.js` - Có language switcher
- ✅ `Hero.js` - Sử dụng i18n translations
- ✅ `LanguageSwitcher.js` - Component chuyển đổi ngôn ngữ
- ✅ `I18nProvider.js` - Provider wrapper

---

## 📝 Hướng Dẫn Cập Nhật Components Còn Lại

### Pattern 1: Component Thường

```javascript
'use client'

import { useTranslation } from 'react-i18next'
// ... other imports

const YourComponent = () => {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('section.heading')}</h1>
      <p>{t('section.description')}</p>
    </div>
  )
}
```

### Pattern 2: Component với Dynamic Data

```javascript
'use client'

import { useTranslation } from 'react-i18next'

const ServiceCard = () => {
  const { t } = useTranslation()
  
  const services = [
    {
      title: t('services.items.personalTraining.title'),
      description: t('services.items.personalTraining.description')
    }
  ]
  
  return (
    // JSX here
  )
}
```

---

## 🎯 Components Cần Cập Nhật

### **Ưu Tiên Cao:**

1. **About.js**
```javascript
// Thay thế:
'VỀ CHÚNG TÔI' → {t('about.title')}
'CHÚNG TÔI LÀ' → {t('about.heading')}
'Thiết Bị Hiện Đại' → {t('about.features.equipment.title')}
```

2. **Services.js**
```javascript
// Thay thế:
'DỊCH VỤ CỦA CHÚNG TÔI' → {t('services.title')}
'Huấn Luyện Cá Nhân' → {t('services.items.personalTraining.title')}
```

3. **Pricing.js**
```javascript
// Thay thế:
'GÓI HỘI VIÊN' → {t('pricing.title')}
'Cơ Bản' → {t('pricing.plans.basic.name')}
```

4. **Testimonials.js**
```javascript
// Thay thế:
'ĐÁNH GIÁ CỦA HỘI VIÊN' → {t('testimonials.title')}
```

5. **Gallery.js**
```javascript
// Thay thế:
'CƠ SỞ CỦA CHÚNG TÔI' → {t('gallery.title')}
'Khu Vực Cardio' → {t('gallery.areas.cardio')}
```

6. **Footer.js**
```javascript
// Thay thế:
'Liên Kết Nhanh' → {t('footer.quickLinks')}
'Dịch Vụ Của Chúng Tôi' → {t('footer.ourServices')}
```

### **Ưu Tiên Trung Bình:**

7. **Contact page** (`app/contact/page.js`)
```javascript
// Import useTranslation
const { t } = useTranslation()

// Thay thế:
'LIÊN HỆ' → {t('contact.title')}
'Họ và Tên' → {t('contact.form.name')}
errors.name.message → {t('contact.form.errors.nameRequired')}
```

8. **Register page** (`app/register/page.js`)
```javascript
// Thay thế:
'ĐĂNG KÝ' → {t('register.title')}
'Họ và Tên' → {t('register.form.fullName')}
```

### **Ưu Tiên Thấp:**

9. **Dashboard pages**
```javascript
// Dashboard overview
'Tổng Hội Viên' → {t('dashboard.stats.total')}

// Members management
'Quản Lý Hội Viên' → {t('dashboard.membersManagement')}
```

10. **Login page** (`app/dashboard/login/page.js`)
```javascript
'Trang Quản Trị' → {t('login.title')}
'Đăng Nhập' → {t('login.signIn')}
```

---

## 🚀 Quy Trình Cập Nhật

### Bước 1: Import hook
```javascript
import { useTranslation } from 'react-i18next'
```

### Bước 2: Sử dụng hook trong component
```javascript
const { t } = useTranslation()
```

### Bước 3: Thay thế hardcoded text
```javascript
// Trước:
<h1>Tiêu đề tiếng Việt</h1>

// Sau:
<h1>{t('section.title')}</h1>
```

### Bước 4: Kiểm tra translation key tồn tại
- Mở `/lib/locales/vi/translation.json`
- Tìm key tương ứng
- Nếu chưa có, thêm key mới vào cả 2 file (vi & en)

---

## 💡 Tips & Best Practices

1. **Nested Keys**: Sử dụng dot notation
   ```javascript
   t('hero.stats.members')  // ✅ Good
   t('hero_stats_members')  // ❌ Avoid
   ```

2. **Dynamic Values**: Sử dụng interpolation
   ```javascript
   t('welcome.message', { name: 'John' })
   // trong JSON: "welcome.message": "Xin chào {{name}}!"
   ```

3. **Plurals**: Xử lý số nhiều
   ```javascript
   t('items', { count: 5 })
   // trong JSON: 
   // "items_one": "{{count}} mục"
   // "items_other": "{{count}} mục"
   ```

4. **Fallback**: Luôn có fallback text
   ```javascript
   t('key.that.might.not.exist', 'Fallback text')
   ```

---

## 🧪 Testing

### Test Language Switching:
1. Mở website
2. Click vào Language Switcher (🇻🇳/🇺🇸)
3. Kiểm tra tất cả text đã chuyển đổi
4. Reload page - ngôn ngữ được lưu trong localStorage

### Test Font Rendering:
1. Kiểm tra các ký tự có dấu: ă, â, đ, ê, ô, ơ, ư, ỳ, etc.
2. Kiểm tra trên nhiều trình duyệt
3. Kiểm tra responsive (mobile, tablet, desktop)

---

## 📦 Translation Keys Structure

```
{
  "nav": { ... },           // Navigation items
  "hero": { ... },          // Hero section
  "about": { ... },         // About section
  "services": { ... },      // Services
  "pricing": { ... },       // Pricing plans
  "testimonials": { ... },  // Testimonials
  "gallery": { ... },       // Gallery
  "footer": { ... },        // Footer
  "contact": { ... },       // Contact page
  "register": { ... },      // Registration page
  "dashboard": { ... },     // Dashboard
  "login": { ... }          // Login page
}
```

---

## 🎨 Smooth Animations

Language switching đã được tích hợp animations:
- Fade effect khi chuyển đổi
- Scale animation cho dropdown
- Backdrop blur effect

Để thêm custom animations khi text thay đổi:
```javascript
<motion.div
  key={i18n.language}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.3 }}
>
  {t('your.key')}
</motion.div>
```

---

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra browser console
2. Verify translation key tồn tại
3. Clear localStorage và reload
4. Check i18n initialization

Happy coding! 🚀
