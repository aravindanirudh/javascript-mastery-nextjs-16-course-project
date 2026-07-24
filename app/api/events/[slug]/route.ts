import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/database";

interface RouteParams {
  params: {
    slug: string;
  };
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its unique slug.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // 1. Validate the route parameter
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 }
      );
    }

    // 2. Establish database connection
    await connectToDatabase();

    // 3. Query the event by slug
    const event = await Event.findOne({ slug });

    // 4. Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // 5. Return the successful response
    return NextResponse.json(
      { message: "Event fetched successfully!", event },
      { status: 200 }
    );
  } catch (error) {
    // 6. Handle unexpected errors
    console.error("Error fetching event by slug:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
