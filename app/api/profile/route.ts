import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { postgres } from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile = await postgres.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, imageUrl, email } = body;

    const profile = await postgres.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    const updatedProfile = await postgres.profile.update({
      where: {
        userId,
      },
      data: {
        ...(name && { name }),
        ...(imageUrl && { imageUrl }),
        ...(email && { email }),
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 