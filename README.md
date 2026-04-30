# ibrahimethemkurt.com - React Portfolio

Bu proje Vite ve React kullanılarak geliştirilmiştir. Aşağıdaki talimatlar projenin hem geliştirme (development) hem de üretim (production) ortamlarında Docker ile nasıl çalıştırılacağını açıklamaktadır.

## Gerekli Kurulumlar

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Docker ile Çalıştırma

Proje içerisinde hazır bir `docker-compose.yml` dosyası bulunmaktadır. Bu dosya sayesinde tek bir komutla geliştirme veya üretim ortamını ayağa kaldırabilirsiniz.

### Geliştirme (Development) Ortamı

Geliştirme ortamında Hot-Module-Replacement (HMR) aktiftir. Kodunuzda yaptığınız değişiklikler anında tarayıcıya yansır.

1. Geliştirme ortamını başlatmak için:
   ```bash
   docker-compose up dev
   ```
   *Arka planda çalıştırmak isterseniz `-d` parametresini ekleyebilirsiniz: `docker-compose up -d dev`*

2. Tarayıcınızdan uygulamaya erişin:
   **http://localhost:5173**

### Üretim (Production) Ortamı

Üretim ortamı, uygulamanın optimize edilmiş build halini Nginx sunucusu üzerinden yayınlar. Bu sayede uygulamanız çok daha performanslı çalışır.

1. Üretim ortamını başlatmak için:
   ```bash
   docker-compose up prod
   ```
   *Arka planda çalıştırmak isterseniz `-d` parametresini ekleyebilirsiniz: `docker-compose up -d prod`*

2. Tarayıcınızdan uygulamaya erişin:
   **http://localhost:8080**

## Docker İmajlarını Yeniden Oluşturma

Eğer `package.json` dosyasında bir değişiklik yaparsanız veya paket eklerseniz/çıkarırsanız, imajları yeniden build etmeniz gerekir:

```bash
# Geliştirme ortamı için yeniden build:
docker-compose build dev

# Üretim ortamı için yeniden build:
docker-compose build prod

# Veya tüm servisleri yeniden build edip başlatmak için:
docker-compose up --build
```

## Konteynerları Kapatma

Çalışan konteynerları durdurmak ve kaldırmak için:

```bash
docker-compose down
```
