import { ChangeEvent } from "react";
import styles from "./setting-panel.component.module.css";
import { UilArrowLeft } from "@iconscout/react-unicons";
import { Node } from "reactflow";

type SettingPanelProps = {
  nodes: Node[];
  selectedNodeId: string | null;
  onNodeChange: (nodes: Node[]) => void;
  handleClose: () => void;
};

const SettingPanel = ({
  nodes,
  selectedNodeId,
  onNodeChange,
  handleClose,
}: SettingPanelProps) => {
  const selectedNode = nodes.filter((node) => node.id === selectedNodeId)[0];

  // Handle node text change
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNodes = nodes.map((node) =>
      node.id === selectedNodeId
        ? { ...node, data: { ...node.data, details: event.target.value } }
        : node
    );
    onNodeChange(updatedNodes);
  };

  return (
    <div>
      <div className={styles.headerSection}>
        <UilArrowLeft onClick={handleClose} className={styles.back} />
        <div className={styles.header}>Messages</div>
      </div>
      <div className={styles.detailSection}>
        <p>Text</p>
        <textarea
          className={styles.detail}
          value={selectedNode.data.details}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
};

export default SettingPanel;
