# PROPUESTA DE ELIMINACIÓN - CZPERU.COM

**Fecha:** 2026-03-29 15:36 UTC  
**Estado:** PENDIENTE DE APROBACIÓN  
⚠️ **REGLA:** Ningún archivo se elimina sin tu aprobación por escrito.

---

## 📋 LISTA ORDENADA POR PRIORIDAD DE RIESGO

### FASE 1: RIESGO BAJO (Primero - Seguro eliminar)

| # | Archivo | Razón para eliminar | Riesgo | Tu Decisión |
|---|---------|---------------------|--------|-------------|
| 1 | import_to_postgres.py | Script de migración ya ejecutado. No se usa más. | BAJO | [ ] Aprobar [ ] Mantener |
| 2 | verificar-deploy.html | Página de testing del deploy. Funcionalidad ya en verificar.html | BAJO | [ ] Aprobar [ ] Mantener |
| 3 | admin-mobile.html | Versión móvil del admin viejo. admin-v3.html es responsive. | BAJO | [ ] Aprobar [ ] Mantener |
| 4 | admin-simple.html | Versión simplificada del admin viejo. admin-v3.html reemplaza ambas. | BAJO | [ ] Aprobar [ ] Mantener |
| 5 | pricing.txt | Backup de contenido. No se sirve públicamente. | BAJO | [ ] Aprobar [ ] Mantener |
| 6 | contacto.txt | Backup de contenido. No se sirve públicamente. | BAJO | [ ] Aprobar [ ] Mantener |
| 7 | register.txt | Backup de contenido. No se sirve públicamente. | BAJO | [ ] Aprobar [ ] Mantener |
| 8 | privacidad.txt | Backup de contenido. No se sirve públicamente. | BAJO | [ ] Aprobar [ ] Mantener |
| 9 | terminos.txt | Backup de contenido. No se sirve públicamente. | BAJO | [ ] Aprobar [ ] Mantener |
| 10 | blog.txt | Backup de contenido. No se sirve públicamente. | BAJO | [ ] Aprobar [ ] Mantener |
| 11 | dashboard.txt | Backup de contenido. No se sirve públicamente. | BAJO | [ ] Aprobar [ ] Mantener |

**Total Fase 1:** 11 archivos

---

### FASE 2: RIESGO MEDIO (Verificar uso antes)

| # | Archivo | Razón para eliminar | Riesgo | Tu Decisión |
|---|---------|---------------------|--------|-------------|
| 12 | comparar.html | Funcionalidad reemplazada por admin-v3.html. ¿Se usa? | MEDIO | [ ] Aprobar [ ] Mantener [ ] Redirigir a admin-v3 |
| 13 | certificado-index.html | Índice de demos redundante. verificar.html cumple esa función. | MEDIO | [ ] Aprobar [ ] Mantener |

**Nota Fase 2:** Recomiendo mantener los 4 certificados demo (a3f9k2m8, b7k2m9p4, c9x4n1q7, demo-expired) porque pueden estar en propuestas comerciales.

---

### FASE 3: RIESGO ALTO (No tocar sin confirmación explícita)

| # | Archivo | Razón para eliminar | Riesgo | Tu Decisión |
|---|---------|---------------------|--------|-------------|
| 14 | admin.html | Admin legacy. Reemplazado por admin-v3.html. | **ALTO** | [ ] Aprobar [ ] Mantener [ ] Redirigir a admin-v3 |

**⚠️ ADVERTENCIA RIESGO ALTO:**
- Tu padre puede tener el link de admin.html guardado en WhatsApp, correo o bookmark
- Si lo eliminamos y él lo usa, perderá acceso hasta que le pases el nuevo link
- **Recomendación:** Antes de eliminar, redirigir admin.html → admin-v3.html por 30 días

---

## 🎯 PLAN DE ACCIÓN RECOMENDADO

### Opción A: Limpieza Conservadora (Recomendada)
1. ✅ Aprobar Fase 1 (11 archivos de bajo riesgo)
2. ⚠️ Mantener Fase 2 hasta verificar uso
3. ⚠️ Mantener Fase 3 (admin.html) y redirigir a admin-v3.html

**Resultado:** Eliminamos 11 archivos seguros, 0 riesgo operativo.

### Opción B: Limpieza Completa
1. ✅ Aprobar Fase 1 (11 archivos)
2. ✅ Aprobar Fase 2 (2 archivos)
3. ⚠️ Aprobar Fase 3 (admin.html) con redirección temporal

**Resultado:** Eliminamos 14 archivos, pero requiere comunicación con tu padre.

### Opción C: No hacer nada
- Mantener todo como está
- Cero riesgo, pero acumulamos deuda técnica

---

## 📊 IMPACTO ESTIMADO

| Métrica | Valor |
|---------|-------|
| Archivos a eliminar (Fase 1) | 11 |
| Espacio liberado (aprox) | ~500 KB |
| Tiempo de deploy reducido | ~5 segundos |
| Riesgo de error humano | Mínimo |
| URLs rotas potenciales | 0 (Fase 1) |

---

## ✅ CHECKLIST PARA APROBACIÓN

Marca con [x] lo que apruebes:

```
FASE 1 (Riesgo Bajo):
[ ] 1. import_to_postgres.py
[ ] 2. verificar-deploy.html  
[ ] 3. admin-mobile.html
[ ] 4. admin-simple.html
[ ] 5-11. Archivos .txt (7 archivos)

FASE 2 (Riesgo Medio):
[ ] 12. comparar.html
[ ] 13. certificado-index.html

FASE 3 (Riesgo Alto):
[ ] 14. admin.html (con redirección temporal)
```

---

## 🚀 PRÓXIMOS PASOS

1. **Tú decides:** Marca lo que apruebas arriba
2. **Yo ejecuto:** Elimino solo lo aprobado con backups previos
3. **Verificamos:** Testeamos que todo sigue funcionando
4. **Documentamos:** Actualizo el inventario

---

**Esperando tu aprobación para proceder.**

*Generado por KimiClaw - Sábado 15:36 UTC*
