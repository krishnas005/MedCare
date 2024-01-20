import connect from "@/database";
import { NextResponse } from "next/server";
import Data from "@/models/data";
import Joi from "joi";

// const AddNewDataSchema = Joi.object({
//     name:Joi.string().required(),
//     description:Joi.string().required(),
//     price:Joi.number().required(),
//     category:Joi.string().required(),
//     sizes:Joi.array().required(),
//     deliveryInfo:Joi.string().required(),
//     onSale:Joi.string().required(),
//     priceDrop:Joi.number().required(),
//     imageUrl:Joi.string().required()
// })

export const dynamic = "force-dynamic";

export async function POST(req) {

    try {

        await connect();


            const data = await req.json();

            const {
                DOB, chronicDiseases, allergies, medications, height, weight
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