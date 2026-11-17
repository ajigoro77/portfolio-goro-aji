import { tool } from 'ai';
import { z } from 'zod';
import { getConfig } from '@/lib/config-loader';

export const getSkills = tool({
  description:
    'This tool provides a comprehensive overview of technical skills, expertise, and professional qualifications.',
  parameters: z.object({}),
  execute: async () => {
    const config = getConfig();
    
    return {
      technicalSkills: {
        languagesAndWeb: config.skills.programming,
        integrations: config.skills.web_development,
        databases: config.skills.databases,
        toolsAndFrameworks: config.skills.devops_cloud
      },
      education: {
        degree: config.education.current.degree,
        institution: config.education.current.institution,
        status: config.education.current.status
      },
      achievements: config.education.achievements || [],
      experience: config.experience.map(exp => ({
        position: exp.position,
        company: exp.company,
        duration: exp.duration,
        type: exp.type,
        technologies: exp.technologies,
        description: exp.description
      })),
      message: "I'd be happy to walk you through my technical skills and expertise. I've built a diverse skill set across multiple domains through both my academic coursework and hands-on project experience. I'm particularly focused on web development, UI/UX design, and automation, where I've applied these skills to build real projects. Each area of my expertise has been strengthened through practical application - from building a PHP and MySQL web application to automating customer service with n8n and a Telegram Bot. I believe my combination of theoretical knowledge and practical experience, along with my enthusiasm for continuous learning, would allow me to contribute effectively to your team. What specific technical areas would you like me to elaborate on?"
    };
  },
});
