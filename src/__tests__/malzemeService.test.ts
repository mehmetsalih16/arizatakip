import { addMalzeme, getAllMalzemeler, updateMalzeme } from '../lib/malzemeService';

describe('Malzeme Servisi', () => {
  it('malzeme ekler ve listeler', async () => {
    await addMalzeme({
      tarih: '2025-09-20',
      tasinir_kodu: '123',
      ad: 'Test Malzeme',
      olcu_birimi: 'adet',
      miktar: 10
    });
    const malzemeler = await getAllMalzemeler();
    expect(malzemeler.some(m => m.ad === 'Test Malzeme')).toBe(true);
  });

  it('malzeme miktarını günceller', async () => {
    const malzemeler = await getAllMalzemeler();
    const testMalzeme = malzemeler.find(m => m.ad === 'Test Malzeme');
    expect(testMalzeme).toBeDefined();
    await updateMalzeme(testMalzeme.id, 5);
    const updated = (await getAllMalzemeler()).find(m => m.id === testMalzeme.id);
    expect(updated.miktar).toBe(5);
  });
});
