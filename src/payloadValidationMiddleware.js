/*
 Checks if payload is valid and throws error if it is not.
 */
export const payloadValidationMiddleware = (req, res, next) => {
    const payload = req.body;

    if (!payload.userId) throw new Error('The `userId` parameter is not present.');
    if (!payload.amount) throw new Error('The `amount` field  is not present in the payload.');
    if (!payload.referenceId) throw new Error('The `referenceId` field  is not present in the payload.');

    next();
}