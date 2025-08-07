const { PrismaClient } = require('../prisma/generated/postgres');

const prisma = new PrismaClient();

const newImageUrls = [
  "https://picsum.photos/400/400?random=1",
  "https://picsum.photos/400/400?random=2", 
  "https://picsum.photos/400/400?random=3",
  "https://picsum.photos/400/400?random=4",
  "https://picsum.photos/400/400?random=5",
  "https://picsum.photos/400/400?random=6",
  "https://picsum.photos/400/400?random=7",
  "https://picsum.photos/400/400?random=8",
  "https://picsum.photos/400/400?random=9",
  "https://picsum.photos/400/400?random=10",
];

async function updateServerImages() {
  try {
    // Get all servers
    const servers = await prisma.server.findMany();
    
    console.log(`Found ${servers.length} servers to update`);
    
    // Update each server with a new image URL
    for (let i = 0; i < servers.length; i++) {
      const server = servers[i];
      const newImageUrl = newImageUrls[i % newImageUrls.length];
      
      await prisma.server.update({
        where: { id: server.id },
        data: { imageUrl: newImageUrl }
      });
      
      console.log(`Updated server "${server.name}" with new image URL`);
    }
    
    console.log("All server images updated successfully!");
  } catch (error) {
    console.error("Error updating server images:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateServerImages();
