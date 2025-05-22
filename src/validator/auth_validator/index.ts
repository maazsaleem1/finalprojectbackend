import { z, ZodSchema } from "zod";
import validator from 'validator';
import dns from "dns";
import { promisify } from "util";

const resolveMx = promisify(dns.resolveMx);

export const signupSchema: ZodSchema<{
  email: string;
  password: string;
  fullName: string;
}> = z.object({
  email: z.string()
    .email("Invalid email format")
    .max(255)
    .refine(async (email) => {
      if (!validator.isEmail(email)) {
        return false;
      }
      const domain = email.split('@')[1];
      try {
        const mxRecords = await resolveMx(domain);
        return mxRecords && mxRecords.length > 0;
      } catch (error) {
        console.error("DNS MX record lookup failed:", error);
        return false;
      }
    }, "Email domain does not exist or this email does not exist"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100),
  fullName: z.string()
});
export const loginSchema: ZodSchema<{
  email: string;
  password: string;
  deviceToken?: string;
}> = z.object({
  email: z.string().email("Inavalid email format").max(255),
  password: z
    .string(),
  deviceToken: z.string().optional(),
})


export const createProfileSchema: ZodSchema<{
  fullName?: string;
  age?: string;
  gender?: string;
  address?: string;
  contact?: string
}> = z.object({
  fullName: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  contact: z.string().optional(),
});

export const otpSendSchema: ZodSchema<{
  email: string;
}> = z.object({
  email: z.string().email("Invalid email format").max(255),
});


export const changePasswordSchema: ZodSchema<{
  oldPassword: string;
  newPassword: string;
}> = z.object({
  oldPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100),
});
export const forgetPassSchema: ZodSchema<{
  email: string;
}> = z.object({
  email: z.string().email("Invalid email format").max(255),
});





export const resetPassSchema: ZodSchema<{
  password: string;
}> = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100),
});


export const updateProfileSchema: ZodSchema<{
  fullName?: string;
  organizationName?: string;
  yearOfExperience?: string;
  gender?: string;
  dob?: string;
  address?: string;
  postalCode?: string;
  country?: string;
  city?: string;
  state?: string;
  phoneNumber?: string;
  location?: { type: "Point", coordinates: [number, number] },
}> = z.object({
  fullName: z.string().optional(),
  organizationName: z.string().optional(),
  yearOfExperience: z.string().optional(),
  gender: z.string().optional(),
  dob: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  phoneNumber: z.string().optional(),
  location: z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([
      z
        .number()
        .min(-180, "Longitude must be between -180 and 180")
        .max(180, "Longitude must be between -180 and 180"),
      z
        .number()
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90"),
    ]),
  }),
});