import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop({default:"https://res.cloudinary.com/dhw1mueq4/image/upload/v1692710474/nopicture_pxjqht.jpg"})
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
        skills: [String], 
        experience: String,
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

    
}

export const UserSchema = SchemaFactory.createForClass(User);
