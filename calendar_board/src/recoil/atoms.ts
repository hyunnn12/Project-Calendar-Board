import { atom } from "recoil";

export const projectTitleState = atom<string>({
  key: "projectTitleState",
  default: "", // 🛠 기본값을 빈 문자열로 설정
});
