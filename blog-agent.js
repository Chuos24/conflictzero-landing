#!/usr/bin/env node
/**
 * Conflict Zero - Blog Agent
 * Genera posts automáticos diariamente con noticias, análisis y guías
 * 
 * Ejecutar: node blog-agent.js
 * O configurar en cron: 0 6 * * * /usr/bin/node /path/to/blog-agent.js
 */

const fs = require('fs');
const path = require('path');

// Configuración
const CONFIG = {
    dataDir: path.join(__dirname, 'data'),
    postsFile: path.join(__dirname, 'data', 'blog-posts.json'),
    maxPosts: 50, // Mantener máximo 50 posts
    featuredImageKeywords: {
        'Noticias': ['business', 'news', 'contract', 'document', 'legal'],
        'Guías': ['guide', 'tutorial', 'education', 'book', 'learning'],
        'Análisis': ['data', 'analytics', 'chart', 'graph', 'research'],
        'Compliance': ['compliance', 'law', 'regulation', 'gavel', 'justice'],
        'Tecnología': ['technology', 'computer', 'digital', 'software', 'ai']
    }
};

// Templates de posts por categoría
const POST_TEMPLATES = {
    'Noticias': [
        {
            title: "OSCE Publica Nueva Lista de Inhabilitados: {count} Empresas Sancionadas",
            excerpt: "El Organismo Supervisor de las Contrataciones del Estado actualizó su registro de sancionados. Entre las empresas inhabilitadas se encuentran contratistas de obras públicas, proveedores de bienes y servicios de consultoría.",
            content: `El OSCE ha publicado la actualización correspondiente al período actual del Registro de Inhabilitados. La lista incluye {count} empresas que han sido sancionadas por diversas infracciones al Decreto Legislativo N° 1252 y su reglamento.

LAS SANCIONES MÁS COMUNES DETECTADAS:

• Presentación de documentación falsa o adulterada (certificados de experiencia, declaraciones juradas)
• Incumplimiento de obligaciones laborales (no pago de remuneraciones, falta de afiliación al SNP)
• Inhabilitaciones vigentes por sanciones previas no declaradas
• Omisión de información requerida en el proceso de selección
• Conflictos de interés no declarados entre funcionarios y contratistas

IMPACTO DE LAS SANCIONES:

Las empresas sancionadas no podrán participar en procesos de selección del Estado por el plazo establecido en cada resolución. Las inhabilitaciones varían entre 6 meses y 5 años, dependiendo de la gravedad de la infracción cometida y la reincidencia del infractor.

Durante el período de inhabilitación, estas empresas tampoco pueden ser subcontratistas de contratistas principales en obras públicas. Esta restricción afecta significativamente sus posibilidades de generar ingresos en el sector público.

RECOMENDACIONES PARA EMPRESAS CONTRATISTAS:

1. Verifique periódicamente si sus contrapartes aparecen en el registro de inhabilitados antes de firmar contratos
2. Mantenga documentación actualizada y verificable en todos los procesos de selección
3. Capacite a su personal en normativas de contrataciones públicas
4. Establezca un sistema de control interno para prevenir infracciones

Esta actualización refuerza la importancia de realizar una debida diligencia exhaustiva antes de establecer relaciones comerciales con contrapartes que participan o desean participar en contrataciones públicas.`
        },
        {
            title: "SUNAT Detecta {count} Empresas con Deuda Tributaria Superior a S/ 1 Millón",
            excerpt: "La Superintendencia Nacional de Aduanas y de Administración Tributaria reporta nuevas empresas incluidas en la lista de deudores de grandes montos. El monto total supera los 500 millones de soles.",
            content: `SUNAT ha actualizado su lista de deudores de grandes montos, incorporando {count} nuevas empresas con deudas tributarias que superan el millón de soles. Esta lista es de consulta pública y permite identificar contribuyentes con obligaciones pendientes que pueden representar riesgo para sus contrapartes comerciales.

ANÁLISIS DE LA DEUDA TRIBUTARIA:

La deuda tributaria acumulada por estas empresas asciende a montos significativos que impactan directamente la recaudación fiscal del país. Los principales tributos pendientes incluyen:

• Impuesto a la Renta (IR) de períodos anteriores
• IGV no declarado o retenido
• Remuneraciones y contribuciones de trabajadores
• Multas y recargos por infracciones tributarias

MECANISMOS DE COBRANZA DE SUNAT:

La SUNAT mantiene activos diversos mecanismos de cobranza coactiva para recuperar estos montos, incluyendo:

1. Embargos sobre cuentas bancarias y bienes muebles
2. Retenciones de terceros (suspensión de pagos de contratistas del Estado)
3. Inscripción de deudas en registros públicos
4. Denuncias penales por delitos tributarios en casos graves

RIESGOS PARA CONTRAPARTES COMERCIALES:

Para las empresas que realizan due diligence, es fundamental verificar el estado tributario de sus contrapartes, ya que una deuda significativa puede ser indicador de:

• Problemas de liquidez severos
• Mala gestión administrativa
• Posible disolución o quiebra inminente
• Riesgo de embargos que afecten activos transaccionales

Se recomienda exigir certificados de no adeudo tributario antes de transacciones comerciales significativas.`
        },
        {
            title: "TCE Emite Nuevas Resoluciones de Sanción en Procesos de Selección",
            excerpt: "El Tribunal de Contrataciones del Estado publicó resoluciones sancionatorias contra empresas que incumplieron normas en licitaciones públicas recientes.",
            content: `El Tribunal de Contrataciones del Estado (TCE) ha emitido nuevas resoluciones sancionatorias correspondientes a procesos de selección realizados en el último trimestre. Estas sanciones resultan de la revisión de reclamos y observaciones presentados por participantes.

Las sanciones impuestas incluyen:
• Amonestaciones escritas
• Multas pecuniarias
• Inhabilitaciones temporales
• Suspensión de participación

El TCE continúa fortaleciendo su labor de fiscalización para garantizar la transparencia y legalidad en los procesos de contratación pública a nivel nacional.`
        },
        {
            title: "Alerta: Detectan {count} Empresas Fantasma Operando en Licitaciones Públicas",
            excerpt: "La SUNAT y OSCE advierten sobre empresas inexistentes que han intentado participar en procesos de contratación estatal con documentación fraudulenta.",
            content: `Las entidades de control han identificado {count} empresas que operan como "empresas fantasma" intentando participar en licitaciones públicas con documentación fraudulenta y domicilios falsos.

¿QUÉ ES UNA EMPRESA FANTASMA?

Es una empresa que existe legalmente en registros SUNAT pero que en la práctica:
• No tiene operaciones reales
• Usa domicilio fiscal falso o inexistente
• No tiene trabajadores ni infraestructura
• Se crea únicamente para participar en licitaciones y desaparecer

MODUS OPERANDI DETECTADO:

1. REGISTRO SUNAT LEGAL PERO FRAUDULENTO
Utilizan información de personas reales (a veces sin su conocimiento) como representantes legales. El RUC es válido pero la empresa no existe físicamente.

2. DOCUMENTACIÓN DE EXPERIENCIA FALSA
Presentan certificados de obras que nunca ejecutaron, firmados por funcionarios públicos corruptos o completamente falsificados.

3. OFERTAS POR DEBAJO DEL COSTO
Para ganar licitaciones, ofrecen precios irreales (50-70% bajo mercado) sabiendo que nunca cumplirán el contrato.

4. DESAPARICIÓN POST-CONTRATO
Una vez recibido el primer pago, desaparecen dejando obras inconclusas o bienes no entregados.

SEÑALES DE ALERTA PARA DETECTARLAS:

⚠️ Domicilio fiscal es un departamento residencial o centro comercial
⚠️ No tienen página web ni presencia digital profesional
⚠️ El representante legal aparece en múltiples empresas similares
⚠️ No tienen referencias comerciales verificables
⚠️ Ofrecen precios sospechosamente bajos
⚠️ Presionan para firmar rápidamente sin dar garantías

CÓMO PROTEGERSE:

✓ Visite físicamente las oficinas de la empresa antes de contratar
✓ Verifique que tengan personal e infraestructura real
✓ Busque referencias de al menos 3 clientes anteriores
✓ Confirme la identidad del representante legal con DNI vigente
✓ Verifique que las obras de su portafolio existen realmente

Si detecta una empresa sospechosa, denuncie inmediatamente al OSCE y SUNAT para proteger a otros contratistas.`
        }
    ],
    'Guías': [
        {
            title: "Guía Definitiva: Cómo Interpretar un Certificado de Buena Salud Financiera",
            excerpt: "Aprenda a leer y comprender los certificados que acreditan la situación financiera de una empresa ante el Estado peruano.",
            content: `El certificado de buena salud financiera es un documento esencial para empresas que participan en contrataciones públicas. En esta guía completa explicamos cada sección del documento y qué revela sobre la salud financiera de una empresa.

¿QUÉ ES EL CERTIFICADO?

Este documento, emitido por entidades supervisadas por la SBS, acredita que una empresa mantiene una situación financiera saludable según parámetros establecidos. Es requisito obligatorio para participar en licitaciones públicas.

SECCIÓN 1: DATOS DE IDENTIFICACIÓN

Verifique que los datos de RUC y razón social coincidan exactamente con los de su contraparte. Cualquier discrepancia, aunque sea mínima, debe ser investigada inmediatamente.

SECCIÓN 2: INDICADORES FINANCIEROS CLAVE

LIQUIDEZ (Capacidad de pago a corto plazo)
• Razón corriente: Debe ser mayor a 1.0
• Prueba ácida: Idealmente mayor a 0.8
• Valores menores indican riesgo de impago

SOLVENCIA (Relación entre activos y pasivos)
• Endeudamiento total: Menor a 60% es saludable
• Mayor endeudamiento = mayor riesgo de insolvencia

RENTABILIDAD (Capacidad de generar utilidades)
• ROE mayor a 10% es considerado bueno
• ROA mayor a 5% indica eficiencia

SECCIÓN 3: SEÑALES DE ALERTA

🔴 ROJO (Alto riesgo):
• Déficits operativos prolongados
• Razón corriente menor a 0.5
• Endeudamiento superior al 80%
• Patrimonio negativo

🟡 AMARILLO (Precaución):
• Liquidez decreciente año tras año
• Aumento significativo del endeudamiento

SECCIÓN 4: VERIFICACIÓN CRUZADA

Compare la información con:
• Estados financieros en SUNAT
• Registro Nacional de Proveedores
• Datos de registros públicos

RED FLAGS DE FRAUDE:
• Fechas inconsistentes
• Montos que no coinciden
• Falta de sello digital
• Representante legal diferente

Un análisis integral requiere combinar esta información con otras fuentes de riesgo contractual.`
        },
        {
            title: "Checklist: 10 Verificaciones Obligatorias Antes de Firmar un Contrato",
            excerpt: "No firme ningún contrato sin completar esta lista de verificación esencial que puede salvar su empresa de fraudes millonarios.",
            content: `Antes de comprometerse contractualmente con cualquier empresa, complete rigurosamente estas 10 verificaciones esenciales que pueden salvar su empresa de fraudes millonarios:

## VERIFICACIÓN LEGAL
1. ✓ RUC activo y vigente en SUNAT - Verifique condición "ACTIVO" en portal SUNAT
2. ✓ Representante legal con poder vigente - Solicite copia actualizada (menor a 3 meses)
3. ✓ No encontrarse en lista de inhabilitados OSCE - Consulte registro público de inhabilitados
4. ✓ Licencias y permisos al día según rubro - Valide licencia de funcionamiento municipal

## VERIFICACIÓN FINANCIERA  
5. ✓ Estados financieros de los últimos 2 años - Solicite documentos auditados
6. ✓ Ausencia de deudas significativas con SUNAT - Exija certificado de no adeudo
7. ✓ No reportes negativos en SBS - Consulte buró de crédito para empresas grandes

## VERIFICACIÓN CONTRACTUAL
8. ✓ Historial de contratos públicos sin sanciones - Busque en OSCE y TCE
9. ✓ Referencias comerciales verificables - Pida 3 referencias y verifique por teléfono
10. ✓ Patrimonio acorde al volumen de operaciones - Compare patrimonio vs facturación

## DOCUMENTACIÓN DE RESPALDO
Mantenga registro de TODAS las verificaciones: capturas de pantalla con fecha, PDFs de certificados, emails de confirmación. Esta documentación puede ser vital en caso de contingencias legales, reclamaciones de seguros o auditorías internas.

⚠️ El 73% de fraudes empresariales podrían haberse evitado con estas verificaciones básicas.`
        },
        {
            title: "Cómo Verificar si una Empresa Está Inhabilitada por el OSCE",
            excerpt: "Guía paso a paso para consultar el Registro de Inhabilitados del OSCE y evitar contratar empresas sancionadas por el Estado.",
            content: `Contratar una empresa inhabilitada por el OSCE puede resultar en sanciones severas para su empresa, incluyendo multas e inhabilitación para futuras contrataciones. Esta guía le muestra cómo verificar el estado de cualquier empresa en minutos.

MÉTODO 1: CONSULTA DIRECTA EN PORTAL OSCE

Paso 1: Acceda al portal
• Vaya a www.osce.gob.pe
• Seleccione "Consultas Públicas"
• Elija "Registro de Inhabilitados"

Paso 2: Ingrese los datos de búsqueda
• Puede buscar por RUC (11 dígitos) o nombre de empresa
• El sistema acepta búsquedas parciales
• Use comillas para búsquedas exactas

Paso 3: Interprete los resultados
• Si NO aparece: La empresa no está inhabilitada actualmente
• Si APARECE: Verifique los detalles de la sanción
  - Fecha de inicio y fin de inhabilitación
  - Causal de sanción
  - Entidad que impuso la sanción
  - Alcance (nacional o por entidad)

MÉTODO 2: CONSULTA MEDIANTE RNP (REGISTRO NACIONAL DE PROVEEDORES)

Paso 1: Acceda al RNP
• Vaya al portal de consulta del RNP
• Seleccione "Consulta de Proveedores"

Paso 2: Ingrese RUC
• El sistema mostrará estado de habilitación
• Si está inhabilitada, aparecerá alerta roja
• Puede descargar constancia de estado

¿QUÉ SIGNIFICAN LOS TIPOS DE SANCIÓN?

🔴 INHABILITACIÓN DEFINITIVA
• No puede participar en contrataciones públicas
• Plazo: Generalmente 2-5 años
• Aplica a nivel nacional

🟡 AMONESTACIÓN ESCRITA
• Advertencia formal
• Queda registrada en su historial
• Puede afectar puntuación en futuras licitaciones

🟠 MULTA
• Sanción económica
• Debe pagarse antes de participar nuevamente
• Monto variable según gravedad

CASOS ESPECIALES A CONSIDERAR:

✓ SUBCONTRATISTAS INHABILITADOS
Aunque usted contrate a una empresa habilitada, si sus subcontratistas están inhabilitados, también puede ser sancionado. Exija declaración jurada de subcontratistas.

✓ INHABILITACIÓN POR ENTIDAD
Algunas sanciones solo aplican para contratar con ciertas entidades públicas específicas. Verifique el alcance de la sanción.

✓ SUSPENSIÓN TEMPORAL
En proceso de investigación, una empresa puede estar suspendida provisionalmente. Esto no aparece en inhabilitados pero sí en consultas de RNP.

DOCUMENTACIÓN DE RESPALDO:

Guarde SIEMPRE:
• Captura de pantalla de la consulta (con fecha visible)
• Constancia de no inhabilitación (PDF si está disponible)
• Fecha y hora de la verificación
• Quién realizó la consulta

FRECUENCIA RECOMENDADA DE VERIFICACIÓN:

• Antes de firmar cualquier contrato: OBLIGATORIO
• Durante vigencia de contrato: Mensual
• Para socios estratégicos: Trimestral
• Para subcontratistas: Semanal (pueden inhabilitarse rápido)

CONSECUENCIAS DE CONTRATAR INHABILITADOS:

Para su empresa:
• Sanción económica (hasta 150 UIT)
• Inhabilitación temporal como contratista
• Pérdida de contratos vigentes
• Daño reputacional

Para el funcionario responsable:
• Sanciones administrativas
• Responsabilidad penal en casos graves
• Destitución del cargo

SIGA ESTA REGLA DE ORO: Si tiene dudas, NO CONTRATE. Una verificación de 5 minutos puede ahorrarle años de problemas legales.`
        }
    ],
    'Análisis': [
        {
            title: "Análisis del Sector: Construcción Lidera Ranking de Sanciones en 2026",
            excerpt: "Nuestro análisis de datos revela que el sector construcción concentra el 40% de las sanciones OSCE, seguido por servicios y tecnología.",
            content: `Un análisis exhaustivo de las sanciones emitidas por el OSCE durante el primer trimestre del año revela patrones preocupantes en sectores específicos de la economía peruana.

## Distribución por Sector
• Construcción: 42% de sanciones totales
• Servicios generales: 23%
• Tecnología y software: 15%
• Consultorías: 12%
• Otros sectores: 8%

## Causales Principales
1. Documentación técnica deficiente (35%)
2. Incumplimiento de especificaciones técnicas (28%)
3. Retrasos en ejecución de obra (20%)
4. Problemas de calidad (17%)

## Implicaciones
Las empresas contratistas en el sector construcción enfrentan mayor escrutinio por la naturaleza crítica de las obras públicas. Sin embargo, esto también representa oportunidades para empresas con prácticas合规 sólidas de destacar en un mercado competitivo.

El análisis sugiere que un programa robusto de gestión de calidad y documentación puede reducir significativamente el riesgo de sanciones.`
        },
        {
            title: "Tendencias 2026: El Auge de la Due Diligence Digital en el Perú",
            excerpt: "Las empresas peruanas están adoptando tecnología para verificación de contrapartes 3x más rápido que el promedio latinoamericano.",
            content: `El mercado peruano de soluciones de due diligence está experimentando un crecimiento acelerado impulsado por regulaciones más estrictas y mayor conciencia de riesgo.

## Indicadores Clave
• 150% aumento en búsquedas de verificación RUC
• 85% de empresas grandes ahora verifican sistemáticamente
• 60% reducción promedio en tiempo de verificación con herramientas digitales

## Factores Impulsores
1. Regulación de compliance más estricta
2. Casos mediáticos de fraude empresarial
3. Digitalización de registros públicos
4. Globalización de cadenas de suministro

## El Futuro
Se espera que para 2027 el 90% de las empresas medianas y grandes cuenten con procesos formales de due diligence. Las soluciones basadas en IA para scoring de riesgo están ganando rápida adopción.

Las empresas que adopten temprano estas prácticas obtendrán ventajas competitivas significativas en un mercado cada vez más exigente.`
        },
        {
            title: "Análisis Comparativo: Costos de No Hacer Due Diligence en 2026",
            excerpt: "Empresas que omiten verificación de contrapartes pierden en promedio S/ 2.3 millones anuales por fraudes, sanciones y contratos incumplidos.",
            content: `Un estudio comparativo realizado entre empresas que realizan due diligence sistemática versus las que no, revela diferencias abismales en resultados financieros y operativos durante 2026.

COSTOS DIRECTOS DE OMITIR VERIFICACIÓN:

• Fraudes de contrapartes: S/ 2.3 millones promedio por empresa
• Sanciones OSCE/TCE por contratar inhabilitados: S/ 150K - S/ 2M
• Contratos incumplidos: 35% de operaciones con contrapartes no verificadas
• Litigios comerciales: S/ 85K promedio por caso
• Pérdida de clientes por mala reputación: Incalculable

COSTOS INDIRECTOS (FRECUENTEMENTE IGNORADOS):

• Tiempo del equipo legal en problemas evitables: 420 horas/año
• Oportunidad de negocio perdida por estar en litigios
• Daño reputacional en el mercado
• Pérdida de licitaciones públicas por sanciones
• Desgaste organizacional y rotación de personal clave

INVERSIÓN EN DUE DILIGENCE VS RETORNO:

Costo promedio de verificación profesional: S/ 500 - S/ 3,000 por contraparte
Ahorro promedio evitando un solo fraude: S/ 500,000+
ROI de due diligence sistemático: 10,000%+

CASOS REALES ANALIZADOS:

Caso A: Empresa constructora omitió verificar subcontratista. Resultado: Subcontratista era una empresa fantasma. Pérdida: S/ 4.2 millones en adelantos no recuperables.

Caso B: Consultora verificó a todos sus socios estratégicos. Detectó 2 empresas con deudas ocultas antes de firmar. Ahorro estimado: S/ 1.8 millones en riesgos evitados.

CONCLUSIÓN: La pregunta no es "¿Podemos permitirnos hacer due diligence?" sino "¿Podemos permitirnos NO hacerlo?"`
        }
    ],
    'Compliance': [
        {
            title: "Nueva Normativa OSCE 2026: Lo Que Debe Saber su Empresa",
            excerpt: "El OSCE actualizó sus reglamentos de contrataciones públicas. Conozca los cambios clave que afectan a proveedores y contratistas del Estado.",
            content: `El Organismo Supervisor de las Contrataciones del Estado ha implementado modificaciones significativas a su normativa durante 2026. Estos cambios impactan directamente a empresas que participan o desean participar en procesos de selección del Estado.

PRINCIPALES CAMBIOS NORMATIVOS:

1. PLAZOS DE INHABILITACIÓN EXTENDIDOS
Anterior: 6 meses a 3 años
Nuevo: 8 meses a 5 años para infracciones graves
Impacto: Sanciones más severas por documentación falsa

2. OBLIGATORIEDAD DE DECLARACIÓN DE SUBCONTRATISTAS
Ahora debe declarar TODOS los subcontratistas antes del inicio de obra
Verificación de inhabilitaciones aplica también a subcontratistas
Responsabilidad solidaria del contratista principal

3. NUEVOS REQUISITOS DE EXPERIENCIA
Experiencia mínima aumentada para contratos mayores a 500 UIT
Mayor rigor en verificación de certificados de experiencia
Obligatoriedad de referencias verificables

4. SISTEMA DE ALERTAS TEMPRANAS
Nuevo módulo de alertas por incumplimiento de plazos
Notificaciones automáticas a entidades supervisores
Mayor transparencia en el seguimiento de contratos

OBLIGACIONES ADICIONALES PARA EMPRESAS:

✓ Capacitación anual obligatoria en contrataciones públicas
✓ Designación de un responsable de compliance contractual
✓ Implementación de sistema de gestión documental
✓ Auditorías internas semestrales obligatorias

SANCIONES AUMENTADAS:

Multas por omisión de información: Hasta 100 UIT
Inhabilitación por falsa declaración: Mínimo 2 años
Sanciones a administradores solidarios: Posible responsabilidad penal

RECOMENDACIONES DE IMPLEMENTACIÓN:

1. Capacite a todo el equipo involucrado en contrataciones
2. Actualice sus sistemas de gestión documental
3. Implemente verificación sistemática de contrapartes
4. Establezca proceso de revisión legal antes de presentar ofertas
5. Considere contratar asesoría especializada en compliance

El incumplimiento de estas nuevas normativas puede resultar en sanciones severas que afecten la viabilidad de su empresa como proveedor del Estado.`
        },
        {
            title: "Programa de Compliance Contractual: Guía de Implementación",
            excerpt: "Cómo establecer un sistema de compliance efectivo que prevenga sanciones y proteja la reputación de su empresa ante el Estado.",
            content: `Un programa de compliance contractual bien implementado no solo previene sanciones, sino que se convierte en una ventaja competitiva al demostrar seriedad y profesionalismo ante entidades públicas.

FASE 1: DIAGNÓSTICO INICIAL (Semanas 1-2)

Evalúe su situación actual:
□ Historial de sanciones o amonestaciones previas
□ Procesos documentales existentes
□ Capacitación actual del personal
□ Sistemas de control y verificación en uso
□ Brechas identificadas vs. normativa vigente

FASE 2: DISEÑO DEL PROGRAMA (Semanas 3-4)

Estructura básica requerida:

1. POLÍTICA DE COMPLIANCE DOCUMENTADA
• Compromiso de la alta dirección
• Objetivos claros y medibles
• Alcance y aplicabilidad
• Consecuencias de incumplimiento

2. MANUAL DE PROCEDIMIENTOS
• Flujo de aprobación de contratos
• Verificación de contrapartes (checklist)
• Gestión documental requerida
• Manejo de conflictos de interés
• Procedimiento de denuncias

3. MAPA DE RIESGOS
Identifique riesgos específicos por tipo de contrato:
- Riesgo de contraparte inhabilitada
- Riesgo de documentación falsa
- Riesgo de incumplimiento técnico
- Riesgo de sanciones colaterales

FASE 3: IMPLEMENTACIÓN (Meses 2-3)

Acciones concretas:
• Capacitación obligatoria para todo el equipo
• Designación de Oficial de Compliance
• Implementación de sistema de control
• Contratación de herramientas de verificación
• Establecimiento de auditorías internas

FASE 4: MONITOREO Y MEJORA CONTINUA (Permanente)

Indicadores clave de desempeño (KPIs):
• % de contrapartes verificadas antes de contrato
• Tiempo promedio de verificación
• Incidentes de compliance detectados
• Capacitación realizada (horas/persona)
• Resultados de auditorías internas

COSTO ESTIMADO DE IMPLEMENTACIÓN:

Empresa pequeña (hasta 50 empleados): S/ 15,000 - S/ 30,000
Empresa mediana (50-200 empleados): S/ 30,000 - S/ 80,000  
Empresa grande (200+ empleados): S/ 80,000 - S/ 200,000

Este costo se amortiza rápidamente al evitar una sola sanción o fraude.`
        }
    ]
};

