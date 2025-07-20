import React from 'react';
import { Briefcase, GraduationCap, Code } from 'lucide-react';

interface ResumeTypeSelectorProps {
  selectedType: 'job' | 'internship' | 'hackathon';
  onChange: (type: 'job' | 'internship' | 'hackathon') => void;
}

export const ResumeTypeSelector: React.FC<ResumeTypeSelectorProps> = ({
  selectedType,
  onChange,
}) => {
  const types = [
    {
      id: 'job' as const,
      title: 'Job Application',
      description: 'Professional resume for full-time positions',
      icon: Briefcase,
      color: 'purple',
    },
    {
      id: 'internship' as const,
      title: 'Internship',
      description: 'Student-focused resume for internship opportunities',
      icon: GraduationCap,
      color: 'indigo',
    },
    {
      id: 'hackathon' as const,
      title: 'Hackathon',
      description: 'Project-focused resume for competitions and events',
      icon: Code,
      color: 'pink',
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-200">
      <h3 className="text-lg font-semibold text-purple-900 mb-4">Choose Your Resume Type</h3>
      <p className="text-purple-700 mb-6 text-sm">
        Select the type of resume you want to create. This will customize the sections and guidance for your specific needs.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {types.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => onChange(type.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                isSelected
                  ? `border-${type.color}-500 bg-${type.color}-50 shadow-md`
                  : 'border-purple-200 bg-white/60 hover:border-purple-300 hover:bg-white/80'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon 
                  size={20} 
                  className={isSelected ? `text-${type.color}-600` : 'text-purple-500'} 
                />
                <h4 className={`font-semibold ${
                  isSelected ? `text-${type.color}-900` : 'text-purple-900'
                }`}>
                  {type.title}
                </h4>
              </div>
              <p className={`text-sm ${
                isSelected ? `text-${type.color}-700` : 'text-purple-600'
              }`}>
                {type.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};