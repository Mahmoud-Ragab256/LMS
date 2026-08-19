import type { IInput } from "../interfaces";


export const teacherRegisterForm: IInput[] = [
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
    type: 'text'
  },
  {
    name: 'phone',
    id: 'phone',
    placeholder: '+201234567890',
    type: 'text'
  },
]

export const studentRegisterForm: IInput[] = [
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
    type: 'text'
  },
  {
    name: 'phone',
    id: 'phone',
    placeholder: '+201234567890',
    type: 'text'
  },
  {
    label: 'national_id',
    name: 'nid',
    id: 'nid',
    placeholder: 'National_id',
    type: 'text'
  },

]
