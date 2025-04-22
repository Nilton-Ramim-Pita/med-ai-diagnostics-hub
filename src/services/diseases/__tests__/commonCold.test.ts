
import { describe, it, expect } from 'vitest';
import { checkForCommonCold } from '../commonCold';

describe('checkForCommonCold', () => {
  it('should return cold diagnosis when symptoms match with sore throat', () => {
    const symptoms = ['runny_nose', 'sore_throat'];
    const result = checkForCommonCold(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Resfriado Comum');
    expect(result?.confidence).toBe(90);
  });

  it('should return cold diagnosis when symptoms match with cough', () => {
    const symptoms = ['runny_nose', 'cough'];
    const result = checkForCommonCold(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Resfriado Comum');
  });

  it('should return null when symptoms do not match', () => {
    const symptoms = ['fever', 'headache'];
    const result = checkForCommonCold(symptoms);
    
    expect(result).toBeNull();
  });
});
