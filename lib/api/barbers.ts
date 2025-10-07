import { Barber, BarberWithServices } from '@/types'
import { barbersData } from '@/data/barbers'
import { barberServicesData } from '@/data/barberServices'
import { servicesData } from '@/data/services'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const calculateAge = (birthDate: Date): number => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
    }
    
    return age
}

export const barbersApi = {
    getAll: async (): Promise<Barber[]> => {
        await delay(500)
        return barbersData
    },

    getActive: async (): Promise<Barber[]> => {
        await delay(400)
        return barbersData.filter(b => b.active)
    },

    getById: async (id: number): Promise<Barber | null> => {
        await delay(300)
        return barbersData.find(b => b.id === id) || null
    },

    getByEmail: async (email: string): Promise<Barber | null> => {
        await delay(300)
        return barbersData.find(b => b.email === email) || null
    },

    getWithServices: async (): Promise<BarberWithServices[]> => {
        await delay(600)
        return barbersData.map(barber => {
            const barberServiceIds = barberServicesData
                .filter(bs => bs.barberId === barber.id)
                .map(bs => bs.serviceId)
            
            const services = servicesData.filter(s => barberServiceIds.includes(s.id))
            
            return { ...barber, services }
        })
    },

    getByServiceId: async (serviceId: number): Promise<Barber[]> => {
        await delay(400)
        const barberIds = barberServicesData
            .filter(bs => bs.serviceId === serviceId)
            .map(bs => bs.barberId)
        
        return barbersData.filter(b => barberIds.includes(b.id) && b.active)
    },

    create: async (barberData: Omit<Barber, 'id' | 'age'>): Promise<Barber> => {
        await delay(600)
        const newBarber = {
            ...barberData,
            id: Math.max(...barbersData.map(b => b.id)) + 1,
            age: calculateAge(barberData.birthDate)
        }
        barbersData.push(newBarber)
        return newBarber
    },

    update: async (id: number, updateData: Partial<Barber>): Promise<Barber | null> => {
        await delay(500)
        const index = barbersData.findIndex(b => b.id === id)
        if (index === -1) return null
        
        barbersData[index] = { ...barbersData[index], ...updateData }
        
        // Recalcular idade se birthDate foi alterado
        if (updateData.birthDate) {
            barbersData[index].age = calculateAge(updateData.birthDate)
        }
        
        return barbersData[index]
    },

    toggleStatus: async (id: number): Promise<Barber | null> => {
        await delay(400)
        const index = barbersData.findIndex(b => b.id === id)
        if (index === -1) return null
        
        barbersData[index].active = !barbersData[index].active
        return barbersData[index]
    }
}
