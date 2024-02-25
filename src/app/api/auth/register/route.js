import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
    const userData = await request.json();

    const existingUser = await prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    });

    if (existingUser) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    message: "Email already taken",
                },
            },
            { status: 400 }
        );
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
        data: userData,
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    return NextResponse.json({
        success: true,
        user : user
    }, { status: 201 });
}
