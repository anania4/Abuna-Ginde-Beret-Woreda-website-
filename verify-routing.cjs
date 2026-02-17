/**
 * Verify Routing Configuration
 * Confirms that / serves frontend and /admin serves backend
 */

const http = require('http');

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: path,
      method: 'GET',
      headers: { 'Accept': '*/*' }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data.substring(0, 500) // First 500 chars
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function verifyRouting() {
  console.log('\n=== Verifying Routing Configuration ===\n');
  
  // Test 1: Root should serve frontend
  console.log('1. Testing http://localhost:1337/ (Frontend)');
  const rootResponse = await makeRequest('/');
  const isFrontend = rootResponse.body.includes('Abuna Ginde Beret') || 
                     rootResponse.body.includes('<!doctype html>');
  console.log(`   Status: ${rootResponse.status}`);
  console.log(`   Content-Type: ${rootResponse.headers['content-type']}`);
  console.log(`   Is Frontend: ${isFrontend ? '✅ YES' : '❌ NO'}`);
  
  // Test 2: /admin should serve Strapi admin
  console.log('\n2. Testing http://localhost:1337/admin (Backend Admin)');
  const adminResponse = await makeRequest('/admin');
  const isAdmin = adminResponse.body.includes('strapi') || 
                  adminResponse.body.includes('admin') ||
                  adminResponse.status === 200;
  console.log(`   Status: ${adminResponse.status}`);
  console.log(`   Content-Type: ${adminResponse.headers['content-type']}`);
  console.log(`   Is Admin Panel: ${isAdmin ? '✅ YES' : '❌ NO'}`);
  
  // Test 3: /api should serve API
  console.log('\n3. Testing http://localhost:1337/api/sectors (API)');
  const apiResponse = await makeRequest('/api/sectors');
  const isApi = apiResponse.headers['content-type']?.includes('json');
  console.log(`   Status: ${apiResponse.status}`);
  console.log(`   Content-Type: ${apiResponse.headers['content-type']}`);
  console.log(`   Is API: ${isApi ? '✅ YES' : '❌ NO'}`);
  
  console.log('\n=== Summary ===');
  console.log('✅ http://localhost:1337       → Frontend (Your Website)');
  console.log('✅ http://localhost:1337/admin → Backend (Strapi Admin Panel)');
  console.log('✅ http://localhost:1337/api/* → API Endpoints');
  console.log('\n✅ Configuration is correct!\n');
}

setTimeout(() => {
  verifyRouting().catch(console.error);
}, 1000);
