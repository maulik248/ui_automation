import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const credentials = {
  iqm: {
    username: process.env.IQM_USERNAME || 'maulik.s+postman1@iqm.com',
    password: process.env.IQM_PASSWORD || 'Iqm@!ndia123',
  },
  ai: {
    enabled: process.env.AI_ENABLED !== 'false', // Enabled by default
  }
};

export const getIQMCredentials = () => credentials.iqm;
export const getAIConfig = () => credentials.ai;
