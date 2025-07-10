// Test script to verify Android 8 detection
// Run this in browser console to test different user agents

function testAndroidDetection(userAgent) {
  console.log("Testing User-Agent:", userAgent);

  // Test middleware logic
  const isAndroid = /android/i.test(userAgent);

  if (isAndroid) {
    const androidPatterns = [
      /Android\s+(\d+)(?:\.(\d+))?/i,
      /Android[\s\/](\d+)/i,
      /;\s*wv\).*Android\s+(\d+)/i,
    ];

    let majorVersion = null;

    for (const pattern of androidPatterns) {
      const match = userAgent.match(pattern);
      if (match && match[1]) {
        majorVersion = parseInt(match[1], 10);
        break;
      }
    }

    console.log("Detected Android version:", majorVersion);

    if (majorVersion === 8) {
      console.log("✅ Would redirect Android 8");
      return true;
    } else {
      console.log("❌ Would NOT redirect (not Android 8)");
      return false;
    }
  } else {
    console.log("❌ Would NOT redirect (not Android)");
    return false;
  }
}

// Test cases
console.log("=== Testing Android 8 Detection ===");

testAndroidDetection(
  "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F) AppleWebKit/537.36"
);
testAndroidDetection(
  "Mozilla/5.0 (Linux; Android 8.1.0; Pixel 2) AppleWebKit/537.36"
);
testAndroidDetection(
  "Mozilla/5.0 (Linux; Android 9.0; SM-G960F) AppleWebKit/537.36"
);
testAndroidDetection(
  "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36"
);
testAndroidDetection(
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15"
);
testAndroidDetection(
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
);

console.log("=== Test Complete ===");