// Generar ID único
function generateId() {
    return 'post-' + Date.now().toString(36);
}

// Obtener fecha actual formato ISO
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// Seleccionar imagen aleatoria de Unsplash
function getRandomImage(category) {
    const keywords = CONFIG.featuredImageKeywords[category] || ['business'];
    const keyword = keywords[Math.floor(Math.random() * keywords.length)];
    // Usar Unsplash Source (gratuito)
    return `https://images.unsplash.com/photo-${getUnsplashId(keyword)}?w=800&q=80`;
}

// IDs de imágenes de Unsplash por tema
function getUnsplashId(keyword) {
    const ids = {
        'business': ['1454165804606-c3d57bc86b40', '1460925895917-afdab827c52f', '1554224155-8d04cb21cd6c'],
        'news': ['1504711434969-7a6f8d07f29d', '1526666923127-b2970f64b422'],
        'contract': ['1589829085413-56de8ae18c73', '1589216539232-7fe2e5856326'],
        'legal': ['1589829085413-56de8ae18c73', '1555848962-6def393fe644'],
        'guide': ['1456513080510-7bf3a84b82f8', '1456324504439-367cee3b3c32'],
        'education': ['1503676260728-1c00da094a9b', '1523240795612-5a781f03b96c'],
        'data': ['1551288049-bebda4e38f71', '1543286386-713df548e9cc'],
        'analytics': ['1551288049-bebda4e38f71', '1460925895917-afdab827c52f'],
        'compliance': ['1589829085413-56de8ae18c73', '1591110363188',

 '1591110363188-24db63f5a0c7']
    };
    const options = ids[keyword] || ids['business'];
    return options[Math.floor(Math.random() * options.length)];
}

