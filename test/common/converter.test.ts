import { expect } from '@sandbox';
import { arrayToString, capitalize } from '@common/converter';
import { testStringifiedUsers, testUsers } from 'testData';

describe('converter', () => {

  describe('capitalize', () => {

    it('returns empty string when value is not string', () => {
      expect(capitalize(undefined)).to.equal('');
    });

    it('returns empty string for empty string', () => {
      expect(capitalize('')).to.equal('');
    });

    it('returns capitalized string', () => {
      expect(capitalize('foo')).to.equal('Foo');
    });

  });

  describe('arrayToString', () => {

    it('returns empty string for undefined value', () => {
      expect(arrayToString(undefined)).to.equal('');
    });

    it('returns empty array string for empty array', () => {
      expect(arrayToString([])).to.equal('[]');
    });

    it('returns stringified array of users', () => {
      expect(arrayToString(testUsers)).to.equal(testStringifiedUsers);
    });

  });

});
