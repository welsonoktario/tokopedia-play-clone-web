import { motion } from 'framer-motion'
import { ComponentType } from 'react'

export const withTransition =
  <T,>(Component: ComponentType<T>) =>
  (props: T & {}) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        exit={{ opacity: 0, y: 20, transition: { duration: 1 } }}
      >
        <Component {...props} />
      </motion.div>
    )
  }
