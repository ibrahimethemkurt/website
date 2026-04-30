# 1. Aşama: Build (Derleme)
FROM node:20 as build

WORKDIR /app

# Paket dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm dosyaları kopyala
COPY . .

# Üretim için projeyi derle
RUN npm run build

# 2. Aşama: Production (Nginx ile yayınlama)
FROM nginx:alpine

# Nginx'in varsayılan html dizinine derlenmiş dosyaları kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# İsteğe bağlı: React Router gibi istemci taraflı yönlendirmeler için özel nginx ayarı eklenebilir.
# Standart static siteler için default ayar yeterlidir.

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
