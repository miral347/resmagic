import React from 'react';
import { FileText, Sparkles, ArrowRight, Users, Award, Briefcase } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Users,
      title: 'Student-Friendly',
      description: 'Designed specifically for students with guided questions and helpful tips',
      color: 'text-purple-600'
    },
    {
      icon: Award,
      title: 'Multiple Templates',
      description: 'Choose from job, internship, or hackathon-focused resume formats',
      color: 'text-indigo-600'
    },
    {
      icon: Briefcase,
      title: 'Professional Output',
      description: 'Generate clean, ATS-friendly resumes that stand out to employers',
      color: 'text-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-indigo-50" style={{background: 'linear-gradient(135deg, #f3f0ff 0%, #e8e5ff 50%, #ddd6fe 100%)'}}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="text-purple-600" size={32} />
              <FileText className="text-purple-600" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-purple-900">Resume Builder</h1>
              <p className="text-purple-700">Smart resume builder for students</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Sparkles className="text-purple-600" size={48} />
            <FileText className="text-purple-600" size={44} />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
            Resume Builder
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create professional resumes effortlessly with our guided platform. 
            Perfect for students applying to jobs, internships, or hackathons.
          </p>
          
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-200 text-center hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <Icon size={48} className={feature.color} />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-purple-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-white/90 backdrop-blur-sm p-12 rounded-xl shadow-lg border border-purple-200 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-lg text-purple-700 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully created professional resumes 
            and landed their dream opportunities.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Creating Now
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};