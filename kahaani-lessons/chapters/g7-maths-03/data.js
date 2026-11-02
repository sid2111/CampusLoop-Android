const BOOK_TITLE = "Chinti and the Silk Looms of Kanchipuram";
const GRADE = "7";
const BOOK = {"name":"Ganita Prakash","short":"Ganita","part":"Part I","key":"ganita7-p1-v4","subj":"Maths","minimal":true};
const CHAPTERS = [];
CHAPTERS.push({
 "no": 3,
 "title": "A Peek Beyond the Point",
 "story": "Chinti and the Silk Looms of Kanchipuram",
 "intro": "On the weavers' street of Kanchipuram, Sonu's Amma is weaving a silk saree for the temple festival, and every screw, thread and border must be measured exactly. Chinti, a tiny red ant with a big magnifying glass, sees the smallest marks on any ruler. Help her peek beyond the point, loom by loom, until the festival saree is woven!",
 "theme": {
  "scene": "k7m3_looms",
  "guide": "k7m3_chinti",
  "guideName": "Chinti",
  "unit": "Loom",
  "doneStamp": "WOVEN!",
  "badge": "Master Weaver of Decimals"
 },
 "people": {
  "k7m3_sonu": {
   "name": "Sonu",
   "skin": "#a96d45",
   "hair": "short",
   "bg": "#62b6e8",
   "shirt": "#f4a51c"
  },
  "k7m3_amma": {
   "name": "Sonu's Amma",
   "skin": "#9a6240",
   "hair": "bun",
   "bg": "#e04a86",
   "shirt": "#35c29a"
  },
  "k7m3_shylaja": {
   "name": "Shylaja",
   "skin": "#b97c50",
   "hair": "long",
   "bg": "#35c29a",
   "shirt": "#e04a86"
  },
  "k7m3_priya": {
   "name": "Priya",
   "skin": "#c68b5d",
   "hair": "curly",
   "bg": "#f4a51c",
   "shirt": "#6a5acd"
  },
  "k7m3_zara": {
   "name": "Zara",
   "skin": "#d2a07a",
   "hair": "long",
   "bg": "#6a5acd",
   "shirt": "#35c29a"
  },
  "k7m3_sarayu": {
   "name": "Sarayu",
   "skin": "#8e5a38",
   "hair": "bun",
   "bg": "#62b6e8",
   "shirt": "#e04a86"
  },
  "k7m3_mahi": {
   "name": "Mahi",
   "skin": "#b67a4f",
   "hair": "long",
   "bg": "#e04a86",
   "shirt": "#f4a51c"
  },
  "k7m3_pinto": {
   "name": "Pinto",
   "skin": "#94603c",
   "hair": "curly",
   "bg": "#35c29a",
   "shirt": "#3a4f9a"
  },
  "k7m3_tinku": {
   "name": "Tinku",
   "skin": "#a46a42",
   "hair": "short",
   "bg": "#f4a51c",
   "shirt": "#2f6d5a"
  }
 },
 "cases": [
  {
   "title": "The Wobbly Loom Screw",
   "sec": "3.1 The Need for Smaller Units · 3.2 A Tenth Part",
   "icon": "<svg viewBox='0 0 48 48'><rect x='4' y='30' width='40' height='12' rx='2' fill='#f2d35b'/><path d='M8 30v5M12 30v3M16 30v3M20 30v5M24 30v3M28 30v3M32 30v5M36 30v3M40 30v5' stroke='#2a2418' stroke-width='1.5'/><rect x='6' y='12' width='7' height='12' rx='2' fill='#8fa0c8'/><path d='M13 15h20l6 3-6 3H13z' fill='#b3c0de' stroke='#3d4c75'/></svg>",
   "brief": "Amma's loom will not close: two screws look the same but are not. Chinti peeks between the centimetre marks.",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "Vanakkam! I'm Chinti, the smallest helper on the weavers' street. Sonu's Amma is fixing her loom, but the first screw does not fit. The two screws look the same. Are they?",
     "note": "When exact measures are needed, we split a unit into smaller equal parts.",
     "xs": [
      "On a ruler with only centimetre marks, the screw is just 'between 2 cm and 3 cm'.",
      "That is not exact enough to choose the right screw.",
      "Now each centimetre is split into 10 equal parts.",
      "The screw ends 7 small parts after 2: it is 2 [7/10] cm long."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 2.7,
       "a": 0,
       "b": 4,
       "div": 1,
       "obj": "screw",
       "unit": "cm",
       "show": "none",
       "lx": "Amma's loom screw"
      }
     },
     "xa": [
      null,
      {
       "hl": "obj"
      },
      {
       "set": {
        "div": 10
       }
      },
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "Three rulers, three answers: 'between 2 and 3', 'more than 2 [1/2] but less than 3', and '2 [7/10] cm'.",
     "q": "Which scale helped measure the screws accurately, and why?",
     "o": [
      "The scale marked only in whole centimetres, because it is simplest",
      "The scale with each centimetre split into 2 halves",
      "The scale with each centimetre split into 10 equal parts, because it shows how many small parts beyond 2 cm the screw ends",
      "All three scales are equally accurate"
     ],
     "a": 2,
     "h": "Which ruler lets you say exactly where the screw ends?",
     "ref": "In-text question, p. 47",
     "xs": [
      "Whole-centimetre marks only tell us 'between 2 and 3'.",
      "Halves tell us 'more than 2 [1/2]', still not exact.",
      "Tenths let us count: 2 cm and 7 small parts, 2 [7/10] cm.",
      "Smaller parts give a more accurate measure."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 2.7,
       "a": 0,
       "b": 4,
       "div": 2,
       "obj": "screw",
       "unit": "cm",
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "div": 1
       }
      },
      {
       "set": {
        "div": 2
       }
      },
      {
       "set": {
        "div": 10
       },
       "show": "all"
      },
      null
     ]
    },
    {
     "t": "s",
     "who": "k7m3_amma",
     "say": "Here is the meaning of 2 [7/10] cm: go from 0 to 2, then take seven parts of [1/10]. The second screw is 3 [2/10] cm.",
     "note": "2 [7/10] cm = 2 cm and [7/10] cm, read 'two and seven-tenth centimetres'.",
     "xs": [
      "The unit between two numbers is divided into 10 equal parts, each [1/10] cm.",
      "2 [7/10] cm means 2 cm and 7 parts of [1/10] cm.",
      "We read it as two and seven-tenth centimetres.",
      "The other screw: 3 cm and 2 tenths, three and two-tenth centimetres."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 2.7,
       "a": 0,
       "b": 4,
       "div": 10,
       "obj": "screw",
       "unit": "cm",
       "show": "val,parts"
      }
     },
     "xa": [
      {
       "hl": "ticks"
      },
      null,
      null,
      {
       "set": {
        "len": 3.2
       }
      }
     ]
    },
    {
     "t": "o",
     "kind": "Activity",
     "who": "guide",
     "say": "Your turn with a real ruler, like Amma uses at the loom.",
     "q": "Explain why the unit was divided into smaller parts to measure the screws. Then measure a pen, a sharpener and one more object, and write each length in centimetres (like 2 [7/10] cm).",
     "ref": "In-text questions, p. 47",
     "xs": [
      "The screws were both 'between 2 cm and 3 cm', so whole centimetres could not tell them apart.",
      "Splitting 1 cm into 10 equal parts lets us count the leftover bit exactly.",
      "Sample answers: pen 13 [5/10] cm, sharpener 3 [2/10] cm, eraser 4 [1/10] cm (your own objects will differ).",
      "Always count whole centimetres first, then the tenths after the last whole mark."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 3.2,
       "a": 0,
       "b": 5,
       "div": 10,
       "obj": "bar",
       "unit": "cm",
       "show": "all",
       "lx": "a sharpener"
      }
     }
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "Amma's work-box has an eraser, a pencil and a piece of tailor's chalk lying on rulers.",
     "q": "The picture shows the eraser ending 4 tenths after 2 cm, the pencil 5 tenths after 4 cm and the chalk 4 tenths after 1 cm. Their lengths are:",
     "o": [
      "Eraser 2 [4/10] cm, pencil 4 [5/10] cm, chalk 1 [4/10] cm",
      "Eraser 2 [4/100] cm, pencil 4 [5/100] cm, chalk 1 [4/100] cm",
      "Eraser 24 cm, pencil 45 cm, chalk 14 cm",
      "Eraser 2 [1/4] cm, pencil 4 [1/5] cm, chalk 1 [1/4] cm"
     ],
     "a": 0,
     "h": "Each small part is one-tenth of a centimetre.",
     "ref": "In-text question, p. 47",
     "xs": [
      "Eraser: 2 whole cm and 4 tenths, 2 [4/10] cm.",
      "Pencil: 4 cm and 5 tenths, 4 [5/10] cm, which is also 4 [1/2] cm.",
      "Chalk: 1 cm and 4 tenths, 1 [4/10] cm."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 2.4,
       "a": 0,
       "b": 5,
       "div": 10,
       "obj": "eraser",
       "unit": "cm",
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "all"
      },
      {
       "set": {
        "len": 4.5
       }
      },
      {
       "set": {
        "len": 1.4
       }
      }
     ]
    },
    {
     "t": "x",
     "who": "k7m3_amma",
     "say": "I need a pencil exactly 4 [5/10] cm long to mark the border.",
     "q": "Slide the pencil so its length is 4 [5/10] cm.",
     "goal": {
      "len": 4.5
     },
     "h": "Go to 4, then 5 small parts more.",
     "ref": "In-text question, p. 47 (hands-on)",
     "xs": [
      "Count 4 whole centimetres.",
      "Then 5 tenths more: halfway to 5.",
      "4 [5/10] cm = 4 [1/2] cm."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 2,
       "a": 0,
       "b": 5,
       "div": 10,
       "obj": "pencil",
       "unit": "cm",
       "show": "none",
       "slider": "len"
      }
     },
     "xa": [
      null,
      null,
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "In 3.2 we meet the tenth part properly. This pencil is 3 [4/10] units: 3 units and four one-tenths.",
     "note": "10 one-tenths make 1 unit, so 3 [4/10] = 34 one-tenths = [34/10].",
     "xs": [
      "3 [4/10] units = (3 × 1) + (4 × [1/10]) units.",
      "Ten pieces of [1/10] together make 10 × [1/10] = 1 unit.",
      "So 3 units are 30 tenths; add 4 tenths: 34 tenths.",
      "3 [4/10] = [34/10]: two ways to write the same length."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 3.4,
       "a": 0,
       "b": 4,
       "div": 10,
       "obj": "pencil",
       "unit": "units",
       "show": "val"
      }
     },
     "xa": [
      null,
      {
       "hl": "ticks"
      },
      {
       "show": "all"
      },
      null
     ],
     "ref": "Section 3.2, p. 48–49"
    },
    {
     "t": "m",
     "who": "k7m3_shylaja",
     "say": "Reading these aloud trips me up! 4 [1/10] is 'four and one-tenth'.",
     "q": "How do we read [41/10] and 41 [1/10]?",
     "o": [
      "Both are 'forty-one tenths'",
      "[41/10] is 'forty-one and one-tenth'; 41 [1/10] is 'forty-one tenths'",
      "[41/10] is 'four and one-tenth'; 41 [1/10] is 'four hundred and eleven tenths'",
      "[41/10] is 'forty-one one-tenths' (forty-one tenths); 41 [1/10] is 'forty-one and one-tenth'"
     ],
     "a": 3,
     "h": "A fraction alone counts tenths; a whole number before it means 'and'.",
     "ref": "Reading fractional units, p. 49",
     "xs": [
      "4 [1/10]: four and one-tenth.",
      "[4/10]: four one-tenths, or four-tenths.",
      "[41/10]: forty-one one-tenths, or forty-one tenths.",
      "41 [1/10]: forty-one and one-tenth."
     ],
     "v": {
      "k": "table",
      "head": [
       "Written",
       "Read as"
      ],
      "rows": [
       [
        "4 [1/10]",
        "four and one-tenth"
       ],
       [
        "[4/10]",
        "four one-tenths / four-tenths"
       ],
       [
        "[41/10]",
        "?"
       ],
       [
        "41 [1/10]",
        "?"
       ]
      ]
     }
    },
    {
     "t": "o",
     "kind": "Activity",
     "who": "k7m3_sonu",
     "say": "The USB cable is 4 and [8/10] units, or [48/10] units. The pencil box, thumb and mango leaf are next.",
     "q": "For each object in the picture (USB cable, pencil box, thumb, leaf), write its length in two ways (mixed and as tenths) and read it aloud. The unit is not the same in every picture.",
     "ref": "In-text question, p. 49",
     "xs": [
      "Count whole units up to the last whole mark before the end.",
      "Count the tenths after it: USB cable = 4 [8/10] units.",
      "Convert: 4 units = 40 tenths, plus 8 tenths = [48/10] units.",
      "Read: 'four and eight-tenth units' or 'forty-eight tenths'. Do the same for each object."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 4.8,
       "a": 0,
       "b": 5,
       "div": 10,
       "obj": "bar",
       "unit": "units",
       "show": "all",
       "lx": "USB cable"
      }
     }
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "Eight silk ribbons for the festival. Line them up from shortest to longest!",
     "q": "Arrange in increasing order: [9/10], 1 [7/10], [130/10], 13 [1/10], 10 [5/10], 7 [6/10], 6 [7/10], [4/10].",
     "o": [
      "[4/10], [9/10], 1 [7/10], 6 [7/10], 7 [6/10], 10 [5/10], [130/10], 13 [1/10]",
      "[9/10], [4/10], 1 [7/10], 7 [6/10], 6 [7/10], 10 [5/10], 13 [1/10], [130/10]",
      "[4/10], [9/10], [130/10], 1 [7/10], 6 [7/10], 7 [6/10], 10 [5/10], 13 [1/10]",
      "[4/10], [9/10], 1 [7/10], 7 [6/10], 6 [7/10], [130/10], 10 [5/10], 13 [1/10]"
     ],
     "a": 0,
     "h": "Change each into tenths, or compare whole parts first.",
     "ref": "In-text question, p. 49",
     "xs": [
      "In tenths: 9, 17, 130, 131, 105, 76, 67, 4.",
      "[130/10] = 13, and 13 [1/10] is 1 tenth more.",
      "6 [7/10] (67 tenths) is less than 7 [6/10] (76 tenths).",
      "Order: [4/10], [9/10], 1 [7/10], 6 [7/10], 7 [6/10], 10 [5/10], [130/10], 13 [1/10]."
     ],
     "v": {
      "k": "table",
      "head": [
       "Ribbon",
       "Length",
       "In tenths"
      ],
      "rows": [
       [
        "(a)",
        "[9/10]",
        "?"
       ],
       [
        "(b)",
        "1 [7/10]",
        "?"
       ],
       [
        "(c)",
        "[130/10]",
        "?"
       ],
       [
        "(d)",
        "13 [1/10]",
        "?"
       ],
       [
        "(e)",
        "10 [5/10]",
        "?"
       ],
       [
        "(f)",
        "7 [6/10]",
        "?"
       ],
       [
        "(g)",
        "6 [7/10]",
        "?"
       ],
       [
        "(h)",
        "[4/10]",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "One more line-up, and two of them are twins!",
     "q": "Arrange in increasing order: 4 [1/10], [4/10], [41/10], 41 [1/10].",
     "o": [
      "[4/10] < 4 [1/10] < [41/10] < 41 [1/10]",
      "[4/10] < [41/10] = 4 [1/10] < 41 [1/10]",
      "4 [1/10] < [4/10] < 41 [1/10] < [41/10]",
      "[41/10] < [4/10] < 4 [1/10] < 41 [1/10]"
     ],
     "a": 1,
     "h": "[41/10] = 40 tenths + 1 tenth.",
     "ref": "In-text question, p. 50",
     "xs": [
      "[4/10] is less than one unit.",
      "[41/10] = 4 units and 1 tenth = 4 [1/10]: equal!",
      "41 [1/10] is forty-one units and a tenth: the longest.",
      "So [4/10] < [41/10] = 4 [1/10] < 41 [1/10]."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 0.4,
       "a": 0,
       "b": 5,
       "div": 10,
       "obj": "ribbon",
       "unit": "units",
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "len": 4.1
       },
       "show": "all"
      },
      null,
      null
     ]
    }
   ]
  },
  {
   "title": "Tenths on the Tape",
   "sec": "3.2 A Tenth Part (adding, subtracting, patterns)",
   "icon": "<svg viewBox='0 0 48 48'><circle cx='24' cy='24' r='18' fill='#f2d35b' stroke='#a88a1c' stroke-width='2'/><circle cx='24' cy='24' r='6' fill='#a88a1c'/><path d='M24 6v6M42 24h-6M24 42v-6M6 24h6' stroke='#2a2418' stroke-width='2'/></svg>",
   "brief": "Sonu measures arms, honeybees and fish with a tape split into tenths, and spots number patterns.",
   "steps": [
    {
     "t": "s",
     "who": "k7m3_sonu",
     "say": "My lower arm is 2 [7/10] units and my upper arm is 3 [6/10] units. How long is my whole arm?",
     "note": "Add units to units and tenths to tenths; 10 tenths make 1 more unit.",
     "xs": [
      "Units: 2 + 3 = 5. Tenths: 7 + 6 = 13.",
      "5 units and 13 tenths, but 13 tenths is too many for one place!",
      "13 tenths = 10 tenths + 3 tenths = 1 unit + 3 tenths.",
      "So the arm is 6 [3/10] units.",
      "Or in tenths: [27/10] + [36/10] = [63/10] = 6 [3/10]."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 2.7,
       "b": 3.6,
       "op": "+",
       "dp": 1,
       "step": 0,
       "ua": "2 [7/10]",
       "ub": "3 [6/10]",
       "show": "all"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      {
       "hl": "trade"
      },
      null,
      {
       "set": {
        "step": 2
       }
      }
     ],
     "ref": "In-text examples, p. 50–51"
    },
    {
     "t": "n",
     "who": "k7m3_sonu",
     "say": "A honeybee landed on Amma's silk! Head 2 [3/10] units, thorax 5 [4/10] units, abdomen 7 [5/10] units.",
     "q": "What is the total length of the honeybee? (Give your answer as a decimal, e.g. 6.3 for 6 [3/10].)",
     "ans": 15.2,
     "u": "units",
     "tol": 0.001,
     "h": "Add the whole parts, then the tenths, and regroup 10 tenths.",
     "ref": "In-text question, p. 51",
     "xs": [
      "Whole parts: 2 + 5 + 7 = 14.",
      "Tenths: 3 + 4 + 5 = 12 tenths = 1 unit + 2 tenths.",
      "Total = 14 + 1 + [2/10] = 15 [2/10] units."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 7.7,
       "b": 7.5,
       "op": "+",
       "dp": 1,
       "step": 0,
       "ua": "head + thorax",
       "ub": "abdomen",
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      null,
      {
       "set": {
        "step": 2
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "s",
     "who": "k7m3_shylaja",
     "say": "My hand is 12 [4/10] units long and my palm is 6 [7/10] units. My middle finger is the difference.",
     "note": "Subtract tenths first; if there are too few, split 1 unit into 10 tenths.",
     "xs": [
      "We need (12 + [4/10]) − (6 + [7/10]).",
      "We cannot take 7 tenths from 4 tenths.",
      "Split one unit of 12: now 11 units and 14 tenths.",
      "14 − 7 = 7 tenths; 11 − 6 = 5 units. The finger is 5 [7/10] units."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 12.4,
       "b": 6.7,
       "op": "−",
       "dp": 1,
       "step": 0,
       "ua": "12 [4/10]",
       "ub": "6 [7/10]",
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "step": 1
       }
      },
      {
       "hl": "trade"
      },
      {
       "set": {
        "step": 2
       }
      }
     ],
     "ref": "In-text example, p. 51"
    },
    {
     "t": "o",
     "kind": "Discuss",
     "who": "guide",
     "say": "The book also writes it as (12 − 6) + ([4/10] − [7/10]) = 6 − [3/10] = 5 + 1 − [3/10] = 5 + [10/10] − [3/10] = 5 [7/10].",
     "q": "Discuss what is being done in each line of this method and why.",
     "ref": "Discuss, p. 51",
     "xs": [
      "Line 1: units are subtracted from units, tenths from tenths.",
      "[4/10] − [7/10] would be 'less than nothing', so we get 6 − [3/10].",
      "To take away [3/10], split one of the 6 units: 6 = 5 + 1 = 5 + [10/10].",
      "[10/10] − [3/10] = [7/10], so the answer is 5 [7/10]: the same as borrowing."
     ],
     "v": {
      "k": "lines",
      "l": [
       "(12 − 6) + ([4/10] − [7/10])",
       "= 6 − [3/10]",
       "= 5 + [10/10] − [3/10]",
       "= 5 [7/10]"
      ]
     }
    },
    {
     "t": "n",
     "who": "k7m3_shylaja",
     "say": "Now try it by converting both lengths to tenths.",
     "q": "12 [4/10] = 124 tenths and 6 [7/10] = 67 tenths. How many tenths long is the finger?",
     "ans": 57,
     "u": "tenths",
     "tol": 0,
     "h": "124 − 67.",
     "ref": "In-text question, p. 51",
     "xs": [
      "124 tenths − 67 tenths = 57 tenths.",
      "[57/10] = 5 [7/10] units, the same answer as before."
     ],
     "v": {
      "k": "lines",
      "l": [
       "12 [4/10] = [124/10]",
       "6 [7/10] = [67/10]",
       "[124/10] − [67/10] = ?"
      ]
     }
    },
    {
     "t": "n",
     "who": "k7m3_sonu",
     "say": "Two tiny fish in the temple tank! A Celestial Pearl Danio is 2 [4/10] cm long, a Philippine Goby only [9/10] cm.",
     "q": "What is the difference in their lengths? (Write it as a decimal, e.g. 1.5 for 1 [5/10].)",
     "ans": 1.5,
     "u": "cm",
     "tol": 0.001,
     "h": "Split 1 cm of 2 [4/10] into tenths.",
     "ref": "In-text question, p. 52",
     "xs": [
      "2 [4/10] = 1 [14/10] after splitting a unit.",
      "14 tenths − 9 tenths = 5 tenths.",
      "Difference = 1 [5/10] cm. Both fish are shorter than your finger!"
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 2.4,
       "b": 0.9,
       "op": "−",
       "dp": 1,
       "step": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      null,
      {
       "set": {
        "step": 2
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "The border pattern grows in steps: 4, 4 [3/10], 4 [6/10], …",
     "q": "Pattern (a) is 4, 4 [3/10], 4 [6/10], … What are the next four terms?",
     "o": [
      "4 [9/10], 5 [3/10], 5 [6/10], 5 [9/10]",
      "4 [9/10], 5 [2/10], 5 [5/10], 5 [8/10]",
      "4 [9/10], 5, 5 [3/10], 5 [6/10]",
      "5, 5 [3/10], 5 [6/10], 5 [9/10]"
     ],
     "a": 1,
     "h": "Each term adds [3/10]. 4 [9/10] + [3/10] = 4 [12/10].",
     "ref": "In-text question, p. 52 (a)",
     "xs": [
      "The change is + [3/10] each time.",
      "4 [6/10] + [3/10] = 4 [9/10].",
      "4 [9/10] + [3/10] = 4 [12/10] = 5 [2/10].",
      "Then 5 [5/10], 5 [8/10]."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_nline",
      "p": {
       "a": 4,
       "b": 6,
       "parts": 20,
       "sub": 1,
       "auto": 0,
       "m": 6,
       "ptr": 1,
       "marks": "a:0,b:3,c:6",
       "show": "marks"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "m": 9
       },
       "show": "all"
      },
      {
       "set": {
        "m": 12
       }
      },
      {
       "set": {
        "m": 18
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "Patterns (b) and (c) grow too.",
     "q": "(b) 8 [2/10], 8 [7/10], 9 [2/10], … and (c) 7 [6/10], 8 [7/10], … What is the change in each?",
     "o": [
      "(b) + [5/10] each time; (c) + 1 [1/10] each time",
      "(b) + [7/10]; (c) + 1 [7/10]",
      "(b) + [5/10]; (c) + [1/10]",
      "(b) + 1; (c) + 1"
     ],
     "a": 0,
     "h": "Find the difference between the first two terms.",
     "ref": "In-text question, p. 52 (b), (c)",
     "xs": [
      "(b): 8 [7/10] − 8 [2/10] = [5/10].",
      "(b) continues 9 [7/10], 10 [2/10], 10 [7/10], 11 [2/10].",
      "(c): 8 [7/10] − 7 [6/10] = 1 [1/10].",
      "(c) continues 9 [8/10], 10 [9/10], 12, 13 [1/10]."
     ],
     "v": {
      "k": "table",
      "head": [
       "Pattern",
       "Change",
       "Next four"
      ],
      "rows": [
       [
        "(b) 8 [2/10], 8 [7/10], 9 [2/10]",
        "?",
        "?"
       ],
       [
        "(c) 7 [6/10], 8 [7/10]",
        "?",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "Some patterns go down, like a spool unwinding.",
     "q": "(d) 5 [7/10], 5 [3/10], … (e) 13 [5/10], 13, 12 [5/10], … (f) 11 [5/10], 10 [4/10], 9 [3/10], … What is the change in each?",
     "o": [
      "(d) − [3/10]; (e) − [5/10]; (f) − 1",
      "(d) − [4/10]; (e) − 1; (f) − 1 [1/10]",
      "(d) − [4/10]; (e) − [5/10]; (f) − 1 [1/10]",
      "(d) + [4/10]; (e) + [5/10]; (f) + 1 [1/10]"
     ],
     "a": 2,
     "h": "Subtract a term from the one before it.",
     "ref": "In-text question, p. 52 (d)–(f)",
     "xs": [
      "(d) − [4/10]: 4 [9/10], 4 [5/10], 4 [1/10], 3 [7/10].",
      "(e) − [5/10]: 12, 11 [5/10], 11, 10 [5/10].",
      "(f) − 1 [1/10]: 8 [2/10], 7 [1/10], 6, 4 [9/10]."
     ],
     "v": {
      "k": "table",
      "head": [
       "Pattern",
       "Change"
      ],
      "rows": [
       [
        "(d) 5 [7/10], 5 [3/10], …",
        "?"
       ],
       [
        "(e) 13 [5/10], 13, 12 [5/10], …",
        "?"
       ],
       [
        "(f) 11 [5/10], 10 [4/10], 9 [3/10], …",
        "?"
       ]
      ]
     }
    }
   ]
  },
  {
   "title": "The Folded Silk",
   "sec": "3.3 A Hundredth Part",
   "icon": "<svg viewBox='0 0 48 48'><path d='M6 10h36v28H6z' fill='#e04a86'/><path d='M6 10l18 14 18-14' fill='#c0306c'/><rect x='6' y='33' width='36' height='5' fill='#f4c430'/></svg>",
   "brief": "A silk sheet folded in half ends between two tenth-marks. Chinti splits each tenth into ten.",
   "steps": [
    {
     "t": "s",
     "who": "k7m3_amma",
     "say": "This silk sheet is 8 [9/10] units long. I fold it in half along its length. Where does it end now?",
     "note": "Split each tenth into 10 parts: each part is [1/100] of a unit, and 100 such parts make 1 unit.",
     "xs": [
      "Half of 8 [9/10] lies between 4 [4/10] and 4 [5/10] units: no mark is there.",
      "So split each one-tenth into 10 smaller equal parts.",
      "10 tenths × 10 parts = 100 parts in a unit: each is [1/100].",
      "The fold ends at 4 [4/10] [5/100]: 4 units, 4 tenths and 5 hundredths."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 4.45,
       "a": 4,
       "b": 5,
       "s": 4,
       "div": 10,
       "obj": "ribbon",
       "unit": "units",
       "show": "none",
       "lx": "the folded silk (zoomed in)"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "div": 100
       }
      },
      {
       "hl": "ticks"
      },
      {
       "show": "all"
      }
     ],
     "ref": "Section 3.3, p. 52–53"
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "Math Talk time at the loom!",
     "q": "How many one-hundredths make one-tenth? Can we also say the folded length is 4 units and 45 one-hundredths?",
     "o": [
      "100; no",
      "10; yes, since 4 tenths = 40 hundredths and 40 + 5 = 45",
      "10; no, tenths and hundredths cannot be mixed",
      "1; yes"
     ],
     "a": 1,
     "h": "[1/10] = [10/100].",
     "ref": "Math Talk, p. 53",
     "xs": [
      "[1/10] = [10/100], so 10 one-hundredths make one-tenth.",
      "4 tenths = 40 hundredths.",
      "40 + 5 = 45 hundredths: 4 [4/10] [5/100] = 4 [45/100]."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 4.45,
       "a": 4,
       "b": 5,
       "s": 4,
       "div": 100,
       "obj": "ribbon",
       "unit": "units",
       "show": "none"
      }
     },
     "xa": [
      null,
      null,
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "n",
     "who": "guide",
     "say": "On the zoomed ruler, the boxes show lengths from 0 in hundredths: [1/100], [20/100], [99/100], [130/100]…",
     "q": "One empty box sits at 1 unit, 7 tenths and 4 hundredths from 0. Written as hundredths, it is [?/100]. Type the numerator.",
     "ans": 174,
     "tol": 0,
     "h": "1 unit = 100 hundredths, 7 tenths = 70 hundredths.",
     "ref": "In-text question, p. 54 (empty boxes)",
     "xs": [
      "1 unit = [100/100]; 7 tenths = [70/100]; plus [4/100].",
      "100 + 70 + 4 = 174, so [174/100].",
      "The other boxes are [55/100], [155/100], [202/100] and [240/100]."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 1.74,
       "a": 0,
       "b": 2.5,
       "div": 100,
       "obj": "bar",
       "unit": "units",
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "show": "all"
      },
      null
     ]
    },
    {
     "t": "s",
     "who": "k7m3_shylaja",
     "say": "This zari wire is written three ways: 1 [1/10] [4/100], 1 [14/100] and [114/100]. They are all the same length!",
     "note": "1 [1/10] [4/100] = 1 [14/100] = [114/100]: one and fourteen-hundredths.",
     "xs": [
      "1 [1/10] [4/100]: one and one-tenth and four-hundredths.",
      "1 tenth = 10 hundredths, so 1 [14/100]: one and fourteen-hundredths.",
      "1 unit = 100 hundredths, so [114/100]: one hundred and fourteen hundredths.",
      "Three names, one length."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 1.14,
       "a": 0,
       "b": 2,
       "div": 100,
       "obj": "ribbon",
       "unit": "units",
       "show": "all",
       "lx": "zari wire"
      }
     },
     "xa": [
      {
       "hl": "obj"
      },
      null,
      null,
      null
     ],
     "ref": "In-text example, p. 54"
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "A red thread ends 37 small marks after 5 on this tape.",
     "q": "Write the measurement and read it in words.",
     "o": [
      "5 [37/10]: five and thirty-seven tenths",
      "5 [37/100]: five and thirty-seven hundredths",
      "[537/10]: five hundred thirty-seven tenths",
      "5 [3/100] [7/10]: five and three hundredths seven tenths"
     ],
     "a": 1,
     "h": "Each small mark is one-hundredth.",
     "ref": "In-text question, p. 54–55",
     "xs": [
      "5 whole units, then 3 tenths and 7 hundredths = 37 hundredths.",
      "5 [37/100]: five and thirty-seven hundredths.",
      "The other tapes read 15 [3/100] (fifteen and three-hundredths), 7 [52/100] (seven and fifty-two hundredths) and 9 [80/100] (nine and eighty-hundredths)."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 5.37,
       "a": 4.9,
       "b": 6.1,
       "s": 4.9,
       "div": 100,
       "obj": "ribbon",
       "unit": "units",
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "show": "all"
      },
      {
       "set": {
        "len": 5.52
       }
      }
     ]
    },
    {
     "t": "x",
     "who": "k7m3_amma",
     "say": "Measure out a thread of 15 [3/100] units for the tassel.",
     "q": "Slide the thread so its length is 15 [3/100] units.",
     "goal": {
      "len": 15.03
     },
     "h": "Go to 15, then 3 tiny hundredth-marks more (no full tenth).",
     "ref": "In-text question, p. 54 (hands-on)",
     "xs": [
      "15 whole units.",
      "0 tenths, 3 hundredths: just 3 tiny marks past 15.",
      "15 [3/100]: fifteen and three-hundredths."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 14.5,
       "a": 14.4,
       "b": 15.6,
       "s": 14.4,
       "div": 100,
       "obj": "ribbon",
       "unit": "units",
       "show": "none",
       "slider": "len"
      }
     },
     "xa": [
      null,
      null,
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "Which ribbon is longest, which is shortest? Groups (a) and (b).",
     "q": "(a) [3/10], [3/100], [33/100]   (b) 3 [1/10], [30/10], 1 [3/10]. Longest and shortest in each:",
     "o": [
      "(a) longest [3/10], shortest [3/100]; (b) longest [30/10], shortest 1 [3/10]",
      "(a) longest [33/100], shortest [3/100]; (b) longest 3 [1/10], shortest 1 [3/10]",
      "(a) longest [33/100], shortest [3/10]; (b) longest 3 [1/10], shortest [30/10]",
      "(a) longest [3/100], shortest [3/10]; (b) longest 1 [3/10], shortest 3 [1/10]"
     ],
     "a": 1,
     "h": "Write everything in hundredths (a) or tenths (b).",
     "ref": "In-text question, p. 55 (a), (b)",
     "xs": [
      "(a) [3/10] = [30/100]; compare 30, 3, 33 hundredths.",
      "Longest [33/100], shortest [3/100].",
      "(b) In tenths: 31, 30, 13. Longest 3 [1/10], shortest 1 [3/10]."
     ],
     "v": {
      "k": "table",
      "head": [
       "Group",
       "Lengths",
       "Longest",
       "Shortest"
      ],
      "rows": [
       [
        "(a)",
        "[3/10], [3/100], [33/100]",
        "?",
        "?"
       ],
       [
        "(b)",
        "3 [1/10], [30/10], 1 [3/10]",
        "?",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "Groups (c), (d) and (e) are trickier.",
     "q": "(c) [45/100], [54/100], [5/10], [4/10]   (d) 3 [6/10] [6/100], 3 [6/100], 3 [6/10]   (e) [8/10] [2/100], [9/100], 1 [8/100]. Which pair is correct?",
     "o": [
      "(c) longest [5/10]; (d) shortest 3 [6/10]",
      "(c) longest [54/100], shortest [4/10]; (e) longest 1 [8/100], shortest [9/100]",
      "(d) longest 3 [6/10]; (e) shortest [8/10] [2/100]",
      "(c) shortest [45/100]; (e) longest [9/100]"
     ],
     "a": 1,
     "h": "Change all to hundredths.",
     "ref": "In-text question, p. 55–56 (c)–(e)",
     "xs": [
      "(c) 45, 54, 50, 40 hundredths: longest [54/100], shortest [4/10].",
      "(d) 366, 306, 360 hundredths: longest 3 [6/10] [6/100], shortest 3 [6/100].",
      "(e) 82, 9, 108 hundredths: longest 1 [8/100], shortest [9/100]."
     ],
     "v": {
      "k": "table",
      "head": [
       "Group",
       "Lengths",
       "Longest",
       "Shortest"
      ],
      "rows": [
       [
        "(c)",
        "[45/100], [54/100], [5/10], [4/10]",
        "?",
        "?"
       ],
       [
        "(d)",
        "3 [6/10] [6/100], 3 [6/100], 3 [6/10]",
        "?",
        "?"
       ],
       [
        "(e)",
        "[8/10] [2/100], [9/100], 1 [8/100]",
        "?",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m3_zara",
     "say": "Last two groups. Careful with the big fraction!",
     "q": "(f) 7 [3/10] [5/100], 7 [5/10], 7 [41/100]   (g) [65/10] [15/100], 5 [87/100], 5 [7/100]. Longest and shortest:",
     "o": [
      "(f) longest 7 [41/100], shortest 7 [5/10]; (g) longest 5 [87/100], shortest [65/10] [15/100]",
      "(f) longest 7 [5/10], shortest 7 [41/100]; (g) longest 5 [7/100], shortest 5 [87/100]",
      "(f) longest 7 [3/10] [5/100], shortest 7 [5/10]; (g) longest [65/10] [15/100], shortest 5 [87/100]",
      "(f) longest 7 [5/10], shortest 7 [3/10] [5/100]; (g) longest [65/10] [15/100], shortest 5 [7/100]"
     ],
     "a": 3,
     "h": "[65/10] = 6 [5/10]. Write each in hundredths.",
     "ref": "In-text question, p. 56 (f), (g)",
     "xs": [
      "(f) 735, 750, 741 hundredths: longest 7 [5/10], shortest 7 [3/10] [5/100].",
      "(g) [65/10] [15/100] = 6 [5/10] [15/100] = 6 [65/100]: 665 hundredths.",
      "5 [87/100] = 587 and 5 [7/100] = 507 hundredths.",
      "Longest [65/10] [15/100], shortest 5 [7/100]."
     ],
     "v": {
      "k": "table",
      "head": [
       "Group",
       "Lengths",
       "Longest",
       "Shortest"
      ],
      "rows": [
       [
        "(f)",
        "7 [3/10] [5/100], 7 [5/10], 7 [41/100]",
        "?",
        "?"
       ],
       [
        "(g)",
        "[65/10] [15/100], 5 [87/100], 5 [7/100]",
        "?",
        "?"
       ]
      ]
     }
    }
   ]
  },
  {
   "title": "Hundredths at the Counter",
   "sec": "3.3 A Hundredth Part (adding and subtracting)",
   "icon": "<svg viewBox='0 0 48 48'><rect x='6' y='8' width='36' height='32' rx='4' fill='#efdcae'/><path d='M12 18h24M12 26h24M12 34h14' stroke='#2a2418' stroke-width='3'/><circle cx='36' cy='34' r='5' fill='#35c29a'/></svg>",
   "brief": "Amma's bill for silk and zari: add and subtract tenths and hundredths, regrouping like whole numbers.",
   "steps": [
    {
     "t": "s",
     "who": "k7m3_amma",
     "say": "Two silk pieces: 15 [3/10] [4/100] and 2 [6/10] [8/100] units. What is their total?",
     "note": "Add place by place; 10 hundredths make 1 tenth, 10 tenths make 1 unit.",
     "xs": [
      "Units: 15 + 2 = 17. Tenths: 3 + 6 = 9. Hundredths: 4 + 8 = 12.",
      "12 hundredths = 1 tenth + 2 hundredths.",
      "Now 10 tenths = 1 unit.",
      "Total: 18 [2/100] units.",
      "Or in hundredths: [1534/100] + [268/100] = [1802/100] = 18 [2/100]."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 15.34,
       "b": 2.68,
       "op": "+",
       "dp": 2,
       "step": 0,
       "ua": "15 [3/10] [4/100]",
       "ub": "2 [6/10] [8/100]",
       "show": "all"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      {
       "hl": "trade"
      },
      null,
      {
       "set": {
        "step": 2
       }
      }
     ],
     "ref": "In-text example, p. 56 (Methods 1 and 2)"
    },
    {
     "t": "o",
     "kind": "Discuss",
     "who": "k7m3_sonu",
     "say": "Method 1 uses brackets, Method 2 stacks the numbers. And 483 + 268 = 600 + 140 + 11 = 751.",
     "q": "Are Methods 1 and 2 really different? What is similar between them and the addition 483 + 268 = (400 + 200) + (80 + 60) + (3 + 8)?",
     "ref": "In-text question and Math Talk, p. 57",
     "xs": [
      "Both methods add units to units, tenths to tenths and hundredths to hundredths: only the layout differs.",
      "In 483 + 268, 11 ones become 1 ten + 1 one, and 150 becomes 1 hundred + 50.",
      "In the decimal sum, 12 hundredths become 1 tenth + 2 hundredths, and 10 tenths become 1 unit.",
      "Same idea: 10 of a place make 1 of the next place to the left."
     ],
     "v": {
      "k": "table",
      "head": [
       "Whole numbers",
       "Fractional units"
      ],
      "rows": [
       [
        "(400 + 200) + (80 + 60) + (3 + 8)",
        "(15 + 2) + ([3/10] + [6/10]) + ([4/100] + [8/100])"
       ],
       [
        "600 + 140 + 11",
        "17 + [9/10] + [12/100]"
       ],
       [
        "= 751",
        "= 18 [2/100]"
       ]
      ]
     }
    },
    {
     "t": "s",
     "who": "k7m3_shylaja",
     "say": "Now a difference: 25 [9/10] − 6 [4/10] [7/100]. The top number has no hundredths!",
     "note": "Split a tenth into 10 hundredths when the top place is too small.",
     "xs": [
      "25 [9/10] = 25 [9/10] [0/100].",
      "We cannot take 7 hundredths from 0, so split a tenth: 25 [8/10] [10/100].",
      "10 − 7 = 3 hundredths; 8 − 4 = 4 tenths; 25 − 6 = 19.",
      "Answer: 19 [4/10] [3/100]."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 25.9,
       "b": 6.47,
       "op": "−",
       "dp": 2,
       "step": 0,
       "ua": "25 [9/10]",
       "ub": "6 [4/10] [7/100]",
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "step": 1
       }
      },
      {
       "set": {
        "step": 2
       }
      },
      null
     ],
     "ref": "In-text example, p. 57"
    },
    {
     "t": "n",
     "who": "k7m3_shylaja",
     "say": "Math Talk: solve it by converting to hundredths.",
     "q": "25 [9/10] = [2590/100] and 6 [4/10] [7/100] = [647/100]. How many hundredths is the difference?",
     "ans": 1943,
     "u": "hundredths",
     "tol": 0,
     "h": "2590 − 647.",
     "ref": "Math Talk, p. 58",
     "xs": [
      "2590 − 647 = 1943.",
      "[1943/100] = 19 [43/100] = 19 [4/10] [3/100]: the same answer."
     ],
     "v": {
      "k": "lines",
      "l": [
       "25 [9/10] = [2590/100]",
       "6 [4/10] [7/100] = [647/100]",
       "[2590/100] − [647/100] = ?"
      ]
     }
    },
    {
     "t": "o",
     "kind": "Discuss",
     "who": "guide",
     "say": "15 [3/10] [4/100] − 2 [6/10] [8/100]: split a tenth, then a unit. Compare with 653 − 268.",
     "q": "Work out 15 [3/10] [4/100] − 2 [6/10] [8/100]. What is similar to (600 + 50 + 3) − (200 + 60 + 8) = 385?",
     "ref": "In-text example and Math Talk, p. 58",
     "xs": [
      "4 hundredths < 8: split a tenth, giving 2 tenths and 14 hundredths.",
      "2 tenths < 6: split a unit, giving 14 units and 12 tenths.",
      "14 − 8 = 6 hundredths, 12 − 6 = 6 tenths, 14 − 2 = 12: answer 12 [6/10] [6/100].",
      "In 653 − 268 a ten is split into 10 ones and a hundred into 10 tens: exactly the same regrouping."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 15.34,
       "b": 2.68,
       "op": "−",
       "dp": 2,
       "step": 0,
       "show": "all"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      {
       "hl": "trade"
      },
      {
       "set": {
        "step": 2
       }
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "Figure it Out! First the sums.",
     "q": "Find (a) [3/10] + 3 [4/100] and (b) 9 [5/10] [7/100] + 2 [1/10] [3/100].",
     "o": [
      "(a) 3 [7/100]; (b) 11 [6/10]",
      "(a) 3 [3/10] [4/100]; (b) 11 [6/10] [10/100]",
      "(a) 3 [3/10] [4/100]; (b) 11 [7/10]",
      "(a) 6 [4/100]; (b) 11 [7/10] [10/100]"
     ],
     "a": 2,
     "h": "In (b), 7 + 3 = 10 hundredths = 1 tenth.",
     "ref": "Figure it Out, p. 58 (a), (b)",
     "xs": [
      "(a) 3 + [3/10] + [4/100] = 3 [3/10] [4/100] = 3 [34/100].",
      "(b) 9 + 2 = 11; 5 + 1 = 6 tenths; 7 + 3 = 10 hundredths = 1 tenth.",
      "So 11 [7/10]."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 9.57,
       "b": 2.13,
       "op": "+",
       "dp": 2,
       "step": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      null,
      {
       "set": {
        "step": 2
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "n",
     "who": "k7m3_priya",
     "say": "Sum (c) makes a round number!",
     "q": "Find (c) 15 [6/10] [4/100] + 14 [3/10] [6/100].",
     "ans": 30,
     "tol": 0.001,
     "h": "4 + 6 hundredths = 1 tenth; then 6 + 3 + 1 tenths = 1 unit.",
     "ref": "Figure it Out, p. 58 (c)",
     "xs": [
      "Hundredths: 4 + 6 = 10 = 1 tenth.",
      "Tenths: 6 + 3 + 1 = 10 = 1 unit.",
      "Units: 15 + 14 + 1 = 30. Answer: exactly 30."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 15.64,
       "b": 14.36,
       "op": "+",
       "dp": 2,
       "step": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      null,
      {
       "set": {
        "step": 2
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_zara",
     "say": "Now the differences.",
     "q": "Find (d) 7 [7/100] − 4 [4/100], (e) 8 [6/100] − 5 [3/100] and (f) 12 [6/10] [2/100] − [9/10] [9/100].",
     "o": [
      "(d) 3 [3/100]; (e) 3 [3/100]; (f) 11 [63/100]",
      "(d) 3 [3/10]; (e) 3 [3/10]; (f) 11 [73/100]",
      "(d) 3 [3/100]; (e) 3 [9/100]; (f) 12 [37/100]",
      "(d) 11 [11/100]; (e) 13 [9/100]; (f) 11 [53/100]"
     ],
     "a": 0,
     "h": "In (f) split both a tenth and a unit.",
     "ref": "Figure it Out, p. 58 (d)–(f)",
     "xs": [
      "(d) 7 − 4 = 3, 7 − 4 = 3 hundredths: 3 [3/100].",
      "(e) 8 − 5 = 3, 6 − 3 = 3 hundredths: 3 [3/100].",
      "(f) 12 [6/10] [2/100] = 11 [15/10] [12/100] after splitting.",
      "12 − 9 = 3 hundredths, 15 − 9 = 6 tenths, 11 − 0 = 11: 11 [6/10] [3/100] = 11 [63/100]."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 12.62,
       "b": 0.99,
       "op": "−",
       "dp": 2,
       "step": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      null,
      null,
      {
       "set": {
        "step": 2
       },
       "show": "all"
      }
     ]
    }
   ]
  },
  {
   "title": "The Spindle Board",
   "sec": "3.4 Decimal Place Value",
   "icon": "<svg viewBox='0 0 48 48'><rect x='4' y='38' width='40' height='5' fill='#8a5a2b'/><path d='M12 8v30M24 8v30M36 8v30' stroke='#c9b48a' stroke-width='3'/><ellipse cx='12' cy='34' rx='5' ry='2.5' fill='#62b6e8'/><ellipse cx='12' cy='29' rx='5' ry='2.5' fill='#62b6e8'/><ellipse cx='24' cy='34' rx='5' ry='2.5' fill='#35c29a'/><ellipse cx='36' cy='34' rx='5' ry='2.5' fill='#f4a51c'/><circle cx='18' cy='42' r='2' fill='#f4a51c'/></svg>",
   "brief": "Why split units into 10? Chinti's spindle board shows how the Indian place value system reaches past the point.",
   "steps": [
    {
     "t": "s",
     "who": "k7m3_zara",
     "say": "Why always 10 parts? Could we split a unit into 4, or 16?",
     "note": "We can split a unit into any number of equal parts, but 10 fits our place value system.",
     "xs": [
      "Split into 4: this ribbon is 2 [2/4] units.",
      "Split into 10: the same ribbon is 2 [5/10] units.",
      "For more precision each quarter can be split again: [1/16] of a unit; it is 2 [8/16].",
      "All work, but 10 is special: each place value is 10 times the next."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 2.5,
       "a": 0,
       "b": 3,
       "div": 4,
       "obj": "ribbon",
       "unit": "units",
       "show": "val"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "div": 10
       }
      },
      {
       "set": {
        "div": 16
       }
      },
      {
       "set": {
        "div": 10
       }
      }
     ],
     "ref": "Section 3.4, p. 58–59"
    },
    {
     "t": "s",
     "who": "guide",
     "say": "On my spindle board, 281 means 2 hundreds, 8 tens and 1 one. Each spindle is 10 times the one on its right.",
     "note": "10 ones = 1 ten, 10 tens = 1 hundred; going right, each place is 10 times smaller: 1, [1/10], [1/100], [1/1000]…",
     "xs": [
      "× 10 to the left, ÷ 10 to the right: 1000, 100, 10, 1.",
      "To go below 1, divide 1 into 10 equal parts: one-tenth.",
      "Divide one-tenth into 10: one-hundredth. Divide again: [1/1000].",
      "1000 thousandths make a unit. This is the decimal system: 'decem' (Latin) and 'daśha' (Sanskrit) both mean ten."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "h": 2,
       "t": 8,
       "o": 1,
       "d1": 0,
       "d2": 0,
       "d3": 0,
       "cols": "h,t,o",
       "show": "dec,exp"
      }
     },
     "xa": [
      {
       "hl": "beads"
      },
      {
       "set": {
        "cols": "h,t,o,d1"
       }
      },
      {
       "set": {
        "cols": "h,t,o,d1,d2,d3"
       }
      },
      null
     ],
     "ref": "Section 3.4, p. 59–60"
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "If I split [1/100] into 10 equal parts, what do I get?",
     "q": "What fraction do we get when [1/100] is split into 10 equal parts, and how many of them make a unit?",
     "o": [
      "[1/10]; 10",
      "[1/1000]; 1000",
      "[1/110]; 110",
      "[10/100]; 100"
     ],
     "a": 1,
     "h": "Each step to the right divides by 10.",
     "ref": "In-text question, p. 60",
     "xs": [
      "[1/100] ÷ 10 = [1/1000].",
      "10 × 10 × 10 = 1000 such parts make a unit."
     ],
     "v": {
      "k": "table",
      "head": [
       "× 10 ←",
       "",
       "",
       "",
       "→ ÷ 10"
      ],
      "rows": [
       [
        "100",
        "10",
        "1",
        "[1/10]",
        "[1/100]"
       ],
       [
        "",
        "",
        "",
        "",
        "[1/100] ÷ 10 = ?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "How Big? A hundred 10s make 1000. Now for the small pieces.",
     "q": "(a) How many thousandths make one unit? (b) How many thousandths make one tenth? (c) How many thousandths make one hundredth?",
     "o": [
      "(a) 100 (b) 10 (c) 1",
      "(a) 1000 (b) 10 (c) 100",
      "(a) 1000 (b) 100 (c) 10",
      "(a) 10 (b) 100 (c) 1000"
     ],
     "a": 2,
     "h": "[1/10] = [100/1000] and [1/100] = [10/1000].",
     "ref": "How Big?, p. 61 (a)–(c)",
     "xs": [
      "1 = [1000/1000]: 1000 thousandths.",
      "[1/10] = [100/1000]: 100 thousandths.",
      "[1/100] = [10/1000]: 10 thousandths."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "o": 1,
       "d1": 0,
       "d2": 0,
       "d3": 0,
       "cols": "o,d1,d2,d3",
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "all"
      },
      {
       "set": {
        "o": 0,
        "d1": 1
       }
      },
      {
       "set": {
        "d1": 0,
        "d2": 1
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "And going the other way, from the tens.",
     "q": "(d) How many tenths make one ten? (e) How many hundredths make one ten?",
     "o": [
      "(d) 10 (e) 100",
      "(d) 100 (e) 1000",
      "(d) 1000 (e) 100",
      "(d) 100 (e) 100"
     ],
     "a": 1,
     "h": "1 ten = 10 units, and each unit is 10 tenths.",
     "ref": "How Big?, p. 61 (d), (e)",
     "xs": [
      "10 = 10 × 10 tenths = 100 tenths.",
      "10 = 10 × 100 hundredths = 1000 hundredths."
     ],
     "v": {
      "k": "lines",
      "l": [
       "1 ten = 10 units",
       "1 unit = 10 tenths = 100 hundredths",
       "1 ten = ? tenths = ? hundredths"
      ]
     }
    },
    {
     "t": "o",
     "kind": "Think",
     "who": "guide",
     "say": "Now you be the question-maker!",
     "q": "Make a few more questions of this kind and answer them.",
     "ref": "How Big?, p. 61",
     "xs": [
      "How many hundredths make one unit? 100.",
      "How many tenths make one hundred? 1000.",
      "How many thousandths make one ten? 10000.",
      "How many ten-thousandths make one thousandth? 10."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "t": 1,
       "o": 0,
       "d1": 0,
       "d2": 0,
       "cols": "t,o,d1,d2",
       "show": "all"
      }
     }
    },
    {
     "t": "m",
     "who": "k7m3_zara",
     "say": "Math Talk: we write 456, not 4 × 100 + 5 × 10 + 6. Can 4 [2/10] be written as 42?",
     "q": "If 4 [2/10] were written as 42, what goes wrong, and how do we fix it?",
     "o": [
      "Nothing goes wrong; 42 always means 4 [2/10]",
      "We could not tell 4 tens 2 units from 4 units 2 tenths, so we mark where the units end with a decimal point: 4.2",
      "We must always write the fraction bar",
      "We write the tenths first: 24"
     ],
     "a": 1,
     "h": "705 could mean 705, 70 [5/10] or 7 [5/100].",
     "ref": "Math Talk, p. 61–62",
     "xs": [
      "42 could mean 4 tens and 2 units, or 4 units and 2 tenths.",
      "705 could be 700 + 5, or 70 + [5/10], or 7 + [5/100].",
      "A point (period) after the units place separates whole and fractional parts: the decimal point.",
      "So 4 [2/10] = 4.2, and 705, 70.5 and 7.05 are all different."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "t": 4,
       "o": 2,
       "d1": 0,
       "cols": "t,o,d1",
       "show": "none"
      }
     },
     "xa": [
      null,
      null,
      {
       "set": {
        "t": 0,
        "o": 4,
        "d1": 2
       },
       "show": "all"
      },
      null
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Same digits 7, 0, 5; the point decides what they are worth.",
     "note": "705 = 7 × 100 + 5 × 1; 70.5 = 7 × 10 + 5 × [1/10]; 7.05 = 7 × 1 + 5 × [1/100].",
     "xs": [
      "705: 7 hundreds, 0 tens, 5 units.",
      "70.5: 7 tens, 0 units, 5 tenths, read 'seventy point five'.",
      "7.05: 7 units, 0 tenths, 5 hundredths, read 'seven point zero five'.",
      "0.274 is 'zero point two seven four', not 'zero point two hundred seventy-four'."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "h": 7,
       "t": 0,
       "o": 5,
       "d1": 0,
       "d2": 0,
       "cols": "h,t,o,d1,d2,d3",
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "h": 0,
        "t": 7,
        "o": 0,
        "d1": 5,
        "d2": 0,
        "d3": 0
       }
      },
      {
       "set": {
        "h": 0,
        "t": 0,
        "o": 7,
        "d1": 0,
        "d2": 5,
        "d3": 0
       }
      },
      {
       "set": {
        "h": 0,
        "t": 0,
        "o": 0,
        "d1": 2,
        "d2": 7,
        "d3": 4
       },
       "show": "all"
      }
     ],
     "ref": "Section 3.4, p. 62–63"
    },
    {
     "t": "x",
     "who": "k7m3_amma",
     "say": "My border has 2 ones, 3 tenths and 5 hundredths of a metre of zari.",
     "q": "Set the spindles to show 2 ones, 3 tenths and 5 hundredths.",
     "goal": {
      "o": 2,
      "d1": 3,
      "d2": 5
     },
     "h": "Units 2, tenths 3, hundredths 5.",
     "ref": "Place value table, p. 63 (a)",
     "xs": [
      "2 + [3/10] + [5/100] = 2.35.",
      "Read: two point three five, or two and thirty-five hundredths."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "o": 0,
       "d1": 0,
       "d2": 0,
       "cols": "o,d1,d2",
       "show": "none",
       "slider": "o,d1,d2"
      }
     },
     "xa": [
      null,
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "Three more rows of the table.",
     "q": "(b) 1 ten and 5 tenths, (c) 4 ones and 6 hundredths, (d) 1 hundred, 1 one and 1 hundredth. In decimal form:",
     "o": [
      "15, 4.6, 111",
      "1.5, 4.06, 101.1",
      "10.5, 4.06, 101.01",
      "10.5, 4.6, 100.11"
     ],
     "a": 2,
     "h": "Use 0 for empty places between filled ones.",
     "ref": "Place value table, p. 63 (b)–(d)",
     "xs": [
      "(b) 10 + [5/10] = 10.5: ten point five.",
      "(c) 4 + [0/10] + [6/100] = 4.06: four point zero six.",
      "(d) 100 + 0 + 1 + [0/10] + [1/100] = 101.01: one hundred one point zero one."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "h": 0,
       "t": 0,
       "o": 0,
       "d1": 0,
       "d2": 0,
       "cols": "h,t,o,d1,d2",
       "show": "none",
       "d3": 0
      }
     },
     "xa": [
      {
       "set": {
        "t": 1,
        "d1": 5
       },
       "show": "all"
      },
      {
       "set": {
        "t": 0,
        "o": 4,
        "d1": 0,
        "d2": 6
       }
      },
      {
       "set": {
        "h": 1,
        "o": 1,
        "d2": 1
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_zara",
     "say": "The last rows have only fractions.",
     "q": "(e) [8/100] and [9/10], (f) [5/100], (g) [1/10], (h) 2 [1/100], 4 [1/10] and 7 [7/1000]. Which are correct?",
     "o": [
      "(e) 0.89 (f) 0.5 (g) 0.1 (h) 2.1, 4.1, 7.7",
      "(e) 0.98 (f) 0.05 (g) 0.1 (h) 2.01, 4.1, 7.007",
      "(e) 0.98 (f) 0.005 (g) 1.0 (h) 2.01, 4.01, 7.07",
      "(e) 9.8 (f) 0.05 (g) 0.01 (h) 2.001, 4.1, 7.7"
     ],
     "a": 1,
     "h": "[9/10] goes in the tenths place even though it is written second.",
     "ref": "Place value table, p. 63 (e)–(h)",
     "xs": [
      "(e) [9/10] + [8/100] = 0.98, zero point nine eight.",
      "(f) 0.05 and (g) 0.1.",
      "(h) 2.01, 4.1 and 7.007 (all together they make 13.117)."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "o": 0,
       "d1": 0,
       "d2": 0,
       "d3": 0,
       "cols": "o,d1,d2,d3",
       "show": "none",
       "h": 0,
       "t": 0
      }
     },
     "xa": [
      {
       "set": {
        "d1": 9,
        "d2": 8
       },
       "show": "all"
      },
      {
       "set": {
        "d1": 0,
        "d2": 5
       }
      },
      {
       "set": {
        "o": 7,
        "d1": 0,
        "d2": 0,
        "d3": 7
       }
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "23 hundreds = 2300 and 23 tens = 230. So what is 234 tenths?",
     "note": "234 tenths = [234/10] = 20 + 3 + [4/10] = 23.4.",
     "xs": [
      "[234/10] = [200/10] + [30/10] + [4/10].",
      "= 20 + 3 + [4/10].",
      "So 234 tenths = 23.4: each digit slides one place right."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "h": 2,
       "t": 3,
       "o": 4,
       "d1": 0,
       "cols": "h,t,o,d1",
       "show": "dec"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "h": 0,
        "t": 2,
        "o": 3,
        "d1": 4
       }
      },
      {
       "show": "all"
      }
     ],
     "ref": "In-text example, p. 63–64"
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "Your turn to slide the digits.",
     "q": "Write in decimal form: (a) 234 hundredths, (b) 105 tenths.",
     "o": [
      "(a) 23.4 (b) 1.05",
      "(a) 2.34 (b) 10.5",
      "(a) 0.234 (b) 105.0",
      "(a) 2.34 (b) 1.05"
     ],
     "a": 1,
     "h": "Hundredths: two places right; tenths: one place right.",
     "ref": "In-text question, p. 64",
     "xs": [
      "[234/100] = 2 + [3/10] + [4/100] = 2.34.",
      "[105/10] = 10 + [5/10] = 10.5."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "t": 0,
       "o": 0,
       "d1": 0,
       "d2": 0,
       "cols": "t,o,d1,d2",
       "show": "none",
       "h": 0,
       "d3": 0
      }
     },
     "xa": [
      {
       "set": {
        "o": 2,
        "d1": 3,
        "d2": 4
       },
       "show": "all"
      },
      {
       "set": {
        "t": 1,
        "o": 0,
        "d1": 5,
        "d2": 0
       }
      }
     ]
    }
   ]
  },
  {
   "title": "Measures of the Market",
   "sec": "3.5 Units of Measurement",
   "icon": "<svg viewBox='0 0 48 48'><path d='M24 6v8M10 14h28' stroke='#efdcae' stroke-width='3'/><path d='M10 14l-6 14h12zM38 14l-6 14h12z' fill='#f4a51c'/><rect x='18' y='36' width='12' height='6' fill='#8a5a2b'/><path d='M24 14v22' stroke='#efdcae' stroke-width='3'/></svg>",
   "brief": "Millimetres, metres, grams and paise: every unit at the market hides a decimal.",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "1 cm = 10 mm. So 1 mm is one-tenth of a centimetre!",
     "note": "1 mm = [1/10] cm = 0.1 cm; 12 mm = 10 mm + 2 mm = 1.2 cm.",
     "xs": [
      "1 mm = [1/10] cm = 0.1 cm.",
      "5 mm = [5/10] cm = 0.5 cm.",
      "12 mm = 10 mm + 2 mm = 1 cm + [2/10] cm = 1.2 cm.",
      "Back again: 5.6 cm = 5 cm + 0.6 cm = 56 mm."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_convert",
      "p": {
       "n": 1,
       "f": 10,
       "su": "mm",
       "bu": "cm",
       "max": 60,
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "n": 5
       }
      },
      {
       "set": {
        "n": 12
       }
      },
      {
       "set": {
        "n": 56
       }
      }
     ],
     "ref": "Length conversion, p. 64–65"
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "Fill in the blanks (mm ↔ cm).",
     "q": "70 mm = ___ cm, ___ mm = 0.9 cm, 134 mm = ___ cm, ___ mm = 203.6 cm.",
     "o": [
      "7.0; 90; 1.34; 20.36",
      "7.0; 9; 13.4; 2036",
      "0.7; 9; 13.4; 2036",
      "70; 0.9; 134; 203.6"
     ],
     "a": 1,
     "h": "Divide mm by 10 to get cm; multiply cm by 10 to get mm.",
     "ref": "Fill in the blanks, p. 65",
     "xs": [
      "70 mm = 7.0 cm.",
      "0.9 cm = 9 mm.",
      "134 mm = 13.4 cm.",
      "203.6 cm = 2036 mm."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_convert",
      "p": {
       "n": 70,
       "f": 10,
       "su": "mm",
       "bu": "cm",
       "max": 140,
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "all"
      },
      {
       "set": {
        "n": 9
       }
      },
      {
       "set": {
        "n": 134
       }
      },
      null
     ]
    },
    {
     "t": "x",
     "who": "k7m3_amma",
     "say": "My silk border must be exactly 13.4 cm wide.",
     "q": "Slide to the number of millimetres that make 13.4 cm.",
     "goal": {
      "n": 134
     },
     "h": "13 cm = 130 mm, and 0.4 cm = 4 mm.",
     "ref": "Fill in the blanks, p. 65 (hands-on)",
     "xs": [
      "13 cm = 130 mm.",
      "0.4 cm = 4 mm.",
      "13.4 cm = 134 mm."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_convert",
      "p": {
       "n": 100,
       "f": 10,
       "su": "mm",
       "bu": "cm",
       "max": 150,
       "show": "none",
       "slider": "n"
      }
     },
     "xa": [
      null,
      null,
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "o",
     "kind": "Activity",
     "who": "guide",
     "say": "Tiny things! A hair is about 0.1 mm thick; a newspaper sheet 0.05 to 0.08 mm; a mustard seed 1 to 2 mm; the smallest ant, like my cousins, is 0.8 to 1 mm!",
     "q": "Look at the pen strokes (0.5 mm, 1 mm, 1.5 mm) and try taking an approximate measurement of a hair, a mustard seed and a newspaper sheet.",
     "ref": "Try measuring, p. 65",
     "xs": [
      "Use the mm marks of a ruler: lay 10 mustard seeds in a row and measure them together, then divide by 10.",
      "A stack of 100 newspaper sheets is about 5 to 8 mm thick, so one sheet is about 0.05 to 0.08 mm.",
      "A hair (about 0.1 mm) is thinner than a fine pen stroke (0.5 mm).",
      "The smallest land snail, Acmella nana, has a shell only 0.7 mm across."
     ],
     "v": {
      "k": "table",
      "head": [
       "Thing",
       "Approximate size"
      ],
      "rows": [
       [
        "Fine / medium / bold pen stroke",
        "0.5 mm / 1 mm / 1.5 mm"
       ],
       [
        "Human hair",
        "0.1 mm"
       ],
       [
        "Newspaper sheet",
        "0.05 – 0.08 mm"
       ],
       [
        "Mustard seed",
        "1 – 2 mm"
       ],
       [
        "Smallest ant (Carabera bruni)",
        "0.8 – 1 mm"
       ]
      ]
     }
    },
    {
     "t": "s",
     "who": "k7m3_shylaja",
     "say": "1 m = 100 cm, so 1 cm is one-hundredth of a metre.",
     "note": "1 cm = [1/100] m = 0.01 m; 15 cm = [15/100] m = 0.15 m.",
     "xs": [
      "1 cm = [1/100] m = 0.01 m.",
      "10 cm = [10/100] m = [1/10] m = 0.1 m.",
      "15 cm = [10/100] + [5/100] m = [1/10] + [5/100] m = 0.15 m."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_convert",
      "p": {
       "n": 1,
       "f": 100,
       "su": "cm",
       "bu": "m",
       "max": 400,
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "n": 10
       }
      },
      {
       "set": {
        "n": 15
       }
      }
     ],
     "ref": "Length conversion, p. 65–66"
    },
    {
     "t": "m",
     "who": "k7m3_shylaja",
     "say": "Fill in the blanks (cm ↔ m).",
     "q": "36 cm = ___ m, 50 cm = ___ m, ___ cm = 0.89 m, 4 cm = ___ m, 325 cm = ___ m, ___ cm = 2.07 m.",
     "o": [
      "3.6; 5.0; 8.9; 0.4; 32.5; 20.7",
      "0.36; 0.5; 89; 0.04; 3.25; 207",
      "0.36; 0.05; 89; 0.4; 3.25; 270",
      "0.036; 0.5; 890; 0.004; 0.325; 2070"
     ],
     "a": 1,
     "h": "Divide cm by 100: move two places.",
     "ref": "Fill in the blanks, p. 66",
     "xs": [
      "36 cm = 0.36 m; 50 cm = 0.50 m = 0.5 m.",
      "0.89 m = 89 cm.",
      "4 cm = 0.04 m (not 0.4!).",
      "325 cm = 3.25 m; 2.07 m = 207 cm."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_convert",
      "p": {
       "n": 36,
       "f": 100,
       "su": "cm",
       "bu": "m",
       "max": 400,
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "all"
      },
      null,
      {
       "set": {
        "n": 4
       }
      },
      {
       "set": {
        "n": 325
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "A hummingbird egg is 1.3 cm long, a Philippine Goby 0.9 cm, and the tiny Wolfi octopus 1 to 2.5 cm!",
     "q": "How many mm does 1 metre have? Can we write 1 mm = [1/1000] m?",
     "o": [
      "100 mm; no",
      "1000 mm; yes, 1 mm = [1/1000] m = 0.001 m",
      "10 mm; yes",
      "1000 mm; no, because mm is smaller than cm"
     ],
     "a": 1,
     "h": "1 m = 100 cm and 1 cm = 10 mm.",
     "ref": "In-text questions, p. 66",
     "xs": [
      "1 m = 100 cm = 100 × 10 mm = 1000 mm.",
      "So 1 mm is one of 1000 equal parts of a metre.",
      "1 mm = [1/1000] m = 0.001 m."
     ],
     "v": {
      "k": "lines",
      "l": [
       "1 m = 100 cm",
       "1 cm = 10 mm",
       "1 m = ? mm"
      ]
     }
    },
    {
     "t": "s",
     "who": "k7m3_amma",
     "say": "The silk-yarn shop weighs in grams, but the bill is in kilograms. 1 kg = 1000 g.",
     "note": "1 g = [1/1000] kg = 0.001 kg; 254 g = 0.254 kg.",
     "xs": [
      "1 g = [1/1000] kg = 0.001 kg.",
      "5 g = [5/1000] kg = 0.005 kg.",
      "10 g = [10/1000] = [1/100] kg = 0.010 kg.",
      "254 g = [2/10] + [5/100] + [4/1000] kg = 0.254 kg."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_convert",
      "p": {
       "n": 1,
       "f": 1000,
       "su": "g",
       "bu": "kg",
       "max": 3000,
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "n": 5
       }
      },
      {
       "set": {
        "n": 10
       }
      },
      {
       "set": {
        "n": 254
       }
      }
     ],
     "ref": "Weight conversion, p. 67"
    },
    {
     "t": "m",
     "who": "k7m3_mahi",
     "say": "Fill in the blanks (g ↔ kg).",
     "q": "465 g, 68 g, 1560 g and 704 g in kg; and ___ g = 0.56 kg, ___ g = 2.5 kg.",
     "o": [
      "0.465, 0.68, 15.6, 0.74; 56; 25",
      "0.465, 0.068, 1.56, 0.704; 560; 2500",
      "4.65, 0.068, 1.560, 7.04; 560; 250",
      "0.465, 0.0068, 1.56, 0.704; 5600; 2500"
     ],
     "a": 1,
     "h": "Divide grams by 1000: three places.",
     "ref": "Fill in the blanks, p. 68",
     "xs": [
      "465 g = 0.465 kg; 68 g = 0.068 kg.",
      "1560 g = 1.560 kg = 1.56 kg; 704 g = 0.704 kg.",
      "0.56 kg = 560 g; 2.5 kg = 2500 g."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_convert",
      "p": {
       "n": 68,
       "f": 1000,
       "su": "g",
       "bu": "kg",
       "max": 3000,
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "all"
      },
      {
       "set": {
        "n": 1560
       }
      },
      {
       "set": {
        "n": 2500
       }
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Rice heaps at the temple kitchen: 1 g, then each heap 10 times heavier: 10 g, 100 g, 1 kg, 10 kg. Together 11.111 kg!",
     "note": "1 g = 0.001 kg and 1 mg = [1/1000] g = 0.001 g.",
     "xs": [
      "1 g = 0.001 kg; 10 g = 0.01 kg; 100 g = 0.1 kg.",
      "Then 1 kg and 10 kg.",
      "10 + 1 + 0.1 + 0.01 + 0.001 = 11.111 kg: one 1 in every place!",
      "Smaller still: 1 g = 1000 milligrams, so 1 mg = 0.001 g."
     ],
     "v": {
      "k": "table",
      "head": [
       "Heap",
       "In kg"
      ],
      "rows": [
       [
        "1 g",
        "0.001 kg"
       ],
       [
        "10 g",
        "0.01 kg"
       ],
       [
        "100 g",
        "0.1 kg"
       ],
       [
        "1000 g",
        "1 kg"
       ],
       [
        "10000 g",
        "10 kg"
       ],
       [
        "Total",
        "11.111 kg"
       ]
      ]
     },
     "ref": "Rice heaps, p. 68"
    },
    {
     "t": "s",
     "who": "k7m3_sonu",
     "say": "Paati says coins of 1, 2, 3, 5, 10, 20, 25 and 50 paise were used once. 100 paise = 1 rupee.",
     "note": "1 paisa = [1/100] rupee = ₹0.01; 75 paise = ₹0.75.",
     "xs": [
      "1 paisa = [1/100] rupee = 0.01 rupee.",
      "75 paise = [70/100] + [5/100] = [7/10] + [5/100] rupee.",
      "75 paise = ₹0.75. Coins of 25 paise and less were removed in 2011, but bills still show paise."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_convert",
      "p": {
       "n": 1,
       "f": 100,
       "su": "p",
       "bu": "rupee",
       "pre": "₹",
       "max": 300,
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "n": 75
       }
      },
      null
     ],
     "ref": "Rupee–paise conversion, p. 68"
    },
    {
     "t": "m",
     "who": "k7m3_mahi",
     "say": "Fill in the blanks (rupee ↔ paise).",
     "q": "10 p = ___, ___ p = ₹0.05, ___ p = ₹0.36, ___ = ₹0.50, 99 p = ___, 250 p = ___.",
     "o": [
      "₹1.0, 50, 36, 5 p, ₹9.9, ₹25.0",
      "₹0.10, 5, 36, 50 p, ₹0.99, ₹2.50",
      "₹0.01, 5, 3.6, 50 p, ₹0.99, ₹2.05",
      "₹0.10, 0.5, 36, 500 p, ₹0.099, ₹2.50"
     ],
     "a": 1,
     "h": "Divide paise by 100.",
     "ref": "Fill in the blanks, p. 69",
     "xs": [
      "10 p = ₹0.10; 5 p = ₹0.05; 36 p = ₹0.36.",
      "50 p = ₹0.50; 99 p = ₹0.99.",
      "250 p = ₹2.50."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_convert",
      "p": {
       "n": 99,
       "f": 100,
       "su": "p",
       "bu": "rupee",
       "pre": "₹",
       "max": 300,
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "all"
      },
      null,
      {
       "set": {
        "n": 250
       }
      }
     ]
    },
    {
     "t": "o",
     "kind": "Project",
     "who": "k7m3_amma",
     "say": "In the 1970s a masala dosa cost just 50 paise, a banana 20–25 paise, peppermints 2 or 3 paise, and a kg of rice ₹2.45!",
     "q": "Try This: Discuss with adults at home or school the prices of products and services in their childhood. Try to find old coins and stamps.",
     "ref": "Try This, p. 69",
     "xs": [
      "Ask: what did a bus ticket, a pencil or a cup of tea cost when you were 12?",
      "Write each price in rupees with a decimal point, e.g. 50 paise = ₹0.50.",
      "Compare with today's price: how many times costlier is it?",
      "Make a small display of any old coins or stamps you find."
     ],
     "v": {
      "k": "table",
      "head": [
       "1970s item",
       "Price"
      ],
      "rows": [
       [
        "Masala dosa",
        "50 p = ₹0.50"
       ],
       [
        "Banana",
        "20–25 p = ₹0.20–₹0.25"
       ],
       [
        "Peppermints (handful)",
        "2–3 p = ₹0.02–₹0.03"
       ],
       [
        "Rice (1 kg)",
        "₹2.45"
       ]
      ]
     }
    }
   ]
  },
  {
   "title": "Chinti's Magnifier",
   "sec": "3.6 Locating and Comparing Decimals",
   "icon": "<svg viewBox='0 0 48 48'><circle cx='20' cy='20' r='13' fill='rgba(160,220,255,.4)' stroke='#f4a51c' stroke-width='4'/><path d='M30 30l12 12' stroke='#8a5a2b' stroke-width='6' stroke-linecap='round'/><path d='M12 20h16M16 16v8M24 16v8' stroke='#fff' stroke-width='2'/></svg>",
   "brief": "Find decimals on the number line, zoom in place by place, and decide which is bigger or closer.",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "1.4 is 1 unit and 4 tenths. Split the unit between 1 and 2 into 10 equal parts and take the fourth part.",
     "note": "To locate 1.4: divide the unit from 1 to 2 into 10 parts and count 4 parts from 1.",
     "xs": [
      "1.4 lies between 1 and 2.",
      "Each part between 1 and 2 is 0.1.",
      "Count 4 parts from 1: there is 1.4."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_nline",
      "p": {
       "a": 1,
       "b": 2,
       "parts": 10,
       "m": 0,
       "auto": 1,
       "dp": 1,
       "show": "step"
      }
     },
     "xa": [
      null,
      {
       "hl": "ptr"
      },
      {
       "set": {
        "m": 4
       },
       "show": "all"
      }
     ],
     "ref": "Section 3.6, p. 69–70"
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "Chinti zooms into the gap between 1 and 1.1. There are 9 tiny marks inside!",
     "q": "Name all the divisions between 1 and 1.1 on the number line.",
     "o": [
      "1.1, 1.2, 1.3, …, 1.9",
      "1.01, 1.02, 1.03, …, 1.09",
      "1.001, 1.002, …, 1.009",
      "10.1, 10.2, …, 10.9"
     ],
     "a": 1,
     "h": "The tenth from 1 to 1.1 is split into 10 hundredths.",
     "ref": "In-text question, p. 70",
     "xs": [
      "1 to 1.1 is one tenth, split into 10 hundredths.",
      "The marks are 1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.09."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_nline",
      "p": {
       "a": 1,
       "b": 1.1,
       "parts": 10,
       "m": 0,
       "auto": 1,
       "dp": 2,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "m": 1
       },
       "show": "all"
      },
      {
       "set": {
        "m": 9
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "On this line from 5 to 5.4, each tenth is split into 10 hundredths.",
     "q": "Identify the decimal numbers at A, B, C and D.",
     "o": [
      "A 5.9, B 5.13, C 5.2, D 5.31",
      "A 5.09, B 5.13, C 5.2, D 5.31",
      "A 5.09, B 5.3, C 5.02, D 5.31",
      "A 5.1, B 5.13, C 5.2, D 5.3"
     ],
     "a": 1,
     "h": "A is just before 5.1; count the small marks.",
     "ref": "In-text question, p. 70",
     "xs": [
      "A is 1 small mark before 5.1: 5.09.",
      "B is 3 marks after 5.1: 5.13.",
      "C is exactly at 5.2.",
      "D is 1 mark after 5.3: 5.31."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_nline",
      "p": {
       "a": 5,
       "b": 5.4,
       "parts": 4,
       "sub": 10,
       "m": 0,
       "ptr": 0,
       "auto": 1,
       "dp": 1,
       "marks": "A:9,B:13,C:20,D:31",
       "show": "step"
      }
     },
     "xa": [
      {
       "show": "marks,step"
      },
      null,
      null,
      null
     ]
    },
    {
     "t": "s",
     "who": "k7m3_zara",
     "say": "Sonu says 0.2 can be written as 0.20 or 0.200. I think adding zeros on the right may change it!",
     "note": "Zeros at the right end of the fractional part do not change the value: 0.2 = 0.20 = 0.200.",
     "xs": [
      "0.2 is 2 tenths.",
      "0.20 is 2 tenths and 0 hundredths: still 2 tenths.",
      "0.200 adds 0 thousandths: still 2 tenths.",
      "But 0.02 (2 hundredths) and 0.002 (2 thousandths) are different."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "o": 0,
       "d1": 2,
       "d2": 0,
       "d3": 0,
       "cols": "o,d1",
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "cols": "o,d1,d2"
       }
      },
      {
       "set": {
        "cols": "o,d1,d2,d3"
       }
      },
      {
       "set": {
        "d1": 0,
        "d2": 2
       }
      }
     ],
     "ref": "There is Zero Dilemma!, p. 70"
    },
    {
     "t": "m",
     "who": "k7m3_zara",
     "say": "So who is right?",
     "q": "Among 0.2, 0.20, 0.200, 0.02 and 0.002, which is smallest and which is largest? And which of 4.5, 4.05, 0.405, 4.050, 4.50, 4.005, 04.50 are the same?",
     "o": [
      "Smallest 0.200, largest 0.2; same: 4.5 and 4.05",
      "Smallest 0.002, largest 0.2 = 0.20 = 0.200; same: 4.5 = 4.50 = 04.50 and 4.05 = 4.050",
      "Smallest 0.02, largest 0.200; same: 4.05 = 4.005",
      "Smallest 0.002, largest 0.200 only; same: 0.405 = 4.050"
     ],
     "a": 1,
     "h": "Look at each place, not at how many digits there are.",
     "ref": "In-text questions, p. 71",
     "xs": [
      "0.2 = 0.20 = 0.200 (2 tenths) is the largest; 0.002 is the smallest.",
      "4.5 = 4.50 = 04.50: a zero on the left of the whole part changes nothing either.",
      "4.05 = 4.050 (4 units, 5 hundredths).",
      "0.405 and 4.005 are different from all the rest."
     ],
     "v": {
      "k": "table",
      "head": [
       "Number",
       "Units",
       "Tenths",
       "Hundredths",
       "Thousandths"
      ],
      "rows": [
       [
        "0.2",
        "0",
        "2",
        "0",
        "0"
       ],
       [
        "0.20",
        "0",
        "2",
        "0",
        "0"
       ],
       [
        "0.200",
        "0",
        "2",
        "0",
        "0"
       ],
       [
        "0.02",
        "0",
        "0",
        "2",
        "0"
       ],
       [
        "0.002",
        "0",
        "0",
        "0",
        "2"
       ]
      ]
     }
    },
    {
     "t": "s",
     "who": "guide",
     "say": "My magnifier! To find 4.185, I zoom in again and again. Drag to turn it.",
     "note": "Locate a decimal by zooming: units, then tenths, then hundredths, then thousandths.",
     "xs": [
      "On 0 to 10, 4.185 is between 4 and 5.",
      "Zoom into 4 to 5: it is between 4.1 and 4.2.",
      "Zoom into 4.1 to 4.2: between 4.18 and 4.19.",
      "Zoom once more: 5 marks after 4.18 is 4.185."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_zoom3d",
      "p": {
       "x": 4.185,
       "lv": 1,
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "lv": 2
       }
      },
      {
       "set": {
        "lv": 3
       }
      },
      {
       "set": {
        "lv": 4
       },
       "hl": "mark"
      }
     ],
     "ref": "Number lines, Figure (a), p. 71"
    },
    {
     "t": "n",
     "who": "k7m3_sonu",
     "say": "In Figure (b) the zoom goes 0–10, then 3–4, then 3–3.1, then 3.05–3.06, and the arrow is 9 marks after 3.05.",
     "q": "What decimal number is shown by '?' in the last number line of Figure (b)?",
     "ans": 3.059,
     "tol": 0.0001,
     "h": "Last line: 3.05 + 9 thousandths.",
     "ref": "In-text question, p. 71 (Figure b)",
     "xs": [
      "Units: 3. Tenths: 0 (the zoom is 3 to 3.1).",
      "Hundredths: 5 (3.05 to 3.06).",
      "9 thousandths more: 3.059."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_zoom3d",
      "p": {
       "x": 3.059,
       "lv": 4,
       "show": "none"
      }
     },
     "xa": [
      null,
      null,
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "o",
     "kind": "Draw",
     "who": "guide",
     "say": "Now build your own magnifier lines.",
     "q": "Make such zoomed number lines for (a) 9.876 and (b) 0.407.",
     "ref": "In-text question, p. 71",
     "xs": [
      "(a) 0–10 → 9–10 → 9.8–9.9 → 9.87–9.88, mark 6 small parts after 9.87.",
      "(b) 0–10 → 0–1 → 0.4–0.5 → 0.40–0.41, mark 7 small parts after 0.40.",
      "Each new line is one part of the line above, cut into 10."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_zoom3d",
      "p": {
       "x": 9.876,
       "lv": 4,
       "show": "all"
      }
     }
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "This line goes from 5 to 10 with 10 equal divisions. Box b is 7.5.",
     "q": "What numbers do boxes a and c denote, if a is 2 divisions after 5 and c is 9 divisions after 5?",
     "o": [
      "a = 5.2, c = 5.9",
      "a = 7, c = 14.5",
      "a = 6, c = 9.5",
      "a = 6.5, c = 9"
     ],
     "a": 2,
     "h": "5 units in 10 divisions: each division is [1/2] unit.",
     "ref": "In-text question, p. 71",
     "xs": [
      "10 − 5 = 5 units split into 10 divisions: each is 0.5.",
      "a: 5 + 2 × 0.5 = 6.",
      "b: 5 + 5 × 0.5 = 7.5.",
      "c: 5 + 9 × 0.5 = 9.5."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_nline",
      "p": {
       "a": 5,
       "b": 10,
       "parts": 10,
       "m": 0,
       "ptr": 0,
       "auto": 0,
       "dp": 1,
       "marks": "a:2,b:5,c:9",
       "show": "step"
      }
     },
     "xa": [
      {
       "show": "step"
      },
      {
       "show": "all"
      },
      null,
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "Two more lines. 8 to 8.1 has 10 divisions; on 4.3 to 4.8, each of 10 divisions is 0.05.",
     "q": "d is 1 division and e is 5 divisions after 8; f, g, h are 1, 4 and 11 divisions after 4.3. What are d, e, f, g, h?",
     "o": [
      "8.1, 8.5, 4.4, 4.7, 5.4",
      "8.01, 8.05, 4.35, 4.5, 4.85",
      "8.01, 8.05, 4.31, 4.34, 4.41",
      "8.001, 8.005, 4.35, 4.5, 4.85"
     ],
     "a": 1,
     "h": "First find the size of one division.",
     "ref": "In-text question, p. 72",
     "xs": [
      "8 to 8.1 in 10 parts: each 0.01, so d = 8.01, e = 8.05.",
      "4.3 to 4.8 in 10 parts: each 0.05.",
      "f = 4.35, g = 4.3 + 0.2 = 4.5, h = 4.3 + 0.55 = 4.85."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_nline",
      "p": {
       "a": 4.3,
       "b": 4.9,
       "parts": 12,
       "m": 0,
       "ptr": 0,
       "auto": 0,
       "dp": 2,
       "marks": "f:1,g:4,h:11",
       "show": "step"
      }
     },
     "xa": [
      null,
      null,
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "s",
     "who": "k7m3_sarayu",
     "say": "Which is larger, 6.456 or 6.465? Same units, same tenths…",
     "note": "Compare from the highest place; the first place where digits differ decides.",
     "xs": [
      "Both have 6 units.",
      "Both have 4 tenths.",
      "Hundredths: 5 in 6.456 but 6 in 6.465.",
      "So 6.465 > 6.456, whatever the thousandths are."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_nline",
      "p": {
       "a": 6.45,
       "b": 6.47,
       "parts": 2,
       "sub": 10,
       "m": 0,
       "ptr": 0,
       "auto": 1,
       "dp": 2,
       "marks": "6.456:6,6.465:15",
       "show": "step"
      }
     },
     "xa": [
      null,
      null,
      {
       "hl": "marks"
      },
      {
       "show": "all"
      }
     ],
     "ref": "In-text example, p. 72–73"
    },
    {
     "t": "o",
     "kind": "Explain",
     "who": "k7m3_sarayu",
     "say": "Math Talk!",
     "q": "Why can we stop comparing at the first place where the digits differ? Can the digits after it change the conclusion?",
     "ref": "Math Talk, p. 73",
     "xs": [
      "One unit of a place is worth 10 of the next place to the right.",
      "If one number has at least 1 more in a place, all the later places can add at most 9 + 0.9 + … of the next places, which is still less than 1 of that place.",
      "Example: 6.46 vs 6.459999…: the extra hundredth beats any thousandths.",
      "So the later digits cannot change the result."
     ],
     "v": {
      "k": "lines",
      "l": [
       "6.4|6|5",
       "6.4|5|6",
       "1 hundredth = 10 thousandths",
       "more than any 9 thousandths"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m3_tinku",
     "say": "Quick contest!",
     "q": "Which is greater: (a) 1.23 or 1.32, (b) 3.81 or 13.800, (c) 1.009 or 1.090?",
     "o": [
      "1.23, 3.81, 1.009",
      "1.32, 3.81, 1.090",
      "1.32, 13.800, 1.090",
      "1.23, 13.800, 1.009"
     ],
     "a": 2,
     "h": "Line up the points first.",
     "ref": "In-text question, p. 73",
     "xs": [
      "(a) tenths 3 > 2: 1.32.",
      "(b) 13 units > 3 units: 13.800 (more digits after the point do not matter).",
      "(c) tenths 0 = 0, hundredths 9 > 0: 1.090."
     ],
     "v": {
      "k": "table",
      "head": [
       "Pair",
       "Greater"
      ],
      "rows": [
       [
        "(a) 1.23 or 1.32",
        "?"
       ],
       [
        "(b) 3.81 or 13.800",
        "?"
       ],
       [
        "(c) 1.009 or 1.090",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m3_sarayu",
     "say": "Closest decimals: 0.9 < 1 < 1.01 < 1.1 < 1.11, so 1.01 (only [1/100] away) is closest to 1.",
     "q": "Among 0.9, 1.1, 1.01, 1.11, which is closest to 1.09? Among 3.56, 3.65, 3.099, which is closest to 4? Among 0.8, 0.69, 1.08, which is closest to 1?",
     "o": [
      "1.11; 3.65; 1.08",
      "1.1; 3.65; 1.08",
      "1.01; 3.56; 0.8",
      "1.1; 3.099; 0.8"
     ],
     "a": 1,
     "h": "Find each distance by subtracting.",
     "ref": "In-text questions, p. 73",
     "xs": [
      "1.1 − 1.09 = 0.01, closer than 1.11 (0.02) or 1.01 (0.08).",
      "4 − 3.65 = 0.35, less than 0.44 or 0.901.",
      "1.08 − 1 = 0.08, less than 0.2 or 0.31."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_nline",
      "p": {
       "a": 0.9,
       "b": 1.2,
       "parts": 3,
       "sub": 10,
       "m": 19,
       "ptr": 1,
       "auto": 1,
       "dp": 1,
       "marks": "1.01:11,1.1:20,1.11:21",
       "show": "marks"
      }
     },
     "xa": [
      {
       "show": "all"
      },
      null,
      null
     ]
    },
    {
     "t": "o",
     "kind": "Think",
     "who": "guide",
     "say": "Math Talk puzzle with the digits 4, 1, 8, 2 and 5!",
     "q": "Use the digits 4, 1, 8, 2 and 5 exactly once each to make a decimal as close as possible to 25, in the forms □□.□□□, □.□□□□ and □□□.□□.",
     "ref": "Math Talk, p. 73",
     "xs": [
      "□□.□□□: 25.148 (0.148 away; 24.851 is 0.149 away).",
      "□.□□□□: the largest one-digit form, 8.5421, is the closest.",
      "□□□.□□: the smallest three-digit form, 124.58, is the closest.",
      "Tip: fix the biggest places first, then make the rest as small (or large) as possible."
     ],
     "v": {
      "k": "table",
      "head": [
       "Form",
       "Closest to 25"
      ],
      "rows": [
       [
        "□□.□□□",
        "25.148"
       ],
       [
        "□.□□□□",
        "8.5421"
       ],
       [
        "□□□.□□",
        "124.58"
       ]
      ]
     }
    }
   ]
  },
  {
   "title": "The Festival Saree",
   "sec": "3.7 Addition and Subtraction of Decimals · 3.8 More on the Decimal System · Figure it Out",
   "icon": "<svg viewBox='0 0 48 48'><path d='M10 6h28l-4 36H14z' fill='#e04a86'/><path d='M12 34h24' stroke='#f4c430' stroke-width='5'/><path d='M14 12h20' stroke='#f4c430' stroke-width='2'/><circle cx='24' cy='22' r='4' fill='#f4c430'/></svg>",
   "brief": "Add and subtract decimals for the festival saree, beware of decimal disasters, and finish the last weave.",
   "steps": [
    {
     "t": "s",
     "who": "k7m3_priya",
     "say": "I need 2.7 m of silk for my skirt and Shylaja needs 3.5 m for her kurti. How much in all?",
     "note": "Add decimals like whole numbers: line up the points, add place by place, regroup 10 for 1.",
     "xs": [
      "Line up: units under units, tenths under tenths.",
      "7 tenths + 5 tenths = 12 tenths = 1 unit + 2 tenths.",
      "2 + 3 + 1 = 6 units.",
      "2.7 + 3.5 = 6.2 m, the same as 2 [7/10] + 3 [5/10] = 6 [2/10]."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 2.7,
       "b": 3.5,
       "op": "+",
       "dp": 1,
       "step": 0,
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "step": 1
       }
      },
      {
       "set": {
        "step": 2
       }
      },
      null
     ],
     "ref": "Section 3.7, p. 74"
    },
    {
     "t": "n",
     "who": "k7m3_shylaja",
     "say": "How much longer is my kurti cloth than Priya's skirt cloth?",
     "q": "Find 3.5 m − 2.7 m.",
     "ans": 0.8,
     "u": "m",
     "tol": 0.001,
     "h": "Split 1 unit of 3.5 into 10 tenths.",
     "ref": "In-text question, p. 74",
     "xs": [
      "5 tenths < 7 tenths: split a unit, 2 units and 15 tenths.",
      "15 − 7 = 8 tenths; 2 − 2 = 0 units.",
      "3.5 − 2.7 = 0.8 m."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 3.5,
       "b": 2.7,
       "op": "−",
       "dp": 1,
       "step": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      null,
      {
       "set": {
        "step": 2
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "A bigger one: 75.345 + 86.691. The place value detail and the compact form give the same answer.",
     "note": "75.345 + 86.691 = 162.036: carry 1 thousandth-ten into hundredths, and so on.",
     "xs": [
      "Thousandths: 5 + 1 = 6. Hundredths: 4 + 9 = 13 = 1 tenth + 3 hundredths.",
      "Tenths: 3 + 6 + 1 = 10 = 1 unit + 0 tenths.",
      "Units: 5 + 6 + 1 = 12; tens: 7 + 8 + 1 = 16 = 1 hundred + 6 tens.",
      "Total 162.036."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 75.345,
       "b": 86.691,
       "op": "+",
       "dp": 3,
       "step": 0,
       "show": "all"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      {
       "hl": "trade"
      },
      null,
      {
       "set": {
        "step": 2
       }
      }
     ],
     "ref": "In-text example, p. 74"
    },
    {
     "t": "n",
     "who": "k7m3_sonu",
     "say": "Try This: write the place value computation for 84.691 − 77.345, and its compact form.",
     "q": "What is 84.691 − 77.345?",
     "ans": 7.346,
     "tol": 0.0001,
     "h": "1 − 5 needs a split from the hundredths; 4 − 7 needs a split from the tens.",
     "ref": "Try This, p. 75",
     "xs": [
      "Thousandths: 11 − 5 = 6 (after splitting a hundredth).",
      "Hundredths: 8 − 4 = 4; tenths: 6 − 3 = 3.",
      "Units: 14 − 7 = 7 (after splitting a ten); tens: 7 − 7 = 0.",
      "84.691 − 77.345 = 7.346."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 84.691,
       "b": 77.345,
       "op": "−",
       "dp": 3,
       "step": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      null,
      null,
      {
       "set": {
        "step": 2
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "Figure it Out: sums!",
     "q": "Which list gives 5.3 + 2.6, 18 + 8.8, 2.15 + 5.26, 9.01 + 9.10, 29.19 + 9.91, 0.934 + 0.6, 0.75 + 0.03, 6.236 + 0.487?",
     "o": [
      "7.9, 26.8, 7.41, 18.11, 39.10, 1.534, 0.78, 6.723",
      "7.9, 26.8, 7.31, 18.11, 38.10, 0.940, 0.78, 6.623",
      "7.9, 9.8, 7.41, 18.2, 39.10, 1.534, 1.05, 6.723",
      "8.9, 26.8, 7.41, 18.11, 39.1, 0.994, 0.78, 6.713"
     ],
     "a": 0,
     "h": "Line up the points; 0.934 + 0.600.",
     "ref": "Figure it Out 1, p. 75",
     "xs": [
      "5.3 + 2.6 = 7.9; 18.0 + 8.8 = 26.8.",
      "2.15 + 5.26 = 7.41; 9.01 + 9.10 = 18.11.",
      "29.19 + 9.91 = 39.10; 0.934 + 0.600 = 1.534.",
      "0.75 + 0.03 = 0.78; 6.236 + 0.487 = 6.723."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 29.19,
       "b": 9.91,
       "op": "+",
       "dp": 2,
       "step": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      null,
      null,
      {
       "set": {
        "step": 2
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_zara",
     "say": "And the differences.",
     "q": "Which list gives 5.6 − 2.3, 18 − 8.8, 10.4 − 4.5, 17 − 16.198, 17 − 0.05, 34.505 − 18.1, 9.9 − 9.09, 6.236 − 0.487?",
     "o": [
      "3.3, 10.8, 5.9, 1.198, 16.95, 16.405, 0.81, 5.749",
      "3.3, 9.2, 6.1, 0.802, 16.5, 16.405, 0.9, 5.749",
      "3.3, 9.2, 5.9, 0.802, 16.95, 16.405, 0.81, 5.749",
      "3.3, 9.2, 5.9, 0.812, 16.95, 16.495, 0.81, 5.851"
     ],
     "a": 2,
     "h": "Write 17 as 17.000 and 18 as 18.0 before subtracting.",
     "ref": "Figure it Out 2, p. 75",
     "xs": [
      "5.6 − 2.3 = 3.3; 18.0 − 8.8 = 9.2; 10.4 − 4.5 = 5.9.",
      "17.000 − 16.198 = 0.802; 17.00 − 0.05 = 16.95.",
      "34.505 − 18.100 = 16.405; 9.90 − 9.09 = 0.81.",
      "6.236 − 0.487 = 5.749."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 17,
       "b": 16.198,
       "op": "−",
       "dp": 3,
       "step": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      null,
      null,
      {
       "set": {
        "step": 2
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_tinku",
     "say": "Decimal sequences: 4.4, 4.8, 5.2, 5.6, 6.0, … adds 0.4 each time, so next come 6.4, 6.8, 7.2.",
     "q": "Find the change: (a) 4.4, 4.45, 4.5, … (b) 25.75, 26.25, 26.75, … (c) 10.56, 10.67, 10.78, … (d) 13.5, 16, 18.5, …",
     "o": [
      "(a) +0.5 (b) +0.5 (c) +0.11 (d) +2.5",
      "(a) +0.05 (b) +0.5 (c) +0.11 (d) +2.5",
      "(a) +0.05 (b) +0.05 (c) +0.1 (d) +3.5",
      "(a) +0.01 (b) +0.25 (c) +0.11 (d) +2.5"
     ],
     "a": 1,
     "h": "Subtract the first term from the second.",
     "ref": "Decimal Sequences, p. 75–76 (a)–(d)",
     "xs": [
      "(a) +0.05: 4.55, 4.6, 4.65.",
      "(b) +0.5: 27.25, 27.75, 28.25.",
      "(c) +0.11: 10.89, 11.0, 11.11.",
      "(d) +2.5: 21, 23.5, 26."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_nline",
      "p": {
       "a": 4.4,
       "b": 4.7,
       "parts": 6,
       "sub": 1,
       "m": 0,
       "ptr": 1,
       "auto": 1,
       "dp": 2,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "m": 1
       }
      },
      {
       "set": {
        "m": 2
       },
       "show": "all"
      },
      null,
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m3_tinku",
     "say": "Now (e) to (h), mentally if you can.",
     "q": "(e) 8.5, 9.4, 10.3, … (f) 5, 4.95, 4.90, … (g) 12.45, 11.95, 11.45, … (h) 36.5, 33, 29.5, … What are the next three terms of each?",
     "o": [
      "(e) 11.2, 12.1, 13.0 (f) 4.85, 4.80, 4.75 (g) 10.95, 10.45, 9.95 (h) 26, 22.5, 19",
      "(e) 11.1, 11.9, 12.7 (f) 4.85, 4.80, 4.75 (g) 10.95, 10.45, 9.95 (h) 26, 22.5, 19",
      "(e) 11.2, 12.1, 13.0 (f) 4.89, 4.88, 4.87 (g) 10.95, 10.45, 9.95 (h) 26.5, 23, 19.5",
      "(e) 11.2, 12.1, 13.0 (f) 4.85, 4.80, 4.75 (g) 10.95, 10.55, 10.05 (h) 25, 21.5, 18"
     ],
     "a": 0,
     "h": "(e) +0.9, (f) −0.05, (g) −0.5, (h) −3.5.",
     "ref": "Decimal Sequences, p. 76 (e)–(h)",
     "xs": [
      "(e) +0.9: 11.2, 12.1, 13.0.",
      "(f) −0.05: 4.85, 4.80, 4.75.",
      "(g) −0.5: 10.95, 10.45, 9.95.",
      "(h) −3.5: 26, 22.5, 19. Now make your own sequence for a classmate!"
     ],
     "v": {
      "k": "table",
      "head": [
       "Sequence",
       "Change",
       "Next three"
      ],
      "rows": [
       [
        "(e) 8.5, 9.4, 10.3",
        "?",
        "?"
       ],
       [
        "(f) 5, 4.95, 4.90",
        "?",
        "?"
       ],
       [
        "(g) 12.45, 11.95, 11.45",
        "?",
        "?"
       ],
       [
        "(h) 36.5, 33, 29.5",
        "?",
        "?"
       ]
      ]
     }
    },
    {
     "t": "o",
     "kind": "Explain",
     "who": "k7m3_sonu",
     "say": "My claim: the sum of two decimals is always more than the sum of their whole parts, and less than 2 more than that.",
     "q": "Check the claim for 25.936 + 8.202 and for 25.93603259 + 8.202. Does it work for any 2 decimals? Then find a way to narrow down the range for the difference of two decimals.",
     "ref": "Math Talk and Try This, p. 76",
     "xs": [
      "25.936 + 8.202 = 34.138, which lies between 25 + 8 = 33 and 25 + 1 + 8 + 1 = 35.",
      "25.93603259 + 8.202 = 34.13803259: also between 33 and 35.",
      "Each fractional part is at least 0 and less than 1, so together they add less than 2: true for any two decimals (the sum is 'greater' when the fractional parts are not both zero).",
      "Difference: for 25.936 − 8.202, it lies between (25 − 8) − 1 = 16 and (25 − 8) + 1 = 18; it is 17.734."
     ],
     "v": {
      "k": "lines",
      "l": [
       "25 + 8 = 33",
       "25.936 + 8.202 = 34.138",
       "26 + 9 = 35",
       "33 < 34.138 < 35"
      ]
     }
    },
    {
     "t": "s",
     "who": "guide",
     "say": "Decimal disasters! Point and unit mistakes can be serious.",
     "note": "Always check the units and where the decimal point is.",
     "xs": [
      "2013, Amsterdam: €188 million was sent instead of €1.8 million, because cents were treated as euros.",
      "1983, Air Canada: fuel was loaded in pounds instead of kilograms, about half of what was needed; the plane landed safely on an old airfield.",
      "Reading 0.05 mg as 0.5 mg gives 10 times the medicine.",
      "So: watch the units and the decimal point."
     ],
     "v": {
      "k": "table",
      "head": [
       "Mistake",
       "Effect"
      ],
      "rows": [
       [
        "cents read as euros",
        "€188 million instead of €1.8 million"
       ],
       [
        "pounds instead of kg",
        "about half the fuel"
       ],
       [
        "0.05 mg read as 0.5 mg",
        "10 times the dose"
       ]
      ]
     },
     "ref": "Decimal and Measurement Disasters, p. 76–77"
    },
    {
     "t": "m",
     "who": "k7m3_sarayu",
     "say": "My message says: 'The bus will reach the station 4.5 hours post noon.'",
     "q": "When will the bus reach the station?",
     "o": [
      "4:05 p.m.",
      "4:50 p.m.",
      "4:25 p.m.",
      "4:30 p.m."
     ],
     "a": 3,
     "h": "0.5 hour = 5 tenths of 60 minutes.",
     "ref": "Deceptive Decimal Notation, p. 77",
     "xs": [
      "0.5 hours means 5 of the 10 equal parts of an hour.",
      "Each part is 60 ÷ 10 = 6 minutes; 5 parts = 30 minutes.",
      "The bus arrives at 4:30 p.m., none of the three choices in the message."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 4.5,
       "a": 0,
       "b": 5,
       "div": 10,
       "obj": "bar",
       "unit": "hours",
       "show": "none",
       "lx": "hours after noon"
      }
     },
     "xa": [
      null,
      {
       "show": "all"
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m3_amma",
     "say": "A girl measured an opening as 2 ft 5 inches but told the carpenter '2.5 ft'. And on TV: 'Overs left: 5.5'.",
     "q": "What did the carpenter make, and what does 5.5 overs mean? (1 ft = 12 inches; 1 over = 6 balls)",
     "o": [
      "2 ft 5 in; 5 overs 3 balls",
      "2 ft 6 in; 5 overs and 5 balls",
      "2 ft 6 in; 5 overs and 3 balls",
      "2 ft 5 in; 5 overs and 5 balls"
     ],
     "a": 1,
     "h": "0.5 ft = half of 12 inches; in cricket the digit after the point counts balls.",
     "ref": "Deceptive Decimal Notation, p. 77–78",
     "xs": [
      "0.5 ft = [5/10] of 12 inches = 6 inches, so the door was 2 ft 6 in and would not close.",
      "In cricket, 5.5 overs means 5 overs and 5 balls, that is 5 [5/6] overs.",
      "It is a decimal-looking notation, not tenths."
     ],
     "v": {
      "k": "lines",
      "l": [
       "Opening: 2 ft 5 in → told '2.5 ft'",
       "1 ft = 12 inches",
       "'Overs left: 5.5'",
       "1 over = 6 balls"
      ]
     }
    },
    {
     "t": "o",
     "kind": "Discuss",
     "who": "k7m3_tinku",
     "say": "Math Talk!",
     "q": "Where else can we see such 'non-decimals' with a decimal-like notation?",
     "ref": "Math Talk, p. 78",
     "xs": [
      "Time on digital clocks, like 4.30 meaning 4 hours 30 minutes.",
      "Heights told as 5.4 meaning 5 feet 4 inches.",
      "Book or section numbers like 3.10 (section 10 of chapter 3, which comes after 3.9).",
      "Cricket overs, like 5.5."
     ],
     "v": {
      "k": "lines",
      "l": [
       "4.30 → 4 h 30 min",
       "5.4 (height) → 5 ft 4 in",
       "Section 3.10 comes after 3.9",
       "5.5 overs → 5 overs 5 balls"
      ]
     }
    },
    {
     "t": "s",
     "who": "guide",
     "say": "A pinch of history! Decimal fractions appear in the works of ancient Indian mathematicians, such as Śhrīdharāchārya in the 8th century.",
     "note": "The decimal point is the most popular way to separate whole and fractional parts in the Indian place value system.",
     "xs": [
      "Around 950 CE, al-Uqlīdisī described decimal notation in 'The Book of Chapters on Indian Arithmetic'.",
      "In the 15th century people used a vertical mark, colours, or a superscript to show the fractional part.",
      "In the 16th century, Napier and Clavius used the point; Viète used a comma.",
      "Some countries still write 1,000.5 as 1 000,5."
     ],
     "v": {
      "k": "table",
      "head": [
       "When",
       "How the fractional part was shown"
      ],
      "rows": [
       [
        "8th century",
        "Decimal fractions in Śhrīdharāchārya's works"
       ],
       [
        "c. 950 CE",
        "al-Uqlīdisī: a mark, 0ˈ059375"
       ],
       [
        "15th century",
        "vertical mark, colours, superscripts"
       ],
       [
        "16th century",
        "point (Napier, Clavius) or comma (Viète)"
       ]
      ]
     },
     "ref": "A Pinch of History, p. 78"
    },
    {
     "t": "m",
     "who": "k7m3_priya",
     "say": "Last loom: the Figure it Out at the end of the chapter!",
     "q": "Q1: Convert [5/100], [16/1000], [12/10], [254/1000] to decimals. Q2: write 0.362 as a sum of tenths, hundredths and thousandths.",
     "o": [
      "0.5, 0.16, 1.2, 0.254; [36/100] + [2/1000]",
      "0.05, 0.016, 1.2, 0.254; [3/10] + [6/100] + [2/1000]",
      "0.05, 0.016, 0.12, 2.54; [3/10] + [62/1000]",
      "0.005, 0.16, 12.0, 0.254; [3/100] + [6/10] + [2/1000]"
     ],
     "a": 1,
     "h": "Count the zeros in the denominator.",
     "ref": "Figure it Out 1, 2, p. 78–79",
     "xs": [
      "[5/100] = 0.05; [16/1000] = 0.016; [12/10] = 1.2; [254/1000] = 0.254.",
      "0.34 = [3/10] + [4/100]; 1.02 = 1 + [2/100]; 0.8 = [8/10].",
      "0.362 = [3/10] + [6/100] + [2/1000]."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "o": 0,
       "d1": 0,
       "d2": 0,
       "d3": 0,
       "cols": "o,d1,d2,d3",
       "show": "none",
       "h": 0,
       "t": 0
      }
     },
     "xa": [
      null,
      null,
      {
       "set": {
        "d1": 3,
        "d2": 6,
        "d3": 2
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_zara",
     "say": "Q3: the line goes 6.4, 6.5, 6.6 and each tenth is split into 4 equal parts.",
     "q": "a is 2 marks after 6.4, c is 1 mark after 6.5 and b is 2 marks after 6.5. What are a, b and c?",
     "o": [
      "a = 6.42, b = 6.52, c = 6.51",
      "a = 6.45, b = 6.55, c = 6.525",
      "a = 6.5, b = 6.6, c = 6.55",
      "a = 6.45, b = 6.525, c = 6.55"
     ],
     "a": 1,
     "h": "One mark = 0.1 ÷ 4 = 0.025.",
     "ref": "Figure it Out 3, p. 79",
     "xs": [
      "Each mark = 0.025.",
      "a = 6.4 + 0.05 = 6.45.",
      "c = 6.5 + 0.025 = 6.525; b = 6.5 + 0.05 = 6.55."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_nline",
      "p": {
       "a": 6.4,
       "b": 6.6,
       "parts": 2,
       "sub": 4,
       "m": 0,
       "ptr": 0,
       "auto": 1,
       "dp": 1,
       "marks": "a:2,c:5,b:6",
       "show": "step"
      }
     },
     "xa": [
      {
       "show": "all"
      },
      null,
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m3_mahi",
     "say": "Q4: descending order, biggest first.",
     "q": "Which is in correct descending order? (a) 11.01, 1.011, 1.101, 11.10, 1.01  (b) 2.567, 2.675, 2.768, 2.499, 2.698",
     "o": [
      "(a) 11.10, 11.01, 1.101, 1.011, 1.01 (b) 2.768, 2.698, 2.675, 2.567, 2.499",
      "(a) 11.01, 11.10, 1.101, 1.01, 1.011 (b) 2.768, 2.675, 2.698, 2.567, 2.499",
      "(a) 1.01, 1.011, 1.101, 11.01, 11.10 (b) 2.499, 2.567, 2.675, 2.698, 2.768",
      "(a) 11.10, 11.01, 1.011, 1.101, 1.01 (b) 2.768, 2.698, 2.567, 2.675, 2.499"
     ],
     "a": 0,
     "h": "Compare place by place from the left.",
     "ref": "Figure it Out 4, p. 79",
     "xs": [
      "(a) 11.10 > 11.01 > 1.101 > 1.011 > 1.01.",
      "(b) 2.768 > 2.698 > 2.675 > 2.567 > 2.499.",
      "(c) 4.678 > 4.666 > 4.656 > 4.600 > 4.595 g.",
      "(d) 33.331 > 33.313 > 33.31 > 33.133 > 33.13 m."
     ],
     "v": {
      "k": "table",
      "head": [
       "List",
       "Descending order"
      ],
      "rows": [
       [
        "(a) 11.01, 1.011, 1.101, 11.10, 1.01",
        "?"
       ],
       [
        "(b) 2.567, 2.675, 2.768, 2.499, 2.698",
        "?"
       ],
       [
        "(c) 4.678 g, 4.595 g, 4.600 g, 4.656 g, 4.666 g",
        "?"
       ],
       [
        "(d) 33.13 m, 33.31 m, 33.133 m, 33.331 m, 33.313 m",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m3_tinku",
     "say": "Q5 and Q6, digit puzzles.",
     "q": "Using 1, 4, 0, 8, 6 each once: (a) the decimal closest to 30, (b) the smallest decimal between 100 and 1000. Q6: does a decimal with more digits always win?",
     "o": [
      "(a) 18.640 (b) 100.468; yes",
      "(a) 40.168 (b) 104.68; no, e.g. 2.5 > 2.05",
      "(a) 41.068 (b) 106.48; no",
      "(a) 30.168 (b) 104.68; yes"
     ],
     "a": 1,
     "h": "Below 30 the best is 18.64; above 30, 40.168.",
     "ref": "Figure it Out 5, 6, p. 79",
     "xs": [
      "Closest below 30: 18.64 (11.36 away). Closest above: 40.168 (10.168 away). So 40.168.",
      "Between 100 and 1000 with the smallest start: 1, 0, 4 then .68: 104.68.",
      "Q6: No. 2.5 has fewer digits than 2.05 but 2.5 > 2.05."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "t": 0,
       "o": 0,
       "d1": 0,
       "d2": 0,
       "d3": 0,
       "cols": "t,o,d1,d2,d3",
       "show": "none",
       "h": 0
      }
     },
     "xa": [
      {
       "set": {
        "t": 4,
        "o": 0,
        "d1": 1,
        "d2": 6,
        "d3": 8
       },
       "show": "all"
      },
      {
       "set": {
        "h": 1,
        "t": 0,
        "o": 4,
        "d1": 6,
        "d2": 8,
        "d3": 0,
        "cols": "h,t,o,d1,d2"
       }
      },
      null
     ]
    },
    {
     "t": "n",
     "who": "k7m3_mahi",
     "say": "Q7: I bought 0.25 kg beans, 0.3 kg carrots, 0.5 kg potatoes, 0.2 kg capsicums and 0.05 kg ginger.",
     "q": "What is the total weight of Mahi's vegetables?",
     "ans": 1.3,
     "u": "kg",
     "tol": 0.001,
     "h": "Write each with 2 decimal places and add.",
     "ref": "Figure it Out 7, p. 79",
     "xs": [
      "0.25 + 0.30 + 0.50 + 0.20 + 0.05.",
      "= 1.30 kg = 1.3 kg."
     ],
     "v": {
      "k": "lines",
      "l": [
       "beans 0.25 kg + carrots 0.3 kg",
       "+ potatoes 0.5 kg + capsicums 0.2 kg",
       "+ ginger 0.05 kg = ? kg"
      ]
     }
    },
    {
     "t": "n",
     "who": "k7m3_pinto",
     "say": "Q8: I supplied 3.79 L, 4.2 L and 4.25 L of milk in the first three days, and 25 L in all 6 days.",
     "q": "How much milk did Pinto supply in the last three days?",
     "ans": 12.76,
     "u": "L",
     "tol": 0.001,
     "h": "First add the three days, then subtract from 25.",
     "ref": "Figure it Out 8, p. 79",
     "xs": [
      "3.79 + 4.20 + 4.25 = 12.24 L.",
      "25.00 − 12.24 = 12.76 L."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 25,
       "b": 12.24,
       "op": "−",
       "dp": 2,
       "step": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      {
       "set": {
        "step": 2
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "n",
     "who": "k7m3_tinku",
     "say": "Q9: I weighed 35.75 kg in January and 34.50 kg in February.",
     "q": "Tinku lost weight. By how many kilograms did it change?",
     "ans": 1.25,
     "u": "kg",
     "tol": 0.001,
     "h": "35.75 − 34.50.",
     "ref": "Figure it Out 9, p. 79",
     "xs": [
      "February is less than January, so he lost weight.",
      "35.75 − 34.50 = 1.25 kg."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_regroup",
      "p": {
       "a": 35.75,
       "b": 34.5,
       "op": "−",
       "dp": 2,
       "step": 0,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "step": 1
       }
      },
      {
       "set": {
        "step": 2
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m3_sonu",
     "say": "Q10: a zig-zag pattern 5.5, 6.4, 6.39, 7.29, 7.28, 8.18, 8.17, …",
     "q": "What are the next two terms?",
     "o": [
      "9.08, 9.07",
      "9.07, 9.06",
      "9.17, 9.16",
      "8.27, 8.26"
     ],
     "a": 1,
     "h": "+0.9, then −0.01, again and again.",
     "ref": "Figure it Out 10, p. 79",
     "xs": [
      "5.5 + 0.9 = 6.4; 6.4 − 0.01 = 6.39; 6.39 + 0.9 = 7.29 …",
      "8.17 + 0.9 = 9.07.",
      "9.07 − 0.01 = 9.06."
     ],
     "v": {
      "k": "lines",
      "l": [
       "5.5, 6.4, 6.39, 7.29",
       "7.28, 8.18, 8.17, ?, ?"
      ]
     }
    },
    {
     "t": "m",
     "who": "guide",
     "say": "Q11 and Q12: big and small together.",
     "q": "How many millimetres make 1 kilometre? And if 1 lakh railway passengers each pay 45 paise for travel insurance, what is the total fee?",
     "o": [
      "1000 mm; ₹450",
      "10,00,000 mm; ₹45,000",
      "1,00,000 mm; ₹4,500",
      "10,00,000 mm; ₹4,50,000"
     ],
     "a": 1,
     "h": "1 km = 1000 m and 1 m = 1000 mm; 45 paise = ₹0.45.",
     "ref": "Figure it Out 11, 12, p. 79",
     "xs": [
      "1 km = 1000 m = 1000 × 1000 mm = 10,00,000 mm.",
      "1,00,000 × ₹0.45 = ₹45,000."
     ],
     "v": {
      "k": "lines",
      "l": [
       "1 km = 1000 m, 1 m = 1000 mm",
       "1 km = ? mm",
       "45 paise × 1,00,000 passengers = ₹?"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m3_zara",
     "say": "Q13: which is greater?",
     "q": "(a) [10/1000] or [1/10]? (b) one-hundredth or 90 thousandths? (c) one-thousandth or 90 hundredths?",
     "o": [
      "(a) [10/1000] (b) one-hundredth (c) one-thousandth",
      "(a) [1/10] (b) 90 thousandths (c) 90 hundredths",
      "(a) [1/10] (b) one-hundredth (c) 90 hundredths",
      "(a) equal (b) 90 thousandths (c) one-thousandth"
     ],
     "a": 1,
     "h": "Write each as a decimal.",
     "ref": "Figure it Out 13, p. 79–80",
     "xs": [
      "(a) [10/1000] = 0.01 < 0.1 = [1/10].",
      "(b) 0.01 < 0.090.",
      "(c) 0.001 < 0.90."
     ],
     "v": {
      "k": "table",
      "head": [
       "Pair",
       "Greater"
      ],
      "rows": [
       [
        "(a) [10/1000] or [1/10]",
        "?"
       ],
       [
        "(b) one-hundredth or 90 thousandths",
        "?"
       ],
       [
        "(c) one-thousandth or 90 hundredths",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m3_amma",
     "say": "Q14: 87 ones, 5 tenths and 60 hundredths = 88.10. Regroup the rest the same way!",
     "q": "(b) 12 tens and 12 tenths, (c) 10 tens, 10 ones, 10 tenths and 10 hundredths, (d) 25 tens, 25 ones, 25 tenths and 25 hundredths. In decimal form:",
     "o": [
      "(b) 12.12 (c) 10.101 (d) 25.2525",
      "(b) 121.2 (c) 111.1 (d) 277.75",
      "(b) 120.12 (c) 110.11 (d) 275.25",
      "(b) 121.2 (c) 111.11 (d) 277.5"
     ],
     "a": 1,
     "h": "Turn each group into a number and add: 12 tens = 120, 12 tenths = 1.2.",
     "ref": "Figure it Out 14, p. 80",
     "xs": [
      "(b) 120 + 1.2 = 121.2.",
      "(c) 100 + 10 + 1 + 0.1 = 111.1.",
      "(d) 250 + 25 + 2.5 + 0.25 = 277.75."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_pv",
      "p": {
       "h": 0,
       "t": 0,
       "o": 0,
       "d1": 0,
       "d2": 0,
       "cols": "h,t,o,d1,d2",
       "show": "none",
       "d3": 0
      }
     },
     "xa": [
      {
       "set": {
        "t": 12,
        "d1": 12
       },
       "show": "all"
      },
      {
       "set": {
        "t": 10,
        "o": 10,
        "d1": 10,
        "d2": 10
       }
      },
      {
       "set": {
        "t": 25,
        "o": 25,
        "d1": 25,
        "d2": 25
       }
      }
     ]
    },
    {
     "t": "o",
     "kind": "Think",
     "who": "guide",
     "say": "Q15, a weaver's puzzle: □.□□□ + □.□□□, using each digit 0–9 at most once.",
     "q": "Fill the boxes □.□□□ + □.□□□ so that the sum is as close as possible to 10.5.",
     "ref": "Figure it Out 15, p. 80",
     "xs": [
      "One good answer: 9.476 + 1.025 = 10.501, only 0.001 away.",
      "It can even be exact: 0.643 + 9.857 = 10.500 (digits 0, 6, 4, 3, 9, 8, 5, 7 all different).",
      "Plan from the left: units must add to 9 or 10, then tenths, hundredths and thousandths with carries."
     ],
     "v": {
      "k": "lines",
      "l": [
       "9.476 + 1.025 = 10.501",
       "0.643 + 9.857 = 10.500",
       "closest possible: exactly 10.5"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m3_shylaja",
     "say": "Q16, the last thread: fractions we know well.",
     "q": "Write [1/2], [3/2], [1/4], [3/4], [1/5] and [4/5] in decimal form.",
     "o": [
      "0.5, 1.5, 0.25, 0.75, 0.2, 0.8",
      "0.2, 3.2, 0.4, 0.34, 0.5, 0.45",
      "0.5, 0.15, 0.25, 0.75, 0.5, 0.4",
      "0.12, 1.5, 0.14, 0.34, 0.15, 0.45"
     ],
     "a": 0,
     "h": "Make the denominator 10 or 100: [1/2] = [5/10].",
     "ref": "Figure it Out 16, p. 80",
     "xs": [
      "[1/2] = [5/10] = 0.5; [3/2] = [15/10] = 1.5.",
      "[1/4] = [25/100] = 0.25; [3/4] = [75/100] = 0.75.",
      "[1/5] = [2/10] = 0.2; [4/5] = [8/10] = 0.8. The festival saree is woven!"
     ],
     "v": {
      "k": "sim",
      "sim": "k7m3_ruler",
      "p": {
       "len": 0,
       "a": 0,
       "b": 2,
       "div": 10,
       "obj": "ribbon",
       "unit": "",
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "len": 0.5
       },
       "show": "all"
      },
      {
       "set": {
        "len": 1.5
       }
      },
      {
       "set": {
        "len": 0.8
       }
      }
     ]
    }
   ]
  }
 ],
 "summary": [
  [
   "Smaller units",
   "When we need an exact measure, we split a unit into smaller equal parts. Splitting 1 cm into 10 parts lets us measure a screw as 2 [7/10] cm."
  ],
  [
   "Tenths",
   "One-tenth is one of 10 equal parts of a unit; 10 tenths make 1 unit, so 3 [4/10] = [34/10]."
  ],
  [
   "Hundredths and thousandths",
   "Each tenth split into 10 gives hundredths (100 in a unit); each hundredth split into 10 gives thousandths. 1 tenth = 10 hundredths, 1 hundredth = 10 thousandths."
  ],
  [
   "Decimal place value",
   "The Indian place value system extends to the right: every place is [1/10] of the place on its left. The decimal point separates the whole part from the fractional part: 70.5 = 7 × 10 + 5 × [1/10]."
  ],
  [
   "Reading and writing",
   "70.5 is read 'seventy point five' and 0.274 'zero point two seven four'. Zeros at the right end of the fractional part do not change the value: 0.2 = 0.20 = 0.200."
  ],
  [
   "Units of measurement",
   "1 mm = 0.1 cm, 1 cm = 0.01 m, 1 mm = 0.001 m, 1 g = 0.001 kg and 1 paisa = ₹0.01, so conversions are just place value shifts."
  ],
  [
   "Locating and comparing",
   "Decimals are found on a number line by zooming into tenths, then hundredths. To compare, line up the points and compare from the highest place; the first different digit decides."
  ],
  [
   "Adding and subtracting",
   "Line up the decimal points and add or subtract place by place, regrouping 10 of a place for 1 of the next place, exactly as with whole numbers. Estimate first to catch mistakes."
  ],
  [
   "Watch the point",
   "Decimal point and unit mistakes can be serious, and some decimal-looking numbers (hours, feet, cricket overs) are not tenths at all."
  ]
 ]
});
