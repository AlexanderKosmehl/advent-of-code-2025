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

    const totalConnections = node.connectedTo.reduce((sum, conn) => sum + getConnectionsToOut(conn, memo), 0)
    memo.set(node, totalConnections)

    return totalConnections
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

interface BacktrackInformation {
    numberOfPathsToOut: number
    pathContainsFFT: boolean
    pathContainsDAC: boolean
}

function getNodeScore(backtrackInformation: BacktrackInformation): number {
    let score = 0
    if (backtrackInformation.pathContainsFFT) score += 1
    if (backtrackInformation.pathContainsDAC) score += 1
    return score
}

function getConnectionsToOut2(node: GraphNode, memo: Map<GraphNode, BacktrackInformation>): BacktrackInformation {
    const connectionMemo = memo.get(node)
    if (connectionMemo) return connectionMemo

    // Directly connected to out
    if (node.connectedTo.some(conn => conn.name === "out")) {
        const backtrackInformation = {
            numberOfPathsToOut: 1,
            // in case of direct connections
            pathContainsFFT: node.name === "fft",
            pathContainsDAC: node.name === "dac"
        }
        memo.set(node, backtrackInformation)
        return backtrackInformation
    }

    const possibleConnections = node.connectedTo.map(conn => getConnectionsToOut2(conn, memo)).map(backtrackInfo => ({ backtrackInfo, score: getNodeScore(backtrackInfo) }))
    const bestScore = Math.max(...possibleConnections.map(possibleConnection => possibleConnection.score))
    const bestConnections = possibleConnections.filter(possibleConnection => possibleConnection.score === bestScore)

    const backtrackInformation = {
        numberOfPathsToOut: bestConnections.reduce((sum, connection) => sum + connection.backtrackInfo.numberOfPathsToOut, 0),
        pathContainsFFT: bestConnections.some(conn => conn.backtrackInfo.pathContainsFFT) || node.name === "fft",
        pathContainsDAC: bestConnections.some(conn => conn.backtrackInfo.pathContainsDAC) || node.name === "dac"
    }

    memo.set(node, backtrackInformation)
    return backtrackInformation
}

export function solvePart2(input: string[]): number {
    const inputNodes = input.map(parseInputLine)

    const graphNodes: GraphNode[] = []

    const graphStart: GraphNode = { name: "svr", connectedTo: [] }
    const graphEnd: GraphNode = { name: "out", connectedTo: [] }

    graphNodes.push(graphStart)
    graphNodes.push(graphEnd)

    for (const inputNode of inputNodes) {
        const graphNode = getOrCreateNode(inputNode.name, graphNodes)
        const connectedNodes = inputNode.connections.map(connectionName => getOrCreateNode(connectionName, graphNodes))
        graphNode.connectedTo.push(...connectedNodes)
    }

    return getConnectionsToOut2(graphStart, new Map()).numberOfPathsToOut
}