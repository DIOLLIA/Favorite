import {NextResponse} from 'next/server'
import {MemModel} from "@/lib/definitions";


export async function POST(req: Request): Promise<NextResponse> {
    const formData = await req.formData()
    const cardName = formData.get("name") as string
    const cardImage = formData.get("image") as File
    const cardDescription = formData.get("description") as string

    if (!cardName || !cardImage || !cardDescription) {
        return NextResponse.json({error: "All fields are required."}, {status: 400});
    }

    const imageBuffer = await cardImage.arrayBuffer()
    const buffer = Buffer.from(imageBuffer)

    try {
        const memCard = new MemModel({
            name: cardName,
            image: {
                data: buffer,
                contentType: cardImage.type,
            },
            description: cardDescription
        });
        await memCard.save
        return NextResponse.json({message: "Image uploaded successfully"}, {status: 201})
    } catch (error) {
        return NextResponse.json({error: "An error occured during Image upload. Reason: " + error}, {status: 400})
    }
}