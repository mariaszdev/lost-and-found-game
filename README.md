# Lost & Found Game 🕵️‍♀️🐾

A browser-based deduction game where players try to find which room each item is in using logical clues.
Designed to practice English vocabulary.
A browser-based deduction game where players try to discover which room each item is hidden in—using logic and visual clues.  
Designed to help practice English vocabulary in a playful way.

## ✨ Features

- 🎲 Randomized item and room assignments
- 🧩 Clue generation based on room properties
- ✅ Interactive UI with feedback on guesses
- 🖼️ Visual representation of rooms
- ⚙️ Expandable settings and customization options

## Tech Stack

- ⚛️ React with Next.js
- 💨 Tailwind CSS
- 🧪 TypeScript
- 📁 JSON-based room and item data structure

## Development

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### 📁 File Structure

- `components/` - React components like `LostItemsGame`, `ItemCard`, `StartGamePanel`, and `Rooms`
- `data/` - Game data: `items.json`, `rooms.json`, `roomProperties.json`
- `utils/` - Helper functions (e.g., `generateClue.ts`)
- `public/rooms/` - Room images

## 🧪 Upcoming Features

- 📘 How to Play section
- 💾 Save game state (cookies or localStorage)
- ✏️ Add your own custom list of items
- 🔍 Clickable room images that enlarge
- 🇩🇪 German translation hover tooltips
- 🎞️ Animations using Framer Motion (e.g. animated point reductions)
- 🔊 Optional audio of clues.
- 🦻 Improved accessibility features: e.g. text-based list of room properties
- 🤝 Collaborative or competitive game modes
- 🏁 Game Over screen with results summary

## Credits

- Room illustrations by [marcolivolsi04 on Vecteezy](https://www.vecteezy.com/members/marcolivolsi04)
