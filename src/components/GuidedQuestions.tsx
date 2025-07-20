import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface GuidedQuestionsProps {
  resumeType: 'job' | 'internship' | 'hackathon';
}

export const GuidedQuestions: React.FC<GuidedQuestionsProps> = ({ resumeType }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getQuestions = () => {
    const commonQuestions = {
      personal: [
        "What's your full name and current contact information?",
        "What's your current location (city, state)?",
        "Do you have a professional website or portfolio?",
        "What's your LinkedIn profile URL?",
      ],
      summary: [
        "What are you passionate about in your field?",
        "What are your key strengths and skills?",
        "What type of role are you seeking?",
        "What makes you unique as a candidate?",
      ],
      skills: [
        "What programming languages do you know?",
        "What frameworks and tools have you used?",
        "What soft skills do you possess?",
        "What technical skills are you currently learning?",
      ],
    };

    const typeSpecificQuestions = {
      job: {
        experience: [
          "What companies have you worked for?",
          "What were your key responsibilities in each role?",
          "What achievements or results can you quantify?",
          "How did you add value to your previous employers?",
        ],
        projects: [
          "What professional projects have you worked on?",
          "What personal projects demonstrate your skills?",
          "What technologies did you use in each project?",
          "What was the impact or outcome of your projects?",
        ],
      },
      internship: {
        experience: [
          "What internships or part-time jobs have you had?",
          "What volunteer work or leadership roles have you taken?",
          "What coursework is relevant to your target role?",
          "What extracurricular activities show your interests?",
        ],
        projects: [
          "What academic projects have you completed?",
          "What personal coding projects have you built?",
          "What group projects have you contributed to?",
          "What technologies have you learned through projects?",
        ],
      },
      hackathon: {
        experience: [
          "What hackathons have you participated in?",
          "What coding competitions have you entered?",
          "What open-source projects have you contributed to?",
          "What technical communities are you part of?",
        ],
        projects: [
          "What innovative projects have you built?",
          "What problems have your projects solved?",
          "What creative solutions have you developed?",
          "What technical challenges have you overcome?",
        ],
      },
    };

    return {
      ...commonQuestions,
      ...typeSpecificQuestions[resumeType],
    };
  };

  const questions = getQuestions();

  const sections = [
    { key: 'personal', title: 'Personal Information', icon: '👤' },
    { key: 'summary', title: 'Professional Summary', icon: '📝' },
    { key: 'experience', title: 'Experience', icon: '💼' },
    { key: 'projects', title: 'Projects', icon: '🚀' },
    { key: 'skills', title: 'Skills', icon: '⚡' },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-200">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="text-purple-600" size={20} />
        <h3 className="text-lg font-semibold text-purple-900">Guided Questions</h3>
      </div>
      
      <p className="text-purple-700 mb-6 text-sm">
        Use these questions to help you think about what to include in each section of your resume.
      </p>
      
      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.key} className="border border-purple-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full px-4 py-3 bg-purple-50 hover:bg-purple-100 transition-colors flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <span>{section.icon}</span>
                <span className="font-medium text-purple-900">{section.title}</span>
              </div>
              {expandedSection === section.key ? (
                <ChevronUp size={16} className="text-purple-600" />
              ) : (
                <ChevronDown size={16} className="text-purple-600" />
              )}
            </button>
            
            {expandedSection === section.key && (
              <div className="p-4 bg-white/60">
                <ul className="space-y-2">
                  {questions[section.key as keyof typeof questions]?.map((question, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-purple-700">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};