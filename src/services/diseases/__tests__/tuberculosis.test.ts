
import { describe, it, expect } from 'vitest';
import { checkForTuberculosis } from '../tuberculosis';

describe('checkForTuberculosis', () => {
  it('should return tuberculosis diagnosis when all symptoms match', () => {
    const symptoms = ['cough', 'weight_loss', 'night_sweats', 'fatigue'];
    const result = checkForTuberculosis(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Tuberculose Pulmonar');
    expect(result?.confidence).toBe(82);
  });

  it('should return null when symptoms do not match', () => {
    const symptoms = ['fever', 'headache'];
    const result = checkForTuberculosis(symptoms);
    
    expect(result).toBeNull();
  });

  it('should return null when only some symptoms match', () => {
    const symptoms = ['cough', 'fatigue'];
    const result = checkForTuberculosis(symptoms);
    
    expect(result).toBeNull();
  });
});
