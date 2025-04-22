
import { describe, it, expect } from 'vitest';
import { checkForHeartAttack } from '../heartAttack';

describe('checkForHeartAttack', () => {
  it('should return heart attack diagnosis when all symptoms match', () => {
    const symptoms = ['chest_pain', 'breathing_difficulty', 'fatigue'];
    const result = checkForHeartAttack(symptoms);
    
    expect(result).not.toBeNull();
    expect(result?.condition).toBe('Infarto Agudo do Miocárdio');
    expect(result?.confidence).toBe(93);
  });

  it('should return null when symptoms do not match', () => {
    const symptoms = ['fever', 'cough'];
    const result = checkForHeartAttack(symptoms);
    
    expect(result).toBeNull();
  });

  it('should return null when only some symptoms match', () => {
    const symptoms = ['chest_pain', 'fatigue'];
    const result = checkForHeartAttack(symptoms);
    
    expect(result).toBeNull();
  });
});
