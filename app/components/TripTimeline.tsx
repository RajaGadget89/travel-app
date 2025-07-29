interface TimelineEntry {
  time: string;
  activity: string;
}

interface TripTimelineProps {
  timeline: TimelineEntry[];
}

export default function TripTimeline({ timeline }: TripTimelineProps) {
  if (!timeline || timeline.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Trip Timeline</h2>
      <ul className="space-y-3 md:space-y-4">
        {timeline.map((entry, index) => (
          <li key={index} className="flex items-start space-x-3 md:space-x-4">
            {/* Time label - aligned right */}
            <div className="flex-shrink-0">
              <span className="font-bold text-blue-600 text-sm md:text-base bg-blue-50 px-2 py-1 rounded">
                {entry.time}
              </span>
            </div>
            
            {/* Activity description - aligned left */}
            <div className="flex-1 min-w-0">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {entry.activity}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 