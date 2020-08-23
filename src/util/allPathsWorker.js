import { pathsFrom } from './allPaths'

const pathToWord = path => {
    // Due to worker deep copy
    return path.map(node => node.value || node._value).join('').toLowerCase()
}

export const workerPathsFrom = (node, functionDeps) => {
    const {
        minWordLength,
        dictionary,
    } = functionDeps

    const results = pathsFrom(node,
        path =>
            path.length >= minWordLength
            && dictionary.includes(pathToWord(path)),
        path => !dictionary.some(word => word.startsWith(pathToWord(path)))
    )

    postMessage(results)

}
