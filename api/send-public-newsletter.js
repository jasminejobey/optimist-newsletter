import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Daily themes rotation - 7 days a week
const themes = [
  {
    focus: "wealth consciousness",
    prompt: "Write a powerful 3-5 minute reading about rewiring your subconscious for wealth and abundance. Include a real story about Elon Musk, Jeff Bezos, Jensen Huang, or another billionaire entrepreneur that illustrates abundance mindset in action. Reference neuroscience or insights from Dr. Joe Dispenza, Dr. Bruce Lipton, or similar researchers about how belief and consciousness shape reality. Write in present tense addressing the reader directly. CRITICAL: Write a complete article with a natural introduction, body, and a concluding paragraph that ties everything together and leaves the reader inspired. No hashtags, no bold formatting, no instructions to the reader. The conclusion should synthesize the key insights and end on an empowering note about the reader's potential."
  },
  {
    focus: "impact and legacy",
    prompt: "Create an inspiring 3-5 minute reading about making world-changing impact. Share a real, specific story about someone like Steve Jobs, Oprah Winfrey, Bill Gates, or Sam Altman who created massive value and changed millions of lives. Include scientific insights from Dr. Joe Dispenza about quantum fields, epigenetics, or consciousness research. Write addressing the reader directly in present tense. CRITICAL: Write a complete article with a natural introduction, body, and a concluding paragraph that ties everything together and leaves the reader inspired. No hashtags, no bold formatting. The conclusion should synthesize the key insights and end on an empowering note."
  },
  {
    focus: "magnetic success",
    prompt: "Write a compelling 3-5 minute piece about being magnetic to success, wealth, and amazing people. Use a real, detailed example from someone like Richard Branson, Sara Blakely, Elon Musk, or Mark Cuban showing how they attracted opportunities. Include neuroscience about the reticular activating system, mirror neurons, or insights from Dr. Joe Dispenza. Write addressing the reader directly in present tense. CRITICAL: Write a complete article with a natural introduction, body, and a concluding paragraph that ties everything together. No hashtags, no bold formatting. The conclusion should synthesize the key insights and end on an empowering note about becoming magnetic to success."
  },
  {
    focus: "quantum abundance",
    prompt: "Compose a transformative 3-5 minute reading about quantum leaps in wealth and opportunity. Share a real story of massive breakthrough success (e.g., Nvidia's Jensen Huang, MacKenzie Scott, Brian Chesky/Airbnb). Reference Dr. Joe Dispenza's work on the quantum field or Dr. Bruce Lipton's insights on epigenetics. Write addressing the reader directly in present tense. CRITICAL: Write a complete article with a natural introduction, body, and a concluding paragraph that ties everything together. No hashtags, no bold formatting. The conclusion should synthesize the key insights and end on an empowering note about quantum leaps in abundance."
  },
  {
    focus: "inevitable success",
    prompt: "Write an energizing 3-5 minute reading about success as an inevitable outcome. Use a real example from someone like Sam Altman, Mark Zuckerberg, Taylor Swift, or another visionary. Include scientific backing from neuroscience or quantum physics (Dr. Joe Dispenza, Dr. Bruce Lipton). Write addressing the reader directly in present tense. CRITICAL: Write a complete article with a natural introduction, body, and a concluding paragraph that ties everything together. No hashtags, no bold formatting. The conclusion should synthesize the key insights and end on an empowering note about inevitable success."
  },
  {
    focus: "exponential growth",
    prompt: "Create a powerful 3-5 minute reading about exponential growth in wealth and impact. Share a real story from someone like Jeff Bezos, Mark Cuban, or Jensen Huang building from startup to massive scale. Include Dr. Joe Dispenza's insights on neuroplasticity. Write addressing the reader directly in present tense. CRITICAL: Write a complete article with a natural introduction, body, and a concluding paragraph that ties everything together. No hashtags, no bold formatting. The conclusion should synthesize the key insights and end on an empowering note about exponential growth."
  },
  {
    focus: "limitless potential",
    prompt: "Write an inspiring 3-5 minute reading about breaking through limitations. Use a real example from someone like Elon Musk, Oprah, or similar breakthrough stories. Reference Dr. Joe Dispenza or Dr. Bruce Lipton's work on belief and biology. Write addressing the reader directly in present tense. CRITICAL: Write a complete article with a natural introduction, body, and a concluding paragraph that ties everything together. No hashtags, no bold formatting. The conclusion should synthesize the key insights and end on an empowering note about limitless potential."
  }
];

