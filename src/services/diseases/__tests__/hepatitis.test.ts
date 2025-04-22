
import { describe, it, expect } from 'vitest';
import { checkForHepatitis } from '../hepatitis';

describe('checkForHepatitis', () => {
  it('should return hepatitis diagnosis when all symptoms match', () => {
    const symptoms = ['nausea', 'vomiting', 'abdominal_pain', 'fatigue'];
    const result = checkForHepatitis(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Hepatite Viral');
    expect(result?.confidence).toBe(78);
  });

  it('should return null when symptoms do not match', () => {
    const symptoms = ['fever', 'cough'];
    const result = checkForHepatitis(symptoms);
    
    expect(result).toBeNull();
  });

  it('should return null when only some symptoms match', () => {
    const symptoms = ['nausea', 'vomiting'];
    const result = checkForHepatitis(symptoms);
    
    expect(result).toBeNull();
  });
});
