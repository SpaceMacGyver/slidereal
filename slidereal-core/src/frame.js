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
        this.currentFrameAssignment = 0;
    }

    addFrame(frame) {
        if (frame) {
            this.frames.push(frame);
        } else {
            let newFrameAssignment = ++this.currentFrameAssignment,
                newFrameName = String(newFrameAssignment);

            this.frames.push(new Slide(newFrameName));
        }
    }

    getFrames() {
        return this.frames;
    }
}

export class Slide extends Frame {
    constructor(name) {
        super(name);
        this.frames = [];
        this.currentFrameAssignment = 0;
    }
    
    addFrame(frame) {
        if (!frame) {
            let newFrameAssignment = ++this.currentFrameAssignment,
                newFrameName = String(newFrameAssignment),
                newFrame = new Frame(newFrameName);

            this.frames.push(newFrame);
            return newFrame;
        }
        this.frames.push(frame);
        return frame;
    }
    
    getFrames() {
        return this.frames;
    }
}
