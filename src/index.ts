export async function fetch(request: Request): Promise<Response> {
	if (request.method !== "POST") {
	  return new Response("Method Not Allowed", { status: 405 });
	}
  
	try {
	  const input = await request.json();
  
	  const prompt = [
		{
		  role: "system",
		  content: `You are a helpful theological assistant for a ${input.role} in the ${input.denomination} tradition.`,
		},
		{
		  role: "user",
		  content: input.text,
		},
	  ];
  
	  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
	  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `Bearer ${OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
		  model: "gpt-3.5-turbo",
		  messages: prompt,
		}),
	  });
  
	  const data = await openaiRes.json();
  
	  if (!data.choices || !data.choices[0]) {
		return new Response("No result from OpenAI", { status: 500 });
	  }
  
	  return new Response(
		JSON.stringify({ result: data.choices[0].message.content }),
		{ headers: { "Content-Type": "application/json" } }
	  );
	} catch (err: any) {
	  return new Response("Error: " + err.message, { status: 500 });
	}
  }
  