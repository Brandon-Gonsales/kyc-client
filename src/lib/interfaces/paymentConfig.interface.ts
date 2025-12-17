export interface PaymentConfig {
  _id: string;
  actualizado_por?: string;
  banco?: string;
  creado_por?: string;
  created_at: string;
  is_active: boolean;
  notas?: string;
  numero_cuenta: string;
  qr_url: string; // The URL returned by Cloudinary (or similar)
  tipo_cuenta?: string;
  titular?: string;
  updated_at: string;
}
