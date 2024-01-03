import zod from "zod";

export const userLoginCredentials = zod.object({
    email: zod.string().email(),
    password: zod.string().min(1)
})

export const userRegisterCredentials = zod.object({
    name: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(1)
})