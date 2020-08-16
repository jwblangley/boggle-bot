import allPaths from './allPaths.js'
import Node from './Node.js'

function valuesOnly(results) {
    return results.map(path => path.map(node => node.value))
}

test('all paths for singleton is singleton', () => {
    const node1 = new Node(1, 'a')
    expect(valuesOnly(allPaths([node1])).sort())
        .toEqual([['a']].sort())
})

test('all paths for two items is correct', () => {
    const nodes = [new Node(1, 'a'), new Node(2, 'b')]
    nodes[0].addNeighbour(nodes[1])
    nodes[1].addNeighbour(nodes[0])

    expect(valuesOnly(allPaths(nodes)).sort())
        .toEqual([['a'], ['a', 'b'], ['b', 'a'], ['b']].sort())
})

test('all paths for four items in grid is correct', () => {
    const node1 = new Node(1, 't')
    const node2 = new Node(2, 'e')
    const node3 = new Node(3, 'n')
    const node4 = new Node(4, 's')

    const nodes = [node1, node2, node3, node4]
    for (const node of nodes) {
        for (const neighbour of nodes) {
            if (neighbour !== (node)) {
                node.addNeighbour(neighbour)
            }
        }
    }

    const genWords = valuesOnly(allPaths(nodes)).map(arr => arr.join(''))

    expect(genWords.length).toEqual(64)
    expect(genWords).toContainEqual('net')
    expect(genWords).toContainEqual('ten')
    expect(genWords).toContainEqual('sent')
    expect(genWords).toContainEqual('tens')
    expect(genWords).toContainEqual('set')

    expect(genWords).toContainEqual('se')
    expect(genWords).toContainEqual('st')
})

test('early pruning works', () => {
    const node1 = new Node(1, 't')
    const node2 = new Node(2, 'e')
    const node3 = new Node(3, 'n')
    const node4 = new Node(4, 's')

    const nodes = [node1, node2, node3, node4]
    for (const node of nodes) {
        for (const neighbour of nodes) {
            if (neighbour !== (node)) {
                node.addNeighbour(neighbour)
            }
        }
    }

    const genWords = valuesOnly(allPaths(nodes, () => true, (path => path.map(node => node.value).includes("s")))).map(arr => arr.join(''))

    // If at any point an "S" is in the path, we know it is wrong

    expect(genWords.every(word => !word.includes("s")))

    expect(genWords).toContainEqual('net')
    expect(genWords).toContainEqual('ten')
})
