export default {
	async fetch(request: Request, env: Env) {
	  const apiKey = env.OPENAI_API_KEY;
  
	  const body = await request.json();
  
	  const openAIResponse = await fetch("https://api.openai.com/v1/completions", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  "Authorization": `Bearer ${apiKey}`
		},
		body: JSON.stringify({
		  model: "gpt-3.5-turbo",
		  prompt: body.text,
		  max_tokens: 150
		})
	  });
  
	  const result = await openAIResponse.json();
	  return new Response(JSON.stringify(result), {
		headers: { "Content-Type": "application/json" }
	  });
	}
  };
  