import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  email: string;
  password: string;
  salt: string;
  identity: {
    username: string;
    firstname: string;
    lastname: string;
  };
  uploads: ObjectId[];
  createdAt: Date;
};

export type Subject = {
  _id: ObjectId;
  name: string;
  teachers: Teacher[];
};

export type Teacher = {
  name: string;
  concepts: string[];
};

export type Concept = {
  _id: ObjectId;
  name: string;
  explanation: string;
  examples: string[];
};

export type Image = {
  _id: ObjectId;
  imageData: string;
};

export type ClientUser = Omit<
  User,
  "password" | "salt" | "uploads" | "createdAt"
>;

