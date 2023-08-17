import { userState } from "../atoms/user";
import {RecoilState, RecoilValueReadOnly, selector} from "recoil";
import { courseState } from "../atoms/course";
import { CourseType } from "@/lib/db";

export const isCourseLoading: RecoilValueReadOnly<boolean> = selector({
  key: 'isCourseLoaingState',
  get: ({get}) => {
    const state = get(courseState);

    return state.isLoading;
  },
});

export const courseDetails: RecoilValueReadOnly<CourseType | null> = selector({
  key: 'courseDetailsState',
  get: ({get}) => {
    const state = get(courseState);

    return state.course;
  },
});

export const courseTitle: RecoilValueReadOnly<string> = selector({
  key: 'courseTitleState',
  get: ({get}) => {
    const state = get(courseState);
    if (state.course != null) {
        return state.course.title;
    }
    return "";
  },
});

export const coursePrice = selector({
  key: 'coursePriceState',
  get: ({get}) => {
    const state = get(courseState);
    if (state.course) {
        return state.course.price;
    }
    return "";
  },
});

export const courseImage = selector({
  key: 'courseImageState',
  get: ({get}) => {
    const state = get(courseState);
    if (state.course) {
        return state.course.imageLink;
    }
    return "";
  },
});

