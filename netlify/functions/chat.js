<!-- netlify/functions/chat.js -->
const BOT_PROMPTS = {
  'brand-identity': 'System: Define your brand’s core vision...',
  'target-audience': 'System: Identify your ideal customers...',
  'brand-voice':    'System: Craft your brand tone and voice...',
  'visual-style':   'System: Outline your visual identity...',
  'artist-wiki':    'System: Build your artist wiki with key bio & style details...',
  'boldlocal-gbp':  'System: Optimize your Google Business Profile for local reach...'
};

exports.handler = async (event) => {
  const { botId, message } = JSON.parse(event.body);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: BOT_PROMPTS[botId] },
        { role: 'user',   content: message }
      ]
    })
  });

  const { choices } = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ reply: choices[0].message.content })
  };
};
