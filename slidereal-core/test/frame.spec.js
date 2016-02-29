import {expect} from 'chai';
import Chance from 'chance';
import {Frame} from '../src/frame';

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