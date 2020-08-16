import _ from 'lodash'

import Node from './util/Node'
import allPaths from './util/allPaths'

export const findWords = (inputGrid, dictionary, minWordLength) => {
    const graph = Node.graphFromGrid(inputGrid)

    const paths = allPaths(graph, path =>
        path.length >= minWordLength
        && dictionary.includes(path.map(node => node.value).join('').toLowerCase()))

    const results = paths
        .map(path => ({
            'string': path.map(node => node.value).join(''),
            'path': path.map(node => node.id)
        })
    )

    const uniqResults = _.uniqBy(results, 'string')
    const groupedResults = _.groupBy(uniqResults, ({string}) => string.length)

    postMessage(groupedResults)
};
