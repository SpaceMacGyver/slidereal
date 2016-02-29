const DEFAULT_FRAME_NAME = '(unnamed)';

export class Frame {
    constructor(name) {
        if (name) {
            this.name = name;
        } else {
            this.name = DEFAULT_FRAME_NAME;
        }
    }
}

export class Program extends Frame {
    constructor(name) {
        super(name);
        this.frames = [];
    }
    
    addFrame(frame) {
        this.frames.push(frame);
    }
    
    getFrames() {
        return this.frames;
    }
}