import { Service } from '@/types'
import { servicesData } from '@/data/services'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const servicesApi = {
    getAll: async (): Promise<Service[]> => {
        await delay(500)
        return servicesData
    },

    getById: async (id: number): Promise<Service | null> => {
        await delay(300)
        return servicesData.find(s => s.id === id) || null
    },

    getByPriceRange: async (min: number, max: number): Promise<Service[]> => {
        await delay(400)
        return servicesData.filter(s => s.price >= min && s.price <= max)
    },

    getPopular: async (): Promise<Service[]> => {
        await delay(600)
        const popularIds = [1, 2, 3, 9]
        return servicesData.filter(s => popularIds.includes(s.id))
    }
}
