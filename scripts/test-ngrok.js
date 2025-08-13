import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
  }
}

loadEnvFile();

// Your actual ngrok URL
const NGROK_URL = 'https://cadb7cf122f0.ngrok-free.app';

async function testNgrokConnection() {
  console.log('🔍 Testing ngrok tunnel connection...');
  console.log(`📍 URL: ${NGROK_URL}`);
  console.log('---');

  try {
    // Test basic connectivity
    const healthResponse = await makeRequest(`${NGROK_URL}/api/cron/scheduler`, 'GET');
    console.log('✅ Health check response:');
    console.log(JSON.stringify(healthResponse, null, 2));
    
    // Test with authorization
    const headers = {
      'Authorization': `Bearer ${process.env.CRON_SECRET_KEY}`,
      'Content-Type': 'application/json'
    };
    
    const schedulerResponse = await makeRequest(`${NGROK_URL}/api/cron/scheduler`, 'POST', headers);
    console.log('✅ Scheduler test response:');
    console.log(JSON.stringify(schedulerResponse, null, 2));
    
  } catch (error) {
    console.error('❌ Error testing ngrok:', error.message);
  }
}

function makeRequest(url, method = 'GET', headers = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.request(url, { method, headers }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, ...jsonData });
        } catch (error) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// Run the test
testNgrokConnection();
