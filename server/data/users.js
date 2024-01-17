import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'rajib',
    email: 'rajib@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'sajib',
    email: 'sajib@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];
export default users;
