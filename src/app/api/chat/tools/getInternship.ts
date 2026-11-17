import { tool } from 'ai';
import { z } from 'zod';
import { getConfig } from '@/lib/config-loader';

export const getInternship = tool({
  description: 'Provides comprehensive information about job opportunities, career preferences, and professional availability for recruiters and HR professionals.',
  parameters: z.object({}),
  execute: async () => {
    const config = getConfig();
    
    return {
      availability: config.internship.availability,
      preferences: {
        roleTypes: config.internship.focusAreas,
        workMode: config.internship.preferredLocation,
        location: config.personal.location,
        startDate: config.internship.startDate,
        duration: config.internship.duration
      },
      experience: {
        internshipCompleted: config.projects[0]?.description || "",
        freelanceWork: config.projects[1]?.description || "",
        projectExperience: "Built web, automation, and landing page projects: PHP Library Management System, Toko Gatgetin n8n automation, and Katriella landing page"
      },
      skills: {
        technical: [
          ...config.skills.programming,
          ...config.skills.ml_ai,
          ...config.skills.web_development,
          ...config.skills.databases,
          ...config.skills.devops_cloud
        ],
        soft: [
          "Problem Solving", "Communication", "Adaptability"
        ]
      },
      achievements: config.education.achievements || [],
      lookingFor: {
        goals: config.internship.goals,
        workStyle: config.internship.workStyle,
        motivation: config.personality.motivation,
        interests: config.personality.interests
      },
      contact: {
        email: config.personal.email,
        linkedin: config.social.linkedin,
        github: config.social.github,
        portfolio: "This AI-powered portfolio showcases my projects and skills"
      },
      personality: {
        traits: config.personality.traits,
        funFacts: config.personality.funFacts,
        workingStyle: config.personality.workingStyle
      },
      professionalMessage: "I'm actively seeking full-time opportunities in IT and Software Engineering where I can contribute my skills in web development, UI/UX design, and automation while continuing to grow professionally. What I'm looking for is an environment where I can combine technical challenges with collaborative teamwork - somewhere I can contribute meaningfully while learning from experienced professionals like yourself. I'm very adaptable and eager to take on new challenges, and I believe my technical background combined with my enthusiasm for learning would make me a valuable addition to your team. What kind of projects or challenges is your team currently working on that I might be able to contribute to?"
    };
  },
});
