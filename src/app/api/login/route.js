import connect from '@/database';
import User from "@/models/user";
import Joi from "joi";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const dynamic = "force-dynamic";


export async function POST(req) {
    await connect();
    const { email, password } = await req.json();

    const { error } = schema.validate({ email, password });

    if (error) {
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        });
    }

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return NextResponse.json({
                success: false,
                message: "Account not found with this email",
            });
        }

        const checkPassword = await compare(password, checkUser.password);
        if (!checkPassword) {
            return NextResponse.json({
                success: false,
                message: "Incorrect password. Please try again !",
            });
        }

        const token = jwt.sign(
            {
                id: checkUser._id,
                email: checkUser?.email,
            },
            "default_secret_key",
            { expiresIn: "1d" }
        );

        const finalData = {
            token,
            user: {
                email: checkUser.email,
                name: checkUser.name,
                _id: checkUser._id,
            },
        };
        return NextResponse.json({
            success: true,
            message: "Login successfully!",
            finalData,
        });
    } catch (e) {
        console.log("Error while logging In. Please try again");
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}