import { useState, useEffect, PropsWithChildren } from "react";
import styles from "./snackbar.component.module.css";

type SnackbarProps = {
  status: "info" | "success" | "error";
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
};

const Snackbar = ({
  children,
  status = "info",
  open = false,
  autoHideDuration = 3000,
  onClose,
}: PropsWithChildren<SnackbarProps>) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(open);
    // Automatically hide the snackbar after 3 seconds
    if (open) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      {show && (
        <div className={`${styles.snackbar} ${styles[status]}`}>{children}</div>
      )}
    </>
  );
};

export default Snackbar;
