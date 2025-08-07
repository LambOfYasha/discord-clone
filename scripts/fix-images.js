const { PrismaClient } = require('../prisma/generated/postgres');

const prisma = new PrismaClient();

async function fixImages() {
  try {
    console.log('Starting image fix...');
    
    // Get all servers
    const servers = await prisma.server.findMany();
    console.log(`Found ${servers.length} servers`);
    
    // Update each server with a new image URL
    for (let i = 0; i < servers.length; i++) {
      const server = servers[i];
      const newImageUrl = `https://picsum.photos/400/400?random=${i + 1}`;
      
      await prisma.server.update({
        where: { id: server.id },
        data: { imageUrl: newImageUrl }
      });
      
      console.log(`Updated "${server.name}" with new image`);
    }
    
    console.log('All images updated successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixImages();
