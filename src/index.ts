const OPENAI_API_KEY = OPENAI_API_KEY;  // Cloudflare worker var

async function handleRequest(request: Request) {
  const requestData = await request.json();
  console.log('Request data received:', requestData);

  const openAIResponse = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "text-davinci-003",  // or the model you're using
      prompt: requestData.text,
      max_tokens: 100
    })
  });

  const openAIData = await openAIResponse.json();
  console.log('OpenAI response:', openAIData);

  return new Response(JSON.stringify(openAIData), {
    headers: { "Content-Type": "application/json" }
  });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
