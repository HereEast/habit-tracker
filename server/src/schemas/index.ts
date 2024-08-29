import { z } from "zod";
// import { ObjectId } from "mongodb";

export const taskSchema = z.object({
  // _id: z.instanceof(ObjectId),
  username: z.string(),
  title: z.string().email(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
});

export type TaskType = z.infer<typeof taskSchema>;

export const userSchema = z.object({
  // _id: z.instanceof(ObjectId),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  tasks: z.array(taskSchema),
});

export type UserType = z.infer<typeof userSchema>;
