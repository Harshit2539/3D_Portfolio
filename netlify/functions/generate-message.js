export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, subject } = JSON.parse(event.body);

    if (!name || !subject) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Name and subject required' })
      };
    }

    // const prompt = `Write a professional contact message from ${name} about ${subject}. Keep it 2-3 sentences, professional and friendly.`;
   const prompt = `Write a professional and friendly contact message for a portfolio website.
The sender's name is: ${name}
The subject is: ${subject}

Generate a concise, professional message (2-3 sentences) that:
- Introduces the sender briefly
- States their interest related to the subject
- Requests a response or meeting

Keep it under 150 words and make it sound natural and professional.`;
    // const prompt = `Draft a concise, professional contact message from ${name} regarding ${subject}. Limit to 2–3 sentences, maintain a friendly yet business-appropriate tone, and end with a clear, polite close.`;
    const response = await fetch('https://models.github.ai/inference/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-4.1-mini',
        temperature: 0.7,
        messages: [
          { role: 'system', content: 'You are a professional message writer.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('AI request failed');
    }

    const data = await response.json();
    const message = data.choices[0].message.content.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Failed to generate' })
    };
  }
};
