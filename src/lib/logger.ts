/**
 * Simple logging utility that respects environment
 */

const isDev = !import.meta.env.PROD;

export const logger = {
    log: (...args: unknown[]) => {
        if (isDev) {
            console.log(...args);
        }
    },

    error: (...args: unknown[]) => {
        console.error(...args);
        // In production, send to error tracking service (e.g., Sentry)
    },

    warn: (...args: unknown[]) => {
        if (isDev) {
            console.warn(...args);
        }
    },

    info: (...args: unknown[]) => {
        if (isDev) {
            console.info(...args);
        }
    },
};
