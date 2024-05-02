import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    avatarUrl?: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    verified: boolean;

    @Prop({ default: "user" })
    type: string;

    @Prop({ required: function () { return !this.verified; } })
    verificationCode?: string;

    @Prop([{ 
        fieldOfStudy: String, 
        location: String, 
        university: String,
        skills: [String], // Changed to array of strings
        experience: String, // Changed to string
    }])
    profile: { 
        fieldOfStudy: string,
        location: string,
        university: string,
        skills: string[],
        experience: string,
    }[];

    @Prop({required: false})
    forgotVerificationCode: string;

    // Additional properties can be added here if needed
}

export const UserSchema = SchemaFactory.createForClass(User);
