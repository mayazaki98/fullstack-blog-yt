

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { connect } from "../route";

const prisma = new PrismaClient();

//指定記事取得
export const GET = async(req: Request, res: NextResponse) => {
    try {
        //http://localhost:3000/api/blog/3
        //                               ^id
        const id: number = parseInt(req.url.split("/blog/")[1]);

        await connect();

        const post = await prisma.post.findFirst({where: {id}});

        return NextResponse.json({ message: "Success", post}, {status: 200});
    } catch (err) {
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

//指定記事更新
export const PUT = async(req: Request, res: NextResponse) => {
    try {
        //http://localhost:3000/api/blog/3
        //                               ^id
        const id: number = parseInt(req.url.split("/blog/")[1]);
        const {title, description} = await req.json();

        await connect();

        const post = await prisma.post.update({
            data: {title, description},
            where: {id}
        });
        return NextResponse.json({ message: "Success", post}, {status: 200});
    } catch (err) {
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

//指定記事削除
export const DELETE = async(req: Request, res: NextResponse) => {
    try {
        //http://localhost:3000/api/blog/3
        //                               ^id
        const id: number = parseInt(req.url.split("/blog/")[1]);

        await connect();

        const post = await prisma.post.delete({
            where: {id}
        });
        return NextResponse.json({ message: "Success", post}, {status: 200});
    } catch (err) {
        return NextResponse.json({ message: "Error", err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}