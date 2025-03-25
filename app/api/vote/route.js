import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Post from "@/models/Post";

export async function POST(req) {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get("postId");

    console.log({postId})

    try {
        await connectMongo();
        const post = await Post.findById(postId);
        console.log(post)

        if (!post) {
            return NextResponse.error({
                status: 404,
                message: "Post not found",
            });
        }

        post.votesCounter += 1;
        await post.save();
        
        return NextResponse.json({ message: 'Upvoted'}, { status: 200 });
    } catch (error) {
        return NextResponse.error({
            status: 500,
            message: error?.message || "Something went wrong",
        });
        
    }
}

export async function DELETE(req) {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get("postId");

    try {
        await connectMongo();
        const post = await Post.findById(postId);

        if (!post) {
            return NextResponse.error({
                status: 404,
                message: "Post not found",
            });
        }

        post.votesCounter -= 1;
        await post.save();
        
        return NextResponse.json({ message: 'Downvoted'}, { status: 200 });
    } catch (error) {
        return NextResponse.error({
            status: 500,
            message: error?.message || "Something went wrong",
        });
        
    }
}