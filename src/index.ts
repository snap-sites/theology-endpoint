export default {
	async fetch(request: Request): Promise<Response> {
	  if (request.method === "OPTIONS") {
		return new Response(null, {
		  status: 204,
		  headers: corsHeaders(),
		});
	  }
  
	  // Your actual logic here
	  const data = await request.json();
  
	  const response = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  "Authorization": `Bearer ${OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
		  model: "gpt-3.5-turbo",
		  messages: [
			{ role: "system", content: `You are a helpful ${data.denomination} ${data.role}.` },
			{ role: "user", content: data.text }
		  ]
		})
	  });
  
	  const result = await response.json();
  
	  return new Response(JSON.stringify(result), {
		headers: {
		  "Content-Type": "application/json",
		  ...corsHeaders(),
		},
	  });
	},
  };
  
  function corsHeaders() {
	return {
	  "Access-Control-Allow-Origin": "https://breakthrough-ministry-tools.pages.dev",
	  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	  "Access-Control-Allow-Headers": "Content-Type, Authorization",
	};
  }
  