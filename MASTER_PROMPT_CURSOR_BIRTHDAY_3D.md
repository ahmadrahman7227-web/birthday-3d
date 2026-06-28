# MASTER PROMPT CURSOR — 3D Birthday Website Interaktif Responsive

Gunakan file ini sebagai instruksi utama untuk Cursor.  
Kondisi awal: folder project masih kosong.

Tujuan project: buat website ulang tahun 3D interaktif untuk adik perempuan, responsive di desktop, tablet, dan mobile, ringan, stabil, dan siap deploy ke Vercel.

---

## 1. PERAN CURSOR

Bertindaklah sebagai:

- Senior Frontend Developer
- Creative 3D Web Developer
- React + TypeScript + Three.js Engineer
- UI/UX Designer untuk website personal hadiah ulang tahun
- QA Engineer yang wajib melakukan testing mandiri

Jangan hanya membuat tampilan. Pastikan project bisa dijalankan, responsive, tidak error, dan berhasil build.

---

## 2. TARGET HASIL AKHIR

Buat website dengan konsep:

**“A Magical Birthday World for My Little Sister”**

Website harus terasa seperti dunia ulang tahun kecil yang interaktif, dreamy, cute, hangat, dan personal.

Fitur utama:

1. Hero section full screen dengan scene 3D.
2. Kue ulang tahun 3D di tengah.
3. Balon 3D melayang.
4. Gift box / kotak hadiah interaktif.
5. Tombol **Open Surprise**.
6. Saat tombol ditekan:
   - gift box berubah/terbuka secara visual,
   - confetti muncul,
   - pesan ulang tahun tampil,
   - animasi terasa smooth.
7. Section memories / wishes di bawah hero.
8. Tombol play/pause music placeholder, tanpa autoplay paksa.
9. Layout responsive di semua device.
10. Build production harus berhasil tanpa error.

---

## 3. STACK WAJIB

Gunakan:

- React
- TypeScript
- Vite
- Three.js
- @react-three/fiber
- @react-three/drei
- Framer Motion
- canvas-confetti
- CSS biasa / global CSS

Jangan gunakan Tailwind dulu. Untuk project ini, CSS biasa lebih aman, lebih cepat, dan mengurangi risiko config error.

---

## 4. PERINTAH SETUP DARI FOLDER KOSONG

Jika folder benar-benar kosong, jalankan:

```bash
npm create vite@latest . -- --template react-ts
```

Lalu install dependency:

```bash
npm install
npm install three @react-three/fiber @react-three/drei framer-motion canvas-confetti lucide-react
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Pastikan `package.json` memiliki scripts minimal:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest --run",
    "test:watch": "vitest"
  }
}
```

Jika ada script bawaan dari Vite, jangan rusak. Tambahkan script yang kurang saja.

---

## 5. STRUKTUR FOLDER YANG HARUS DIBUAT

Buat struktur seperti ini:

```txt
src/
├── components/
│   ├── scene/
│   │   ├── BirthdayScene.tsx
│   │   ├── Cake.tsx
│   │   ├── Balloons.tsx
│   │   ├── GiftBox.tsx
│   │   ├── FloatingStars.tsx
│   │   └── SceneCamera.tsx
│   ├── ui/
│   │   ├── HeroOverlay.tsx
│   │   ├── MusicButton.tsx
│   │   ├── MemorySection.tsx
│   │   └── WishCard.tsx
│   └── layout/
│       └── PageShell.tsx
├── data/
│   └── birthdayContent.ts
├── hooks/
│   ├── useResponsiveScene.ts
│   └── useBirthdayAudio.ts
├── test/
│   └── setup.ts
├── App.tsx
├── main.tsx
├── index.css
└── App.test.tsx
```

Jangan membuat struktur terlalu rumit. Project harus mudah dipahami.

---

## 6. ATURAN DESAIN VISUAL

Gunakan style:

