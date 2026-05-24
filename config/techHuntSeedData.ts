export const TECH_HUNT_QUESTIONS: Array<{
  id: number;
  type: string;
  question: string;
  answer: string | string[];
  imageUrl: string | null;
}> = [
  {
    id: 0,
    type: "hex",
    question:
      "746865 206f6e6c79 206e756d626572 207772697474656e 2077697468 206c657474657273 20696e 20616c7068616265746963616c 206f726465723f (answer format : 776f7264)",
    answer: "forty",
    imageUrl: null,
  },
  {
    id: 1,
    type: "image",
    question: "Only light reveals truth",
    answer: "Relic",
    imageUrl: "/phoenix/tech-hunt/ShadowImage-1.png",
  },
  {
    id: 2,
    type: "hex",
    question:
      "57686174 20686173 2068616e6473 20627574 2063616e6e6f74 20636c61703f (Answer format: 776f7264)",
    answer: "clock",
    imageUrl: null,
  },
  {
    id: 3,
    type: "morse",
    question:
      "Solve the Riddle: (Try to write the code manually instead of just copy-pasting it. The effort is part of the fun!)",
    answer: "EMBERS NEVER DIE",
    imageUrl: "/phoenix/tech-hunt/morse-code-1.png",
  },
  {
    id: 4,
    type: "video",
    question:
      "https://youtu.be/SQTYLOp3FSI (Focus on the visuals, not the audio)",
    answer: "Potion",
    imageUrl: null,
  },
  {
    id: 5,
    type: "morse",
    question:
      "Solve the Riddle: (Try to write the code manually instead of just copy-pasting it. The effort is part of the fun!)",
    answer: "ONLY FIRE SURVIVES",
    imageUrl: "/phoenix/tech-hunt/morse-code-2.png",
  },
  {
    id: 6,
    type: "hex",
    question:
      "77686174 2072657665616c73 2068696464656e 207061746873 20776974686f7574 20737065616b696e673f (Answer format: 776f7264)",
    answer: "map",
    imageUrl: null,
  },
  {
    id: 7,
    type: "video",
    question:
      "https://youtu.be/GdyiN0_OdUM (Focus on the visuals, not the audio)",
    answer: "Vortex",
    imageUrl: null,
  },
  {
    id: 8,
    type: "morse",
    question:
      "Solve the Riddle: (Try to write the code manually instead of just copy-pasting it. The effort is part of the fun!)",
    answer: "SEEK THE FALLEN WINGS",
    imageUrl: "/phoenix/tech-hunt/morse-code-3.png",
  },
  {
    id: 9,
    type: "image",
    question: "Solve the riddle shown in this image.",
    answer: ["phoenix", "STC", "Student Technical Council"],
    imageUrl: "/phoenix/tech-hunt/riddle-1.png",
  },
  {
    id: 10,
    type: "hex",
    question:
      "77686174 206265636f6d6573 2076616c7561626c65 206f6e6c79 207768656e 2068696464656e3f (Answer format: 776f7264)",
    answer: ["treasure", "secret"],
    imageUrl: null,
  },
  {
    id: 11,
    type: "video",
    question:
      "https://youtu.be/qfoCsvCOM_M (Focus on the visuals, not the audio)",
    answer: "Funny",
    imageUrl: null,
  },
  {
    id: 12,
    type: "image",
    question: "Brightness breaks the illusion",
    answer: "Vault",
    imageUrl: "/phoenix/tech-hunt/ShadowImage-2.png",
  },
  {
    id: 13,
    type: "image",
    question: "Darkness protects the message",
    answer: "Prism",
    imageUrl: "/phoenix/tech-hunt/ShadowImage-3.png",
  },
  {
    id: 14,
    type: "hex",
    question:
      "77686174 2067657473 20776574746572 20746865 206d6f7265 206974 2064726965733f (Answer format: 486578636f6465)",
    answer: "746f77656c",
    imageUrl: null,
  },
  {
    id: 15,
    type: "morse",
    question:
      "Solve the Riddle: (Try to write the code manually instead of just copy-pasting it. The effort is part of the fun!)",
    answer: "THE CODE WAS FRACTURED",
    imageUrl: "/phoenix/tech-hunt/morse-code-4.png",
  },
  {
    id: 16,
    type: "hex",
    question:
      "77686174 206c6f736573 20697473 2068656164 20696e 20746865206d6f726e696e67 20627574 2067657473 206974 206261636b 206174 206e696768743f (Answer format: 486578636f6465)",
    answer: "70696c6c6f77",
    imageUrl: null,
  },
  {
    id: 17,
    type: "image",
    question: "Darkness protects the message",
    answer: "Spell",
    imageUrl: "/phoenix/tech-hunt/ShadowImage-4.png",
  },
  {
    id: 18,
    type: "morse",
    question:
      "Solve the Riddle: (Try to write the code manually instead of just copy-pasting it. The effort is part of the fun!)",
    answer: "THE DISTORTION WAS INTENTIONAL",
    imageUrl: "/phoenix/tech-hunt/morse-code-5.png",
  },
  {
    id: 19,
    type: "hex",
    question:
      "77686174 20686173 206d616e79 206b657973 20627574 2063616e6e6f74 206f70656e 20612073696e676c65 206c6f636b3f (Answer format: 486578636f6465)",
    answer: "7069616e6f",
    imageUrl: null,
  },
];

