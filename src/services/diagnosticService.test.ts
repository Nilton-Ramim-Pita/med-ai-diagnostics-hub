
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

  it('should return default diagnosis when no conditions match', () => {
    const symptoms = ['symptom_that_doesnt_exist'];
    const result = generateDiagnosis(symptoms);
    
    expect(result.condition).toBe('Condição Indefinida');
    expect(result.confidence).toBe(40);
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
