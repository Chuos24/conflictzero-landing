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
            excerpt: "El Organismo Supervisor de las Contrataciones del Estado actualizó su registro de sancionados. Entre las empresas inhabilitadas se encuentran...",
            content: `El OSCE ha publicado la actualización correspondiente al período actual del Registro de Inhabilitados. La lista incluye {count} empresas que han sido sancionadas por diversas infracciones al Decreto Legislativo N° 1252.

Entre las principales causales de sanción se encuentran:
• Presentación de documentación falsa o adulterada
• Incumplimiento de obligaciones laborales
• Inhabilitaciones vigentes por sanciones previas
• Omisión de información requerida

Las empresas sancionadas no podrán participar en procesos de selección del Estado por el plazo establecido en cada resolución, que varía entre 6 meses y 5 años dependiendo de la gravedad de la infracción.

Esta actualización refuerza la importancia de realizar una debida diligencia exhaustiva antes de establecer relaciones comerciales con contrapartes que participan o desean participar en contrataciones públicas.`
        },
        {
            title: "SUNAT Detecta {count} Empresas con Deuda Tributaria Superior a S/ 1 Millón",
            excerpt: "La Superintendencia Nacional de Aduanas y de Administración Tributaria reporta nuevas empresas incluidas en la lista de deudores de grandes montos.",
            content: `SUNAT ha actualizado su lista de deudores de grandes montos, incorporando {count} nuevas empresas con deudas tributarias que superan el millón de soles. Esta lista es de consulta pública y permite identificar contribuyentes con obligaciones pendientes.

La deuda tributaria acumulada por estas empresas asciende a montos significativos que impactan la recaudación fiscal del país. La SUNAT mantiene activos diversos mecanismos de cobranza coactiva para recuperar estos montos.

Para las empresas que realizan due diligence, es fundamental verificar el estado tributario de sus contrapartes, ya que una deuda significativa puede ser indicador de problemas financieros más amplios.`
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
        }
    ],
    'Guías': [
        {
            title: "Guía Definitiva: Cómo Interpretar un Certificado de Buena Salud Financiera",
            excerpt: "Aprenda a leer y comprender los certificados que acreditan la situación financiera de una empresa ante el Estado peruano.",
            content: `El certificado de buena salud financiera es un documento esencial para empresas que participan en contrataciones públicas. En esta guía explicamos cada sección del documento y qué revela sobre la salud de una contraparte.

## 1. Sección de Identificación
Verifique que los datos de RUC y razón social coincidan exactamente con los de su contraparte. Cualquier discrepancia debe ser investigada.

## 2. Indicadores Financieros Clave
• Liquidez: Capacidad de pago a corto plazo
• Solvencia: Relación entre activos y pasivos
• Rentabilidad: Capacidad de generar utilidades
• Endeudamiento: Nivel de obligaciones financieras

## 3. Señales de Alerta
Busque consistentemente:
• Déficits operativos prolongados
• Aumento significativo del endeudamiento
• Deterioro de la liquidez
• Inconsistencias en estados financieros

## 4. Verificación Cruzada
Compare la información del certificado con:
• Estados financieros presentados a SUNAT
• Información en el RNP
• Datos de registros públicos

Un análisis integral requiere combinar esta información con otras fuentes de riesgo contractual.`
        },
        {
            title: "Checklist: 10 Verificaciones Obligatorias Antes de Firmar un Contrato",
            excerpt: "No firme ningún contrato sin completar esta lista de verificación esencial que puede salvar su empresa de fraudes millonarios.",
            content: `Antes de comprometerse contractualmente con cualquier empresa, complete rigurosamente estas 10 verificaciones:

## Verificación Legal
1. ✓ RUC activo y vigente en SUNAT
2. ✓ Representante legal con poder vigente
3. ✓ No encontrarse en lista de inhabilitados OSCE
4. ✓ Licencias y permisos al día según rubro

## Verificación Financiera
5. ✓ Estados financieros de los últimos 2 años
6. ✓ Ausencia de deudas significativas con SUNAT
7. ✓ No reportes negativos en SBS (si aplica)

## Verificación Contractual
8. ✓ Historial de contratos públicos sin sanciones
9. ✓ Referencias comerciales verificables
10. ✓ Patrimonio acorde al volumen de operaciones

## Documentación de Respaldo
Mantenga registro de todas las verificaciones realizadas, incluyendo capturas de pantalla con fecha y fuente consultada. Esta documentación puede ser vital en caso de contingencias legales.`
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
