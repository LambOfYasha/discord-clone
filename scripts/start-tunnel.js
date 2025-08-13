import { spawn } from 'child_process';

console.log('🚀 Starting ngrok tunnel for localhost:3000...');
console.log('📝 This will expose your local development server to the internet');
console.log('🔗 The public URL will be shown below');
console.log('---');

// Start ngrok tunnel
const ngrok = spawn('ngrok', ['http', '3000'], {
  stdio: 'inherit',
  shell: true
});

ngrok.on('error', (error) => {
  console.error('❌ Failed to start ngrok:', error.message);
  console.log('💡 Make sure ngrok is installed: npm install -g ngrok');
});

ngrok.on('close', (code) => {
  console.log(`🏁 ngrok process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping ngrok tunnel...');
  ngrok.kill('SIGINT');
  process.exit(0);
});
