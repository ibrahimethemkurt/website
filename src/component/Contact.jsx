import React from 'react';
import { motion } from 'framer-motion';
import Prism from '@/component/Prism';
const Contact = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      url: 'https://www.linkedin.com/in/ibrahimethemkurt/',
    },
    {
      name: 'Instagram',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      url: 'https://www.instagram.com/ibrahimethemkrt/',
    },
    {
      name: 'E-posta',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      ),
      url: 'mailto:iletisim@ibrahimethemkurt.com',
    }
  ];

  return (
    <section
      id="iletisim"
      className="relative w-full h-[100dvh] flex flex-col justify-center bg-background text-foreground overflow-hidden snap-start"
    >
      {/* Prism Background (Projeler ve Deneyimler kısmı ile aynı) */}
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

      {/* İçerik */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-8">
        
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wider text-white">İletişime Geçin</h2>
          <p className="text-white/50 max-w-md mx-auto font-light">
            Projeleriniz, işbirlikleri veya sadece kahve içip sohbet etmek için bana aşağıdaki kanallardan ulaşabilirsiniz.
          </p>
        </motion.div>

        {/* İkonlar */}
        <div className="flex items-center justify-center gap-10 md:gap-16">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/50 group-hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                {link.icon}
              </div>
              <span className="text-sm font-light text-white/50 group-hover:text-white/90 transition-colors duration-300 tracking-widest uppercase">
                {link.name}
              </span>
            </motion.a>
          ))}
        </div>
        
      </div>
      
    </section>
  );
};

export default Contact;
