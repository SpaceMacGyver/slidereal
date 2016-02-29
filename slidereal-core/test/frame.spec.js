import {expect} from 'chai';
import Chance from 'chance';
import {Frame, Program} from '../src/frame';

let chance = new Chance();

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

describe('Feature: Program frame', () => {
    describe('Scenario: A program has frames', () => {
        let program,
            frames;
        beforeEach('Given a program', () => {
            program = new Program();
        });
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
    
    describe('Scenario: The program was provided with a name', () => {
        let program,
            programName;
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
