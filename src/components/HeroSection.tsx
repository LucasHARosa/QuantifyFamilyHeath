import { motion } from 'framer-motion';
import { TrendingUp, Shield, Users } from 'lucide-react';

export const HeroSection = () => {
  const features = [
    { icon: TrendingUp, text: 'Análise personalizada' },
    { icon: Shield, text: 'Dados protegidos' },
    { icon: Users, text: 'Atendimento humanizado' },
  ];

  return (
    <section className="bg-gradient-hero text-primary-foreground py-12 px-4">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Sua saúde merece<br />
            <span className="text-accent">inteligência</span>, não apenas uma corretora
          </h1>
          
          <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A Quantify é uma consultoria especializada em gestão de saúde. 
            Nosso objetivo é encontrar a solução por meio de um plano de saúde mais aderente e econômico para você e sua família.
          </p>

          <div className="bg-accent/20 backdrop-blur-sm rounded-lg px-6 py-3 inline-block">
            <p className="text-sm sm:text-base font-medium">
              💡 Planos para <span className="text-accent font-bold">59 anos ou mais</span> a partir de{' '}
              <span className="text-accent font-bold">R$ 1.012/mês</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <feature.icon className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
