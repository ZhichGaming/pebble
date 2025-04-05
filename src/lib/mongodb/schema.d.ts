import { ObjectId } from "mongodb";

export type User = {
  _id?: ObjectId;
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
  teacher: Teacher[];
};

export type Teacher = {
  name: string;
  concepts: Concept[];
};

export type Concept = {
  name: string;
  explanation: string;
};

export type Image = {
  _id: ObjectId[];
  imageData: string;
};

