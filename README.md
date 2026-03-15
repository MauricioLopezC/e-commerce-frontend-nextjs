# E-Commerce Demo - Tienda de Ropa

> **AVISO IMPORTANTE**: Este es un proyecto de **DEMOSTRACIÓN** (NO es un proyecto real de producción). Es un trabajo académico/personal para habilidades de desarrollo frontend.

## Características Principales

### Autenticación y Usuario

- Login y registro de usuarios
- Sesión con cookies JWT
- Perfil de usuario con historial de pedidos

### Catálogo de Productos

- Listado de productos con paginación
- Filtros y ordenamiento
- Página de detalle de producto
- Galería de imágenes

### Carrito de Compras

- Agregar/eliminar productos
- Selección de variantes (talla, color)
- Cálculo de totales

### Checkout y Órdenes

- Proceso de compra
- Integración con proveedor de pagos (modo prueba/sandbox)
- Historial de pedidos
- Estados de orden

### Dashboard Admin

- Panel de administración
- Estadísticas
- Gestión de productos, categorías, descuentos

### Búsqueda

- Búsqueda de productos
- Filtros combinados

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React + Tailwind CSS + shadcn/ui
- **Estado**: Zustand
- **Formularios**: React Hook Form + Zod
- **API Client**: openapi-fetch
- **Imágenes**: Next Cloudinary

## Requisitos

- Node.js 18+
- Backend API corriendo (configurable via `BACKEND_URL`)

## Getting Started

```bash
# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env
# Editar .env con tu BACKEND_URL

# Desarrollo
npm run dev
```

## Pagos

La integración de pagos está configurada en **modo prueba/sandbox**. No se procesan pagos reales.

## Propósito

Este proyecto fue creado con fines **educativos** y de **portafolio**. No es una tienda real y no procesa pagos.
