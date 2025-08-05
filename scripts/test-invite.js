const { PrismaClient } = require('../prisma/generated/postgres');

async function testInviteSystem() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing invite system...');
    
    // Check if there are any servers in the database
    const servers = await prisma.server.findMany({
      include: {
        members: true,
        channels: true
      }
    });
    
    console.log(`Found ${servers.length} servers in database`);
    
    if (servers.length === 0) {
      console.log('No servers found. Creating a test server...');
      
      // Create a test profile first
      const testProfile = await prisma.profile.create({
        data: {
          userId: 'test-user-id',
          name: 'Test User',
          imageUrl: 'https://via.placeholder.com/150',
          email: 'test@example.com'
        }
      });
      
      console.log('Created test profile:', testProfile.id);
      
      // Create a test server
      const testServer = await prisma.server.create({
        data: {
          name: 'Test Server',
          imageUrl: 'https://via.placeholder.com/150',
          inviteCode: 'test-invite-123',
          profileId: testProfile.id,
          channels: {
            create: [
              {
                name: 'general',
                profileId: testProfile.id
              }
            ]
          },
          members: {
            create: [
              {
                profileId: testProfile.id,
                role: 'ADMIN'
              }
            ]
          }
        }
      });
      
      console.log('Created test server:', testServer.id);
      console.log('Test invite code:', testServer.inviteCode);
    } else {
      console.log('Existing servers:');
      servers.forEach(server => {
        console.log(`- ${server.name} (ID: ${server.id}, Invite Code: ${server.inviteCode})`);
      });
      
      // Test the invite functionality with the first server
      const testServer = servers[0];
      console.log(`\nTesting invite functionality with server: ${testServer.name}`);
      console.log(`Invite code: ${testServer.inviteCode}`);
      
      // Check if a test profile exists, if not create one
      let testProfile = await prisma.profile.findFirst({
        where: {
          userId: 'test-invite-user'
        }
      });
      
      if (!testProfile) {
        testProfile = await prisma.profile.create({
          data: {
            userId: 'test-invite-user',
            name: 'Test Invite User',
            imageUrl: 'https://via.placeholder.com/150',
            email: 'test-invite@example.com'
          }
        });
        console.log('Created test profile for invite testing:', testProfile.id);
      }
      
      // Check if the test profile is already a member
      const existingMember = await prisma.member.findFirst({
        where: {
          serverId: testServer.id,
          profileId: testProfile.id
        }
      });
      
      if (existingMember) {
        console.log('Test profile is already a member of this server');
      } else {
        console.log('Adding test profile as member...');
        
        // Add the test profile as a member
        const newMember = await prisma.member.create({
          data: {
            profileId: testProfile.id,
            serverId: testServer.id,
            role: 'GUEST'
          }
        });
        
        console.log('Successfully added test profile as member:', newMember.id);
      }
    }
    
  } catch (error) {
    console.error('Error testing invite system:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testInviteSystem(); 