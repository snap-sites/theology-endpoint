export interface Env {
	OPENAI_API_KEY: string;
  }
  
  export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	  try {
		const body = await request.json();
  
		if (!body.text || !body.role || !body.denomination) {
		  return new Response(JSON.stringify({ error: "Missing required fields: text, role, denomination." }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		  });
		}
  
		const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${env.OPENAI_API_KEY}`,
		  },
		  body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [
			  {
				role: "system",
				content: `You are a ${body.role} from the ${body.denomination} denomination. Answer theological questions faithfully and clearly.`,
			  },
			  {
				role: "user",
				content: body.text,
			  }
			],
		  }),
		});
  
		const data = await openaiResponse.json();
  
		return new Response(JSON.stringify(data), {
		  headers: { "Content-Type": "application/json" },
		});
  
	  } catch (err: any) {
		return new Response(JSON.stringify({ error: err.message || "Unknown error" }), {
		  status: 500,
		  headers: { "Content-Type": "application/json" },
		});
	  }
	}
  };
  