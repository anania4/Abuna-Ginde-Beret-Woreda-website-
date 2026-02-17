/**
 * Diagnostic script to check the frontend serving issue
 */
import http from 'http';
import fs from 'fs';
import path from 'path';

console.log('='.repeat(60));
console.log('DIAGNOSTIC CHECK');
console.log('='.repeat(60));

// Check 1: Verify dist folder exists
console.log('\n1. Checking dist folder...');
const distExists = fs.existsSync('dist');
console.log(`   dist/ exists: ${distExists}`);

if (distExists) {
  console.log('   dist/index.html exists:', fs.existsSync('dist/index.html'));
  console.log('   dist/assets/ exists:', fs.existsSync('dist/assets'));
  
  if (fs.existsSync('dist/assets')) {
    const assets = fs.readdirSync('dist/assets');
    console.log('   Assets in dist/assets/:');
    assets.forEach(file => console.log(`     - ${file}`));
  }
}

// Check 2: Verify root index.html
console.log('\n2. Checking root index.html...');
console.log(`   index.html exists: ${fs.existsSync('index.html')}`);

// Check 3: Check what the server is serving
console.log('\n3. Testing server responses...');
console.log('   Waiting 2 seconds for server to be ready...\n');

setTimeout(async () => {
  const tests = [
    { path: '/', desc: 'Root (/)' },
    { path: '/assets/index-BSPGHGbv.css', desc: 'CSS file' },
    { path: '/assets/index-BmfLKPvk.js', desc: 'JS file' },
    { path: '/admin', desc: 'Admin panel' }
  ];

  for (const test of tests) {
    await new Promise((resolve) => {
      const req = http.request({
        hostname: 'localhost',
        port: 1337,
        path: test.path,
        method: 'HEAD'
      }, (res) => {
        console.log(`   ${test.desc}:`);
        console.log(`     Status: ${res.statusCode}`);
        console.log(`     Content-Type: ${res.headers['content-type'] || 'NOT SET'}`);
        console.log(`     Cache-Control: ${res.headers['cache-control'] || 'NOT SET'}`);
        console.log('');
        resolve();
      });

      req.on('error', (e) => {
        console.log(`   ${test.desc}:`);
        console.log(`     Error: ${e.message}`);
        console.log('');
        resolve();
      });

      req.setTimeout(3000, () => {
        req.destroy();
        console.log(`   ${test.desc}:`);
        console.log(`     Error: Timeout`);
        console.log('');
        resolve();
      });

      req.end();
    });
  }

  console.log('='.repeat(60));
  console.log('DIAGNOSIS COMPLETE');
  console.log('='.repeat(60));
  console.log('\nIf CSS/JS files return 404, the middleware is not serving');
  console.log('from the correct directory.');
  console.log('\nExpected behavior:');
  console.log('  - Root (/) should return 200 with text/html');
  console.log('  - CSS file should return 200 with text/css');
  console.log('  - JS file should return 200 with application/javascript');
  console.log('  - Admin should return 200 (Strapi admin)');
}, 2000);
