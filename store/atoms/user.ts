import {atom} from "recoil";

export interface User {
  userEmail: string | null;
  isLoading: boolean;
}
export const userState = atom<User>({
  key: 'userState',
  default: {
    isLoading: true,
    userEmail: null 
  },
});
