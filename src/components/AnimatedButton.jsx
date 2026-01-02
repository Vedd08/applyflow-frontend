import { motion } from 'framer-motion';

const AnimatedButton = ({ children, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
