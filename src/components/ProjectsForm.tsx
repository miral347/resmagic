import React from 'react';
import { Plus, Trash2, Github, ExternalLink } from 'lucide-react';
import { Project } from '../types/resume';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
  resumeType: 'job' | 'internship' | 'hackathon';
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({
  projects,
  onChange,
  resumeType,
}) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      current: false,
      githubUrl: '',
      liveUrl: '',
      achievements: '',
    };
    onChange([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(project => project.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(
      projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const addTechnology = (projectId: string, tech: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project && tech.trim() && !project.technologies.includes(tech.trim())) {
      updateProject(projectId, 'technologies', [...project.technologies, tech.trim()]);
    }
  };

  const removeTechnology = (projectId: string, techToRemove: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'technologies', project.technologies.filter(tech => tech !== techToRemove));
    }
  };

  const getGuidanceText = () => {
    switch (resumeType) {
      case 'hackathon':
        return 'Focus on innovative projects, technical challenges solved, and technologies used. Include hackathon projects, personal coding projects, and open-source contributions.';
      case 'internship':
        return 'Include academic projects, personal projects, and any collaborative work. Emphasize learning outcomes and technologies explored.';
      case 'job':
        return 'Highlight professional projects, significant personal projects, and contributions to real-world applications. Focus on impact and results.';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-purple-900">Projects</h3>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>
      
      <p className="text-purple-700 mb-6 text-sm bg-purple-50 p-3 rounded-lg">
        💡 <strong>Tip:</strong> {getGuidanceText()}
      </p>
      
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="border border-purple-200 rounded-xl p-4 relative bg-white/60">
            <button
              onClick={() => removeProject(project.id)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
            
            <div className="space-y-4 pr-8">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                  placeholder="E.g., E-commerce Website, Mobile App, AI Chatbot"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                  placeholder="Describe what the project does, your role, and key features..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    End Date
                  </label>
                  <div className="space-y-2">
                    <input
                      type="month"
                      value={project.endDate}
                      onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                      disabled={project.current}
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-purple-50 bg-white/80"
                    />
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={project.current}
                        onChange={(e) => updateProject(project.id, 'current', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-purple-600">Currently working on this</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Technologies Used
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Add a technology (press Enter)"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        addTechnology(project.id, input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(project.id, tech)}
                          className="text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    GitHub URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={project.githubUrl || ''}
                    onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                    placeholder="https://github.com/username/project"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={project.liveUrl || ''}
                    onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                    placeholder="https://yourproject.com"
                  />
                </div>
              </div>
              
              {resumeType === 'hackathon' && (
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Key Achievements/Results
                  </label>
                  <textarea
                    value={project.achievements || ''}
                    onChange={(e) => updateProject(project.id, 'achievements', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                    placeholder="E.g., Won 1st place, 10k+ users, 95% accuracy, etc."
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="text-center py-8 text-purple-500">
            No projects added yet. Click "Add Project" to showcase your work.
          </div>
        )}
      </div>
    </div>
  );
};