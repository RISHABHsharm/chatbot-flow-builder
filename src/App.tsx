import { useRef, useState } from "react";
import styles from "./App.module.css";
import SettingPanel from "./components/setting-panel/setting-panel.component";
import NodePanel from "./components/node-panel/node-panel.component";
import BuilderArea from "./components/builder-area/builder-area.component";
import Snackbar from "./components/snackbar/snackbar.component";
import { INodeData, INodeposition } from "./types/node";
import { Edge, Node } from "reactflow";

const App = () => {
  const initialSavingState = { error: false, success: false, message: "" };
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [savingDataStatus, setSavingDataStatus] = useState(initialSavingState);
  const buildAreaRef = useRef<HTMLDivElement>(null);

  const saveData = () => {
    let hasError = nodes.length < 1;
    const targetEdgesIds = new Set(edges.map((eds) => eds.target));
    if (targetEdgesIds.size < nodes.length - 1) {
      hasError = true;
    }
    setSavingDataStatus({
      success: !hasError,
      error: hasError,
      message: hasError ? "Cannot Save Flow." : "Flow Saved Successfully.",
    });
  };

  const onNodeDrop = (nodePosition: INodeposition) => {
    const position = {
      x:
        nodePosition.x - (buildAreaRef.current?.getBoundingClientRect().x ?? 0),
      y:
        nodePosition.y - (buildAreaRef.current?.getBoundingClientRect().y ?? 0),
    };
    const newNode: Node<INodeData> = {
      id: `${new Date().getTime()}`,
      type: "TextNode", // Replace with the appropriate type based on nodeType
      data: {
        header: "Send Message",
        details: `Text Message ${nodes.length + 1}`,
      }, // Add other data properties based on nodeType
      position,
    };
    setNodes((els) => els.concat(newNode));
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <button className={styles.button} onClick={saveData}>
          Save Changes
        </button>
      </div>
      <div className={styles.main} ref={buildAreaRef}>
        <BuilderArea
          nodes={nodes}
          edges={edges}
          onEdgesChange={(updateEdges) => setEdges(updateEdges)}
          onNodesChange={(updateNodes) => setNodes(updateNodes)}
          handleNodeClick={(nodeId) => setSelectedNodeId(nodeId)}
        />
        {selectedNodeId ? (
          <SettingPanel
            nodes={nodes}
            selectedNodeId={selectedNodeId}
            onNodeChange={(updatedNodes) => setNodes(updatedNodes)}
            handleClose={() => setSelectedNodeId(null)}
          />
        ) : (
          <NodePanel onNodeDrop={onNodeDrop} />
        )}
      </div>
      <Snackbar
        status={savingDataStatus.success ? "success" : "error"}
        open={savingDataStatus.error || savingDataStatus.success}
        onClose={() => setSavingDataStatus(initialSavingState)}
      >
        {savingDataStatus.message}
      </Snackbar>
    </div>
  );
};

export default App;
