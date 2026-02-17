/**
 * Production Mode Test Script
 * Tests the application with NODE_ENV=production
 */

const http = require('http');

const BASE_URL = 'http://localhost:1337';

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
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
          body: data
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function testProductionCaching() {
  console.log('\n=== Testing Production Mode ===\n');
  
  // Test root route cache headers
  console.log('Testing root route cache headers...');
  const rootResponse = await makeRequest('/');
  console.log(`  Root (/) Cache-Control: ${rootResponse.headers['cache-control']}`);
  
  // Test static asset cache headers
  const indexHtml = rootResponse.body;
  const cssMatch = indexHtml.match(/href="\/assets\/(index-[^"]+\.css)"/);
  
  if (cssMatch) {
    const cssPath = `/assets/${cssMatch[1]}`;
    const cssResponse = await makeRequest(cssPath);
    console.log(`  CSS Cache-Control: ${cssResponse.headers['cache-control']}`);
    
    if (cssResponse.headers['cache-control'] && cssResponse.headers['cache-control'].includes('max-age')) {
      console.log('  ✓ Production caching enabled for static assets');
    } else {
      console.log('  ⚠ Production caching may not be properly configured');
    }
  }
  
  console.log('\n✓ Production mode test complete');
}

console.log('Waiting for server...');
setTimeout(() => {
  testProductionCaching().catch(console.error);
}, 2000);
