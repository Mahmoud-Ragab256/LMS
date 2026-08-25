import type { IRegisterInput } from "../interfaces";


export const teacherRegisterForm: IRegisterInput[] = [
  {
    name: 'username',
    id: 'username',
    placeholder: 'username',
    type: 'text'
  },
  {
    name: 'email',
    id: 'email',
    placeholder: 'example@email.com',
    type: 'text'
  },
  {
    name: 'password',
    id: 'password',
    placeholder: 'Password',
    type: 'password'
  },
  {
    name: 'phone',
    id: 'phone',
    placeholder: '+201234567890',
    type: 'text'
  },
]

export const studentRegisterForm: IRegisterInput[] = [
  {
    name: 'username',
    id: 'username',
    placeholder: 'username',
    type: 'text'
  },
  {
    name: 'email',
    id: 'email',
    placeholder: 'example@email.com',
    type: 'text'
  },
  {
    name: 'password',
    id: 'password',
    placeholder: 'Password',
    type: 'password'
  },
  {
    name: 'phone',
    id: 'phone',
    placeholder: '+201234567890',
    type: 'text'
  },
  {
    label: 'National_id',
    name: 'nid',
    id: 'nid',
    placeholder: 'National_id',
    type: 'text'
  },

]
