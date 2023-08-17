import { CourseType } from "@/lib/db";
import { atom } from "recoil";

const cou: CourseType = {
  title: "",
  description: "",
  price: 0,
  imageLink: '',
  published: false,
  _id: ''
}

export const courseState = atom({
  key: 'courseState',
  default: {
    isLoading: true,
    course: cou
  },
});
