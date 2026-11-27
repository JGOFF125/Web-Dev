# CPRG 306 Assignments

Coursework for CPRG 306: Web Development 2

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the assignments page or [http://localhost:3000/week-2](http://localhost:3000/week-2) for Week 2

## Week 10

Week 10 keeps the Week 9 sign-in and meal ideas, and saves each account's groceries in Cloud Firestore at `users/{userId}/items/{itemId}`

Copy `.env.example` to `.env.local` to use the existing Firebase web app configuration, then open `/week-10`

### Firebase setup

1. Open the `web-dev-week-9` project in Firebase Console
2. Under Build → Firestore Database, create the default **Standard edition** database in **production mode** if it does not exist
3. Review any existing rules before publishing the rules in `firestore.rules`
4. Use the Rules tab to publish them, or sign in with the Firebase CLI and run:

```bash
npx firebase-tools@15.37.0 login
npx firebase-tools@15.37.0 deploy --only firestore:rules --project web-dev-week-9
```

The rules allow users to access only their own groceries and validate the item's three fields, name length, quantity from 1 to 20, and eleven categories

A failed load shows a retry button and prevents adding items until the list loads, while a failed save keeps the form filled in

### Checks

Use Node.js 24.12 or later for the test tools and Java 21 for the Firestore emulator

```bash
npm ci
npm run lint
npm test
npx firebase-tools@15.37.0 emulators:exec --only firestore --project demo-week-10 "npm run test:firestore"
npm run build
```

The database tests run against the local emulator with a demo project and do not write to the live Firebase project

For a live check, sign in, add a grocery, refresh to confirm it remains, then sign out and verify a second account has its own list
