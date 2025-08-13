import https from 'https';
import http from 'http';

// Replace this with your actual ngrok URL
const NGROK_URL = process.env.NGROK_URL || 'https://your-ngrok-url.ngrok.io';

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
      'Authorization': `Bearer ${process.env.CRON_SECRET_KEY || 'your-secret-key'}`,
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
