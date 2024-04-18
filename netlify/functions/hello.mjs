export default async (req, context) => {
  return new Response(`Hello, ${event.queryStringParameters?.query || Date.now()}`, {
    headers: {
       'access-control-allow-origin': '*'
    }
  });
};
