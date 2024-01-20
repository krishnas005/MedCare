import connect from "@/database";
import { NextResponse } from "next/server";
import Data from "@/models/data";
import Joi from "joi";


export const dynamic = "force-dynamic";

export async function POST(req) {

    try {

        await connect();

            const data = await req.json();

            const {
                age, chronicDiseases, allergies, medications, height, weight
            } = data;

            // const {error} = AddNewDataSchema.validate({
            //     DOB, chronicDiseases, allergies, medications, height, weight
            // });
            // if(error) {
            //     return NextResponse.json({
            //         success: false,
            //         message: error.details[0].message
            //     });
            // }

            const newlyCreateData = await Data.create(data);

            if(newlyCreateData) {
                return NextResponse.json({
                    success: true,
                    message: "Product added successfully"
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to add the product"
                });
            }
            
    } catch(err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: `Error: ${err}`
        });
    }
}