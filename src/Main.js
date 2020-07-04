import React, {useState, useRef} from 'react'

import {
    Grid,
    Paper,
    Typography,
    Input
} from '@material-ui/core/index'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import useStyles from './style'

import Ocr from './utils/Ocr'
import {detectLetterGrid} from './utils/ImageAnalysis'

const Main = () => {

    const classes = useStyles()
    const isPortraitDevice = useMediaQuery('(max-aspect-ratio: 11/10)')

    // Refs
    const canvasRef = useRef(null)

    // State

    function drawScaledImageToCanvas(img) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const dpi = window.devicePixelRatio

        let styleHeight = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2)
        let styleWidth = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)

        canvas.setAttribute('height', styleHeight * dpi);
        canvas.setAttribute('width', styleWidth * dpi);

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(img, 0, 0, img.width, img.height,
            centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
    }

    async function handleFile(file) {
        const displayResult = new Image()
        displayResult.src = URL.createObjectURL(file)
        displayResult.onload = () => {
            drawScaledImageToCanvas(displayResult)
        }


        const edges = await detectLetterGrid(URL.createObjectURL(file))
        console.log(edges);




        // img.onload = (async () => {
        //     const edges = cannyEdgeDetector(img)
        //     console.log(edges)

        //     drawScaledImageToCanvas(img)

        //     const imgData = canvasRef.current.toDataURL('image/png')

        //     // const ocr = new Ocr()
        //     // await ocr.init()
        //     // const orientation = await ocr.getOrientation(imgData)
        //     // console.log(orientation)
        //     // await ocr.terminate()



        // })
    }


    return (
        <div>
            <div className={classes.topBar}>
                <Typography
                    variant="h2"
                    className={classes.title}
                >
                    Boggle-Bot
                </Typography>
            </div>
            <Grid
                className={classes.content}
                container
                spacing={2}
            >
                <Grid item xs={isPortraitDevice ? 12 : 8}>
                    <Paper className={classes.gridPaper}>
                        <Input
                            type='file'
                            onChange={async e => {
                                e.persist()
                                await handleFile(e.target.files[0])
                            }}
                        />
                        <canvas ref={canvasRef} className={classes.displayCanvas} />
                    </Paper>
                </Grid>
                <Grid item xs={isPortraitDevice ? 12 : 4}>
                    <Paper className={classes.gridPaper}>
                        Also hello
                    </Paper>
                </Grid>

            </Grid>

        </div>
    )
}

export default Main
