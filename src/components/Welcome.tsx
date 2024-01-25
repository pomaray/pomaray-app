import { motion } from 'framer-motion';

interface WelcomeSectionProps {
  title: string;
  subtitle: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ title, subtitle }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
      className="h-screen relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("https://media.glassdoor.com/l/98/e2/7b/5b/mathco-offsite.jpg")' }}
    >
      <div className="h-full w-full bg-green-100 bg-opacity-80 absolute top-0 left-0"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-green-800">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{subtitle}</p>
        <div className="mt-8 flex justify-center space-x-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-white p-6    shadow-lg w-40 h-40"
          >
            <div className="text-5xl text-black mb-2">👩‍🏫</div>
            <p className="mt-2 text-lg">Liderazgo en clase</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="bg-white p-6  shadow-lg w-40 h-40"
          >
            <div className="text-5xl text-primarymb-2">💻</div>
            <p className="mt-2 text-lg">Tecnología en Aulas</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="bg-white p-6  shadow-lg w-40 h-40"
          >
            <div className="text-5xl text-primarymb-2">❓</div>
            <p className="mt-2 text-lg">los mejores en educación</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WelcomeSection;
