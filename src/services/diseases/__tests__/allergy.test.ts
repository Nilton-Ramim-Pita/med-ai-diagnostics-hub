
import { describe, it, expect } from 'vitest';
import { checkForAllergy } from '../allergy';

describe('checkForAllergy', () => {
  it('should return allergy diagnosis when symptoms match', () => {
    const symptoms = ['rash', 'itching'];
    const result = checkForAllergy(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Alergia/Dermatite');
    expect(result?.confidence).toBe(75);
  });

  it('should return null when symptoms do not match', () => {
    const symptoms = ['fever', 'cough'];
    const result = checkForAllergy(symptoms);
    
    expect(result).toBeNull();
  });

  it('should return null when only one symptom matches', () => {
    const symptoms = ['rash'];
    const result = checkForAllergy(symptoms);
    
    expect(result).toBeNull();
  });
});
