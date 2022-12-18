import { expect } from 'chai'

describe('Array', function () {
    it('should return -1 when the value is not present', function () {
        expect([1, 2, 3].indexOf(4)).to.eq(-1);
    });
});