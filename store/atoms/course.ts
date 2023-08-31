import {atom} from "recoil";
interface Course {
  title:string;
  description:string;
  _id:string;
  price:string;
  imageLink:string;
  published?:boolean;
}
export interface CourseProps {
  course: Course | null;
  isLoading: boolean;
}
export const courseState = atom<CourseProps>({
  key: 'courseState',
  default: {
    isLoading: true,
    course: null
  },
});