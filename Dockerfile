# Menggunakan image Node.js sebagai base image  
FROM node:18  
  
# Set working directory  
WORKDIR /usr/src/app  
  
# Menyalin package.json dan package-lock.json  
COPY package*.json ./  
  
# Menginstal dependensi  
RUN npm install  
  
# Menyalin semua file aplikasi ke dalam kontainer  
COPY . . 

# Salin file prisma schema
COPY prisma ./prisma

# Menjalankan migrasi Prisma 
RUN npx prisma generate

# Mengexpose port aplikasi  
EXPOSE 3000  
  
# Menjalankan aplikasi  
CMD ["npm", "start"]  