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

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const CRON_ENDPOINT = '/api/cron/scheduler';
const CRON_SECRET_KEY = process.env.CRON_SECRET_KEY;

async function runLocalCron() {
  const url = `${BASE_URL}${CRON_ENDPOINT}`;
  
  console.log(`🕐 [${new Date().toISOString()}] Running local cron scheduler`);
  console.log(`📍 Endpoint: ${url}`);

  try {
    const headers = {
      'Authorization': `Bearer ${CRON_SECRET_KEY}`,
      'Content-Type': 'application/json'
    };
    
    const response = await makeRequest(url, 'POST', headers);
    
    if (response.status === 200) {
      console.log('✅ Scheduler executed successfully:');
      console.log(JSON.stringify(response, null, 2));
    } else {
      console.error('❌ Scheduler failed:', response);
    }
  } catch (error) {
    console.error('❌ Error running scheduler:', error.message);
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

// Run the scheduler
runLocalCron();
