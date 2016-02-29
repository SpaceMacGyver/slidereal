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
