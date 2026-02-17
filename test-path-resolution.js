import path from 'path';
import fs from 'fs';

const projectRoot = path.resolve(process.cwd());
const distPath = path.join(projectRoot, 'dist');
const frontendRoot = fs.existsSync(distPath) ? distPath : projectRoot;

console.log('Project root:', projectRoot);
console.log('Dist path:', distPath);
console.log('Dist exists:', fs.existsSync(distPath));
console.log('Frontend root:', frontendRoot);
console.log('');

// Test path resolution
const requestPath = '/assets/index-BSPGHGbv.css';
const normalizedPath = path.normalize(requestPath);
const filePath = path.resolve(frontendRoot, normalizedPath.substring(1));

console.log('Request path:', requestPath);
console.log('Normalized:', normalizedPath);
console.log('Resolved file path:', filePath);
console.log('File exists:', fs.existsSync(filePath));

if (fs.existsSync(filePath)) {
  const stats = fs.statSync(filePath);
  console.log('Is file:', stats.isFile());
  console.log('File size:', stats.size, 'bytes');
}
