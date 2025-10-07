import { Barber } from '@/types'

export const calculateAge = (birthDate: Date): number => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
    }
    
    return age
}

export const barbersData: Barber[] = [
    {
        id: 1,
        name: "João Silva",
        email: "joao@barbearia.com",
        passwordHash: "barber_hash_joao123", // senha: joao123
        birthDate: new Date('1985-03-15'),
        age: calculateAge(new Date('1985-03-15')),
        hiredAt: new Date('2020-01-15'),
        active: true
    },
    {
        id: 2,
        name: "Carlos Mendes",
        email: "carlos@barbearia.com",
        passwordHash: "barber_hash_carlos123", // senha: carlos123
        birthDate: new Date('1990-07-22'),
        age: calculateAge(new Date('1990-07-22')),
        hiredAt: new Date('2021-06-10'),
        active: true
    },
    {
        id: 3,
        name: "Rafael Santos",
        email: "rafael@barbearia.com",
        passwordHash: "barber_hash_rafael123", // senha: rafael123
        birthDate: new Date('1988-11-08'),
        age: calculateAge(new Date('1988-11-08')),
        hiredAt: new Date('2019-03-20'),
        active: false
    },
    {
        id: 4,
        name: "Pedro Costa",
        email: "pedro@barbearia.com",
        passwordHash: "barber_hash_pedro123", // senha: pedro123
        birthDate: new Date('1992-09-12'),
        age: calculateAge(new Date('1992-09-12')),
        hiredAt: new Date('2022-08-01'),
        active: true
    }
]