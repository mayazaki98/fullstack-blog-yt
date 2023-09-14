

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function connect() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました");
    }
}

//全記事取得
export const GET = async(req: Request, res: NextResponse) => {
    try {
        await connect();
        const posts = await prisma.post.findMany({
            orderBy: {id : 'desc'}
        });
        return NextResponse.json({ message: "Success", posts}, {status: 200});
    } catch (err) {
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

//新記事登録
export const POST = async(req: Request, res: NextResponse) => {
    try {
        const {title, description} = await req.json();
        await connect();
        const post = await prisma.post.create({data: {title, description}});
        return NextResponse.json({ message: "Success", post}, {status: 201});
    } catch (err) {
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}