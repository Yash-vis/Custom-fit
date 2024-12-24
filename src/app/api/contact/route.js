import { NextResponse } from "next/server";
import { connectdb } from "@/mongo/db";
import Contact from "@/model/contact";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await connectdb();

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();
    console.log("Saved Contact:", { name, email, message });

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
