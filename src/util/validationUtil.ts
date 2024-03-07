export function validateInputChatbotPromptPattern(input: string) {
    // Split the input into lines
    const lines = input.split("\n");

    // Define the regex pattern for "key:value"
    // This pattern checks for one or more non-colon characters followed by a colon,
    // then one or more characters (the value part).
    const pattern = /^[^:]+:[^:]+$/;

    // Check each line against the pattern
    for (const line of lines) {
        if (!pattern.test(line.trim())) {
            // If any line doesn't match, return false
            return false;
        }
    }

    // If all lines match the pattern, return true
    return true;
}
