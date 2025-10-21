# 🎨 FitNet Fitness Frontend

Modern, responsive gym website built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 📄 Pages

### Public Pages
- **/** - Landing page with all sections
- **/register** - Member registration form
- **/contact** - Contact form
- **/404** - Custom 404 page

### Dashboard Pages (Admin)
- **/dashboard** - Overview with statistics
- **/dashboard/login** - Admin login
- **/dashboard/members** - Member management
- **/dashboard/messages** - Message management

## 🎨 Components

### Layout Components
- **Navbar** - Auto-hiding navigation with mobile menu
- **Footer** - Contact info and links

### Homepage Components
- **Hero** - Animated hero section with CTA
- **About** - Gym information with image grid
- **Services** - Service cards with hover effects
- **Pricing** - Membership plan comparison
- **Testimonials** - Slider with member reviews
- **Gallery** - Image gallery with lightbox

## 🎭 Animations

All animations use **Framer Motion**:
- Fade in on scroll
- Slide up/down effects
- Scale animations
- Parallax scrolling
- Smooth page transitions

## 🎨 Styling

### Tailwind CSS Utilities
Custom utilities defined in `globals.css`:
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.text-gradient` - Gradient text effect
- `.heading-1/2/3` - Heading styles
- `.section-padding` - Consistent spacing
- `.container-custom` - Responsive container
- `.card-hover` - Card hover effects

### Color Scheme
```css
Primary: #DC2626 (Red)
Dark: #0A0A0A to #3A3A3A
Accent: Red gradient
```

## 📱 Responsive Design

Breakpoints (Tailwind defaults):
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px

## 🔐 Authentication

Admin authentication uses JWT tokens stored in localStorage.

### Protected Routes
Dashboard pages check for valid token and redirect to login if needed.

## 🌐 API Integration

All API calls are centralized in `lib/api.js`:
```javascript
import { memberAPI, contactAPI, authAPI } from '@/lib/api'

// Example usage
const members = await memberAPI.getAll()
```

## 📦 Dependencies

### Core
- **next** 14.0.4 - React framework
- **react** 18.2.0 - UI library
- **tailwindcss** 3.4.0 - Utility-first CSS

### UI & Animations
- **framer-motion** 10.16.16 - Animation library
- **react-icons** 4.12.0 - Icon library

### Forms & Validation
- **react-hook-form** 7.49.2 - Form handling
- **react-toastify** 9.1.3 - Toast notifications

### HTTP Client
- **axios** 1.6.2 - API requests

## 🛠️ Configuration Files

### tailwind.config.js
Custom theme configuration with colors, fonts, and animations.

### next.config.js
Next.js configuration including image domains.

### postcss.config.js
PostCSS configuration for Tailwind CSS.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel deploy
```

Set environment variables in Vercel dashboard.

### Other Platforms
Build the app and deploy the `.next` folder:
```bash
npm run build
```

## 🎯 Performance Optimization

- Image optimization with Next.js Image component
- Code splitting with App Router
- Lazy loading components
- Optimized fonts with next/font
- Minimal client-side JavaScript

## 📝 Best Practices

### Code Structure
- Use client components only when needed
- Keep server components as default
- Separate business logic from UI

### Styling
- Use Tailwind utilities
- Follow mobile-first approach
- Maintain consistent spacing

### Performance
- Optimize images before uploading
- Use loading states
- Minimize API calls
- Implement error boundaries

## 🐛 Common Issues

### Hydration Errors
Ensure server and client render the same HTML. Use `'use client'` for components with browser APIs.

### Environment Variables
Must start with `NEXT_PUBLIC_` to be accessible in the browser.

### Image Optimization
Add external image domains to `next.config.js`.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)

---

Built with Next.js 14 and Tailwind CSS
