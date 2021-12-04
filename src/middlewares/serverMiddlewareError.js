export default async function serverMiddlewareError(err, req, res) {
  return res.status(500).send(`Error - ${err.message}`);
}
