'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaDumbbell,
  FaRunning,
  FaHeartbeat,
  FaAppleAlt,
  FaUsers,
  FaYinYang
} from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Services = () => {
  const { t } = useTranslation()
  const services = [
    {
      icon: FaDumbbell,
      title: t('services.items.personalTraining.title'),
      description: t('services.items.personalTraining.description'),
      image: '/cac-dich-vu/huan-luyen-ca-nhan.jpg',
      slug: 'personal-training'
    },
    {
      icon: FaUsers,
      title: t('services.items.groupClasses.title'),
      description: t('services.items.groupClasses.description'),
      image: '/cac-dich-vu/lop-tap-nhom.jpg',
      slug: 'group-classes'
    },
    {
      icon: FaAppleAlt,
      title: t('services.items.nutrition.title'),
      description: t('services.items.nutrition.description'),
      image: '/cac-dich-vu/tu-van-dinh-duong.webp',
      slug: 'nutrition'
    },
    {
      icon: FaYinYang,
      title: t('services.items.yoga.title'),
      description: t('services.items.yoga.description'),
      image: '/thu-vien-anh/hinh-nu-gymer-xinh-dep_043029028.jpg',
      slug: 'yoga'
    },
    {
      icon: FaRunning,
      title: t('services.items.cardio.title'),
      description: t('services.items.cardio.description'),
      image: '/cac-dich-vu/tap-cardio.jpg',
      slug: 'cardio'
    },
    {
      icon: FaHeartbeat,
      title: t('services.items.weightManagement.title'),
      description: t('services.items.weightManagement.description'),
      image: '/cac-dich-vu/quan-ly-can-nang.png',
      slug: 'weight-management'
    }
  ]

  return (
    <section id="services" className="section-padding bg-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-lg tracking-wider">
            {t('services.title')}
          </span>
          <h2 className="heading-2 my-4">
            {t('services.heading')} <span className="text-gradient">{t('services.headingHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-dark-100 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 min-h-[320px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/35 to-transparent"></div>
              </div>

              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="bg-gradient-primary w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                  <service.icon className="text-white text-3xl" />
                </div>

                <h3 className="font-display text-2xl mb-4 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-100 text-lg leading-8 max-w-[28ch] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                  {service.description}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 text-primary font-bold flex items-center group-hover:translate-x-2 transition-transform"
                >
                  {t('services.learnMore')}
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
