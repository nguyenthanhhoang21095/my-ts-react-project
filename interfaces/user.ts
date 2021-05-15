interface IUser {
    id: number;
    account: string,
    password: string,
    fullName: string,
    phone: string,
    address?: string,
    isActive: boolean
}

export default IUser;