export const sampleResume = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
    title: 'Senior Software Engineer',
    summary:
      'Results-driven software engineer with 7+ years building scalable web applications. Passionate about clean code, performance optimization, and mentoring junior developers.',
  },
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      startDate: '2022-01',
      endDate: '',
      current: true,
      location: 'San Francisco, CA',
      bullets: [
        'Led development of microservices architecture serving 2M+ daily active users',
        'Reduced API response time by 40% through database query optimization',
        'Mentored team of 4 junior developers, improving sprint velocity by 25%',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Software Engineer',
      startDate: '2019-06',
      endDate: '2021-12',
      current: false,
      location: 'Austin, TX',
      bullets: [
        'Built real-time dashboard using React and WebSockets for 50K+ users',
        'Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes',
        'Collaborated with design team to improve UX, increasing user retention by 18%',
      ],
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of California, Berkeley',
      degree: 'B.S. Computer Science',
      startDate: '2015-08',
      endDate: '2019-05',
      gpa: '3.8',
      honors: 'Magna Cum Laude',
    },
  ],
  skills: [
    { id: '1', category: 'Languages', items: 'JavaScript, TypeScript, Python, Go' },
    { id: '2', category: 'Frontend', items: 'React, Next.js, Vue, Tailwind CSS' },
    { id: '3', category: 'Backend', items: 'Node.js, Express, FastAPI, PostgreSQL' },
    { id: '4', category: 'Tools', items: 'Docker, Kubernetes, AWS, Git' },
  ],
  projects: [
    {
      id: '1',
      name: 'Open Source CLI Tool',
      description: 'Built a widely-used CLI tool for database migrations with 2K+ GitHub stars',
      technologies: 'Node.js, PostgreSQL, Commander.js',
      link: 'github.com/alexj/db-migrate',
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-03',
      link: '',
    },
  ],
};

export const emptyResume = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    title: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
};

export const TEMPLATES = [
  { id: 'modern', name: 'Modern', accent: '#1a2e4a' },
  { id: 'classic', name: 'Classic', accent: '#111827' },
  { id: 'minimal', name: 'Minimal', accent: '#6b7280' },
  { id: 'creative', name: 'Creative', accent: '#7c3aed' },
  { id: 'executive', name: 'Executive', accent: '#92400e' },
];
