import { z } from "zod";

export const addLogsheetSchema = z.object({
    name:z.string().min(2, {
        message:"Nama logsheet wajib diisi."
    }),
    kolom:z.any()
})