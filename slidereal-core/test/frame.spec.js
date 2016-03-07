import {expect} from 'chai';
import Chance from 'chance';
import {Frame, Program, Slide} from '../src/frame';

let chance = new Chance(),
    slide,
    program;

describe('Feature: Frame model', () => {
    describe('Scenario: Frame without name overrides', () => {
        let currentFrame;
        beforeEach('Given a frame', () => {
            currentFrame = new Frame();
        });
        
        it('Then it should exist', () => {
            expect(currentFrame).not.to.equal(undefined);
        });
        it('And it should have a `name`', () => {
            expect(currentFrame.name).not.to.equal(undefined);
        });
    });
    
    describe('Scenario: Frame with name override', () => {
        let frame,
            frameName;

        beforeEach('Given a frame name', () => {
            frameName = chance.string();
        });
        beforeEach('And a frame', () => {
            frame = new Frame(frameName);
        });
        
        it('Then the two frames should have different names', () => {
            expect(frame.name).to.equal(frameName);
        });
    });
});

function givenProgram() {
    program = new Program();
}

function givenSlide() {
    slide = new Slide();
}
describe('Feature: Program frame', () => {
    describe('Scenario: A program has frames', () => {
        let frames;
        beforeEach('Given a program', givenProgram);
        beforeEach('Given some frames', () => {
            frames = [
                new Frame(),
                new Frame()
            ];
            program.addFrame(frames[0]);
            program.addFrame(frames[1]);
        });
        
        it('Then it should return the requested frames', () => {
            expect(program.getFrames()).to.eql(frames);
        });
    });

    describe('Scenario: A program told to construct its own frames', () => {
        beforeEach('Given a program', givenProgram);
        beforeEach('Given frames added with empty params', () => {
            program.addFrame();
            program.addFrame();
        });

        it('Then it should have two Slides', () => {
            let frames = program.getFrames();
            expect(frames, 'count').to.have.length(2);
            frames.forEach((frame, key) => {
                let index = key + 1;
                expect(frame, `frame ${index} type`).to.be.instanceof(Slide);
            });
        });

        it('And its Slides should be sequentially named', () => {
            const expectedFrameNames = ['1', '2'];
            let frames = program.getFrames();
            expect(frames.map(frame => frame.name)).to.eql(expectedFrameNames);
        });
    });
    
    describe('Scenario: The program was provided with a name', () => {
        let programName;
        beforeEach('Given a program name', () => {
            programName = chance.string();
        });
        beforeEach('And a program with the name provided', () => {
            program = new Program(programName);
        });
        
        it('Then should possess that name after instantiation', () => {
            expect(program.name).to.equal(programName);
        });
    });
    
    describe('Scenario: A slide has subframes', () => {
        let expectedFrames;
            
        beforeEach('Given a slide', givenSlide);
        beforeEach('Given subframes', () => {
            expectedFrames = [];
            for (let i = 0; i < 2; i++) {
                expectedFrames.push(slide.addFrame());
            }
        });
        
        it('Then should return subframes', () => {
            let subframes = slide.getFrames();
            expect(subframes).to.eql(expectedFrames);
        });
        it('And they should be sequentially named', () => {
            let subframes = slide.getFrames();
            expect(subframes.map(frame => frame.name)).to.eql(['1', '2']);
        });
    });
    
    describe('Scenario: A slide can be provided subframes', () => {
        let expectedFrames;
            
        beforeEach('Given a slide', givenSlide);
        beforeEach('Given a mixture of implicit and explicit frames', () => {
            expectedFrames = [];
            expectedFrames.push(slide.addFrame());
            expectedFrames.push(slide.addFrame(new Frame('Test')));
            expectedFrames.push(slide.addFrame());
        });
        
        it('Then should return expected subframes', () => {
            const expectedFrameNames = ['1', 'Test', '2'];
            let subframes = slide.getFrames();
            expect(subframes.map(frame => frame.name))
                .to.eql(expectedFrameNames);
        });
    });
});
