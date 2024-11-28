import { TeamMember } from '../../types';
import { UserPlus, Mail } from 'lucide-react';

interface TeamSectionProps {
  team: TeamMember[];
  onAddMember?: () => void;
}

export default function TeamSection({ team, onAddMember }: TeamSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Team Members</h2>
          <button
            onClick={onAddMember}
            className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Add Member
          </button>
        </div>

        <div className="space-y-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}