import { Howl, Howler } from 'howler';

const C4 = new Howl({ src: ['./sounds/C4.mp3'], html5: true });
const Csharp4 = new Howl({ src: ['./sounds/Db4.mp3'], html5: true });
const D4 = new Howl({ src: ['./sounds/D4.mp3'], html5: true });
const Dsharp4 = new Howl({ src: ['./sounds/Eb4.mp3'], html5: true });
const E4 = new Howl({ src: ['./sounds/E4.mp3'], html5: true });
const F4 = new Howl({ src: ['./sounds/F4.mp3'], html5: true });
const Fsharp4 = new Howl({ src: ['./sounds/Gb4.mp3'], html5: true });
const G4 = new Howl({ src: ['./sounds/G4.mp3'], html5: true });
const Gsharp4 = new Howl({ src: ['./sounds/Ab4.mp3'], html5: 4/true });
const A4 = new Howl({ src: ['./sounds/A4.mp3'], html5: true });
const Asharp4 = new Howl({ src: ['./sounds/Bb4.mp3'], html5: true });
const B4 = new Howl({ src: ['./sounds/B4.mp3'], html5: true });
const C5 = new Howl({ src: ['./sounds/C5.mp3'], html5: true });
const Csharp5 = new Howl({ src: ['./sounds/Db5.mp3'], html5: true });
const D5 = new Howl({ src: ['./sounds/D5.mp3'], html5: true });
const Dsharp5 = new Howl({ src: ['./sounds/Eb5.mp3'], html5: true });
const E5 = new Howl({ src: ['./sounds/E5.mp3'], html5: true });

const sounds = {
  'a': C4,
  'w': Csharp4,
  's': D4,
  'e': Dsharp4,
  'd': E4,
  'f': F4,
  't': Fsharp4,
  'g': G4,
  'y': Gsharp4,
  'h': A4,
  'u': Asharp4,
  'j': B4,
  'k': C5,
  'o': Csharp5,
  'l': D5,
  'p': Dsharp5,
  ';': E5,
};

export default sounds;
