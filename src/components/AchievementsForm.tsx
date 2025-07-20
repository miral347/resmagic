import React from 'react';
import { Plus, Trash2, Award, Trophy, Users, Heart, Star } from 'lucide-react';
import { Achievement } from '../types/resume';

interface AchievementsFormProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
  resumeType: 'job' | 'internship' | 'hackathon';
}

export const AchievementsForm: React.FC<AchievementsFormProps> = ({
  achievements,
  onChange,
  resumeType,
}) => {
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: '',
      category: 'academic',
    };
    onChange([...achievements, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    onChange(achievements.filter(achievement => achievement.id !== id));
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: any) => {
    onChange(
      achievements.map(achievement =>
        achievement.id === id ? { ...achievement, [field]: value } : achievement
      )
    );
  };

  const categories = [
    { value: 'academic', label: 'Academic', icon: Award },
    { value: 'competition', label: 'Competition', icon: Trophy },
    { value: 'leadership', label: 'Leadership', icon: Users },
    { value: 'volunteer', label: 'Volunteer', icon: Heart },
    { value: 'other', label: 'Other', icon: Star },
  ];

  const getGuidanceText = () => {
    switch (resumeType) {
      case 'hackathon':
        return 'Include hackathon wins, coding competition rankings, open-source contributions, and technical achievements.';
      case 'internship':
        return 'Highlight academic achievements, scholarships, leadership roles, volunteer work, and relevant competitions.';
      case 'job':
        return 'Focus on professional achievements, awards, leadership experiences, and measurable accomplishments.';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-purple-900">Achievements & Awards</h3>
        <button
          onClick={addAchievement}
          className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
        >
          <Plus size={16} />
          Add Achievement
        </button>
      </div>
      
      <p className="text-purple-700 mb-6 text-sm bg-purple-50 p-3 rounded-lg">
        🏆 <strong>Tip:</strong> {getGuidanceText()}
      </p>
      
      <div className="space-y-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="border border-purple-200 rounded-xl p-4 relative bg-white/60">
            <button
              onClick={() => removeAchievement(achievement.id)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
            
            <div className="space-y-4 pr-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Achievement Title
                  </label>
                  <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                    placeholder="E.g., Dean's List, Hackathon Winner, Team Lead"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Category
                  </label>
                  <select
                    value={achievement.category}
                    onChange={(e) => updateAchievement(achievement.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Description
                </label>
                <textarea
                  value={achievement.description}
                  onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                  placeholder="Describe the achievement and its significance..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-1">
                  Date
                </label>
                <input
                  type="month"
                  value={achievement.date}
                  onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
                />
              </div>
            </div>
          </div>
        ))}
        
        {achievements.length === 0 && (
          <div className="text-center py-8 text-purple-500">
            No achievements added yet. Click "Add Achievement" to highlight your accomplishments.
          </div>
        )}
      </div>
    </div>
  );
};