import ReactFlow, {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodeTypes,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import TextNode from "../text-node/text-node.component";
import { MouseEvent } from "react";

export const nodeTypes: NodeTypes = { TextNode: TextNode };
type BuilderAreaProps = {
  nodes: Node[];
  edges: Edge[];
  onEdgesChange: (edges: Edge[]) => void;
  onNodesChange: (nodes: Node[]) => void;
  handleNodeClick: (nodeId: string | null) => void;
};

const BuilderArea = ({
  nodes,
  edges,
  onEdgesChange,
  onNodesChange,
  handleNodeClick,
}: BuilderAreaProps) => {
  const onNodeClick = (e: MouseEvent, node: Node) => {
    e.stopPropagation();
    handleNodeClick(node.id);
  };

  ///update the edge list on connecting nodes in builder area while checking if the source is connected only onces
  const handleNodesConnect = (connection: Edge | Connection) => {
    const isNodeSourceConnected =
      edges.filter((eds) => eds.source === connection.source).length > 0;
    if (isNodeSourceConnected) {
      return;
    }
    const updateEdges = addEdge(connection, edges);
    onEdgesChange(updateEdges);
  };

  //update the edge list on edges modification in builder area
  const handleEdgesChange = (changes: EdgeChange[]) => {
    const updateEdges = applyEdgeChanges(changes, edges);
    onEdgesChange(updateEdges);
  };

  //update the node list on nodes modification in builder area
  const handleNodesChange = (changes: NodeChange[]) => {
    const updateNodes = applyNodeChanges(changes, nodes);
    onNodesChange(updateNodes);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={handleNodesChange}
      onConnect={handleNodesConnect}
      onEdgesChange={handleEdgesChange}
      onNodeClick={onNodeClick}
      onNodesDelete={() => handleNodeClick(null)}
    />
  );
};

export default BuilderArea;
