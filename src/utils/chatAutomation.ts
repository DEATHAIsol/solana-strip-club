const COMMAND_PREFIX = '!';

// Map of trigger words/phrases to their automated responses
const automatedResponses = new Map<string[], string>([
  // Social Media
  [['twitter', 'twt', 'tweet', 'x', 'x.com'], 'Follow us on X: x.com/solanastrip'],
  
  // Contract/Trading Info
  [['ca', 'contract', 'contract address', 'address', 'token', 'token address'], 'View our token on DEXScreener: dexscreener.com/solana/youraddresshere'],
  [['chart', 'charts', 'price', 'market', 'market cap'], 'Check our live charts: dexscreener.com/solana/youraddresshere'],
  [['buy', 'where to buy', 'how to buy', 'purchase', 'get'], 'Buy on Raydium: raydium.io/swap'],
  
  // Project Info
  [['website', 'site', 'web', 'homepage'], 'Visit our website: solanastrip.com'],
]);

// Function to check if message contains any trigger words and get automated response
export function getAutomatedResponse(message: string): string | null {
  // Convert to lowercase for checking
  const lowerMessage = message.toLowerCase().trim();

  // Social Media
  if (lowerMessage.includes('twitter') || lowerMessage.includes('twt') || 
      lowerMessage.includes('tweet') || lowerMessage.includes('x') || 
      lowerMessage === 'x.com') {
    return 'Follow us on X: x.com/solanastrip';
  }

  // Contract/Trading Info
  if (lowerMessage.includes('ca') || lowerMessage.includes('contract') || 
      lowerMessage.includes('contract address') || lowerMessage.includes('address') || 
      lowerMessage.includes('token') || lowerMessage.includes('token address')) {
    return 'View our token on DEXScreener: dexscreener.com/solana/youraddresshere';
  }

  if (lowerMessage.includes('chart') || lowerMessage.includes('charts') || 
      lowerMessage.includes('price') || lowerMessage.includes('market') || 
      lowerMessage.includes('market cap')) {
    return 'Check our live charts: dexscreener.com/solana/youraddresshere';
  }

  if (lowerMessage.includes('buy') || lowerMessage.includes('where to buy') || 
      lowerMessage.includes('how to buy') || lowerMessage.includes('purchase') || 
      lowerMessage.includes('get')) {
    return 'Buy on Raydium: raydium.io/swap';
  }

  // Project Info
  if (lowerMessage.includes('website') || lowerMessage.includes('site') || 
      lowerMessage.includes('web') || lowerMessage.includes('homepage')) {
    return 'Visit our website: solanastrip.com';
  }

  return null;
}

// Function to check if a message is a command (starts with !)
export function isCommand(message: string): boolean {
  return false;
}

// Function to handle command messages
export async function handleCommand(message: string): Promise<string | null> {
  return null;
} 