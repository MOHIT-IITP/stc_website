// Extract Club Data from store.ts
export interface ClubData {
  id: string;
  wingId: string;
  title: string;
  branch: string;
  description: string;
  message: string;
  whatsappLink: string;
  cardUrl: string;
  order: number;
  isActive: boolean;
}

export const clubsData: ClubData[] = [
  // TATVA WING CLUBS (9 clubs)
  {
    id: 'webwiser',
    wingId: 'tatva',
    title: 'WEBWISER',
    branch: 'WEB DEVELOPMENT CLUB',
    description: 'Welcome to WebWiser, the Web Development Club at IIT Patna! 🌐 Whether you\'re a beginner or an experienced developer, join us to explore the ever-evolving world of web technologies. Learn front-end and back-end development, work on exciting projects, and stay updated with the latest industry trends. Let\'s build the web of tomorrow, today!',
    message: 'Crafting digital experiences, one line of code at a time!',
    whatsappLink: 'https://chat.whatsapp.com/En8K9bv7qnb3B9MUq8K87U?mode=wwt',
    cardUrl: '/images/boxes/webwiser-box.jpg',
    order: 0,
    isActive: true
  },
  {
    id: 'code_red',
    wingId: 'tatva',
    title: 'CODE RED',
    branch: 'COMPETITIVE PROGRAMMING CLUB',
    description: 'Welcome to CodeRed, the Competitive Programming Club at IIT Patna! 🚀 Sharpen your problem-solving skills and master algorithms. Whether you\'re preparing for coding competitions or just love solving puzzles, join us to become a better programmer.',
    message: 'Code, compete, conquer!',
    whatsappLink: 'https://chat.whatsapp.com/LKJkLUlkwz40VsqhAz8qme?mode=wwt',
    cardUrl: '/images/boxes/codered-box.jpg',
    order: 1,
    isActive: true
  },
  {
    id: 'pixelerate',
    wingId: 'tatva',
    title: 'PIXELERATE',
    branch: 'UI/UX AND GRAPHIC DESIGN CLUB',
    description: 'Welcome to Pixelerate, the UI/UX and Graphic Design Club at IIT Patna! 🎨✨ Whether you\'re a design enthusiast or an experienced designer, join us to explore the creative world of design. Learn design principles, work on amazing projects, and build a stunning portfolio. Let\'s design the future, today!',
    message: 'Let\'s create stunning designs and amazing user experiences together!',
    whatsappLink: 'https://chat.whatsapp.com/BlLPgvkqiGeCzyVYNWvlwy?mode=wwt',
    cardUrl: '/images/boxes/pixelerate-box.jpg',
    order: 2,
    isActive: true
  },
  {
    id: 'synapse',
    wingId: 'tatva',
    title: 'SYNAPSE',
    branch: 'AI/ML CLUB',
    description: 'Welcome to Synapse, the AI and Machine Learning Club at IIT Patna! 🤖 Whether you\'re fascinated by neural networks or want to build intelligent systems, join us to explore the cutting-edge world of AI and ML.',
    message: 'Unleash the power of AI, one algorithm at a time!',
    whatsappLink: 'https://chat.whatsapp.com/HLobDBgihPtDDuvktFfpOr?mode=wwt',
    cardUrl: '/images/boxes/synapse-box.jpg',
    order: 3,
    isActive: true
  },
  {
    id: 'appistry',
    wingId: 'tatva',
    title: 'APPISTRY',
    branch: 'APP-DEV CLUB',
    description: 'Welcome to Appistry, the App Development Club at IIT Patna! 📱💻 Whether you\'re a beginner or an experienced developer, join us to build amazing mobile and desktop applications. Learn about the latest technologies, frameworks, and best practices in app development.',
    message: 'Let\'s build the next generation of amazing apps together!',
    whatsappLink: 'https://chat.whatsapp.com/CoOC1aVbOcYHt9JGLRNeNO?mode=wwt',
    cardUrl: '/images/boxes/appistry-box.jpg',
    order: 4,
    isActive: true
  },
  {
    id: 'hackshield',
    wingId: 'tatva',
    title: 'HACKSHIELD',
    branch: 'CYBERSECURITY CLUB',
    description: 'Welcome to HackShield, the Cybersecurity Club at IIT Patna! 🔒 Whether you\'re interested in ethical hacking, network security, or protecting digital assets, join us to learn the art of cybersecurity and become a digital guardian.',
    message: 'Protecting the digital world, one vulnerability at a time!',
    whatsappLink: 'https://chat.whatsapp.com/Kk4EPaNeHkp8oNQZ8O0ZR7?mode=wwt',
    cardUrl: '/images/boxes/hackshield-box.jpg',
    order: 5,
    isActive: true
  },
  {
    id: 'analytical_arena',
    wingId: 'tatva',
    title: 'ANALYTICAL ARENA',
    branch: 'DATA SCIENCE CLUB',
    description: 'Welcome to Analytical Arena, the Data Science & Analytics Club at IIT Patna! 📊🔍 Whether you\'re just starting out or a data wizard, this is your go-to group. Immerse yourself in the fascinating world of data analytics, machine learning, and big data.',
    message: 'Transforming data into insights, one algorithm at a time!',
    whatsappLink: 'https://chat.whatsapp.com/ChIMsbcwzqYLg9tTJyFuZp?mode=wwt',
    cardUrl: '/images/boxes/analytical-box.jpg',
    order: 6,
    isActive: true
  },
  {
    id: 'tech_hub',
    wingId: 'tatva',
    title: 'TECH HUB',
    branch: 'TECHNICAL CLUB',
    description: 'Welcome to Tech Hub, the central hub for all things tech at IIT Patna! 🚀 Whether you\'re interested in learning new technologies, working on innovative projects, or attending insightful sessions, Tech Hub is the place to be.',
    message: 'Empowering innovation through technology and collaboration!',
    whatsappLink: 'https://chat.whatsapp.com/InjNSSAY1REKYgeAKOkF6u?mode=wwt',
    cardUrl: '/images/boxes/techhub-box.jpg',
    order: 7,
    isActive: true
  },
  {
    id: 'mech_x',
    wingId: 'tatva',
    title: 'MECH-X',
    branch: 'ROBOTICS CLUB',
    description: 'Welcome to Mech-X, the Robotics Club at IIT Patna! 🤖 Whether you\'re passionate about building robots, automation, or mechatronics, join us to explore the exciting world of robotics and bring your mechanical creations to life.',
    message: 'Building the future, one robot at a time!',
    whatsappLink: 'https://chat.whatsapp.com/Lvf6wrSHYTr4sDeuWBWTM0?mode=wwt',
    cardUrl: '/images/boxes/mechx-box.jpg',
    order: 8,
    isActive: true
  },

  // DISHA WING CLUBS (2 clubs)
  {
    id: 'careerCatalyst',
    wingId: 'disha',
    title: 'CAREER CATALYST',
    branch: 'CAREER DEVELOPMENT CLUB',
    description: 'Welcome to Career Catalyst, the Career Development Club at IIT Patna! 🚀 Whether you\'re exploring career options, preparing for interviews, or looking to build your professional network, join us to accelerate your career journey.',
    message: 'Catalyzing careers, one opportunity at a time!',
    whatsappLink: '#',
    cardUrl: '/images/boxes/career-box.jpg',
    order: 9,
    isActive: true
  },
  {
    id: 'opportune',
    wingId: 'disha',
    title: 'OPPORTUNE',
    branch: 'OPPORTUNITY CLUB',
    description: 'Welcome to Opportune, the Opportunity Club at IIT Patna! 🌟 Whether you\'re looking for internships, projects, or growth opportunities, join us to discover and seize the best opportunities for your career development.',
    message: 'Creating opportunities, one connection at a time!',
    whatsappLink: '#',
    cardUrl: '/images/boxes/opportune-box.jpg',
    order: 10,
    isActive: true
  },

  // ARTHNITI WING CLUBS (2 clubs)
  {
    id: 'foundersForge',
    wingId: 'arthniti',
    title: 'FOUNDERS FORGE',
    branch: 'ENTREPRENEURSHIP CLUB',
    description: 'Welcome to Founders Forge, the Entrepreneurship Club at IIT Patna! 🔥 Whether you have a startup idea or want to learn about entrepreneurship, join us to turn your vision into reality.',
    message: 'Forging entrepreneurs, one startup at a time!',
    whatsappLink: '#',
    cardUrl: '/images/boxes/founders-box.jpg',
    order: 11,
    isActive: true
  },
  {
    id: 'freelanthropy',
    wingId: 'arthniti',
    title: 'FREELANTHROPY',
    branch: 'FREELANCING CLUB',
    description: 'Welcome to Freelanthropy, the Freelancing Club at IIT Patna! � Whether you want to start freelancing, build client relationships, or learn the business side of tech, join us to master the art of freelancing.',
    message: 'Empowering freelancers, one project at a time!',
    whatsappLink: '#',
    cardUrl: '/images/boxes/freelanthropy-box.jpg',
    order: 12,
    isActive: true
  },

  // MANAGEMENT WING CLUBS (5 clubs)
  {
    id: 'creative',
    wingId: 'management',
    title: 'CREATIVE',
    branch: 'CREATIVE CLUB',
    description: 'Welcome to Creative, the Creative Design Club at IIT Patna! 🎨 Whether you\'re into graphic design, content creation, or creative thinking, join us to express your creativity.',
    message: 'Creating magic, one design at a time!',
    whatsappLink: '#',
    cardUrl: '/images/boxes/creative-box.jpg',
    order: 13,
    isActive: true
  },
  {
    id: 'eventManagement',
    wingId: 'management',
    title: 'EVENT MANAGEMENT',
    branch: 'EVENT MANAGEMENT CLUB',
    description: 'Welcome to Event Management, the Event Management Club at IIT Patna! � Whether you\'re into event planning, coordination, or management, join us to organize amazing sessions and events.',
    message: 'Managing events, one experience at a time!',
    whatsappLink: '#',
    cardUrl: '/images/boxes/event-box.jpg',
    order: 14,
    isActive: true
  },
  {
    id: 'pr',
    wingId: 'management',
    title: 'PR',
    branch: 'PUBLIC RELATIONS CLUB',
    description: 'Welcome to PR, the Public Relations Club at IIT Patna! 📢 Whether you\'re into communications, branding, or public speaking, join us to build your PR skills and represent the organization.',
    message: 'Building relationships, one connection at a time!',
    whatsappLink: '#',
    cardUrl: '/images/boxes/pr-box.jpg',
    order: 15,
    isActive: true
  },
  {
    id: 'sessionWebinar',
    wingId: 'management',
    title: 'SESSION & WEBINAR',
    branch: 'SESSION & WEBINAR CLUB',
    description: 'Welcome to Session & Webinar, the Session and Webinar Club at IIT Patna! 🎥 Whether you\'re into hosting sessions, webinars, or educational events, join us to create engaging learning experiences.',
    message: 'Connecting minds, one session at a time!',
    whatsappLink: '#',
    cardUrl: '/images/boxes/session-box.jpg',
    order: 16,
    isActive: true
  },
  {
    id: 'sponsor',
    wingId: 'management',
    title: 'SPONSOR',
    branch: 'SPONSORSHIP CLUB',
    description: 'Welcome to Sponsor, the Sponsorship Club at IIT Patna! � Whether you\'re into fundraising, sponsor relations, or partnership building, join us to secure resources for our initiatives.',
    message: 'Securing partnerships, one sponsor at a time!',
    whatsappLink: '#',
    cardUrl: '/images/boxes/sponsor-box.jpg',
    order: 17,
    isActive: true
  }
];
