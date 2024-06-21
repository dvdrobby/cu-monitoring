import { z } from "zod";


export const unitSchema = z.object({
    name:z.string().min(1, {
        message:"Nama satuan tidak boleh kosong."
    }),
    symbol:z.string().min(1, {
        message:"Symbol tidak boleh kosong."
    }),
})