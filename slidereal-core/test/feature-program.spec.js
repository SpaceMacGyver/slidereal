import {expect} from 'chai';
import Chance from 'chance';
import {Frame, Program, Slide} from '../src/frame';

let chance = new Chance(),
    program;

function givenProgram() {
    program = new Program();
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
});
  
