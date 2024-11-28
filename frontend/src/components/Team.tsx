import { teamMembers } from '../data/mockData';
import { Mail} from 'lucide-react';

export default function Team() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Team Members</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{member.name}</h2>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
              >
                <Mail className="w-4 h-4" />
                {member.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}