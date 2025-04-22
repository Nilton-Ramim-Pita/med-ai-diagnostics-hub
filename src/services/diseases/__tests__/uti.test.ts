
import { describe, it, expect } from 'vitest';
import { checkForUTI } from '../uti';

describe('checkForUTI', () => {
  it('should return UTI diagnosis when symptoms match with blood in urine', () => {
    const symptoms = ['urinary_pain', 'blood_urine'];
    const result = checkForUTI(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Infecção do Trato Urinário');
    expect(result?.confidence).toBe(77);
  });

  it('should return UTI diagnosis when symptoms match with fever', () => {
    const symptoms = ['urinary_pain', 'fever'];
    const result = checkForUTI(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Infecção do Trato Urinário');
  });

  it('should return null when symptoms do not match', () => {
    const symptoms = ['headache', 'cough'];
    const result = checkForUTI(symptoms);
    
    expect(result).toBeNull();
  });
});
