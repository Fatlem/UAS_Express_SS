Berikut adalah panduan lengkap untuk menjalankan aplikasi Anda dari awal, termasuk cara mengatur proyek, menjalankan Docker, menggunakan Prisma Studio, dan mengakses API.

# 💻 Prijek UAS_Express_SS

# 📚 Panduan Menjalankan Aplikasi Pengumuman Kursus

Sebelum memulai, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Postman](https://www.postman.com/) (untuk menguji API)

## 1. Mengatur Proyek

### Clone Repository

Clone repositori ke mesin lokal Anda:

```bash
git clone https://github.com/Fatlem/UAS_Express_SS.git
cd repo
```

### Instal Dependensi

Jika Anda tidak menggunakan Docker, instal dependensi dengan perintah berikut:

```bash
npm install
```

## 2. Menjalankan Aplikasi dengan Docker

```bash
docker-compose up --build
```

Aplikasi akan berjalan di `http://localhost:3000`.

## 3. Menggunakan Prisma Studio

Setelah aplikasi berjalan, Anda dapat mengakses Prisma Studio untuk mengelola database:

```bash
npx prisma studio
```

Ini akan membuka antarmuka pengguna di browser untuk mengelola model database Anda.

## 4. Menggunakan API

### 4.1. Menguji API dengan Postman

Anda dapat menggunakan Postman untuk menguji endpoint API. Berikut adalah beberapa contoh endpoint yang dapat Anda gunakan:

#### 1. **Login**

- **Endpoint**: `/login`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```

#### 2. **Register**

- **Endpoint**: `/register`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "username": "your_username",
        "email": "your_email",
        "password": "your_password"
    }
    ```

#### 3. **Get All Announcements**

- **Endpoint**: `/announcements`
- **Method**: `GET`
- **Description**: Mengambil semua pengumuman.

#### 4. **Create Announcements**

- **Endpoint**: `/announcements`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "title": "Announcement Title",
        "message": "Announcement Message"
    }
    ```

#### 5. **Edit Announcements**

- **Endpoint**: `/announcements/:announcementId`
- **Method**: `PUT`
- **Request Body**:
    ```json
    {
        "title": "Updated Announcement Title",
        "message": "Updated Announcement Message"
    }
    ```

#### 6. **Delete Announcements**

- **Endpoint**: `/announcements/:announcementId`
- **Method**: `DELETE`
- **Request Body**:
    ```json
    {
        "announcementId": 1
    }
    ```

## 5. Kontak

Jika Anda memiliki pertanyaan atau saran, silakan hubungi saya di [email@example.com](mailto:email@example.com).

---

Dokumentasi ini memberikan panduan lengkap untuk menjalankan aplikasi Anda dari awal, termasuk cara mengatur proyek, menjalankan Docker, menggunakan Prisma Studio, dan mengakses API. Jika Anda memiliki pertanyaan lebih lanjut atau memerlukan bantuan tambahan, silakan beri tahu!
