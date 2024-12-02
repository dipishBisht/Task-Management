import { ArrowRight, Boxes } from "lucide-react";

export default function HomeHero() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center mb-8">
            <Boxes className="h-16 w-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Streamline Your Projects with{" "}
            <span className="text-indigo-600">ProjectFlow</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Empower your team with our intuitive project management platform.
            Organize tasks, track progress, and achieve your goals with ease.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#get-started"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#learn-more"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
