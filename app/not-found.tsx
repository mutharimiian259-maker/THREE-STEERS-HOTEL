import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">

      <div>

        <h1 className="text-4xl font-bold text-yellow-500">
          404 - Page Not Found
        </h1>

        <p className="text-gray-400 mt-3">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="btn btn-green inline-block mt-6"
        >
          Go Back Home
        </Link>

      </div>

    </div>
  );
}
