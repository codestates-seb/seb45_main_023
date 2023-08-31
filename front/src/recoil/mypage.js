import { atom } from 'recoil';

export const Edit = atom({
  key: 'editor',
  default: false,
});

export const Blogs = atom({
  key: 'blog',
  default: [],
});

export const Coments = atom({
  key: 'coment',
  default: [],
});

export const Routes = atom({
  key: 'routes',
  default: '/mypage',
});
