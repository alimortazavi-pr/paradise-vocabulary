import { RootState } from "@/lib";

//Interfaces
import { IProfile } from "@/common/interfaces";

export function userSelector(state: RootState): IProfile {
  return state.profile.user;
}
