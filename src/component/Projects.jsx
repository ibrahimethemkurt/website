import React from 'react';
import { motion } from 'framer-motion';
import Prism from '@/component/Prism';
import CircularGallery from '@/component/CircularGallery';
import tarihMirasImg from '@/assets/tarih_miras.png';

// Örnek proje verileri (Gelecekte bunları kendi projelerinize göre güncelleyebilirsiniz)
const projectItems = [
  { image: tarihMirasImg, text: 'Tarih Mirası | Proje Yöneticisi', link: 'https://tarih-miras.vercel.app/' },
  { image: 'https://picsum.photos/seed/2/800/600?grayscale', text: 'Proje 2', link: 'https://github.com/ibrahimethemkurt' },
  { image: 'https://picsum.photos/seed/3/800/600?grayscale', text: 'Proje 3', link: 'https://github.com/ibrahimethemkurt' },
  { image: 'https://picsum.photos/seed/4/800/600?grayscale', text: 'Proje 4', link: 'https://github.com/ibrahimethemkurt' },
  { image: 'https://picsum.photos/seed/5/800/600?grayscale', text: 'Proje 5', link: 'https://github.com/ibrahimethemkurt' },
];

const Projects = () => {
  const handleItemClick = (index) => {
    const item = projectItems[index];
    if (item && item.link) {
      // Projeye tıklandığında linki yeni sekmede açar
      window.open(item.link, '_blank');
    }
  };

  return (
    <section
      id="projeler"
      className="relative w-full h-[100dvh] flex flex-col justify-center bg-background text-foreground overflow-hidden"
    >
      {/* Prism Background (Deneyimler kısmı ile aynı) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Prism
          animationType="rotate"
          glow={0.6}
          noise={0.3}
          scale={3}
          hueShift={0.8}
          colorFrequency={0.6}
          bloom={0.5}
          timeScale={0.3}
          transparent={true}
          suspendWhenOffscreen={true}
        />
      </div>

      {/* Okunabilirliği artırmak için hafif siyah overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-black/40" />

      {/* Sol Üst - Başlık ve Bilgi Yazısı (Absolute konumlandırma ile galeriden bağımsız) */}
      <div className="absolute top-24 left-6 md:left-16 z-20 pointer-events-none flex flex-col gap-4">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className="w-8 h-[1px] bg-white/30" />
          <span className="text-xs uppercase tracking-[0.4em] text-white/40 font-light">
            Projeler
          </span>
        </motion.div>

        {/* Helper Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-sm font-light max-w-sm leading-relaxed"
        >
          İncelemek için galeriyi sürükleyin, detaylar için projeye tıklayın.
        </motion.p>
      </div>

      {/* Circular Gallery */}
      <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing flex items-center justify-center mt-[2vh] md:mt-[5vh]">
        <div className="w-full h-full">
          <CircularGallery
            items={projectItems}
            bend={0}
            textColor="#ffffff"
            borderRadius={0.05}
            onItemClick={handleItemClick}
            imageScale={0.65} // Resimleri bir tık daha küçült (%75)
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
