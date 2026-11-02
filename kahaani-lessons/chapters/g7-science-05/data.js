const BOOK_TITLE = "Jugnu and the Million Lamps of Kashi";
const GRADE = "7";
const BOOK = {"name": "Curiosity", "short": "Curiosity", "part": "Science", "key": "kc-g7-science", "subj": "Science", "minimal": true, "lang": "en"};
const CHAPTERS = [];
CHAPTERS.push({
 "no": 5,
 "title": "Changes Around Us: Physical and Chemical",
 "story": "Jugnu and the Million Lamps of Kashi",
 "intro": "It is Dev Deepawali in Varanasi, and Ganga Dadi has promised to light a lakh of diyas on the ghat steps before the moon rises. Wax melts, wicks burn, iron chains rust, lime water turns milky and the river quietly wears down the rocks. Jugnu the firefly, whose own tail glows by a chemical change, leads Nalini and Prithvi from lamp to lamp. Sort every change you meet into physical or chemical, and help light up Kashi!",
 "theme": {
  "scene": "k7s5_ghat",
  "guide": "k7s5_firefly",
  "guideName": "Jugnu",
  "unit": "Lamp",
  "doneStamp": "LAMP LIT",
  "badge": "Keeper of the Ghat Lamps"
 },
 "people": {
  "k7s5_nalini": {
   "name": "Nalini",
   "skin": "#b97a4e",
   "hair": "long",
   "bg": "#e04a86",
   "shirt": "#f4a51c"
  },
  "k7s5_prithvi": {
   "name": "Prithvi",
   "skin": "#9a6240",
   "hair": "short",
   "bg": "#35c29a",
   "shirt": "#62b6e8"
  },
  "k7s5_dadi": {
   "name": "Ganga Dadi",
   "skin": "#a86c45",
   "hair": "bun",
   "bg": "#f4a51c",
   "shirt": "#f2efe6"
  }
 },
 "cases": [
  {
   "title": "Changes on the Ghat Steps",
   "sec": "5.1 A Substance May Change in Appearance but Remain the Same!",
   "icon": "<svg viewBox='0 0 48 48'><path d='M10 30 Q24 44 38 30 Q32 26 24 26 Q16 26 10 30Z' fill='#b8643a'/><path d='M24 24 Q30 16 24 6 Q18 16 24 24Z' fill='#f4a51c'/><rect x='6' y='38' width='36' height='4' rx='2' fill='#62b6e8'/></svg>",
   "brief": "Ice melts, buds bloom, bananas brown. Jugnu sorts the changes we notice, then shows changes where the substance stays the same.",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "Namaste! I'm Jugnu, the firefly of the Kashi ghats. Tonight is Dev Deepawali and everything around us is changing. Look closely with me!",
     "note": "Changes happen all around us: in size, shape, state, colour, smell or other properties of things.",
     "xs": [
      "An ice cube placed half an hour ago has become water.",
      "A rose bud seen yesterday has become a flower today.",
      "A bottle of cold water is not cold anymore.",
      "A banana with a few brown spots now has more spots and a strong smell."
     ],
     "v": {
      "k": "lines",
      "l": [
       "Ice cube → water",
       "Rose bud → flower",
       "Cold bottle → not cold",
       "Banana → more brown spots + strong smell"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Dadi kept bananas for the prasad yesterday. Today they look and smell different!",
     "q": "In the banana example, which properties of the banana changed?",
     "o": [
      "Only its size",
      "Its colour and its smell",
      "Nothing changed",
      "Only its shape"
     ],
     "a": 1,
     "h": "What did the student see and what did the student smell?",
     "xs": [
      "The student saw more brown spots: the colour changed.",
      "The student noticed a strong smell: the smell changed.",
      "So colour and smell both changed."
     ],
     "ref": "Opening, p. 57",
     "v": {
      "k": "lines",
      "l": [
       "Yesterday: a few brown spots",
       "Today: more brown spots…",
       "…and a strong smell",
       "Which properties changed?"
      ]
     }
    },
    {
     "t": "o",
     "kind": "Activity",
     "who": "k7s5_dadi",
     "say": "Beta, before the lamps are lit, look at each change in our kitchen and on the ghat. Write what you notice.",
     "q": "Activity 5.1: Record your observations for each change in Table 5.1 — melting ice cubes, chopping vegetables, boiling water, making popcorn, cutting paper, adding beetroot extract to water, burning wood, drying wet clothes, making dough balls, rolling them into chapatis.",
     "xs": [
      "Melting ice: solid ice becomes liquid water (state changes).",
      "Chopping vegetables, cutting paper: size and shape change.",
      "Boiling water: liquid water turns into steam (state changes).",
      "Popcorn: corn puffs up — size, shape, taste and smell change.",
      "Beetroot extract: the water turns pink-red (colour changes).",
      "Burning wood: wood turns to ash and smoke, gives heat and light, smells.",
      "Drying clothes: water evaporates from the cloth.",
      "Dough balls and chapatis: only the shape of the dough changes."
     ],
     "ref": "Activity 5.1, Table 5.1, p. 58",
     "v": {
      "k": "table",
      "head": [
       "Change",
       "What changes?"
      ],
      "rows": [
       [
        "Melting ice cubes",
        "state"
       ],
       [
        "Chopping vegetables",
        "size, shape"
       ],
       [
        "Boiling water",
        "state"
       ],
       [
        "Corn → popcorn",
        "size, shape, smell"
       ],
       [
        "Beetroot extract in water",
        "colour"
       ],
       [
        "Burning wood",
        "ash, smoke, heat, light"
       ],
       [
        "Drying wet clothes",
        "water evaporates"
       ],
       [
        "Dough balls → chapatis",
        "shape"
       ]
      ],
      "cap": "Table 5.1 — sample observations"
     }
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "I dropped beetroot extract into a glass of water for the rangoli colour.",
     "q": "What change do you observe when beetroot extract is added to water?",
     "o": [
      "The water boils",
      "The water freezes",
      "The water becomes smaller",
      "The colour of the water changes"
     ],
     "a": 3,
     "h": "Which of your senses notices it first?",
     "xs": [
      "We see the change with our eyes.",
      "The clear water turns pinkish red.",
      "So the colour of the water changes."
     ],
     "ref": "Table 5.1, p. 58",
     "v": {
      "k": "table",
      "head": [
       "Change",
       "What changes?"
      ],
      "rows": [
       [
        "Adding beetroot extract to water",
        "?"
       ]
      ]
     }
    },
    {
     "t": "s",
     "who": "guide",
     "say": "How do we notice changes? With our senses! Sight, smell, touch, hearing and taste.",
     "note": "We observe changes with our senses of sight, smell, touch, hearing and taste.",
     "xs": [
      "Sight: the banana turns brown.",
      "Smell: it smells strong.",
      "Touch: the bottle no longer feels cold.",
      "Hearing: popcorn goes pop-pop!",
      "Taste: ripe fruit tastes sweeter."
     ],
     "v": {
      "k": "lines",
      "l": [
       "👁 sight",
       "👃 smell",
       "✋ touch",
       "👂 hearing",
       "👅 taste"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Dadi is making popcorn for the boatmen. Pop, pop, pop!",
     "q": "Which sense tells you the corn is popping, even with your eyes closed?",
     "o": [
      "Hearing",
      "Taste",
      "Sight",
      "Touch"
     ],
     "a": 0,
     "h": "Pop-pop is a sound.",
     "xs": [
      "The popping makes a sound.",
      "Sound is sensed by hearing.",
      "Smell also tells us the popcorn is ready!"
     ],
     "ref": "p. 58",
     "v": {
      "k": "lines",
      "l": [
       "corn + heat",
       "pop! pop! pop!",
       "Which sense?"
      ]
     }
    },
    {
     "t": "o",
     "kind": "Think",
     "who": "guide",
     "say": "Can you think of more changes around you? And can we arrange them into groups?",
     "q": "Make a list of some other changes that happen in your surroundings.",
     "xs": [
      "Leaves turning yellow and falling.",
      "Milk turning into curd.",
      "A candle getting shorter as it burns.",
      "Puddles drying up after rain.",
      "An iron gate getting rusty.",
      "We will now try to sort such changes into groups."
     ],
     "ref": "p. 58",
     "v": {
      "k": "lines",
      "l": [
       "Leaves fall",
       "Milk → curd",
       "Candle burns down",
       "Puddles dry",
       "Gate rusts"
      ]
     }
    },
    {
     "t": "s",
     "who": "k7s5_prithvi",
     "say": "Dadi asked me to fold paper boats to float the diyas. If I unfold one, I get the same paper back, just creased!",
     "note": "Activity 5.2: folding paper, letting air out of a balloon, crushing chalk — appearance changes, the material stays the same.",
     "xs": [
      "A. Fold paper sheets into boats and caps, then unfold them.",
      "B. Inflate a balloon, then let the air escape.",
      "C. Crush a small piece of chalk into powder.",
      "In each case, does the material change?"
     ],
     "v": {
      "k": "svg",
      "svg": "<svg viewBox='0 0 300 120'><path d='M20 70 L120 70 L100 95 L40 95Z' fill='#efdcae'/><path d='M70 20 L70 70 L40 70Z' fill='#e2c585'/><path d='M70 20 L70 70 L100 70Z' fill='#d4b26c'/><text x='70' y='114' fill='#eef3f6' font-size='12' text-anchor='middle' font-family='Mulish' font-weight='700'>paper boat</text><ellipse cx='170' cy='55' rx='22' ry='28' fill='#e04a86'/><path d='M170 83 l-4 8 h8z' fill='#e04a86'/><text x='170' y='114' fill='#eef3f6' font-size='12' text-anchor='middle' font-family='Mulish' font-weight='700'>balloon</text><rect x='225' y='40' width='50' height='14' rx='4' fill='#f2efe6'/><circle cx='240' cy='80' r='3' fill='#f2efe6'/><circle cx='250' cy='84' r='2' fill='#f2efe6'/><circle cx='258' cy='79' r='3' fill='#f2efe6'/><circle cx='246' cy='88' r='2' fill='#f2efe6'/><text x='250' y='114' fill='#eef3f6' font-size='12' text-anchor='middle' font-family='Mulish' font-weight='700'>chalk → powder</text></svg>",
      "cap": "Activity 5.2 A, B, C"
     }
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "I pricked my second balloon with a pin. Bang! Caution, pins are sharp.",
     "q": "After pricking the inflated balloon, can you get the uninflated balloon back?",
     "o": [
      "Yes, just let the air out",
      "No — it is torn into pieces, but the pieces are still the same rubber",
      "No — the rubber turns into a new substance",
      "Yes, it mends itself"
     ],
     "a": 1,
     "h": "Is the rubber still rubber?",
     "xs": [
      "Letting air out slowly gives the balloon back.",
      "Pricking tears it: we cannot get the whole balloon back.",
      "But the torn pieces are still the same rubber sheet.",
      "No new substance is formed."
     ],
     "ref": "Activity 5.2 B, p. 59",
     "v": {
      "k": "lines",
      "l": [
       "Balloon 1: air let out slowly",
       "Balloon 2: pricked with a pin",
       "Can we get balloon 2 back?"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "I crushed chalk to draw rangoli on the steps.",
     "q": "What is common to folding paper, deflating a balloon and crushing chalk?",
     "o": [
      "New substances are formed in all three",
      "Heat and light are given out",
      "The material stays the same; only shape or size changes",
      "All three can never be undone"
     ],
     "a": 2,
     "h": "Is the chalk powder still chalk?",
     "xs": [
      "Paper stays paper, rubber stays rubber, chalk powder is still chalk.",
      "Only the appearance — shape or size — changed.",
      "No new substance formed in any of them."
     ],
     "ref": "Activity 5.2, p. 59",
     "v": {
      "k": "lines",
      "l": [
       "A: paper → boat",
       "B: balloon → flat",
       "C: chalk → powder",
       "What is common?"
      ]
     }
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Changes in which only physical properties such as shape, size and state change, and no new substance forms, are called physical changes. Water changing state is one!",
     "note": "Physical change: only physical properties like shape, size and state change; no new substance is formed.",
     "xs": [
      "Below 0 °C, water is solid ice: its particles are locked in a pattern.",
      "At 0 °C, ice melts into water.",
      "Between 0 °C and 100 °C it is liquid water.",
      "At 100 °C water boils, and above it we have steam.",
      "Ice, water or steam: it is always water. No new substance!"
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_states",
      "p": {
       "temp": -15,
       "show": "state"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "temp": 0
       }
      },
      {
       "set": {
        "temp": 50
       }
      },
      {
       "set": {
        "temp": 100
       }
      },
      {
       "set": {
        "temp": 115
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "x",
     "who": "k7s5_dadi",
     "say": "The ice for the boatmen's sherbet is still frozen solid. Warm it up just enough to start melting.",
     "q": "Set the temperature at which ice begins to melt into water.",
     "goal": {
      "temp": 0
     },
     "h": "The melting point of ice is the same as the freezing point of water.",
     "xs": [
      "Ice melts at 0 °C.",
      "At 0 °C, ice and water are both present.",
      "Only the state changes: a physical change."
     ],
     "ref": "5.1, p. 59 (states of water)",
     "v": {
      "k": "sim",
      "sim": "k7s5_states",
      "p": {
       "temp": -15,
       "slider": "temp",
       "show": "state"
      }
     }
    },
    {
     "t": "x",
     "who": "k7s5_prithvi",
     "say": "Now the chai water must boil for the pilgrims!",
     "q": "Set the temperature at which water boils into steam.",
     "goal": {
      "temp": 100
     },
     "h": "Water boils at 100 °C.",
     "xs": [
      "At 100 °C, water boils.",
      "Its particles escape as steam (water vapour).",
      "Cool the steam and it condenses back to water: still water."
     ],
     "ref": "5.1, p. 59 (states of water)",
     "v": {
      "k": "sim",
      "sim": "k7s5_states",
      "p": {
       "temp": 40,
       "slider": "temp",
       "show": "state,rev"
      }
     }
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Drops formed under the lid of Dadi's chai pot.",
     "q": "Steam touching a cool lid turns into water drops. What kind of change is this?",
     "o": [
      "Chemical change, because drops appear",
      "Physical change — only the state changes",
      "Not a change at all",
      "Chemical change, because heat is used"
     ],
     "a": 1,
     "h": "Is the water still water?",
     "xs": [
      "Steam is water vapour.",
      "On the cool lid it condenses into liquid water.",
      "Only the state changes; no new substance forms.",
      "So condensation is a physical change."
     ],
     "ref": "5.1, p. 59",
     "v": {
      "k": "sim",
      "sim": "k7s5_states",
      "p": {
       "temp": 110,
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "temp": 60
       }
      },
      {
       "show": "state"
      },
      {
       "show": "all"
      }
     ]
    }
   ]
  },
  {
   "title": "The Milky Mystery",
   "sec": "5.2 A Substance May Change in Appearance and Not Remain the Same!",
   "icon": "<svg viewBox='0 0 48 48'><path d='M16 6 L16 36 Q16 44 24 44 Q32 44 32 36 L32 6' fill='none' stroke='#c9d4ea' stroke-width='3'/><path d='M17 20 L31 20 L31 36 Q31 42 24 42 Q17 42 17 36Z' fill='#f6f6f0'/><circle cx='22' cy='30' r='2' fill='none' stroke='#62b6e8'/><circle cx='26' cy='25' r='2' fill='none' stroke='#62b6e8'/></svg>",
   "brief": "Blow into lime water and it turns milky! Jugnu shows how a new substance forms, and tests the gas from vinegar and baking soda.",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "Take two glass tumblers. Fill A one-fourth with tap water and B one-fourth with lime water. Blow air into each with separate straws. Caution: never suck the liquid!",
     "note": "Activity 5.3: blowing exhaled air into tap water (A) and lime water (B).",
     "xs": [
      "Tumbler A: tap water.",
      "Tumbler B: lime water.",
      "Blow your breath into each one, one at a time.",
      "Watch carefully for any change."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_lime",
      "p": {
       "src": 1,
       "liq": 0,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "liq": 1
       }
      },
      {
       "set": {
        "t": 0.3
       }
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "I blew hard into tumbler A with tap water.",
     "q": "What do you observe in tumbler A?",
     "o": [
      "Only bubbles; the water looks the same",
      "The water turns milky",
      "The water turns red",
      "A white solid settles at once"
     ],
     "a": 0,
     "h": "Did the water change its appearance?",
     "xs": [
      "Blowing into water makes bubbles.",
      "There is no change in the appearance of the water.",
      "No new substance is seen."
     ],
     "ref": "Activity 5.3, p. 60",
     "v": {
      "k": "sim",
      "sim": "k7s5_lime",
      "p": {
       "src": 1,
       "liq": 0,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 1
       }
      },
      {
       "show": "obs"
      },
      {
       "show": "obs,kind"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Now my turn with tumbler B, the lime water.",
     "q": "What do you observe in tumbler B?",
     "o": [
      "Nothing at all happens",
      "It boils",
      "Bubbles form, the lime water turns milky, and later a white substance settles",
      "It turns pink"
     ],
     "a": 2,
     "h": "Watch the lime water as the bubbles pass.",
     "xs": [
      "Bubbles form as you blow.",
      "The lime water turns milky (cloudy).",
      "Left for some time, a white substance settles at the bottom.",
      "Something new has formed!"
     ],
     "ref": "Activity 5.3, p. 60",
     "v": {
      "k": "sim",
      "sim": "k7s5_lime",
      "p": {
       "src": 1,
       "liq": 1,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 0.4
       }
      },
      {
       "set": {
        "t": 1
       }
      },
      {
       "show": "obs"
      },
      {
       "show": "obs,kind"
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Changes in which one or more new substances form are called chemical changes. New substances form through a chemical reaction.",
     "note": "Chemical change: one or more new substances are formed by a chemical reaction. It can be written as a chemical equation.",
     "xs": [
      "Carbon dioxide in the air you breathe out reacts with lime water.",
      "A new white substance, calcium carbonate, forms. It does not dissolve in water.",
      "So the liquid looks milky. A little water also forms.",
      "Calcium hydroxide (lime water) + Carbon dioxide → Calcium carbonate + Water."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_lime",
      "p": {
       "src": 1,
       "liq": 1,
       "t": 1,
       "show": "kind"
      }
     },
     "xa": [
      null,
      null,
      null,
      {
       "show": "kind,eq"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "So what is that white stuff at the bottom of tumbler B?",
     "q": "The white insoluble substance formed when carbon dioxide reacts with lime water is:",
     "o": [
      "Calcium hydroxide",
      "Common salt",
      "Baking soda",
      "Calcium carbonate"
     ],
     "a": 3,
     "h": "Read the right side of the word equation.",
     "xs": [
      "Lime water is calcium hydroxide.",
      "It reacts with carbon dioxide.",
      "It forms calcium carbonate (insoluble) and water."
     ],
     "ref": "5.2, pp. 60–61",
     "v": {
      "k": "lines",
      "l": [
       "Calcium hydroxide + Carbon dioxide",
       "→ ? + Water",
       "The ? does not dissolve → milky"
      ]
     }
    },
    {
     "t": "s",
     "who": "k7s5_dadi",
     "say": "In my village we used this as a test: if a gas turns lime water milky, that gas is carbon dioxide.",
     "note": "Lime water turning milky is the test for carbon dioxide.",
     "xs": [
      "Pass the unknown gas through fresh lime water.",
      "Milky? The gas is carbon dioxide.",
      "Stays clear? No carbon dioxide."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_lime",
      "p": {
       "src": 0,
       "liq": 1,
       "t": 1,
       "show": "gas"
      }
     },
     "xa": [
      {
       "set": {
        "src": 1
       }
      },
      {
       "show": "gas,obs"
      },
      {
       "set": {
        "src": 0
       }
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Now some kitchen magic! Take a teaspoon of vinegar or lemon juice in a test tube and add a pinch of baking soda, that is, sodium hydrogen carbonate.",
     "note": "Activity 5.4: vinegar + baking soda fizzes and gives a gas; the gas turns lime water milky.",
     "xs": [
      "Add baking soda to the vinegar.",
      "Fizz! A bubbling sound and gas bubbles.",
      "Pass this gas through freshly prepared lime water.",
      "The lime water turns milky!"
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_lime",
      "p": {
       "src": 2,
       "liq": 1,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "t": 0.2
       }
      },
      null,
      {
       "set": {
        "t": 1
       },
       "show": "gas,obs"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "The lime water turned milky with the gas from vinegar and baking soda.",
     "q": "What do you infer about the gas formed by mixing vinegar and baking soda?",
     "o": [
      "It is oxygen",
      "It is carbon dioxide",
      "It is water vapour",
      "It is steam"
     ],
     "a": 1,
     "h": "Remember the lime water test.",
     "xs": [
      "Only carbon dioxide turns lime water milky.",
      "So the gas is carbon dioxide.",
      "Vinegar + Baking soda → Carbon dioxide + Other substances."
     ],
     "ref": "Activity 5.4, p. 61",
     "v": {
      "k": "sim",
      "sim": "k7s5_lime",
      "p": {
       "src": 2,
       "liq": 1,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 1
       }
      },
      {
       "show": "gas"
      },
      {
       "show": "gas,eq"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "The fizz looked like fun, but is it a real chemical change?",
     "q": "Mixing vinegar and baking soda is a:",
     "o": [
      "Physical change, because it is only mixing",
      "Physical change, because bubbles are just air",
      "Chemical change, because a new substance, carbon dioxide, is formed",
      "Neither physical nor chemical"
     ],
     "a": 2,
     "h": "Is a new substance formed?",
     "xs": [
      "A new substance, carbon dioxide gas, forms.",
      "The formation of a new substance means a chemical change.",
      "This fizzing is a chemical reaction."
     ],
     "ref": "Activity 5.4, p. 61",
     "v": {
      "k": "sim",
      "sim": "k7s5_lime",
      "p": {
       "src": 2,
       "liq": 1,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 1
       },
       "show": "gas"
      },
      {
       "show": "gas,kind"
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7s5_dadi",
     "say": "Repeat it with baking soda and plain water instead of vinegar.",
     "q": "Do you see bubbles with baking soda and water, and what kind of change is it?",
     "o": [
      "No bubbles — baking soda just dissolves: a physical change",
      "Lots of bubbles: a chemical change",
      "The water turns milky: a chemical change",
      "It catches fire: a chemical change"
     ],
     "a": 0,
     "h": "Does anything fizz? Does the lime water change?",
     "xs": [
      "Baking soda only dissolves in water.",
      "No gas bubbles form; lime water stays clear.",
      "No new substance: this is a physical change."
     ],
     "ref": "Activity 5.4, p. 61",
     "v": {
      "k": "sim",
      "sim": "k7s5_lime",
      "p": {
       "src": 6,
       "liq": 1,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 1
       },
       "show": "obs"
      },
      null,
      {
       "show": "obs,kind"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Dadi calls it 'meetha soda'. The textbook gives its chemical name.",
     "q": "What is the chemical name of baking soda?",
     "o": [
      "Sodium chloride",
      "Calcium hydroxide",
      "Calcium carbonate",
      "Sodium hydrogen carbonate"
     ],
     "a": 3,
     "h": "It was written in brackets in Activity 5.4.",
     "xs": [
      "Baking soda = sodium hydrogen carbonate.",
      "Common salt is sodium chloride.",
      "Lime water is calcium hydroxide."
     ],
     "ref": "Activity 5.4, p. 61",
     "v": {
      "k": "lines",
      "l": [
       "Baking soda = ?",
       "(its chemical name)"
      ]
     }
    }
   ]
  },
  {
   "title": "Rusty Chains and the Magnesium Spark",
   "sec": "5.3 Some Other Processes Involving Chemical Changes",
   "icon": "<svg viewBox='0 0 48 48'><rect x='6' y='20' width='30' height='8' rx='2' fill='#9aa7b4'/><ellipse cx='16' cy='24' rx='5' ry='3' fill='#a0522d'/><ellipse cx='28' cy='23' rx='4' ry='3' fill='#7a3a1c'/><path d='M40 30 Q46 20 40 8 Q34 20 40 30Z' fill='#f4a51c'/></svg>",
   "brief": "The boat chains are brown with rust, and a magnesium ribbon burns with a dazzling light. Jugnu explains combustion and why a covered candle goes out.",
   "steps": [
    {
     "t": "s",
     "who": "k7s5_prithvi",
     "say": "The iron chain of Mallah Kaka's boat is covered with brown flakes. Is that just dirt?",
     "note": "Rusting of iron is a chemical change: a new brown substance, rust (iron oxide), is formed.",
     "xs": [
      "A shiny iron nail is left in moist air.",
      "Day by day, brown patches appear.",
      "This brown flaky substance is rust — iron oxide.",
      "In dry air hardly any rust forms."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "nail",
       "t": 0,
       "moist": 1,
       "show": "what"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "t": 5
       }
      },
      {
       "set": {
        "t": 10
       },
       "show": "what,kind"
      },
      {
       "set": {
        "moist": 0
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Brown flakes on the chain, just like the nails in Fig. 5.4.",
     "q": "Why is rusting a chemical change?",
     "o": [
      "Because the iron changes shape only",
      "Because a new substance, iron oxide, is formed",
      "Because the iron melts",
      "Because it happens slowly"
     ],
     "a": 1,
     "h": "Look for a new substance.",
     "xs": [
      "Rust is not iron; it is iron oxide.",
      "A new substance is formed.",
      "So rusting is a chemical change."
     ],
     "ref": "5.3.1, p. 62",
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "nail",
       "t": 0,
       "moist": 1,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 10
       }
      },
      {
       "show": "what,kind"
      },
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Recall the magnesium ribbon you burnt in 'The World of Metals and Non-metals'. It burns with a dazzling white light and leaves a white powder.",
     "note": "Magnesium + Oxygen → Magnesium oxide + Heat + Light. Burning magnesium is a chemical change.",
     "xs": [
      "Hold the ribbon with tongs and bring it to a flame.",
      "It burns with a brilliant white light and gives heat.",
      "A white powder is left: magnesium oxide, a new substance.",
      "Magnesium (ribbon) + Oxygen (air) → Magnesium oxide (white powder) + Heat + Light."
     ],
     "v": {
      "k": "svg",
      "svg": "<svg viewBox='0 0 300 130'><path d='M20 40 L120 70' stroke='#9aa7b4' stroke-width='6' stroke-linecap='round'/><path d='M120 70 L150 80' stroke='#c9d4ea' stroke-width='4'/><circle cx='158' cy='82' r='22' fill='#fff' opacity='.35'/><circle cx='158' cy='82' r='12' fill='#fff'/><g fill='#f2efe6'><circle cx='170' cy='112' r='3'/><circle cx='178' cy='116' r='2.5'/><circle cx='164' cy='118' r='2.5'/></g><text x='225' y='70' fill='#f4a51c' font-size='12' text-anchor='middle' font-family='Mulish' font-weight='700'>dazzling light + heat</text><text x='225' y='118' fill='#eef3f6' font-size='12' text-anchor='middle' font-family='Mulish' font-weight='700'>white powder (MgO)</text><text x='60' y='30' fill='#a3bccc' font-size='12' text-anchor='middle' font-family='Mulish' font-weight='700'>tongs</text></svg>",
      "cap": "Fig. 5.5: Burning magnesium ribbon"
     }
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "Let me predict before Jugnu tells me!",
     "q": "Is the burning of magnesium ribbon a physical or a chemical change?",
     "o": [
      "Physical, because it only glows",
      "Physical, because the ribbon gets smaller",
      "Neither",
      "Chemical, because a new substance, magnesium oxide, is formed"
     ],
     "a": 3,
     "h": "What is the white powder?",
     "xs": [
      "The white powder is magnesium oxide.",
      "It is a new substance.",
      "Heat and light are also produced.",
      "So it is a chemical change."
     ],
     "ref": "5.3.2, p. 62",
     "v": {
      "k": "lines",
      "l": [
       "Magnesium ribbon burns in air",
       "dazzling light + heat",
       "leaves a white powder",
       "Physical or chemical?"
      ]
     }
    },
    {
     "t": "s",
     "who": "guide",
     "say": "A chemical reaction in which a substance reacts with oxygen and gives heat and/or light is called combustion. Every diya on this ghat is a little combustion!",
     "note": "Combustion: a substance reacts with oxygen, producing heat and/or light. Wood, paper, cotton and kerosene are combustible substances.",
     "xs": [
      "Combustion needs a substance that can burn.",
      "Such substances are called combustible: wood, paper, cotton, kerosene…",
      "The oil and cotton wick of a diya are combustible.",
      "They react with oxygen of the air and give heat and light."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "tri",
       "fuel": 1,
       "oxy": 1,
       "heat": 1,
       "show": "res"
      }
     }
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Dadi stores many things near the diyas. Which are safe?",
     "q": "Which of these is NOT a combustible substance?",
     "o": [
      "Wood",
      "Cotton",
      "Kerosene",
      "A stone"
     ],
     "a": 3,
     "h": "Which one will not burn in air?",
     "xs": [
      "Wood, cotton and kerosene burn easily: they are combustible.",
      "A stone does not burn.",
      "Keep combustible things away from open flames!"
     ],
     "ref": "5.3.2, p. 62",
     "v": {
      "k": "table",
      "head": [
       "Substance",
       "Burns?"
      ],
      "rows": [
       [
        "Wood",
        "?"
       ],
       [
        "Cotton",
        "?"
       ],
       [
        "Kerosene",
        "?"
       ],
       [
        "Stone",
        "?"
       ]
      ]
     }
    },
    {
     "t": "s",
     "who": "k7s5_dadi",
     "say": "Is oxygen really needed for burning? Place two identical candles on petri dishes, light them, and cover one with a glass tumbler.",
     "note": "Activity 5.5: the covered candle goes out after some time; the open candle keeps burning.",
     "xs": [
      "Both candles burn at first.",
      "Under the tumbler, the flame grows smaller…",
      "…and soon it goes out.",
      "The open candle keeps burning in fresh air."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "candles",
       "t": 0,
       "show": "res"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "t": 3
       }
      },
      {
       "set": {
        "t": 7
       }
      },
      {
       "show": "res,why"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "My covered candle went out but Nalini's open one is still burning!",
     "q": "Why does the candle under the glass tumbler stop burning?",
     "o": [
      "It has no continuous supply of air, so the oxygen inside is used up",
      "The glass makes it too cold",
      "The wax becomes a new substance that cannot burn",
      "Light cannot pass through the tumbler"
     ],
     "a": 0,
     "h": "What does the tumbler cut off?",
     "xs": [
      "The tumbler stops fresh air from coming in.",
      "The oxygen inside is used up by the flame.",
      "The component of air that supports combustion is oxygen.",
      "Without oxygen, combustion stops."
     ],
     "ref": "Activity 5.5, pp. 62–63",
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "candles",
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 8
       }
      },
      {
       "show": "res"
      },
      {
       "show": "res,why"
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Jugnu says carbon dioxide is now inside the tumbler. How can we check?",
     "q": "How can you test for carbon dioxide inside the tumbler?",
     "o": [
      "Smell the tumbler",
      "Add a little lime water to the petri dish — it turns milky",
      "Add baking soda — it fizzes",
      "Blow out the other candle"
     ],
     "a": 1,
     "h": "Use the test from Activity 5.3.",
     "xs": [
      "Put a small amount of lime water in the petri dish.",
      "It turns milky: carbon dioxide is present.",
      "Carbon from the wax combined with oxygen from the air.",
      "So oxygen is required for combustion."
     ],
     "ref": "p. 63",
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "candles",
       "t": 0,
       "lime": 1,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 4
       }
      },
      {
       "set": {
        "t": 8
       },
       "show": "res"
      },
      {
       "show": "res,why"
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7s5_dadi",
     "say": "With so many diyas, we must be careful. Science and Society!",
     "q": "If a person's clothes catch fire, what is the best way to put out the fire?",
     "o": [
      "Make the person run fast",
      "Fan the flames",
      "Wrap a cotton blanket or cloth around the person — never a synthetic one",
      "Throw kerosene on it"
     ],
     "a": 2,
     "h": "Cut off the supply of air.",
     "xs": [
      "Wrapping a blanket cuts off the supply of air.",
      "Without oxygen, the fire goes out.",
      "Never use a synthetic blanket: it can melt and stick to the skin."
     ],
     "ref": "Science and Society, p. 63",
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "tri",
       "fuel": 1,
       "oxy": 1,
       "heat": 1,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "oxy": 0
       },
       "show": "tri"
      },
      {
       "show": "tri,res"
      },
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Fascinating fact: that's me! A firefly's light is made by a chemical change in its body, with no heat. It is called bioluminescence.",
     "note": "Fireflies make light by a chemical change without heat: bioluminescence.",
     "xs": [
      "On late evenings, fireflies glow in gardens and fields.",
      "The light comes from a chemical change inside the insect.",
      "It produces light without heat.",
      "Light production in living organisms is called bioluminescence."
     ],
     "v": {
      "k": "lines",
      "l": [
       "Firefly (jugnu) glows",
       "light from a chemical change",
       "…without heat",
       "= bioluminescence"
      ]
     }
    }
   ]
  },
  {
   "title": "Sunlight Sets the Paper Alight",
   "sec": "5.3.2 Is the Presence of Air Enough for Combustion?",
   "icon": "<svg viewBox='0 0 48 48'><ellipse cx='24' cy='18' rx='14' ry='3' fill='#cfe6ff'/><path d='M14 18 L24 36 M34 18 L24 36' stroke='#ffd166' stroke-width='1.5'/><rect x='8' y='36' width='32' height='5' fill='#f2efe6'/><path d='M24 36 Q28 30 24 24 Q20 30 24 36Z' fill='#f4a51c'/></svg>",
   "brief": "Paper sits in the air for days without burning. Then a magnifying glass sets it alight! Jugnu shows the ignition temperature and the fire triangle.",
   "steps": [
    {
     "t": "s",
     "who": "k7s5_nalini",
     "say": "The paper for the lamp-boats has been lying in the air all day. Paper is combustible and there is plenty of oxygen, so why isn't it burning?",
     "note": "A combustible substance and oxygen are not enough: something else is needed to start combustion.",
     "xs": [
      "Paper is combustible.",
      "Air contains oxygen.",
      "Yet paper can stay in air for any length of time without catching fire.",
      "What else is needed?"
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "paper",
       "sec": 0,
       "show": "tri"
      }
     }
    },
    {
     "t": "s",
     "who": "k7s5_dadi",
     "say": "Hold a piece of paper with tongs and bring a lighted matchstick to it. Caution: only with an adult!",
     "note": "Activity 5.6: paper touched with a lighted matchstick catches fire quickly.",
     "xs": [
      "Bring a lighted match to the paper.",
      "It quickly catches fire.",
      "So do we always need a fire to start burning?"
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "paper",
       "match": 1,
       "show": "res"
      }
     }
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Now take another piece of paper. With a magnifying glass, focus the sunrays into the smallest, brightest spot, and hold it there.",
     "note": "Focused sunrays heat the paper. Its temperature rises until it starts to burn — without any fire.",
     "xs": [
      "The bright spot heats the paper.",
      "Its temperature rises with time.",
      "The paper starts to emit smoke…",
      "…and then catches fire!"
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "paper",
       "sec": 0,
       "show": "res"
      }
     },
     "xa": [
      {
       "set": {
        "sec": 15
       }
      },
      {
       "set": {
        "sec": 25
       },
       "hl": "thermo"
      },
      {
       "set": {
        "sec": 30
       }
      },
      {
       "set": {
        "sec": 45
       },
       "show": "res,why"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "I held the lens steady for a long time.",
     "q": "What do you observe when focused sunrays are held on the paper for some time?",
     "o": [
      "The paper gets wet",
      "Nothing ever happens",
      "The paper freezes",
      "The paper starts to emit smoke and then catches fire"
     ],
     "a": 3,
     "h": "Watch what happens after the paper smokes.",
     "xs": [
      "The paper heats up.",
      "First it gives out smoke.",
      "Then it catches fire (Fig. 5.7b).",
      "A substance can burn even without fire!"
     ],
     "ref": "Activity 5.6, p. 64",
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "paper",
       "sec": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "sec": 20
       }
      },
      {
       "set": {
        "sec": 30
       },
       "show": "res"
      },
      {
       "set": {
        "sec": 45
       },
       "show": "res"
      },
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "The minimum temperature at which a substance catches fire is called its ignition temperature.",
     "note": "Ignition temperature: the lowest temperature at which a substance catches fire.",
     "xs": [
      "Sunrays slowly raised the paper's temperature.",
      "When it reached its ignition temperature, it burnt.",
      "A lighted matchstick is already hotter than paper's ignition temperature.",
      "So the paper caught fire from the match almost immediately."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "paper",
       "sec": 20,
       "show": "why"
      }
     },
     "xa": [
      {
       "set": {
        "sec": 35
       }
      },
      {
       "set": {
        "sec": 40
       },
       "hl": "thermo"
      },
      {
       "set": {
        "match": 1
       }
      },
      null
     ]
    },
    {
     "t": "x",
     "who": "k7s5_nalini",
     "say": "Let me find the exact moment the paper reaches its ignition temperature with Dadi's lens.",
     "q": "Set the smallest time of focusing sunlight at which the paper just catches fire.",
     "goal": {
      "sec": 40
     },
     "h": "Watch the thermometer: the red column must just touch the ignition line.",
     "xs": [
      "Below the ignition line, the paper only heats or smokes.",
      "At 40 s in this setup the paper reaches its ignition temperature.",
      "It catches fire: fuel, oxygen and enough heat are all present."
     ],
     "ref": "Activity 5.6, p. 64",
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "paper",
       "sec": 0,
       "slider": "sec",
       "show": "res"
      }
     }
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "The match lit the paper in a second, but the sun took much longer.",
     "q": "Why did the paper catch fire almost immediately from the lighted matchstick?",
     "o": [
      "Matchsticks contain oxygen only",
      "The temperature of the lighted matchstick is already higher than the ignition temperature of paper",
      "Paper burns only in sunlight",
      "The match makes the paper wet"
     ],
     "a": 1,
     "h": "Compare the temperature of the match flame with the ignition temperature.",
     "xs": [
      "The match flame is very hot.",
      "It is already above the paper's ignition temperature.",
      "So the paper reaches its ignition temperature at once and burns."
     ],
     "ref": "p. 64",
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "paper",
       "match": 1,
       "show": "none"
      }
     },
     "xa": [
      {
       "hl": "thermo"
      },
      {
       "show": "why"
      },
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "So combustion has three needs. Together they make the fire triangle!",
     "note": "Fire triangle: (i) a combustible substance (fuel), (ii) oxygen, (iii) heat to bring the fuel to its ignition temperature.",
     "xs": [
      "Fuel: a combustible substance such as oil, wax, wood or paper.",
      "Oxygen: from the air.",
      "Heat: enough to reach the ignition temperature.",
      "Remove any one side and the fire cannot burn."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "tri",
       "fuel": 1,
       "oxy": 1,
       "heat": 1,
       "show": "tri"
      }
     },
     "xa": [
      {
       "hl": "triangle"
      },
      null,
      null,
      {
       "set": {
        "oxy": 0
       },
       "show": "tri,res,why"
      }
     ]
    },
    {
     "t": "x",
     "who": "k7s5_dadi",
     "say": "This diya is empty, sealed under glass and unlit. Make it burn for the aarti!",
     "q": "Switch on the three sides of the fire triangle to light the diya.",
     "goal": {
      "fuel": 1,
      "oxy": 1,
      "heat": 1
     },
     "h": "Fuel, oxygen and heat: all three are needed.",
     "xs": [
      "Fuel: pour oil and put a wick.",
      "Oxygen: lift the glass so fresh air reaches the flame.",
      "Heat: a lighted matchstick brings the wick to its ignition temperature.",
      "Now the diya burns!"
     ],
     "ref": "Fig. 5.8 Fire triangle, p. 64",
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "tri",
       "fuel": 0,
       "oxy": 0,
       "heat": 0,
       "slider": "fuel,oxy,heat",
       "show": "tri,res"
      }
     }
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Remember the blanket around burning clothes?",
     "q": "Which side of the fire triangle does a blanket wrapped around burning clothes remove?",
     "o": [
      "Fuel",
      "Heat",
      "Oxygen",
      "None of them"
     ],
     "a": 2,
     "h": "What does the blanket stop from reaching the fire?",
     "xs": [
      "The blanket cuts off the supply of air.",
      "Air brings oxygen.",
      "So the oxygen side is removed, and the fire goes out."
     ],
     "ref": "Science and Society, p. 63; Fig. 5.8, p. 64",
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "tri",
       "fuel": 1,
       "oxy": 1,
       "heat": 1,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "oxy": 0
       },
       "show": "tri"
      },
      {
       "hl": "triangle"
      },
      {
       "show": "all"
      }
     ]
    }
   ]
  },
  {
   "title": "The Candle's Two Secrets",
   "sec": "5.4 Can Physical and Chemical Changes Occur in the Same Process?",
   "icon": "<svg viewBox='0 0 48 48'><rect x='18' y='20' width='12' height='22' rx='2' fill='#f2efe6'/><path d='M30 24 q2 4 0 8' stroke='#f2efe6' stroke-width='3' fill='none'/><path d='M24 18 Q29 10 24 2 Q19 10 24 18Z' fill='#f4a51c'/></svg>",
   "brief": "What really happens when a candle burns? Jugnu lets you walk around a 3D candle to see melting, rising, evaporating and burning wax.",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "Walk around this candle with me. Drag to turn it! Look at the solid wax, the shiny pool on top, the wick and the flame.",
     "note": "Activity 5.7: a burning candle — what changes do you see?",
     "xs": [
      "The candle body is solid wax.",
      "On top, a pool of melted wax shines.",
      "A drip runs down the side and becomes solid again.",
      "The flame burns at the top of the wick."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_candle3d",
      "p": {
       "cover": 0,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "hl": "wax"
      },
      null,
      null,
      {
       "hl": "flame"
      }
     ]
    },
    {
     "t": "o",
     "kind": "Discuss",
     "who": "k7s5_nalini",
     "say": "Prithvi says the wax melts and evaporates. Someone else says the wax burns and new substances form. Another says the wick draws up the liquid wax. Who is right?",
     "q": "Activity 5.7 (Think, pair and share): Analyse what the students in Fig. 5.9 are saying about the burning candle. What do you think?",
     "xs": [
      "\"Wax melts and evaporates\" — correct: these are physical changes.",
      "\"Wax melts, flows and solidifies in different shapes\" — correct: physical changes.",
      "\"The wick draws up the liquid wax\" — correct.",
      "\"The wax burns and new substances are formed\" — correct: the burning of wax vapour is a chemical change.",
      "So all of them are partly right: a burning candle shows both kinds of change."
     ],
     "ref": "Activity 5.7, p. 65",
     "v": {
      "k": "sim",
      "sim": "k7s5_candle3d",
      "p": {
       "cover": 0,
       "t": 0,
       "show": "phys,chem"
      }
     }
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Here is the whole story. The wax melts, is carried up the wick, and evaporates in the heat of the flame. The wax vapour burns to make the flame.",
     "note": "Burning candle: melting, solidifying and evaporating of wax are physical changes; burning of wax vapour is a chemical change.",
     "xs": [
      "Heat melts the solid wax: physical change.",
      "Liquid wax rises up the wick and evaporates into vapour: physical change.",
      "The wax vapour burns with oxygen, giving heat and light: chemical change.",
      "Wax that drips down solidifies again: physical change."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_candle3d",
      "p": {
       "cover": 0,
       "t": 0,
       "show": "phys"
      }
     },
     "xa": [
      {
       "hl": "wax"
      },
      null,
      {
       "hl": "flame",
       "show": "phys,chem"
      },
      {
       "hl": "wax"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "So which part of the candle's story is the chemical change?",
     "q": "Which of these is a chemical change in a burning candle?",
     "o": [
      "Melting of wax",
      "Wax vapour burning in the flame",
      "Wax drips becoming solid",
      "Liquid wax rising up the wick"
     ],
     "a": 1,
     "h": "Where do new substances form?",
     "xs": [
      "Melting, rising and solidifying do not form new substances.",
      "Burning the wax vapour forms new substances like carbon dioxide.",
      "Heat and light are given out.",
      "So the burning of wax vapour is the chemical change."
     ],
     "ref": "5.4, p. 65",
     "v": {
      "k": "sim",
      "sim": "k7s5_candle3d",
      "p": {
       "cover": 0,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "phys"
      },
      {
       "hl": "flame",
       "show": "phys,chem"
      },
      null,
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "And the melting, the dripping and the evaporating?",
     "q": "Melting, solidification and evaporation of wax are:",
     "o": [
      "Chemical changes",
      "Both chemical and physical",
      "Physical changes",
      "Not changes at all"
     ],
     "a": 2,
     "h": "Is the wax still wax?",
     "xs": [
      "Liquid wax and wax vapour are still wax.",
      "Only the state changes.",
      "So they are physical changes."
     ],
     "ref": "5.4, p. 65",
     "v": {
      "k": "sim",
      "sim": "k7s5_candle3d",
      "p": {
       "cover": 0,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "hl": "wax"
      },
      {
       "show": "phys"
      },
      null
     ]
    },
    {
     "t": "x",
     "who": "k7s5_dadi",
     "say": "Let us repeat Activity 5.5 on this candle. Lower the glass tumbler over it, on the dish of lime water.",
     "q": "Lower the glass tumbler over the candle.",
     "goal": {
      "cover": 1
     },
     "h": "Move the tumbler slider to 1.",
     "xs": [
      "The tumbler cuts off the fresh air.",
      "As time passes, the flame shrinks and goes out.",
      "The lime water turns milky: carbon dioxide formed from the burning wax."
     ],
     "ref": "Activity 5.5, p. 63",
     "v": {
      "k": "sim",
      "sim": "k7s5_candle3d",
      "p": {
       "cover": 0,
       "t": 0,
       "lime": 1,
       "slider": "cover",
       "show": "flame"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "t": 1
       }
      },
      {
       "show": "flame,chem"
      }
     ]
    },
    {
     "t": "m",
     "who": "guide",
     "say": "Melting is physical, burning is chemical, and both happen in one candle.",
     "q": "The burning of a candle involves:",
     "o": [
      "Only a physical change",
      "Both physical and chemical changes",
      "Only a chemical change",
      "No change"
     ],
     "a": 1,
     "h": "Think of the wax and of the flame.",
     "xs": [
      "Melting and evaporating wax: physical.",
      "Burning wax vapour: chemical.",
      "So a burning candle involves both."
     ],
     "ref": "5.4, p. 65",
     "v": {
      "k": "sim",
      "sim": "k7s5_candle3d",
      "p": {
       "cover": 0,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "phys"
      },
      {
       "show": "phys,chem"
      },
      null
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Know a scientist! Michael Faraday loved candles. In the nineteenth century he gave a series of lectures called 'The Chemical History of a Candle'.",
     "note": "Michael Faraday used the candle to explain physical and chemical processes like melting, vapourisation and combustion.",
     "xs": [
      "Faraday made important contributions to many areas of science.",
      "He believed the candle was the perfect object to begin scientific study.",
      "Through it he explained melting, vapourisation and combustion."
     ],
     "v": {
      "k": "lines",
      "l": [
       "Michael Faraday (19th century)",
       "Lectures: Chemical History of a Candle",
       "melting · vapourisation · combustion"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "I want to read Faraday's lectures one day!",
     "q": "What was the name of Michael Faraday's famous series of lectures?",
     "o": [
      "The Story of Fire",
      "Chemical History of a Candle",
      "The Lamp of Science",
      "Physics of the Flame"
     ],
     "a": 1,
     "h": "It is about a candle.",
     "xs": [
      "Faraday's lectures were called 'Chemical History of a Candle'.",
      "He used the candle to discuss melting, vapourisation and combustion."
     ],
     "ref": "Know a Scientist, p. 65",
     "v": {
      "k": "lines",
      "l": [
       "Michael Faraday (19th century)",
       "Lectures: ?"
      ]
     }
    }
   ]
  },
  {
   "title": "Can We Undo It? Should We?",
   "sec": "5.5 Are Changes Permanent? · 5.6 Are All Changes Desirable?",
   "icon": "<svg viewBox='0 0 48 48'><path d='M10 22 A14 14 0 0 1 38 22' stroke='#35c29a' stroke-width='4' fill='none'/><path d='M38 22 l-6 -2 l4 6z' fill='#35c29a'/><path d='M38 28 A14 14 0 0 1 10 28' stroke='#e04a86' stroke-width='4' fill='none'/><path d='M10 28 l6 2 l-4 -6z' fill='#e04a86'/></svg>",
   "brief": "Ice can be refrozen but popcorn can never be corn again. Some changes are useful, some harmful. Jugnu sorts them with you.",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "Once something has changed, can we get it back in its original form? Some changes can be reversed and some cannot.",
     "note": "Some changes can be reversed (melted ice refreezes, evaporated water condenses); some cannot (chopped vegetables, popcorn).",
     "xs": [
      "Ice melts into water…",
      "…and the water can be refrozen into ice.",
      "Water evaporates into vapour; the vapour can be condensed back into water.",
      "But chopped vegetables and popcorn cannot go back."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_states",
      "p": {
       "temp": -10,
       "show": "state"
      }
     },
     "xa": [
      {
       "set": {
        "temp": 20
       }
      },
      {
       "set": {
        "temp": -10
       }
      },
      {
       "set": {
        "temp": 110
       },
       "show": "state,rev"
      },
      null
     ]
    },
    {
     "t": "s",
     "who": "k7s5_dadi",
     "say": "Let's fill Table 5.2 together, starting with the changes from our kitchen.",
     "note": "Table 5.2: melting ice — Yes; chopping vegetables — No; boiling water — Yes; making popcorn — No.",
     "xs": [
      "Melting ice cubes: we can freeze it again — Yes.",
      "Chopping vegetables: No.",
      "Boiling water: cool the steam back to water — Yes.",
      "Making popcorn from corn: No."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_sort",
      "p": {
       "mode": "cols",
       "cols": [
        "Can be reversed",
        "Cannot be reversed"
       ],
       "items": [
        [
         "Melting ice cubes",
         0
        ],
        [
         "Chopping vegetables",
         1
        ],
        [
         "Boiling water",
         0
        ],
        [
         "Corn → popcorn",
         1
        ]
       ],
       "n": 0,
       "lx": "Table 5.2: Can changes be reversed?",
       "show": "last"
      }
     },
     "xa": [
      {
       "set": {
        "n": 1
       }
      },
      {
       "set": {
        "n": 2
       }
      },
      {
       "set": {
        "n": 3
       }
      },
      {
       "set": {
        "n": 4
       }
      }
     ]
    },
    {
     "t": "o",
     "kind": "Activity",
     "who": "k7s5_nalini",
     "say": "Now I'll fill rows 5 to 12 with other changes we have met.",
     "q": "Activity 5.8: Think about all the changes discussed so far. In which can we get back the object or substance we started with? Complete Table 5.2 (Yes/No).",
     "xs": [
      "Cutting a piece of paper — No.",
      "Adding beetroot extract to water — No (we cannot easily get the clear water and extract back separately).",
      "Burning wood — No.",
      "Drying wet clothes — Yes (they can be wetted again).",
      "Making dough balls, rolling chapatis, folding paper — Yes (the dough or paper can be reshaped).",
      "Letting air out of a balloon — Yes. Pricked balloon, crushed chalk — No.",
      "Lime water turning milky, rusting, burning magnesium — No."
     ],
     "ref": "Activity 5.8, Table 5.2, p. 66",
     "v": {
      "k": "sim",
      "sim": "k7s5_sort",
      "p": {
       "mode": "cols",
       "cols": [
        "Yes",
        "No"
       ],
       "items": [
        [
         "Drying wet clothes",
         0
        ],
        [
         "Folding paper",
         0
        ],
        [
         "Dough ball → chapati",
         0
        ],
        [
         "Cutting paper",
         1
        ],
        [
         "Burning wood",
         1
        ],
        [
         "Crushing chalk",
         1
        ],
        [
         "Rusting of iron",
         1
        ]
       ],
       "n": 7,
       "lx": "Table 5.2 (continued)",
       "show": "count"
      }
     }
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "My rangoli powder came from chalk. Hmm.",
     "q": "Chopping vegetables is a physical change, but it cannot be reversed. What does this tell us?",
     "o": [
      "All physical changes can be reversed",
      "Chopping is really a chemical change",
      "Some physical changes cannot be reversed",
      "Only chemical changes are physical"
     ],
     "a": 2,
     "h": "No new substance forms when we chop, yet the pieces cannot join back.",
     "xs": [
      "Chopping forms no new substance: it is physical.",
      "But the pieces cannot return to the original shape.",
      "So 'physical' does not always mean 'reversible'."
     ],
     "ref": "5.5, p. 66",
     "v": {
      "k": "sim",
      "sim": "k7s5_sort",
      "p": {
       "mode": "cols",
       "cols": [
        "Can be reversed",
        "Cannot be reversed"
       ],
       "items": [
        [
         "Melting ice cubes",
         0
        ],
        [
         "Chopping vegetables",
         1
        ],
        [
         "Boiling water",
         0
        ],
        [
         "Corn → popcorn",
         1
        ]
       ],
       "n": 4,
       "show": "none"
      }
     },
     "xa": [
      {
       "hl": "z1"
      },
      null,
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Many changes in daily life are useful: milk changing into curd, ripening of fruits, cutting fruits, and cooking food. These are desirable changes.",
     "note": "Desirable changes: milk → curd, ripening of fruits, cutting fruits, cooking food. Undesirable: rusting of iron, decay of stored food.",
     "xs": [
      "Milk → curd: we want it!",
      "Ripening and cutting fruits, cooking food: desirable.",
      "Rusting of iron: undesirable.",
      "Decay of food during storage: undesirable."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_sort",
      "p": {
       "mode": "cols",
       "cols": [
        "Desirable",
        "Undesirable"
       ],
       "items": [
        [
         "Milk → curd",
         0
        ],
        [
         "Ripening of fruits",
         0
        ],
        [
         "Cooking food",
         0
        ],
        [
         "Cutting fruits",
         0
        ],
        [
         "Rusting of iron",
         1
        ],
        [
         "Decay of stored food",
         1
        ]
       ],
       "n": 0,
       "show": "last"
      }
     },
     "xa": [
      {
       "set": {
        "n": 1
       }
      },
      {
       "set": {
        "n": 4
       }
      },
      {
       "set": {
        "n": 5
       }
      },
      {
       "set": {
        "n": 6
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_dadi",
     "say": "My rasgullas went sour because I left them out too long. Not good!",
     "q": "Which of these is an undesirable change?",
     "o": [
      "Milk changing into curd",
      "Ripening of mangoes",
      "Cooking dal",
      "Rusting of the iron boat chain"
     ],
     "a": 3,
     "h": "Which one damages something we want to keep?",
     "xs": [
      "Curd, ripe mangoes and cooked dal are wanted: desirable.",
      "Rust weakens the iron chain: undesirable.",
      "Decay of stored food is also undesirable."
     ],
     "ref": "5.6, p. 67",
     "v": {
      "k": "sim",
      "sim": "k7s5_sort",
      "p": {
       "mode": "cols",
       "cols": [
        "Desirable",
        "Undesirable"
       ],
       "items": [
        [
         "Milk → curd",
         0
        ],
        [
         "Ripening mangoes",
         0
        ],
        [
         "Cooking dal",
         0
        ],
        [
         "Rusting chain",
         1
        ]
       ],
       "n": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "n": 3
       }
      },
      {
       "set": {
        "n": 4
       },
       "show": "last"
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "Rotting peels smell bad in the kitchen, but Dadi's garden loves them!",
     "q": "Decay of food is undesirable in storage. When can decomposition be desirable?",
     "o": [
      "When food waste is converted into compost",
      "When milk is boiled",
      "When paper is folded",
      "Never"
     ],
     "a": 0,
     "h": "Think about Dadi's garden.",
     "xs": [
      "A change undesirable in one situation may be desirable in another.",
      "Decomposition of food waste makes compost.",
      "Compost feeds plants: desirable!"
     ],
     "ref": "5.6, p. 67",
     "v": {
      "k": "lines",
      "l": [
       "Food rotting in the store: undesirable",
       "Food waste in a compost pit: ?"
      ]
     }
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Some changes caused by human activity have a long-term effect on our environment.",
     "note": "Burning more fuel in vehicles increases carbon dioxide in the air; drying paint releases substances that pollute the air.",
     "xs": [
      "Cars, trains and aeroplanes burn more and more fuel.",
      "This increases the amount of carbon dioxide in the atmosphere.",
      "Drying of paint on walls, doors and furniture releases many substances by evaporation.",
      "These cause atmospheric pollution."
     ],
     "v": {
      "k": "lines",
      "l": [
       "More fuel burnt → more CO₂ in the air",
       "Paint drying → substances evaporate → air pollution",
       "Long-term environmental impact"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "So many motorboats on the Ganga now!",
     "q": "Increased consumption of fuels in cars, trains and aeroplanes is increasing the amount of which gas in the atmosphere?",
     "o": [
      "Oxygen",
      "Nitrogen",
      "Carbon dioxide",
      "Water vapour only"
     ],
     "a": 2,
     "h": "Which gas forms when fuels burn?",
     "xs": [
      "Burning fuels is combustion.",
      "It produces carbon dioxide.",
      "More fuel burnt means more carbon dioxide in the air."
     ],
     "ref": "5.6, p. 67",
     "v": {
      "k": "lines",
      "l": [
       "Cars · trains · aeroplanes",
       "burn more and more fuel",
       "Which gas increases?"
      ]
     }
    },
    {
     "t": "o",
     "kind": "Think",
     "who": "guide",
     "say": "Your turn to look around.",
     "q": "Can you think of some other desirable changes happening around you?",
     "xs": [
      "Seeds germinating into plants.",
      "Dough rising when yeast is added to make bread.",
      "Clay being baked into diyas and pots.",
      "Water freezing into ice for cold drinks.",
      "Making jaggery from sugarcane juice."
     ],
     "ref": "5.6, p. 66",
     "v": {
      "k": "lines",
      "l": [
       "Seeds → plants",
       "Clay → baked diya",
       "Water → ice",
       "Sugarcane juice → jaggery"
      ]
     }
    }
   ]
  },
  {
   "title": "The River Wears Down the Rocks",
   "sec": "5.7 Some Slow Natural Changes",
   "icon": "<svg viewBox='0 0 48 48'><path d='M4 10 L22 10 L26 40 L4 40Z' fill='#6b6f78'/><path d='M18 10 L15 22 L19 30' stroke='#1d2026' stroke-width='2' fill='none'/><path d='M28 40 l4 -6 l4 6z M34 40 l3 -4 l3 4z' fill='#c2a77a'/><path d='M4 44 Q24 38 44 44' stroke='#62b6e8' stroke-width='3' fill='none'/></svg>",
   "brief": "Over thousands of years, heat, ice, roots and water break rocks into soil, and rivers carry sand away. Jugnu fast-forwards time.",
   "steps": [
    {
     "t": "s",
     "who": "k7s5_prithvi",
     "say": "On our trip to the hills I saw heaps of sand, soil and stones at the bottom of a cliff. Where did they come from?",
     "note": "Sediments are formed when big rocks break into smaller pieces by physical changes: temperature changes, growing roots, freezing water in cracks.",
     "xs": [
      "These heaps are called sediments.",
      "Heating by day and cooling by night cracks the rock.",
      "Roots of trees grow into the cracks.",
      "Water freezes in the cracks and pushes them apart.",
      "Pieces break off and pile up at the base."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "rock",
       "t": 0,
       "show": "what"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "t": 1
       }
      },
      {
       "set": {
        "t": 2
       },
       "hl": "crack"
      },
      {
       "set": {
        "t": 5
       }
      },
      {
       "set": {
        "t": 9
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Fig. 5.10a shows such heaps at the base of a cliff.",
     "q": "What are the heaps of sand, soil and stones lying at the base of mountains called?",
     "o": [
      "Compost",
      "Rust",
      "Sediments",
      "Crystals"
     ],
     "a": 2,
     "h": "They settle down at the base.",
     "xs": [
      "Broken bits of rock collect at the base.",
      "They are called sediments.",
      "They form by physical changes that break up large rocks."
     ],
     "ref": "5.7.1, p. 67",
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "rock",
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 8
       }
      },
      {
       "show": "what"
      },
      null
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Water, or chemicals in water, can also react with rocks. Look at this black rock called basalt: it contains iron, and its surface has turned red.",
     "note": "Chemical weathering: iron in basalt reacts with water or moist air to form red iron oxide. Physical + chemical changes in rocks = weathering, which forms soil.",
     "xs": [
      "Basalt is a black rock that contains iron.",
      "Exposed for a long time to water or moist air, a red layer forms.",
      "The red colour is iron oxide: a new substance, so a chemical change.",
      "These physical and chemical changes together are called weathering.",
      "Weathering eventually leads to the formation of soil."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "rock",
       "t": 1,
       "show": "what"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "t": 6
       },
       "hl": "red"
      },
      {
       "show": "what,kind"
      },
      null,
      {
       "set": {
        "t": 10
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "The red rock reminds me of the rusty chain!",
     "q": "Why does the surface of basalt rock turn red over time?",
     "o": [
      "Red paint from the rain",
      "Iron in the rock forms red iron oxide with water or moist air",
      "The rock melts",
      "Roots colour the rock red"
     ],
     "a": 1,
     "h": "Basalt contains iron. What did iron form on the boat chain?",
     "xs": [
      "Basalt contains iron.",
      "With water or water vapour in air, iron forms iron oxide.",
      "Iron oxide gives the red colour: a chemical change, like rusting."
     ],
     "ref": "5.7.1, p. 67 (Fig. 5.10b)",
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "rock",
       "t": 1,
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "t": 10
       },
       "hl": "red"
      },
      {
       "show": "what,kind"
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Now the Ganga's work! Rock pebbles, soil and sediments are broken down and moved from one place to another by wind and flowing water. This is erosion.",
     "note": "Erosion: moving of broken rock, soil and sediments by wind and flowing water. It is a physical change.",
     "xs": [
      "Flowing water carries pebbles and sand.",
      "Constant rubbing makes river pebbles smooth and round.",
      "Where the water slows, as in a lake or ocean, the material settles down.",
      "These sediments harden over time into new rocks."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "river",
       "t": 0,
       "show": "what"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "t": 5
       },
       "hl": "pebble"
      },
      {
       "set": {
        "t": 9
       },
       "hl": "sand"
      },
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "I collected round, smooth pebbles from the ghat for my diya stand.",
     "q": "Why do river rocks and pebbles often appear smooth?",
     "o": [
      "They are polished by people",
      "They melt in the sun",
      "They are made smooth by a chemical reaction with air",
      "Constant erosion by flowing water wears them smooth"
     ],
     "a": 3,
     "h": "What keeps rubbing against them, day and night?",
     "xs": [
      "Flowing water keeps rubbing the pebbles.",
      "Their sharp edges wear away.",
      "This erosion makes them smooth."
     ],
     "ref": "5.7.2, p. 68",
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "river",
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "t": 10
       },
       "hl": "pebble"
      },
      {
       "show": "what"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_dadi",
     "say": "The sand on the opposite bank of the Ganga grows every year.",
     "q": "Where does the material carried by erosion settle down?",
     "o": [
      "Where the speed of the water or wind decreases, as in an ocean or a lake",
      "Only on mountain tops",
      "Inside the clouds",
      "Where the water flows fastest"
     ],
     "a": 0,
     "h": "When does flowing water drop what it carries?",
     "xs": [
      "Fast water can carry sand and pebbles.",
      "When the water slows down, it cannot carry them.",
      "So sediments settle at the bottom of lakes and oceans.",
      "Over time they harden into new rocks."
     ],
     "ref": "5.7.2, p. 68",
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "river",
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "t": 4
       }
      },
      {
       "set": {
        "t": 9
       },
       "hl": "sand"
      },
      {
       "show": "what"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "There was a landslide near Kedarnath this year, on the news.",
     "q": "Erosion during a landslide is an example of which kind of change, and can it be reversed?",
     "o": [
      "Chemical; can be reversed",
      "Physical; cannot be reversed",
      "Chemical; cannot be reversed",
      "Physical; can be reversed easily"
     ],
     "a": 1,
     "h": "Do the rocks become a new substance? Can they climb back?",
     "xs": [
      "In a landslide, rocks and soil are only moved and broken.",
      "No new substance forms: a physical change.",
      "Most such changes take thousands of years and cannot be reversed."
     ],
     "ref": "5.7.2, p. 68",
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "river",
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 8
       }
      },
      {
       "show": "kind"
      },
      {
       "show": "kind,rev"
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "In a nutshell, let's light the summary lamps!",
     "note": "Physical change: no new substance. Chemical change: new substance(s), a chemical reaction, a chemical equation. Ignition temperature, combustion, reversible and desirable changes, weathering and erosion.",
     "xs": [
      "Physical change: physical properties change; no new substance.",
      "Chemical change: new substances form by a chemical reaction.",
      "Combustion, cooking and rusting are chemical changes; combustion gives heat and/or light.",
      "Ignition temperature: lowest temperature at which a substance catches fire.",
      "Some changes can be reversed, some are desirable; weathering forms soil and erosion is a physical change."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_sort",
      "p": {
       "mode": "venn",
       "items": [
        [
         "Melting ice",
         0
        ],
        [
         "Erosion",
         0
        ],
        [
         "Rusting",
         1
        ],
        [
         "Combustion",
         1
        ],
        [
         "Cooking",
         1
        ],
        [
         "Burning candle",
         2
        ],
        [
         "Weathering",
         2
        ]
       ],
       "n": 0,
       "lx": "In a nutshell",
       "show": "last"
      }
     },
     "xa": [
      {
       "set": {
        "n": 2
       }
      },
      {
       "set": {
        "n": 3
       }
      },
      {
       "set": {
        "n": 5
       }
      },
      null,
      {
       "set": {
        "n": 7
       }
      }
     ]
    }
   ]
  },
  {
   "title": "Ganga Dadi's Grand Test",
   "sec": "Let Us Enhance Our Learning",
   "icon": "<svg viewBox='0 0 48 48'><rect x='10' y='6' width='28' height='36' rx='3' fill='#efdcae'/><path d='M15 16h18M15 22h18M15 28h12' stroke='#2a2418' stroke-width='2.5'/><path d='M30 34 l4 4 l8 -10' stroke='#35c29a' stroke-width='3.5' fill='none'/></svg>",
   "brief": "The last lamp is lit only when all the end-of-chapter questions are answered. Ganga Dadi, Nalini and Prithvi have them ready.",
   "steps": [
    {
     "t": "m",
     "who": "k7s5_dadi",
     "say": "First question, beta. Read the four statements carefully.",
     "q": "Which statements are characteristics of a physical change? (i) The state of the substance may or may not change. (ii) A substance with different properties is formed. (iii) No new substance is formed. (iv) The substance undergoes a chemical reaction.",
     "o": [
      "(i) and (ii)",
      "(ii) and (iii)",
      "(i) and (iii)",
      "(iii) and (iv)"
     ],
     "a": 2,
     "h": "In a physical change, is anything new formed?",
     "xs": [
      "(i) True: the state may change (ice → water) or not (folding paper).",
      "(ii) A new substance with different properties = chemical change, not physical.",
      "(iii) True: no new substance is formed.",
      "(iv) A chemical reaction = chemical change.",
      "So the answer is (c): (i) and (iii)."
     ],
     "ref": "Let us enhance our learning Q1, p. 69",
     "v": {
      "k": "sim",
      "sim": "k7s5_states",
      "p": {
       "temp": -10,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "temp": 50
       },
       "show": "state"
      },
      null,
      {
       "show": "state,change"
      },
      null,
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "o",
     "kind": "Think",
     "who": "k7s5_prithvi",
     "say": "Let me predict which of these can be reversed. Some I'm not sure about!",
     "q": "Q2: Predict which changes can be reversed and which cannot: (i) stitching cloth to a shirt (ii) twisting a straight string (iii) making idlis from batter (iv) dissolving sugar in water (v) drawing water from a well (vi) ripening of fruits (vii) boiling water in an open pan (viii) rolling up a mat (ix) grinding wheat grains to flour (x) forming of soil from rocks. If you are not sure, say why.",
     "xs": [
      "Can be reversed: twisting a string (untwist it), dissolving sugar (evaporate the water to get the sugar back), drawing water (pour it back), rolling up a mat (unroll it).",
      "Stitching cloth to a shirt: can be unstitched, but the cloth now has needle holes — many would write 'not sure'.",
      "Boiling water in an open pan: the steam escapes into the air; in principle it can be condensed back, but in an open pan it is lost — 'not sure'.",
      "Cannot be reversed: making idlis, ripening of fruits, grinding wheat to flour, forming soil from rocks.",
      "We are unsure when the original can be got back only partly or only with special arrangements."
     ],
     "ref": "Let us enhance our learning Q2, p. 69",
     "v": {
      "k": "sim",
      "sim": "k7s5_sort",
      "p": {
       "mode": "cols",
       "cols": [
        "Yes",
        "Not sure",
        "No"
       ],
       "items": [
        [
         "Twisting string",
         0
        ],
        [
         "Dissolving sugar",
         0
        ],
        [
         "Drawing water",
         0
        ],
        [
         "Rolling up a mat",
         0
        ],
        [
         "Stitching a shirt",
         1
        ],
        [
         "Boiling (open pan)",
         1
        ],
        [
         "Making idlis",
         2
        ],
        [
         "Ripening fruits",
         2
        ],
        [
         "Grinding wheat",
         2
        ],
        [
         "Soil from rocks",
         2
        ]
       ],
       "n": 10,
       "lx": "Q2: Can it be reversed?",
       "show": "count"
      }
     }
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "True or false time! Only one of these four statements is false.",
     "q": "Q3: Which statement is False? (i) Melting of wax is necessary for burning a candle. (ii) Collecting water vapour by condensing involves a chemical change. (iii) Converting leaves into compost is a chemical change. (iv) Mixing baking soda with lemon juice is a chemical change.",
     "o": [
      "(i)",
      "(ii)",
      "(iii)",
      "(iv)"
     ],
     "a": 1,
     "h": "Is liquid water from condensed vapour a new substance?",
     "xs": [
      "(i) True: wax must melt and evaporate before its vapour burns.",
      "(ii) False. Correct statement: collecting water vapour by condensing involves a physical change.",
      "(iii) True: leaves decompose into new substances in compost.",
      "(iv) True: carbon dioxide, a new substance, is formed."
     ],
     "ref": "Let us enhance our learning Q3, p. 69",
     "v": {
      "k": "sim",
      "sim": "k7s5_states",
      "p": {
       "temp": 110,
       "show": "state"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "temp": 60
       },
       "show": "state,change"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Hey, that's me in the book! My cycle handle has brown deposits.",
     "q": "Q4 (i): The brown deposits on the cycle handle are due to ________, and this is a ________ change.",
     "o": [
      "dust; physical",
      "rusting; chemical",
      "paint; physical",
      "melting; physical"
     ],
     "a": 1,
     "h": "Iron + moist air gives a brown substance.",
     "xs": [
      "The iron of the handle reacts with oxygen and moisture.",
      "Brown rust (iron oxide) forms.",
      "A new substance: a chemical change."
     ],
     "ref": "Let us enhance our learning Q4 (i), p. 70",
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "nail",
       "t": 0,
       "moist": 1,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 8
       }
      },
      {
       "show": "what"
      },
      {
       "show": "what,kind"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "Two more blanks for me.",
     "q": "Q4 (ii) and (iii): Folding a handkerchief is a ______ change and can be ______. A chemical process in which a substance reacts with oxygen with evolution of heat is called ______, and this is a ______ change.",
     "o": [
      "chemical, reversed; rusting, physical",
      "physical, reversed; combustion, chemical",
      "physical, never reversed; melting, physical",
      "chemical, never reversed; combustion, physical"
     ],
     "a": 1,
     "h": "Can you unfold a handkerchief? What do we call burning in oxygen?",
     "xs": [
      "(ii) Folding a handkerchief is a physical change and can be reversed (unfold it).",
      "(iii) Reaction with oxygen giving heat is combustion.",
      "Combustion is a chemical change."
     ],
     "ref": "Let us enhance our learning Q4 (ii), (iii), p. 70",
     "v": {
      "k": "sim",
      "sim": "k7s5_fire",
      "p": {
       "mode": "tri",
       "fuel": 1,
       "oxy": 1,
       "heat": 1,
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "show": "res"
      },
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_dadi",
     "say": "Remember the magnesium ribbon from the metals chapter.",
     "q": "Q4 (iv): Magnesium, when burnt in air, produces a substance called ______. The substance formed is ______ in nature. Burning of magnesium is a ______ change.",
     "o": [
      "magnesium oxide; basic; chemical",
      "magnesium oxide; acidic; physical",
      "carbon dioxide; acidic; chemical",
      "rust; basic; physical"
     ],
     "a": 0,
     "h": "Oxides of metals are basic.",
     "xs": [
      "Magnesium + Oxygen → Magnesium oxide.",
      "Magnesium is a metal; metal oxides are basic in nature.",
      "A new substance forms, so burning magnesium is a chemical change."
     ],
     "ref": "Let us enhance our learning Q4 (iv), p. 70",
     "v": {
      "k": "lines",
      "l": [
       "Magnesium + Oxygen → ?",
       "nature of the oxide: ?",
       "type of change: ?"
      ]
     }
    },
    {
     "t": "o",
     "kind": "Explain",
     "who": "guide",
     "say": "Explain like a scientist.",
     "q": "Q5: Are the changes of water to ice and water to steam physical or chemical? Explain.",
     "xs": [
      "Both are physical changes.",
      "Water to ice (freezing) and water to steam (boiling/evaporation) change only the state.",
      "Ice, water and steam are all the same substance, water; no new substance is formed.",
      "Both can be reversed: ice melts back to water, and steam condenses back to water."
     ],
     "ref": "Let us enhance our learning Q5, p. 70",
     "v": {
      "k": "sim",
      "sim": "k7s5_states",
      "p": {
       "temp": -10,
       "show": "state,change"
      }
     },
     "xa": [
      {
       "set": {
        "temp": 50
       }
      },
      {
       "set": {
        "temp": 110
       }
      },
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_dadi",
     "say": "I set curd every night for the morning lassi.",
     "q": "Q6: Is curdling of milk a physical or a chemical change?",
     "o": [
      "Physical — only the state changes",
      "Physical — it can be reversed",
      "Chemical — curd is a new substance with a different taste and texture, and cannot be turned back into milk",
      "Neither — nothing changes"
     ],
     "a": 2,
     "h": "Can curd be turned back into milk?",
     "xs": [
      "Milk changes into curd, with a sour taste and a thick texture.",
      "Curd is a new substance.",
      "It cannot be changed back into milk.",
      "So curdling of milk is a chemical change."
     ],
     "ref": "Let us enhance our learning Q6, p. 70",
     "v": {
      "k": "lines",
      "l": [
       "Milk + a spoon of curd",
       "left overnight → curd",
       "Physical or chemical?"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "Wind and rain helped make the soil in Dadi's garden.",
     "q": "Q7: Natural factors such as wind and rain help form soil from rocks. Is this change physical or chemical?",
     "o": [
      "Only physical",
      "Only chemical",
      "Neither",
      "Both — rocks break into pieces (physical) and react with water and air (chemical): weathering"
     ],
     "a": 3,
     "h": "Remember the cracked cliff and the red basalt.",
     "xs": [
      "Wind, rain, heating and cooling break rocks into smaller pieces: physical changes.",
      "Water and air react with substances in rocks, like iron in basalt: chemical changes.",
      "Together these are weathering, which forms soil.",
      "Moving the pieces by wind and water (erosion) is physical."
     ],
     "ref": "Let us enhance our learning Q7, p. 70",
     "v": {
      "k": "sim",
      "sim": "k7s5_slow",
      "p": {
       "obj": "rock",
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 4
       }
      },
      {
       "set": {
        "t": 9
       },
       "show": "what"
      },
      {
       "show": "what,kind"
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7s5_prithvi",
     "say": "That's me now! The story 'Eco-friendly Prithvi'.",
     "q": "Q8: Prithvi chops vegetables, peels potatoes and cuts fruits (1); collects peels and seeds in a clay pot (2); the peels decompose into compost by bacteria and fungi (3); seeds germinate, grow and bloom into flowers (4). Which choice is correct for 1, 2, 3, 4?",
     "o": [
      "1 physical, 2 physical, 3 chemical, 4 chemical",
      "1 chemical, 2 physical, 3 physical, 4 chemical",
      "all four physical",
      "1 physical, 2 chemical, 3 chemical, 4 physical"
     ],
     "a": 0,
     "h": "Which steps make new substances?",
     "xs": [
      "Chopping, peeling, cutting: only size and shape change — physical.",
      "Collecting in a pot: just moving things — physical.",
      "Decomposing into compost: new substances — chemical.",
      "Germinating and growing into flowers: new substances are made in the plant — chemical.",
      "A suitable title: 'From Peels to Petals'."
     ],
     "ref": "Let us enhance our learning Q8, p. 70",
     "v": {
      "k": "sim",
      "sim": "k7s5_sort",
      "p": {
       "mode": "cols",
       "cols": [
        "Physical",
        "Chemical"
       ],
       "items": [
        [
         "Chopping, peeling",
         0
        ],
        [
         "Collecting in pot",
         0
        ],
        [
         "Peels → compost",
         1
        ],
        [
         "Seeds → flowers",
         1
        ]
       ],
       "n": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "n": 1
       }
      },
      {
       "set": {
        "n": 2
       }
      },
      {
       "set": {
        "n": 3
       }
      },
      {
       "set": {
        "n": 4
       },
       "show": "last"
      },
      null
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Q9: Let's sort nine changes into the circles. A is physical, B is chemical, and C, where they overlap, is both.",
     "note": "A (physical): tearing paper, melting ice, folding clothes. B (chemical): rusting, curdling of milk, ripening of fruits, burning magnesium, baking soda + vinegar. C (both): burning a candle.",
     "xs": [
      "Tearing paper, melting ice, folding clothes: no new substance — A.",
      "Rusting, curdling milk, ripening fruits: new substances — B.",
      "Burning magnesium, mixing baking soda with vinegar: new substances — B.",
      "Burning a candle: wax melts (physical) and its vapour burns (chemical) — C."
     ],
     "v": {
      "k": "sim",
      "sim": "k7s5_sort",
      "p": {
       "mode": "venn",
       "items": [
        [
         "Tearing paper",
         0
        ],
        [
         "Melting ice",
         0
        ],
        [
         "Folding clothes",
         0
        ],
        [
         "Rusting",
         1
        ],
        [
         "Curdling milk",
         1
        ],
        [
         "Ripening fruits",
         1
        ],
        [
         "Burning Mg",
         1
        ],
        [
         "Soda + vinegar",
         1
        ],
        [
         "Burning candle",
         2
        ]
       ],
       "n": 0,
       "lx": "Q9: A physical · B chemical · C both",
       "show": "last"
      }
     },
     "xa": [
      {
       "set": {
        "n": 3
       }
      },
      {
       "set": {
        "n": 6
       }
      },
      {
       "set": {
        "n": 8
       }
      },
      {
       "set": {
        "n": 9
       },
       "hl": "z1"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7s5_nalini",
     "say": "Which one sits in the middle, in area C?",
     "q": "Q9: Which of the given changes belongs in area C (both physical and chemical)?",
     "o": [
      "Melting of ice",
      "Rusting",
      "Process of burning a candle",
      "Folding of clothes"
     ],
     "a": 2,
     "h": "Which process has a melting part and a burning part?",
     "xs": [
      "In a burning candle, wax melts and evaporates: physical.",
      "The wax vapour burns: chemical.",
      "So it involves both and goes in C."
     ],
     "ref": "Let us enhance our learning Q9, pp. 70–71",
     "v": {
      "k": "sim",
      "sim": "k7s5_candle3d",
      "p": {
       "cover": 0,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "phys"
      },
      {
       "show": "phys,chem"
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7s5_dadi",
     "say": "Last question! Four tubes: (a) vinegar + baking soda, (b) lemon juice + vinegar, (c) vinegar + common salt, (d) lemon juice + baking soda. Each gas goes into lime water.",
     "q": "Q10 (Fig. 5.11): In which case(s) does the lime water turn milky?",
     "o": [
      "(a) and (d)",
      "(b) and (c)",
      "Only (a)",
      "All four"
     ],
     "a": 0,
     "h": "Which mixtures fizz and give carbon dioxide?",
     "xs": [
      "(a) Vinegar + baking soda gives carbon dioxide: milky.",
      "(b) Lemon juice + vinegar: no gas, stays clear.",
      "(c) Vinegar + common salt: salt just dissolves, stays clear.",
      "(d) Lemon juice + baking soda gives carbon dioxide: milky.",
      "Carbon dioxide turns lime water milky, so (a) and (d)."
     ],
     "ref": "Let us enhance our learning Q10, p. 71",
     "v": {
      "k": "sim",
      "sim": "k7s5_lime",
      "p": {
       "src": 2,
       "liq": 1,
       "t": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "t": 1
       },
       "show": "gas,obs"
      },
      {
       "set": {
        "src": 3
       }
      },
      {
       "set": {
        "src": 4
       }
      },
      {
       "set": {
        "src": 5
       }
      },
      null
     ]
    },
    {
     "t": "o",
     "kind": "Project",
     "who": "k7s5_nalini",
     "say": "A secret message for the lamp festival! Caution: do it with an adult.",
     "q": "Exploratory project: Write a message with lemon juice as ink and let it dry — it becomes invisible. Warm the paper with an iron (or carefully over a candle flame) — the letters turn dark brown. Can any of these changes be reversed?",
     "xs": [
      "Drying of the lemon juice ink: the water evaporates — a physical change.",
      "Heating: the lemon juice on the paper chars and turns brown — new substances form, a chemical change.",
      "The browning cannot be reversed: the letters never become invisible again.",
      "The drying could in principle be undone by wetting, but the original fresh juice is not fully recovered."
     ],
     "ref": "Exploratory Projects, p. 71",
     "v": {
      "k": "lines",
      "l": [
       "Lemon-juice ink dries → invisible",
       "Warm it → brown letters",
       "Browning = chemical, not reversible"
      ]
     }
    },
    {
     "t": "o",
     "kind": "Project",
     "who": "k7s5_prithvi",
     "say": "Two more projects: one for the hills, one for the kitchen.",
     "q": "Exploratory projects: (a) Discuss what steps we can take to reduce landslides and rock erosion. (b) Observe the activities in the kitchen and note any changes that can be reversed. Are they physical or chemical?",
     "xs": [
      "(a) Plant trees and grass on slopes — roots hold the soil.",
      "(a) Avoid cutting hills and forests carelessly for roads and buildings; build retaining walls, terraces and proper drains for rainwater.",
      "(b) Reversible kitchen changes: melting ghee or butter, freezing water into ice, steam condensing on a lid, dissolving salt or sugar in water, kneading dough into balls.",
      "(b) All of these are physical changes. Cooking, burning gas and curdling are chemical and cannot be reversed."
     ],
     "ref": "Exploratory Projects, p. 71",
     "v": {
      "k": "lines",
      "l": [
       "Landslides: trees, terraces, walls, drains",
       "Kitchen: melting ghee, freezing water, dissolving sugar",
       "Reversible ones here are physical"
      ]
     }
    },
    {
     "t": "o",
     "kind": "Project",
     "who": "k7s5_dadi",
     "say": "Yeast makes my bread soft and fluffy. And the girgit in the garden changes colour! Find out how.",
     "q": "Exploratory projects: (a) Put sugar solution and a spoonful of yeast in a small bottle, cover it with a balloon and wait an hour. Then shake the gas from the balloon with lime water. What do you observe and conclude? Which changes are physical and which chemical? (b) Is a chameleon's colour change a change that can be reversed?",
     "xs": [
      "(a) The balloon inflates: a gas is produced.",
      "(a) The lime water turns milky, so the gas is carbon dioxide.",
      "(a) Conclusion: yeast acts on sugar and produces carbon dioxide; this gas makes bread fluffy and soft.",
      "(a) Dissolving sugar and the balloon inflating are physical changes; yeast breaking down sugar into carbon dioxide and the lime water turning milky are chemical changes.",
      "(b) A chameleon changes colour to blend in or when angry or afraid, and changes back again — it is a change that can be reversed."
     ],
     "ref": "Exploratory Projects, p. 72",
     "v": {
      "k": "sim",
      "sim": "k7s5_lime",
      "p": {
       "src": 1,
       "liq": 1,
       "t": 1,
       "lx": "Gas from the yeast balloon → lime water",
       "show": "gas,obs"
      }
     }
    }
   ]
  }
 ],
 "summary": [
  [
   "Changes around us",
   "Things around us change in size, shape, state, colour, smell and other properties. We notice these changes with our senses of sight, smell, touch, hearing and taste."
  ],
  [
   "Physical change",
   "Only physical properties such as shape, size and state change and no new substance is formed: folding paper, deflating a balloon, crushing chalk, melting ice, boiling and condensing water."
  ],
  [
   "Chemical change",
   "One or more new substances are formed through a chemical reaction, which can be written as a chemical equation. Carbon dioxide turns lime water milky: Calcium hydroxide + Carbon dioxide → Calcium carbonate + Water. Vinegar + baking soda → Carbon dioxide + other substances."
  ],
  [
   "Rusting and combustion",
   "Rusting forms a new brown substance, iron oxide. Combustion is a reaction of a substance with oxygen that gives heat and/or light, like burning magnesium: Magnesium + Oxygen → Magnesium oxide + Heat + Light. Wood, paper, cotton and kerosene are combustible."
  ],
  [
   "What fire needs",
   "A covered candle goes out because oxygen is needed for combustion. The lowest temperature at which a substance catches fire is its ignition temperature. The fire triangle: fuel, oxygen and heat. A blanket smothers a fire by cutting off air."
  ],
  [
   "Both in one process",
   "In a burning candle the wax melts, rises up the wick and evaporates (physical changes) and the wax vapour burns (a chemical change). Fireflies make light by a chemical change without heat: bioluminescence."
  ],
  [
   "Reversible or not",
   "Some changes can be reversed (melting ice, evaporating water, folding paper) and some cannot (chopping vegetables, popcorn, burning, rusting). Even some physical changes cannot be reversed."
  ],
  [
   "Desirable or not",
   "Curd, ripening and cooking are desirable; rusting and food decay are undesirable, though decay can make useful compost. Burning more fuel adds carbon dioxide to the air, and drying paint pollutes the atmosphere."
  ],
  [
   "Slow natural changes",
   "Temperature changes, roots and freezing water break rocks into sediments (physical); water and air form red iron oxide on basalt (chemical). Together this is weathering, which makes soil. Erosion by wind and water moves sediments: a physical change taking thousands of years."
  ]
 ]
});
