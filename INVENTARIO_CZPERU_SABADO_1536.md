# AUDITORÍA COMPLETA - CZPERU.COM

**Fecha:** 2026-03-29 15:36 UTC  
**Entorno:** Vercel (Frontend) + Render (Backend API)

---

## 1. PÁGINAS HTML (Frontend)

| Archivo | URL Accesible | Estado Técnico | Propósito Actual | ¿Eliminable? | Riesgo si se borra |
|---------|---------------|----------------|------------------|--------------|-------------------|
| index.html | / | ✅ 200 OK | Landing principal | **NO** | Perdemos captación |
| admin-v3.html | /admin-v3.html | ✅ 200 OK | Comité Admisión V3 | **NO** | Core del negocio - herramienta de venta |
| verificar.html | /verificar.html | ✅ 200 OK | Validación pública certificados | **NO** | Clientes de Zamora lo necesitan el lunes |
| verify.html | /verify.html | ✅ 200 OK | Alias de verificar.html | **NO** | Compatibilidad URLs |
| dashboard.html | /dashboard.html | ✅ 200 OK | Panel usuario | **NO** | Usuarios logueados |
| login.html | /login.html | ✅ 200 OK | Login usuarios | **NO** | Flujo autenticación |
| register.html | /register.html | ✅ 200 OK | Registro usuarios | **NO** | Captación nuevos usuarios |
| pricing.html | /pricing.html | ✅ 200 OK | Precios y planes | **NO** | Conversión comercial |
| founders.html | /founders.html | ✅ 200 OK | Programa Fundadores | **NO** | CTA principal landing |
| blog.html | /blog.html | ✅ 200 OK | Blog automático | **NO** | SEO y contenido |
| contacto.html | /contacto.html | ✅ 200 OK | Contacto | **NO** | Soporte clientes |
| terminos.html | /terminos.html | ✅ 200 OK | Términos legales | **NO** | Requerimiento legal |
| privacidad.html | /privacidad.html | ✅ 200 OK | Privacidad | **NO** | Requerimiento legal |
| gracias.html | /gracias.html | ✅ 200 OK | Página de gracias | **NO** | Post-conversión |
| comparar.html | /comparar.html | ✅ 200 OK | Comparador RUCs | ⚠️ PENDIENTE | ¿Tu padre lo usa? Riesgo: MEDIO |
| certificado-index.html | /certificado-index.html | ✅ 200 OK | Índice certificados demo | ⚠️ PENDIENTE | Riesgo: BAJO - es solo índice |
| certificado-a3f9k2m8.html | /certificado-a3f9k2m8.html | ✅ 200 OK | Demo GOLD | ⚠️ PENDIENTE | Riesgo: BAJO - demo interno |
| certificado-b7k2m9p4.html | /certificado-b7k2m9p4.html | ✅ 200 OK | Demo SILVER | ⚠️ PENDIENTE | Riesgo: BAJO - demo interno |
| certificado-c9x4n1q7.html | /certificado-c9x4n1q7.html | ✅ 200 OK | Demo BRONZE | ⚠️ PENDIENTE | Riesgo: BAJO - demo interno |
| certificado-demo-expired.html | /certificado-demo-expired.html | ✅ 200 OK | Demo VENCIDO | ⚠️ PENDIENTE | Riesgo: BAJO - demo interno |
| admin.html | /admin.html | ✅ 200 OK | Admin legacy | ⚠️ PENDIENTE | Riesgo: **ALTO** - ¿Tu padre tiene bookmark? |
| admin-mobile.html | /admin-mobile.html | ✅ 200 OK | Admin mobile | ⚠️ PENDIENTE | Riesgo: BAJO - ¿Se usa en móvil? |
| admin-simple.html | /admin-simple.html | ✅ 200 OK | Admin simple | ⚠️ PENDIENTE | Riesgo: BAJO - versión alternativa |
| verificar-deploy.html | /verificar-deploy.html | ✅ 200 OK | Verificador deploy | ⚠️ PENDIENTE | Riesgo: BAJO - testing interno |
| 404.html | /404.html | ✅ 200 OK | Error 404 | **NO** | Necesario para UX |

**Total HTMLs:** 25 archivos

---

## 2. ENDPOINTS API (Backend - Render)

