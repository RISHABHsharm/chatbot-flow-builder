import { Handle, Position } from "reactflow";
import styles from "./text-node.component.module.css";
import { UilWhatsapp, UilCommentLines } from "@iconscout/react-unicons";
import { INodeData } from "../../types/node";

type TextNodeProps = {
  data: INodeData;
};

const TextNode = ({ data }: TextNodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className={styles.node}>
        <div className={styles.nodeHeader}>
          <UilCommentLines className={styles.icon} />
          <span className={styles.header}>{data.header}</span>
          <UilWhatsapp className={styles.whatsapp} />
        </div>
        <div className={styles.nodeDetails}>{data.details}</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default TextNode;
