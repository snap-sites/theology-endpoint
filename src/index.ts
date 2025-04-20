const response = await fetch("https://api.openai.com/v1/chat/completions", {
	method: "POST",
	headers: {
	  "Content-Type": "application/json",
	  Authorization: `Bearer ${env.OPENAI_API_KEY}`,
	},
	body: JSON.stringify({
	  model: "gpt-3.5-turbo", // or "gpt-4"
	  messages: [
		{
		  role: "system",
		  content: `You are a ${body.role} from the ${body.denomination} denomination. Answer theological questions faithfully.`,
		},
		{
		  role: "user",
		  content: body.text,
		}
	  ],
	  max_tokens: 500
	}),
  });
  