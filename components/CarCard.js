import Link from 'next/link'

export default function CarCard({ car }) {
  return (
    <Link href={`/listings/${car.id}`} className="car-card group">
      {/* Image with overlay */}
      <div className="car-card-img">
        {car.image_url ? (
          <>
            <img
              src={car.image_url}
              alt={`${car.make} ${car.model}`}
            />
            <div className="car-card-img-overlay" />
            <div className="car-card-price-overlay">
              £{Number(car.price).toLocaleString()}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-asphalt/40 text-sm bg-gradient-to-br from-asphalt/10 to-asphalt/5">
            <div className="text-center">
              <svg
                className="w-10 h-10 mx-auto mb-2 opacity-40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 17h2l2-6h10l2 6h2M5 17v2a1 1 0 001 1h2a1 1 0 001-1v-2M15 17v2a1 1 0 001 1h2a1 1 0 001-1v-2" />
                <circle cx="7.5" cy="14.5" r="1.5" />
                <circle cx="16.5" cy="14.5" r="1.5" />
              </svg>
              No photo yet
            </div>
          </div>
        )}

        {/* Year badge — top right */}
        <div className="absolute top-3 right-3">
          <span className="plate-badge">{car.year}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="display font-semibold text-lg text-charcoal leading-tight group-hover:text-teal transition-colors">
            {car.make} {car.model}
          </h3>
        </div>

        {/* If no image, show price here instead */}
        {!car.image_url && (
          <p className="text-amber font-mono font-bold text-xl mt-1">
            £{Number(car.price).toLocaleString()}
          </p>
        )}

        {/* Meta info row */}
        <div className="flex items-center gap-3 mt-3 text-xs text-asphalt/80 font-mono">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {Number(car.mileage).toLocaleString()} mi
          </span>
          <span className="w-1 h-1 rounded-full bg-asphalt/30" />
          <span>{car.transmission}</span>
          <span className="w-1 h-1 rounded-full bg-asphalt/30" />
          <span>{car.fuel_type}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mt-3 text-asphalt text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {car.location}
        </div>
      </div>
    </Link>
  )
}