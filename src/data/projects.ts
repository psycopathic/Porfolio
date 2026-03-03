const PROJECTS: {
  name: string
  description: string
  previewImage: string
  repoUrl: string
  liveLink: string
}[] = [
    {
      name: 'TalkDiti',
      description: 'Full-stack real-time chat application supporting one-to-one and group messaging using MERN stack and Socket.IO. Implemented JWT authentication, typing indicators, and online presence detection. Scalable backend handling 50+ concurrent WebSocket connections with responsive React UI across all devices.',
      liveLink: 'https://talkditi.onrender.com',
      previewImage: '/TalkDiti.png',
      repoUrl: 'https://github.com/psycopathic/TalkDiti',
    },
    {
      name: 'Quizzes',
      description: 'Fully offline, voice-controlled quiz application using React 19, Vite, and Tailwind CSS. Integrated Vosk STT with WASM for on-device speech recognition with zero latency and privacy. Custom fuzzy command parser supporting 10+ spoken phrase variants. Covers 30 questions across Physics, Math, CS, Biology deployed as static site.',
      liveLink: 'https://quizzes-2qy2.onrender.com',
      previewImage: '/Quizzes.png',
      repoUrl: 'https://github.com/psycopathic/Quizzes',
    },
  ]

export default PROJECTS
