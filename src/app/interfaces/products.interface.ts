import { IBill } from './bill.interface';
import { IPhoto } from './common.interface';

export interface IProduct {
    catId?: string;
    catName?: string;
    displayImage?: string;
    id?: string;
    key?: string;
    name?: string;
    photos?: IPhoto[];
    price?: number;
    promotionPrice?: number;
    detail?: string;
    amount?: number;
    unit?: string;
    meal?: string;
    totalPrice?: number;
}

export interface ICategories {
    key?: string;
    categoryName?: string;
    product?: IProduct[];
}

export interface IPopupData {
    tab?: string;
    menuId?: string;
    product?: IProduct;
    bill?: IBill;
    type?: string;
}
