import { Request, Response } from 'express';
import axios from 'axios';

export default async function getCountry(req: Request, res: Response) {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const response = await axios.get(`https://ipinfo.io/${ip}/json?token=YOUR_API_TOKEN`);
    res.json({ country: response.data.country });
  } catch (error) {
    console.error('Error fetching user country:', error);
    res.status(500).json({ error: 'Unable to fetch country' });
  }
}
