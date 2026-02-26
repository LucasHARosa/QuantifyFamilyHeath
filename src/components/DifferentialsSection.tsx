import { motion } from 'framer-motion';
import { ClipboardCheck, ChartBar, Heart } from 'lucide-react';

export const DifferentialsSection = () => {
  const items = [
    {
      icon: ClipboardCheck,
      title: 'Curadoria Independente',
      description: 'Não somos vinculados a uma única operadora. Comparamos o mercado para você.',
    },
    {
      icon: ChartBar,
      title: 'Análise Atuarial',
      description: 'Avaliamos risco e sustentabilidade para garantir planos sólidos e duradouros.',
    },
    {
      icon: Heart,
      title: 'Foco no Beneficiário',
      description: 'Buscamos equilíbrio entre rede credenciada e orçamento, com você em primeiro lugar.',
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
          Somos uma consultoria técnica que une dados, mercado e experiência para
          entregar a melhor solução em saúde para cada perfil.
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