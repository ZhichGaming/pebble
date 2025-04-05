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
  teacher: {
    name: string;
    concepts: Concept[];
  };
};

export type Concept = {
  concept: string;
  explanation: string;
  examples: string[];
};

export type Image = {
  _id: ObjectId[];
  imageData: string;
};