export const TECH_HUNT_SEED_DATA = [
  {
    teamName: "Do kauri ke detectives",
    leaderName: "Shivam Kumar Singh",
    leaderEmail: "shivam_ua2503cdh566@iitp.ac.in",
    members: [
      {
        name: "Shivam Kumar Singh",
        email: "shivam_ua2503cdh566@iitp.ac.in",
      },
      {
        name: "Kundan Kumar Tiwari",
        email: "kundan_ua2503aih368@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_DO_KAURI_KE_DETECTIV_01",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 19,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 5,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 14,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 4,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 9,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 13,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 15,
        },
      ],
    },
  },
  {
    teamName: "Bhojpuri Bhaukaal",
    leaderName: "Aditya Raj",
    leaderEmail: "aditya_ua2503cdh370@iitp.ac.in",
    members: [
      {
        name: "Aditya Raj",
        email: "aditya_ua2503cdh370@iitp.ac.in",
      },
      {
        name: "Shubham Anand",
        email: "shubham_ua2503aih224@iitp.ac.in",
      },
      {
        name: "Aryan Agrahari",
        email: "aryan_ua2503cdh74@iitp.ac.in",
      },
      {
        name: "Prashant Singh",
        email: "prashant_ua2503cdh212@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_BHOJPURI_BHAUKAAL_02",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 14,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 8,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 3,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 11,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 10,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 16,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 1,
        },
      ],
    },
  },
  {
    teamName: "Khooj gang",
    leaderName: "Sudarshan Pandey",
    leaderEmail: "sudarshan_ua2503cdh511@iitp.ac.in",
    members: [
      {
        name: "Sudarshan Pandey",
        email: "sudarshan_ua2503cdh511@iitp.ac.in",
      },
      {
        name: "Sachin Kumar",
        email: "sachin_ua2503aih189@iitp.ac.in",
      },
      {
        name: "Harshit Kumar",
        email: "harshit_ua2503cdh28@iitp.ac.in",
      },
      {
        name: "Ritesh Kumar",
        email: "ritesh_ua2503aih182@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_KHOOJ_GANG_03",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 9,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 0,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 19,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 2,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 13,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 5,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 10,
        },
      ],
    },
  },
  {
    teamName: "The treasure boys",
    leaderName: "Nishant Kumar",
    leaderEmail: "nishant_ua2503cdh196@iitp.ac.in",
    members: [
      {
        name: "Nishant Kumar",
        email: "nishant_ua2503cdh196@iitp.ac.in",
      },
      {
        name: "Navin kumar",
        email: "navin_ua2504cdh213@iitp.ac.in",
      },
      {
        name: "Kumar Manish Chandra",
        email: "kumar_ua2504aih119@iitp.ac.in",
      },
      {
        name: "Prakhar Srivastava",
        email: "prakhar_ua2503cdh210@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_THE_TREASURE_BOYS_04",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 10,
        },
        {
          level: 2,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 0,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 14,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 8,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 12,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 11,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 16,
        },
      ],
    },
  },
  {
    teamName: "conqueror",
    leaderName: "Aditya Hembram",
    leaderEmail: "aditya_ua2504aih17@iitp.ac.in",
    members: [
      {
        name: "Aditya Hembram",
        email: "aditya_ua2504aih17@iitp.ac.in",
      },
      {
        name: "Subham kumar",
        email: "subham_ua2504aih142@iitp.ac.in",
      },
      {
        name: "Mili Jha",
        email: "mili_ua2504aih128@iitp.ac.in",
      },
      {
        name: "Priyanshu kumar singh",
        email: "priyanshu_ua2504aih163@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_CONQUEROR_05",
      levels: [
        {
          level: 1,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 12,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 11,
        },
        {
          level: 3,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 13,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 9,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 2,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 14,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 1,
        },
      ],
    },
  },
  {
    teamName: "Monarchs",
    leaderName: "Mohammad Taj Ali",
    leaderEmail: "mohammad_ua2504cdh105@iitp.ac.in",
    members: [
      {
        name: "Mohammad Taj Ali",
        email: "mohammad_ua2504cdh105@iitp.ac.in",
      },
      {
        name: "Harsh",
        email: "harsh_ua2504cdh76@iitp.ac.in",
      },
      {
        name: "Mayank",
        email: "mayank_ua2504cdh211@iitp.ac.in",
      },
      {
        name: "Vivek Kumar",
        email: "vivek_us2603aih55@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_MONARCHS_06",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 9,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 0,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 1,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 14,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 8,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 12,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 5,
        },
      ],
    },
  },
  {
    teamName: "cobra kai",
    leaderName: "prince kumar",
    leaderEmail: "prince_ua2503cdh217@iitp.ac.in",
    members: [
      {
        name: "prince kumar",
        email: "prince_ua2503cdh217@iitp.ac.in",
      },
      {
        name: "shubham raj",
        email: "shubham_ua2503cdh506@iitp.ac.in",
      },
      {
        name: "piyush raj",
        email: "piyush_ua2503aih387@iitp.ac.in",
      },
      {
        name: "Akash Sharma",
        email: "akash_ua2503aih22@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_COBRA_KAI_07",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 8,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 0,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 5,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 11,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 7,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 19,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 3,
        },
      ],
    },
  },
  {
    teamName: "The Cipher Crew",
    leaderName: "Md Adnan",
    leaderEmail: "md_us2604aih28@iitp.ac.in",
    members: [
      {
        name: "Md Adnan",
        email: "md_us2604aih28@iitp.ac.in",
      },
      {
        name: "Gangadhar Yadav",
        email: "gangadhar_ua2503aih87@iitp.ac.in",
      },
      {
        name: "Antariksha Singh",
        email: "antariksha_us2603aih14@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_THE_CIPHER_CREW_08",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 13,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 15,
        },
        {
          level: 3,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 5,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 1,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 11,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 16,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 9,
        },
      ],
    },
  },
  {
    teamName: "Cockroach Janta Party",
    leaderName: "Aman Kumar",
    leaderEmail: "aman_ua2503cdh783@iitp.ac.in",
    members: [
      {
        name: "Aman Kumar",
        email: "aman_ua2503cdh783@iitp.ac.in",
      },
      {
        name: "Nikhil Pathak",
        email: "nikhil_ua2503cdh194@iitp.ac.in",
      },
      {
        name: "Kumar Ashish",
        email: "kumar_ua2503cdh158@iitp.ac.in",
      },
      {
        name: "Aman Kumar",
        email: "aman_ua2503cdh782@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_COCKROACH_JANTA_PART_09",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 12,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 2,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 6,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 14,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 11,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 8,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 15,
        },
      ],
    },
  },
  {
    teamName: "Huntx",
    leaderName: "Brijbhushan Ram",
    leaderEmail: "brijbhushan_ua2504aih293@iitp.ac.in",
    members: [
      {
        name: "Brijbhushan Ram",
        email: "brijbhushan_ua2504aih293@iitp.ac.in",
      },
      {
        name: "Sambhavi Kanth",
        email: "sambhavi_ua2504cdh147@iitp.ac.in",
      },
      {
        name: "Saiswarup Rout",
        email: "saisworup_ua2504cdh142@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_HUNTX_10",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 0,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 1,
        },
        {
          level: 3,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 7,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 11,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 2,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 16,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 12,
        },
      ],
    },
  },
  {
    teamName: "Modem",
    leaderName: "Devottam Kumar",
    leaderEmail: "devottam_ua2503cdh403@iitp.ac.in",
    members: [
      {
        name: "Devottam Kumar",
        email: "devottam_ua2503cdh403@iitp.ac.in",
      },
      {
        name: "Suhread Maity",
        email: "suhread_ua2503cdh320@iitp.ac.in",
      },
      {
        name: "Gaurik Mehrotra",
        email: "Gaurik_ua2504aih300@iitp.ac.in",
      },
      {
        name: "Ashwin Singh",
        email: "ashwin_ua2504aih55@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_MODEM_11",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 15,
        },
        {
          level: 2,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 16,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 4,
        },
        {
          level: 4,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 17,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 12,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 6,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 5,
        },
      ],
    },
  },
  {
    teamName: "Team Cit",
    leaderName: "Utsav Raj",
    leaderEmail: "utsav_ua2503aih260@iitp.ac.in",
    members: [
      {
        name: "Utsav Raj",
        email: "utsav_ua2503aih260@iitp.ac.in",
      },
      {
        name: "Shahid",
        email: "shahid_ua2504aih209@iitp.ac.in",
      },
      {
        name: "Aditya",
        email: "aditya_ua2503cdh537@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_TEAM_CIT_12",
      levels: [
        {
          level: 1,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 4,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 14,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 0,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 1,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 5,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 11,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 6,
        },
      ],
    },
  },
  {
    teamName: "Ximo",
    leaderName: "Gunraj Kumar",
    leaderEmail: "gunraj_ua2503cdh543@iitp.ac.in",
    members: [
      {
        name: "Gunraj Kumar",
        email: "gunraj_ua2503cdh543@iitp.ac.in",
      },
      {
        name: "Hemant Kumar",
        email: "hemant_ua2503cdh130@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_XIMO_13",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 3,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 7,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 4,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 9,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 8,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 2,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 5,
        },
      ],
    },
  },
  {
    teamName: "Pirates of the Ganges",
    leaderName: "ADITYA KUMAR",
    leaderEmail: "aditya_ua2503cdh22@iitp.ac.in",
    members: [
      {
        name: "ADITYA KUMAR",
        email: "aditya_ua2503cdh22@iitp.ac.in",
      },
      {
        name: "HIMANSHU KUMAR",
        email: "himanshu_ua2503cdh644@iitp.ac.in",
      },
      {
        name: "Aditya kumar",
        email: "aditya_ua2503cdh367@iitp.ac.in",
      },
      {
        name: "Jitesh kumar",
        email: "jitesh_ua2503cdh419@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_PIRATES_OF_THE_GANGE_14",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 9,
        },
        {
          level: 2,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 2,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 12,
        },
        {
          level: 4,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 6,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 10,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 18,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 15,
        },
      ],
    },
  },
  {
    teamName: "Shreya",
    leaderName: "Shreya Kumari",
    leaderEmail: "shreya_ua2503aih221@iitp.ac.in",
    members: [
      {
        name: "Shreya Kumari",
        email: "shreya_ua2503aih221@iitp.ac.in",
      },
      {
        name: "Vaishnavi Rastogi",
        email: "vaishnavi_ua2503aih262@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_SHREYA_16",
      levels: [
        {
          level: 1,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 18,
        },
        {
          level: 2,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 3,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 12,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 5,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 16,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 11,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 4,
        },
      ],
    },
  },
  {
    teamName: "Scarlett Orbit",
    leaderName: "Anushka Kumari",
    leaderEmail: "anushka_ua2503cdh609@iitp.ac.in",
    members: [
      {
        name: "Anushka Kumari",
        email: "anushka_ua2503cdh609@iitp.ac.in",
      },
      {
        name: "Salini Maurya",
        email: "salini_ua2503aih398@iitp.ac.in",
      },
      {
        name: "Saksham Kumar Ray",
        email: "saksham_ua2503aih397@iitp.ac.in",
      },
      {
        name: "Abhinav Mayur Chavan",
        email: "abhinav_ua2504aih287@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_SCARLETT_ORBIT_17",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 0,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 4,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 17,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 16,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 18,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 13,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 2,
        },
      ],
    },
  },
  {
    teamName: "Team Tejas",
    leaderName: "Harsh Naithani",
    leaderEmail: "harsh_ua2503aih360@iitp.ac.in",
    members: [
      {
        name: "Harsh Naithani",
        email: "harsh_ua2503aih360@iitp.ac.in",
      },
      {
        name: "Syed Ayaan Ahmed",
        email: "syed_ua2503aih418@iitp.ac.in",
      },
      {
        name: "Sourav Singh",
        email: "sourav_ua2504cdh163@iitp.ac.in",
      },
      {
        name: "Ravindra Bisht",
        email: "ravindra_ua2503aih303@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_TEAM_TEJAS_18",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 6,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 13,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 17,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 5,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 11,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 15,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 19,
        },
      ],
    },
  },
  {
    teamName: "Code Blooded",
    leaderName: "Sayan gain",
    leaderEmail: "sayan_25s12res152@iitp.ac.in",
    members: [
      {
        name: "Sayan gain",
        email: "sayan_25s12res152@iitp.ac.in",
      },
      {
        name: "Arnab Pradhan",
        email: "arnab_25s12res49@iitp.ac.in",
      },
      {
        name: "Satyam Rajput",
        email: "satyam_25s12res149@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_CODE_BLOODED_19",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 6,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 3,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 17,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 16,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 13,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 2,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 7,
        },
      ],
    },
  },
  {
    teamName: "striker",
    leaderName: "Pranav Kumar",
    leaderEmail: "pranav_ua2504aih317@iitp.ac.in",
    members: [
      {
        name: "Pranav Kumar",
        email: "pranav_ua2504aih317@iitp.ac.in",
      },
      {
        name: "Rounak kumar",
        email: "rounak_ua2503cdh242@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_STRIKER_20",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 18,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 13,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 15,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 11,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 2,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 3,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 5,
        },
      ],
    },
  },
  {
    teamName: "Team Biraj",
    leaderName: "Sahil Kumar Jha",
    leaderEmail: "sahil_ua2503cdh250@iitp.ac.in",
    members: [
      {
        name: "Sahil Kumar Jha",
        email: "sahil_ua2503cdh250@iitp.ac.in",
      },
      {
        name: "Anish Kumar",
        email: "anish_ua2504aih35@iitp.ac.in",
      },
      {
        name: "Abhishek Choudhary",
        email: "abhishek_ua2503cdh10@iitp.ac.in",
      },
      {
        name: "Drishan Roy",
        email: "drishan_ua2504cdh68@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_TEAM_BIRAJ_21",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 7,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 10,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 9,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 3,
        },
        {
          level: 5,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 11,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 6,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 19,
        },
      ],
    },
  },
  {
    teamName: "Prachhann Vedhak (प्रच्छन्न वेधक)",
    leaderName: "Shubham Shree",
    leaderEmail: "shubham_ua2503cdh301@iitp.ac.in",
    members: [
      {
        name: "Shubham Shree",
        email: "shubham_ua2503cdh301@iitp.ac.in",
      },
      {
        name: "Madhukar Kumar",
        email: "madhukar_ua2504aih122@iitp.ac.in",
      },
      {
        name: "Pushkar Kumar",
        email: "pushkar_ua2503aih171@iitp.ac.in",
      },
      {
        name: "Jay Prakash",
        email: "jay_ua2503aih293@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_PRACHHANN_VEDHAK_परच_22",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 4,
        },
        {
          level: 2,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 7,
        },
        {
          level: 3,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 0,
        },
        {
          level: 4,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 13,
        },
        {
          level: 5,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 12,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 19,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 16,
        },
      ],
    },
  },
  {
    teamName: "Techlions",
    leaderName: "Ankur Verma",
    leaderEmail: "ankur_ua2503cdh57@iitp.ac.in",
    members: [
      {
        name: "Ankur Verma",
        email: "ankur_ua2503cdh57@iitp.ac.in",
      },
      {
        name: "Shivam Singh",
        email: "shivam_ua2503cdh287@iitp.ac.in",
      },
      {
        name: "Aditya Ojha",
        email: "aditya_ua2503cdh588@iitp.ac.in",
      },
      {
        name: "Dibyansh Yadav",
        email: "dibyansh_ua2503cdh109@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_TECHLIONS_23",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 14,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 15,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 19,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 4,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 2,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 9,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 18,
        },
      ],
    },
  },
  {
    teamName: "Pratyush Pathak",
    leaderName: "Pratyush Pathak",
    leaderEmail: "pratyush_ua2504cdh127@iitp.ac.in",
    members: [
      {
        name: "Pratyush Pathak",
        email: "pratyush_ua2504cdh127@iitp.ac.in",
      },
      {
        name: "Gourav dahiya",
        email: "gourav_ua2504cdh200@iitp.ac.in",
      },
      {
        name: "Nitika",
        email: "nitika_ua2504cdh113@iitp.ac.in",
      },
      {
        name: "Piyush raj",
        email: "piyush_ua2504cdh117@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_PRATYUSH_PATHAK_25",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 16,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 7,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 2,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 15,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 12,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 5,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 0,
        },
      ],
    },
  },
  {
    teamName: "Team CID",
    leaderName: "Lakshya Kumar",
    leaderEmail: "lakshya_ua2504aih310@iitp.ac.in",
    members: [
      {
        name: "Lakshya Kumar",
        email: "lakshya_ua2504aih310@iitp.ac.in",
      },
      {
        name: "Pratyush wats",
        email: "Pratyush_ua2503cdh681@iitp.ac.in",
      },
      {
        name: "Bipul kumar",
        email: "bipul_ua2503cdh99@iitp.ac.in",
      },
      {
        name: "Kaushal",
        email: "kaushal_ua2503aih109@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_TEAM_CID_26",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 9,
        },
        {
          level: 2,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 5,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 0,
        },
        {
          level: 4,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 12,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 7,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 3,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 17,
        },
      ],
    },
  },
  {
    teamName: "Ctrl+Find",
    leaderName: "Ayush Singh",
    leaderEmail: "ayush_ua2503cdh93@iitp.ac.in",
    members: [
      {
        name: "Ayush Singh",
        email: "ayush_ua2503cdh93@iitp.ac.in",
      },
      {
        name: "Shivaji Maurya",
        email: "shivaji_ua2503cdh280@iitp.ac.in",
      },
      {
        name: "Nitin Kumar Nogiya",
        email: "nitin_ua2503cdh672@iitp.ac.in",
      },
      {
        name: "Pratik Kumar",
        email: "Pratik_ua2503cdh557@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_CTRLFIND_27",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 13,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 15,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 2,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 8,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 1,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 11,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 16,
        },
      ],
    },
  },
  {
    teamName: "The Horcrux Hunters",
    leaderName: "Mayank Raj",
    leaderEmail: "mayank_ua2503cdh659@iitp.ac.in",
    members: [
      {
        name: "Mayank Raj",
        email: "mayank_ua2503cdh659@iitp.ac.in",
      },
      {
        name: "Arijit Tiwari",
        email: "arijit_ua2503cdh610@iitp.ac.in",
      },
      {
        name: "Akash Kumar",
        email: "akash_ua2504cdh189@iitp.ac.in",
      },
      {
        name: "Kunal Raj",
        email: "Kunal_ua2504cdh93@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_THE_HORCRUX_HUNTERS_28",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 11,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 5,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 7,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 8,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 1,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 6,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 0,
        },
      ],
    },
  },
  {
    teamName: "SherUnlock Holmes",
    leaderName: "Shantanu Raj",
    leaderEmail: "shantanu_ua2504aih211@iitp.ac.in",
    members: [
      {
        name: "Shantanu Raj",
        email: "shantanu_ua2504aih211@iitp.ac.in",
      },
      {
        name: "Soumya Raj",
        email: "soumya_ua2503aih237@iitp.ac.in",
      },
      {
        name: "Keerat Mala",
        email: "keerat_ua2504cdh205@iitp.ac.in",
      },
      {
        name: "Divyanshu",
        email: "divyanshu_ua2504aih87@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_SHERUNLOCK_HOLMES_30",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 2,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 0,
        },
        {
          level: 3,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 16,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 17,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 19,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 5,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 1,
        },
      ],
    },
  },
  {
    teamName: "Mystery masters",
    leaderName: "Anand kumar",
    leaderEmail: "anand_ua2504cdh191@iitp.ac.in",
    members: [
      {
        name: "Anand kumar",
        email: "anand_ua2504cdh191@iitp.ac.in",
      },
      {
        name: "Abhishek kumar",
        email: "abhishek_ua2503cdh14@iitp.ac.in",
      },
      {
        name: "Sumit kumar",
        email: "sumit_ua2504cdh169@iitp.ac.in",
      },
      {
        name: "Suraj Kumar Tiwary",
        email: "suraj_ua2503aih417@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_MYSTERY_MASTERS_31",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 2,
        },
        {
          level: 2,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 10,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 14,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 6,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 13,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 0,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 9,
        },
      ],
    },
  },
  {
    teamName: "Chaar chorva",
    leaderName: "Vaishnavi Mishra",
    leaderEmail: "vaishnavi_ua2503cdh523@iitp.ac.in",
    members: [
      {
        name: "Vaishnavi Mishra",
        email: "vaishnavi_ua2503cdh523@iitp.ac.in",
      },
      {
        name: "Prasun Mukherjee",
        email: "prasun_ua2503cdh213@iitp.ac.in",
      },
      {
        name: "Anshu priyambada",
        email: "anshu_ua2504aih346@iitp.ac.in",
      },
      {
        name: "Vaibhav Singh Srinate",
        email: "vaibhav_ua2504aih340@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_CHAAR_CHORVA_32",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 17,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 14,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 1,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 9,
        },
        {
          level: 5,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 10,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 19,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 12,
        },
      ],
    },
  },
  {
    teamName: "Keromancy",
    leaderName: "Anshu Raj",
    leaderEmail: "anshu_ua2504cdh32@iitp.ac.in",
    members: [
      {
        name: "Anshu Raj",
        email: "anshu_ua2504cdh32@iitp.ac.in",
      },
      {
        name: "Mayank Kumar",
        email: "mayank_ua2503cdh430@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_KEROMANCY_33",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 2,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 18,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 17,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 1,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 16,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 8,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 10,
        },
      ],
    },
  },
  {
    teamName: "THUG OF BIHAR",
    leaderName: "kartavya kothari",
    leaderEmail: "kartavya_ua2503cdh146@iitp.ac.in",
    members: [
      {
        name: "kartavya kothari",
        email: "kartavya_ua2503cdh146@iitp.ac.in",
      },
      {
        name: "Anil jaiswal",
        email: "anil_ua2503cdh48@iitp.ac.in",
      },
      {
        name: "Abhay Krishn Sinha",
        email: "abhay_ua2503cdh360@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_THUG_OF_BIHAR_34",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 8,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 5,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 13,
        },
        {
          level: 4,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 16,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 14,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 9,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 3,
        },
      ],
    },
  },
  {
    teamName: "Exception's",
    leaderName: "Agam Kumar",
    leaderEmail: "agam_ua2503cdh374@iitp.ac.in",
    members: [
      {
        name: "Agam Kumar",
        email: "agam_ua2503cdh374@iitp.ac.in",
      },
      {
        name: "Nishant Kumar",
        email: "nishant_ua2503cdh446@iitp.ac.in",
      },
      {
        name: "Amrit Kumar",
        email: "amrit_ua2504cdh190@iitp.ac.in",
      },
      {
        name: "Ashutosh",
        email: "ashutosh_ua2503cdh540@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_EXCEPTIONS_35",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 14,
        },
        {
          level: 2,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 15,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 19,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 4,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 10,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 9,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 6,
        },
      ],
    },
  },
  {
    teamName: "char bhai charo tabahi",
    leaderName: "Shubham Kumar Gupta",
    leaderEmail: "shubham_2312res631@iitp.ac.in",
    members: [
      {
        name: "Shubham Kumar Gupta",
        email: "shubham_2312res631@iitp.ac.in",
      },
      {
        name: "Anurag Verma",
        email: "anurag_2312res150@iitp.ac.in",
      },
      {
        name: "Saurabh Mehta",
        email: "saurabh_2312res896@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_CHAR_BHAI_CHARO_TABA_36",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 14,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 8,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 11,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 13,
        },
        {
          level: 5,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 19,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 6,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 12,
        },
      ],
    },
  },
  {
    teamName: "Loveday lehsan",
    leaderName: "Katyayani Mishra",
    leaderEmail: "katyayani_24a12res306@iitp.ac.in",
    members: [
      {
        name: "Katyayani Mishra",
        email: "katyayani_24a12res306@iitp.ac.in",
      },
      {
        name: "Shruti Kumari",
        email: "shruti_2312res898@iitp.ac.in",
      },
      {
        name: "Yuvraj Singh",
        email: "yuv_24a12res789@iitp.ac.in",
      },
      {
        name: "Arunesh",
        email: "arunesh_24a12res142@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_LOVEDAY_LEHSAN_37",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 8,
        },
        {
          level: 2,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 14,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 2,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 19,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 7,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 5,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 6,
        },
      ],
    },
  },
  {
    teamName: "Core Team",
    leaderName: "ADITYA KUMAR",
    leaderEmail: "aditya_ua2503aih276@iitp.ac.in",
    members: [
      {
        name: "ADITYA KUMAR",
        email: "aditya_ua2503aih276@iitp.ac.in",
      },
      {
        name: "Vedant Mishra",
        email: "vedant_ua2504cdh183@iitp.ac.in",
      },
      {
        name: "Priyanshu garg",
        email: "priyanshu_ua2503aih300@iitp.ac.in",
      },
      {
        name: "Mayank kumar",
        email: "mayank_ua2503cdh431@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_CORE_TEAM_38",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 9,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 16,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 4,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 14,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 3,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 12,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 15,
        },
      ],
    },
  },
  {
    teamName: "Mission Impossible",
    leaderName: "Divyansh Deep",
    leaderEmail: "divyansh_ua2503aih86@iitp.ac.in",
    members: [
      {
        name: "Divyansh Deep",
        email: "divyansh_ua2503aih86@iitp.ac.in",
      },
      {
        name: "Saurabh Kumar Pathak",
        email: "saurabh_ua2503aih404@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_MISSION_IMPOSSIBLE_39",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 0,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 10,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 19,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 12,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 7,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 18,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 2,
        },
      ],
    },
  },
  {
    teamName: "Phantom alliance",
    leaderName: "Rishikesh raj",
    leaderEmail: "rishikesh_24a12res1248@iitp.ac.in",
    members: [
      {
        name: "Rishikesh raj",
        email: "rishikesh_24a12res1248@iitp.ac.in",
      },
      {
        name: "Ranveer raj",
        email: "ranveer_24a12res1045@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_PHANTOM_ALLIANCE_40",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 6,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 13,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 2,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 16,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 14,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 1,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 8,
        },
      ],
    },
  },
  {
    teamName: "Cheetah Group",
    leaderName: "Aadarsh Mithilesh Mishra",
    leaderEmail: "aadarsh_ua2504aih281@iitp.ac.in",
    members: [
      {
        name: "Aadarsh Mithilesh Mishra",
        email: "aadarsh_ua2504aih281@iitp.ac.in",
      },
      {
        name: "Tanveer",
        email: "tanveer_ua2504aih252@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_CHEETAH_GROUP_41",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 13,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 14,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 11,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 8,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 10,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 5,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 2,
        },
      ],
    },
  },
  {
    teamName: "Brainiac Blitz",
    leaderName: "Abhinav Kumar",
    leaderEmail: "abhinav_ua2504cdh08@iitp.ac.in",
    members: [
      {
        name: "Abhinav Kumar",
        email: "abhinav_ua2504cdh08@iitp.ac.in",
      },
      {
        name: "Akanksha Mishra",
        email: "akanksha_ua2503cdh32@iitp.ac.in",
      },
      {
        name: "Aditya Raj",
        email: "aditya_ua2503cdh371@iitp.ac.in",
      },
      {
        name: "Abhinav Kumar",
        email: "abhinav_ua2503cdh05@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_BRAINIAC_BLITZ_42",
      levels: [
        {
          level: 1,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 2,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 9,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 0,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 6,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 7,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 12,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 8,
        },
      ],
    },
  },
  {
    teamName: "Shadow Ninjas",
    leaderName: "Akash Sharma",
    leaderEmail: "akash_ua2503aih22@iitp.ac.in",
    members: [
      {
        name: "Akash Sharma",
        email: "akash_ua2503aih22@iitp.ac.in",
      },
      {
        name: "Ayush Sharma",
        email: "ayush_ua2503aih68@iitp.ac.in",
      },
      {
        name: "Kunal Kumar Sharma",
        email: "kunal_ua2503cdh428@iitp.ac.in",
      },
      {
        name: "Prince Kumar",
        email: "prince_ua2503cdh217@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_SHADOW_NINJAS_43",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 6,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 11,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 7,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 17,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 1,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 19,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 10,
        },
      ],
    },
  },
  {
    teamName: "Chakra",
    leaderName: "Naman pannalal keshari",
    leaderEmail: "naman_ua2503cdh189@iitp.ac.in",
    members: [
      {
        name: "Naman pannalal keshari",
        email: "naman_ua2503cdh189@iitp.ac.in",
      },
      {
        name: "Suraj pandey",
        email: "suraj_ua2503cdh514@iitp.ac.in",
      },
      {
        name: "Sudarshan pandey",
        email: "sudarshan_ua2503cdh511@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_CHAKRA_44",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 6,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 11,
        },
        {
          level: 3,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 8,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 16,
        },
        {
          level: 5,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 2,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 14,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 1,
        },
      ],
    },
  },
  {
    teamName: "Velvet clues",
    leaderName: "Ahana",
    leaderEmail: "ahana_25s12res16@iitp.ac.in",
    members: [
      {
        name: "Ahana",
        email: "ahana_25s12res16@iitp.ac.in",
      },
      {
        name: "Raj Raushan",
        email: "raj_25s12res210@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_VELVET_CLUES_45",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 0,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 13,
        },
        {
          level: 3,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 14,
        },
        {
          level: 4,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 8,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 5,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 7,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 11,
        },
      ],
    },
  },
  {
    teamName: "Puzzle Pirates",
    leaderName: "Arunima Ganguly",
    leaderEmail: "arunima_ua2503cdh388@iitp.ac.in",
    members: [
      {
        name: "Arunima Ganguly",
        email: "arunima_ua2503cdh388@iitp.ac.in",
      },
      {
        name: "Dilasha Paul",
        email: "dilasha_ua2504cdh199@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_PUZZLE_PIRATES_46",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 8,
        },
        {
          level: 2,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 2,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 6,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 7,
        },
        {
          level: 5,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 10,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 12,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 5,
        },
      ],
    },
  },
  {
    teamName: "Mind Hunters",
    leaderName: "Taj Priyadarshi",
    leaderEmail: "taj_ua2503cdh745@iitp.ac.in",
    members: [
      {
        name: "Taj Priyadarshi",
        email: "taj_ua2503cdh745@iitp.ac.in",
      },
      {
        name: "Antra Priyadarshini",
        email: "antra_ua2503cdh63@iitp.ac.in",
      },
      {
        name: "Raj Priyadarshi",
        email: "raj_ua2503cdh689@iitp.ac.in",
      },
      {
        name: "Viahnavi Yadav",
        email: "vaishnavi_ua2503cdh756@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_MIND_HUNTERS_48",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 6,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 16,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 14,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 5,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 12,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 3,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 13,
        },
      ],
    },
  },
  {
    teamName: "Knights of the Grid",
    leaderName: "Prashant Kumar",
    leaderEmail: "prashant_ua2504aih153@iitp.ac.in",
    members: [
      {
        name: "Prashant Kumar",
        email: "prashant_ua2504aih153@iitp.ac.in",
      },
      {
        name: "Kritikesh Shandilya",
        email: "kritikesh_ua2503cdh155@iitp.ac.in",
      },
      {
        name: "Prince Kumar",
        email: "prince_ua2503aih161@iitp.ac.in",
      },
      {
        name: "Kundan Sahani",
        email: "kundan_ua2503aih115@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_KNIGHTS_OF_THE_GRID_49",
      levels: [
        {
          level: 1,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 5,
        },
        {
          level: 2,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 6,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 18,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 15,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 11,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 8,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 7,
        },
      ],
    },
  },
  {
    teamName: "404: Hunt Not Found",
    leaderName: "Adarsh Raj Sisodiya",
    leaderEmail: "adarsh_ua2504aih14@iitp.ac.in",
    members: [
      {
        name: "Adarsh Raj Sisodiya",
        email: "adarsh_ua2504aih14@iitp.ac.in",
      },
      {
        name: "Adarsh Raj",
        email: "adarsh_ua2503aih10@iitp.ac.in",
      },
      {
        name: "Nikhil Kumar Singh",
        email: "nikhil_ua2503cdh798@iitp.ac.in",
      },
      {
        name: "Satyam Raj Sundaram",
        email: "satyam_ua2503aih199@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_404_HUNT_NOT_FOUND_50",
      levels: [
        {
          level: 1,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 0,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 9,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 4,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 19,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 12,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 14,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 3,
        },
      ],
    },
  },
  {
    teamName: "AegisAI",
    leaderName: "Arman Kumar",
    leaderEmail: "arman_ua2503cdh386@iitp.ac.in",
    members: [
      {
        name: "Arman Kumar",
        email: "arman_ua2503cdh386@iitp.ac.in",
      },
      {
        name: "Anuj Kumar",
        email: "anuj_ua2504cdh33@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_AEGISAI_51",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 13,
        },
        {
          level: 2,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 19,
        },
        {
          level: 3,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 11,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 16,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 12,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 9,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 3,
        },
      ],
    },
  },
  {
    teamName: "Clueless Crew",
    leaderName: "Vinayak Dhiman",
    leaderEmail: "vinayak_us2603cdh71@iitp.ac.in",
    members: [
      {
        name: "Vinayak Dhiman",
        email: "vinayak_us2603cdh71@iitp.ac.in",
      },
      {
        name: "Raushan Kumar Pathak",
        email: "raushan_us2603aih68@iitp.ac.in",
      },
      {
        name: "Ravi Kant",
        email: "ravi_us2603cdh88@iitp.ac.in",
      },
      {
        name: "Sarthak Dixit",
        email: "sarthak_us2603aih70@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_CLUELESS_CREW_52",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 10,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 17,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 13,
        },
        {
          level: 4,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 16,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 2,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 9,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 5,
        },
      ],
    },
  },
  {
    teamName: "ModiPaglus",
    leaderName: "Anirudh Sharma",
    leaderEmail: "anirudh_ua2503cdh50@iitp.ac.in",
    members: [
      {
        name: "Anirudh Sharma",
        email: "anirudh_ua2503cdh50@iitp.ac.in",
      },
      {
        name: "Harsh patel",
        email: "harsh_ua2504aih97@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_MODIPAGLUS_53",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 12,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 0,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 9,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 1,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 5,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 15,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 11,
        },
      ],
    },
  },
  {
    teamName: "Gryffindor",
    leaderName: "Gaurav Kumar",
    leaderEmail: "gaurav_ua2504cdh70@iitp.ac.in",
    members: [
      {
        name: "Gaurav Kumar",
        email: "gaurav_ua2504cdh70@iitp.ac.in",
      },
      {
        name: "Shivam Kumar",
        email: "shivam_ua2503aih210@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_GRYFFINDOR_54",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 9,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 1,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 7,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 3,
        },
        {
          level: 5,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 11,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 10,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 15,
        },
      ],
    },
  },
  {
    teamName: "Power Rangers",
    leaderName: "Subham Prasad Nayak",
    leaderEmail: "subham_ua2503cdh316@iitp.ac.in",
    members: [
      {
        name: "Subham Prasad Nayak",
        email: "subham_ua2503cdh316@iitp.ac.in",
      },
      {
        name: "Shreya Kumari",
        email: "shreya_ua2503aih408@iitp.ac.in",
      },
      {
        name: "Shourya Mishra",
        email: "shourya_ua2503aih217@iitp.ac.in",
      },
      {
        name: "Bhumika Sharma",
        email: "bhumika_ua2503aih79@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_POWER_RANGERS_55",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 4,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 1,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 13,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 2,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 0,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 14,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 8,
        },
      ],
    },
  },
  {
    teamName: "Looters",
    leaderName: "Kanishk Dubey",
    leaderEmail: "kanishk_ua2504cdh85@iitp.ac.in",
    members: [
      {
        name: "Kanishk Dubey",
        email: "kanishk_ua2504cdh85@iitp.ac.in",
      },
      {
        name: "Suryokanto",
        email: "Suryokanto_ua2503aih253@iitp.ac.in",
      },
      {
        name: "Pratishtha Birla",
        email: "pratishtha_ua2504cdh243@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_LOOTERS_56",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 17,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 6,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 14,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 3,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 13,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 11,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 0,
        },
      ],
    },
  },
  {
    teamName: "arrayofexellence",
    leaderName: "Aditya Adep",
    leaderEmail: "aditya_ua2504aih22@iitp.ac.in",
    members: [
      {
        name: "Aditya Adep",
        email: "aditya_ua2504aih22@iitp.ac.in",
      },
      {
        name: "Sharma Parvin Kumar",
        email: "shama_ua2503chd272@iitp.ac.in",
      },
      {
        name: "Huzaifa Ansari",
        email: "md_ua2503cdh177@iitp.ac.in",
      },
      {
        name: "Anurag Singh",
        email: "anurag_ua2503cdh66@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_ARRAYOFEXELLENCE_57",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 19,
        },
        {
          level: 2,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 13,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 3,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 11,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 0,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 4,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 9,
        },
      ],
    },
  },
  {
    teamName: "Debug Boyz 2.0",
    leaderName: "Shrey Kumar",
    leaderEmail: "shrey_24a12res1104@iitp.ac.in",
    members: [
      {
        name: "Shrey Kumar",
        email: "shrey_24a12res1104@iitp.ac.in",
      },
      {
        name: "Shubham Kumar",
        email: "shubham_24a12res1108@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_DEBUG_BOYZ_20_58",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 1,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 12,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 14,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 15,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 8,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 6,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 17,
        },
      ],
    },
  },
  {
    teamName: "No Fear Eastern Winds",
    leaderName: "Abhay chourasia",
    leaderEmail: "abhay_24a12res16@iitp.ac.in",
    members: [
      {
        name: "Abhay chourasia",
        email: "abhay_24a12res16@iitp.ac.in",
      },
      {
        name: "Purba Madhur",
        email: "purba_24a12res483@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_NO_FEAR_EASTERN_WIND_59",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 4,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 0,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 12,
        },
        {
          level: 4,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 15,
        },
        {
          level: 5,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 8,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 11,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 14,
        },
      ],
    },
  },
  {
    teamName: "Bhoola kabutar",
    leaderName: "Aayush Babu",
    leaderEmail: "aayush_25s12res03@iitp.ac.in",
    members: [
      {
        name: "Aayush Babu",
        email: "aayush_25s12res03@iitp.ac.in",
      },
      {
        name: "Soni Priya",
        email: "soni_ua2503cdh734@iitp.ac.in",
      },
      {
        name: "Aparna Singh",
        email: "aparna_ua2503aih52@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_BHOOLA_KABUTAR_60",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 13,
        },
        {
          level: 2,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 0,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 8,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 3,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 1,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 15,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 12,
        },
      ],
    },
  },
  {
    teamName: "APJ SENA",
    leaderName: "Amarjeet Kumar",
    leaderEmail: "amarjeet_24a12res78@iitp.ac.in",
    members: [
      {
        name: "Amarjeet Kumar",
        email: "amarjeet_24a12res78@iitp.ac.in",
      },
      {
        name: "Pragati Phuloria",
        email: "jayati_ua2504cdh83@iitp.ac.in",
      },
      {
        name: "Pragati Aggarwal",
        email: "pragati_ua2501bbh65@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_APJ_SENA_61",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 18,
        },
        {
          level: 2,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 3,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 8,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 5,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 1,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 2,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 17,
        },
      ],
    },
  },
  {
    teamName: "Tere naina",
    leaderName: "Anshika Awasthi",
    leaderEmail: "anshika_25s12res222@iitp.ac.in",
    members: [
      {
        name: "Anshika Awasthi",
        email: "anshika_25s12res222@iitp.ac.in",
      },
      {
        name: "Raunak singh",
        email: "raunak_25s12res133@iitp.ac.in",
      },
      {
        name: "Yash Mishra",
        email: "yash_25s12res222@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_TERE_NAINA_62",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 14,
        },
        {
          level: 2,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 10,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 11,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 13,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 16,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 6,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 18,
        },
      ],
    },
  },
  {
    teamName: "The Smashers",
    leaderName: "Shubham Pandey",
    leaderEmail: "shubham_us2604aih40@iitp.ac.in",
    members: [
      {
        name: "Shubham Pandey",
        email: "shubham_us2604aih40@iitp.ac.in",
      },
      {
        name: "Ajeet Rathod",
        email: "rathod_us2603aih39@iitp.ac.in",
      },
      {
        name: "Maruti Nandan Bagherwal",
        email: "maruti_us2604aih48@iitp.ac.in",
      },
      {
        name: "Akhilesh",
        email: "akhilesh_us2603aih08@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_THE_SMASHERS_63",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 0,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 14,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 10,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 13,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 16,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 12,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 3,
        },
      ],
    },
  },
  {
    teamName: "The Pirates",
    leaderName: "Gyanshu",
    leaderEmail: "gyanshu_us2603cdh83@iitp.ac.in",
    members: [
      {
        name: "Gyanshu",
        email: "gyanshu_us2603cdh83@iitp.ac.in",
      },
      {
        name: "Ashutosh Kumar Santosh",
        email: "ashutosh_us2604aih12@iitp.ac.in",
      },
      {
        name: "Saksham kumar tiwari",
        email: "saksham_us2604cdh25@iitp.ac.in",
      },
      {
        name: "Razat Pratap Singh",
        email: "razat_us2604aih36@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_THE_PIRATES_64",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 10,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 2,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 5,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 13,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 4,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 14,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 16,
        },
      ],
    },
  },
  {
    teamName: "Team alpha",
    leaderName: "Md Kashif ajmal",
    leaderEmail: "md_us2603cdh34@iitp.ac.in",
    members: [
      {
        name: "Md Kashif ajmal",
        email: "md_us2603cdh34@iitp.ac.in",
      },
      {
        name: "Abdur Rahman",
        email: "abdur_us2604cdh02@iitp.ac.in",
      },
      {
        name: "Ashish Kumar Pandey",
        email: "ashish_us2603cdh20@iitp.ac.in",
      },
      {
        name: "Fahim alam",
        email: "fahim_us2604aih19@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_TEAM_ALPHA_65",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 2,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 8,
        },
        {
          level: 3,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 14,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 15,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 11,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 7,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 12,
        },
      ],
    },
  },
  {
    teamName: "Mystery milii",
    leaderName: "Abhishek Gupta",
    leaderEmail: "abhishek_ua2504aih11@iitp.ac.in",
    members: [
      {
        name: "Abhishek Gupta",
        email: "abhishek_ua2504aih11@iitp.ac.in",
      },
      {
        name: "MD Ayan",
        email: "md_ua2503cdh794@iitp.ac.in",
      },
      {
        name: "Anurag saroj",
        email: "anurag_ua2504aih41@iitp.ac.in",
      },
      {
        name: "Aditya upadhyay",
        email: "aditya_ua2504cdh16@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_MYSTERY_MILII_66",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 3,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 8,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 4,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 13,
        },
        {
          level: 5,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 0,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 18,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 15,
        },
      ],
    },
  },
  {
    teamName: "Krishna",
    leaderName: "Shivam Kumar",
    leaderEmail: "shivam_ua2503aih208@iitp.ac.in",
    members: [
      {
        name: "Shivam Kumar",
        email: "shivam_ua2503aih208@iitp.ac.in",
      },
      {
        name: "Shashank Kumar",
        email: "shashank_ua2503aih406@iitp.ac.in",
      },
      {
        name: "Vikash Kumar",
        email: "vikash_ua2504cdh184@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_KRISHNA_67",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 5,
        },
        {
          level: 2,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 3,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 17,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 0,
        },
        {
          level: 5,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 13,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 16,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 15,
        },
      ],
    },
  },
  {
    teamName: "TREE-SHOOL",
    leaderName: "Sheodutta Shivam",
    leaderEmail: "sheodutta_ua2504aih214@iitp.ac.in",
    members: [
      {
        name: "Sheodutta Shivam",
        email: "sheodutta_ua2504aih214@iitp.ac.in",
      },
      {
        name: "Rahul Raj",
        email: "rahul_ua2503cdh466@iitp.ac.in",
      },
      {
        name: "Mohit Kumar",
        email: "mohit_ua2503cdh186@iitp.ac.in",
      },
      {
        name: "Bagul Shlok Nitin",
        email: "bagul_ua2504aih349@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_TREESHOOL_68",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 8,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 1,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 11,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 19,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 18,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 2,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 7,
        },
      ],
    },
  },
  {
    teamName: "Marvelous Soldiers",
    leaderName: "DIPANKAR BISWAS",
    leaderEmail: "dipankar_ua2504aih297@iitp.ac.in",
    members: [
      {
        name: "DIPANKAR BISWAS",
        email: "dipankar_ua2504aih297@iitp.ac.in",
      },
      {
        name: "kaushal kumar jha",
        email: "kaushal_ua2504aih112@iitp.ac.in",
      },
      {
        name: "kundan kumar",
        email: "kundan_ua2503aih445@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_MARVELOUS_SOLDIERS_69",
      levels: [
        {
          level: 1,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 0,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 5,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 13,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 14,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 11,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 1,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 12,
        },
      ],
    },
  },
  {
    teamName: "The Scouts",
    leaderName: "Subha Paul",
    leaderEmail: "subha_ua2503cdh735@iitp.ac.in",
    members: [
      {
        name: "Subha Paul",
        email: "subha_ua2503cdh735@iitp.ac.in",
      },
      {
        name: "Sidhant sharma",
        email: "sidhant_ua2504aih231@iitp.ac.in",
      },
      {
        name: "Tejas Jaswant",
        email: "tejas_ua2504cdh175@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_THE_SCOUTS_70",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 4,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 12,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 5,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 19,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 13,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 14,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 15,
        },
      ],
    },
  },
  {
    teamName: "3 idiots",
    leaderName: "Debalina",
    leaderEmail: "debalina_us2604aih17@iitp.ac.in",
    members: [
      {
        name: "Debalina",
        email: "debalina_us2604aih17@iitp.ac.in",
      },
      {
        name: "Supriya kumari",
        email: "supriya_us2604cdh30@iitp.ac.in",
      },
      {
        name: "Shalni Kumari",
        email: "shalni_us2604cdh27@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_3_IDIOTS_71",
      levels: [
        {
          level: 1,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 10,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 12,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 8,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 14,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 2,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 3,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 11,
        },
      ],
    },
  },
  {
    teamName: "Hunter X",
    leaderName: "Maruti nandan bagherwal",
    leaderEmail: "maruti_us2604aih48@iitp.ac.in",
    members: [
      {
        name: "Maruti nandan bagherwal",
        email: "maruti_us2604aih48@iitp.ac.in",
      },
      {
        name: "Sumit Kumar",
        email: "sumit_us2604cdh29@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_HUNTER_X_72",
      levels: [
        {
          level: 1,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 6,
        },
        {
          level: 2,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 14,
        },
        {
          level: 3,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 16,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 9,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 7,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 19,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 3,
        },
      ],
    },
  },
  {
    teamName: "Saralakkho Holmes",
    leaderName: "Avinandan De",
    leaderEmail: "avinandan_ua2504aih59@iitp.ac.in",
    members: [
      {
        name: "Avinandan De",
        email: "avinandan_ua2504aih59@iitp.ac.in",
      },
      {
        name: "Diponkar Debnath",
        email: "diponkar_ua2504cdh63@iitp.ac.in",
      },
      {
        name: "Diwakar Jha",
        email: "diwakar_ua2503aih354@iitp.ac.in",
      },
      {
        name: "Aditya Raj",
        email: "aditya_ua2503aih322@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_SARALAKKHO_HOLMES_73",
      levels: [
        {
          level: 1,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 15,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 18,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 10,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 7,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 5,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 9,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 14,
        },
      ],
    },
  },
  {
    teamName: "Magadh blasters",
    leaderName: "Gautam Kumar",
    leaderEmail: "gautam_2312res864@iitp.ac.in",
    members: [
      {
        name: "Gautam Kumar",
        email: "gautam_2312res864@iitp.ac.in",
      },
      {
        name: "Chandan kumar das",
        email: "chandan_ua2503cdh621@iitp.ac.in",
      },
      {
        name: "Rishi Anand",
        email: "rishi_us2604cdh23@iitp.ac.in",
      },
      {
        name: "Ramanuj vishwakarma",
        email: "ramanuj_ua2503cdh691@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_MAGADH_BLASTERS_74",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 3,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 18,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 7,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 6,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 14,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 10,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 19,
        },
      ],
    },
  },
  {
    teamName: "Lutera",
    leaderName: "Ripunjay Mishra",
    leaderEmail: "ripunjay_ua2504aih176@iitp.ac.in",
    members: [
      {
        name: "Ripunjay Mishra",
        email: "ripunjay_ua2504aih176@iitp.ac.in",
      },
      {
        name: "Mileend",
        email: "mileend_ua2503aih132@iitp.ac.in",
      },
      {
        name: "Himanshu Raj",
        email: "himanshu_ua2503cdh136@iitp.ac.in",
      },
      {
        name: "Tarun Thakur",
        email: "tarun_ua2503cdh818@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_LUTERA_75",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 1,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 14,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 3,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 4,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 11,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 9,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 13,
        },
      ],
    },
  },
  {
    teamName: "1000 Sunny",
    leaderName: "Kumari Anshika singh",
    leaderEmail: "kumari_ua2503cdh427@iitp.ac.in",
    members: [
      {
        name: "Kumari Anshika singh",
        email: "kumari_ua2503cdh427@iitp.ac.in",
      },
      {
        name: "Pratiksha kumari",
        email: "pratiksha_ua2504cdh125@iitp.ac.in",
      },
      {
        name: "Pratibha kumari",
        email: "pratibha_ua2503aih319@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_1000_SUNNY_76",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 16,
        },
        {
          level: 2,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 8,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 4,
        },
        {
          level: 4,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 3,
        },
        {
          level: 5,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 14,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 1,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 13,
        },
      ],
    },
  },
  {
    teamName: "Code_627",
    leaderName: "Suhas Dhande",
    leaderEmail: "suhas_ua2504cdh168@iitp.ac.in",
    members: [
      {
        name: "Suhas Dhande",
        email: "suhas_ua2504cdh168@iitp.ac.in",
      },
      {
        name: "Subhojyoti Sinha",
        email: "subhojyoti_ua2504aih244@iitp.ac.in",
      },
      {
        name: "Vedvit Poddar",
        email: "vedvit_ua2504aih265@iitp.ac.in",
      },
      {
        name: "Aashutosh Raj",
        email: "aashutosh_ua2503cdh575@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_CODE627_77",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 2,
        },
        {
          level: 2,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 13,
        },
        {
          level: 3,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 17,
        },
        {
          level: 4,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 6,
        },
        {
          level: 5,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 12,
        },
        {
          level: 6,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 8,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 0,
        },
      ],
    },
  },
  {
    teamName: "Hunter Guys",
    leaderName: "Dhritisman saikia",
    leaderEmail: "dhritisman_us2603cdh24@iitp.ac.in",
    members: [
      {
        name: "Dhritisman saikia",
        email: "dhritisman_us2603cdh24@iitp.ac.in",
      },
      {
        name: "Aryan Maurya",
        email: "aryan_us2603cdh19@iitp.ac.in",
      },
      {
        name: "Anuj kumar patel",
        email: "anuj_us2603cdh17@iitp.ac.in",
      },
      {
        name: "Suraj Kumar Singh",
        email: "suraj_us2603cdh67@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_HUNTER_GUYS_78",
      levels: [
        {
          level: 1,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 7,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 9,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 18,
        },
        {
          level: 4,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 2,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 13,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 19,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 15,
        },
      ],
    },
  },
  {
    teamName: "Treasure  seekers",
    leaderName: "Iman Ghosh",
    leaderEmail: "iman_ua2504aih102@iitp.ac.in",
    members: [
      {
        name: "Iman Ghosh",
        email: "iman_ua2504aih102@iitp.ac.in",
      },
      {
        name: "Shivam Kumar",
        email: "shivam_ua2504aih328@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_TREASURE__SEEKERS_79",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 11,
        },
        {
          level: 2,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 2,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 17,
        },
        {
          level: 4,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 9,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 19,
        },
        {
          level: 6,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 0,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 4,
        },
      ],
    },
  },
  {
    teamName: "Treasure Haunterz",
    leaderName: "Mahima Kumari",
    leaderEmail: "mahima_ua2504aih123@iitp.ac.in",
    members: [
      {
        name: "Mahima Kumari",
        email: "mahima_ua2504aih123@iitp.ac.in",
      },
      {
        name: "Suraj Kumar Tiwari",
        email: "suraj_ua2503aih417@iitp.ac.in",
      },
      {
        name: "Ayushi Garg",
        email: "ayushi_ua2504aih63@iitp.ac.in",
      },
      {
        name: "Harshika",
        email: "harshika_ua2504cdh77@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_TREASURE_HAUNTERZ_80",
      levels: [
        {
          level: 1,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 10,
        },
        {
          level: 2,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 3,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 13,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 18,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 5,
        },
        {
          level: 6,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 8,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 12,
        },
      ],
    },
  },
  {
    teamName: "Lucky bustards",
    leaderName: "Somdutta Harh",
    leaderEmail: "somdutta_ua2504aih236@iitp.ac.in",
    members: [
      {
        name: "Somdutta Harh",
        email: "somdutta_ua2504aih236@iitp.ac.in",
      },
      {
        name: "Suryo kanto",
        email: "suryokanto_ua2503aih253@iitp.ac.in",
      },
      {
        name: "Harshit gautam",
        email: "harshit_ua2503cdh643@iitp.ac.in",
      },
      {
        name: "Kanishk Dubey",
        email: "kanishk_ua2504cdh85@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_LUCKY_BUSTARDS_81",
      levels: [
        {
          level: 1,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 18,
        },
        {
          level: 2,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 8,
        },
        {
          level: 3,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 1,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 12,
        },
        {
          level: 5,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 16,
        },
        {
          level: 6,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 10,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 19,
        },
      ],
    },
  },
  {
    teamName: "चक्रव्यूह",
    leaderName: "Harshit Jyotirmay",
    leaderEmail: "harshit_ua2504cdh79@iitp.ac.in",
    members: [
      {
        name: "Harshit Jyotirmay",
        email: "harshit_ua2504cdh79@iitp.ac.in",
      },
      {
        name: "Rishav Sinha",
        email: "rishav_ua2503cdh234@iitp.ac.in",
      },
      {
        name: "Sameer kumar",
        email: "sameer_ua2504cdh148@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_चकरवयह_82",
      levels: [
        {
          level: 1,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 0,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 7,
        },
        {
          level: 3,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 16,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 6,
        },
        {
          level: 5,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 9,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 2,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 14,
        },
      ],
    },
  },
  {
    teamName: "The explorers",
    leaderName: "Abhilasha Kumari Jha",
    leaderEmail: "abhilasha_ua2503cdh362@iitp.ac.in",
    members: [
      {
        name: "Abhilasha Kumari Jha",
        email: "abhilasha_ua2503cdh362@iitp.ac.in",
      },
      {
        name: "Muskan Kumari",
        email: "muskan_ua2503aih379@iitp.ac.in",
      },
      {
        name: "Isha kumari",
        email: "isha_ua2503cdh139@iitp.ac.in",
      },
      {
        name: "Isha kumari",
        email: "isha_ua2503cdh417@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_THE_EXPLORERS_83",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 0,
        },
        {
          level: 2,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 16,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 17,
        },
        {
          level: 4,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 5,
        },
        {
          level: 5,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 13,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 19,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 10,
        },
      ],
    },
  },
  {
    teamName: "Suryakant",
    leaderName: "Suryakant",
    leaderEmail: "suryakant_ua2503aih308@iitp.ac.in",
    members: [
      {
        name: "Suryakant",
        email: "suryakant_ua2503aih308@iitp.ac.in",
      },
      {
        name: "Shivam Dhakad",
        email: "shivam_ua2503cdh281@iitp.ac.in",
      },
      {
        name: "Kartikey Gupta",
        email: "kartikey_ua2504aih305@iitp.ac.in",
      },
      {
        name: "Shubham Gupta",
        email: "shubham_ua2504aih333@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_SURYAKANT_84",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 4,
        },
        {
          level: 2,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 2,
        },
        {
          level: 3,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 18,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 10,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 0,
        },
        {
          level: 6,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 19,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 7,
        },
      ],
    },
  },
  {
    teamName: "HYPER K",
    leaderName: "HARI KRISHNA NAIR",
    leaderEmail: "hari_us26cdh15@iitp.ac.in",
    members: [
      {
        name: "HARI KRISHNA NAIR",
        email: "hari_us26cdh15@iitp.ac.in",
      },
      {
        name: "Shree Krishna Krish",
        email: "shree_us2604aih39@iitp.ac.in",
      },
      {
        name: "YASH RAJ",
        email: "yash_us2603cdh76@iitp.ac.in",
      },
      {
        name: "PURUSHOTTAM KUMAR",
        email: "purushottam_us2603aih37@iitp.ac.in",
      },
    ],
    route: {
      routeCode: "ROUTE_HYPER_K_85",
      levels: [
        {
          level: 1,
          route: "nescafe",
          clue: "The air here is never truly silent. Thoughts are exchanged faster than time itself, while exhaustion is quietly traded for another hour of life.",
          questionIndex: 0,
        },
        {
          level: 2,
          route: "clh",
          clue: "The First Seal hides where questions outnumber answers. Beneath bright panels and ordered rows, wisdom is spoken, forgotten, and reborn each hour.",
          questionIndex: 13,
        },
        {
          level: 3,
          route: "oat",
          clue: "Not all chambers were built to contain people. Some were built to contain voices, performances, and worlds that exist only for a moment.",
          questionIndex: 16,
        },
        {
          level: 4,
          route: "airplane",
          clue: "Once entrusted to outrun the horizon, it now watches journeys it can no longer join. Seek the relic that remembers motion.",
          questionIndex: 6,
        },
        {
          level: 5,
          route: "married-hostel-road",
          clue: "Where the campus gathers to move, perform, and compete, a quieter passage stretches toward lives already settled. Seek not the destination, but the road that leads beside it.",
          questionIndex: 8,
        },
        {
          level: 6,
          route: "graffiti",
          clue: "Not every phoenix rises to the sky. Some remain trapped within walls.",
          questionIndex: 11,
        },
        {
          level: 7,
          route: "admin-block",
          clue: "You have followed echoes, symbols, and forgotten routes. Now seek the structure that governs them all.",
          questionIndex: 14,
        },
      ],
    },
  },
];
