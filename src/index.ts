export default {
	async fetch(request: Request): Promise<Response> {
	  if (request.method !== "POST") {
		return new Response("Method Not Allowed", { status: 405 });
	  }
  
	  try {
		const input = await request.json();
  
		const message = `You are a helpful theological assistant for a ${input.role} in the ${input.denomination} tradition.`;
  
		return new Response(
		  JSON.stringify({
			prompt: message,
			user_input: input.text,
		  }),
		  {
			headers: { "Content-Type": "application/json" },
		  }
		);
	  } catch (err) {
		return new Response("Invalid JSON", { status: 400 });
	  }
	},
  };
  