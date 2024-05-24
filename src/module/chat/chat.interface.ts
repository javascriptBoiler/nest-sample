import { ProductRequest } from '../product/product.interface';
export interface Chat {
  id: number;
  message: string;
  sender: number;
  receiver: number;
  isRead: boolean;
  productRequest: ProductRequest;
  productRequestID: number;
  createdAt: Date;
  updatedAt: Date;
}
