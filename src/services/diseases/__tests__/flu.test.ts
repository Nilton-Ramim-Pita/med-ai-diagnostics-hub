
import { describe, it, expect } from 'vitest';
import { checkForFlu } from '../flu';

describe('checkForFlu', () => {
  it('should return flu diagnosis when symptoms match with muscle pain', () => {
    const symptoms = ['fever', 'cough', 'muscle_pain'];
    const result = checkForFlu(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Gripe');
    expect(result?.confidence).toBe(85);
  });

  it('should return flu diagnosis when symptoms match with fatigue', () => {
    const symptoms = ['fever', 'cough', 'fatigue'];
    const result = checkForFlu(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Gripe');
  });

  it('should return null when symptoms do not match', () => {
    const symptoms = ['rash', 'itching'];
    const result = checkForFlu(symptoms);
    
    expect(result).toBeNull();
  });
});
