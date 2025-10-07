import React from 'react'
import { MapPin, Phone, CheckCircle, Clock } from 'lucide-react'

const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 gap-6 text-white bg-neutral-900">

      <div className="flex-1 max-w-sm">
        <img
          src="barberShop.jpg"
          alt="Foto da barbearia"
          className="w-full h-full object-cover rounded-lg aspect-square"
        />
      </div>

      <div className="flex flex-col gap-6 flex-1">

        <h2 className="text-2xl font-bold text-neutral-100">
          Transforme seu visual
        </h2>

        <div className="flex flex-col gap-2 text-sm text-neutral-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-neutral-400" />
            <span>Rua dos Barbeiros, 123 - Centro, Cidade/UF</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-neutral-400" />
            <span>(11) 99999-9999</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-neutral-400" />
            <span>Todos os dias: 8h às 18h</span>
          </div>
        </div>

        <div className="border border-neutral-700 rounded-lg p-4 space-y-4 bg-neutral-800 text-sm">
          <h3 className="text-lg font-semibold text-white">Sobre nós</h3>
          <p className="text-neutral-300">
            Somos apaixonados por realçar a beleza e o estilo de nossos clientes. Nossa barbearia nasceu com o propósito de oferecer um atendimento de qualidade, com ambiente confortável e profissionais experientes. Cada detalhe foi pensado para tornar sua experiência única.
          </p>

          <div className="bg-neutral-700 p-3 rounded-lg">
            <p className="font-semibold mb-2 text-blue-400">Horário de funcionamento:</p>
            <p className="text-neutral-300">
              <strong>Todos os dias:</strong> 8:00 às 18:00
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              * Cada atendimento tem duração de 30 minutos
            </p>
          </div>

          <div>
            <p className="font-semibold mb-2">Para melhor atendê-los, também proporcionamos:</p>
            <ul className="space-y-1">
              {["Estacionamento", "TV-Smart", "Ar-condicionado", "Wifi"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
