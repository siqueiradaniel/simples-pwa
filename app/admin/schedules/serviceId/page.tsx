'use client'

import { use } from 'react'
import ScheduleForm from '@/components/ScheduleForm'

type PageProps = {
    params: Promise<{ serviceId: string }>
}

export default function SchedulePage({ params }: PageProps) {
    const { serviceId } = use(params)

    return (
        <div className="min-h-screen bg-neutral-900">
            <ScheduleForm serviceId={Number(serviceId)} />
        </div>
    )
}