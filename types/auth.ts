export type AuthUser = {
    id: number
    name: string
    email: string
    role: 'CLIENT' | 'ADMIN' | 'BARBER'
    type: 'client' | 'barber'
}

export type LoginCredentials = {
    email: string
    password: string
    userType: 'client' | 'barber'
}

export type RegisterData = {
    name: string
    email: string
    password: string
    role?: 'CLIENT' | 'ADMIN'
}