- dreamy
- magical
- cute
- warm
- elegant
- birthday celebration
- cocok untuk adik perempuan

Palet warna:

```txt
Dark purple background: #12091f
Soft purple: #24103f
Pink accent: #ff8fd8
Soft pink: #ffc7ea
Gold: #ffd166
White: #fff7fb
Blue accent: #8ec5ff
```

Nuansa visual:

- background gradient malam dreamy,
- bintang kecil,
- glowing particles ringan,
- kue ulang tahun dengan lilin,
- balon pastel,
- gift box pink/gold,
- confetti saat surprise dibuka,
- typography besar dan emotional.

---

## 7. ATURAN RESPONSIVE

Website wajib nyaman di:

- mobile kecil 360px,
- mobile umum 390px–430px,
- tablet 768px,
- laptop 1366px,
- desktop besar.

Implementasikan responsive dengan:

1. CSS media queries.
2. Hook `useResponsiveScene`.
3. Camera position berbeda antara mobile dan desktop.
4. Object scale berbeda antara mobile dan desktop.
5. Text overlay jangan menutupi object 3D.
6. Button minimal 44px height untuk mobile.
7. Jangan gunakan horizontal scroll.
8. Canvas harus full width.
9. Scene 3D harus tetap center.
10. Efek berat dikurangi di mobile.

Contoh behavior:

```txt
Desktop:
- camera lebih jauh dan cinematic
- object lebih besar
- dekorasi lebih banyak

Mobile:
- camera lebih dekat tapi object tetap tidak terpotong
- scale scene sedikit lebih kecil
- UI text lebih compact
- animasi tetap smooth
```

---

## 8. ATURAN 3D SCENE

Gunakan geometry procedural agar tidak bergantung pada file model external.

Jangan gunakan file `.glb` dulu kecuali benar-benar diperlukan.  
Alasannya: folder kosong, tidak ada asset, dan kita ingin project langsung berjalan tanpa broken import.

Object yang perlu dibuat:

### Cake

Buat kue dari primitive geometry:

- cylinder untuk base cake,
- cylinder kecil untuk cream layer,
- beberapa candle dari cylinder,
- flame dari cone/sphere kecil,
- warna pastel pink, cream, gold.

### Balloons

Buat balon dari:

- sphere geometry,
- string dari line/curve sederhana,
- posisi random tapi stabil,
- animasi floating perlahan menggunakan `useFrame`.

### GiftBox

Buat gift box dari:

- box geometry,
- ribbon horizontal dan vertical dari box tipis,
- lid/tutup box,
- saat surprise dibuka, lid naik/rotasi sedikit,
- gunakan state `isOpen`.

### FloatingStars

Buat bintang/particles ringan:

- gunakan mesh kecil,
- jumlah dibatasi,
- jangan terlalu banyak agar HP tidak lag.
- target 40–80 particles saja.

---

## 9. INTERAKSI WAJIB

Implementasikan interaksi:

1. Klik tombol **Open Surprise**.
2. State `isSurpriseOpen` menjadi true.
3. Jalankan confetti menggunakan `canvas-confetti`.
4. Gift box berubah visual.
5. Pesan ulang tahun muncul.
6. Button berubah menjadi **Replay Surprise** atau **Open Again**.
7. Klik object gift box juga bisa membuka surprise.
8. Klik balon boleh memberi efek kecil seperti scale bounce atau sparkle sederhana.

Jangan buat interaksi yang terlalu kompleks sampai menyebabkan error.

---

## 10. KONTEN TEKS DEFAULT

Gunakan data terpusat di:

```txt
src/data/birthdayContent.ts
```

Isi default:

