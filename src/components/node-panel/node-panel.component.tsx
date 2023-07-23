import { INodeposition } from "../../types/node";
import Draggable from "../draggable/draggable.component";
import styles from "./node-panel.component.module.css";
import { UilCommentLines } from "@iconscout/react-unicons";

type NodePanelProps = {
  onNodeDrop: (position: INodeposition) => void;
};

type nodeType = {
  id: number;
  name: string;
  type: "Text";
};

const NodePanel = ({ onNodeDrop }: NodePanelProps) => {
  //list of different type of nodes that can we generate in builder area
  const nodesList: nodeType[] = [{ id: 0, name: "Message", type: "Text" }];

  //get different node based on its node type
  const getNode = (node: nodeType) => {
    switch (node.type) {
      case "Text":
        return (
          <div className={styles.nodeContainer}>
            <UilCommentLines className={styles.icon} />
            <div className={styles.name}>{node.name}</div>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.root}>
      {nodesList.map((node) => (
        <Draggable key={node.id} onDragStop={onNodeDrop}>
          {getNode(node)}
        </Draggable>
      ))}
    </div>
  );
};

export default NodePanel;
