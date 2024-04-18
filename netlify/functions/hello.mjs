export default async (req, context) => {
  return new Response(`Hello, ${req.queryStringParameters?.query || Date.now()}`, {
    headers: {
       'access-control-allow-origin': '*'
    }
  });
};
