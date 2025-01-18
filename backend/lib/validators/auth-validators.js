const z = require("zod");

/**
 * Sign Up form Schema
 */
const signUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: "use valid email address" })
      .nonempty({ message: "Email is required" }),
    name: z
      .string()
      .min(3, { message: "Name must be two characters long" })
      .max(26, { message: "Name cannot exceed 26 characters" })
      .nonempty({ message: "Name is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters long" })
      .max(30, { message: "Passwod can't exceed 30 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one Uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one Lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(8, "Password must be 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

/**
 * sign In form Schema
 */
const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "use valid email address" })
    .nonempty({ message: "Email is required" }),

  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" })
    .max(30, { message: "Passwod can't exceed 30 characters" }),
});
module.exports = { signUpSchema: signUpSchema, signInSchema: signInSchema };
