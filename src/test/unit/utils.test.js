import { tryParseJSONObject } from '../../utils';

describe('Try Parse JSON Object util', () => {
  it('should return an object', () => {
    const object = tryParseJSONObject('{"message":"Hello world"}');
    expect(typeof object).toEqual('object');
  });

  it('should return a value to be false', () => {
    expect(tryParseJSONObject()).toBeFalsy();
  });

  it('should return a value to be false', () => {
    expect(tryParseJSONObject('Hello world')).toBeFalsy();
  });
});
