function pathsFrom(current, filterPred, path=[], visited=[], results=[]) {
    path.push(current)
    visited.push(current)

    if (filterPred([...path])) {
        results.push([...path])
    }

    // Check for cycle
    for (const neighbour of current.neighbours) {
        if (!path.includes(neighbour)) {
            pathsFrom(neighbour, filterPred, path, visited, results)
        }
    }

    // Exploration of branch finished
    path.pop()

    return results
}

export function allPaths(nodes, filterPred = (() => true)) {
    let res = []
    for (const node of nodes) {
        res = res.concat(pathsFrom(node, filterPred))
    }
    return res
}

export default allPaths
