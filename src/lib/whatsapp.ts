// Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local
// Format: country code + number, digits only, no '+' or spaces (e.g. 919876543210)
export const BUSINESS_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

export function buildWhatsAppUrl(userPhone: string): string {
  const cleaned = userPhone.replace(/\D/g, '').slice(0, 10);
  const message =
    `Hi DrCliniq! I'd like to get started.\n` +
    `My number: +91 ${cleaned}`;
  return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(userPhone: string): void {
  if (typeof window === 'undefined') return;
  window.location.href = buildWhatsAppUrl(userPhone);
}
