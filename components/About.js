'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaAward, FaUsers, FaDumbbell, FaHeart } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t, i18n } = useTranslation()
  const isVietnamese = i18n.language?.startsWith('vi')

  const features = [
    {
      icon: FaDumbbell,
      title: t('about.features.equipment.title'),
      description: t('about.features.equipment.description')
    },
    {
      icon: FaUsers,
      title: t('about.features.trainers.title'),
      description: t('about.features.trainers.description')
    },
    {
      icon: FaAward,
      title: t('about.features.results.title'),
      description: t('about.features.results.description')
    },
    {
      icon: FaHeart,
      title: t('about.features.community.title'),
      description: t('about.features.community.description')
    }
  ]

  const operationalHighlights = isVietnamese
    ? [
      'Quy trình bắt đầu bằng đánh giá thể lực, thói quen sinh hoạt, tiền sử chấn thương và mục tiêu cụ thể.',
      'Lộ trình tập được chia theo từng giai đoạn 4-6 tuần để khách hàng nhìn thấy tiến bộ thay vì tập cảm tính.',
      'Đội ngũ front desk và huấn luyện viên hỗ trợ song ngữ giúp người mới hoặc khách nước ngoài dễ hòa nhập hơn.'
    ]
    : [
      'Every journey starts with a fitness assessment, lifestyle review, injury history, and a clear goal-setting session.',
      'Training plans are structured in 4-6 week phases so members can see progress instead of training randomly.',
      'Bilingual front desk and coaching support make it easier for beginners and expats to settle in quickly.'
    ]

  const memberMoment = isVietnamese
    ? {
      title: 'Một buổi tập điển hình tại FitNet',
      description:
        'Khách đến check-in, được HLV rà lại tình trạng cơ thể và lịch làm việc trong ngày, sau đó khởi động, tập chính, giãn cơ và ghi chú lại hiệu suất để buổi sau tối ưu hơn.'
    }
    : {
      title: 'A typical session at FitNet',
      description:
        'Members check in, review energy level and work stress with a trainer, warm up properly, complete the main session, cool down, and log progress for smarter adjustments next time.'
    }

  const founderNote = isVietnamese
    ? '"Chúng tôi không muốn khách chỉ mua gói tập. Chúng tôi muốn họ hiểu mình đang tập vì mục tiêu gì và có ai đó theo sát đến khi mục tiêu đó thành hình."'
    : '"We do not want people to simply buy a membership. We want them to understand their goal and feel that someone is staying with them until it takes shape."'

  const aboutImages = [
    '/ve-chung-toi/phong-tap-ufc-gym-viet-nam-1.webp',
    '/ve-chung-toi/thiet-bi-phong-gym-can-gi-gymaster.vn_.webp',
    '/ve-chung-toi/ufcclubphotostdu01112016-4.jpg',
    '/ve-chung-toi/103774182-10220795879460086-7752292863115439958-o-375x440.jpg'
  ]

  return (
    <section id="about" className="section-padding bg-dark-100">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={aboutImages[0]}
                    alt="Không gian phòng gym hiện đại tại Việt Nam"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={aboutImages[1]}
                    alt="Thiết bị phòng gym thực tế"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={aboutImages[2]}
                    alt="Khách hàng tập luyện cùng huấn luyện viên"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={aboutImages[3]}
                    alt="Cộng đồng tập luyện trong phòng gym"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-dark/80 p-6">
              <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">
                {memberMoment.title}
              </p>
              <p className="mt-3 text-gray-300 leading-7">
                {memberMoment.description}
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-gradient-primary p-6 rounded-lg shadow-2xl"
            >
              <div className="text-center">
                <div className="font-display text-4xl text-white">8+</div>
                <div className="text-white text-sm">{t('about.years')}</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-bold text-lg tracking-wider">
              {t('about.title')}
            </span>
            <h2 className="heading-3 my-6 leading-tight">
              {t('about.heading')} <span className="text-gradient">{t('about.headingHighlight')}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              {t('about.description1')}
            </p>
            <p className="text-gray-400 text-lg mb-8">
              {t('about.description2')}
            </p>

            <div className="rounded-2xl border border-white/10 bg-dark p-6 mb-8">
              <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">
                {isVietnamese ? 'Chiều sâu vận hành' : 'Operational depth'}
              </p>
              <div className="space-y-3">
                {operationalHighlights.map((item) => (
                  <p key={item} className="text-gray-300 leading-7">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="bg-gradient-primary p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <feature.icon className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-primary/15 to-transparent border border-primary/20 p-6">
              <p className="text-white text-lg leading-8">{founderNote}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
