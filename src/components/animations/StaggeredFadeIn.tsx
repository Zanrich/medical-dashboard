import React from 'react';
import { motion } from 'framer-motion';

interface StaggeredFadeInProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export const StaggeredFadeIn: React.FC<StaggeredFadeInProps> = ({ 
  children, 
  staggerDelay = 0.1,
  initialDelay = 0,
  direction,
  distance = 20
}) => {
  // Get the directional properties based on the direction prop
  const getDirectionalProps = () => {
    if (!direction) return {};
    
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return {};
    }
  };

  // Create variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      ...getDirectionalProps()
    },
    show: { 
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  };

  // Clone the children and wrap each child in a motion.div
  const staggeredChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    
    return (
      <motion.div variants={itemVariants}>
        {child}
      </motion.div>
    );
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {staggeredChildren}
    </motion.div>
  );
};