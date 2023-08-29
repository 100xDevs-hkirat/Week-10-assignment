import {atom} from "recoil";

export interface CourseInterface {
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface CourseState {
  isLoading: boolean;
  course: CourseInterface | null;
}


export const courseState = atom<CourseState>({
  key: 'courseState',
  default: {
    isLoading: true,
    course: null
  },
});
