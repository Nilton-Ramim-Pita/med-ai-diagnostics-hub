
import { describe, it, expect } from 'vitest';
import { generateDiagnosis } from './diagnosticService';

describe('generateDiagnosis', () => {
  it('should return the most confident diagnosis when multiple conditions match', () => {
    const symptoms = ['fever', 'cough', 'breathing_difficulty', 'fatigue'];
    const result = generateDiagnosis(symptoms);
    
    // In this case, both COVID and heart attack could match, but heart attack has higher confidence
    expect(result.condition).toBe('Infarto Agudo do Miocárdio');
    expect(result.confidence).toBe(93);
  });

  it('should return default diagnosis with at least 88% confidence when no conditions match', () => {
    const symptoms = ['symptom_that_doesnt_exist'];
    const result = generateDiagnosis(symptoms);
    
    expect(result.condition).toBe('Condição Indefinida');
    expect(result.confidence).toBe(88);
  });

  it('should always return a diagnosis with confidence of at least 88%', () => {
    const symptoms = ['rash', 'itching']; // This should match allergy which has 75% confidence
    const result = generateDiagnosis(symptoms);
    
    expect(result).toHaveProperty('condition');
    expect(result.confidence).toBeGreaterThanOrEqual(88);
  });

  it('should return a valid diagnosis with recommendations', () => {
    const symptoms = ['fever', 'headache', 'muscle_pain', 'rash'];
    const result = generateDiagnosis(symptoms);
    
    expect(result).toHaveProperty('condition');
    expect(result).toHaveProperty('confidence');
    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('recommendations');
    expect(Array.isArray(result.recommendations)).toBe(true);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });
});
