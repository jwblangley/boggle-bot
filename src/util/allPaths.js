function pathsFrom(current, filter, earlyPrune, path=[], visited=[], results=[]) {
    path.push(current)
    visited.push(current)

    if (earlyPrune([...path])) {
        // Stop exploration of branch early
        path.pop()
        return results
    }

    if (filter([...path])) {
        results.push([...path])
    }

    // Check for cycle
    for (const neighbour of current.neighbours) {
        if (!path.includes(neighbour)) {
            pathsFrom(neighbour, filter, earlyPrune, path, visited, results)
        }
    }

    // Exploration of branch finished
    path.pop()
    return results
}

export function allPaths(nodes, filter = (() => true), earlyPrune = (() => false)) {
    let res = []
    for (const node of nodes) {
        res = res.concat(pathsFrom(node, filter, earlyPrune))
    }
    return res
}

export default allPaths
