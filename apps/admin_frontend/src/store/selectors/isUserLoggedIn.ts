import { userState } from "../atoms/user";
import { selector } from "recoil";

export const userLoggedInState = selector({
  key: "userLoggedInState",
  get: ({ get }) => {
    const state = get(userState);

    return Boolean(state.user);
  },
});
