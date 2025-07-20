import React from 'react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { Certification } from '../types/resume';

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({
  certifications,
  onChange,
}) => {
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      issueDate: '',
      expirationDate: '',
      credentialId: '',
      url: '',
    };
    onChange([...certifications, newCertification]);
  };

  const removeCertification = (id: string) => {
    onChange(certifications.filter(cert => cert.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(
      certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-purple-900">Certifications</h3>
        <button
          onClick={addCertification}
          className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
        >
          <Plus size={16} />
          Add Certification
        </button>
      </div>
      
      <div className="space-y-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="border border-purple-200 rounded-xl p-4 relative bg-white/60">
            <button
              onClick={() => removeCertification(cert.id)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
            
            <div className="space-y-4 pr-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Certification Name
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 text-gray-900"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 text-gray-900"
                    placeholder="Amazon Web Services"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="month"
                    value={cert.issueDate}
                    onChange={(e) => updateCertification(cert.id, 'issueDate', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Expiration Date (Optional)
                  </label>
                  <input
                    type="month"
                    value={cert.expirationDate || ''}
                    onChange={(e) => updateCertification(cert.id, 'expirationDate', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 text-gray-900"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Credential ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={cert.credentialId || ''}
                    onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 text-gray-900"
                    placeholder="ABC123456789"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-1">
                    Verification URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={cert.url || ''}
                    onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 text-gray-900"
                    placeholder="https://verify.example.com"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {certifications.length === 0 && (
          <div className="text-center py-8 text-purple-500">
            No certifications added yet. Click "Add Certification" to get started.
          </div>
        )}
      </div>
    </div>
  );
};