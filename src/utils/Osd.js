import { createWorker } from 'tesseract.js';

export class Osd {

    constructor() {
        this.worker = createWorker({
            logger: m => console.log(m)
        })
    }

    async init() {
        await this.worker.load();
        await this.worker.loadLanguage('eng');
        await this.worker.initialize('eng');
    }

    async terminate() {
        await this.worker.terminate();
    }

    async getScript(source) {
        return await this.worker.recognize(source)
    }
}

export default Osd