async function generateContent() {
  const today = new Date();
  const themeIndex = today.getDay() % themes.length;
  const todayTheme = themes[themeIndex];

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        messages: [
          {
            role: "user",
            content: `${todayTheme.prompt}\n\nIMPORTANT GUIDELINES:\n- Length: 3-5 minutes reading time (approximately 600-800 words)\n- Use REAL, SPECIFIC stories with concrete details and names\n- Include actual research or quotes from Dr. Joe Dispenza, Dr. Bruce Lipton, or similar scientists\n- Write addressing the reader directly in present tense\n- Be specific with numbers, dates, examples when possible\n- MUST include a proper concluding paragraph that wraps up the insights\n- Keep it concise but powerful and complete`
          }
        ],
      })
    });

    const data = await response.json();
    console.log('Anthropic API response:', JSON.stringify(data));
    
    let content = "";
    if (data && data.content && Array.isArray(data.content)) {
      const textBlock = data.content.find(item => item.type === "text");
      content = textBlock ? textBlock.text : "";
      console.log('Extracted content length:', content.length);
    } else {
      console.log('No content in response:', data);
    }
    
    return {
      theme: todayTheme.focus,
      content: content,
      date: today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

function createEmailHTML(generatedContent) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Morning Abundance</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <div style="font-size: 48px; margin-bottom: 10px;">☀️</div>
      <h1 style="color: #f59e0b; font-size: 32px; margin: 0 0 10px 0; font-weight: 700;">
        Morning Abundance
      </h1>
      <p style="color: #6b7280; margin: 0; font-size: 14px;">
        ${generatedContent.date}
      </p>
    </div>
    
    <!-- Theme Badge -->
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 16px 24px; border-radius: 12px; margin-bottom: 32px; border-left: 4px solid #f59e0b;">
      <p style="color: #92400e; margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">
        Today's Focus: ${generatedContent.theme}
      </p>
    </div>
    
    <!-- Content (NO affirmations section) -->
    <div style="line-height: 1.8; color: #1f2937; font-size: 16px;">
      <div style="white-space: pre-wrap; font-family: Georgia, 'Times New Roman', serif;">
${generatedContent.content}
      </div>
    </div>
    
    <!-- Footer -->
    <div style="margin-top: 48px; padding-top: 24px; border-top: 2px solid #f3f4f6; text-align: center;">
      <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 500;">
          ⏱️ 3-5 minute read • ✨ Daily insights on abundance and success
        </p>
      </div>
      
      <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px 0;">
        Morning Abundance Newsletter
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export default async function handler(req, res) {
  try {
    const subscriberEmail = req.query.email || process.env.PUBLIC_SUBSCRIBER_EMAIL;
    
    if (!subscriberEmail) {
      return res.status(400).json({ error: 'Email parameter required' });
    }
    
    console.log('Generating daily content...');
    const content = await generateContent();
    
    const emailHTML = createEmailHTML(content);
    
    console.log('Sending email to:', subscriberEmail);
    await resend.emails.send({
      from: 'Morning Abundance <onboarding@resend.dev>',
      to: subscriberEmail,
      subject: `☀️ Morning Abundance - ${content.date.split(',')[0]}`,
      html: emailHTML
    });
    
    console.log('Email sent successfully!');
    
    return res.status(200).json({ 
      success: true,
      date: content.date,
      theme: content.theme,
      message: 'Public newsletter sent successfully'
    });
    
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return res.status(500).json({ 
      error: 'Failed to send newsletter',
      details: error.message 
    });
  }
}
