import Link from "next/link";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  return (
    <main className="p-6">

      <h1 className="text-3xl gold font-bold">
        Hotel Blog – Three Steers Meru
      </h1>

      <p className="text-gray-400 mt-2">
        Travel guides, hotel tips, and conference insights in Meru Kenya.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-6">

        {blogPosts.map((post) => (
          <div key={post.slug} className="card p-4">

            <h2 className="text-xl font-bold text-white">
              {post.title}
            </h2>

            <p className="text-gray-400 mt-2">
              {post.excerpt}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              className="text-gold mt-3 inline-block"
            >
              Read More →
            </Link>

          </div>
        ))}

      </div>

    </main>
  );
}
