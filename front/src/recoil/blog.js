import { atom } from "recoil";

export const BlogList = atom({
  key: 'bloglist',
  default: [] // 초기값
})

export const bookmarkedPostsState = atom({
  key: 'bookmarkedPostsState',
  default: []
})