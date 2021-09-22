import {NextFunction, Request, Response, RequestHandler} from 'express';

/**
 * Catches the errors so that the application does not crash.
 * Sends the errors to the global error handler.
 * @param cb
 */
export const asyncHandler = (cb: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await cb(req, res, next);
        } catch (error) {
            // Forward error to the global error handler
            next(error);
        }
    }
}