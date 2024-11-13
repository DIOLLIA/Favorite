'use server' // this is redundant bcz api path already on the server side

import {NextResponse} from 'next/server'
import {MemModel} from "@/lib/definitions";
import {z} from "zod"

const memSchema = z.object({
    name: z.string().min(4, "Name is required, not less than 4 symbols"),
    description: z.string().min(4, "Description is required, not less than 4 symbols"),
    image: z.object({
        data: z.instanceof(Buffer, "Image data must be a Buffer")
            .refine((buffer) => buffer.byteLength <= 70 * 1024, {
                message: "Image size should not exceed 70 KB",
            }),
        contentType: z.string().min(1, "Content type is required"),
    }),
});

const baseSchema = z.object({
    name: memSchema.shape.name,
    description: memSchema.shape.description,
    image: z.object({
        contentType: memSchema.shape.image.shape.contentType,
    }),
});

export async function POST(req: Request): Promise<NextResponse> {
    const formData = await req.formData()

    const cardName = formData.get("name") as string
    const cardImage = formData.get("image") as File
    const cardDescription = formData.get("description") as string

    if (!cardName || !cardImage || !cardDescription) {
        return NextResponse.json({error: "All fields are required."}, {status: 400});
    }

    const dataToValidate = {
        name: cardName,
        description: cardDescription,
        image: {
            contentType: cardImage.type,
        },
    };

    const baseValidation = baseSchema.pick(
        {
        name: true,
        description: true,
        image: {contentType: true},
    }
    ).safeParse(dataToValidate);

    const baseValidationError = handleValidation(baseValidation);
    if (baseValidationError) return baseValidationError;

    const imageBuffer = await cardImage.arrayBuffer()
    const buffer = Buffer.from(imageBuffer)

    dataToValidate.image = {
        ...dataToValidate.image,
        data: buffer,
    };

    const finalValidation = memSchema.safeParse(dataToValidate);
    const finalValidationError = handleValidation(finalValidation);
    if (finalValidationError) return finalValidationError;


    try {
        const memCard = new MemModel(finalValidation.data);
        await memCard.save()

        return NextResponse.json({message: "Image uploaded successfully"}, {status: 201})
    } catch (error) {
        return NextResponse.json({error: "An error occured during Image upload. Reason: " + error}, {status: 400})
    }
}

function handleValidation<T>(validationResult: z.SafeParseReturnType<T, T>) {
    if (!validationResult.success) {
        return NextResponse.json(
            {error: validationResult.error.errors},
            {status: 400}
        );
    }
    return null;
}