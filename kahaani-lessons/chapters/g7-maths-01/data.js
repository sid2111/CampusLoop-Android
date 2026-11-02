const BOOK_TITLE = "Gilli and the Lakh Seed Bank";
const GRADE = "7";
const BOOK = {"name":"Ganita Prakash","short":"Ganita","part":"Part I","key":"ganita7-p1-v4","subj":"Maths","minimal":true};
const CHAPTERS = [];
CHAPTERS.push({
 "no": 1,
 "title": "Large Numbers Around Us",
 "story": "Gilli and the Lakh Seed Bank",
 "intro": "In Chintamani, Karnataka, the village seed bank dreams of saving a lakh varieties of rice. Gilli, the three-striped palm squirrel who keeps the count, needs your help: fill each granary with big-number know-how — lakhs, crores, millions, estimates and clever products — and the seed bank opens its doors!",
 "theme": {
  "scene": "k7m1_paddy",
  "guide": "k7m1_squirrel",
  "guideName": "Gilli",
  "unit": "Granary",
  "doneStamp": "SEEDS SAVED",
  "badge": "Lakh-Seed Keeper"
 },
 "people": {
  "k7m1_eshwarappa": {
   "name": "Eshwarappa",
   "skin": "#8e5a38",
   "hair": "turban",
   "acc": "#f4f0e6",
   "bg": "#35c29a",
   "shirt": "#f4f0e6"
  },
  "k7m1_roxie": {
   "name": "Roxie",
   "skin": "#a96d45",
   "hair": "long",
   "bg": "#e04a86",
   "shirt": "#f4a51c"
  },
  "k7m1_estu": {
   "name": "Estu",
   "skin": "#9c6640",
   "hair": "short",
   "bg": "#62b6e8",
   "shirt": "#2f6d5a"
  },
  "k7m1_lakshmamma": {
   "name": "Lakshmamma",
   "skin": "#8b5634",
   "hair": "bun",
   "bg": "#f4a51c",
   "shirt": "#b8323a"
  },
  "k7m1_somu": {
   "name": "Somu",
   "skin": "#b67a4f",
   "hair": "curly",
   "bg": "#f4a51c",
   "shirt": "#3a4f9a"
  },
  "k7m1_preetham": {
   "name": "Preetham",
   "skin": "#c68b5d",
   "hair": "short",
   "bg": "#e04a86",
   "shirt": "#35c29a"
  }
 },
 "cases": [
  {
   "title": "How Big Is a Lakh?",
   "sec": "1.1 A Lakh Varieties!",
   "icon": "<svg viewBox='0 0 48 48'><path d='M8 26 Q24 46 40 26Z' fill='#c0782e'/><ellipse cx='24' cy='26' rx='16' ry='5' fill='#fff6dc'/><path d='M24 22 Q20 10 26 4' stroke='#c9a14a' stroke-width='2' fill='none'/><ellipse cx='27' cy='7' rx='2' ry='4' fill='#f2cf63'/><ellipse cx='22' cy='12' rx='2' ry='4' fill='#f2cf63'/></svg>",
   "brief": "Ramanna says India once had about a lakh varieties of rice. Estu wonders: could anyone taste them all in one lifetime?",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "Namaskara! I’m Gilli, keeper of the Chintamani seed bank. Eshwarappa heard Ramanna say our country once had about a lakh varieties of rice. Let’s see how big one lakh really is.",
     "note": "1 lakh = 1,00,000 = 1 followed by 5 zeros. It is 10 × 10,000.",
     "xs": [
      "Start with one tiny seed block: 1.",
      "Ten of them make 10, ten tens make 100, ten hundreds make 1000.",
      "Ten thousands make 10,000.",
      "Ten ten-thousands make one lakh: 1,00,000."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_3dblocks",
      "p": {
       "e": 0,
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "e": 3
       }
      },
      {
       "set": {
        "e": 4
       }
      },
      {
       "set": {
        "e": 5
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "I have tasted only 3 varieties! Before I count to a lakh, let me climb the number ladder.",
     "q": "The largest 3-digit number is 999. Adding 1 gives the smallest 4-digit number. Following the same pattern, what is 99,999 + 1?",
     "o": [
      "9,99,999",
      "10,000",
      "1,00,000",
      "99,9991"
     ],
     "a": 2,
     "h": "99,999 is the largest 5-digit number. One more gives the smallest 6-digit number.",
     "ref": "In-text boxes, p. 2",
     "xs": [
      "999 + 1 = 1000, 9999 + 1 = 10,000.",
      "99,999 is the largest 5-digit number.",
      "99,999 + 1 = 1,00,000, the smallest 6-digit number: one lakh."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 99999,
       "sys": "in",
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "show": "ind"
      },
      {
       "set": {
        "n": 100000
       }
      }
     ]
    },
    {
     "t": "n",
     "who": "k7m1_roxie",
     "say": "Let me fill the middle boxes of the pattern.",
     "q": "What is the smallest 5-digit number (the largest 4-digit number + 1)?",
     "ans": 10000,
     "tol": 0.5,
     "h": "The largest 4-digit number is 9999.",
     "ref": "In-text boxes, p. 2",
     "xs": [
      "The largest 4-digit number is 9999.",
      "9999 + 1 = 10,000.",
      "So the smallest 5-digit number is 10,000 and the largest is 99,999."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 9999,
       "sys": "in",
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "n": 10000
       },
       "show": "ind"
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "The book shows a number line counting up to one lakh: 99,995, 99,996, a gap, 99,998, then more gaps.",
     "q": "Which numbers fill the gaps after 99,996 on the way to one lakh?",
     "o": [
      "99,997, 99,999 and 1,00,000",
      "99,997, 99,999 and 99,1000",
      "99,999, 99,997 and 10,000",
      "99,997, 99,998 and 99,999 only"
     ],
     "a": 0,
     "h": "Count up by 1 each time.",
     "ref": "In-text number line, p. 2",
     "xs": [
      "99,996 + 1 = 99,997.",
      "After 99,998 comes 99,999.",
      "99,999 + 1 = 1,00,000: one lakh."
     ],
     "v": {
      "k": "table",
      "head": [
       "99,995",
       "99,996",
       "?",
       "99,998",
       "?",
       "?"
      ],
      "rows": [
       [
        "+1",
        "+1",
        "?",
        "+1",
        "?",
        "?"
       ]
      ],
      "cap": "Counting up to one lakh"
     }
    },
    {
     "t": "n",
     "who": "k7m1_estu",
     "say": "One new rice variety every day, for 100 years. Is that enough?",
     "q": "If Estu ate 1 new variety a day for 100 years (365 days a year), how many varieties would he taste?",
     "ans": 36500,
     "tol": 0.5,
     "h": "365 × 100.",
     "ref": "In-text question, p. 1–2",
     "xs": [
      "Days in 100 years = 365 × 100 = 36,500.",
      "One variety a day gives 36,500 varieties.",
      "That is nowhere close to 1,00,000!"
     ],
     "v": {
      "k": "lines",
      "l": [
       "365 days in a year",
       "× 100 years",
       "1 variety a day → ? varieties"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "What if we ate 2 varieties every day? Or 3?",
     "q": "In a 100-year life, who can taste all one lakh varieties?",
     "o": [
      "Someone eating 2 a day (73,000)",
      "Nobody, even at 3 a day",
      "Someone eating 3 a day (1,09,500)",
      "Both 2 a day and 3 a day"
     ],
     "a": 2,
     "h": "Multiply 36,500 by 2 and by 3.",
     "ref": "In-text questions, p. 2 (Roxie)",
     "xs": [
      "2 a day: 2 × 36,500 = 73,000, less than a lakh.",
      "3 a day: 3 × 36,500 = 1,09,500.",
      "1,09,500 is more than 1,00,000: 3 a day works!"
     ],
     "v": {
      "k": "lines",
      "l": [
       "1 a day for 100 years = 36,500",
       "2 a day: 2 × 36,500 = ?",
       "3 a day: 3 × 36,500 = ?",
       "Target: 1,00,000"
      ]
     }
    },
    {
     "t": "n",
     "who": "k7m1_estu",
     "say": "If we live for y years, we live 365 × y days. Let me choose y so the days come close to one lakh.",
     "q": "About how many years make 1,00,000 days? (Give the whole number of years whose days are closest to one lakh.)",
     "ans": 274,
     "tol": 0.5,
     "h": "1,00,000 ÷ 365 ≈ ?",
     "ref": "In-text question, p. 3 (choose y)",
     "xs": [
      "1,00,000 ÷ 365 ≈ 273.97.",
      "365 × 274 = 1,00,010 days, just over a lakh.",
      "So living 1 lakh days means living about 274 years!"
     ],
     "v": {
      "k": "table",
      "head": [
       "y (years)",
       "365 × y (days)"
      ],
      "rows": [
       [
        "100",
        "36,500"
       ],
       [
        "200",
        "73,000"
       ],
       [
        "300",
        "1,09,500"
       ],
       [
        "?",
        "≈ 1,00,000"
       ]
      ],
      "cap": "Days in y years"
     }
    },
    {
     "t": "m",
     "who": "k7m1_lakshmamma",
     "say": "In the 2011 Census, Chintamani had about 75,000 people. In 2024 it is estimated at 1,06,000.",
     "q": "How much less than one lakh is 75,000, and how much more than one lakh is 1,06,000?",
     "o": [
      "35,000 less; 60,000 more",
      "25,000 less; 6,000 more",
      "25,000 less; 60,000 more",
      "2,500 less; 6,000 more"
     ],
     "a": 1,
     "h": "1,00,000 − 75,000 and 1,06,000 − 1,00,000.",
     "ref": "Figure it Out Q1–Q2, p. 3",
     "xs": [
      "1,00,000 − 75,000 = 25,000.",
      "1,06,000 − 1,00,000 = 6,000.",
      "Careful: 1,06,000 is one lakh six thousand, not sixty thousand."
     ],
     "v": {
      "k": "bars",
      "max": 120000,
      "line": 100000,
      "lineLabel": "1 lakh",
      "items": [
       {
        "l": "2011",
        "v": 75000,
        "t": "75,000",
        "c": "sky"
       },
       {
        "l": "2024",
        "v": 106000,
        "t": "1,06,000"
       }
      ]
     }
    },
    {
     "t": "n",
     "who": "k7m1_eshwarappa",
     "say": "Our town is growing fast!",
     "q": "By how much did the population of Chintamani increase from 2011 (75,000) to 2024 (1,06,000)?",
     "ans": 31000,
     "tol": 0.5,
     "h": "1,06,000 − 75,000.",
     "ref": "Figure it Out Q3, p. 3",
     "xs": [
      "Increase = 1,06,000 − 75,000.",
      "= 25,000 (up to a lakh) + 6,000 (past a lakh).",
      "= 31,000 people."
     ],
     "v": {
      "k": "bar",
      "parts": [
       {
        "w": 0.7075,
        "l": "75,000",
        "c": "sky"
       },
       {
        "w": 0.2925,
        "l": "+ ?",
        "c": "rani"
       }
      ],
      "top": [
       [
        0,
        "0"
       ],
       [
        1,
        "1,06,000"
       ]
      ],
      "cap": "2011 population plus the increase"
     }
    }
   ]
  },
  {
   "title": "Tall Towers and Big Names",
   "sec": "Getting a Feel of Large Numbers · Reading and Writing Numbers",
   "icon": "<svg viewBox='0 0 48 48'><rect x='8' y='14' width='12' height='30' fill='#b5523b'/><rect x='11' y='18' width='6' height='4' fill='#ffe7a8'/><rect x='11' y='26' width='6' height='4' fill='#ffe7a8'/><path d='M28 44 L31 10 L34 8 L37 10 L40 44Z' fill='#a7794a'/><circle cx='34' cy='7' r='3' fill='#a7794a'/></svg>",
   "brief": "Somu is 1 metre tall and lives in a 10-floor building. How do giant heights and lakhs compare with familiar things?",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "Big measurements are easier to feel when we compare them with something familiar. The Statue of Unity in Gujarat is about 180 m tall; Kunchikal waterfall in Karnataka drops about 450 m.",
     "note": "To feel a large quantity, compare it with something familiar: ‘how many times’ or ‘how much more’.",
     "xs": [
      "Somu is 1 metre tall.",
      "Each floor of his building is about 4 times his height: 4 m.",
      "The statue and the waterfall tower over the building."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_tower",
      "p": {
       "floors": 10,
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "hl": "bld"
      },
      {
       "hl": "item"
      }
     ]
    },
    {
     "t": "n",
     "who": "k7m1_somu",
     "say": "Hi, I am Somu! My building has 10 floors, each about 4 times my height.",
     "q": "What is the approximate height of Somu’s building (in metres)?",
     "ans": 40,
     "u": "m",
     "tol": 0.5,
     "h": "10 floors × 4 m.",
     "ref": "In-text question, p. 3",
     "xs": [
      "One floor ≈ 4 × 1 m = 4 m.",
      "10 floors × 4 m = 40 m."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_tower",
      "p": {
       "floors": 10,
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "show": "bld"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "Now let’s compare.",
     "q": "Which is taller, the Statue of Unity or Somu’s building, and by how much? How much taller than the building is Kunchikal waterfall?",
     "o": [
      "Building by 140 m; waterfall by 410 m",
      "Statue by 140 m; waterfall by 270 m",
      "Statue by 220 m; waterfall by 450 m",
      "Statue by 140 m; waterfall by 410 m"
     ],
     "a": 3,
     "h": "Subtract 40 m from each height.",
     "ref": "In-text questions, p. 3",
     "xs": [
      "180 − 40 = 140: the statue is 140 m taller.",
      "The statue is close to 4 times the building (4 × 40 = 160).",
      "450 − 40 = 410: the waterfall is 410 m taller."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_tower",
      "p": {
       "floors": 10,
       "show": "bld",
       "cmp": "statue"
      }
     },
     "xa": [
      {
       "show": "bld,diff"
      },
      {
       "show": "bld,diff,times"
      },
      {
       "set": {
        "cmp": "falls"
       }
      }
     ]
    },
    {
     "t": "x",
     "who": "guide",
     "say": "Let’s add floors until Somu’s building is as high as the waterfall!",
     "q": "Move the slider so the building (4 m per floor) is about as high as Kunchikal waterfall (450 m).",
     "goal": {
      "floors": 113
     },
     "goalTol": {
      "floors": 1
     },
     "h": "450 ÷ 4 = 112.5 floors.",
     "ref": "In-text question, p. 3",
     "xs": [
      "450 ÷ 4 = 112.5.",
      "112 floors give 448 m; 113 floors give 452 m.",
      "So about 113 floors are needed!"
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_tower",
      "p": {
       "floors": 10,
       "cmp": "falls",
       "show": "bld,diff",
       "slider": "floors"
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
     "who": "k7m1_roxie",
     "say": "Is one lakh big or small? I think it is big: living 1 lakh days means living 274 years, and 1 lakh people standing shoulder to shoulder would stretch about 38 km!",
     "note": "Whether a lakh feels big or small depends on what we compare it with.",
     "xs": [
      "1,00,000 ÷ 365 ≈ 274 years.",
      "Each person takes about 38 cm of shoulder width: 1 lakh × 38 cm = 38 km.",
      "Estu: the Ahmedabad stadium seats more than 1 lakh, and a head has 80,000 to 1,20,000 hairs!",
      "Some fish lay almost a lakh eggs at once."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_3dblocks",
      "p": {
       "e": 5,
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "hl": "new"
      },
      null,
      null
     ]
    },
    {
     "t": "o",
     "kind": "Discuss",
     "who": "k7m1_estu",
     "say": "So, who is right, Roxie or me?",
     "q": "How do you view a lakh — is a lakh big or small? Give reasons from both sides. (Can the whole population of Chintamani fit in the stadium?)",
     "ref": "In-text question, p. 4",
     "xs": [
      "Big: 1 lakh days ≈ 274 years; a lakh people in a line ≈ 38 km.",
      "Small: a lakh people fit in one stadium; a lakh hairs fit on one head.",
      "Chintamani’s 2011 population (about 75,000) is less than a lakh, so it could fit in a stadium of over 1 lakh seats.",
      "A lakh is big or small depending on what we compare it with."
     ],
     "v": {
      "k": "table",
      "head": [
       "A lakh feels big",
       "A lakh feels small"
      ],
      "rows": [
       [
        "1 lakh days ≈ 274 years",
        "Stadium seats more than 1 lakh"
       ],
       [
        "1 lakh people ≈ 38 km line",
        "80,000–1,20,000 hairs on a head"
       ],
       [
        "A lakh rice varieties",
        "A fish lays a lakh eggs at once"
       ]
      ]
     }
    },
    {
     "t": "s",
     "who": "guide",
     "say": "In the Indian system we put a comma between the ten-thousands place and the lakh place: 1,00,000. Commas help us read big numbers.",
     "note": "Indian commas: first after 3 digits from the right, then after every 2 digits. 12,78,830 = twelve lakh seventy eight thousand eight hundred thirty.",
     "xs": [
      "Ones, tens, hundreds form the first group of 3.",
      "Thousands and ten thousands form a group of 2.",
      "Lakhs and ten lakhs form the next group of 2.",
      "12,78,830: twelve lakh seventy eight thousand eight hundred thirty."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 1278830,
       "sys": "in",
       "show": "none"
      }
     },
     "xa": [
      null,
      null,
      {
       "hl": "in"
      },
      {
       "show": "ind"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "Now 15,75,000 is fifteen lakh seventy five thousand. My turn to read!",
     "q": "Write 3,00,600 and 5,04,085 in words.",
     "o": [
      "Thirty thousand six hundred; five lakh forty thousand eighty five",
      "Three lakh sixty; fifty lakh four thousand eighty five",
      "Three lakh six thousand; five lakh four hundred eighty five",
      "Three lakh six hundred; five lakh four thousand eighty five"
     ],
     "a": 3,
     "h": "Read group by group: lakhs, thousands, then the last three digits.",
     "ref": "In-text question (a), (b), p. 4",
     "xs": [
      "3,00,600: 3 lakh, 00 thousand, 600.",
      "So three lakh six hundred.",
      "5,04,085: 5 lakh, 04 thousand, 085.",
      "So five lakh four thousand eighty five."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 300600,
       "sys": "in",
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "show": "ind"
      },
      {
       "set": {
        "n": 504085
       }
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "These two have more lakhs.",
     "q": "Write 27,30,000 and 70,53,138 in words.",
     "o": [
      "Twenty seven lakh thirty thousand; seventy lakh fifty three thousand one hundred thirty eight",
      "Two lakh seventy three thousand; seven lakh five thousand three hundred thirty eight",
      "Twenty seven thousand three hundred; seventy lakh fifty three thousand thirty eight",
      "Twenty seven lakh three thousand; seventy lakh five hundred thirty eight"
     ],
     "a": 0,
     "h": "The first group of two digits from the left (here 27 and 70) is the lakhs.",
     "ref": "In-text question (c), (d), p. 4",
     "xs": [
      "27,30,000: 27 lakh, 30 thousand.",
      "Twenty seven lakh thirty thousand.",
      "70,53,138: 70 lakh, 53 thousand, 138.",
      "Seventy lakh fifty three thousand one hundred thirty eight."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 2730000,
       "sys": "in",
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "show": "ind"
      },
      {
       "set": {
        "n": 7053138
       }
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m1_lakshmamma",
     "say": "The seed bank’s new labels are written in words. Turn them back into numbers.",
     "q": "Write (a) one lakh twenty three thousand four hundred and fifty six and (b) four lakh seven thousand seven hundred and four in the Indian place value system.",
     "o": [
      "1,23,456 and 4,70,704",
      "12,3456 and 4,07,704",
      "1,23,456 and 4,07,704",
      "1,02,3456 and 4,7,704"
     ],
     "a": 2,
     "h": "Each group needs the right number of digits: thousands get 2 digits (07, not 7).",
     "ref": "In-text question (a), (b), p. 5",
     "xs": [
      "1 lakh, 23 thousand, 456 → 1,23,456.",
      "4 lakh, 7 thousand → 07 in the thousands group.",
      "707 → 4,07,704."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 123456,
       "sys": "in",
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      {
       "show": "ind"
      },
      {
       "set": {
        "n": 407704
       }
      },
      {
       "hl": "in"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_lakshmamma",
     "say": "Two trickier labels, with lots of zeros!",
     "q": "Write (c) fifty lakhs five thousand and fifty and (d) ten lakhs two hundred and thirty five.",
     "o": [
      "50,5,050 and 10,235",
      "50,05,050 and 10,00,235",
      "5,05,050 and 1,00,235",
      "50,00,5050 and 10,02,35"
     ],
     "a": 1,
     "h": "Fill empty places with zeros so each group has 2 (or 3) digits.",
     "ref": "In-text question (c), (d), p. 5",
     "xs": [
      "50 lakh, 05 thousand, 050 → 50,05,050.",
      "10 lakh, 00 thousand, 235 → 10,00,235."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 5005050,
       "sys": "in",
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      {
       "show": "ind"
      },
      {
       "set": {
        "n": 1000235
       }
      }
     ]
    }
   ]
  },
  {
   "title": "The Land of Tens",
   "sec": "1.2 Land of Tens",
   "icon": "<svg viewBox='0 0 48 48'><rect x='10' y='4' width='28' height='40' rx='5' fill='#2b3f57'/><rect x='14' y='8' width='20' height='9' rx='2' fill='#c9e7b8'/><rect x='14' y='21' width='20' height='6' rx='3' fill='#f4a51c'/><rect x='14' y='30' width='20' height='6' rx='3' fill='#41597a'/></svg>",
   "brief": "In the Land of Tens, calculators have only one button each: +1000, +10 or +100. How many presses make each number?",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "Welcome to the Land of Tens! The Thoughtful Thousands calculator has only a +1000 button. Three presses show three thousand.",
     "note": "Number of presses = number ÷ button value. 1 lakh = 100 thousands = 1000 hundreds = 10,000 tens.",
     "xs": [
      "Each press adds 1000.",
      "3 presses: 3 × 1000 = 3000.",
      "10 presses: 10,000. 90 presses: 90,000."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "3",
       "name": "Thoughtful Thousands",
       "c3": 0,
       "show": "all"
      }
     },
     "xa": [
      {
       "hl": "btn"
      },
      {
       "set": {
        "c3": 3
       }
      },
      {
       "set": {
        "c3": 90
       }
      }
     ]
    },
    {
     "t": "x",
     "who": "k7m1_estu",
     "say": "Let me make fifty three thousand on Thoughtful Thousands.",
     "q": "Press +1000 the right number of times (use the slider) to show fifty three thousand.",
     "goal": {
      "c3": 53
     },
     "h": "53,000 ÷ 1000 = ?",
     "ref": "Land of Tens Q1 (b)–(d), p. 5",
     "xs": [
      "53,000 ÷ 1000 = 53 presses.",
      "Similarly 10,000 needs 10 presses and 90,000 needs 90."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "3",
       "name": "Thoughtful Thousands",
       "c3": 0,
       "target": 53000,
       "show": "total,expr",
       "slider": "c3"
      }
     }
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "Thousand by thousand, up to a lakh!",
     "q": "How many times must +1000 be pressed to show one lakh? And how many thousands make one lakh?",
     "o": [
      "10 times; 10 thousands",
      "1000 times; 1000 thousands",
      "100 times; 100 thousands",
      "100 times; 1000 thousands"
     ],
     "a": 2,
     "h": "1,00,000 ÷ 1000.",
     "ref": "Land of Tens Q1 (e), (g), p. 5",
     "xs": [
      "1,00,000 ÷ 1000 = 100.",
      "100 presses of +1000 give 1,00,000.",
      "So 100 thousands make one lakh."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "3",
       "name": "Thoughtful Thousands",
       "c3": 0,
       "mx": 200,
       "show": "total,expr"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "c3": 100
       }
      },
      {
       "hl": "display"
      }
     ]
    },
    {
     "t": "n",
     "who": "k7m1_estu",
     "say": "Thoughtful Thousands was pressed 153 times.",
     "q": "What number does it show after 153 presses of +1000?",
     "ans": 153000,
     "tol": 0.5,
     "h": "153 × 1000.",
     "ref": "Land of Tens Q1 (f), p. 5",
     "xs": [
      "153 × 1000 = 1,53,000.",
      "One lakh fifty three thousand."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "3",
       "name": "Thoughtful Thousands",
       "c3": 0,
       "mx": 200,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "c3": 153
       }
      },
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "x",
     "who": "k7m1_roxie",
     "say": "Tedious Tens only has a +10 button: 500 needs 50 presses and 780 needs 78. Phew!",
     "q": "Use the slider to make Tedious Tens show 3700.",
     "goal": {
      "c1": 370
     },
     "h": "3700 ÷ 10 = ?",
     "ref": "Land of Tens Q2 (a)–(d), p. 5",
     "xs": [
      "500 ÷ 10 = 50 and 780 ÷ 10 = 78.",
      "3700 ÷ 10 = 370 presses.",
      "1000 needs 100 presses."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "1",
       "name": "Tedious Tens",
       "c1": 0,
       "target": 3700,
       "show": "total,expr",
       "slider": "c1"
      }
     }
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "Tedious Tens is really tedious for big numbers!",
     "q": "How many presses of +10 show 10,000? And one lakh?",
     "o": [
      "100 and 1000",
      "10,000 and 1,00,000",
      "1000 and 1,00,000",
      "1000 and 10,000"
     ],
     "a": 3,
     "h": "Divide by 10: remove one zero.",
     "ref": "Land of Tens Q2 (e), (f), p. 5",
     "xs": [
      "10,000 ÷ 10 = 1000 presses.",
      "1,00,000 ÷ 10 = 10,000 presses."
     ],
     "v": {
      "k": "table",
      "head": [
       "Number",
       "Presses of +10"
      ],
      "rows": [
       [
        "500",
        "50"
       ],
       [
        "780",
        "78"
       ],
       [
        "10,000",
        "?"
       ],
       [
        "1,00,000",
        "?"
       ]
      ],
      "cap": "Tedious Tens"
     }
    },
    {
     "t": "n",
     "who": "k7m1_roxie",
     "say": "Someone pressed +10 exactly 435 times.",
     "q": "What number does Tedious Tens show after 435 presses?",
     "ans": 4350,
     "tol": 0.5,
     "h": "435 × 10.",
     "ref": "Land of Tens Q2 (g), p. 5",
     "xs": [
      "435 × 10 = 4350."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "1",
       "name": "Tedious Tens",
       "c1": 0,
       "mx": 500,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "c1": 435
       },
       "show": "all"
      }
     ]
    },
    {
     "t": "x",
     "who": "guide",
     "say": "Handy Hundreds has a +100 button: four hundred is 4 presses, 3,700 is 37 presses, 10,000 is 100 presses.",
     "q": "Make Handy Hundreds show 97,600.",
     "goal": {
      "c2": 976
     },
     "h": "97,600 ÷ 100 = ?",
     "ref": "Land of Tens Q3 (a)–(c), (f), p. 5–6",
     "xs": [
      "Dividing by 100 removes two zeros.",
      "97,600 ÷ 100 = 976 presses."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "2",
       "name": "Handy Hundreds",
       "c2": 0,
       "target": 97600,
       "show": "total,expr",
       "slider": "c2"
      }
     }
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "More Handy Hundreds puzzles!",
     "q": "Presses of +100 for fifty three thousand, 90,000 and 1,00,000 — and which number needs 582 presses?",
     "o": [
      "53, 90, 100; 5820",
      "530, 900, 1000; 58,200",
      "5300, 9000, 10,000; 5,82,000",
      "530, 900, 10,000; 58,200"
     ],
     "a": 1,
     "h": "Number ÷ 100 = presses; presses × 100 = number.",
     "ref": "Land of Tens Q3 (d), (e), (g), (h), p. 6",
     "xs": [
      "53,000 ÷ 100 = 530; 90,000 ÷ 100 = 900.",
      "1,00,000 ÷ 100 = 1000.",
      "582 × 100 = 58,200."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "2",
       "name": "Handy Hundreds",
       "c2": 0,
       "mx": 1200,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "c2": 530
       },
       "show": "total,expr"
      },
      {
       "set": {
        "c2": 1000
       }
      },
      {
       "set": {
        "c2": 582
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "Counting hundreds inside bigger numbers…",
     "q": "How many hundreds make ten thousand? How many hundreds make one lakh?",
     "o": [
      "10 and 100",
      "100 and 10,000",
      "1000 and 10,000",
      "100 and 1000"
     ],
     "a": 3,
     "h": "10,000 ÷ 100 and 1,00,000 ÷ 100.",
     "ref": "Land of Tens Q3 (i), (j), p. 6",
     "xs": [
      "10,000 ÷ 100 = 100 hundreds.",
      "1,00,000 ÷ 100 = 1000 hundreds."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_3dblocks",
      "p": {
       "e": 4,
       "show": "val"
      }
     },
     "xa": [
      {
       "show": "all"
      },
      {
       "set": {
        "e": 5
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "guide",
     "say": "Handy Hundreds boasts: “There are some numbers which Tedious Tens and Thoughtful Thousands can’t show but I can.”",
     "q": "Is Handy Hundreds’ statement true?",
     "o": [
      "Yes: Tedious Tens cannot show 300",
      "Yes: nobody else can show 1,00,000",
      "No: every multiple of 100 is also a multiple of 10, so Tedious Tens can show all of them",
      "No: Thoughtful Thousands can show every multiple of 100"
     ],
     "a": 2,
     "h": "Handy Hundreds shows only multiples of 100. Can Tedious Tens make those?",
     "ref": "Land of Tens Q3 (k), p. 6",
     "xs": [
      "Handy Hundreds can only show multiples of 100.",
      "Each multiple of 100 is a multiple of 10: 300 = 30 × 10.",
      "So Tedious Tens can show all of them. The statement is false.",
      "(Thoughtful Thousands cannot show 300 — but Tedious Tens can.)"
     ],
     "v": {
      "k": "table",
      "head": [
       "Number",
       "+10 presses",
       "+100 presses",
       "+1000 presses"
      ],
      "rows": [
       [
        "300",
        "?",
        "3",
        "?"
       ],
       [
        "3,700",
        "?",
        "37",
        "?"
       ],
       [
        "53,000",
        "?",
        "530",
        "53"
       ]
      ]
     }
    }
   ]
  },
  {
   "title": "Chitti and Sippy",
   "sec": "1.2 Land of Tens — Creative Chitti, Systematic Sippy",
   "icon": "<svg viewBox='0 0 48 48'><rect x='6' y='6' width='36' height='36' rx='6' fill='#2b3f57'/><g fill='#f4a51c'><rect x='10' y='12' width='12' height='6' rx='3'/><rect x='26' y='12' width='12' height='6' rx='3'/><rect x='10' y='22' width='12' height='6' rx='3'/></g><g fill='#62b6e8'><rect x='26' y='22' width='12' height='6' rx='3'/><rect x='10' y='32' width='12' height='6' rx='3'/><rect x='26' y='32' width='12' height='6' rx='3'/></g></svg>",
   "brief": "Creative Chitti finds many ways to make a number; Systematic Sippy wants the fewest clicks. What do the fewest clicks tell us?",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "Creative Chitti has buttons +1, +10, +100, +1000, +10000, +100000 and +1000000. It always finds many ways! To make 321 it can press +10 thirty two times and +1 once.",
     "note": "A number can be made from buttons in many ways, e.g. 321 = (32 × 10) + (1 × 1) = (2 × 100) + (12 × 10) + (1 × 1).",
     "xs": [
      "32 × 10 = 320, plus 1 = 321. Yes, it works!",
      "Another way: 2 hundreds, 12 tens and 1 one.",
      "(2 × 100) + (12 × 10) + (1 × 1) = 321."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "2,1,0",
       "name": "Creative Chitti",
       "c1": 32,
       "c0": 1,
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "c2": 2,
        "c1": 12,
        "c0": 1
       }
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "The book shows 5072 = (50 × 100) + (7 × 10) + (2 × 1) and also (3 × 1000) + (20 × 100) + (72 × 1).",
     "q": "Which of these is ANOTHER correct way to get 5072?",
     "o": [
      "(5 × 1000) + (72 × 10)",
      "(50 × 100) + (72 × 10)",
      "(4 × 1000) + (17 × 100) + (2 × 1)",
      "(4 × 1000) + (10 × 100) + (7 × 10) + (2 × 1)"
     ],
     "a": 3,
     "h": "Work out each expression.",
     "ref": "In-text question, p. 6 (5072)",
     "xs": [
      "4000 + 1000 + 70 + 2 = 5072 ✓.",
      "(5 × 1000) + (72 × 10) = 5720, not 5072.",
      "4000 + 1700 + 2 = 5702; 5000 + 720 = 5720."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "3,2,1,0",
       "name": "Creative Chitti",
       "c3": 0,
       "c2": 0,
       "c1": 0,
       "c0": 0,
       "target": 5072,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "c3": 4,
        "c2": 10,
        "c1": 7,
        "c0": 2
       },
       "show": "all"
      },
      null,
      null
     ]
    },
    {
     "t": "o",
     "kind": "Think",
     "who": "k7m1_estu",
     "say": "Think like Chitti and be creative!",
     "q": "Write expressions for at least two different ways to get each number with button clicks: (a) 8300 (b) 40629 (c) 56354 (d) 66666 (e) 367813.",
     "ref": "Figure it Out, p. 6–7",
     "xs": [
      "(a) (8 × 1000) + (3 × 100) or (5 × 1000) + (33 × 100).",
      "(b) (40 × 1000) + (6 × 100) + (2 × 10) + (9 × 1) or (30 × 1000) + (106 × 100) + (29 × 1).",
      "(c) (56 × 1000) + (3 × 100) + (5 × 10) + (4 × 1) or (46 × 1000) + (103 × 100) + (54 × 1).",
      "(d) (66 × 1000) + (6 × 100) + (66 × 1) or (6 × 10000) + (6 × 1000) + (6 × 100) + (6 × 10) + (6 × 1).",
      "(e) (36 × 10000) + (78 × 1000) + (13 × 1) or (3 × 100000) + (6 × 10000) + (7 × 1000) + (8 × 100) + (1 × 10) + (3 × 1)."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "3,2,1,0",
       "name": "Creative Chitti",
       "c3": 5,
       "c2": 33,
       "show": "total,expr"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "c3": 30,
        "c2": 106,
        "c1": 0,
        "c0": 29
       }
      },
      {
       "set": {
        "c3": 46,
        "c2": 103,
        "c0": 54
       }
      },
      {
       "set": {
        "c3": 66,
        "c2": 6,
        "c0": 66
       }
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "Chitti asks: you must make exactly 30 button presses.",
     "q": "With exactly 30 presses, what is the largest 3-digit number and the smallest 3-digit number you can make?",
     "o": [
      "999 and 100",
      "993 and 102",
      "993 and 111",
      "990 and 120"
     ],
     "a": 1,
     "h": "Breaking one button into ten smaller presses adds 9 presses. So presses = digit sum + 9, 18, 27 …",
     "ref": "Creative Chitti’s questions (a), p. 7",
     "xs": [
      "Fewest presses = digit sum; each ‘break’ adds 9 more.",
      "So the digit sum must be 30, 21, 12 or 3.",
      "Largest 3-digit with digit sum 21: 993 = (9 × 100) + (8 × 10) + (13 × 1): 9 + 8 + 13 = 30.",
      "Smallest 3-digit with digit sum 3: 102 = (8 × 10) + (22 × 1): 8 + 22 = 30."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "2,1,0",
       "name": "Creative Chitti",
       "c2": 0,
       "c1": 0,
       "c0": 0,
       "show": "none"
      }
     },
     "xa": [
      {},
      null,
      {
       "set": {
        "c2": 9,
        "c1": 8,
        "c0": 13
       },
       "show": "all"
      },
      {
       "set": {
        "c2": 0,
        "c1": 8,
        "c0": 22
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "997 can be made using 25 clicks: 9 + 9 + 7. Can I use a different number of clicks?",
     "q": "Which is a correct way to make 997 with a different number of clicks?",
     "o": [
      "(9 × 100) + (9 × 10) + (7 × 1): 25 clicks",
      "(99 × 10) + (17 × 1): 116 clicks",
      "(8 × 100) + (9 × 10) + (17 × 1): 34 clicks",
      "(8 × 100) + (19 × 10) + (7 × 1): 34 clicks"
     ],
     "a": 3,
     "h": "Check that the expression really equals 997.",
     "ref": "Creative Chitti’s questions (b), p. 7",
     "xs": [
      "800 + 190 + 7 = 997 ✓, using 8 + 19 + 7 = 34 clicks.",
      "(8 × 100) + (9 × 10) + (17 × 1) = 907, wrong.",
      "(99 × 10) + (17 × 1) = 1007, wrong.",
      "Now create questions like these to challenge your classmates!"
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "2,1,0",
       "name": "Creative Chitti",
       "c2": 9,
       "c1": 9,
       "c0": 7,
       "show": "total,expr"
      }
     },
     "xa": [
      {
       "set": {
        "c2": 8,
        "c1": 19,
        "c0": 7
       },
       "show": "all"
      },
      null,
      null,
      null
     ]
    },
    {
     "t": "x",
     "who": "guide",
     "say": "Systematic Sippy wants as few clicks as possible. The book makes 5072 with 5 thousands, 6 tens and 12 ones: 23 clicks.",
     "q": "Change the presses so Sippy still shows 5072, but with the fewest clicks.",
     "goal": {
      "c3": 5,
      "c2": 0,
      "c1": 7,
      "c0": 2
     },
     "h": "Can 10 of the ones become 1 more ten?",
     "ref": "Systematic Sippy, p. 7 (5072)",
     "xs": [
      "12 ones = 1 ten + 2 ones.",
      "So use 7 tens and 2 ones.",
      "5072 = (5 × 1000) + (7 × 10) + (2 × 1): 5 + 7 + 2 = 14 clicks."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "3,2,1,0",
       "name": "Systematic Sippy",
       "c3": 5,
       "c2": 0,
       "c1": 6,
       "c0": 12,
       "target": 5072,
       "mx": 20,
       "show": "total,clicks",
       "slider": "c3,c2,c1,c0"
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
     "who": "k7m1_roxie",
     "say": "Now Sippy’s second number.",
     "q": "What is the smallest number of clicks to get 8300?",
     "ans": 11,
     "tol": 0.5,
     "h": "8300 = (8 × 1000) + (3 × 100).",
     "ref": "Systematic Sippy, p. 7 (8300)",
     "xs": [
      "8300 = (8 × 1000) + (3 × 100).",
      "8 + 3 = 11 clicks."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "3,2,1,0",
       "name": "Systematic Sippy",
       "c3": 0,
       "c2": 0,
       "target": 8300,
       "show": "none"
      }
     },
     "xa": [
      {
       "set": {
        "c3": 8,
        "c2": 3
       },
       "show": "total,expr"
      },
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "Let me find the fewest clicks for the other numbers.",
     "q": "Fewest clicks for 40629, 56354, 66666 and 367813 are:",
     "o": [
      "21, 23, 30, 28",
      "15, 23, 30, 28",
      "21, 32, 30, 27",
      "49, 63, 66, 40"
     ],
     "a": 0,
     "h": "Use each digit as the number of presses of its place button.",
     "ref": "Figure it Out Q1, p. 7",
     "xs": [
      "40629: 4 + 0 + 6 + 2 + 9 = 21.",
      "56354: 5 + 6 + 3 + 5 + 4 = 23.",
      "66666: 6 × 5 = 30.",
      "367813: 3 + 6 + 7 + 8 + 1 + 3 = 28."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "5,4,3,2,1,0",
       "name": "Systematic Sippy",
       "c4": 4,
       "c2": 6,
       "c1": 2,
       "c0": 9,
       "show": "total"
      }
     },
     "xa": [
      {
       "show": "all"
      },
      {
       "set": {
        "c4": 5,
        "c3": 6,
        "c2": 3,
        "c1": 5,
        "c0": 4
       }
      },
      {
       "set": {
        "c4": 6,
        "c3": 6,
        "c2": 6,
        "c1": 6,
        "c0": 6
       }
      },
      {
       "set": {
        "c5": 3,
        "c4": 6,
        "c3": 7,
        "c2": 8,
        "c1": 1,
        "c0": 3
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "I see a pattern…",
     "q": "What is the connection between a number and its smallest number of button clicks?",
     "o": [
      "It equals the number of digits",
      "It equals the number ÷ 10",
      "It equals the largest digit",
      "It equals the sum of its digits"
     ],
     "a": 3,
     "h": "Look at 40629 → 21.",
     "ref": "Figure it Out Q2, p. 7",
     "xs": [
      "40629 → 4 + 0 + 6 + 2 + 9 = 21.",
      "Each digit tells how many times to press that place’s button.",
      "So the smallest number of clicks = sum of the digits."
     ],
     "v": {
      "k": "table",
      "head": [
       "Number",
       "Fewest clicks",
       "Digit sum"
      ],
      "rows": [
       [
        "5072",
        "14",
        "?"
       ],
       [
        "8300",
        "11",
        "?"
       ],
       [
        "40629",
        "21",
        "?"
       ],
       [
        "367813",
        "28",
        "?"
       ]
      ]
     }
    },
    {
     "t": "o",
     "kind": "Explain",
     "who": "guide",
     "say": "Math Talk! The least-click expressions look exactly like place value.",
     "q": "Why do the expressions for the least button clicks also give the Indian place value notation of the numbers?",
     "ref": "Figure it Out Q3 (Math Talk), p. 7",
     "xs": [
      "If you press any button 10 or more times, 10 of those presses can be replaced by 1 press of the next button: fewer clicks.",
      "So in the least-click way, each button is pressed at most 9 times.",
      "Then the presses are exactly the digits 0–9 of each place.",
      "That is the place value notation: 5072 = 5 thousands, 0 hundreds, 7 tens, 2 ones."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "3,2,1,0",
       "name": "Systematic Sippy",
       "c3": 5,
       "c1": 6,
       "c0": 12,
       "show": "all"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "c1": 7,
        "c0": 2
       }
      },
      null,
      {
       "hl": "btn"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "What if we press the +10,00,000 button ten times?",
     "q": "Pressing +10,00,000 ten times shows which number, and what is it called?",
     "o": [
      "1,00,00,000 — one crore (1 followed by 7 zeros)",
      "10,00,000 — ten lakh (6 zeros)",
      "1,00,00,00,000 — one arab (9 zeros)",
      "100,000 — one lakh (5 zeros)"
     ],
     "a": 0,
     "h": "10 × 10 lakh = 100 lakh.",
     "ref": "In-text question, p. 8",
     "xs": [
      "10 × 10,00,000 = 1,00,00,000.",
      "100 lakhs is called one crore.",
      "1 crore is 1 followed by seven zeros."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "6",
       "name": "Creative Chitti",
       "c6": 1,
       "mx": 10,
       "show": "total,expr"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "c6": 10
       }
      },
      {
       "hl": "display"
      }
     ]
    }
   ]
  },
  {
   "title": "Of Crores and Millions",
   "sec": "1.3 Of Crores and Crores!",
   "icon": "<svg viewBox='0 0 48 48'><rect x='4' y='14' width='40' height='20' rx='4' fill='#efdcae'/><text x='24' y='29' font-size='10' font-weight='800' text-anchor='middle' fill='#2a2418' font-family='sans-serif'>1,00,00,000</text><path d='M8 40h32' stroke='#e04a86' stroke-width='3'/></svg>",
   "brief": "The seed bank writes to farmers in India and abroad. The same number gets its commas in two different ways!",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "Here are two systems side by side. The Indian system uses thousands, lakhs, crores and arabs. The American (International) system uses thousands, millions and billions.",
     "note": "Indian commas: 3-2-2-2… (thousand, lakh, crore, arab). American commas: 3-3-3… (thousand, million, billion). 10 lakh = 1 million; 1 crore = 10 million; 100 crore = 1 arab = 1 billion.",
     "xs": [
      "1,00,000 one lakh = 100,000 hundred thousand.",
      "10,00,000 ten lakh = 1,000,000 one million.",
      "1,00,00,000 one crore = 10,000,000 ten million.",
      "1,00,00,00,000 one arab (hundred crore) = 1,000,000,000 one billion."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 100000,
       "show": "ind,us"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "n": 1000000
       }
      },
      {
       "set": {
        "n": 10000000
       }
      },
      {
       "set": {
        "n": 1000000000
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "The words lakh and crore come from Sanskrit lakṣha and koṭi. The Indian system is also used in Nepal, Sri Lanka, Bangladesh and other neighbours.",
     "q": "How are the commas placed from right to left?",
     "o": [
      "Indian 3-3-3…, American 3-2-2…",
      "Both 3-3-3…",
      "Indian 3-2-2-2…, American 3-3-3…",
      "Indian 2-2-2…, American 3-3-3…"
     ],
     "a": 2,
     "h": "Look at 1,00,00,000 and 10,000,000.",
     "ref": "Text, p. 8",
     "xs": [
      "Indian: 1,00,00,000 → groups of 3, then 2, 2.",
      "American: 10,000,000 → groups of 3, 3, 3.",
      "A lakh is 100 thousand, a crore is 100 lakh, an arab is 100 crore."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 10000000,
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      {
       "hl": "in"
      },
      {
       "hl": "us"
      },
      {
       "show": "ind,us"
      }
     ]
    },
    {
     "t": "x",
     "who": "k7m1_estu",
     "say": "1 lakh is 1 followed by 5 zeros and 1 crore is 1 followed by 7 zeros. What about a thousand lakh?",
     "q": "Use the slider to show a thousand lakh (1000 × 1,00,000).",
     "goal": {
      "z": 8
     },
     "h": "1000 has 3 zeros and 1 lakh has 5 zeros.",
     "ref": "In-text question, p. 8",
     "xs": [
      "1000 × 1,00,000: 3 zeros + 5 zeros = 8 zeros.",
      "1,00,00,00,000? No — that has 9. A thousand lakh = 10,00,00,000.",
      "That is ten crore (100 million)."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "z": 5,
       "show": "zeros,ind",
       "slider": "z"
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
     "who": "k7m1_roxie",
     "say": "Now the American way of saying a lakh.",
     "q": "How many zeros does a hundred thousand have?",
     "ans": 5,
     "tol": 0,
     "h": "100 × 1000.",
     "ref": "In-text question, p. 9",
     "xs": [
      "100 has 2 zeros, 1000 has 3.",
      "100 × 1000 = 100,000: 5 zeros.",
      "A hundred thousand is one lakh."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "z": 5,
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      null,
      {
       "show": "zeros,us"
      },
      {
       "show": "all"
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "A long number like 9876501234 is easy to read once we place the commas.",
     "note": "9,87,65,01,234 = 9 arab 87 crore 65 lakh 1 thousand 234 (or 987 crore …); 9,876,501,234 = 9 billion 876 million 501 thousand 234.",
     "xs": [
      "Indian: 9,87,65,01,234.",
      "9 arab 87 crore 65 lakh 1 thousand 234, or 987 crore 65 lakh 1 thousand 234.",
      "American: 9,876,501,234.",
      "9 billion 876 million 501 thousand 234."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 9876501234,
       "show": "none"
      }
     },
     "xa": [
      {
       "hl": "in"
      },
      {
       "show": "ind"
      },
      {
       "hl": "us"
      },
      {
       "show": "ind,us"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_lakshmamma",
     "say": "Our seed bank received 4050678 grains in one season!",
     "q": "Read 4050678 in the Indian system.",
     "o": [
      "Four crore five lakh six hundred seventy eight",
      "Forty lakh fifty thousand six hundred seventy eight",
      "Four lakh five thousand six hundred seventy eight",
      "Forty crore fifty lakh six thousand seventy eight"
     ],
     "a": 1,
     "h": "Commas first: 40,50,678.",
     "ref": "Figure it Out Q1 (a), p. 9",
     "xs": [
      "Indian commas: 40,50,678.",
      "Forty lakh fifty thousand six hundred seventy eight.",
      "American: 4,050,678 = four million fifty thousand six hundred seventy eight."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 4050678,
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      null,
      {
       "show": "ind"
      },
      {
       "show": "ind,us"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "Now the American name.",
     "q": "What is 48121620 in the American system?",
     "o": [
      "Four crore eighty one lakh twenty one thousand six hundred twenty",
      "Four billion eight hundred twelve million",
      "Forty eight million one hundred twenty one thousand six hundred twenty",
      "Four hundred eighty one million twenty one thousand six hundred twenty"
     ],
     "a": 2,
     "h": "American commas: 48,121,620.",
     "ref": "Figure it Out Q1 (b), p. 9",
     "xs": [
      "American commas: 48,121,620.",
      "Forty eight million one hundred twenty one thousand six hundred twenty.",
      "Indian: 4,81,21,620 = four crore eighty one lakh twenty one thousand six hundred twenty."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 48121620,
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      null,
      {
       "show": "us"
      },
      {
       "show": "ind,us"
      }
     ]
    },
    {
     "t": "o",
     "kind": "Explain",
     "who": "k7m1_roxie",
     "say": "Let’s finish the list in both systems.",
     "q": "Write the number names of (c) 20022002 (d) 246813579 (e) 345000543 (f) 1020304050 in both the Indian and American systems.",
     "ref": "Figure it Out Q1 (c)–(f), p. 9",
     "xs": [
      "(c) 2,00,22,002: two crore twenty two thousand two | 20,022,002: twenty million twenty two thousand two.",
      "(d) 24,68,13,579: twenty four crore sixty eight lakh thirteen thousand five hundred seventy nine | 246,813,579: two hundred forty six million eight hundred thirteen thousand five hundred seventy nine.",
      "(e) 34,50,00,543: thirty four crore fifty lakh five hundred forty three | 345,000,543: three hundred forty five million five hundred forty three.",
      "(f) 1,02,03,04,050: one arab two crore three lakh four thousand fifty | 1,020,304,050: one billion twenty million three hundred four thousand fifty."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 20022002,
       "show": "ind,us"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "n": 246813579
       }
      },
      {
       "set": {
        "n": 345000543
       }
      },
      {
       "set": {
        "n": 1020304050
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_lakshmamma",
     "say": "Back to Indian notation.",
     "q": "Write (a) one crore one lakh one thousand ten and (c) ten crore twenty lakh thirty thousand forty.",
     "o": [
      "1,01,01,010 and 10,20,30,040",
      "1,01,01,10 and 10,20,30,40",
      "1,10,10,010 and 1,02,03,040",
      "10,10,10,010 and 10,02,03,040"
     ],
     "a": 0,
     "h": "Each of lakh, thousand, crore gets 2 digits; the last group gets 3.",
     "ref": "Figure it Out Q2 (a), (c), p. 9",
     "xs": [
      "1 crore, 01 lakh, 01 thousand, 010 → 1,01,01,010.",
      "10 crore, 20 lakh, 30 thousand, 040 → 10,20,30,040."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 10101010,
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      {
       "show": "ind"
      },
      {
       "set": {
        "n": 102030040
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "These are said the American way, but we must write them the Indian way.",
     "q": "Write (b) one billion one million one thousand one and (d) nine billion eighty million seven hundred thousand six hundred in Indian notation.",
     "o": [
      "1,01,01,001 and 9,80,70,600",
      "10,01,00,1001 and 90,80,70,0600",
      "1,001,001,001 and 9,080,700,600",
      "1,00,10,01,001 and 9,08,07,00,600"
     ],
     "a": 3,
     "h": "First write with American commas (1,001,001,001), then regroup 3-2-2.",
     "ref": "Figure it Out Q2 (b), (d), p. 9",
     "xs": [
      "1,001,001,001 → 1,00,10,01,001.",
      "9,080,700,600 → 9,08,07,00,600."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 1001001001,
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      {
       "show": "ind,us"
      },
      {
       "set": {
        "n": 9080700600
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "Compare and write <, > or =.",
     "q": "(a) 30 thousand __ 3 lakhs (b) 500 lakhs __ 5 million (c) 800 thousand __ 8 million (d) 640 crore __ 60 billion",
     "o": [
      "<, <, <, <",
      ">, >, <, >",
      "<, =, <, <",
      "<, >, <, <"
     ],
     "a": 3,
     "h": "Change everything into plain numbers first.",
     "ref": "Figure it Out Q3, p. 9",
     "xs": [
      "30,000 < 3,00,000.",
      "500 lakh = 5 crore = 50 million > 5 million.",
      "800 thousand = 8 lakh < 8 million (80 lakh).",
      "640 crore = 6.4 billion < 60 billion (6000 crore)."
     ],
     "v": {
      "k": "table",
      "head": [
       "Left",
       "",
       "Right"
      ],
      "rows": [
       [
        "30,000",
        "?",
        "3,00,000"
       ],
       [
        "5,00,00,000",
        "?",
        "50,00,000"
       ],
       [
        "8,00,000",
        "?",
        "80,00,000"
       ],
       [
        "6,40,00,00,000",
        "?",
        "60,00,00,00,000"
       ]
      ],
      "cap": "Written as numbers (Indian commas)"
     }
    }
   ]
  },
  {
   "title": "Round It, Estimate It",
   "sec": "1.4 Exact and Approximate Values",
   "icon": "<svg viewBox='0 0 48 48'><path d='M6 30h36' stroke='#a3bccc' stroke-width='3'/><path d='M6 24v12M42 24v12M24 26v8' stroke='#a3bccc' stroke-width='2'/><path d='M32 28 Q37 14 42 24' stroke='#35c29a' stroke-width='3' fill='none'/><circle cx='32' cy='30' r='4' fill='#f4a51c'/></svg>",
   "brief": "“1 lakh people visited the book fair!” Exact or approximate? Learn rounding, nearest neighbours and quick estimates.",
   "steps": [
    {
     "t": "s",
     "who": "guide",
     "say": "“1 lakh people visited the book fair.” A joker says, “If I had not gone, they’d have written 99,999!” Often an approximate number is enough. Chintamani’s 2011 population was 76,068 — saying ‘about 75,000’ gives a good idea.",
     "note": "Rounding up: the approximate number is more than the actual number. Rounding down: it is less. Exact numbers are needed when every unit counts.",
     "xs": [
      "76,068 is close to 76,000 — the nearest thousand.",
      "‘About 75,000’ is also a handy estimate.",
      "A school of 732 people may order 750 sweets: rounding up.",
      "An item costing ₹470 may be called ‘around ₹450’: rounding down."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_line",
      "p": {
       "mode": "round",
       "n": 76068,
       "u": 3,
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "near"
      },
      null,
      null,
      null
     ]
    },
    {
     "t": "o",
     "kind": "Discuss",
     "who": "k7m1_roxie",
     "say": "And Bappi phoned the ‘rounded off’ number to check on the Toofan Express! Some numbers must never be rounded.",
     "q": "Think and share situations where it is appropriate to (a) round up, (b) round down, (c) either is okay, (d) exact numbers are needed.",
     "ref": "In-text question, p. 10",
     "xs": [
      "(a) Round up: buying food or sweets for a group, so nobody is left out.",
      "(b) Round down: estimating how much time is left before the school bus.",
      "(c) Either: distance between far-off places, crowd sizes.",
      "(d) Exact: phone numbers, money in a bank, medicine doses, exam marks."
     ],
     "v": {
      "k": "table",
      "head": [
       "Round up",
       "Round down",
       "Either",
       "Exact"
      ],
      "rows": [
       [
        "732 → 750 sweets",
        "₹470 → ‘about ₹450’",
        "distance to Bengaluru",
        "phone number"
       ],
       [
        "food for a picnic",
        "time left",
        "people at a fair",
        "bank money"
       ]
      ]
     }
    },
    {
     "t": "s",
     "who": "guide",
     "say": "With large numbers it is useful to know the nearest thousand, lakh or crore — the nearest neighbours.",
     "note": "Nearest neighbours of 6,72,85,183: thousand 6,72,85,000; ten thousand 6,72,90,000; lakh 6,73,00,000; ten lakh 6,70,00,000; crore 7,00,00,000.",
     "xs": [
      "Find the two multiples on either side and see which is closer.",
      "Nearest thousand: 6,72,85,000 (183 away).",
      "Nearest lakh: 6,73,00,000.",
      "Nearest crore: 7,00,00,000."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_line",
      "p": {
       "mode": "round",
       "n": 67285183,
       "u": 3,
       "show": "near,gap"
      }
     },
     "xa": [
      null,
      null,
      {
       "set": {
        "u": 5
       }
      },
      {
       "set": {
        "u": 7
       },
       "show": "near,gap,all"
      }
     ]
    },
    {
     "t": "x",
     "who": "k7m1_estu",
     "say": "One neighbour in the table is 6,70,00,000 — it is lower than our number!",
     "q": "Move the slider to the place value whose nearest neighbour of 6,72,85,183 is 6,70,00,000.",
     "goal": {
      "u": 6
     },
     "h": "Which multiples are 6,70,00,000 and 6,80,00,000?",
     "ref": "Nearest Neighbours table, p. 11",
     "xs": [
      "6,70,00,000 and 6,80,00,000 are multiples of ten lakh.",
      "6,72,85,183 is only 2,85,183 above 6,70,00,000.",
      "So the nearest ten lakh rounds down: 6,70,00,000."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_line",
      "p": {
       "mode": "round",
       "n": 67285183,
       "u": 3,
       "show": "near",
       "slider": "u"
      }
     },
     "xa": [
      null,
      null,
      {
       "show": "near,gap,all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "Five neighbours for a new number.",
     "q": "The nearest thousand, ten thousand, lakh, ten lakh and crore of 3,87,69,957 are:",
     "o": [
      "3,87,69,000; 3,87,60,000; 3,87,00,000; 3,80,00,000; 3,00,00,000",
      "3,87,70,000; 3,87,70,000; 3,88,00,000; 3,90,00,000; 4,00,00,000",
      "3,87,70,000; 3,87,80,000; 3,88,00,000; 3,90,00,000; 4,00,00,000",
      "3,87,70,000; 3,87,70,000; 3,87,00,000; 3,90,00,000; 3,00,00,000"
     ],
     "a": 1,
     "h": "Look at the digit just to the right of the place each time.",
     "ref": "In-text question (a), p. 11",
     "xs": [
      "Thousand: 69,957 → 70,000, giving 3,87,70,000.",
      "Ten thousand: also 3,87,70,000.",
      "Lakh: 87.7 lakh → 3,88,00,000. Ten lakh: 3,90,00,000.",
      "Crore: 3.88 crore → 4,00,00,000."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_line",
      "p": {
       "mode": "round",
       "n": 38769957,
       "u": 3,
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "near"
      },
      {
       "set": {
        "u": 4
       }
      },
      {
       "set": {
        "u": 5
       }
      },
      {
       "set": {
        "u": 7
       },
       "show": "near,all"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "And one in the ‘tens of crores’.",
     "q": "The five nearest neighbours (thousand → crore) of 29,05,32,481 are:",
     "o": [
      "29,05,32,000; 29,05,30,000; 29,05,00,000; 29,10,00,000; 29,00,00,000",
      "29,05,33,000; 29,05,30,000; 29,05,00,000; 29,00,00,000; 29,00,00,000",
      "29,05,32,000; 29,05,40,000; 29,06,00,000; 29,10,00,000; 30,00,00,000",
      "29,05,32,000; 29,05,30,000; 29,05,00,000; 29,00,00,000; 30,00,00,000"
     ],
     "a": 0,
     "h": "Half of ten lakh is 5 lakh: 5,32,481 is more than half.",
     "ref": "In-text question (b), p. 11",
     "xs": [
      "Thousand: 481 < 500 → 29,05,32,000.",
      "Ten thousand: 2,481 < 5000 → 29,05,30,000. Lakh: 29,05,00,000.",
      "Ten lakh: 5,32,481 > 5,00,000 → round up to 29,10,00,000.",
      "Crore: 5 lakh-ish is far below 50 lakh → 29,00,00,000."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_line",
      "p": {
       "mode": "round",
       "n": 290532481,
       "u": 3,
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "near"
      },
      {
       "set": {
        "u": 5
       }
      },
      {
       "set": {
        "u": 6
       }
      },
      {
       "set": {
        "u": 7
       },
       "show": "near,all"
      }
     ]
    },
    {
     "t": "m",
     "who": "guide",
     "say": "Math Talk! I have a number for which all five nearest neighbours are 5,00,00,000.",
     "q": "Which numbers have all five nearest neighbours equal to 5,00,00,000, and how many such numbers are there?",
     "o": [
      "4,50,00,000 to 5,49,99,999: 1 crore numbers",
      "Only 5,00,00,000 itself: 1 number",
      "4,99,99,500 to 5,00,00,499: 1000 numbers",
      "4,99,95,000 to 5,00,04,999: 10,000 numbers"
     ],
     "a": 2,
     "h": "The nearest thousand is the strictest condition.",
     "ref": "Math Talk, p. 11",
     "xs": [
      "Nearest thousand = 5,00,00,000 needs the number within 500 of it.",
      "So from 4,99,99,500 up to 5,00,00,499.",
      "All bigger places (lakh, crore …) then also round to 5,00,00,000.",
      "That is 500 + 500 = 1000 numbers."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_line",
      "p": {
       "mode": "round",
       "n": 49999500,
       "u": 3,
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "near,all"
      },
      null,
      {
       "set": {
        "n": 50000499
       }
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "4,63,128 + 4,19,682: I say the sum is near 8,00,000 and more than 8,00,000. Estu says near 9,00,000 and less than 9,00,000.",
     "q": "Are these estimates correct, and whose is closer?",
     "o": [
      "Only Roxie is correct",
      "Neither is correct",
      "Both are correct; Roxie’s estimate is closer",
      "Both are correct; Estu’s estimate is closer"
     ],
     "a": 3,
     "h": "4 lakh + 4 lakh = 8 lakh; 5 lakh + 4.2 lakh…",
     "ref": "Estimating Q1 (a), p. 11",
     "xs": [
      "Both numbers are more than 4 lakh, so the sum is more than 8 lakh.",
      "Both are less than 4,70,000 and 4,20,000, so the sum is less than 8,90,000 < 9 lakh.",
      "Exact sum 8,82,810 is only 17,190 from 9,00,000.",
      "Estu’s estimate is closer."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_line",
      "p": {
       "mode": "est",
       "a": 463128,
       "b": 419682,
       "op": "+",
       "marks": "800000,900000",
       "who": "Roxie,Estu",
       "show": "none"
      }
     },
     "xa": [
      null,
      null,
      {
       "show": "exact,cmp"
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "Two more checks without working out the full sum.",
     "q": "Is 4,63,128 + 4,19,682 greater or less than 8,50,000? Greater or less than 8,83,128?",
     "o": [
      "Greater than 8,50,000; less than 8,83,128",
      "Less than 8,50,000; less than 8,83,128",
      "Greater than 8,50,000; greater than 8,83,128",
      "Less than 8,50,000; greater than 8,83,128"
     ],
     "a": 0,
     "h": "8,83,128 = 4,63,128 + 4,20,000.",
     "ref": "Estimating Q1 (b), (c), p. 11",
     "xs": [
      "4,63,128 + 4,19,682 > 4,50,000 + 4,00,000 = 8,50,000.",
      "4,19,682 < 4,20,000, so the sum < 4,63,128 + 4,20,000 = 8,83,128."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_line",
      "p": {
       "mode": "est",
       "a": 463128,
       "b": 419682,
       "op": "+",
       "marks": "850000,883128",
       "who": ",",
       "show": "none"
      }
     },
     "xa": [
      null,
      {
       "show": "exact,cmp"
      }
     ]
    },
    {
     "t": "n",
     "who": "k7m1_roxie",
     "say": "Now the exact value.",
     "q": "4,63,128 + 4,19,682 = ?",
     "ans": 882810,
     "tol": 0.5,
     "h": "Add place by place, carrying.",
     "ref": "Estimating Q1 (d), p. 11",
     "xs": [
      "4,63,128 + 4,19,682 = 8,82,810.",
      "It is above 8,50,000 and below 8,83,128, just as we reasoned."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_line",
      "p": {
       "mode": "est",
       "a": 463128,
       "b": 419682,
       "op": "+",
       "marks": "800000,900000",
       "who": "Roxie,Estu",
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "exact,cmp"
      },
      null
     ]
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "14,63,128 − 4,90,020: Roxie says near 10,00,000 and less than it; I say near 9,00,000 and more than it.",
     "q": "Which statement is fully correct?",
     "o": [
      "Only Estu is right; the difference is less than 9,50,000",
      "Both are right; Estu is closer; the difference is less than 9,63,128",
      "Both are right; Roxie is closer; the difference is more than 9,50,000 and more than 9,63,128",
      "Both are right; Roxie is closer; the difference is less than 9,63,128"
     ],
     "a": 2,
     "h": "9,63,128 = 14,63,128 − 5,00,000, and 4,90,020 is less than 5,00,000.",
     "ref": "Estimating Q2 (a)–(c), p. 11–12",
     "xs": [
      "14,63,128 − 4,90,020 is between 9 lakh and 10 lakh: both correct.",
      "Subtracting less than 5,00,000 from 14,63,128 leaves more than 9,63,128 (and more than 9,50,000).",
      "The exact difference 9,73,108 is nearer 10,00,000: Roxie is closer."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_line",
      "p": {
       "mode": "est",
       "a": 1463128,
       "b": 490020,
       "op": "−",
       "marks": "1000000,900000",
       "who": "Roxie,Estu",
       "show": "none"
      }
     },
     "xa": [
      null,
      null,
      {
       "show": "exact,cmp"
      }
     ]
    },
    {
     "t": "n",
     "who": "k7m1_roxie",
     "say": "And the exact difference.",
     "q": "14,63,128 − 4,90,020 = ?",
     "ans": 973108,
     "tol": 0.5,
     "h": "Subtract place by place, borrowing.",
     "ref": "Estimating Q2 (d), p. 12",
     "xs": [
      "14,63,128 − 4,90,020 = 9,73,108."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_line",
      "p": {
       "mode": "est",
       "a": 1463128,
       "b": 490020,
       "op": "−",
       "marks": "950000,963128",
       "who": ",",
       "show": "none"
      }
     },
     "xa": [
      {
       "show": "exact,cmp"
      }
     ]
    },
    {
     "t": "o",
     "kind": "Discuss",
     "who": "guide",
     "say": "The Census table shows the populations of 20 Indian cities in 2011 and 2001.",
     "q": "What is your general observation about this data, and what is an appropriate title for the table?",
     "ref": "Populations of Cities Q1–Q2, p. 13",
     "xs": [
      "Most cities grew a lot between 2001 and 2011.",
      "Kolkata is the only city whose population fell (45,72,876 → 44,86,679).",
      "Mumbai and New Delhi crossed 1 crore.",
      "Title: ‘Populations of some Indian cities in 2001 and 2011’."
     ],
     "v": {
      "k": "table",
      "head": [
       "City",
       "2011",
       "2001"
      ],
      "rows": [
       [
        "Mumbai",
        "1,24,42,373",
        "1,19,78,450"
       ],
       [
        "New Delhi",
        "1,10,07,835",
        "98,79,172"
       ],
       [
        "Bengaluru",
        "84,25,970",
        "43,01,326"
       ],
       [
        "Hyderabad",
        "68,09,970",
        "36,37,483"
       ],
       [
        "Kolkata",
        "44,86,679",
        "45,72,876"
       ],
       [
        "Surat",
        "44,67,797",
        "24,33,835"
       ],
       [
        "Vadodara",
        "35,52,371",
        "16,90,000"
       ],
       [
        "Pune",
        "31,15,431",
        "25,38,473"
       ],
       [
        "Patna",
        "16,84,222",
        "13,66,444"
       ]
      ],
      "cap": "Some rows of the Census table, pp. 12–13"
     }
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "Pune’s population in 2011 was 31,15,431.",
     "q": "Approximately, by how much did Pune’s population increase from 2001 (25,38,473)?",
     "o": [
      "About 60 thousand",
      "About 6 lakh",
      "About 56 lakh",
      "About 16 lakh"
     ],
     "a": 1,
     "h": "31 lakh − 25 lakh.",
     "ref": "Populations of Cities Q3, p. 13",
     "xs": [
      "31,15,431 ≈ 31 lakh; 25,38,473 ≈ 25 lakh.",
      "31 − 25 = 6 lakh.",
      "Exact: 5,76,958, about 6 lakh."
     ],
     "v": {
      "k": "bars",
      "max": 3500000,
      "items": [
       {
        "l": "2001",
        "v": 2538473,
        "t": "25,38,473",
        "c": "sky"
       },
       {
        "l": "2011",
        "v": 3115431,
        "t": "31,15,431"
       }
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_lakshmamma",
     "say": "Which cities grew the fastest?",
     "q": "Which city’s population increased the most, and which cities almost doubled?",
     "o": [
      "Mumbai; Pune and Patna",
      "New Delhi; Bengaluru and Ahmedabad",
      "Hyderabad; Chennai and Kolkata",
      "Bengaluru; Bengaluru, Hyderabad, Surat and Vadodara"
     ],
     "a": 3,
     "h": "Compare each 2011 value with twice the 2001 value.",
     "ref": "Populations of Cities Q4–Q5, p. 13",
     "xs": [
      "Bengaluru: 84,25,970 − 43,01,326 = 41,24,644 — the biggest increase.",
      "Hyderabad 36 lakh → 68 lakh; Surat 24 lakh → 45 lakh.",
      "Vadodara 17 lakh → 35.5 lakh: a little more than double.",
      "So Bengaluru, Hyderabad, Surat and Vadodara almost doubled."
     ],
     "v": {
      "k": "table",
      "head": [
       "City",
       "2001",
       "2011"
      ],
      "rows": [
       [
        "Bengaluru",
        "43,01,326",
        "84,25,970"
       ],
       [
        "Hyderabad",
        "36,37,483",
        "68,09,970"
       ],
       [
        "Ahmedabad",
        "35,20,085",
        "55,70,585"
       ],
       [
        "Surat",
        "24,33,835",
        "44,67,797"
       ],
       [
        "Vadodara",
        "16,90,000",
        "35,52,371"
       ],
       [
        "New Delhi",
        "98,79,172",
        "1,10,07,835"
       ]
      ],
      "cap": "Increase = ?   Doubled?"
     }
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "Patna has 16,84,222 people and Mumbai 1,24,42,373.",
     "q": "About what number should we multiply Patna’s population by to get close to Mumbai’s?",
     "o": [
      "About 2",
      "About 17",
      "About 70",
      "About 7"
     ],
     "a": 3,
     "h": "Mumbai ≈ 124 lakh, Patna ≈ 17 lakh.",
     "ref": "Populations of Cities Q6, p. 13",
     "xs": [
      "124 lakh ÷ 17 lakh ≈ 7.3.",
      "Check: 7 × 16,84,222 = 1,17,89,554, close to 1,24,42,373.",
      "So multiply by about 7 (more exactly, about 7.4)."
     ],
     "v": {
      "k": "bars",
      "max": 13000000,
      "items": [
       {
        "l": "Patna",
        "v": 1684222,
        "t": "16,84,222",
        "c": "sky"
       },
       {
        "l": "Mumbai",
        "v": 12442373,
        "t": "1,24,42,373"
       }
      ]
     }
    }
   ]
  },
  {
   "title": "Patterns in Products",
   "sec": "1.5 Patterns in Products",
   "icon": "<svg viewBox='0 0 48 48'><rect x='4' y='14' width='16' height='20' rx='4' fill='#f4a51c'/><rect x='28' y='14' width='16' height='20' rx='4' fill='#62b6e8'/><text x='24' y='29' font-size='12' font-weight='800' text-anchor='middle' fill='#fff' font-family='sans-serif'>×</text></svg>",
   "brief": "Roxie and Estu find shortcuts for multiplying, predict how long a product will be, and uncover amazing facts hidden in products.",
   "steps": [
    {
     "t": "s",
     "who": "k7m1_roxie",
     "say": "Look at my shortcut: 116 × 5 = 116 × [10/2] = 58 × 10 = 580. And Estu did 824 × 25 = 824 × [100/4] = 206 × 100 = 20,600.",
     "note": "Multiplying by 5 = dividing by 2 and multiplying by 10. By 25 = ÷ 4 × 100. By 125 = ÷ 8 × 1000.",
     "xs": [
      "5 = [10/2], so × 5 means ÷ 2 then × 10.",
      "116 ÷ 2 = 58; 58 × 10 = 580.",
      "25 = [100/4]: 824 ÷ 4 = 206; 206 × 100 = 20,600."
     ],
     "v": {
      "k": "lines",
      "l": [
       "116 × 5 = 116 × [10/2]",
       "= 58 × 10 = 580",
       "824 × 25 = 824 × [100/4]",
       "= 206 × 100 = 20,600"
      ]
     }
    },
    {
     "t": "o",
     "kind": "Explain",
     "who": "guide",
     "say": "Math Talk!",
     "q": "Using the meaning of multiplication and division, explain why multiplying by 5 is the same as dividing by 2 and multiplying by 10.",
     "ref": "Math Talk, p. 14",
     "xs": [
      "10 groups of a number, split into 2 equal halves, give 5 groups in each half.",
      "So 5 × n = (10 × n) ÷ 2 = (n ÷ 2) × 10.",
      "Example: 5 × 116 = (116 ÷ 2) × 10 = 580."
     ],
     "v": {
      "k": "lines",
      "l": [
       "10 ÷ 2 = 5",
       "n × 5 = n × 10 ÷ 2",
       "= (n ÷ 2) × 10"
      ]
     }
    },
    {
     "t": "n",
     "who": "k7m1_estu",
     "say": "Find the friendly pair first!",
     "q": "Calculate quickly: 2 × 1768 × 50.",
     "ans": 176800,
     "tol": 0.5,
     "h": "2 × 50 = 100.",
     "ref": "Figure it Out Q1 (a), p. 14",
     "xs": [
      "Regroup: (2 × 50) × 1768.",
      "= 100 × 1768 = 1,76,800."
     ],
     "v": {
      "k": "lines",
      "l": [
       "2 × 1768 × 50",
       "= (2 × 50) × 1768",
       "= ?"
      ]
     }
    },
    {
     "t": "n",
     "who": "k7m1_roxie",
     "say": "Hint: 125 = [1000/8].",
     "q": "Calculate quickly: 72 × 125.",
     "ans": 9000,
     "tol": 0.5,
     "h": "72 ÷ 8 = 9.",
     "ref": "Figure it Out Q1 (b), p. 14",
     "xs": [
      "72 × 125 = 72 × [1000/8].",
      "= (72 ÷ 8) × 1000 = 9 × 1000 = 9000."
     ],
     "v": {
      "k": "lines",
      "l": [
       "72 × 125 = 72 × [1000/8]",
       "= (72 ÷ 8) × 1000",
       "= ?"
      ]
     }
    },
    {
     "t": "n",
     "who": "k7m1_estu",
     "say": "Four numbers — pair them up cleverly.",
     "q": "Calculate quickly: 125 × 40 × 8 × 25.",
     "ans": 1000000,
     "tol": 0.5,
     "h": "125 × 8 and 40 × 25.",
     "ref": "Figure it Out Q1 (c), p. 14",
     "xs": [
      "(125 × 8) × (40 × 25).",
      "= 1000 × 1000 = 10,00,000 (ten lakh, one million)."
     ],
     "v": {
      "k": "lines",
      "l": [
       "125 × 40 × 8 × 25",
       "= (125 × 8) × (40 × 25)",
       "= ?"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "All with 25 or 250 or 2500.",
     "q": "Find 25 × 12, 25 × 240, 250 × 120 and 2500 × 12.",
     "o": [
      "300, 6000, 30,000, 30,000",
      "300, 600, 3000, 30,000",
      "3000, 6000, 30,000, 3,00,000",
      "300, 6000, 3000, 3000"
     ],
     "a": 0,
     "h": "25 = [100/4]; 250 = [1000/4]; 2500 = [10000/4].",
     "ref": "Figure it Out Q2 (a)–(d), p. 14",
     "xs": [
      "25 × 12 = 100 × 3 = 300.",
      "25 × 240 = 100 × 60 = 6000.",
      "250 × 120 = 1000 × 30 = 30,000.",
      "2500 × 12 = 10,000 × 3 = 30,000."
     ],
     "v": {
      "k": "table",
      "head": [
       "Product",
       "Shortcut",
       "Answer"
      ],
      "rows": [
       [
        "25 × 12",
        "100 × (12 ÷ 4)",
        "?"
       ],
       [
        "25 × 240",
        "100 × (240 ÷ 4)",
        "?"
       ],
       [
        "250 × 120",
        "1000 × (120 ÷ 4)",
        "?"
       ],
       [
        "2500 × 12",
        "10,000 × (12 ÷ 4)",
        "?"
       ]
      ]
     }
    },
    {
     "t": "o",
     "kind": "Think",
     "who": "k7m1_estu",
     "say": "A blank puzzle: ___ × ___ = 120000000.",
     "q": "Find two numbers whose product is 12,00,00,000. Can you find more than one pair?",
     "ref": "Figure it Out Q2 (e), p. 14",
     "xs": [
      "12,00,00,000 = 12 × 1,00,00,000 (12 crore).",
      "One pair: 1200 × 1,00,000.",
      "Others: 12,000 × 10,000; 2400 × 50,000; 250 × 4,80,000; 25 × 48,00,000."
     ],
     "v": {
      "k": "lines",
      "l": [
       "1200 × 1,00,000",
       "12,000 × 10,000",
       "2400 × 50,000",
       "= 12,00,00,000"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "How long is the product? Let’s find patterns first: 11 × 11 = 121, 111 × 111 = 12321.",
     "q": "Following the pattern, what are 1111 × 1111 and 11111 × 11111?",
     "o": [
      "12321 and 1234321",
      "1234321 and 123454321",
      "1234321 and 12344321",
      "123321 and 12344321"
     ],
     "a": 1,
     "h": "The digits climb up and come back down.",
     "ref": "How Long is the Product?, p. 14",
     "xs": [
      "1111 × 1111 = 12,34,321.",
      "11111 × 11111 = 12,34,54,321.",
      "Two 4-digit numbers gave 7 digits; two 5-digit numbers gave 9."
     ],
     "v": {
      "k": "table",
      "head": [
       "Multiplication",
       "Product",
       "Digits"
      ],
      "rows": [
       [
        "11 × 11",
        "121",
        "3"
       ],
       [
        "111 × 111",
        "12321",
        "5"
       ],
       [
        "1111 × 1111",
        "?",
        "?"
       ],
       [
        "11111 × 11111",
        "?",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "66 × 61 = 4026 and 666 × 661 = 440226.",
     "q": "What is 6666 × 6661, and what comes next in the pattern?",
     "o": [
      "4440226; 44402226",
      "4440226 and 444402226",
      "44402226; 66666 × 66661 = 4444022226",
      "44422266; 66666 × 66661 = 4444422226"
     ],
     "a": 2,
     "h": "One more 4 at the front and one more 2 near the end each time.",
     "ref": "How Long is the Product?, p. 14",
     "xs": [
      "6666 × 6661 = 4,44,02,226.",
      "66666 × 66661 = 4,44,40,22,226.",
      "Also 3 × 5 = 15, 33 × 35 = 1155, 333 × 335 = 111555, and 101² = 10201, 102² = 10404, 103² = 10609."
     ],
     "v": {
      "k": "table",
      "head": [
       "Multiplication",
       "Product"
      ],
      "rows": [
       [
        "66 × 61",
        "4026"
       ],
       [
        "666 × 661",
        "440226"
       ],
       [
        "6666 × 6661",
        "?"
       ],
       [
        "66666 × 66661",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "I claim the product of two 2-digit numbers can only be a 3- or 4-digit number. I checked the smallest (10 × 10 = 100) and the boundary (100 × 100 = 10,000).",
     "q": "Which is correct?",
     "o": [
      "Roxie is wrong: 99 × 99 has 5 digits",
      "Roxie is right; a 3-digit × 3-digit product can be 4-digit",
      "Roxie is right; 3-digit × 3-digit is never 4-digit; 4-digit × 2-digit can be 5-digit",
      "Roxie is right; 4-digit × 2-digit is always 6-digit"
     ],
     "a": 2,
     "h": "Smallest products: 100 × 100 and 1000 × 10.",
     "ref": "In-text questions, p. 15",
     "xs": [
      "Every 2-digit product is ≥ 10 × 10 = 100 and < 100 × 100 = 10,000: 3 or 4 digits. No need to try all!",
      "3-digit × 3-digit ≥ 100 × 100 = 10,000: at least 5 digits, never 4.",
      "4-digit × 2-digit: 1000 × 10 = 10,000 has 5 digits. Yes!"
     ],
     "v": {
      "k": "lines",
      "l": [
       "2-digit × 2-digit: 10 × 10 = 100 … less than 100 × 100 = 10,000",
       "3-digit × 3-digit ≥ 100 × 100 = ?",
       "4-digit × 2-digit ≥ 1000 × 10 = ?"
      ]
     }
    },
    {
     "t": "m",
     "who": "guide",
     "say": "Pattern: 1-digit × 1-digit = 1 or 2 digits; 2 × 1 = 2 or 3; 2 × 2 = 3 or 4; 3 × 3 = 5 or 6.",
     "q": "Complete: 5-digit × 5-digit, 8-digit × 3-digit and 12-digit × 13-digit give how many digits?",
     "o": [
      "10 or 11; 11 or 12; 25 or 26",
      "9 or 10; 11 or 12; 24 or 25",
      "25; 24; 156",
      "9 or 10; 10 or 11; 24 or 25"
     ],
     "a": 3,
     "h": "a-digit × b-digit gives (a + b − 1) or (a + b) digits.",
     "ref": "Multiplication statements, p. 15",
     "xs": [
      "The product has a + b − 1 or a + b digits.",
      "5 + 5 = 10 → 9 or 10.",
      "8 + 3 = 11 → 10 or 11.",
      "12 + 13 = 25 → 24 or 25."
     ],
     "v": {
      "k": "table",
      "head": [
       "Multiply",
       "Digits in product"
      ],
      "rows": [
       [
        "1-digit × 1-digit",
        "1 or 2"
       ],
       [
        "3-digit × 3-digit",
        "5 or 6"
       ],
       [
        "5-digit × 5-digit",
        "?"
       ],
       [
        "8-digit × 3-digit",
        "?"
       ],
       [
        "12-digit × 13-digit",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "Fascinating facts are hidden in products! Purandaradāsa, the 15th-century composer who systematised the teaching of Carnatic music, composed 1250 × 380 kīrtanas by legend.",
     "q": "1250 × 380 = ?",
     "o": [
      "47,500",
      "4,75,000",
      "47,50,000",
      "4,57,000"
     ],
     "a": 1,
     "h": "1250 × 4 = 5000, so 1250 × 380 = 5000 × 95.",
     "ref": "Fascinating Facts, p. 16",
     "xs": [
      "1250 × 380 = 1250 × 4 × 95 = 5000 × 95.",
      "= 4,75,000: four lakh seventy five thousand.",
      "American: 475,000 = four hundred seventy five thousand."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 475000,
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      {
       "show": "ind,us"
      },
      null,
      null
     ]
    },
    {
     "t": "o",
     "kind": "Think",
     "who": "k7m1_roxie",
     "say": "4,75,000 songs is a lot of songs!",
     "q": "How many years did he live to compose so many songs? At what age did he start? If he composed 4,75,000 songs, how many songs per year did he have to compose?",
     "ref": "Fascinating Facts, p. 16",
     "xs": [
      "Make an assumption, e.g. he composed for 50 years.",
      "4,75,000 ÷ 50 = 9500 songs a year.",
      "9500 ÷ 365 ≈ 26 songs every single day!",
      "With 60 years: 4,75,000 ÷ 60 ≈ 7917 a year. Share your own assumptions."
     ],
     "v": {
      "k": "lines",
      "l": [
       "4,75,000 ÷ 50 years",
       "= 9,500 songs a year",
       "≈ 26 songs a day!"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "2100 × 70,000 is the distance from the Earth to the Sun in km, and 6400 × 62,500 is the litres of water the Amazon pours into the Atlantic every second.",
     "q": "Find both products.",
     "o": [
      "14,70,00,000 km and 40,00,00,000 litres",
      "1,47,00,000 km and 4,00,00,000 litres",
      "14,70,00,000 km and 4,00,00,000 litres",
      "147,00,00,000 km and 40,00,00,000 litres"
     ],
     "a": 0,
     "h": "21 × 7 = 147; 64 × 625 = 40,000.",
     "ref": "Fascinating Facts, p. 16–17",
     "xs": [
      "2100 × 70,000 = 147 followed by 6 zeros = 14,70,00,000 km (147 million).",
      "The farthest distance is about 152 million km.",
      "6400 × 62,500 = 40,00,00,000 litres (400 million) every second!"
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 147000000,
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      {
       "show": "ind,us"
      },
      null,
      {
       "set": {
        "n": 400000000
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "Now facts hidden in divisions: the longest train journey (13,95,000 ÷ 150 km), an adult blue whale (10,50,00,000 ÷ 700 kg) and plastic waste in 2021 (52,00,00,00,000 ÷ 130 tonnes).",
     "q": "Find the three quotients.",
     "o": [
      "930; 15,000; 4,00,00,000",
      "93,000; 1,50,000; 40,00,000",
      "9300; 15,00,000; 4,00,00,000",
      "9300; 1,50,000; 40,00,00,000"
     ],
     "a": 3,
     "h": "Cancel zeros first: 1,39,500 ÷ 15; 10,50,000 ÷ 7; 52,00,00,000 ÷ 13.",
     "ref": "Fascinating Facts (division), p. 17–18",
     "xs": [
      "13,95,000 ÷ 150 = 9300 km (Moscow to Vladivostok). India’s longest: Dibrugarh to Kanyakumari, 4219 km.",
      "10,50,00,000 ÷ 700 = 1,50,000 kg for a blue whale.",
      "52,00,00,00,000 ÷ 130 = 40,00,00,000 tonnes = 400 million tonnes of plastic."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 9300,
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      {
       "show": "ind,us"
      },
      {
       "set": {
        "n": 150000
       }
      },
      {
       "set": {
        "n": 400000000
       }
      }
     ]
    },
    {
     "t": "s",
     "who": "guide",
     "say": "A large-number fact from our own fields: one gram of healthy soil can hold 100 million to 1 billion bacteria, and 1 lakh to 1 million fungi!",
     "note": "100 million = 10 crore; 1 billion = 100 crore; 1 million = 10 lakh.",
     "xs": [
      "100 million = 10,00,00,000 = 10 crore bacteria.",
      "1 billion = 1,00,00,00,000 = 100 crore.",
      "Fungi: 1 lakh to 10 lakh (1 million). Share such facts with your class!"
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 100000000,
       "show": "ind,us"
      }
     },
     "xa": [
      null,
      {
       "set": {
        "n": 1000000000
       }
      },
      {
       "set": {
        "n": 1000000
       }
      }
     ]
    }
   ]
  },
  {
   "title": "Did You Ever Wonder…?",
   "sec": "1.6 Did You Ever Wonder…? · Figure it Out · Toothpick Digits",
   "icon": "<svg viewBox='0 0 48 48'><circle cx='10' cy='30' r='7' fill='#2f7dd1'/><circle cx='40' cy='16' r='6' fill='#e8e2cf'/><path d='M16 28 Q28 14 34 17' stroke='#f4a51c' stroke-width='2' stroke-dasharray='3 3' fill='none'/><path d='M22 22 l6 -2 l-3 5z' fill='#e04a86'/></svg>",
   "brief": "Could Mumbai fit in 1 lakh buses? Could Roxie reach the Moon? Then the granary’s final puzzles — and toothpick digits.",
   "steps": [
    {
     "t": "s",
     "who": "k7m1_estu",
     "say": "Could the entire population of Mumbai fit into 1 lakh buses? Let’s assume a bus holds 50 people.",
     "note": "Break big questions into stages and make reasonable assumptions.",
     "xs": [
      "1 lakh buses × 50 people = 50 lakh people.",
      "Mumbai has more than 1 crore 24 lakh people.",
      "50 lakh < 1 crore 24 lakh, so Mumbai cannot fit!"
     ],
     "v": {
      "k": "bars",
      "max": 13000000,
      "items": [
       {
        "l": "1 lakh buses",
        "v": 5000000,
        "t": "50,00,000",
        "c": "sky"
       },
       {
        "l": "Mumbai",
        "v": 12442373,
        "t": "1,24,42,373"
       }
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "The RMS Titanic carried about 2500 passengers.",
     "q": "Can the population of Mumbai (1,24,42,373) fit into 5000 such ships?",
     "o": [
      "Yes, just: 5000 × 2500 = 1,25,00,000",
      "No: 5000 × 2500 = 12,50,000",
      "No: 5000 × 2500 = 1,25,000",
      "Yes: 5000 × 2500 = 12,50,00,000"
     ],
     "a": 0,
     "h": "5 × 25 = 125, then count the zeros.",
     "ref": "In-text question, p. 19",
     "xs": [
      "5000 × 2500 = 1,25,00,000 = 1 crore 25 lakh.",
      "1,25,00,000 > 1,24,42,373.",
      "So yes — with about 57,627 places to spare!"
     ],
     "v": {
      "k": "lines",
      "l": [
       "5000 ships × 2500 passengers = ?",
       "Mumbai: 1,24,42,373 people",
       "Do they fit?"
      ]
     }
    },
    {
     "t": "x",
     "who": "k7m1_roxie",
     "say": "If I travel 100 km every day, could I reach the Moon (3,84,400 km away) in 10 years? In one year I go 100 × 365 = 36,500 km.",
     "q": "Find the smallest number of whole years Roxie needs to reach the Moon at 100 km a day.",
     "goal": {
      "years": 11
     },
     "h": "In 10 years she covers 3,65,000 km.",
     "ref": "In-text questions, p. 19 (Roxie and the Moon)",
     "xs": [
      "One year: 36,500 km. Ten years: 3,65,000 km — not enough.",
      "3,84,400 − 3,65,000 = 19,400 km still to go.",
      "11 years: 4,01,500 km. She reaches the Moon in her 11th year."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_trip",
      "p": {
       "rate": 100,
       "years": 1,
       "target": 384400,
       "tname": "Moon",
       "ymax": 20,
       "show": "year,total",
       "slider": "years"
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
     "who": "k7m1_estu",
     "say": "The Sun is about 14,70,00,000 km away. What if I travel 1000 km every day?",
     "q": "Can you reach the Sun in a lifetime travelling 1000 km a day?",
     "o": [
      "Yes, in about 40 years",
      "Yes, in about 147 years",
      "No, it would take about 403 years",
      "No, it would take about 4030 years"
     ],
     "a": 2,
     "h": "14,70,00,000 ÷ 1000 = days needed.",
     "ref": "In-text question, p. 19",
     "xs": [
      "Days needed: 14,70,00,000 ÷ 1000 = 1,47,000 days.",
      "1,47,000 ÷ 365 ≈ 403 years.",
      "100 years of travel covers only 3,65,00,000 km, about a quarter of the way."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_trip",
      "p": {
       "rate": 1000,
       "years": 100,
       "target": 147000000,
       "tname": "Sun",
       "ymax": 450,
       "show": "year"
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
     "who": "k7m1_lakshmamma",
     "say": "Make reasonable assumptions! (a) A sheet of paper weighs 5 g: can you lift 1 lakh sheets? (b) 250 babies are born each minute: a million in a day? (c) Count 1 coin a second: a million coins in a day?",
     "q": "What are the answers?",
     "o": [
      "(a) Yes, 50 kg (b) Yes (c) Yes",
      "(a) No, 500 kg (b) No, 3,60,000 (c) No, 86,400",
      "(a) No, 5000 kg (b) Yes, 36,00,000 (c) No, 8,640",
      "(a) No, 500 kg (b) No, 36,000 (c) Yes, 10,00,000"
     ],
     "a": 1,
     "h": "5 × 1,00,000 g; 250 × 60 × 24; 60 × 60 × 24.",
     "ref": "Assumption questions (a)–(c), p. 19",
     "xs": [
      "(a) 5 × 1,00,000 = 5,00,000 g = 500 kg — far too heavy.",
      "(b) 250 × 60 × 24 = 3,60,000 babies a day < 10,00,000.",
      "(c) A day has 24 × 60 × 60 = 86,400 seconds < 10 lakh.",
      "Now create your own fun questions like these!"
     ],
     "v": {
      "k": "table",
      "head": [
       "Question",
       "Working",
       "Result"
      ],
      "rows": [
       [
        "1 lakh sheets",
        "5 g × 1,00,000",
        "?"
       ],
       [
        "Babies in a day",
        "250 × 60 × 24",
        "?"
       ],
       [
        "Coins in a day",
        "60 × 60 × 24",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "guide",
     "say": "Figure it Out! Use all digits 0–9 exactly once to make a 10-digit number (first digit not 0).",
     "q": "Write the largest multiple of 5 and the smallest even number.",
     "o": [
      "9876543215 and 1023456789",
      "9876543205 and 1234567890",
      "9876543210 and 0123456798",
      "9876543210 and 1023456798"
     ],
     "a": 3,
     "h": "A multiple of 5 ends in 0 or 5; even ends in 0, 2, 4, 6 or 8.",
     "ref": "Figure it Out Q1, p. 19–20",
     "xs": [
      "Largest: digits in decreasing order, 9876543210 — ends in 0, so a multiple of 5.",
      "Smallest: start 10234567, then the last two digits must make it even.",
      "1023456789 is odd; swap the last two: 1023456798."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 9876543210,
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      {
       "show": "ind"
      },
      null,
      {
       "set": {
        "n": 1023456798
       }
      }
     ]
    },
    {
     "t": "o",
     "kind": "Think",
     "who": "k7m1_roxie",
     "say": "10,30,285 is ‘ten lakhs thirty thousand two hundred eighty five’: 42 letters.",
     "q": "Give a 7-digit number whose number name has the maximum number of letters.",
     "ref": "Figure it Out Q2, p. 20",
     "xs": [
      "Use the longest words: ‘seventy’ (7 letters) for tens, ‘seven’, ‘three’ or ‘eight’ (5 letters) for ones and hundreds.",
      "77,77,777: seventy seven lakh seventy seven thousand seven hundred seventy seven.",
      "That is 60 letters (others like 73,78,373 tie)."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 7777777,
       "sys": "in",
       "show": "ind"
      }
     }
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "A 9-digit number where swapping ANY two digits makes it bigger…",
     "q": "Which number works, and how many such numbers exist?",
     "o": [
      "987654321; only one",
      "123456789; only one",
      "102345678; many",
      "987654312; only one"
     ],
     "a": 1,
     "h": "Every digit must be smaller than every digit to its right.",
     "ref": "Figure it Out Q3, p. 20",
     "xs": [
      "Swapping any two digits must move a bigger digit to the left.",
      "So the digits must strictly increase from left to right.",
      "With 9 different digits and no leading 0: 123456789 — exactly one such number."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 123456789,
       "show": "none",
       "hide": true
      }
     },
     "xa": [
      null,
      null,
      {
       "show": "ind"
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "Strike out 10 digits from 12345123451234512345 so the rest is as large as possible.",
     "q": "Which 10-digit number remains?",
     "o": [
      "5555512345",
      "4512345123",
      "5345123451",
      "5534512345"
     ],
     "a": 3,
     "h": "Choose the biggest possible first digit, leaving enough digits after it.",
     "ref": "Figure it Out Q4, p. 20",
     "xs": [
      "The first kept digit must come from the first 11 digits: the 5 in position 5.",
      "Next, the 5 in position 10.",
      "Then the biggest left among positions 11–13 is 3; the last 7 digits must all stay: 4512345.",
      "Result: 5534512345."
     ],
     "v": {
      "k": "lines",
      "l": [
       "12345 12345 12345 12345",
       "Strike out 10 digits",
       "Largest number left = ?"
      ]
     }
    },
    {
     "t": "o",
     "kind": "Think",
     "who": "k7m1_estu",
     "say": "‘zero’ and ‘one’ share ‘e’ and ‘o’; ‘one’ and ‘two’ share ‘o’; ‘two’ and ‘three’ share ‘t’.",
     "q": "How far do you have to count to find two consecutive numbers whose English names share no letter?",
     "ref": "Figure it Out Q5, p. 20",
     "xs": [
      "Test pairs: ‘three/four’ share r, ‘four/five’ share f, ‘five/six’ share i, ‘six/seven’ share s …",
      "Almost every name has e, n, o or t, so neighbours keep sharing letters.",
      "Even a computer check up to 3 crore finds no such pair — you would have to count extremely far!",
      "Make a list and look for the letters that keep repeating."
     ],
     "v": {
      "k": "table",
      "head": [
       "Pair",
       "Shared letter"
      ],
      "rows": [
       [
        "zero, one",
        "e, o"
       ],
       [
        "one, two",
        "o"
       ],
       [
        "two, three",
        "t"
       ],
       [
        "three, four",
        "r"
       ],
       [
        "four, five",
        "f"
       ],
       [
        "five, six",
        "i"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "guide",
     "say": "Try This! Write 1, 2, 3, … one after another. The 10th digit is ‘1’ and the 11th is ‘0’ (from 10).",
     "q": "What is the 1000th digit, and in which number does it occur?",
     "o": [
      "0, in 370",
      "7, in 369",
      "3, in 370",
      "1, in 1000"
     ],
     "a": 2,
     "h": "1–9 use 9 digits; 10–99 use 180 digits.",
     "ref": "Figure it Out Q6 (a), p. 20",
     "xs": [
      "1–9: 9 digits; 10–99: 90 × 2 = 180 digits; total 189.",
      "1000 − 189 = 811 = 3 × 270 + 1.",
      "270 three-digit numbers: 100 to 369. The next digit is the first digit of 370.",
      "So the 1000th digit is 3, in 370."
     ],
     "v": {
      "k": "table",
      "head": [
       "Numbers",
       "How many",
       "Digits"
      ],
      "rows": [
       [
        "1–9",
        "9",
        "9"
       ],
       [
        "10–99",
        "90",
        "180"
       ],
       [
        "100 onwards",
        "?",
        "?"
       ],
       [
        "1000th digit",
        "?",
        "?"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "Try This, harder!",
     "q": "Which number contains the millionth digit, and when do you write the digit ‘5’ for the 5000th time?",
     "o": [
      "1,85,185; at 13,495",
      "1,00,000; at 5000",
      "1,85,184; at 13,995",
      "9,99,999; at 50,000"
     ],
     "a": 0,
     "h": "1–99 999 use 4,88,889 digits; then 6-digit numbers.",
     "ref": "Figure it Out Q6 (b), (c), p. 20",
     "xs": [
      "Digits up to 99,999: 9 + 180 + 2700 + 36,000 + 4,50,000 = 4,88,889.",
      "10,00,000 − 4,88,889 = 5,11,111 = 6 × 85,185 + 1, so it is the first digit of 1,00,000 + 85,185 = 1,85,185.",
      "From 1 to 9999 the digit 5 appears 4000 times; 10,000–12,999 add 900 more (4900).",
      "From 13,000 the hundred more 5s finish at 13,495: the 5000th ‘5’."
     ],
     "v": {
      "k": "table",
      "head": [
       "Range",
       "Digits written"
      ],
      "rows": [
       [
        "1–9",
        "9"
       ],
       [
        "10–99",
        "180"
       ],
       [
        "100–999",
        "2,700"
       ],
       [
        "1000–9999",
        "36,000"
       ],
       [
        "10,000–99,999",
        "4,50,000"
       ]
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_estu",
     "say": "A calculator has only +10,000 and +100 buttons.",
     "q": "Total clicks for 20,800; 92,100; 1,20,500; 65,30,000 and 70,25,700?",
     "o": [
      "10, 12, 8, 13, 16",
      "10, 30, 17, 653, 759",
      "28, 30, 17, 653, 759",
      "10, 30, 125, 6530, 759"
     ],
     "a": 1,
     "h": "Make as many ten-thousands as you can, then hundreds.",
     "ref": "Figure it Out Q7, p. 20",
     "xs": [
      "20,800 = (2 × 10,000) + (8 × 100): 10. 92,100 = (9 × 10,000) + (21 × 100): 30.",
      "1,20,500 = (12 × 10,000) + (5 × 100): 17.",
      "65,30,000 = 653 × 10,000: 653.",
      "70,25,700 = (702 × 10,000) + (57 × 100): 759."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_calc",
      "p": {
       "on": "4,2",
       "name": "Two-button calculator",
       "c4": 0,
       "c2": 0,
       "mx": 800,
       "show": "total"
      }
     },
     "xa": [
      {
       "set": {
        "c4": 2,
        "c2": 8
       },
       "show": "all"
      },
      {
       "set": {
        "c4": 12,
        "c2": 5
       }
      },
      {
       "set": {
        "c4": 653,
        "c2": 0
       }
      },
      {
       "set": {
        "c4": 702,
        "c2": 57
       }
      }
     ]
    },
    {
     "t": "n",
     "who": "guide",
     "say": "Lakhs meet billions!",
     "q": "How many lakhs make a billion?",
     "ans": 10000,
     "tol": 0.5,
     "h": "1 billion = 100 crore, and 1 crore = 100 lakh.",
     "ref": "Figure it Out Q8, p. 20",
     "xs": [
      "1 billion = 1,00,00,00,000 = 100 crore.",
      "100 crore × 100 lakh = 10,000 lakh."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_pv",
      "p": {
       "n": 1000000000,
       "show": "ind,us"
      }
     }
    },
    {
     "t": "m",
     "who": "k7m1_lakshmamma",
     "say": "Two sets of number cards 1–9 go into the boxes: a 7-digit number and a 5-digit number.",
     "q": "What are the largest possible sum and the smallest possible difference?",
     "o": [
      "1,00,54,320 and 10,22,447",
      "99,88,776 and 10,22,447",
      "1,00,54,320 and 11,22,334",
      "1,05,43,200 and 9,99,999"
     ],
     "a": 0,
     "h": "Largest sum: big digits in the highest places. Smallest difference: small 7-digit, big 5-digit.",
     "ref": "Figure it Out Q9, p. 20",
     "xs": [
      "Largest sum: 99,88,776 + 65,544 = 1,00,54,320.",
      "Smallest difference: 11,22,334 − 99,887 = 10,22,447.",
      "Each digit 1–9 can be used at most twice (two sets)."
     ],
     "v": {
      "k": "table",
      "head": [
       "",
       "7-digit",
       "5-digit",
       "Result"
      ],
      "rows": [
       [
        "Largest sum",
        "?",
        "?",
        "?"
       ],
       [
        "Smallest difference",
        "?",
        "?",
        "?"
       ]
      ],
      "cap": "Cards 1–9, two of each"
     }
    },
    {
     "t": "o",
     "kind": "Activity",
     "who": "k7m1_estu",
     "say": "Cards: 4000, 13000, 300, 70000, 150000, 20, 5. Each card once per target, any operations.",
     "q": "Get as close as you can to (b) 2,00,000 (c) 5,80,000 (d) 12,45,000 (e) 20,90,800. (Example: (a) 4000 × (20 + 5) + 13000 = 1,13,000 for 1,10,000.)",
     "ref": "Figure it Out Q10, p. 21",
     "xs": [
      "(b) 1,50,000 + 70,000 − (4000 × 5) = 2,00,000 exactly.",
      "(c) 70,000 × 5 + 1,50,000 + 4000 × 20 = 3,50,000 + 1,50,000 + 80,000 = 5,80,000 exactly.",
      "(d) 70,000 × 20 − 1,50,000 − 4000 − 300 × 5 = 12,44,500 (and (70,000 + 13,000) ÷ 20 × 300 = 12,45,000 exactly!).",
      "(e) (300 − 5) × (1,50,000 − 13,000) ÷ 20 + 70,000 = 20,90,750 — only 50 away. Can you beat it?"
     ],
     "v": {
      "k": "lines",
      "l": [
       "1,50,000 + 70,000 − 4000 × 5 = 2,00,000",
       "70,000 × 5 + 1,50,000 + 4000 × 20 = 5,80,000",
       "70,000 × 20 − 1,50,000 − 4000 − 300 × 5 = 12,44,500",
       "(300 − 5) × 1,37,000 ÷ 20 + 70,000 = 20,90,750"
      ]
     }
    },
    {
     "t": "n",
     "who": "k7m1_somu",
     "say": "Let’s stack coins, each 1 mm thick, as high as the Statue of Unity (180 m).",
     "q": "How many coins are needed?",
     "ans": 180000,
     "tol": 0.5,
     "h": "1 m = 1000 mm.",
     "ref": "Figure it Out Q11, p. 21",
     "xs": [
      "180 m = 180 × 1000 mm = 1,80,000 mm.",
      "1,80,000 ÷ 1 = 1,80,000 coins — almost 2 lakh!"
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_3dblocks",
      "p": {
       "e": 5,
       "show": "val,name"
      }
     }
    },
    {
     "t": "m",
     "who": "k7m1_roxie",
     "say": "Birds fly enormous distances! A grey-headed albatross covers 900–1000 km a day; one trip was about 12,000 km. A bar-tailed godwit flew 13,560 km non-stop in about 11 days.",
     "q": "About how many days did the albatross trip take, and about how far did the godwit fly each day and each hour?",
     "o": [
      "About 120 days; 123 km a day; 5 km an hour",
      "About 12 to 14 days; 1233 km a day; 29,592 km an hour",
      "About 1.2 days; 12,330 km a day; 513 km an hour",
      "About 12 to 14 days; 1233 km a day; 51 km an hour"
     ],
     "a": 3,
     "h": "12,000 ÷ 1000 and 12,000 ÷ 900; 13,560 ÷ 11 and then ÷ 24.",
     "ref": "Figure it Out Q12–Q13, p. 21",
     "xs": [
      "12,000 ÷ 1000 = 12; 12,000 ÷ 900 ≈ 13.3: about 12 to 14 days.",
      "13,560 ÷ 11 ≈ 1233 km a day.",
      "1233 ÷ 24 ≈ 51 km every hour, for 11 days without stopping!"
     ],
     "v": {
      "k": "lines",
      "l": [
       "Albatross: 900–1000 km a day; trip 12,000 km",
       "Godwit: 13,560 km in about 11 days",
       "Days? km a day? km an hour?"
      ]
     }
    },
    {
     "t": "m",
     "who": "k7m1_somu",
     "say": "Bald eagles fly up to 4500–6000 m, Mount Everest is about 8850 m, aeroplanes fly at 10,000–12,800 m.",
     "q": "About how many times the height of Somu’s 40 m building are these?",
     "o": [
      "Eagles 11–15; Everest 22; planes 25–32",
      "Eagles 112–150; Everest 221; planes 250–320",
      "Eagles 1125–1500; Everest 2212; planes 2500–3200",
      "Eagles 112–150; Everest 885; planes 1000–1280"
     ],
     "a": 1,
     "h": "Divide each height by 40.",
     "ref": "Figure it Out Q14, p. 21",
     "xs": [
      "4500 ÷ 40 = 112.5 and 6000 ÷ 40 = 150.",
      "8850 ÷ 40 ≈ 221.",
      "10,000 ÷ 40 = 250 and 12,800 ÷ 40 = 320."
     ],
     "v": {
      "k": "sim",
      "sim": "k7m1_tower",
      "p": {
       "floors": 10,
       "items": "eagle,everest,plane",
       "cmp": "eagle",
       "show": "bld"
      }
     },
     "xa": [
      {
       "show": "bld,times"
      },
      {
       "set": {
        "cmp": "everest"
       }
      },
      {
       "set": {
        "cmp": "plane"
       }
      }
     ]
    },
    {
     "t": "m",
     "who": "k7m1_preetham",
     "say": "Puzzle time — Toothpick Digits! The digit 7 needs 3 sticks, and 42,019 needs exactly 23 sticks. Starting from 42,019, add two sticks to make a bigger number, like 42,078.",
     "q": "How many sticks make 5108, and where should I insert an extra digit ‘1’ among 4, 2, 0, 1, 9 to get the biggest number?",
     "o": [
      "20 sticks; 421019",
      "18 sticks; 420191",
      "20 sticks; 142019",
      "22 sticks; 412019"
     ],
     "a": 0,
     "h": "Sticks: 5 → 5, 1 → 2, 0 → 6, 8 → 7.",
     "ref": "Toothpick Digits, p. 23",
     "xs": [
      "5108: 5 + 2 + 6 + 7 = 20 sticks.",
      "Inserting 1: 142019, 412019, 421019, 420119, 420191.",
      "The biggest is 421019; the others are the other numbers Preetham can make.",
      "Adding two sticks to 42,019 also gives 42,049, 42,818, 42,879, 48,019 or 92,019."
     ],
     "v": {
      "k": "table",
      "head": [
       "Digit",
       "0",
       "1",
       "2",
       "3",
       "4",
       "5",
       "6",
       "7",
       "8",
       "9"
      ],
      "rows": [
       [
        "Sticks",
        "6",
        "2",
        "5",
        "5",
        "4",
        "5",
        "6",
        "3",
        "7",
        "6"
       ]
      ],
      "cap": "Sticks for each toothpick digit"
     }
    },
    {
     "t": "o",
     "kind": "Activity",
     "who": "k7m1_preetham",
     "say": "More stick puzzles: 63,890 uses 30 sticks; rearranging four sticks can give 88,078. And what can 24 sticks make?",
     "q": "Rearrange exactly four sticks of 63,890 to make bigger numbers. Make a number with exactly 24 sticks; what are the biggest and the smallest such numbers?",
     "ref": "Toothpick Digits, p. 23",
     "xs": [
      "63,890 = 6 + 5 + 6 + 7 + 6 = 30 sticks; try other bigger numbers with the same 30 sticks, like 88,078.",
      "Biggest with 24 sticks: use as many digits as possible. ‘1’ uses only 2 sticks: 1,11,11,11,11,111 (twelve 1s).",
      "Smallest: as few digits as possible (at least 4, since 8 uses 7). Lead with 2 (5 sticks): 2, 0, 0, 8 → 5 + 6 + 6 + 7 = 24.",
      "So the smallest is 2008. Make your own questions and challenge each other!"
     ],
     "v": {
      "k": "table",
      "head": [
       "Number",
       "Sticks"
      ],
      "rows": [
       [
        "63,890",
        "6 + 5 + 6 + 7 + 6 = 30"
       ],
       [
        "88,078",
        "7 + 7 + 6 + 3 + 7 = 30"
       ],
       [
        "111111111111",
        "12 × 2 = 24"
       ],
       [
        "2008",
        "5 + 6 + 6 + 7 = 24"
       ]
      ]
     }
    }
   ]
  }
 ],
 "summary": [
  [
   "One lakh",
   "1 lakh = 1,00,000 = 1 followed by 5 zeros = 100 thousands. 99,999 + 1 = 1,00,000. Living 1 lakh days means living about 274 years."
  ],
  [
   "Feeling big numbers",
   "Compare a large quantity with something familiar: the Statue of Unity (180 m) is about 4 times Somu’s 40 m building; the 450 m Kunchikal falls would need about 113 floors."
  ],
  [
   "Reading and writing",
   "Indian commas go 3-2-2-2 from the right (thousand, lakh, crore, arab): 12,78,830 = twelve lakh seventy eight thousand eight hundred thirty. Fill empty places with zeros: 50,05,050."
  ],
  [
   "Button clicks and place value",
   "A number can be made from +1, +10, +100 … in many ways. The fewest clicks equal the digit sum, and the least-click expression is exactly the place value notation: 5072 = (5 × 1000) + (7 × 10) + (2 × 1)."
  ],
  [
   "Indian and American systems",
   "1 crore = 100 lakh = 10 million (7 zeros); 1 arab = 100 crore = 1 billion (9 zeros); 10 lakh = 1 million. American commas go 3-3-3: 9,876,501,234."
  ],
  [
   "Rounding and estimating",
   "Round up or down depending on the situation; exact values are needed for money or phone numbers. Nearest neighbours of 6,72,85,183: 6,72,85,000 (thousand) … 7,00,00,000 (crore). Estimate sums and differences before calculating."
  ],
  [
   "Shortcuts in products",
   "Regroup factors into 10, 100, 1000: × 5 = ÷ 2 × 10, × 25 = ÷ 4 × 100, × 125 = ÷ 8 × 1000. An a-digit × b-digit product has a + b − 1 or a + b digits."
  ],
  [
   "Thought experiments",
   "Break big questions into stages with reasonable assumptions: 1 lakh buses hold only 50 lakh people, less than Mumbai; at 100 km a day the Moon (3,84,400 km) takes 11 years; the Sun would take about 403 years at 1000 km a day."
  ]
 ]
});
