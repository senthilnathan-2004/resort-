import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  whatsappNumber?: string;
  maintenanceMode: boolean;
}

const SettingsSchema: Schema = new Schema(
  {
    siteName: { type: String, required: true, default: 'Luxury Resort' },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    address: { type: String, required: true },
    socialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
    },
    whatsappNumber: { type: String },
    maintenanceMode: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
