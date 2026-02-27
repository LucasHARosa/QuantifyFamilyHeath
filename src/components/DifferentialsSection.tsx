import { motion } from 'framer-motion';
import { ClipboardCheck, ChartBar, Heart } from 'lucide-react';

export const DifferentialsSection = () => {
  const items = [
    {
      icon: ClipboardCheck,
      title: 'Avaliação Completa das Operadoras',
      description: 'Analisamos o desempenho real de cada operadora na ANS, volume de reclamações e indicadores de satisfação. Você escolhe com total transparência.',
    },
    {
      icon: ChartBar,
      title: 'Rede Credenciada Verificada',
      description: 'Avaliamos a rede de atendimento através da plataforma Reclame Aqui para garantir que você terá acesso rápido e de qualidade aos melhores hospitais e clínicas.',
    },
    {
      icon: Heart,
      title: 'Melhor Custo-Benefício para Você',
      description: 'Buscamos os planos com as melhores cotações do mercado, sem abrir mão da qualidade. Seu bem-estar com o melhor preço é nossa missão.',
    },
  ];

  return (
    <section className="py-12 px-4 bg-background">
      <div className="container max-w-3xl mx-auto text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold"
        >
          Por que escolher a Quantify?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground max-w-xl mx-auto"
        >
          Somos uma empresa especializada em analisar cada detalhe dos planos de saúde 
          para você encontrar a opção ideal. Avaliamos investimentos, reputação das operadoras 
          e qualidade da rede para apresentar apenas o melhor.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="p-6 border border-border rounded-lg text-left"
            >
              <item.icon className="w-6 h-6 text-accent mb-3" />
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};