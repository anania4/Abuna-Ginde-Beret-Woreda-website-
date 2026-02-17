#!/usr/bin/env node

/**
 * Quick script to check if Strapi is running and accessible
 * Run with: node check-strapi.js
 */

const STRAPI_URL = 'http://localhost:1337';

async function checkStrapi() {
    console.log('🔍 Checking Strapi CMS connection...\n');
    
    // Check if Strapi server is running
    try {
        const response = await fetch(`${STRAPI_URL}/_health`);
        if (response.ok) {
            console.log('✅ Strapi server is running on', STRAPI_URL);
        } else {
            console.log('⚠️  Strapi server responded but with status:', response.status);
        }
    } catch (error) {
        console.log('❌ Cannot connect to Strapi server');
        console.log('   Make sure Strapi is running: cd backend && npm run develop');
        console.log('   Error:', error.message);
        return;
    }
    
    console.log('\n📡 Testing API endpoints...\n');
    
    const endpoints = [
        { name: 'Projects', url: '/api/projects?populate=*' },
        { name: 'News', url: '/api/news-articles?populate=*' },
        { name: 'Sectors', url: '/api/sectors?populate=*' },
        { name: 'FAQs', url: '/api/faqs' },
        { name: 'Kebeles', url: '/api/kebeles?populate=*' },
        { name: 'Admin Message', url: '/api/admin-message?populate=*' },
        { name: 'Global Settings', url: '/api/global-setting?populate=*' },
        { name: 'Gallery', url: '/api/galleries?populate=*' },
        { name: 'Events', url: '/api/events?populate=*' }
    ];
    
    let allSuccess = true;
    
    for (const endpoint of endpoints) {
        try {
            const response = await fetch(`${STRAPI_URL}${endpoint.url}`);
            const data = await response.json();
            
            if (response.ok) {
                const count = data.data ? (Array.isArray(data.data) ? data.data.length : 1) : 0;
                console.log(`✅ ${endpoint.name.padEnd(20)} - ${count} items`);
            } else {
                console.log(`❌ ${endpoint.name.padEnd(20)} - ${data.error?.message || 'Error'}`);
                if (data.error?.message?.includes('forbidden')) {
                    console.log('   ⚠️  Permissions not enabled! See STRAPI-SETUP-GUIDE.md');
                }
                allSuccess = false;
            }
        } catch (error) {
            console.log(`❌ ${endpoint.name.padEnd(20)} - ${error.message}`);
            allSuccess = false;
        }
    }
    
    console.log('\n' + '='.repeat(50));
    
    if (allSuccess) {
        console.log('✅ All endpoints are working correctly!');
        console.log('   Your frontend should now display content from Strapi.');
        console.log('   Start frontend with: npm run dev');
    } else {
        console.log('⚠️  Some endpoints failed.');
        console.log('   Follow the steps in STRAPI-SETUP-GUIDE.md to fix permissions.');
        console.log('   Open test-connection.html in your browser for detailed testing.');
    }
    
    console.log('='.repeat(50) + '\n');
}

checkStrapi().catch(console.error);
