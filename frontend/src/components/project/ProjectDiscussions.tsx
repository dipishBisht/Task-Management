import { Send } from "lucide-react";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

const mockComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    content:
      "I've updated the design files with the latest revisions. Please check and let me know if any changes are needed.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: {
      name: "Mike Johnson",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    },
    content:
      "The frontend implementation is progressing well. We should be able to meet the deadline.",
    timestamp: "4 hours ago",
  },
];

export default function ProjectDiscussions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Discussions</h2>

        <div className="space-y-6 mb-6">
          {mockComments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {comment.user.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-gray-600">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <textarea
            placeholder="Write a comment..."
            className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
          <button className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
