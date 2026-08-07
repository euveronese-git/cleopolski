export const WHATSAPP_NUMBER = '5521972860230';
export const DISPLAY_WHATSAPP = '(21) 97286-0230';
export const DISPLAY_PHONE = '(21) 2413-2878';
export const DISPLAY_ADDRESS = 'Estr. das Capoeiras, 563 - Sl 202 - Campo Grande, Rio de Janeiro - RJ, 23085-660';
export const INSTAGRAM_HANDLE = '@c.leopolskikorretora';
export const INSTAGRAM_URL = 'https://instagram.com/c.leopolskikorretora';

/**
 * Generates a clean WhatsApp URL with custom encoded message
 */
export function getWhatsAppUrl(message?: string): string {
  const defaultText = 'Olá! Gostaria de entrar em contato com a C. Leopolski Corretora de Imóveis.';
  const text = encodeURIComponent(message || defaultText);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * WhatsApp message link for a specific property
 */
export function getPropertyWhatsAppUrl(title: string, code: string, price: number): string {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(price);

  const message = `Olá, C. Leopolski Corretora! Tenho interesse no imóvel "${title}" (Ref: ${code}), no valor de ${formattedPrice}. Poderia me passar mais detalhes e disponibilidade para visita?`;
  return getWhatsAppUrl(message);
}

/**
 * Format currency to BRL string
 */
export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}
