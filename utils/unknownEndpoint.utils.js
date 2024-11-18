export default function unknownEndpoint(req, res, next) {
  return res.json({
    success: false,
    message: "Unknown Endpoint",
    error: "Unknown Endpoint"
  })
}
