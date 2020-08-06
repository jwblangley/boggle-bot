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

    // Calculate Hough space

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

    // Find peaks
    let peaks = findPeaks(houghSpace)

    // Convert back to r and theta
    peaks = peaks.map(({i, j}) => {
        const r = (2 * maxR / rBuckets * i) - maxR
        const theta = incTheta * j
        return {r, theta}
    })

    // Convert to y = mx + b
    peaks = peaks.map(({r, theta}) => {
        const m = -1 * Math.cos(theta) / Math.sin(theta)
        const b = r / Math.sin(theta)
        return {m, b}
    })

    return peaks
}

function gaussianBlur2d(data) {
    const filter = [
        [1 / 16, 2 / 16, 1 / 16],
        [2 / 16, 4 / 16, 2 / 16],
        [1 / 16, 2 / 16, 1 / 16],
    ]

    return convolve2d(data, filter)
}

function findPeaks(data) {
    const smoothed = gaussianBlur2d(data)

    const numLessThreshold = 7
    const scale = 1

    let peaks = []

    for (let y = scale; y < smoothed.length - scale; y++) {
        for (let x = scale; x < smoothed[0].length - scale; x++) {
            let numLess = 0;
            for (let i = -1 * scale; i <= scale; i++) {
                for (let j = -1 * scale; j <= scale; j++) {
                    if (smoothed[y + i][x + j] < smoothed[y][x]) {
                        numLess++
                    }
                }
            }
            if (numLess >= numLessThreshold) {
                peaks.push({'i': x, 'j': y})
            }
        }
    }

    return peaks
}

// pre: square, odd-sized filter
function convolve2d(data, filter) {
    const filterBoundary = filter.length >> 1

    let result = [...data]

    for (let y = filterBoundary; y < data.length - filterBoundary; y++) {
        for (let x = filterBoundary; x < data[0].length - filterBoundary; x++) {
            let acc = 0
            for (let i = -1 * filterBoundary; i <= filterBoundary; i++) {
                for (let j = -1 * filterBoundary; j <= filterBoundary; j++) {
                    // N.B: flip since convolution
                    acc += data[y - i][x - j] * filter[filterBoundary + i][filterBoundary + j]
                }
            }
            result[y][x] = acc
        }
    }
    return result
}
