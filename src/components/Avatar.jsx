function Avatar({ name, image, placeCount }) {
  return (
    <div className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-brand-50 transition-all duration-200 cursor-pointer bg-white hover:bg-gray-50">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full border-2 border-gray-100 shadow-sm hover:scale-105 transition-transform duration-200"
      />
      <div className="font-medium">
        <h2 className="text-dark-200 transition-colors duration-200">{name}</h2>
        <h3 className="text-sm text-gray-500">
          {placeCount} {placeCount === 1 ? "Place" : "Places"}
        </h3>
      </div>
    </div>
  );
}

export default Avatar;
