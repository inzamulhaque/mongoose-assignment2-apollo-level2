import { z } from "zod";

// validate full name
const FullNameValidationSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
});

// validate user address
const AddressValidationSchema = z.object({
  street: z.string().nonempty(),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
});

// validate user order
const OrdersValidationSchema = z.object({
  productName: z.string().nonempty(),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

// validate user
const UserValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  fullName: FullNameValidationSchema,
  age: z.number().positive(),
  email: z.string().email().nonempty(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string().nonempty()),
  address: AddressValidationSchema,
  orders: z.array(OrdersValidationSchema).optional(),
});

export default UserValidationSchema;
