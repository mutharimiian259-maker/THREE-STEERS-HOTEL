export default function Facilities() {
  const facilities = [
    "Free High-Speed WiFi",
    "Secure Parking",
    "Conference & Meeting Rooms",
    "On-site Restaurant & Bar",
    "24/7 Front Desk",
    "Room Service",
    "Airport Transfers",
    "Laundry Services",
  ];

  return (
    <div className="p-6 bg-zinc-900">

      <h2 className="text-2xl font-bold text-yellow-500 text-center">
        Hotel Facilities
      </h2>

      <p className="text-gray-400 text-center mt-2 max-w-xl mx-auto">
        Enjoy premium comfort and convenience with our modern facilities
        designed for both business and leisure guests.
      </p>

      <div className="grid md:grid-cols-4 gap-4 mt-8">
        {facilities.map((item, index) => (
          <div
            key={index}
            className="bg-black border border-zinc-800 p-4 rounded-lg text-center"
          >
            <p className="text-white text-sm">{item}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
