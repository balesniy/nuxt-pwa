export default async (req, context) => {
  return new Response(`Hello, ${Date.now()} world!`, {
    headers: {
       'access-control-allow-origin': '*'
    }
  });
};