```ts
export const birthdayContent = {
  sisterName: "My Little Sister",
  title: "Happy Birthday",
  subtitle: "A little magical world made just for you.",
  surpriseMessage:
    "Today is your special day. I hope your life is always filled with happiness, beautiful surprises, and dreams that slowly come true. You are loved more than you know.",
  wishes: [
    "May your smile always shine brighter than the candles.",
    "May every dream you keep in your heart find its way to you.",
    "May this year bring you more happiness, confidence, and beautiful memories."
  ],
  memories: [
    {
      title: "For Your Smile",
      text: "Your smile makes ordinary days feel warmer."
    },
    {
      title: "For Your Dreams",
      text: "Never stop dreaming, because beautiful things often begin quietly."
    },
    {
      title: "For Your Future",
      text: "I hope you grow into everything you wish to become."
    }
  ]
};
```

Buat agar nanti mudah diganti nama adik dan isi pesannya.

---

## 11. UI / UX WAJIB

Buat halaman terasa premium dan tidak kosong.

Komponen UI:

### HeroOverlay

Berisi:

- badge kecil: “Special Birthday Gift”
- title: “Happy Birthday, My Little Sister”
- subtitle pendek
- tombol Open Surprise
- pesan muncul setelah surprise dibuka

### MusicButton

- Tombol play/pause.
- Jangan autoplay.
- Jika belum ada file musik, buat logic aman:
  - tidak error jika audio file belum tersedia,
  - tampilkan tombol visual saja,
  - beri komentar di kode bahwa user bisa menaruh file di `/public/audio/birthday.mp3`.

### MemorySection

- Card wishes/memories.
- Responsive grid:
  - desktop 3 kolom,
  - tablet 2 kolom,
  - mobile 1 kolom.
- Gunakan framer-motion untuk animasi masuk halus.

---

## 12. PERFORMANCE RULES

Wajib perhatikan performance:

1. Jangan pakai texture besar.
2. Jangan pakai model external berat.
3. Jangan terlalu banyak shadow.
4. Jangan terlalu banyak particles.
5. Gunakan `dpr={[1, 1.5]}` pada Canvas.
6. Batasi animasi di mobile.
7. Gunakan Suspense fallback jika ada async object.
8. Jangan membuat infinite state update di `useFrame`.
9. Jangan membuat object random berubah setiap render.
10. Gunakan `useMemo` untuk data posisi particles/balon.

Canvas contoh:

```tsx
<Canvas
  dpr={[1, 1.5]}
  camera={{ position: [0, 2.2, 7], fov: 45 }}
>
```

---

## 13. ACCESSIBILITY

Walaupun website 3D, tetap wajib accessible:

1. Button punya teks jelas.
2. Button bisa difokuskan keyboard.
3. Jangan hanya mengandalkan warna.
4. Kontras teks cukup.
5. Tambahkan `aria-label` untuk tombol music.
6. Tambahkan fallback text untuk section penting.
7. Jangan autoplay audio.
8. Respect user yang tidak ingin motion berlebihan jika memungkinkan.

---

## 14. TESTING MANDIRI WAJIB

Cursor wajib membuat dan menjalankan testing.

Minimal testing:

1. App berhasil render.
2. Title birthday muncul.
3. Button Open Surprise muncul.
4. Klik Open Surprise menampilkan surprise message.
5. Memory cards tampil.
6. Music button tampil.

Buat file:

```txt
src/App.test.tsx
src/test/setup.ts
```

Setup Vitest di `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom";
```

Tambahkan konfigurasi test di `vite.config.ts` jika diperlukan:

```ts
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true
  }
});
```

Jika testing komponen Canvas/WebGL bermasalah di jsdom, pisahkan test untuk UI overlay, content, dan App shell. Jangan memaksa test WebGL yang tidak stabil.

---

## 15. COMMAND TESTING YANG WAJIB DIJALANKAN

Setelah kode selesai, jalankan:

```bash
npm run build
```

Lalu:

```bash
npm run test
```

Lalu jalankan dev server:

```bash
npm run dev
```

Cursor wajib memperbaiki semua error sampai:

- `npm run build` berhasil.
- `npm run test` berhasil.
- website bisa dibuka di local dev server.
- tidak ada import path rusak.
- tidak ada TypeScript error.
- tidak ada blank screen.

