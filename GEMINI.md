# GEMINI.md - Project Context & Instructions

## Project Overview
This is a Google Chrome Extension named **"A调整网站" (Adjust Website)**. Its primary purpose is to programmatically adjust web page layouts and automate form interactions on specific websites.

- **Current Focus:** The extension is configured to interact with `https://bm.baofoo.com/*`, specifically auto-filling `memberId` and `username` fields based on URL parameters.
- **Legacy/General Purpose:** The `README.md` indicates a broader goal of "cleaning up" noisy technical websites like CSDN, StackOverflow, and 知乎 by removing ads and unnecessary UI elements.
- **Tech Stack:** 
    - **Manifest Version:** 3 (Chrome Extension MV3).
    - **Languages:** JavaScript (Vanilla).
    - **Core Logic:** Content scripts (`adjust.js`) injected into matched pages.

## Project Structure
- `manifest.json`: Configuration for permissions, content scripts, and extension metadata.
- `adjust.js`: The main content script containing logic for DOM manipulation and automation.
- `background.js`: Background/Service worker script (currently contains legacy MV2 code that may need updating to MV3 `chrome.action`).


## Running the Project
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **"Developer mode"** in the top right corner.
3. Click **"Load unpacked"**.
4. Select the project root directory (`adjust_website_chrome_extension`).
5. The extension is now active. It will automatically run on URLs matching the patterns defined in `manifest.json`.

## Development Conventions
### Polling Mechanism
The extension often deals with dynamic content that might not be available immediately on `DOMContentLoaded`. It uses a polling strategy in `adjust.js`:
- `setInterval` runs every 250ms (or 50ms) to attempt adjustments.
- A `setTimeout` clears the interval after 10 seconds to prevent indefinite CPU usage.

### Utility Functions
`adjust.js` contains several reusable utility functions:
- `isHrefContainAnyStrInArr(arr)`: Checks if the current URL matches patterns.
- `removeElementsByIdArr(arr)` / `removeElementsByClassArr(arr)`: Batch removal of DOM elements.
- `simulateTyping(input, text, options)`: Simulates human-like typing (async).

### Manifest V3 Migration Note
The project uses `manifest_version: 3`. However, `background.js` currently uses `chrome.browserAction`, which is a Manifest V2 API. For full MV3 compatibility, this should be migrated to `chrome.action` if functionality is added to the background script.

## TODOs / Future Work
- [ ] Migrate `background.js` to use `chrome.action` for MV3 compliance.
- [ ] Restore or expand support for the sites mentioned in `README.md` (CSDN, StackOverflow, etc.).
- [ ] Refine the `simulateTyping` logic for complex form validations.
