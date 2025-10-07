'use client'

import { useAuth } from '@/contexts/AuthContext'
import AboutUs from "@/components/AboutUs"
import Hero from "@/components/Hero"
import ServiceList from "@/components/ServiceList"

export default function Home() {
  const { user } = useAuth()

  return (
    <section className="pb-3">
      <Hero />
      <AboutUs />
      <ServiceList />
    </section>
  );
}
