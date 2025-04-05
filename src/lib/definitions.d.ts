import { Blob } from "buffer";
import { ObjectId } from "mongodb";

type User = {
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
};

type Subject = {
  name: Tracing;
  teacher: {
    name: string;
    concepts: Concept[];
  };
};

type Concept = {
  name: string;
  images: ObjectId[];
};

type Image = {
  _id: ObjectId[];
  imageData: Blob;
};

