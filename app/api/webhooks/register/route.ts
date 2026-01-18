import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import UserModel from "@/models/user.models";
import dbConnect from "@/lib/dbConnect";


export async function POST(req : Request){
    const webhookSecert = process.env.CLERK_WEBHOOK_SECRET
    if(!webhookSecert){
        throw new Error("No webhook secret found");
    }
    const headerPayload = await headers()
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

    if(!svix_id || !svix_signature || !svix_timestamp){
        throw new Error("Error occured - svix payload details missing")
    }

    const payload = await req.json()
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecert);

    let evt : WebhookEvent;
    try {
        evt = wh.verify(body, 
            {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }
        ) as WebhookEvent;
        console.log("EVT in webhook--> ", evt);
        
    } catch (error) {
        console.error("Error occured in webhooks" , error)
        return new Response("Error occured" , {status : 400})
    }

    const {id} = evt.data
    const evtType = evt.type

    if(evtType === "user.created"){
        try {
            await dbConnect()
            const {email_addresses , primary_email_address_id , first_name} = evt.data
            const primaryEmail = email_addresses.find((email) => email.id === primary_email_address_id)
            if(!primaryEmail){
                return new Response("No primary email address found", {status: 400})
            }
            const user = await UserModel.create({
                username : first_name,
                email: primaryEmail.email_address
            })
            if(!user){
                return new Response("No new user found", {status: 500})
            }
            
            return new Response("User created successfully", {status:200})

        } catch (error) {
            console.log("User creation failed", error)
            return new Response("User creation failed", {status: 500})
        }
    }
    
    return new Response("User created and webhook successful", {status : 200})
}
