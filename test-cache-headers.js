/**
 * Quick test to verify Cache-Control headers
 */
import http from 'http';

function testUrl(path, description) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 1337,
      path: path,
      method: 'HEAD'
    };

    const req = http.request(options, (res) => {
      console.log(`\n${description}`);
      console.log(`  Path: ${path}`);
      console.log(`  Status: ${res.statusCode}`);
      console.log(`  Cache-Control: ${res.headers['cache-control'] || 'NOT SET'}`);
      console.log(`  Content-Type: ${res.headers['content-type'] || 'NOT SET'}`);
      resolve();
    });

    req.on('error', (e) => {
      console.log(`\n${description}`);
      console.log(`  Path: ${path}`);
      console.log(`  Error: ${e.message}`);
      resolve();
    });

    req.setTimeout(3000, () => {
      req.destroy();
      console.log(`\n${description}`);
      console.log(`  Path: ${path}`);
      console.log(`  Error: Timeout`);
      resolve();
    });

    req.end();
  });
}

async function main() {
  console.log('Testing Cache-Control Headers');
  console.log('==============================');
  console.log(`Current NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  
  await testUrl('/', 'Root Route (index.html)');
  await testUrl('/src/style.css', 'CSS File');
  await testUrl('/src/main.js', 'JavaScript File');
  await testUrl('/public/vite.svg', 'Image File');
  await testUrl('/api/sectors', 'API Route (should not have static cache)');
  
  console.log('\n==============================');
  console.log('Test Complete');
  console.log('\nExpected in PRODUCTION mode:');
  console.log('  - Static files: public, max-age=31536000');
  console.log('  - index.html: no-cache');
  console.log('  - API routes: handled by Strapi (no static cache)');
  console.log('\nExpected in DEVELOPMENT mode:');
  console.log('  - All files: no-cache');
}

main();
