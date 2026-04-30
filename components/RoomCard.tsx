export default function RoomCard({ room }) {
  return (
    <div className="card">

      <img src={room.image} className="rounded-lg" />

      <h3 className="gold mt-2 font-bold">{room.name}</h3>

      <p className="text-sm text-gray-400">{room.desc}</p>

      <p className="mt-1">{room.price}</p>

      <a
        href={`https://wa.me/254728588005?text=Book ${room.name}`}
        className="btn btn-green block mt-3 text-center"
      >
        Book Now
      </a>

    </div>
  );
}
