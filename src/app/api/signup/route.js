import connect from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export async function POST(req) {
    await connect();

    const { name, email, password } = await req.json();

    try {
        const { error } = schema.validate({ name, email, password });

        if (error) {
            console.error("Validation error:", error);
            return NextResponse.json({
                success: false,
                message: "Invalid input data",
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return NextResponse.json({
                success: false,
                message: "User already exists!",
            });
        }

        const hashPassword = await hash(password, 12);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
        });

        if (newUser) {
            return NextResponse.json({
                success: true,
                message: "Account created successfully!",
            });
        }
    } catch (error) {
        console.error("Error in new user registration:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong!",
        });
    }
}
