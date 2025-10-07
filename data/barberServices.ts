import { BarberService } from '@/types'

export const barberServicesData: BarberService[] = [
    // João Silva - Especialista em cortes e barba
    { barberId: 1, serviceId: 1 }, // Corte Masculino
    { barberId: 1, serviceId: 2 }, // Barba
    { barberId: 1, serviceId: 3 }, // Corte + Barba
    { barberId: 1, serviceId: 7 }, // Design de Corte
    
    // Carlos Mendes - Especialista em tratamentos
    { barberId: 2, serviceId: 1 }, // Corte Masculino
    { barberId: 2, serviceId: 5 }, // Pigmentação
    { barberId: 2, serviceId: 6 }, // Hidratação Capilar
    { barberId: 2, serviceId: 8 }, // Platinado
    { barberId: 2, serviceId: 10 }, // Relaxamento
    { barberId: 2, serviceId: 11 }, // Alisamento
    
    // Rafael Santos - Inativo mas mantém especialidades
    { barberId: 3, serviceId: 1 }, // Corte Masculino
    { barberId: 3, serviceId: 9 }, // Corte Infantil
    
    // Pedro Costa - Serviços básicos e cuidados
    { barberId: 4, serviceId: 1 }, // Corte Masculino
    { barberId: 4, serviceId: 2 }, // Barba
    { barberId: 4, serviceId: 4 }, // Sobrancelha
    { barberId: 4, serviceId: 9 }, // Corte Infantil
    { barberId: 4, serviceId: 12 }, // Massagem Facial
]
