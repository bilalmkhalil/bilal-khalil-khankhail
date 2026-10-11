import { object, string } from "yup";

// Shared by the contact form (client) and /api/send (server).
export const contactSchema = object({
  name: string().trim().max(100).required("Please enter your name"),
  email: string()
    .trim()
    .email("Invalid email format")
    .max(254)
    .required("Email is required"),
  message: string()
    .trim()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be under 5000 characters")
    .required("Please enter a message"),
});
