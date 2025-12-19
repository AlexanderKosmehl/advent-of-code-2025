interface JunctionBox {
    x: number,
    y: number,
    z: number
}

function parseLineToJunctionBox(line: string): JunctionBox {
    const positionValues = line.split(',').map(Number)

    return {
        x: positionValues[0],
        y: positionValues[1],
        z: positionValues[2]
    }
}

function calculateDistance(pos1: JunctionBox, pos2: JunctionBox): number {
    return Math.sqrt(
        Math.pow(pos2.x - pos1.x, 2) +
        Math.pow(pos2.y - pos1.y, 2) +
        Math.pow(pos2.z - pos1.z, 2)
    )
}

interface Circuit {
    nodes: JunctionBox[]
}

interface NeighborDistances {
    box: JunctionBox,
    neighbor: JunctionBox
    distance: number
}

export function solvePart1(input: string[], iterations: number): number {
    const junctionBoxes = input.map(parseLineToJunctionBox)
    const circuits: Circuit[] = []
    const junctionBoxContainedInCircuit = new Map<JunctionBox, Circuit>()

    for (const junctionBox of junctionBoxes) {
        const newCircuit: Circuit = { nodes: [junctionBox] }
        circuits.push(newCircuit)
        junctionBoxContainedInCircuit.set(junctionBox, newCircuit)
    }

    const neighborDistances: NeighborDistances[] = []

    // Index selection skips self reference and duplications
    for (let boxIndex = 0; boxIndex < junctionBoxes.length - 1; boxIndex++) {
        for (let neighborIndex = boxIndex + 1; neighborIndex < junctionBoxes.length; neighborIndex++) {
            neighborDistances.push({
                box: junctionBoxes[boxIndex],
                neighbor: junctionBoxes[neighborIndex],
                distance: calculateDistance(junctionBoxes[boxIndex], junctionBoxes[neighborIndex])
            })
        }
    }

    const shortestNeighborsSorted = neighborDistances.toSorted((a, b) => a.distance - b.distance)

    for (let iteration = 0; iteration < iterations; iteration++) {
        const { box, neighbor } = shortestNeighborsSorted[iteration]

        const circuitContainingBox = junctionBoxContainedInCircuit.get(box)
        const circuitContainingNeighbor = junctionBoxContainedInCircuit.get(neighbor)

        // both box and neighbor are in different circuits -> merge the two circuits
        if (circuitContainingBox && circuitContainingNeighbor && circuitContainingBox !== circuitContainingNeighbor) {
            circuitContainingBox.nodes.push(...circuitContainingNeighbor.nodes)

            for (const node of circuitContainingNeighbor.nodes) {
                junctionBoxContainedInCircuit.set(node, circuitContainingBox)
            }

            // remove neighbors circuit since it is now part of box's circuit
            const indexToRemove = circuits.indexOf(circuitContainingNeighbor)
            circuits.splice(indexToRemove, 1)
        }

        // both box and neighbor are already in the same circuit -> do nothing
    }

    return circuits
        .toSorted((a, b) => b.nodes.length - a.nodes.length)
        .slice(0, 3)
        .reduce((product, circuit) => product * circuit.nodes.length, 1)
}

export function solvePart2(input: string[]): number {
    const junctionBoxes = input.map(parseLineToJunctionBox)
    const circuits: Circuit[] = []
    const junctionBoxContainedInCircuit = new Map<JunctionBox, Circuit>()

    for (const junctionBox of junctionBoxes) {
        const newCircuit: Circuit = { nodes: [junctionBox] }
        circuits.push(newCircuit)
        junctionBoxContainedInCircuit.set(junctionBox, newCircuit)
    }

    const neighborDistances: NeighborDistances[] = []

    // Index selection skips self reference and duplications
    for (let boxIndex = 0; boxIndex < junctionBoxes.length - 1; boxIndex++) {
        for (let neighborIndex = boxIndex + 1; neighborIndex < junctionBoxes.length; neighborIndex++) {
            neighborDistances.push({
                box: junctionBoxes[boxIndex],
                neighbor: junctionBoxes[neighborIndex],
                distance: calculateDistance(junctionBoxes[boxIndex], junctionBoxes[neighborIndex])
            })
        }
    }

    const shortestNeighborsSorted = neighborDistances.toSorted((a, b) => a.distance - b.distance)

    while (circuits.length > 1) {
        const nextShortestCandidate = shortestNeighborsSorted.shift()
        if (!nextShortestCandidate) return -1

        const { box, neighbor } = nextShortestCandidate
        const circuitContainingBox = junctionBoxContainedInCircuit.get(box)
        const circuitContainingNeighbor = junctionBoxContainedInCircuit.get(neighbor)

        // both box and neighbor are in different circuits -> merge the two circuits
        if (circuitContainingBox && circuitContainingNeighbor && circuitContainingBox !== circuitContainingNeighbor) {
            // Part 2 Solution condition
            if (circuits.length === 2) {
                return box.x * neighbor.x
            }

            circuitContainingBox.nodes.push(...circuitContainingNeighbor.nodes)

            for (const node of circuitContainingNeighbor.nodes) {
                junctionBoxContainedInCircuit.set(node, circuitContainingBox)
            }

            // remove neighbors circuit since it is now part of box's circuit
            const indexToRemove = circuits.indexOf(circuitContainingNeighbor)
            circuits.splice(indexToRemove, 1)
        }

        // both box and neighbor are already in the same circuit -> do nothing
    }

    return -1
}