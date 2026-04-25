import { Injectable } from '@angular/core';

export interface Skill {
  Name: string;
  Category: string;
  Icon: string;
}

export interface Project {
  Title: string;
  Description: string;
  Tech: string[];
  Link?: string;
  Github?: string;
  Image: string;
  Featured?: boolean;
}

export interface Experience {
  Role: string;
  Company: string;
  Period: string;
  Description: string;
}

export interface SocialLink {
  Name: string;
  Url: string;
  Icon: string;
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {

  GetPersonalInfo() {
    return {
      ShortName: 'SM',
      Name: 'Sonic Maharjan',
      Title: 'Full Stack Angular .NET Developer',
      Tagline: 'I craft elegant digital experiences that make a difference.',
      Bio: `I'm a passionate full stack developer with 1.5+ years of experience building
            scalable web applications. I love turning complex problems into simple,
            beautiful, and intuitive designs.`,
      Email: 'sonicmaharjan743@gmail.com',
      Phone: '+977-9860881883',
      Location: 'Kathmandu, Nepal',
      Avatar: 'profile.png',
      ResumeUrl: 'Resume.pdf',
      AvailableForWork: false,
      ShowExperience: false
    };
  }

  GetSkills(): Skill[] {
    return [
      { Name: 'Angular', Category: 'Frontend', Icon: 'devicon-angularjs-plain colored' },
      { Name: 'TypeScript', Category: 'Frontend', Icon: 'devicon-typescript-plain colored' },
      { Name: 'Tailwind CSS', Category: 'Frontend', Icon: 'devicon-tailwindcss-plain colored' },
      { Name: 'HTML / CSS', Category: 'Frontend', Icon: 'devicon-html5-plain colored' },
      { Name: 'Bootstrap 5', Category: 'Frontend', Icon: 'devicon-bootstrap-plain colored' },
      { Name: 'ASP.NET Core', Category: 'Backend', Icon: 'devicon-dotnetcore-plain colored' },
      { Name: 'C#', Category: 'Backend', Icon: 'devicon-csharp-plain colored' },
      { Name: 'REST APIs', Category: 'Backend', Icon: 'devicon-fastapi-plain colored' }, 
      { Name: 'MySQL', Category: 'Database', Icon: 'devicon-mysql-plain colored' },
      { Name: 'SQL Server', Category: 'Database', Icon: 'devicon-microsoftsqlserver-plain colored' },
      { Name: 'Git', Category: 'Tools', Icon: 'devicon-git-plain colored' },
      { Name: 'VS Code', Category: 'Tools', Icon: 'devicon-vscode-plain colored' },
      { Name: 'Visual Studio', Category: 'Tools', Icon: 'devicon-visualstudio-plain colored' },
    ];
  }

  GetSkillCategories(): string[] {
    const skills = this.GetSkills();
    return ['All', ...new Set(skills.map(s => s.Category))];
  }

  GetProjects(): Project[] {
    return [
      {
        Title: 'E-Commerce Platform',
        Description: 'A full-featured e-commerce platform with real-time inventory, payments, and analytics dashboard.',
        Tech: ['Angular', 'ASP.NET Core', 'SQL Server', 'Stripe'],
        Image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80',
        Github: '#',
        Link: '#',
        Featured: true,
      },

    ];
  }

  GetExperience(): Experience[] {
    return [
      {
        Role: 'Junior Full Stack Developer',
        Company: 'imark Digital',
        Period: 'Dec 2025 – Present',
        Description: 'Developed and maintained scalable web applications using Angular and ASP.NET Core, implemented REST APIs, and collaborated with senior developers to deliver production-ready features.',
      },
      {
        Role: 'Full Stack Developer Intern',
        Company: 'imark Digital',
        Period: 'Sep 2025 – Dec 2025',
        Description: 'Gained hands-on experience in full-stack development using Angular and ASP.NET Core, participated in team development, and contributed to frontend components and API integration tasks.',
      },
      {
        Role: 'Trainee .NET Developer',
        Company: 'Phye Gan Pvt. Ltd',
        Period: 'Apr 2025 – Aug 2025',
        Description: 'Received hands-on training in ASP.NET Web Forms and C# development. Assisted in building and maintaining web applications, debugging issues, and learning core concepts of backend development.',
      },
      {
        Role: 'Internship .NET Developer',
        Company: 'Phye Gan Pvt. Ltd',
        Period: 'Nov 2024 - Apr 2025',
        Description: 'Worked on real-world ASP.NET Web Forms projects, contributing to database operations using SQL Server and UI enhancements. Collaborated with senior developers across the full SDLC.',
      }
    ];
  }

  GetSocialLinks(): SocialLink[] {
    return [
      { Name: 'GitHub', Url: 'https://github.com/SonicMhzrn', Icon: 'devicon-github-plain colored' },
      { Name: 'LinkedIn', Url: 'https://www.linkedin.com/in/sonic-maharjan-4b9105284/', Icon: 'devicon-linkedin-plain colored' },
      // { Name: 'Twitter', Url: 'https://twitter.com', Icon: 'devicon-twitter-plain colored' },
    ];
  }

  GetStats() {
    return [
      { Value: '1.5+', Label: 'Years Experience' },
      { Value: '1+', Label: 'Projects Shipped' },
      { Value: '1+', Label: 'Happy Clients' },
      { Value: '0', Label: 'Open Source Libs' },
    ];
  }

  GetPagePermission() {
    return {
      ShowProjectPage: false,
      ShowExperiencePage: false
    };
  }
}
