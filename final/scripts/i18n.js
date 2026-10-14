/* =========================================================
   i18n.js — language dictionary and applier
   Every key here must match a data-i18n attribute in the HTML.
   Also swaps data-i18n-placeholder, data-i18n-title and
   data-i18n-alt.
   ========================================================= */

import { load, save } from "./storage.js";

const LANG_KEY = "adl-lang";

const strings = {
    en: {
        "nav.home": "Home",
        "nav.toolkit": "Toolkit",
        "nav.consultation": "Consultation",
        "home.title": "Find the right marketing tool, in your language",
        "home.intro":
            "A bilingual toolkit of digital marketing software, chosen from over two decades of hands-on campaign experience.",
        "home.cta": "Browse the toolkit",
        "home.whoTitle": "Who it serves",
        "home.whoBody":
            "Small business owners, freelancers and Spanish-speaking entrepreneurs who need a straight answer about which software to use, without wading through generic lists.",
        "home.categoriesTitle": "Browse by category",
        "home.categoryEmail":
            "Tools for building a list and sending campaigns that get opened.",
        "home.categorySocial":
            "Schedulers and analytics for the platforms your audience uses.",
        "home.categoryFunnels":
            "Landing pages and checkout flows that turn visitors into customers.",
        "home.categoryAi":
            "Writing assistants for drafts, headlines and campaign copy.",
        "home.altHero":
            "A white laptop on a bright desk next to a coffee cup and a vase of yellow flowers",
        "home.altEmail": "A wall of numbered mailboxes",
        "home.altSocial": "Two smartphones lying on a dark surface",
        "home.altFunnels": "A worn metal funnel on a table",
        "home.altAi": "A painting robot on display in a glass case",
        "toolkit.title": "Marketing Toolkit",
        "toolkit.intro":
            "Fifteen digital marketing tools, each described from hands-on campaign experience, with the pricing, languages and best use that matter before you commit.",
        "toolkit.filter": "Filter by category",
        "toolkit.count.one": "1 tool shown",
        "toolkit.count.other": "{n} tools shown",
        "toolkit.error": "The tools could not be loaded. Please try again later.",
        "toolkit.noFavorites":
            "You haven't saved any favorites yet. Use the star on a tool to save it.",
        "category.all": "All",
        "category.email": "Email marketing",
        "category.social": "Social media",
        "category.funnels": "Funnels",
        "category.ai": "AI content",
        "category.favorites": "My favorites",
        "topic.other": "Something else",
        "pricing.free": "Free",
        "pricing.freemium": "Freemium",
        "pricing.paid": "Paid",
        "pricing.enterprise": "Enterprise",
        "card.pricing": "Pricing",
        "card.languages": "Languages",
        "card.visit": "Visit website",
        "card.save": "Save {name} to favorites",
        "card.unsave": "Remove {name} from favorites",
        "card.details": "Details",
        "dialog.close": "Close",
        "dialog.title": "Tool details",
        "dialog.tip": "My tip",
        "consultation.title": "Request a consultation",
        "consultation.intro":
            "Tell us what you are working on, and we will recommend the tools that fit your business, your budget and your language.",
        "form.required": "* required",
        "form.firstName": "First name",
        "form.lastName": "Last name",
        "form.email": "Email",
        "form.emailExample": "name@example.com",
        "form.phone": "Phone (optional)",
        "form.phoneRule":
            "Digits, spaces, +, - and parentheses are allowed.",
        "form.business": "Business or project",
        "form.topic": "What do you need help with?",
        "form.topicChoose": "Choose one…",
        "form.language": "Preferred language",
        "form.message": "Tell us more",
        "form.submit": "Request consultation",
        "thankyou.title": "Thank you!",
        "thankyou.titleNamed": "Thank you, {name}!",
        "thankyou.intro":
            "We received your request and will reply within two business days.",
        "thankyou.summary": "Here is what you sent us",
        "thankyou.back": "Back to the form",
        "thankyou.empty":
            "We didn't receive any form data. Please fill in the consultation form first.",
        "thankyou.notProvided": "Not provided",
        "attrib.title": "Attributions",
        "attrib.intro":
            "Photographs, fonts and other content used on this site, with their sources and licenses.",
        "attrib.photos": "Photographs",
        "attrib.photosNote":
            "All photographs are released under CC0 (public domain dedication). Cropping and conversion to WebP were done for this site.",
        "attrib.fonts": "Fonts",
        "attrib.other": "Other",
        "attrib.otherWork":
            "The Abinadi's Digital Labs logo and the site's text are original work.",
        "attrib.otherTools":
            "Tool names and logos mentioned on the Toolkit page belong to their respective companies and link to their official sites.",
        "footer.video": "Project video",
        "footer.attributions": "Attributions"
    },
    es: {
        "nav.home": "Inicio",
        "nav.toolkit": "Herramientas",
        "nav.consultation": "Consulta",
        "home.title": "Encuentra la herramienta de marketing adecuada en tu idioma",
        "home.intro":
            "Un conjunto bilingüe de herramientas de marketing digital, seleccionadas tras más de dos décadas de experiencia directa en campañas.",
        "home.cta": "Explora las herramientas",
        "home.whoTitle": "Para quién es",
        "home.whoBody":
            "Dueños de pequeños negocios, freelancers y emprendedores hispanohablantes que necesitan una respuesta clara sobre qué software usar, sin perderse en listas genéricas.",
        "home.categoriesTitle": "Explora por categoría",
        "home.categoryEmail":
            "Herramientas para crear una lista y enviar campañas que se abren.",
        "home.categorySocial":
            "Herramientas para programar publicaciones y analizar resultados en las plataformas que usa tu audiencia.",
        "home.categoryFunnels":
            "Páginas de aterrizaje y flujos de pago que convierten visitantes en clientes.",
        "home.categoryAi":
            "Asistentes de escritura para borradores, titulares y textos de campaña.",
        "home.altHero":
            "Una laptop blanca sobre un escritorio luminoso junto a una taza de café y un florero con flores amarillas",
        "home.altEmail": "Una pared de buzones numerados",
        "home.altSocial": "Dos teléfonos inteligentes sobre una superficie oscura",
        "home.altFunnels": "Un embudo de metal desgastado sobre una mesa",
        "home.altAi": "Un robot pintor exhibido dentro de una vitrina de vidrio",
        "toolkit.title": "Herramientas de marketing",
        "toolkit.intro":
            "Quince herramientas de marketing digital, cada una descrita desde la experiencia directa en campañas, con el precio, los idiomas y el mejor uso que importan antes de decidirte.",
        "toolkit.filter": "Filtrar por categoría",
        "toolkit.count.one": "1 herramienta mostrada",
        "toolkit.count.other": "{n} herramientas mostradas",
        "toolkit.error": "No se pudieron cargar las herramientas. Inténtalo de nuevo más tarde.",
        "toolkit.noFavorites":
            "Aún no has guardado favoritos. Usa la estrella en una herramienta para guardarla.",
        "category.all": "Todas",
        "category.email": "Email marketing",
        "category.social": "Redes sociales",
        "category.funnels": "Embudos",
        "category.ai": "Contenido con IA",
        "category.favorites": "Mis favoritos",
        "topic.other": "Otro tema",
        "pricing.free": "Gratis",
        "pricing.freemium": "Gratuito con opciones de pago",
        "pricing.paid": "De pago",
        "pricing.enterprise": "Empresarial",
        "card.pricing": "Precio",
        "card.languages": "Idiomas",
        "card.visit": "Visitar sitio web",
        "card.save": "Guardar {name} en favoritos",
        "card.unsave": "Quitar {name} de favoritos",
        "card.details": "Detalles",
        "dialog.close": "Cerrar",
        "dialog.title": "Detalles de la herramienta",
        "dialog.tip": "Mi consejo",
        "consultation.title": "Solicita una consulta",
        "consultation.intro":
            "Cuéntanos en qué estás trabajando y te recomendaremos las herramientas que encajan con tu negocio, tu presupuesto y tu idioma.",
        "form.required": "* obligatorio",
        "form.firstName": "Nombre",
        "form.lastName": "Apellido",
        "form.email": "Correo electrónico",
        "form.emailExample": "nombre@ejemplo.com",
        "form.phone": "Teléfono (opcional)",
        "form.phoneRule":
            "Se permiten dígitos, espacios, +, - y paréntesis.",
        "form.business": "Negocio o proyecto",
        "form.topic": "¿Con qué necesitas ayuda?",
        "form.topicChoose": "Elige una opción…",
        "form.language": "Idioma preferido",
        "form.message": "Cuéntanos más",
        "form.submit": "Solicitar consulta",
        "thankyou.title": "¡Gracias!",
        "thankyou.titleNamed": "¡Gracias, {name}!",
        "thankyou.intro":
            "Hemos recibido tu solicitud y te responderemos en un plazo de dos días hábiles.",
        "thankyou.summary": "Esto es lo que nos enviaste",
        "thankyou.back": "Volver al formulario",
        "thankyou.empty":
            "No recibimos datos del formulario. Completa primero el formulario de consulta.",
        "thankyou.notProvided": "No proporcionado",
        "attrib.title": "Créditos",
        "attrib.intro":
            "Fotografías, tipografías y otros contenidos usados en este sitio, con sus fuentes y licencias.",
        "attrib.photos": "Fotografías",
        "attrib.photosNote":
            "Todas las fotografías se publican bajo CC0 (dedicación al dominio público). El recorte y la conversión a WebP se hicieron para este sitio.",
        "attrib.fonts": "Tipografías",
        "attrib.other": "Otros",
        "attrib.otherWork":
            "El logotipo de Abinadi's Digital Labs y el texto del sitio son obra original.",
        "attrib.otherTools":
            "Los nombres y logotipos de herramientas mencionados en la página de Herramientas pertenecen a sus respectivas empresas y enlazan a sus sitios oficiales.",
        "footer.video": "Video del proyecto",
        "footer.attributions": "Créditos"
    }
};

export function getLang() {
    const saved = load(LANG_KEY, "en");
    return saved === "es" ? "es" : "en";
}

export function setLang(lang) {
    const next = lang === "es" ? "es" : "en";
    save(LANG_KEY, next);
    applyLang();
}

export function t(key) {
    const lang = getLang();
    return strings[lang][key] ?? strings.en[key] ?? key;
}

export function applyLang() {
    const lang = getLang();

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
        el.title = t(el.dataset.i18nTitle);
    });

    // Swap alt text on images that carry data-i18n-alt.
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
        el.alt = t(el.dataset.i18nAlt);
    });

    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
        btn.setAttribute(
            "aria-pressed",
            btn.dataset.lang === lang ? "true" : "false"
        );
    });

    document.dispatchEvent(new CustomEvent("languagechange"));
}