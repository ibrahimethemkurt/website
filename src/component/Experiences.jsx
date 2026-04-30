import React from 'react';
import { motion } from 'framer-motion';
import { MotionCarousel } from '@/components/animate-ui/components/community/motion-carousel';
import Prism from '@/component/Prism';

import bangiadLogo from '@/assets/bangiad_logo.svg';
import hsdLogo from '@/assets/hsd_logo.svg';
import ybstLogo from '@/assets/ybst_logo.svg';

const cvItems = [
  { 
    id: 1, 
    company: 'BANGİAD', 
    role: 'Genel Sekreterlik', 
    date: 'Nis 2025 - Devam Ediyor',
    logo: bangiadLogo,
    description: 'BANGİAD bünyesinde, derneğin günlük idari ve operasyonel süreçlerini uçtan uca planlayıp yönetiyorum. Yönetim kurulu, üyeler ve dış paydaşlar arasındaki iletişim ağını koordine ederek kesintisiz bir bilgi akışı sağlıyorum. Resmi belgelerin yönetimi, toplantıların organize edilmesi ve kararların takibi gibi süreçleri yürütürken; operasyonel verimliliği artırmak amacıyla iç etkinlikler ve projelerin hayata geçirilmesine de aktif destek sunuyorum.'
  },
  { 
    id: 2, 
    company: 'Huawei Student Developers Türkiye', 
    role: 'Bölge Lideri', 
    date: 'Eyl 2025 - Şub 2026',
    logo: hsdLogo,
    description: 'Güney Marmara bölgesinde yer alan 8 farklı Huawei Student Developers topluluğunun bölge liderliğini üstlenerek, bu ekiplerin koordinasyonunu ve denetimini sağladım. Bölgesel projelerin, eğitim faaliyetlerinin ve üniversiteler arası iş birliklerinin yürütülmesinde aktif rol oynadım. Öğrenci toplulukları arasındaki etkileşimi ve bilgi paylaşımını güçlendirmek amacıyla kampüs temsilcilerine ve öğrenci liderlerine stratejik mentörlük desteği sundum.'
  },
  { 
    id: 3, 
    company: 'Huawei Student Developers Bandırma', 
    role: 'Kurucu', 
    date: 'Ağu 2024 - Şub 2026',
    logo: hsdLogo,
    description: 'Huawei Student Developers Bandırma topluluğunun kurucusu olarak, iki yıl içerisinde 100\'den fazla yetenekli öğrenciden oluşan dev bir ekip kurup yönettim. Topluluğumuz bünyesinde 7\'den fazla dijital ve yazılım projesine liderlik ettim. Sektör partnerleri ve üniversitelerle iş birliği geliştirerek 2 büyük ölçekli teknoloji zirvesi, 1 ideathon, 15\'ten fazla teknoloji eğitimi ve 20\'yi aşkın sosyal etkinlik düzenledik. Aynı zamanda sosyal medya, dergi ve blog gibi 200\'den fazla dijital içeriğin üretim sürecini yöneterek yazılım ve inovasyon odaklı güçlü bir öğrenci ekosistemi inşa ettim.'
  },
  { 
    id: 4, 
    company: 'BANÜ YBS Topluluğu', 
    role: 'Başkan Yardımcısı & Proje Koordinatörü', 
    date: 'Eki 2023 - Haz 2024',
    logo: ybstLogo,
    description: 'Başkan Yardımcısı ve Proje Koordinatörü olarak, topluluğun proje geliştirme süreçlerini yönettim ve teknik eğitim etkinliklerini koordine ettim. Öğrencileri ve sektör profesyonellerini bir araya getiren 250\'den fazla katılımcının yer aldığı büyük bir teknoloji zirvesi düzenledim. Ayrıca öğrencilerin mesleki gelişimlerine katkı sağlamak amacıyla teknoloji odaklı çeşitli teknik atölye çalışmalarını planlayıp hayata geçirdim.'
  },
];

const Experiences = ({ onScrollPastEdge }) => {
  return (
    <section
      id="deneyimler"
      className="relative w-full min-h-[100dvh] flex flex-col justify-center bg-background text-foreground overflow-hidden"
    >
      {/* Prism Background */}
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

      {/* Subtle overlay for readability without obscuring full background */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-black/40" />

      <div className="w-full h-full max-w-[100vw] mx-auto px-4 md:px-12 py-16 flex flex-col z-10 relative">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-8 h-[1px] bg-white/30" />
          <span className="text-xs uppercase tracking-[0.4em] text-white/40 font-light">
            Deneyimler
          </span>
        </motion.div>

        {/* Experiences Carousel */}
        <div className="w-full flex-1 flex flex-col justify-center relative mt-12 pb-12">
            <MotionCarousel
              slides={cvItems}
              options={{ loop: false, align: 'center', startIndex: 0 }}
              className="[--slide-height:32rem] md:[--slide-height:38rem] [--slide-spacing:1.5rem] [--slide-size:90%] sm:[--slide-size:70%] md:[--slide-size:50%] lg:[--slide-size:40%] w-full mx-auto"
              onEdgeScroll={onScrollPastEdge}
              renderItem={(item, index, isActive) => (
                <div className={`w-full h-full p-5 sm:p-6 flex flex-col rounded-[32px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl relative overflow-hidden group transition-all duration-500 ${isActive ? 'bg-white/[0.05] border-white/[0.15] shadow-2xl shadow-black/50' : 'hover:bg-white/[0.04]'}`}>
                    {/* Top Glow/Gradient Effect */}
                    <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

                    {/* Header: Logo and Date */}
                    <div className="flex justify-between items-start w-full relative z-10 mb-5">
                        <div className="flex items-center justify-start shrink-0">
                            <img 
                                src={item.logo} 
                                alt={`${item.company} logo`} 
                                className="w-36 h-36 sm:w-44 sm:h-44 object-contain brightness-0 invert opacity-90" 
                            />
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/50 text-[10px] sm:text-[11px] uppercase tracking-widest font-normal shrink-0 ml-4 mt-2">
                            {item.date}
                        </div>
                    </div>
                    
                    {/* Titles */}
                    <div className="flex flex-col gap-1 relative z-10 mb-5">
                        <h3 className="text-2xl sm:text-[28px] font-['Inter',sans-serif] font-medium text-white tracking-tight leading-tight">
                            {item.role}
                        </h3>
                        <h4 className="text-sm sm:text-base text-white/70 font-['Inter',sans-serif] font-normal tracking-wide">
                            {item.company}
                        </h4>
                    </div>

                    {/* Details - Text Block */}
                    <div className="flex-1 overflow-y-auto pr-3 relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <p className="text-white/80 text-[14px] sm:text-[15px] font-['Inter',sans-serif] font-normal leading-[1.8] text-left">
                            {item.description}
                        </p>
                    </div>
                </div>
              )}
            />
        </div>
      </div>
    </section>
  );
};

export default Experiences;
