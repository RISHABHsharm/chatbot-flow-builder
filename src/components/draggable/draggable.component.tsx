import { DragEvent, PropsWithChildren } from "react";
import styles from "./draggable.component.module.css";
import { INodeposition } from "../../types/node";

type DraggableProps = {
  onDragStop: (position: INodeposition) => void;
};

const Draggable = ({
  children,
  onDragStop,
}: PropsWithChildren<DraggableProps>) => {
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const position = { x: e.clientX, y: e.clientY };
    onDragStop(position);
  };

  return (
    <div className={styles.draggable} draggable onDragEnd={handleDragEnd}>
      {children}
    </div>
  );
};

export default Draggable;
