'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useServices } from '@/hooks/useServices'
import { Service } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

const ServiceCard = ({ service }: { service: Service }) => {
    const router = useRouter()
    const { user } = useAuth()

    const isClient = user?.type === 'client' && user?.role === 'CLIENT';

    const handleClick = () => {
        router.push(`/schedules/${service.id}`)
    }

    return (
        <Card className="w-full h-full border border-neutral-800 shadow-sm bg-neutral-800 text-white flex flex-col justify-between">
            <CardHeader className="text-center">
                <CardTitle className="text-lg">{service.name}</CardTitle>
            </CardHeader>

            {service.description && (
                <CardContent className="text-center text-sm text-neutral-300 mb-4">
                    <CardDescription>{service.description}</CardDescription>
                </CardContent>
            )}

            <CardContent className="mt-auto pt-2 flex justify-between items-center text-sm text-neutral-100 border-t border-neutral-700">
                <div className="flex flex-col gap-1">
                    <span className="font-medium">R$ {service.price.toFixed(2)}</span>
                    {service.duration && (
                        <span className="text-xs text-neutral-400">{service.duration} min</span>
                    )}
                </div>
                <Button
                    className={`mt-4 ${isClient ? 'cursor-pointer' : 'cursor-default opacity-50'}`}
                    onClick={() => {
                        if (!isClient) return;
                        handleClick();
                    }}
                    disabled={!isClient}
                >
                    Reservar
                </Button>



            </CardContent>
        </Card>
    )
}

const ServiceList = () => {
    const { services, loading, error } = useServices()

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-white mb-6">Nossos Serviços</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-48 bg-neutral-800 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center text-red-400">
                    <p>{error}</p>
                    <Button className="mt-4" onClick={() => window.location.reload()}>
                        Tentar novamente
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-white mb-6">Nossos Serviços</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    )
}

export default ServiceList