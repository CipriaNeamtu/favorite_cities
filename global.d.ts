/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    windyInit: (options: any, callback: (windyAPI: any) => void) => void;
  }
}

export {};