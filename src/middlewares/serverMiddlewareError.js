/* eslint-disable no-unused-vars */
export default function serverMiddlewareError(err, req, res, next) {
  return res.status(500).send(`Error - ${err.message}`);
}
