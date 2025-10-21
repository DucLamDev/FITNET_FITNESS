import { Roboto, Oswald } from 'next/font/google'
import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import I18nProvider from '@/components/I18nProvider'

const roboto = Roboto({ 
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
})

const oswald = Oswald({ 
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata = {
  title: 'FitNet Fitness - Đặt Lịch Tập Thử Miễn Phí | Phòng Gym Hà Nội',
  description: 'Đặt lịch tập thử miễn phí tại FitNet Fitness - Hà Nội. Cơ sở đẳng cấp, huấn luyện viên chuyên nghiệp, không giới hạn ngôn ngữ!',
  keywords: 'phòng gym, gym Hà Nội, fitness, tập gym, huấn luyện cá nhân, FitNet, sức khỏe, thể hình',
  authors: [{ name: 'FitNet Fitness' }],
  openGraph: {
    title: 'FitNet Fitness - Đặt Lịch Tập Thử Miễn Phí | Phòng Gym Hà Nội',
    description: 'Đặt lịch tập thử miễn phí tại FitNet Fitness - Cơ sở gym đẳng cấp tại Hà Nội',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${roboto.variable} ${oswald.variable}`}>
      <body className="bg-dark text-white antialiased font-sans">
        <I18nProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </I18nProvider>
      </body>
    </html>
  )
}
