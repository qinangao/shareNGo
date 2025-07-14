function Avatar({ name, image, placeCount }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-indigo-200">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6">
        {/* Avatar with enhanced styling */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300 object-cover"
            />
          </div>
        </div>

        {/* User info */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-dark-100 mb-1 group-hover:text-purple-400 transition-colors duration-300">
            {name}
          </h2>
          <div className="flex items-center justify-center gap-1 text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm font-medium">
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="w-1 h-1 bg-purple-410 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-100 group-hover:to-purple-300 transition-all duration-300" />
    </div>
  );
}

export default Avatar;
