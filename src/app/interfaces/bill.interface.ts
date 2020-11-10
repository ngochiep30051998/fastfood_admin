import { IProduct } from './products.interface';
import { IUser } from './user.interface';

export interface IBill {
    products?: IProduct[];
    promotionCode?: string;
    notes?: string;
    address?: string;
    payment?: string;
    totalItem?: number;
    totalPrice?: number;
    user?: IUser;
    date?: any;
    status?: string;
    paymentStatus?: string;
    id?: string;
    vnpayTransId?: string;
}