---

## 16. MANUAL QA CHECKLIST

Setelah build/test berhasil, lakukan pengecekan manual:

### Desktop

- Hero full screen.
- Scene 3D terlihat center.
- Kue, balon, gift box terlihat.
- Tombol Open Surprise bekerja.
- Confetti muncul.
- Pesan ulang tahun muncul.
- Scroll ke memory section lancar.

### Mobile

Gunakan responsive preview browser.

Cek ukuran:

- 360px width
- 390px width
- 430px width
- 768px width

Pastikan:

- tidak ada horizontal scroll,
- text tidak kepotong,
- button mudah ditekan,
- canvas tidak terlalu tinggi/aneh,
- object 3D tidak keluar layar,
- memory cards jadi 1 kolom di mobile.

---

## 17. DEPLOYMENT TARGET

Project harus siap deploy ke Vercel.

Pastikan:

```bash
npm run build
```

menghasilkan folder:

```txt
dist/
```

Jangan menggunakan fitur backend.  
Jangan membutuhkan environment variable.  
Jangan membutuhkan database.  
Jangan membutuhkan file asset yang belum ada.

---

## 18. BATASAN PENTING

Jangan lakukan hal berikut:

1. Jangan menggunakan library 3D yang belum diminta.
2. Jangan membuat backend.
3. Jangan membuat authentication.
4. Jangan menggunakan database.
5. Jangan menggunakan asset external yang bisa menyebabkan broken link.
6. Jangan membuat project Next.js.
7. Jangan membuat kode terlalu kompleks.
8. Jangan menghapus script penting dari package.json.
9. Jangan membuat scene terlalu berat untuk mobile.
10. Jangan berhenti sebelum build dan test berhasil.

---

## 19. KUALITAS KODE

Pastikan:

- Komponen rapi.
- TypeScript aman.
- Tidak ada `any` yang tidak perlu.
- Data konten dipisah.
- Responsive logic jelas.
- CSS rapi.
- Nama file konsisten.
- Tidak ada dead code.
- Tidak ada console error.
- Tidak ada import yang tidak dipakai.

---

## 20. URUTAN KERJA UNTUK CURSOR

Ikuti urutan ini:

1. Cek apakah folder kosong.
2. Jika belum ada Vite project, jalankan setup Vite React TS.
3. Install semua dependency.
4. Buat struktur folder.
5. Buat data birthday content.
6. Buat hooks.
7. Buat komponen UI.
8. Buat komponen 3D.
9. Integrasikan di App.
10. Buat CSS responsive.
11. Buat test setup.
12. Buat test.
13. Jalankan build.
14. Jalankan test.
15. Perbaiki semua error.
16. Jalankan dev server.
17. Berikan laporan akhir:
    - file yang dibuat,
    - fitur yang selesai,
    - command yang berhasil,
    - cara mengganti nama adik,
    - cara menambahkan musik,
    - cara deploy ke Vercel.

---

## 21. DETAIL IMPLEMENTASI YANG DIHARAPKAN

### App.tsx

App harus mengatur state:

```ts
const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
```

Function:

```ts
const handleOpenSurprise = () => {
  setIsSurpriseOpen(true);
  triggerConfetti();
};
```

Jika sudah open dan user klik replay, boleh trigger confetti lagi.

### triggerConfetti

Buat helper function aman:

```ts
const triggerConfetti = async () => {
  const confetti = (await import("canvas-confetti")).default;
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.65 }
  });
};
```

### BirthdayScene

Props:

```ts
type BirthdaySceneProps = {
  isSurpriseOpen: boolean;
  onOpenSurprise: () => void;
};
```

### GiftBox

Props:

```ts
type GiftBoxProps = {
  isOpen: boolean;
  onOpen: () => void;
};
```

GiftBox harus bisa diklik.

### useResponsiveScene

Return minimal:

