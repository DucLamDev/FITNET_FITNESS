'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Gallery = () => {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState(null)

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1170',
      title: t('gallery.areas.cardio')
    },
    {
      url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=975',
      title: t('gallery.areas.weights')
    },
    {
      url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1170',
      title: t('gallery.areas.groupClasses')
    },
    {
      url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1170',
      title: t('gallery.areas.personalTraining')
    },
    {
      url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1169',
      title: t('gallery.areas.yoga')
    },
    {
      url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1170',
      title: t('gallery.areas.functional')
    },
    {
      url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1220',
      title: t('gallery.areas.meditation')
    },
    {
      url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1170',
      title: t('gallery.areas.boxing')
    }
  ]

  return (
    <section id="gallery" className="section-padding bg-dark-100">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-lg tracking-wider">
            {t('gallery.title')}
          </span>
          <h2 className="heading-2 my-4">
            {t('gallery.heading')} <span className="text-gradient">{t('gallery.headingHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('gallery.description')}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-lg">{image.title}</h3>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-primary transition-colors z-10"
            >
              <FaTimes />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent p-6">
                <h3 className="font-display text-3xl">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Gallery
