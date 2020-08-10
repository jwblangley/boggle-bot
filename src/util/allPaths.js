function pathsFrom(current, path=[], visited=[], results=[]) {
    path.push(current)
    visited.push(current)

    results.push([...path])

    // Check for cycle
    for (const neighbour of current.neighbours) {
        if (!path.includes(neighbour)) {
            pathsFrom(neighbour, path, visited, results)
        }
    }

    // Exploration of branch finished
    path.pop()

    return results
}

export function allPaths(nodes) {
    let res = []
    for (const node of nodes) {
        res = res.concat(pathsFrom(node))
    }
    return res
}

export default allPaths
