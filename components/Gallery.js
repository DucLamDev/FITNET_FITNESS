'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Gallery = () => {
  const { t, i18n } = useTranslation()
  const [selectedImage, setSelectedImage] = useState(null)
  const isVietnamese = i18n.language?.startsWith('vi')

  const images = isVietnamese
    ? [
      {
        url: '/ve-chung-toi/thiet-bi-phong-gym-can-gi-gymaster.vn_.webp',
        title: 'Giờ cao điểm buổi tối',
        caption: 'Không gian đông nhưng vẫn đủ khoảng trống, phù hợp dân văn phòng tập sau giờ làm.'
      },
      {
        url: '/ve-chung-toi/phong-tap-ufc-gym-viet-nam-1.webp',
        title: 'Khu tạ và máy sức mạnh',
        caption: 'Bố trí rõ ràng cho người mới làm quen kỹ thuật và người tập nặng theo chu kỳ riêng.'
      },
      {
        url: '/cac-dich-vu/quan-ly-can-nang.png',
        title: 'Lớp nhóm tạo động lực',
        caption: 'Không chỉ để đốt calo, đây còn là nơi khách hàng kết nối và giữ nếp tập đều.'
      },
      {
        url: '/cac-dich-vu/huan-luyen-ca-nhan.jpg',
        title: 'Buổi PT theo mục tiêu',
        caption: 'Mỗi buổi 1-1 được điều chỉnh theo thể trạng, lịch sinh hoạt và mục tiêu hiện tại.'
      },
      {
        url: '/thu-vien-anh/hinh-nu-gymer-xinh-dep_043029028.jpg',
        title: 'Góc phục hồi và giãn cơ',
        caption: 'Bước nhỏ nhưng quan trọng để hạn chế đau mỏi và giữ khả năng tập bền vững.'
      },
      {
        url: '/ve-chung-toi/103774182-10220795879460086-7752292863115439958-o-375x440.jpg',
        title: 'Khoảnh khắc khách hàng khoe thành quả luyện tập',
        caption: 'Những cảm xúc đời thường sau buổi tập tốt mới là chất liệu tạo nên niềm tin thương hiệu.'
      }
    ]
    : [
      {
        url: '/ve-chung-toi/thiet-bi-phong-gym-can-gi-gymaster.vn_.webp',
        title: 'Evening peak-hour energy',
        caption: 'Busy but still spacious enough for office workers training after work.'
      },
      {
        url: '/ve-chung-toi/phong-tap-ufc-gym-viet-nam-1.webp',
        title: 'Strength and free-weight zone',
        caption: 'Clearly organized for beginners learning form and experienced members training heavier blocks.'
      },
      {
        url: '/cac-dich-vu/huan-luyen-ca-nhan.jpg',
        title: 'Motivating class energy',
        caption: 'Not only for calorie burn, but also where members build consistency together.'
      },
      {
        url: '/cac-dich-vu/quan-ly-can-nang.png',
        title: 'Goal-based PT sessions',
        caption: 'Each one-on-one session adapts to energy, schedule, and current progress.'
      },
      {
        url: '/thu-vien-anh/tao-dang-chup-anh-gym-nu__11__0bb329be1a7d409dba617c4584f362f0.jpg',
        title: 'Recovery and stretch corner',
        caption: 'A small but important part of reducing soreness and keeping training sustainable.'
      },
      {
        url: '/ve-chung-toi/ufcclubphotostdu01112016-4.jpg',
        title: 'Real member moments',
        caption: 'Everyday emotions after a strong session are what make a fitness brand feel believable.'
      }
    ]

  const sectionNote = isVietnamese
    ? 'Thay vì chỉ cho thấy máy móc, section này được bổ sung mô tả trải nghiệm thực tế để người xem hình dung rõ hơn không gian, nhịp tập và cách khách hàng sống trong thương hiệu FitNet.'
    : 'Instead of only showing equipment, this section now explains the lived experience so visitors can picture the space, rhythm, and human side of the FitNet brand.'

  return (
    <section id="gallery" className="section-padding bg-dark-100">
      <div className="container-custom">
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
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            {sectionNote}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-2xl overflow-hidden border border-white/10 bg-dark group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2">{image.title}</h3>
                <p className="text-gray-400 leading-7">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

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
                <p className="mt-2 text-gray-200 max-w-3xl">{selectedImage.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Gallery
