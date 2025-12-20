import { get } from "http"
import { connect } from "http2"

interface GraphNode {
    name: string
    connectedTo: GraphNode[]
}

interface InputNode {
    name: string
    connections: string[]
}

function parseInputLine(line: string): InputNode {
    const [name, connections] = line.split(": ")

    return {
        name,
        connections: connections.split(" ")
    }
}

function getOrCreateNode(name: string, graphNodes: GraphNode[]): GraphNode {
    let node = graphNodes.find(graphNode => graphNode.name === name)

    // Node exists, return it
    if (node) return node

    // Node does not exist, create it
    node = { name, connectedTo: [] }
    graphNodes.push(node)
    return node
}

function getConnectionsToOut(node: GraphNode, memo: Map<GraphNode, number>): number {
    const connectionMemo = memo.get(node)
    if (connectionMemo) return connectionMemo

    if (node.connectedTo.some(conn => conn.name === "out")) {
        memo.set(node, 1)
        return 1
    }

    return node.connectedTo.reduce((sum, conn) => sum + getConnectionsToOut(conn, memo), 0)
}

export function solvePart1(input: string[]): number {
    const inputNodes = input.map(parseInputLine)

    const graphNodes: GraphNode[] = []

    const graphStart: GraphNode = { name: "you", connectedTo: [] }
    const graphEnd: GraphNode = { name: "out", connectedTo: [] }

    graphNodes.push(graphStart)
    graphNodes.push(graphEnd)

    for (const inputNode of inputNodes) {
        const graphNode = getOrCreateNode(inputNode.name, graphNodes)
        const connectedNodes = inputNode.connections.map(connectionName => getOrCreateNode(connectionName, graphNodes))
        graphNode.connectedTo.push(...connectedNodes)
    }

    return getConnectionsToOut(graphStart, new Map())
}

export function solvePart2(input: string[]): number {
    return 0
}