import {MemCard, MemModel} from "@/lib/definitions";
import {mongoClient} from "@/lib/connect";

export async function getAllMems(): Promise<MemCard[]> {
   try {
      await mongoClient;
      const mems = await MemModel.find({});

      const memCards = mems.map(mem =>({
         name: mem.name,
         description: mem.description,
         image: `data:${mem.image.contentType};base64,${mem.image.data.toString('base64')}`
      }));

      return memCards;
   } catch (error) {
      console.error("Error occurred while fetch data:", error);
      return Promise.resolve([])
   }
}
