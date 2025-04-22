
import { describe, it, expect } from 'vitest';
import { checkForGastroenteritis } from '../gastroenteritis';

describe('checkForGastroenteritis', () => {
  it('should return gastroenteritis diagnosis when symptoms match with nausea', () => {
    const symptoms = ['nausea', 'diarrhea'];
    const result = checkForGastroenteritis(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Gastroenterite');
    expect(result?.confidence).toBe(80);
  });

  it('should return gastroenteritis diagnosis when symptoms match with vomiting', () => {
    const symptoms = ['vomiting', 'diarrhea'];
    const result = checkForGastroenteritis(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Gastroenterite');
  });

  it('should return null when symptoms do not match', () => {
    const symptoms = ['fever', 'headache'];
    const result = checkForGastroenteritis(symptoms);
    
    expect(result).toBeNull();
  });
});
