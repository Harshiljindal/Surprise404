# Birthday Surprise Website

A special interactive birthday website with a terminal-style login, birthday celebrations, and a memory game!

## Features

- Terminal-style login with typewriter effect and sound
- Beautiful birthday celebration home page with:
  - Confetti animation
  - Photo gallery carousel
  - Memory wall with sticky notes
  - Background music
- Fun memory card game

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Add required sound effects:
Place the following sound files in `src/assets/sounds/`:
- `typewriter.mp3` - For keyboard typing effect
- `error.mp3` - For access denied sound
- `birthday-song.mp3` (optional) - For background music

3. Add your images:
Place family photos in `src/assets/images/` named as:
- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`
- `photo4.jpg`
- `photo5.jpg`

4. Run the development server:
```bash
npm run dev
```

## Login Credentials
- Secret word: "chimera"
- Baby language for hand: "haat"
- Best brother: "my brother is best"

## Technologies Used
- React with TypeScript
- Vite
- Styled Components
- Framer Motion
- React Router
- React Confetti
- Typewriter Effect
- Howler.js

## Development
To modify the website:
- Update the messages in `src/pages/Home.tsx`
- Change the memory notes in the Memory Wall section
- Modify the game in `src/pages/Game.tsx`
- Update styling in each component's styled-components

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
