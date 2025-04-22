
import { describe, it, expect } from 'vitest';
import { checkForDengue } from '../dengue';

describe('checkForDengue', () => {
  it('should return dengue diagnosis when symptoms match with rash', () => {
    const symptoms = ['fever', 'headache', 'muscle_pain', 'rash'];
    const result = checkForDengue(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Dengue');
    expect(result?.confidence).toBe(85);
  });

  it('should return dengue diagnosis when symptoms match with joint pain', () => {
    const symptoms = ['fever', 'headache', 'muscle_pain', 'joint_pain'];
    const result = checkForDengue(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Dengue');
  });

  it('should return null when symptoms do not match', () => {
    const symptoms = ['cough', 'runny_nose'];
    const result = checkForDengue(symptoms);
    
    expect(result).toBeNull();
  });
});
