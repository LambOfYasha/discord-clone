require('dotenv').config({ path: '.env.local' });

console.log('Environment Variables Test:');
console.log('UPLOADTHING_SECRET:', process.env.UPLOADTHING_SECRET ? 'SET' : 'NOT SET');
console.log('UPLOADTHING_APP_ID:', process.env.UPLOADTHING_APP_ID || 'NOT SET');
console.log('UPLOADTHING_TOKEN:', process.env.UPLOADTHING_TOKEN ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV); 