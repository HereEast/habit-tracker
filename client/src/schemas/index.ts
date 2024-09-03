import { z } from "zod";
import { ObjectId } from "mongodb";

export const statusSchema = z.enum(["0", "1", "2", "3", "4", "5"]);

export type StatusType = z.infer<typeof statusSchema>;

export const schemaStatusData = z.object({
  status: statusSchema,
  day: z.number(),
  month: z.string(),
  year: z.number(),
  invalid: z.boolean(),
  disabled: z.boolean(),
});

export const taskSchema = z.object({
  _id: z.instanceof(ObjectId),
  userId: z.instanceof(ObjectId),
  title: z.string().email(),
  data: z.array(schemaStatusData),
  // createdAt: z.date(),
  // updatedAt: z.date().nullable(),
});

export type TaskType = z.infer<typeof taskSchema>;

export const userSchema = z.object({
  // _id: z.instanceof(ObjectId),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  tasks: z.array(taskSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type UserType = z.infer<typeof userSchema>;
