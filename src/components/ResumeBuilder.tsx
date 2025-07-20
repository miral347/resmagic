import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ResumeTypeSelector } from './ResumeTypeSelector';
import { PersonalInfoForm } from './PersonalInfoForm';
import { WorkExperienceForm } from './WorkExperienceForm';
import { EducationForm } from './EducationForm';
import { CertificationsForm } from './CertificationsForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { AchievementsForm } from './AchievementsForm';
import { GuidedQuestions } from './GuidedQuestions';
import { ResumePreview } from './ResumePreview';
import { ResumeData } from '../types/resume';

interface ResumeBuilderProps {
  onBackToHome: () => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onBackToHome }) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
    },
    summary: '',
    workExperience: [],
    education: [],
    certifications: [],
    skills: [],
    projects: [],
    achievements: [],
    resumeType: 'internship',
  });

  const updatePersonalInfo = (personalInfo: ResumeData['personalInfo']) => {
    setResumeData({ ...resumeData, personalInfo });
  };

  const updateSummary = (summary: string) => {
    setResumeData({ ...resumeData, summary });
  };

  const updateWorkExperience = (workExperience: ResumeData['workExperience']) => {
    setResumeData({ ...resumeData, workExperience });
  };

  const updateEducation = (education: ResumeData['education']) => {
    setResumeData({ ...resumeData, education });
  };

  const updateCertifications = (certifications: ResumeData['certifications']) => {
    setResumeData({ ...resumeData, certifications });
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    setResumeData({ ...resumeData, skills });
  };

  const updateProjects = (projects: ResumeData['projects']) => {
    setResumeData({ ...resumeData, projects });
  };

  const updateAchievements = (achievements: ResumeData['achievements']) => {
    setResumeData({ ...resumeData, achievements });
  };

  const updateResumeType = (resumeType: ResumeData['resumeType']) => {
    setResumeData({ ...resumeData, resumeType });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-indigo-50" style={{background: 'linear-gradient(135deg, #f3f0ff 0%, #e8e5ff 50%, #ddd6fe 100%)'}}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 px-4 py-2 text-purple-700 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-purple-900">Resume Builder</h1>
              <p className="text-purple-700 text-sm">Create your professional resume</p>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <ResumeTypeSelector
              selectedType={resumeData.resumeType}
              onChange={updateResumeType}
            />

            <PersonalInfoForm
              personalInfo={resumeData.personalInfo}
              onChange={updatePersonalInfo}
            />

            {/* Summary Section */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Professional Summary</h3>
              <textarea
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 text-gray-900"
                placeholder="Write a brief summary of your professional background and career objectives..."
              />
            </div>

            <WorkExperienceForm
              workExperience={resumeData.workExperience}
              onChange={updateWorkExperience}
            />

            <EducationForm
              education={resumeData.education}
              onChange={updateEducation}
            />

            <CertificationsForm
              certifications={resumeData.certifications}
              onChange={updateCertifications}
            />

            <SkillsForm
              skills={resumeData.skills}
              onChange={updateSkills}
            />

            <ProjectsForm
              projects={resumeData.projects}
              onChange={updateProjects}
              resumeType={resumeData.resumeType}
            />

            <AchievementsForm
              achievements={resumeData.achievements}
              onChange={updateAchievements}
              resumeType={resumeData.resumeType}
            />
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-8 h-fit">
              <ResumePreview resumeData={resumeData} />
            </div>
            
            <div className="lg:sticky lg:top-8 h-fit">
              <GuidedQuestions resumeType={resumeData.resumeType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};