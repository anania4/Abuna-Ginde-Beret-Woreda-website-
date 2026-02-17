/**
 * Test script to verify Cache-Control headers in production mode
 * This script starts the server briefly and checks the headers
 */

const http = require('http');

// Set NODE_ENV to production for this test
process.env.NODE_ENV = 'production';

console.log('Testing Cache-Control headers in production mode...\n');

// Function to make HTTP request and check headers
function checkHeaders(path, expectedCacheControl) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      const cacheControl = res.headers['cache-control'];
      const contentType = res.headers['content-type'];
      
      console.log(`Path: ${path}`);
      console.log(`  Status: ${res.statusCode}`);
      console.log(`  Content-Type: ${contentType}`);
      console.log(`  Cache-Control: ${cacheControl}`);
      
      if (cacheControl === expectedCacheControl) {
        console.log(`  ✓ Cache-Control header is correct\n`);
        resolve(true);
      } else {
        console.log(`  ✗ Expected: ${expectedCacheControl}\n`);
        resolve(false);
      }
      
      // Consume response data to free up memory
      res.resume();
    });

    req.on('error', (e) => {
      console.error(`  ✗ Request failed: ${e.message}\n`);
      resolve(false);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      console.error(`  ✗ Request timeout\n`);
      resolve(false);
    });

    req.end();
  });
}

async function runTests() {
  console.log('Make sure the Strapi server is running with NODE_ENV=production');
  console.log('Run: NODE_ENV=production npm run start\n');
  console.log('Waiting 2 seconds before testing...\n');
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const tests = [
    { path: '/', expected: 'no-cache', description: 'index.html (no cache for SPA)' },
    { path: '/src/style.css', expected: 'public, max-age=31536000', description: 'CSS file (long cache)' },
    { path: '/src/main.js', expected: 'public, max-age=31536000', description: 'JS file (long cache)' },
    { path: '/public/vite.svg', expected: 'public, max-age=31536000', description: 'Image file (long cache)' }
  ];
  
  let allPassed = true;
  
  for (const test of tests) {
    const passed = await checkHeaders(test.path, test.expected);
    if (!passed) allPassed = false;
  }
  
  if (allPassed) {
    console.log('✓ All Cache-Control header tests passed!');
  } else {
    console.log('✗ Some tests failed. Check the output above.');
  }
}

runTests().catch(console.error);
