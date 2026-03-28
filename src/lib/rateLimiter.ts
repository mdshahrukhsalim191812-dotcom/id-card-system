import { RateLimiterMemory } from "rate-limiter-flexible";

export const rateLimiter = new RateLimiterMemory({
    points: 5, // max 5 attempts
    duration: 60, // per 60 seconds
});