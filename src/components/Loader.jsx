import { motion } from 'framer-motion'

export default function Loader() {
    return (
        <div className="flex items-center justify-center min-h-[300px] w-full">
            <motion.div
                className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    )
}
