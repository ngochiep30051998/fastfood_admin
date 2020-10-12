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
    promotionPrice?: string;
}

export interface IDiglogData {
    type: string;
    data: any;
    extendData?: any;
}

export interface ICategories {
    key?: string;
    categoryName?: string;
    product?: IProduct[];
}
