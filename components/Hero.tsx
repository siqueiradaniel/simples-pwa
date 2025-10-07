import React from 'react'
import CTACard from './hero/CTACard'

const CTA = [
  {
    title: "Agendamento simplificado",
    description: "Aqui você tem acesso a um processo de agendamento simples e eficiente, permitindo que você reserve seu horário com facilidade."
  },
  {
    title: "Sua barbearia de confiança",
    description: "Atendimento profissional e ambiente acolhedor para valorizar o seu estilo com qualidade e atenção aos detalhes."

  },
  {
    title: "Seu estilo, nossa especialidade",
    description: "Na QUICK BARBER, cada cliente encontra um visual que combina com sua personalidade e estilo de vida."
  }
]

const Hero = () => {
  return (
    <section>
      <div>
        <img
          src='bannerHome.png' />
      </div>
      <div className="flex flex-col items-center max-w-5xl w-full px-4 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 py-5">
          <h1 className="text-xl font-bold uppercase md:text-3xl">
            Sua jornada de estilo começa aqui
          </h1>
          <p className="text-xs font-light dark:text-white/70 md:text-sm">
            Descubra a praticidade da QUICK BARBER, uma barbearia com agendamento
            online que simplifica a sua experiência na hora de marcar um horário.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 space-x-4 mx-4 my-4'>
          {CTA.map((card) => (
            <CTACard
              key={card.title}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero