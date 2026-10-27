HOORSOCIAL - BEGINNER STARTER PROJECT

What this is:
- A React Native / Expo Android app starter.
- Demo screens: Home feed, Stories, Like buttons, create-caption post, profile/follow demo, reels preview, local demo chat.
- Demo data is kept in app memory. It is NOT online or shared between users.
- Real accounts, uploads, online followers, and private messaging require a secure backend and are not implemented yet.

RECOMMENDED NEXT STEPS
1. Create an Expo account at https://expo.dev/
2. Put this project in a cloud coding workspace that supports Node.js and a terminal, or use a laptop with Node.js installed.
3. In the project folder run:
   npm install
   npx expo start
4. To create an installable APK using Expo EAS:
   npm install --global eas-cli
   eas login
   eas build:configure
5. Check eas.json. This project already has a "preview" profile configured for APK output.
6. Run:
   eas build --platform android --profile preview
7. Follow the prompts and wait for the cloud build URL. Download the APK from the build page and install it on your Android phone.

Notes:
- Expo EAS offers a limited free monthly build quota; quotas and terms can change.
- Do not share account passwords or private signing keys.
- Google Play publishing is separate and may require a developer registration fee.
