export function solvePart1(input: string[]): number {
    let count = 0;

    let currentPosition = 50;

    for (const line of input) {
        const direction = line[0];
        const distance = parseInt(line.substring(1));

        if (direction === "L") {
            const newPosition = (currentPosition - distance) % 100;
            currentPosition = newPosition < 0 ? 100 - Math.abs(newPosition) : newPosition;
        } else if (direction === "R") {
            const newPosition = (currentPosition + distance) % 100;
            currentPosition = newPosition > 0 ? 0 + Math.abs(newPosition) : newPosition;
        }

        if (currentPosition === 0) {
            count += 1;
        }
    }

    return count;
}

export function solvePart2(input: string[]): number {
    let count = 0;

    let currentPosition = 50;

    for (const line of input) {
        const direction = line[0];
        const distance = parseInt(line.substring(1));

        if (direction === "L") {
            let newPosition = currentPosition - distance;
            while (newPosition < 0) {
                count += 1;
                newPosition += 100;
            }

            // special case that would get counted twice
            if (currentPosition === 0) {
                count -= 1;
            }
            currentPosition = newPosition;

        } else if (direction === "R") {
            let newPosition = currentPosition + distance;

            while (newPosition > 100) {
                count += 1;
                newPosition -= 100;
            }

            // special case that would get counted twice
            if (newPosition === 100) {
                newPosition = 0;
            }

            currentPosition = newPosition;
        }

        if (currentPosition === 0) {
            count += 1;
        }
    }

    return count;
}