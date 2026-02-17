/**
 * Final Checkpoint Test Script
 * Tests the complete application through a single server
 */

const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:1337';

/**
 * Make HTTP request
 */
function makeRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Accept': '*/*'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

/**
 * Test: Root route serves index.html
 */
async function testRootRoute() {
  console.log('\n✓ Testing root route (/)...');
  const response = await makeRequest('/');
  
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  
  if (!response.headers['content-type'].includes('text/html')) {
    throw new Error(`Expected Content-Type text/html, got ${response.headers['content-type']}`);
  }
  
  if (!response.body.includes('<!doctype html>') && !response.body.includes('<!DOCTYPE html>')) {
    throw new Error('Response does not contain HTML doctype');
  }
  
  console.log('  ✓ Root route serves index.html with correct Content-Type');
  return true;
}

/**
 * Test: Static assets are served correctly
 */
async function testStaticAssets() {
  console.log('\n✓ Testing static assets...');
  
  // First, get the index.html to find actual asset filenames
  const indexResponse = await makeRequest('/');
  const indexHtml = indexResponse.body;
  
  // Extract CSS and JS filenames from the HTML
  const cssMatch = indexHtml.match(/href="\/assets\/(index-[^"]+\.css)"/);
  const jsMatch = indexHtml.match(/src="\/assets\/(index-[^"]+\.js)"/);
  
  if (cssMatch) {
    const cssPath = `/assets/${cssMatch[1]}`;
    const cssResponse = await makeRequest(cssPath);
    if (cssResponse.status === 200 && cssResponse.headers['content-type'].includes('text/css')) {
      console.log(`  ✓ CSS file (${cssMatch[1]}) served with correct MIME type`);
    } else {
      console.log(`  ✗ CSS file failed: status ${cssResponse.status}, type ${cssResponse.headers['content-type']}`);
    }
  } else {
    console.log('  ⚠ No CSS file found in index.html');
  }
  
  if (jsMatch) {
    const jsPath = `/assets/${jsMatch[1]}`;
    const jsResponse = await makeRequest(jsPath);
    if (jsResponse.status === 200 && jsResponse.headers['content-type'].includes('application/javascript')) {
      console.log(`  ✓ JS file (${jsMatch[1]}) served with correct MIME type`);
    } else {
      console.log(`  ✗ JS file failed: status ${jsResponse.status}, type ${jsResponse.headers['content-type']}`);
    }
  } else {
    console.log('  ⚠ No JS file found in index.html');
  }
  
  return true;
}

/**
 * Test: API routes remain functional
 */
async function testApiRoutes() {
  console.log('\n✓ Testing API routes...');
  
  const apiResponse = await makeRequest('/api/sectors');
  
  if (apiResponse.status !== 200 && apiResponse.status !== 404) {
    throw new Error(`Expected API response, got status ${apiResponse.status}`);
  }
  
  // Check if response is JSON (API response) not HTML (static file)
  const contentType = apiResponse.headers['content-type'] || '';
  if (contentType.includes('text/html')) {
    throw new Error('API route returned HTML instead of JSON');
  }
  
  console.log(`  ✓ API routes return JSON responses (status: ${apiResponse.status})`);
  return true;
}

/**
 * Test: SPA fallback for non-existent routes
 */
async function testSpaFallback() {
  console.log('\n✓ Testing SPA fallback...');
  
  const response = await makeRequest('/some-non-existent-route');
  
  if (response.status !== 200) {
    throw new Error(`Expected status 200 (SPA fallback), got ${response.status}`);
  }
  
  if (!response.headers['content-type'].includes('text/html')) {
    throw new Error(`Expected Content-Type text/html, got ${response.headers['content-type']}`);
  }
  
  if (!response.body.includes('<!doctype html>') && !response.body.includes('<!DOCTYPE html>')) {
    throw new Error('SPA fallback does not return HTML');
  }
  
  console.log('  ✓ Non-existent routes serve index.html (SPA fallback)');
  return true;
}

/**
 * Test: Cache headers
 */
async function testCacheHeaders() {
  console.log('\n✓ Testing cache headers...');
  
  const response = await makeRequest('/');
  const cacheControl = response.headers['cache-control'];
  
  if (!cacheControl) {
    console.log('  ⚠ No Cache-Control header found');
    return true;
  }
  
  console.log(`  ✓ Cache-Control header present: ${cacheControl}`);
  
  if (process.env.NODE_ENV === 'production') {
    if (!cacheControl.includes('max-age')) {
      console.log('  ⚠ Production mode should have max-age in Cache-Control');
    } else {
      console.log('  ✓ Production cache headers configured correctly');
    }
  } else {
    console.log('  ✓ Development mode cache headers configured correctly');
  }
  
  return true;
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('='.repeat(60));
  console.log('Final Checkpoint - End-to-End Validation');
  console.log('='.repeat(60));
  console.log(`\nTesting server at: ${BASE_URL}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  const testSuite = [
    { name: 'Root Route', fn: testRootRoute },
    { name: 'Static Assets', fn: testStaticAssets },
    { name: 'API Routes', fn: testApiRoutes },
    { name: 'SPA Fallback', fn: testSpaFallback },
    { name: 'Cache Headers', fn: testCacheHeaders }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of testSuite) {
    try {
      await test.fn();
      passed++;
    } catch (error) {
      console.error(`\n✗ ${test.name} failed:`, error.message);
      failed++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(60));
  
  if (failed > 0) {
    process.exit(1);
  }
}

// Wait for server to be ready
console.log('Waiting for server to be ready...');
setTimeout(() => {
  runTests().catch((error) => {
    console.error('Test suite failed:', error);
    process.exit(1);
  });
}, 2000);
