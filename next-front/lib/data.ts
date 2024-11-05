import {MemCard, MemModel} from "@/lib/definitions";
import {mongoClient} from "@/lib/connect";

export async function getAllMems(): Promise<MemCard[]> {
   try {
      await mongoClient;
      const mems = await MemModel.find({});
      console.log(mems);
      return mems;
   } catch (error) {
      console.error("Error occurred while fetch data:", error);
      return Promise.resolve([])
   }
}
