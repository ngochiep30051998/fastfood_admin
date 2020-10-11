
export interface IUser {
    Id: number;
    Username: string;
    CreatedAt?: string;
    UpdatedAt?: string;
    IdRole: number;
    RoleName: string;
}


export interface IRole {
    Id: number;
    Name: string;
}
