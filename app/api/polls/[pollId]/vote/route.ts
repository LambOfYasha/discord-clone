import { NextRequest, NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { postgres, mongo } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ pollId: string }> }
) {
  try {
    const { pollId } = await params;
    console.log("Vote API route hit for pollId:", pollId);
    
    const profile = await currentProfile();
    console.log("Profile:", profile ? "Found" : "Not found");
    
    if (!profile) {
      console.log("No profile found - returning 401");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { optionId } = body;
    console.log("Vote request body:", body);

    if (!optionId) {
      console.log("No optionId provided - returning 400");
      return new NextResponse("Option ID is required", { status: 400 });
    }

    // Get the member from PostgreSQL
    const member = await postgres.member.findFirst({
      where: { profileId: profile.id },
    });

    console.log("Member:", member ? "Found" : "Not found");

    if (!member) {
      console.log("Member not found - returning 404");
      return new NextResponse("Member not found", { status: 404 });
    }

    // Get the poll from PostgreSQL
    const postgresPoll = await postgres.poll.findUnique({
      where: { id: pollId },
      include: {
        options: true,
      },
    });

    console.log("PostgreSQL Poll:", postgresPoll ? "Found" : "Not found");

    // Get the poll from MongoDB
    const mongoPoll = await mongo.poll.findUnique({
      where: { id: pollId },
      include: {
        options: true,
      },
    });

    console.log("MongoDB Poll:", mongoPoll ? "Found" : "Not found");

    // Use whichever poll exists
    const poll = postgresPoll || mongoPoll;
    const pollExistsInPostgres = !!postgresPoll;
    const pollExistsInMongo = !!mongoPoll;
    
    console.log("Using poll from:", postgresPoll ? "PostgreSQL" : mongoPoll ? "MongoDB" : "Neither");

    if (!poll) {
      console.log("Poll not found in either database - returning 404");
      return new NextResponse("Poll not found", { status: 404 });
    }

    if (!poll.isActive) {
      console.log("Poll is not active - returning 400");
      return new NextResponse("Poll is no longer active", { status: 400 });
    }

    if (poll.expiresAt && new Date() > poll.expiresAt) {
      console.log("Poll has expired - returning 400");
      return new NextResponse("Poll has expired", { status: 400 });
    }

    // Check if the option exists
    const option = poll.options.find(opt => opt.id === optionId);
    console.log("Option:", option ? "Found" : "Not found");

    if (!option) {
      console.log("Option not found - returning 404");
      return new NextResponse("Option not found", { status: 404 });
    }

    // Check if user has already voted for this option
    let existingVote = null;
    if (pollExistsInPostgres) {
      existingVote = await postgres.pollVote.findUnique({
        where: {
          memberId_pollOptionId: {
            memberId: member.id,
            pollOptionId: optionId,
          },
        },
      });
    } else if (pollExistsInMongo) {
      existingVote = await mongo.pollVote.findUnique({
        where: {
          memberId_pollOptionId: {
            memberId: member.id,
            pollOptionId: optionId,
          },
        },
      });
    }

    console.log("Existing vote:", existingVote ? "Found" : "Not found");

    if (existingVote) {
      console.log("User already voted for this option - returning 400");
      return new NextResponse("You have already voted for this option", { status: 400 });
    }

    // If multiple votes are not allowed, check if user has voted for any option in this poll
    if (!poll.allowMultipleVotes) {
      let existingVotes = [];
      if (pollExistsInPostgres) {
        existingVotes = await postgres.pollVote.findMany({
          where: {
            memberId: member.id,
            pollOption: {
              pollId: pollId,
            },
          },
        });
      } else if (pollExistsInMongo) {
        existingVotes = await mongo.pollVote.findMany({
          where: {
            memberId: member.id,
            pollOption: {
              pollId: pollId,
            },
          },
        });
      }

      console.log("Existing votes for this poll:", existingVotes.length);

      if (existingVotes.length > 0) {
        console.log("User already voted in this poll - returning 400");
        return new NextResponse("You can only vote once in this poll", { status: 400 });
      }
    }

    console.log("All validations passed, creating vote...");

    let vote = null;

    // Create the vote in the database where the poll exists
    if (pollExistsInPostgres) {
      console.log("Creating vote in PostgreSQL");
      vote = await postgres.pollVote.create({
        data: {
          memberId: member.id,
          pollOptionId: optionId,
        },
      });

      // Update the option vote count in PostgreSQL
      await postgres.pollOption.update({
        where: { id: optionId },
        data: {
          votes: {
            increment: 1,
          },
        },
      });

      // Update the poll total votes in PostgreSQL
      await postgres.poll.update({
        where: { id: pollId },
        data: {
          totalVotes: {
            increment: 1,
          },
        },
      });
    }

    if (pollExistsInMongo) {
      console.log("Creating vote in MongoDB");
      vote = await mongo.pollVote.create({
        data: {
          memberId: member.id,
          pollOptionId: optionId,
        },
      });

      // Update the option vote count in MongoDB
      await mongo.pollOption.update({
        where: { id: optionId },
        data: {
          votes: {
            increment: 1,
          },
        },
      });

      // Update the poll total votes in MongoDB
      await mongo.poll.update({
        where: { id: pollId },
        data: {
          totalVotes: {
            increment: 1,
          },
        },
      });
    }

    console.log("Vote created successfully");
    return NextResponse.json({ vote });
  } catch (error) {
    console.error("[POLL_VOTE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
