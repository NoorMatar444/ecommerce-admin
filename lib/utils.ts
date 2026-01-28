import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getFormatter(currency: 'EGP' | 'AED') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
}

