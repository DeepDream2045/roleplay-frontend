// src/lib/googleOAuthHelpers.ts

export const getAuthURL = (): string => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create parameters as an array of arrays
    const params = [
        ["redirect_uri", process.env.GOOGLE_REDIRECT_URI!],
        ["client_id", process.env.GOOGLE_CLIENT_ID!],
        ["access_type", "offline"], // This prompts users for consent to the requested scopes and returns a refresh token
        ["response_type", "code"],
        ["prompt", "consent"], // This ensures that the consent screen is displayed to users
        ["scope", "email profile"],
        ["state", "some_state"],
        ["nonce", "some_nonce"],
        // Include any other necessary parameters
    ];

    const qs = new URLSearchParams(params);

    return `${rootUrl}?${qs.toString()}`;
};
