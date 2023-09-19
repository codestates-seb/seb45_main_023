import { atom } from 'recoil';

export const Edit = atom({
  key: 'editor',
  default: false,
});

export const Blogs = atom({
  key: 'blog',
  default: [],
});

export const Comments = atom({
  key: 'coment',
  default: [],
});

export const Routes = atom({
  key: 'routes',
  default: '/mypage',
});

export const User = atom({
  key: 'user',
  default: {},
});

export const sidebar = atom({
  key: 'sidebar',
  default: 0,
});

export const userInfo = atom({
  key: 'info',
  default: {
    currentLocation: 'BLOCK_0',
    email: '',
    level: 0,
    nickname: '',
    nationality: '',
    password: '',
    birth: '',
    id: 0,
  },
});

export const bookmarkInfo = atom({
  key: 'bookmark',
  default: [
    {
      id: '',
      body: '',
      createdAt: '',
      tags: [],
      images: [],
      modifiedAt: '',
      title: '',
      view: '',
    },
  ],
});

export const validate = atom({
  key: 'validate',
  default: {},
});

export const stamps = atom({
  key: 'stamps',
  default: [],
});

export const PageInfo = atom({
  key: 'pageinfo',
  default: {
    page: 1,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  },
});
export const CommentInfo = atom({
	key: 'commentinfo',
	default: {
	  page: 1,
	  size: 0,
	  totalElements: 0,
	  totalPages: 0,
	},
  });
  