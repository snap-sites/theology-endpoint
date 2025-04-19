export default {
	async fetch(request: Request): Promise<Response> {
	  if (request.method !== "POST") {
		return new Response("Only POST requests allowed", { status: 405 });
	  }
  
	  try {
		const input = await request.json();
  
		const messages = [
		  {
			role: "system",
			content: `You are a helpful theological assistant for a ${input.role} in the ${input.denomination} tradition.`,
		  },
		  { role: "user", content: input.text },
		];
  
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		  },
		  body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages,
		  }),
		});
  
		const data = await response.json();
		const output = data.choices?.[0]?.message?.content ?? "No response from AI";
  
		return new Response(JSON.stringify({ result: output }), {
		  headers: { "Content-Type": "application/json" },
		});
	  } catch (err) {
		return new Response(`Error: ${err}`, { status: 500 });
	  }
	},
  };
  