import React from 'react';
import { Download, Mail, Phone, MapPin, Globe, Linkedin, ExternalLink, Github } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const { personalInfo, summary, workExperience, education, certifications, skills, projects, achievements, resumeType } = resumeData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="bg-white">
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-purple-200 p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-purple-900">Resume Preview</h2>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>
      
      <div className="p-8 max-w-4xl mx-auto bg-white print:p-0" id="resume-content">
        {/* Header */}
        <div className="border-b-2 border-gray-900 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                {personalInfo.location}
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe size={14} />
                <a href={personalInfo.website} className="text-purple-600 hover:underline">
                  Website
                </a>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin size={14} />
                <a href={personalInfo.linkedin} className="text-purple-600 hover:underline">
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Work Experience</h2>
            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-purple-600 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{exp.location}</p>
                      <p>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-indigo-600 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-gray-700">{edu.institution}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(edu.graduationDate)}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-l-2 border-green-600 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {project.name}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 transition-colors"
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </h3>
                      {project.technologies.length > 0 && (
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Technologies:</strong> {project.technologies.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        {formatDate(project.startDate)} - {project.current ? 'Present' : formatDate(project.endDate)}
                      </p>
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      {project.description}
                    </p>
                  )}
                  {project.achievements && resumeType === 'hackathon' && (
                    <p className="text-gray-700 text-sm leading-relaxed mt-1">
                      <strong>Achievements:</strong> {project.achievements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Certifications</h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="border-l-2 border-pink-600 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {cert.name}
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-pink-800 transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </h3>
                      <p className="text-gray-700">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>Issued: {formatDate(cert.issueDate)}</p>
                      {cert.expirationDate && (
                        <p>Expires: {formatDate(cert.expirationDate)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements & Awards</h2>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="border-l-2 border-yellow-600 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 capitalize">{achievement.category}</p>
                      {achievement.description && (
                        <p className="text-gray-700 text-sm leading-relaxed mt-1">
                          {achievement.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(achievement.date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};