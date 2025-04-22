
import { describe, it, expect } from 'vitest';
import { checkForCovid } from '../covid';

describe('checkForCovid', () => {
  it('should return covid diagnosis when symptoms match with cough', () => {
    const symptoms = ['fever', 'breathing_difficulty', 'cough'];
    const result = checkForCovid(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('COVID-19');
    expect(result?.confidence).toBe(80);
  });

  it('should return covid diagnosis when symptoms match with fatigue', () => {
    const symptoms = ['fever', 'breathing_difficulty', 'fatigue'];
    const result = checkForCovid(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('COVID-19');
  });

  it('should return null when symptoms do not match', () => {
    const symptoms = ['headache', 'nausea'];
    const result = checkForCovid(symptoms);
    
    expect(result).toBeNull();
  });
});
