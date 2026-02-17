/**
 * Strapi API Service
 * Fetches dynamic content from the Strapi CMS backend.
 */

const STRAPI_URL = 'http://localhost:1337';

/**
 * Generic fetch wrapper for Strapi REST API
 */
async function strapiGet(endpoint, params = {}) {
    const url = new URL(`/api${endpoint}`, STRAPI_URL);

    // Add query params (populate, locale, sort, etc.)
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
        }
    });

    try {
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Strapi API error: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`[Strapi] Failed to fetch ${endpoint}:`, err);
        return null;
    }
}

/**
 * Get the full image URL from a Strapi media object
 */
export function getStrapiImageUrl(media) {
    if (!media) return '';
    // media can be direct url or nested object
    const url = media?.url || media?.data?.attributes?.url || media?.data?.url || '';
    if (url.startsWith('http')) return url;
    return `${STRAPI_URL}${url}`;
}

/**
 * Fetch all projects (with milestones populated)
 */
export async function fetchProjects() {
    const data = await strapiGet('/projects', { 'populate': '*' });
    if (!data?.data) return [];
    return data.data.map(item => {
        const attrs = item.attributes || item;
        return {
            id: item.id,
            documentId: item.documentId || item.id,
            title: attrs.title,
            status: attrs.status || 'Unknown',
            statusColor: attrs.statusColor || 'bg-blue-500',
            date: attrs.dateRange || '',
            budget: attrs.budget || 'N/A',
            beneficiaries: attrs.beneficiaries || 'N/A',
            category: attrs.category || 'General',
            percent: attrs.percent ? `${attrs.percent}%` : '0%',
            progressWidth: attrs.percent ? `${attrs.percent}%` : '0%',
            img: getStrapiImageUrl(attrs.img),
            description: attrs.description || '',
            milestones: (attrs.milestones || []).map(m => ({
                date: m.date || '',
                text: m.text || ''
            }))
        };
    });
}

/**
 * Fetch all news items
 */
export async function fetchNews() {
    const data = await strapiGet('/news-articles', { 'populate': '*', 'sort[0]': 'date:desc' });
    if (!data?.data) return [];
    return data.data.map(item => {
        const attrs = item.attributes || item;
        return {
            id: item.id,
            title: attrs.title,
            content: attrs.content || '',
            date: attrs.date || '',
            category: attrs.category || '',
            img: getStrapiImageUrl(attrs.img)
        };
    });
}

/**
 * Fetch all sectors
 */
export async function fetchSectors() {
    const data = await strapiGet('/sectors', { 'populate': '*', 'sort[0]': 'order:asc' });
    if (!data?.data) return [];
    return data.data.map(item => {
        const attrs = item.attributes || item;
        return {
            id: item.id,
            name: attrs.name,
            icon: attrs.icon || '🏛️',
            category: attrs.category || 'government',
            description: attrs.description || ''
        };
    });
}

/**
 * Fetch all FAQs
 */
export async function fetchFAQs() {
    const data = await strapiGet('/faqs', { 'sort[0]': 'order:asc' });
    if (!data?.data) return [];
    return data.data.map(item => {
        const attrs = item.attributes || item;
        return {
            id: item.id,
            question: attrs.question,
            answer: attrs.answer
        };
    });
}

/**
 * Fetch all kebeles
 */
export async function fetchKebeles() {
    const data = await strapiGet('/kebeles', { 'populate': '*' });
    if (!data?.data) return [];
    return data.data.map(item => {
        const attrs = item.attributes || item;
        return {
            id: item.id,
            name: attrs.name,
            type: attrs.type || 'Rural',
            population: attrs.population || '',
            description: attrs.description || '',
            isCapital: attrs.isCapital || false
        };
    });
}

/**
 * Fetch the administrator message (single type)
 */
export async function fetchAdminMessage() {
    const data = await strapiGet('/admin-message', { 'populate': '*' });
    if (!data?.data) return null;
    const attrs = data.data.attributes || data.data;
    return {
        title: attrs.title || '',
        administratorName: attrs.administratorName || '',
        role: attrs.role || '',
        message: attrs.message || '',
        image: getStrapiImageUrl(attrs.image)
    };
}

/**
 * Fetch global settings (single type)
 */
export async function fetchGlobalSettings() {
    const data = await strapiGet('/global-setting', { 'populate': '*' });
    if (!data?.data) return null;
    const attrs = data.data.attributes || data.data;
    return {
        siteName: attrs.siteName || 'Abuna Ginde Beret Woreda',
        residentCount: attrs.residentCount || '150k+',
        agriculturePercentage: attrs.agriculturePercentage || '90%',
        schoolCount: attrs.schoolCount || '12',
        areaSize: attrs.areaSize || '',
        footerText: attrs.footerText || ''
    };
}

/**
 * Fetch all gallery images
 */
export async function fetchGallery() {
    const data = await strapiGet('/galleries', { 'populate': '*', 'sort[0]': 'order:asc' });
    if (!data?.data) return [];
    return data.data.map(item => {
        const attrs = item.attributes || item;
        return {
            id: item.id,
            title: attrs.title,
            description: attrs.description || '',
            category: attrs.category || 'Community',
            image: getStrapiImageUrl(attrs.image),
            order: attrs.order || 0
        };
    });
}
