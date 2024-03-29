import connect from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Data from "@/models/data";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';


export async function GET(req) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Error!"
            })
        }

        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            // const getAddress = await Data.findOne({ });
            const getAddress = await Data.find({ userID: id});
            // console.log("get-address:"+getAddress);

            if (getAddress) {
                console.log("get-address:"+getAddress)
                return NextResponse.json({
                    success: true,
                    data: getAddress
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "failed to get details ! Please try again",
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated!"
            })
        }

    } catch (e) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong!"
        })
    }
}