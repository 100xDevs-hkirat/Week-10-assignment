import { atom } from "recoil";
import { Course } from "./course";
import ObjectID from "bson-objectid";

export interface User {
  name: String;
  email: String;
  password: String;
  isAdmin: Boolean;
  purchasedCourses: Course[]; //| ObjectID[];
}

export const userState = atom<{
  isLoading: boolean;
  user: null | User;
}>({
  key: "userState",
  default: {
    isLoading: false,
    user: null,
  },
});
