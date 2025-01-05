export const transition = { type: "spring", duration: 0.8 };

export const transitionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
};

export const pageTransition = {
    initial: {
      opacity: 0,         // Starting with page fully transparent
      y: 50               // Starting slightly shifted down
    },
    animate: {
      opacity: 1,         // Fading in to full opacity
      y: 0,               // Moving to the original position
      transition: {
        duration: 0.5,    // Duration of the transition
        ease: 'easeOut'   // Smooth easing
      }
    },
    exit: {
      opacity: 0,         // Fading out
      y: -50,             // Shifting slightly up as it exits
      transition: {
        duration: 0.5,    // Matching transition duration
        ease: 'easeIn'    // Smooth easing
      }
    }
};

export const fadeAnimation = {
  initial: {
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
};

export const headTextAnimation = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 5,
    stiffness: 40,
    restDelta: 0.001,
    duration: 0.3,
  },
};

export const headContentAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 7,
    stiffness: 30,
    restDelta: 0.001,
    duration: 0.6,
    delay: 0.2,
    delayChildren: 0.2,
  },
};

export const headContainerAnimation = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};

export const slideAnimation = (direction) => {
    return {
      initial: {
        x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
        transition: { ...transition, delay: 0.5 },
      },
      animate: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: { ...transition, delay: 0 },
      },
      exit: {
        x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        transition: { ...transition, delay: 0 },
      },
    };
};