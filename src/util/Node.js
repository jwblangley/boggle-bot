export class Node {
    constructor(id, value) {
        this._id = id
        this._value = value
        this._neighbours = []
    }

    get id() {
        return this._id
    }

    get value() {
        return this._value
    }

    get neighbours() {
        return this._neighbours
    }

    addNeighbour(neighbour) {
        this._neighbours.push(neighbour)
    }

    static graphFromGrid(grid) {
        const nodes = grid.map((row, i) => row.map((item, j) => new Node([i, j], item)))
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes[0].length; j++) {

                const node = nodes[i][j]

                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        if (k === 0 && l === 0) {
                            continue; // Don't add self
                        }
                        if (i + k >= 0 && i + k < nodes.length
                            && j + l >= 0 && j + l < nodes[0].length) {
                            node.addNeighbour(nodes[i + k][j + l])
                        }
                    }
                }
            }
        }
        return nodes.reduce((acc, val) => acc.concat(val), [])
    }
}

export default Node
