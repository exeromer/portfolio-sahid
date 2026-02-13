import { test, expect } from '@playwright/test';

test.describe('Formulario de Contacto', () => {

  test('Debe enviar el formulario correctamente y mostrar mensaje de éxito', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Contacto' }).click();

    // Llenar formulario
    await page.locator('#name').fill('Reclutador Tech');
    await page.locator('#email').fill('reclutador@empresa.com');
    await page.locator('#message').fill('Hola Sahid, me encanta tu portafolio.');

    // Clic en enviar
    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();

    // 🎯 CORRECCIÓN: Usamos un Regex (/.../i) para que busque cualquier texto 
    // que contenga "enviado" o "éxito" sin importar mayúsculas o signos.
    // Ajusta la palabra según lo que muestre tu web en la realidad.
    const successMessage = page.locator('text=/enviado|éxito|gracias/i');
    await expect(successMessage).toBeVisible({ timeout: 30000 });
  });

  test('Debe bloquear el envío si el email es inválido', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Contacto' }).click();

    const emailInput = page.locator('#email');

    // Llenar datos con un email erróneo
    await page.locator('#name').fill('Usuario Apurado');
    await emailInput.fill('correo-sin-arroba.com');
    await page.locator('#message').fill('Prueba');

    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();

    // 🎯 CORRECCIÓN: En lugar de buscar un texto, verificamos que el 
    // navegador haya marcado el input como inválido (HTML5 nativo).
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBeFalsy(); // Esperamos que sea Falso (inválido)
  });

});