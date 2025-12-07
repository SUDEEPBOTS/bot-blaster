'use server'

interface BroadcastResult {
  success: boolean;
  message: string;
}

// 1. Function to Set Webhook (Automatic)
export async function setBotWebhook(token: string, domainUrl: string) {
  try {
    const url = `https://api.telegram.org/bot${token}/setWebhook?url=${domainUrl}/api/webhook`;
    await fetch(url);
    return true;
  } catch (error) {
    return false;
  }
}

// 2. Main Blaster Function (Ultra Fast)
export async function broadcastMessage(
  tokens: string[],
  chatId: string,
  message: string,
  count: number
): Promise<BroadcastResult> {
  
  if (!tokens.length || !chatId || !message) {
    return { success: false, message: "Missing Details" };
  }

  try {
    const promises = [];

    // Loop through all bots
    for (const token of tokens) {
      // Loop for Repeat Count
      for (let i = 0; i < count; i++) {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        
        // Push request to array (Parallel Processing)
        promises.push(
          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'HTML'
            }),
            cache: 'no-store' // Important for speed
          })
        );
      }
    }

    // Fire all requests at once!
    await Promise.all(promises);

    return { 
      success: true, 
      message: `Sent ${promises.length} messages successfully.` 
    };

  } catch (error) {
    return { success: false, message: "Network Error" };
  }
              }
