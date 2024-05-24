import {
  Product,
  ProductRequest,
  ProductWishList,
  FeedBack,
} from '../product/product.interface';
export interface UserData {
  id: number;
  email?: string;
  image?: string;
  mobile: string;
  password?: string;
  firstName: string;
  lastName: string;
  userLocation?: string;
  status: UserStates;
  isDeleted: boolean;
  isDeactivated: boolean;
  signupStatus: RegisterStates;
  userPoint?: number;
  hostedProducts: Product[];
  consumeProducts: Product[];
  productRequest: ProductRequest[];
  givenFeedBack: FeedBack[];
  reciveFeedBack: FeedBack[];
  productWishList: ProductWishList[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
  userData: UserData | any;
}

enum UserStates {
  pending,
  approved,
  reject,
  block,
}

enum RegisterStates {
  pending,
  two_factor_verify,
  compleated,
}
