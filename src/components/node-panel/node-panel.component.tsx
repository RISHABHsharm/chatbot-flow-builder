import { INodeposition } from "../../types/node";
import Draggable from "../draggable/draggable.component";
import styles from "./node-panel.component.module.css";
import { UilCommentLines } from "@iconscout/react-unicons";

type NodePanelProps = {
  onNodeDrop: (position: INodeposition) => void;
};

const NodePanel = ({ onNodeDrop }: NodePanelProps) => {
  const nodesList = [{ id: 0, name: "Message", icon: "Message", type: "Text" }];

  return (
    <div className={styles.root}>
      {nodesList.map((node) => (
        <Draggable key={node.id} onDragStop={onNodeDrop}>
          <div className={styles.nodeContainer}>
            <UilCommentLines className={styles.icon} />
            <div className={styles.name}>{node.name}</div>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default NodePanel;
