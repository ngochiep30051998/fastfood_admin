export interface IImport {
    Id: number;
    Ma: string;
    NgayNhap: string;
    TongTien: number;
    GhiChu: string;
    IdNhanVien: number;
    TenNhanVien: string;
    IdNhaCungCap: number;
    TenNhaCungCap: string;
    IdKho: number;
    TenKho: string;
}

export interface IExport {
    Id: number;
    Ma: string;
    NgayXuat: string;
    DiaChi: string;
    TongTien: number;
    GhiChu: string;
    IdNhanVien: number;
    TenNhanVien: string;
    IdKho: number;
    TenKho: string;
}

export interface IProductDetail {
    IdVatTu: number;
    TenVatTu: string;
    DonGia: number;
    SoLuong: number;
    ThanhTien: number;
    GhiChu: string;
}

export interface IImportDetail extends IImport {
    DanhSachVatTu: IProductDetail[];
}

export interface IExportDetail extends IExport {
    DanhSachVatTu: IProductDetail[];
}
