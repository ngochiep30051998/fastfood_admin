export interface IStaff {
    Id: number;
    Ma: string;
    Ten: string;
    GioiTinh: boolean;
    NgaySinh: string;
    DiaChi: string;
    CMND: string;
    SDT: string;
    Email: string;
    NgayVaoLam: string;
    CreatedAt?: string;
    UpdatedAt?: string;
    UserId?: number;
}

export interface IEmployee {
    UserId: number;
    Username: string;
    NhanVienId: number;
    MaNhanVien: string;
    TenNhanVien: string;
    GioiTinh: boolean;
    NgaySinh: string;
    DiaChi: string;
    SDT: string;
    CMND: string;
    Email: string;
    NgayVaoLam: string;
    RoleName: string;
}
