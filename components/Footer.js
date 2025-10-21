'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaDumbbell 
} from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.pricing'), href: '/#pricing' },
    { name: t('gallery.heading') + ' ' + t('gallery.headingHighlight'), href: '/#gallery' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  const services = [
    { name: t('services.items.personalTraining.title'), href: '/#services' },
    { name: t('services.items.groupClasses.title'), href: '/#services' },
    { name: t('services.items.nutrition.title'), href: '/#services' },
    { name: t('services.items.yoga.title'), href: '/#services' },
    { name: t('services.items.cardio.title'), href: '/#services' },
  ]

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com', color: 'hover:text-blue-500' },
    { icon: FaInstagram, href: 'https://instagram.com', color: 'hover:text-pink-500' },
    { icon: FaTwitter, href: 'https://twitter.com', color: 'hover:text-blue-400' },
    { icon: FaYoutube, href: 'https://youtube.com', color: 'hover:text-red-500' },
  ]

  return (
    <footer className="bg-dark-100 border-t border-dark-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <FaDumbbell className="text-primary text-3xl" />
              <span className="font-display text-2xl text-gradient">
                FITNET FITNESS
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors duration-300 text-xl`}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-display text-2xl mb-6 text-primary">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl mb-6 text-primary">{t('footer.ourServices')}</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl mb-6 text-primary">{t('footer.contactUs')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <span>Tầng 7, Số 23, Ngõ 89 Phạm Văn Đồng, Cầu Giấy, Hà Nội</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaPhone className="text-primary" />
                <a href="tel:0346676169" className="hover:text-primary transition-colors">
                  034 667 6169
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaEnvelope className="text-primary" />
                <a href="mailto:info@fitnetfitness.com" className="hover:text-primary transition-colors">
                  info@fitnetfitness.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-dark-300 mt-12 pt-8 text-center text-gray-400"
        >
          <p>
            © {currentYear} FitNet Fitness. {t('footer.copyright')}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
