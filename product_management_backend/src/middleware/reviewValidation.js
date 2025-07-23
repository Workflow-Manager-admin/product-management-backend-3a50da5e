 /**
  * PUBLIC_INTERFACE
  * Middleware to validate request body for create/update review.
  */
 function validateReview(req, res, next) {
   const { productId, user, rating, text } = req.body;

   if (typeof productId !== 'number' || isNaN(productId) || productId < 1) {
     return res.status(400).json({ error: 'Review productId is required and must be a positive integer.' });
   }
   if (typeof user !== 'string' || !user.trim()) {
     return res.status(400).json({ error: 'Review user is required and must be a string.' });
   }
   if (typeof rating !== 'number' || isNaN(rating) || rating < 1 || rating > 5) {
     return res.status(400).json({ error: 'Review rating is required and must be a number between 1 and 5.' });
   }
   if (typeof text !== 'string' || !text.trim()) {
     return res.status(400).json({ error: 'Review text is required and must be a string.' });
   }
   next();
 }

 module.exports = { validateReview };
