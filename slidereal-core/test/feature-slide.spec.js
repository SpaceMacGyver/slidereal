import {expect} from 'chai';
import Chance from 'chance';
import {Frame, Slide} from '../src/frame';

let chance = new Chance(),
    slide;

function givenSlide() {
    slide = new Slide();
}

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


describe('Feature: Slide frames', () => { 
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