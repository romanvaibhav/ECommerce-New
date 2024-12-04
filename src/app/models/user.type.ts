export type Suser = {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
};

export type UserList = {
  name: string;
  role: string;
  sortBy: string;
  limit: number;
  page: number;
}

export type CreateUser = {
  name: string;
  email: string;
  password: String;
  role: string;
}

export type Tuser = {
  _id: string,
  name: string,
  _org: {
    _id: string,
    name: string,
    email: string
  },
  email: string,
  role: string,
  isEmailVerified: boolean,
  deleted: boolean,
  createdAt: string,
  updatedAt: string
}

export type ProdImg = {
  public_id: string
  url: string
}

export type ProdList = {
  createdAt: string,
  deleted: boolean,
  description: string,
  images: ProdImg[],
  name: string,
  price: number
  updatedAt: string
  _id: string
  _org: string
}




interface BaseProductImage {
  url: string; // Required property
}

// Define an interface for product images with an optional public_id
interface ProductImageWithId extends BaseProductImage {
  public_id: string; // Required property if present
}

// Create a union type that includes both possibilities
export type ProductImage = BaseProductImage | ProductImageWithId;




//Customer Side
export type customerProductList = {
  createdAt: string,
  description: string,
  images: ProdImg[],
  name: string,
  price: number,
  _id: string,
  _org: {
    email: string,
    name: string,
    _id: string
  }
}

export type custAdd = {
  street: string,
  addressLine2: string,
  city: string,
  state: string,
  pin: string,
  _id: string
}


//cart
export type cartImg = {
  public_id: string
  url: string
}

export type cartorg = {
  email: string
  name: string,
  _id: string
}


export type cartData = {
  createdAt: string,
  description: string,
  images: cartImg[],
  name: string,
  price: number,
  _id: string,
  _org: cartorg[]
}