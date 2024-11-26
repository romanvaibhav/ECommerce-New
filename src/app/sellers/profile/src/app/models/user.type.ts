export type Suser = {
    email: string;
    password: string;
    fullName: string;
    companyName: string;
  };

export type UserList={
    name: string;
    role: string;
    sortBy: string;
    limit: number;
    page: number;
}

export type CreateUser={
  name:string;
  email:string;
  password:String;
  role:string;
}

export type Tuser={
  _id: string,
  name:string,
  _org: {
      _id:string,
      name:string,
      email:string
  },
  email:string,
  role:string,
  isEmailVerified: boolean,
  deleted: boolean,
  createdAt:string,
  updatedAt: string
}
// export type profileUser=
//   {
//     "_id": "673b36ba2fcde436eaa4ec71",
//     "name": "Vaibhav Roman",
//     "_org": {
//         "_id": "673b36ba2fcde436eaa4ec6e",
//         "name": "AngularMinds",
//         "email": "vaibhav@angularminds.in"
//     },
//     "email": "vaibhavroman249@gmail.com",
//     "role": "admin",
//     "isEmailVerified": false,
//     "deleted": false,
//     "createdAt": "2024-11-18T12:44:42.947Z",
//     "updatedAt": "2024-11-18T12:44:42.947Z"
// }