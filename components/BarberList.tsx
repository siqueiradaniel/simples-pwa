// components/BarberList.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useBarbersWithServices } from '@/hooks/useBarbers'

const BarberList = () => {
    const { barbers, loading, error } = useBarbersWithServices()

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-white mb-6">Nossos Barbeiros</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-64 bg-neutral-800 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 text-center text-red-400">
                <p>{error}</p>
            </div>
        )
    }

    const activeBarbers = barbers.filter(barber => barber.active)

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-white mb-6">Nossos Barbeiros</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeBarbers.map((barber) => (
                    <Card key={barber.id} className="bg-neutral-800 border-neutral-700 text-white">
                        <CardHeader>
                            <CardTitle className="text-lg">{barber.name}</CardTitle>
                            <p className="text-sm text-neutral-400">
                                {barber.age} anos • Desde {barber.hiredAt.getFullYear()}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Especialidades:</p>
                                <div className="flex flex-wrap gap-1">
                                    {barber.services.map((service) => (
                                        <Badge 
                                            key={service.id} 
                                            variant="secondary" 
                                            className="text-xs bg-neutral-700 text-neutral-200"
                                        >
                                            {service.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default BarberList
