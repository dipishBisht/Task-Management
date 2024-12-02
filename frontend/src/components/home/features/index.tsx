import { BarChart3, Clock, Users } from 'lucide-react';

const features = [
  {
    name: 'Real-time Analytics',
    description: 'Get instant insights into your project performance with detailed analytics and reporting.',
    icon: BarChart3,
  },
  {
    name: 'Team Collaboration',
    description: 'Work seamlessly with your team members, share resources, and communicate effectively.',
    icon: Users,
  },
  {
    name: 'Time Tracking',
    description: 'Track time spent on tasks and projects to improve productivity and resource allocation.',
    icon: Clock,
  },
];

export function Features() {
  return (
    <div className="bg-gray-50 py-24" id="learn-more">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to manage your projects
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Powerful features to help you take control of your projects and deliver results.
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-xl font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}