| Endpoint | Versión | Estado | Funciona? | Dependencias |
|----------|---------|--------|-----------|--------------|
| GET /api/v3/health | V3 | ✅ Activo | Sí | - |
| POST /api/v3/validate | V3 | ✅ Activo | Sí | Factaliza + BuscarUC + PostgreSQL |
| GET /api/v3/validate/{ruc} | V3 | ✅ Activo | Sí | Cache + APIs externas |
| POST /api/v3/generate-cert | V3 | ✅ Activo | Sí | HTML imprimible |
| GET /api/v3/cert-preview/{slug} | V3 | ✅ Activo | Sí | Certificados HTML |
| GET /api/v3/demo/rucs | V3 | ✅ Activo | Sí | Datos demo |
| GET /api/v3/internal/certs-check | V3 | ⚠️ Admin | Sí | Solo diagnóstico |
| GET /api/v3/internal/db-check | V3 | ⚠️ Admin | Sí | Solo diagnóstico |

**Nota:** No hay endpoints V1 ni V2 expuestos. Todo está en V3.

---

## 3. ARCHIVOS ESTÁTICOS / ASSETS

| Archivo | Ubicación | Uso Actual | ¿Eliminable? |
|---------|-----------|------------|--------------|
| blog-posts.json | /data/ | Alimenta blog automático | **NO** - Blog lo usa |
| blog-agent.js | / | Generador de posts automático | **NO** - Core del blog |
| *.txt (pricing.txt, etc.) | / | Backups de contenido | ⚠️ PENDIENTE - Riesgo: BAJO |
| _next/ (carpeta) | /_next/ | Next.js build output | **NO** - Framework |

---

## 4. ARCHIVOS BACKEND (No expuestos directamente)

| Archivo | Ubicación | Uso | ¿Eliminable? |
|---------|-----------|-----|--------------|
| api_v3.py | /backend/ | API principal | **NO** - Core del sistema |
| import_to_postgres.py | /backend/ | Migración datos | ⚠️ PENDIENTE - Riesgo: BAJO (ya migró) |
| app/services/ | /backend/app/services/ | Módulos adapters | **NO** - API los usa |

---

## 5. REDIRECCIONES Y DNS

| Redirección | Tipo | Comportamiento |
|-------------|------|----------------|
| http://czperu.com | 308 Permanent | → https://czperu.com |
| https://czperu.com | 307 Temporary | → https://www.czperu.com |

**Configuración:** Vercel maneja automáticamente www ↔ sin-www y HTTP → HTTPS.

**Subdominios detectados:** Ninguno aparte de www.

---

## 6. ANÁLISIS DE RIESGOS - ARCHIVOS PENDIENTES

### Riesgo ALTO (No tocar sin confirmación)

| Archivo | Riesgo | Justificación |
|---------|--------|---------------|
| admin.html | **ALTO** | Tu padre puede tener el link guardado en WhatsApp/bookmark. Es la versión anterior de admin. |

### Riesgo MEDIO (Verificar uso)

| Archivo | Riesgo | Justificación |
|---------|--------|---------------|
| comparar.html | MEDIO | ¿Tu padre lo usa para comparar RUCs? Si no, puede redirigirse a admin-v3.html |

### Riesgo BAJO (Candidatos a limpieza)

| Archivo | Riesgo | Justificación |
|---------|--------|---------------|
| admin-mobile.html | BAJO | Versión móvil del admin viejo. ¿Se usa? |
| admin-simple.html | BAJO | Versión simplificada del admin viejo. ¿Se usa? |
| verificar-deploy.html | BAJO | Página de testing del deploy. Ya no necesaria. |
| certificado-index.html | BAJO | Índice de demos. Redundante si tenemos verificar.html |
| certificado-*.html (4 demos) | BAJO | Demos de certificados. Pueden mantenerse para ventas. |
| *.txt (8 archivos) | BAJO | Backups de contenido. No se sirven públicamente. |
| import_to_postgres.py | BAJO | Script de migración. Ya ejecutado. |

---

## 7. RESUMEN EJECUTIVO

| Categoría | Cantidad | Estado |
|-----------|----------|--------|
| **Archivos Críticos (NO TOCAR)** | 15 | Operativos |
| **Riesgo ALTO (Pendiente OK)** | 1 | admin.html |
| **Riesgo MEDIO (Pendiente OK)** | 1 | comparar.html |
| **Riesgo BAJO (Candidatos)** | 14+ | Propuestos para eliminación |
| **Endpoints API** | 8 | Todos operativos en V3 |

---

## 8. NOTAS ADICIONALES

- **No hay archivos de test expuestos públicamente** (test.html, prueba-score.html no existen)
- **No hay endpoints V1/V2 activos** (todo está consolidado en V3)
- **No hay archivos con contraseñas hardcodeadas** visibles
- **Blog automático funciona** con blog-agent.js y blog-posts.json

---

*Generado por KimiClaw - Auditoría Sábado 15:36 UTC*  
*SIN ARCHIVOS ELIMINADOS - Solo documentación*
