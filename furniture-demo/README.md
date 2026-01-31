# 🪑 NexChakra Furniture Studio Pro
**An Advanced 3D Product Configuration & Inventory Terminal**

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=for-the-badge&logo=vercel)](https://furniture3d-demo.vercel.app/)

---

## 🚀 Live Environment
The project is deployed and optimized for high-performance rendering at:  
👉 **[https://furniture3d-demo.vercel.app/](https://furniture3d-demo.vercel.app/)**

---

## 🛠️ Integrated Modules

### 1. 🏗️ 3D Studio Terminal (Root)
The core engine of the platform where users can customize premium furniture in real-time.
* **Real-time Engine**: Powered by Three.js and React Three Fiber for 60FPS rendering.
* **Deep Customization**: Toggle between **Leather, Fabric, and Wood** textures with dynamic roughness and metalness properties.
* **Structural Engineering**: Swap backrest designs (Classic, Cross, Ergonomic) and armrest styles.
* **Production Export**: Finalize build to export a technical `.json` spec sheet for manufacturing.

### 2. 📦 Fleet Inventory Dashboard (`/inventory`)
A centralized hub for managing and browsing the product catalog.
* **Smart Filtering**: Categorize assets into Chairs, Sofas, Tables, and Beds.
* **Quick View Logic**: Inspect material details, dimensions, and real-time stock status.
* **Dynamic Routing**: Instant "Launch 3D" integration to move any inventory item into the configuration studio.

### 3. 📊 A/B Comparison Studio (`/comparison`)
A dual-viewport environment designed for professional build comparisons.
* **Sync Engine**: Linked rotation controls to inspect two different configurations simultaneously.
* **Cost Analysis**: Live pricing calculation based on material upgrades (e.g., +₹5,000 for Premium Leather).
* **Technical Spec Table**: Side-by-side breakdown of material, architecture, and valuation.

### 4. 📸 Visual Asset Repository (`/marketing`)
High-resolution marketing gallery for downloading standardized studio captures.
* **Multi-Angle Support**: Automated mapping for Front, Side, and Profile views.
* **4K Lightbox**: Fullscreen inspection mode for premium pro-res assets.

---

## 💻 Tech Stack
* **Framework**: Next.js 15+ (App Router)
* **3D Library**: React Three Fiber / Drei (Three.js)
* **Styling**: Tailwind CSS
* **Language**: TypeScript (Strict Mode Compliant)
* **Icons**: Lucide React
* **Deployment**: Vercel

