import * as z from "zod";

export const CategoryFormSchema = z.object({
    name : z
    .string({
        message:"Category name must be a string",
    })
    .min(2,{message:"Category name must be at least 2 charcters long"})
    .max(50,{message:"Category name musnt exceed 50 charcters"})
    .regex(/^[a-zA-Z0-9\s]+$/,{
        message:
            "Only Letter numbers and spaces are allowed in the category name",
    }),
    image : z.object({
        url : z.string(),
    }).array().length(1, "chose only one category image"),
    url: z
    .string({
        message:"Category url must be a string",
    })
    .min(2,{message:"Category url must be at least 2 charcters long"})
    .max(50,{message:"Category url musnt exceed 50 charcters"})
    .regex(/^(?!.*(?:[-_]){2,})[a-zA-Z0-9_-]+$/,{                       //no double _ or - in the url
        message:
            "Only Letter numbers, hyphen, and underscore are allowed in the category url",
    }),
    featured: z.boolean().default(false).optional(),

})