// List of banned words and phrases
const bannedWords = [
  // Investment/Trading Scam Terms
  'pump and dump',
  'pump & dump',
  'pump scheme',
  'dumping tokens',
  'price manipulation',
  'market manipulation',
  'fake volume',
  'wash trading',
  'insider trading',
  'price fixing',
  'artificial pump',
  'coordinated pump',
  'coordinated dump',
  'bot trading',
  'trading bot',
  'price bot',

  // Project Red Flags
  'rug pull',
  'rugpull',
  'soft rug',
  'slow rug',
  'stealth rug',
  'exit scam',
  'honeypot',
  'honey pot',
  'ponzi',
  'ponzi scheme',
  'pyramid scheme',
  'mlm scheme',
  'quick rich',
  'get rich quick',
  'guaranteed profit',
  'guaranteed return',
  '100x guaranteed',
  'easy money',
  'double your money',
  'triple your money',
  'multiply your investment',
  
  // Token/Contract Issues
  'token dump',
  'liquidity pull',
  'liquidity pulled',
  'no liquidity',
  'fake contract',
  'contract scam',
  'malicious contract',
  'backdoor',
  'hidden mint',
  'infinite mint',
  'mint exploit',
  'ownership not renounced',
  'unrenounced contract',
  'contract vulnerability',
  'vulnerable contract',
  'unstable contract',
  'unaudited contract',
  'copy paste contract',
  'stolen contract',
  'hidden fee',
  'excessive fee',
  'tax scam',
  'high tax',
  'reflection scam',
  'rebase scam',
  
  // Team/Developer Red Flags
  'fake team',
  'anonymous team',
  'unknown team',
  'hidden team',
  'fake kyc',
  'no kyc',
  'fake doxx',
  'undoxxed team',
  'ghost developer',
  'ghost developers',
  'fake developer',
  'untrusted developer',
  'untrusted developers',
  'unverified developer',
  'unverified developers',
  'team wallet',
  'dev wallet',
  'insider wallet',
  'whale wallet',
  
  // Marketing/Community Red Flags
  'fake marketing',
  'bot marketing',
  'paid shills',
  'paid promotion',
  'undisclosed promotion',
  'fake partnership',
  'fake partnerships',
  'fake collaboration',
  'fake announcement',
  'fake news',
  'fake ama',
  'fake verification',
  'fake audit',
  'fake certificate',
  'fake endorsement',
  'fake influencer',
  'paid influencer',
  'bought followers',
  'fake followers',
  'fake community',
  'bot community',
  'toxic community',
  'fake engagement',
  'fake volume',
  'fake trading',
  'fake listing',
  'fake exchange',
  'unregistered exchange',
  'unlicensed exchange',
  
  // Project Status Red Flags
  'dead project',
  'abandoned project',
  'inactive project',
  'no development',
  'delayed development',
  'fake roadmap',
  'missed deadline',
  'broken promise',
  'empty promise',
  'false promise',
  'misleading roadmap',
  'unrealistic timeline',
  'unrealistic promise',
  'unrealistic promises',
  'no utility',
  'fake utility',
  'no use case',
  'weak use case',
  'copied project',
  'clone project',
  'fork scam',
  'fake fork',
  'unauthorized fork',
  
  // Common Scam Phrases
  'too good to be true',
  'act fast',
  'act now',
  'limited time',
  'exclusive offer',
  'private sale',
  'presale scam',
  'whitelist scam',
  'allocation scam',
  'investment opportunity',
  'guaranteed opportunity',
  'once in a lifetime',
  'dont miss out',
  'last chance',
  'urgent investment',
  'secret project',
  'hidden gem',
  'next moonshot',
  'easy moonshot',
  'guaranteed moonshot',
  // Add more banned words here
];

// Create a regex pattern for matching phrases and words
const bannedWordsRegex = new RegExp(
  bannedWords
    .map(word => word.includes(' ') ? word : `\\b${word}\\b`) // Handle multi-word phrases
    .join('|'),
  'gi'
);

export function moderateMessage(message: string): {
  isAllowed: boolean;
  moderatedMessage: string;
  reason?: string;
} {
  // Check for banned words and phrases
  if (bannedWordsRegex.test(message)) {
    // Replace banned words with asterisks
    const moderatedMessage = message.replace(bannedWordsRegex, match => '*'.repeat(match.length));
    return {
      isAllowed: false,
      moderatedMessage,
      reason: 'Message contains banned words or phrases'
    };
  }

  // Add more moderation rules here if needed
  // For example:
  // - Message length limits
  // - Spam detection
  // - Link detection
  // - etc.

  return {
    isAllowed: true,
    moderatedMessage: message
  };
} 