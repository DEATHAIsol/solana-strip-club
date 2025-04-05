// Map of trigger words/phrases to their automated responses
const automatedResponses = new Map<string[], string>([
  // Social Media
  [['twitter', 'twt', 'tweet', 'x', 'x.com'], 'Follow us on X: x.com/solanastrip'],
  [['discord', 'dc', 'disc'], 'Join our Discord: discord.gg/solanastrip'],
  
  // Contract/Trading Info
  [['ca', 'contract', 'contract address', 'address', 'token', 'token address'], 'View our token on DEXScreener: dexscreener.com/solana/youraddresshere'],
  [['chart', 'charts', 'price', 'market', 'market cap'], 'Check our live charts: dexscreener.com/solana/youraddresshere'],
  [['buy', 'where to buy', 'how to buy', 'purchase', 'get'], 'Buy on Raydium: raydium.io/swap'],
  
  // Project Info
  [['website', 'site', 'web', 'homepage'], 'Visit our website: solanastrip.com'],
]);

// Function to check if message contains any trigger words and get automated response
export function getAutomatedResponse(message: string): string | null {
  if (!message || typeof message !== 'string') {
    return null;
  }

  // Convert message to lowercase for case-insensitive matching
  const lowerMessage = message.toLowerCase().trim();

  // Check each set of trigger words
  for (const [triggers, response] of automatedResponses) {
    // If any trigger word is found in the message
    if (triggers.some(trigger => {
      try {
        // Create a regex to match the word (with word boundaries)
        const regex = new RegExp(`\\b${trigger}\\b`, 'i');
        return regex.test(lowerMessage);
      } catch (error) {
        console.error('Error creating regex for trigger:', trigger, error);
        return false;
      }
    })) {
      return response;
    }
  }

  // No triggers matched
  return null;
}

// Function to check if a message is a command (starts with !)
export function isCommand(message: string): boolean {
  if (!message || typeof message !== 'string') {
    return false;
  }
  return message.trim().startsWith('!');
}

// Function to handle command messages
export function handleCommand(message: string): string | null {
  if (!message || typeof message !== 'string') {
    return null;
  }

  // Remove the ! and trim
  const command = message.slice(1).toLowerCase().trim();

  // Check if any trigger words match the command
  for (const [triggers, response] of automatedResponses) {
    if (triggers.includes(command)) {
      return response;
    }
  }

  return null;
} 