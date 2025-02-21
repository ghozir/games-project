FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Pastikan direktori untuk npm cache ada dan bisa diakses
RUN mkdir -p /home/node/.npm && chmod -R 777 /home/node/.npm

# Copy package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Install dependencies
RUN npm install --no-cache

# Copy semua file project ke dalam container
COPY . .

# Expose port
EXPOSE 9000

# Jalankan aplikasi
CMD ["npm", "start"]
