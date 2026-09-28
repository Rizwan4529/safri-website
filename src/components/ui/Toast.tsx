import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiOutlineCheckCircle, HiOutlineXMark } from "react-icons/hi2";

type ToastProps = {
  toast: { id: number; message: string } | null;
  onDismiss: () => void;
};

const Toast = ({ toast, onDismiss }: ToastProps) => {
  const prefersReducedMotion = useReducedMotion();
  const duration = prefersReducedMotion ? 0.01 : 0.32;

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          key={toast.id}
          role="status"
          aria-live="polite"
          initial={
            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-5 left-1/2 z-110 w-[min(calc(100%-2rem),26rem)] -translate-x-1/2"
        >
          <div className="flex items-start gap-3 rounded-xl border border-brand/20 bg-surface px-4 py-3.5 shadow-[0_12px_40px_rgba(0,143,124,0.16)]">
            <HiOutlineCheckCircle className="mt-0.5 size-5 shrink-0 text-brand" />
            <p className="flex-1 font-body text-sm leading-relaxed text-text">
              {toast.message}
            </p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={onDismiss}
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-muted hover:text-text"
            >
              <HiOutlineXMark className="size-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Toast;
