import { PayOS } from '@payos/node';

let _payos: PayOS | null = null;

export function getPayOS(): PayOS {
  if (!_payos) {
    const clientId = process.env.PAYOS_CLIENT_ID;
    const apiKey = process.env.PAYOS_API_KEY;
    const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

    if (!clientId || !apiKey || !checksumKey) {
      throw new Error('PayOS keys not configured');
    }

    _payos = new PayOS({ clientId, apiKey, checksumKey });
  }
  return _payos;
}
