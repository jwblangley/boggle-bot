import cannyEdgeDetector from 'canny-edge-detector'
import { Image as ImageJS } from 'image-js'

const R_BUCKETS = 100
const THETA_BUCKETS = 90

export async function detectLetterGrid(source) {
    const img = await ImageJS.load(source)
    const edges = getEdges(img)

    return linearHoughTransform(edges, R_BUCKETS, THETA_BUCKETS)
}

function getEdges(img) {
    const grey = img.grey().invert()
    return cannyEdgeDetector(grey, { gaussianBlur: 2, lowThreshold: 5, highThreshold: 50 })
}

function linearHoughTransform(img, rBuckets, thetaBuckets) {
    const { width, height, data } = img

    // r: [-maxR, maxR]
    // theta: [0, pi]

    const houghSpace = Array(rBuckets).fill().map(() => Array(thetaBuckets).fill(0));

    const maxR = Math.sqrt(width * width + height * height)
    const maxTheta = Math.PI

    const incTheta = maxTheta / thetaBuckets

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = y * width + x
            const val = data[i]

            if (val > 0) {
                // Edge
                for (let t = 0; t < thetaBuckets; t++) {
                    const theta = t * incTheta
                    const r = x * Math.cos(theta) + y * Math.sin(theta)

                    const rBucket = Math.floor((r * (rBuckets / 2) / maxR) + (rBuckets / 2))

                    houghSpace[rBucket][t]++
                }
            }
        }
    }

    const gaussianData = gaussianBlur2d(houghSpace)

    return gaussianData
}

function gaussianBlur2d(data) {
    const filter = [
        [1 / 16, 2 / 16, 1 / 16],
        [2 / 16, 4 / 16, 2 / 16],
        [1 / 16, 2 / 16, 1 / 16],
    ]
    const filterBoundary = filter.length >> 1

    let result = [...data]

    for (let y = filterBoundary; y < result.length - filterBoundary; y++) {
        for (let x = filterBoundary; x < result[0].length - filterBoundary; x++) {
            let acc = 0
            for (let i = 0; i < filter.length; i++) {
                for (let j = 0; j < filter.length; j++) {
                    // N.B: order since convolution
                    acc += data[y][x] * filter[j][i]
                }
            }
            result[y][x] = acc
        }
    }
    return result
}
