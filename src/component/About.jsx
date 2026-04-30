import React from 'react';
import { motion } from 'framer-motion';

/* Kelime kelime fade-in yapan yardımcı bileşen */
const AnimatedText = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const About = () => {
  return (
    <section
      id="hakkinda"
      className="relative w-full min-h-[100dvh] flex items-center bg-background text-foreground overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-0">

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-8 h-[1px] bg-white/30" />
          <span className="text-xs uppercase tracking-[0.4em] text-white/40 font-light">
            Hakkımda
          </span>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Sol Kolon — Büyük Başlık */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              <AnimatedText text="Teknolojiyi" delay={0} />
              <br />
              <AnimatedText text="Yönetmek." delay={0.15} />
              <br />
              <span className="text-white/40">
                <AnimatedText text="Topluluklara" delay={0.3} />
                <br />
                <AnimatedText text="İlham Vermek." delay={0.4} />
              </span>
            </h2>

            {/* Ok ikonu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </motion.div>
          </div>

          {/* Sağ Kolon — Paragraflar */}
          <div className="flex flex-col justify-center gap-8 lg:gap-10">

            {/* Paragraf 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-base md:text-lg text-white/60 font-light leading-[1.8]"
            >
              Merhaba, ben İbrahim Ethem Kurt. Yönetim Bilişim Sistemleri (MIS) öğrencisi ve teknoloji topluluklarına liderlik eden bir proje yöneticisiyim. Güney Marmara'daki üniversiteler arası köprüler kuran projelerden, yapay zeka ve inovasyon zirvelerine kadar birçok büyük ölçekli organizasyonun mimarıyım.
            </motion.p>

            {/* Paragraf 2 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg text-white/60 font-light leading-[1.8]"
            >
              Teknoloji ve insanın kesiştiği yerde çalışmayı seviyorum. Huawei Student Developers Bandırma'nın kurucusu olarak, yüzlerce öğrencinin dijital beceriler kazanmasına ve projeler üretmesine öncülük ettim.
            </motion.p>

            {/* Vurgulu Blok */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative pl-6 border-l border-white/20"
            >
              <p className="text-lg md:text-xl text-white/80 font-normal leading-[1.7]">
                Sadece etkinlik üretmiyorum; içerik de üretiyorum. Boş vakitlerimde Instagram'da dijital pazarlama, yapay zeka ve girişimcilik üzerine içerikler üreterek bu tutkumu daha geniş kitlelerle paylaşıyorum.
              </p>
            </motion.div>

            {/* Vizyon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-4 pt-6 border-t border-white/10"
            >
              <p className="text-lg md:text-2xl italic text-white/40 font-light leading-[1.7] tracking-wide">
                "En büyük hedefim: Sadece kendi girişimlerimi kurmakla kalmayıp, genç yeteneklerin bir araya geldiği, yenilikçi fikirlerin ürüne dönüştüğü dev bir Girişimcilik Ekosistemi inşa etmek."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
