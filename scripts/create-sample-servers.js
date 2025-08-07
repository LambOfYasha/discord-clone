const { PrismaClient } = require('../prisma/generated/postgres');

const prisma = new PrismaClient();

const sampleServers = [
  {
    name: "Christian Fellowship",
    imageUrl: "https://picsum.photos/400/400?random=1",
    category: "CHRISTIANITY",
    profileId: "sample-profile-id",
  },
  {
    name: "Tech Entrepreneurs",
    imageUrl: "https://picsum.photos/400/400?random=2",
    category: "BUSINESS",
    profileId: "sample-profile-id",
  },
  {
    name: "Gaming Community",
    imageUrl: "https://picsum.photos/400/400?random=3",
    category: "SOCIAL",
    profileId: "sample-profile-id",
  },
  {
    name: "Science & Research",
    imageUrl: "https://picsum.photos/400/400?random=4",
    category: "SCIENCE_AND_EDUCATION",
    profileId: "sample-profile-id",
  },
  {
    name: "Popular Gaming Hub",
    imageUrl: "https://picsum.photos/400/400?random=5",
    category: "POPULAR",
    profileId: "sample-profile-id",
  },
  {
    name: "Bible Study Group",
    imageUrl: "https://picsum.photos/400/400?random=6",
    category: "CHRISTIANITY",
    profileId: "sample-profile-id",
  },
  {
    name: "Startup Founders",
    imageUrl: "https://picsum.photos/400/400?random=7",
    category: "BUSINESS",
    profileId: "sample-profile-id",
  },
  {
    name: "Anime & Manga Fans",
    imageUrl: "https://picsum.photos/400/400?random=8",
    category: "SOCIAL",
    profileId: "sample-profile-id",
  },
  {
    name: "Mathematics Enthusiasts",
    imageUrl: "https://picsum.photos/400/400?random=9",
    category: "SCIENCE_AND_EDUCATION",
    profileId: "sample-profile-id",
  },
  {
    name: "Trending Tech News",
    imageUrl: "https://picsum.photos/400/400?random=10",
    category: "POPULAR",
    profileId: "sample-profile-id",
  },
];

async function createSampleServers() {
  try {
    // First, get a real profile ID from the database
    const profile = await prisma.profile.findFirst();
    
    if (!profile) {
      console.log("No profiles found in database. Please create a profile first.");
      return;
    }

    console.log(`Using profile ID: ${profile.id}`);

    // Create sample servers
    for (const serverData of sampleServers) {
      const server = await prisma.server.create({
        data: {
          name: serverData.name,
          imageUrl: serverData.imageUrl,
          category: serverData.category,
          profileId: profile.id,
          inviteCode: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          channels: {
            create: [{ name: "general", profileId: profile.id }],
          },
          members: {
            create: [
              {
                profileId: profile.id,
                role: "ADMIN",
              },
            ],
          },
        },
      });

      console.log(`Created server: ${server.name} (${server.category})`);
    }

    console.log("Sample servers created successfully!");
  } catch (error) {
    console.error("Error creating sample servers:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleServers();
