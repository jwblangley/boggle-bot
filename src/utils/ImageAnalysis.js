import cannyEdgeDetector from 'canny-edge-detector'
import { Image as ImageJS } from 'image-js'

export async function detectLetterGrid(source) {
    const img = await ImageJS.load(source)
    const edges = getEdges(img)


    return linearHoughTransform(edges, 100, 90)
}

function getEdges(img) {
    const grey = img.grey().invert()
    return cannyEdgeDetector(grey, { gaussianBlur: 2, lowThreshold: 5, highThreshold: 50 })
}

function linearHoughTransform(img, rBuckets, thetaBuckets) {
    const {width, height, data} = img

    // r: [-maxR, maxR]
    // theta: [0, pi]

    const houghSpace = Array(rBuckets).fill().map(() => Array(thetaBuckets).fill(0));

    const maxR = Math.sqrt(width * width + height * height)
    const maxTheta = Math.PI

    const incTheta = maxTheta / thetaBuckets

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            const i = y * width + x
            const val = data[i]

            if (val > 0) {
                // Edge
                for (var t = 0; t < thetaBuckets; t++) {
                    const theta = t * incTheta
                    const r = x * Math.cos(theta) + y * Math.sin(theta)

                    const rBucket = Math.floor((r *  (rBuckets / 2) / maxR) + (rBuckets / 2))

                    houghSpace[rBucket][t]++
                }
            }
        }
    }

    return houghSpace

}
