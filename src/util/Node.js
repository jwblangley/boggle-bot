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
}

export default Node