```ts
{
  isMobile: boolean;
  cameraPosition: [number, number, number];
  sceneScale: number;
}
```

---

## 22. AUDIO PLACEHOLDER

Buat hook `useBirthdayAudio`.

Behavior:

- audio file path default: `/audio/birthday.mp3`
- tidak autoplay
- jika file tidak ada, jangan crash
- tombol tetap bisa tampil
- ketika user klik play dan file tidak ada, tampilkan state error ringan atau ubah label jadi “Add music file”

Catatan di UI:

```txt
Add /public/audio/birthday.mp3 to enable music
```

Tapi jangan terlalu mengganggu tampilan.

---

## 23. STYLE DETAIL

Gunakan CSS yang memberi kesan premium:

- gradient background,
- glassmorphism card,
- soft shadow,
- border subtle,
- glowing button,
- responsive typography dengan `clamp()`,
- smooth scrolling,
- no horizontal overflow.

Contoh CSS direction:

```css
:root {
  font-family: Inter, system-ui, sans-serif;
  color: #fff7fb;
  background: #12091f;
}

body {
  margin: 0;
  overflow-x: hidden;
}

button {
  font: inherit;
}
```

---

## 24. FINAL REPORT YANG HARUS DIBERIKAN CURSOR

Setelah selesai, berikan laporan seperti ini:

```txt
Project 3D Birthday Website selesai.

Yang sudah dibuat:
- React + Vite + TypeScript setup
- Three.js scene dengan React Three Fiber
- Cake 3D procedural
- Balloons 3D animated
- Gift box interactive
- Confetti surprise
- Responsive layout desktop/tablet/mobile
- Memory and wishes section
- Music button placeholder
- Vitest testing
- Production build berhasil

Command yang sudah berhasil:
- npm run build
- npm run test

Cara menjalankan:
npm run dev

Cara mengganti nama:
Edit src/data/birthdayContent.ts

Cara menambahkan musik:
Tambahkan file ke public/audio/birthday.mp3

Cara deploy:
Upload repo ke GitHub lalu import ke Vercel.
```

---

## 25. PROMPT UTAMA UNTUK CURSOR

Gunakan prompt ini di Cursor setelah file ini ada di project:

```txt
Baca file MASTER_PROMPT_CURSOR_BIRTHDAY_3D.md ini secara penuh dan ikuti semua instruksinya.

Kondisi project saat ini adalah folder kosong atau hampir kosong. 
Tolong buat project React + Vite + TypeScript untuk website ulang tahun 3D interaktif yang responsive di semua device.

Kerjakan end-to-end:
1. Setup project jika belum ada.
2. Install dependency yang dibutuhkan.
3. Buat struktur folder.
4. Implementasikan semua komponen.
5. Buat desain 3D procedural tanpa asset external wajib.
6. Buat UI responsive.
7. Buat testing dengan Vitest.
8. Jalankan npm run build.
9. Jalankan npm run test.
10. Perbaiki semua error sampai build dan test berhasil.

Jangan berhenti hanya setelah menulis kode.
Wajib testing mandiri.
Jangan gunakan backend, database, Next.js, atau asset external yang menyebabkan broken import.
Pastikan hasil akhir bisa langsung dijalankan dengan npm run dev dan siap deploy ke Vercel.

Setelah selesai, berikan laporan final sesuai format pada bagian FINAL REPORT.
```

---

## 26. CATATAN UNTUK USER

Setelah Cursor selesai, kamu bisa ganti isi ucapan di:

```txt
src/data/birthdayContent.ts
```

Kalau ingin menambahkan musik, buat folder:

```txt
public/audio/
```

Lalu masukkan file:

```txt
birthday.mp3
```

Setelah itu jalankan:

```bash
npm run dev
```

Untuk deploy:

1. Push project ke GitHub.
2. Buka Vercel.
3. Import repository.
4. Build command: `npm run build`.
5. Output directory: `dist`.