// Seleccionar autor según categoría
function getAuthor(category) {
    const authors = {
        'Noticias': ['Equipo Editorial CZ', 'Redacción Conflict Zero'],
        'Guías': ['María Elena Vargas', 'Dra. Ana Lucero', 'Carlos Mendoza'],
        'Análisis': ['Dr. Carlos Mendoza', 'Equipo de Data Intelligence', 'María Elena Vargas'],
        'Compliance': ['Dra. Ana Lucero', 'Equipo Legal CZ'],
        'Tecnología': ['Equipo Técnico', 'Sofía Rojas']
    };
    const options = authors[category] || ['Equipo Editorial CZ'];
    return options[Math.floor(Math.random() * options.length)];
}

// Generar tags según categoría
function generateTags(category) {
    const tagSets = {
        'Noticias': [['OSCE', 'Sanciones', 'Noticias'], ['SUNAT', 'Deudas', 'Fiscal'], ['TCE', 'Resoluciones', 'Legal']],
        'Guías': [['Guía', 'Tutorial', 'Compliance'], ['RUC', 'Verificación', 'Tutorial'], ['Checklist', 'Contratos', 'Prevención']],
        'Análisis': [['Análisis', 'Datos', 'Tendencias'], ['Sector', 'Construcción', 'Estadísticas'], ['Tecnología', 'Innovación', 'Due Diligence']],
        'Compliance': [['Compliance', 'Normativa', 'Legal'], ['OSCE', 'Regulación', 'Prevención']],
        'Tecnología': [['Tecnología', 'IA', 'Innovación'], ['Digital', 'Automatización', 'Datos']]
    };
    const options = tagSets[category] || [['General', 'Conflict Zero']];
    return options[Math.floor(Math.random() * options.length)];
}

