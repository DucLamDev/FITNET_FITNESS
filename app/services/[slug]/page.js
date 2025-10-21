'use client'

import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  FaDumbbell, 
  FaRunning, 
  FaHeartbeat, 
  FaAppleAlt, 
  FaUsers, 
  FaYinYang,
  FaArrowLeft,
  FaCheck,
  FaClock,
  FaUserFriends
} from 'react-icons/fa'

export default function ServiceDetailPage() {
  const params = useParams()
  const { t } = useTranslation()
  const slug = params.slug

  // Service data mapping
  const servicesData = {
    'personal-training': {
      icon: FaDumbbell,
      titleKey: 'services.items.personalTraining.title',
      descKey: 'services.items.personalTraining.description',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1170',
      benefits: [
        'Chương trình tập luyện được thiết kế riêng cho bạn',
        'Theo dõi tiến độ chi tiết và điều chỉnh liên tục',
        'Hướng dẫn kỹ thuật chính xác, tránh chấn thương',
        'Động lực và hỗ trợ từ HLV chuyên nghiệp',
        'Kết quả nhanh chóng và bền vững'
      ],
      duration: '60 phút/buổi',
      level: 'Tất cả trình độ',
      schedule: 'Linh hoạt theo lịch của bạn'
    },
    'group-classes': {
      icon: FaUsers,
      titleKey: 'services.items.groupClasses.title',
      descKey: 'services.items.groupClasses.description',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1170',
      benefits: [
        'Tập luyện trong môi trường năng động, đầy động lực',
        'Nhiều lớp học đa dạng: HIIT, CrossFit, Zumba, Boxing',
        'Chi phí hợp lý hơn so với PT cá nhân',
        'Kết nối với cộng đồng yêu thể hình',
        'HLV chuyên nghiệp dẫn dắt mỗi buổi tập'
      ],
      duration: '45-60 phút/buổi',
      level: 'Từ cơ bản đến nâng cao',
      schedule: 'Nhiều khung giờ trong ngày'
    },
    'nutrition': {
      icon: FaAppleAlt,
      titleKey: 'services.items.nutrition.title',
      descKey: 'services.items.nutrition.description',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1153',
      benefits: [
        'Kế hoạch dinh dưỡng cá nhân hóa theo mục tiêu',
        'Tư vấn từ chuyên gia dinh dưỡng có chứng chỉ',
        'Thực đơn chi tiết, dễ thực hiện',
        'Theo dõi và điều chỉnh định kỳ',
        'Hỗ trợ giảm cân, tăng cơ hoặc duy trì sức khỏe'
      ],
      duration: '30-45 phút/buổi tư vấn',
      level: 'Tất cả đối tượng',
      schedule: 'Theo lịch hẹn'
    },
    'yoga': {
      icon: FaYinYang,
      titleKey: 'services.items.yoga.title',
      descKey: 'services.items.yoga.description',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1220',
      benefits: [
        'Cải thiện sự linh hoạt và thăng bằng',
        'Giảm stress, tăng sự tập trung',
        'Tăng cường sức mạnh cốt lõi',
        'Phòng ngừa chấn thương',
        'Cải thiện tư thế và giảm đau lưng'
      ],
      duration: '60-75 phút/buổi',
      level: 'Từ cơ bản đến nâng cao',
      schedule: 'Sáng và tối hàng ngày'
    },
    'cardio': {
      icon: FaRunning,
      titleKey: 'services.items.cardio.title',
      descKey: 'services.items.cardio.description',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1170',
      benefits: [
        'Cải thiện sức khỏe tim mạch',
        'Đốt cháy calo hiệu quả',
        'Tăng cường sức bền',
        'Giảm nguy cơ bệnh mãn tính',
        'Cải thiện tâm trạng và giấc ngủ'
      ],
      duration: '30-60 phút/buổi',
      level: 'Tất cả trình độ',
      schedule: 'Tự do, thiết bị luôn sẵn sàng'
    },
    'weight-management': {
      icon: FaHeartbeat,
      titleKey: 'services.items.weightManagement.title',
      descKey: 'services.items.weightManagement.description',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1170',
      benefits: [
        'Chương trình toàn diện: tập luyện + dinh dưỡng',
        'Theo dõi cân nặng và thành phần cơ thể',
        'Hỗ trợ tâm lý và động lực',
        'Kết quả lâu dài, không yo-yo',
        'Tư vấn lối sống lành mạnh'
      ],
      duration: 'Chương trình 3-6 tháng',
      level: 'Tất cả đối tượng',
      schedule: 'Kết hợp PT + tư vấn dinh dưỡng'
    }
  }

  const service = servicesData[slug]

  if (!service) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Dịch vụ không tồn tại</h1>
          <Link href="/#services" className="btn-primary">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = service.icon

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-dark/60"></div>
        </div>

        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Link 
              href="/#services" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light mb-6 transition-colors"
            >
              <FaArrowLeft /> Quay lại dịch vụ
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/20 p-4 rounded-lg">
                <IconComponent className="text-primary text-4xl" />
              </div>
              <h1 className="heading-1 text-white">
                {t(service.titleKey)}
              </h1>
            </div>
            
            <p className="text-xl text-gray-300">
              {t(service.descKey)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Details */}
      <section className="section-padding bg-dark-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="heading-3 mb-6 text-primary">Lợi Ích</h2>
                <div className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4 bg-dark-200 p-4 rounded-lg"
                    >
                      <FaCheck className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 bg-gradient-primary p-8 rounded-2xl"
              >
                <h3 className="text-3xl font-bold mb-4">Sẵn sàng bắt đầu?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Đăng ký ngay để nhận buổi tập thử MIỄN PHÍ và trải nghiệm dịch vụ của chúng tôi!
                </p>
                <Link href="/register" className="btn-secondary">
                  Đăng Ký Tập Thử Miễn Phí
                </Link>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-dark-200 p-6 rounded-2xl sticky top-24"
              >
                <h3 className="text-2xl font-bold mb-6 text-primary">Thông Tin</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <FaClock className="text-primary text-xl mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Thời Gian</h4>
                      <p className="text-gray-400">{service.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FaUserFriends className="text-primary text-xl mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Trình Độ</h4>
                      <p className="text-gray-400">{service.level}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FaDumbbell className="text-primary text-xl mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Lịch Tập</h4>
                      <p className="text-gray-400">{service.schedule}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-dark-300">
                  <h4 className="font-bold mb-4">Liên Hệ Tư Vấn</h4>
                  <a 
                    href="tel:0346676169" 
                    className="block text-center bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition-colors"
                  >
                    034 667 6169
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-2">
              Dịch Vụ <span className="text-gradient">Khác</span>
            </h2>
            <p className="text-gray-400 mt-4">Khám phá thêm các dịch vụ của chúng tôi</p>
          </motion.div>

          <div className="text-center">
            <Link href="/#services" className="btn-primary">
              Xem Tất Cả Dịch Vụ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
