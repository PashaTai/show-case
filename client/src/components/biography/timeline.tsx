import { timelineEvents } from "@/data/timeline";
import { cn } from "@/lib/utils";

export default function Timeline() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">My Professional Timeline</h2>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
            Key milestones in my journey as a marketing professional.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary md:block hidden"></div>
            <div className="absolute left-8 w-0.5 h-full bg-primary md:hidden"></div>

            {timelineEvents.map((event, index) => (
              <div key={index} className="relative z-10 mb-16 last:mb-0">
                {/* Timeline circle */}
                <div 
                  className={cn(
                    "absolute z-10 w-5 h-5 rounded-full bg-primary border-4 border-white",
                    "md:left-1/2 md:-translate-x-1/2 left-8 -translate-x-1/2"
                  )}
                ></div>
                
                {/* Content box - alternating sides on desktop */}
                <div 
                  className={cn(
                    "md:w-5/12 p-6 bg-white rounded-lg shadow-md",
                    index % 2 === 0 
                      ? "md:mr-auto md:ml-0 md:mr-16 ml-16 mr-0" 
                      : "md:ml-auto md:mr-0 md:ml-16 ml-16 mr-0"
                  )}
                >
                  <span className="text-primary font-semibold">{event.year}</span>
                  <h3 className="text-lg font-bold mt-1">{event.title}</h3>
                  <p className="mt-2 text-slate-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