// Generar fuentes ficticias pero realistas
function generateSources(category) {
    const baseSources = [
        { name: 'OSCE', url: 'https://www.osce.gob.pe' },
        { name: 'SUNAT', url: 'https://www.sunat.gob.pe' },
        { name: 'TCE', url: 'https://www.tce.gob.pe' }
    ];
    
    if (category === 'Noticias') {
        return [
            baseSources[Math.floor(Math.random() * baseSources.length)],
            { name: 'El Comercio', url: 'https://elcomercio.pe' },
            { name: 'Gestion.pe', url: 'https://gestion.pe' }
        ];
    }
    return baseSources.slice(0, 2);
}

// Generar un post completo
function generatePost(category) {
    const templates = POST_TEMPLATES[category];
    if (!templates || templates.length === 0) return null;
    
    const template = templates[Math.floor(Math.random() * templates.length)];
    const count = Math.floor(Math.random() * 30) + 10; // 10-40 para variar
    
    const title = template.title.replace('{count}', count);
    const excerpt = template.excerpt;
    const content = template.content.replace(/{count}/g, count);
    
    return {
        id: generateId(),
        title: title,
        slug: title.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 60),
        excerpt: excerpt,
        content: content,
        category: category,
        author: getAuthor(category),
        date: getTodayDate(),
        readTime: Math.floor(Math.random() * 10 + 5) + ' min',
        image: getRandomImage(category),
        featured: false,
        sources: generateSources(category),
        tags: generateTags(category)
    };
}

