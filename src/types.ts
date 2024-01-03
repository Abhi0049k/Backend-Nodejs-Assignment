export type LoginCredentialType = {
    email: string,
    password: string
}

export type RegisterCredentialType = {
    name: string,
    password: string,
    email: string
}

export const customer: string = 'customer';
export const staff: string = 'staff';
export const admin: string = 'admin';
export const manager: string = 'manager';

export type RoleType = 'customer' | 'admin' | 'staff' | 'manager';

export type RolesType = RoleType[];