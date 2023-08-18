import { atom } from "recoil";

export interface Course {
  _id: string;
  title: string;
  description: string;
  imageLink: string;
  price: string;
}

export const coursesState = atom<{
  isLoading: boolean;
  courses: null | Course[];
}>({
  key: "coursesState",
  default: {
    isLoading: true,
    courses: null,
  },
});