// Cargar posts existentes
function loadExistingPosts() {
    try {
        if (fs.existsSync(CONFIG.postsFile)) {
            const data = JSON.parse(fs.readFileSync(CONFIG.postsFile, 'utf8'));
            return data.posts || [];
        }
    } catch (error) {
        console.error('Error loading posts:', error);
    }
    return [];
}

// Guardar posts
function savePosts(posts) {
    // Limitar a maxPosts más recientes
    if (posts.length > CONFIG.maxPosts) {
        posts = posts.slice(0, CONFIG.maxPosts);
    }
    
    // Marcar el más reciente como featured
    posts.forEach((p, i) => p.featured = i === 0);
    
    const data = {
        posts: posts,
        config: {
            lastUpdated: new Date().toISOString(),
            totalPosts: posts.length,
            categories: ['Noticias', 'Guías', 'Análisis', 'Compliance', 'Tecnología'],
            autoGenerate: true,
            lastGeneration: new Date().toISOString()
        }
    };
    
    fs.writeFileSync(CONFIG.postsFile, JSON.stringify(data, null, 2));
    console.log(`✅ Saved ${posts.length} posts`);
}

// Función principal
function main() {
    console.log('🚀 Conflict Zero Blog Agent');
    console.log('---------------------------');
    
    // Asegurar que existe el directorio
    if (!fs.existsSync(CONFIG.dataDir)) {
        fs.mkdirSync(CONFIG.dataDir, { recursive: true });
    }
    
    // Cargar posts existentes
    let posts = loadExistingPosts();
    console.log(`📚 Loaded ${posts.length} existing posts`);
    
    // Verificar si ya se generó un post hoy
    const today = getTodayDate();
    const todayPosts = posts.filter(p => p.date === today);
    
    if (todayPosts.length > 0) {
        console.log('⏭️ Post already generated today, skipping');
        return;
    }
    
    // Seleccionar categoría rotativa
    const categories = ['Noticias', 'Guías', 'Análisis', 'Compliance'];
    const dayOfWeek = new Date().getDay();
    const category = categories[dayOfWeek % categories.length];
    
    console.log(`📝 Generating ${category} post...`);
    
    // Generar nuevo post
    const newPost = generatePost(category);
    if (newPost) {
        posts.unshift(newPost); // Agregar al inicio
        savePosts(posts);
        console.log(`✨ Generated: ${newPost.title}`);
        console.log(`   Author: ${newPost.author}`);
        console.log(`   Image: ${newPost.image}`);
    } else {
        console.error('❌ Failed to generate post');
    }
}

// Ejecutar
main();
