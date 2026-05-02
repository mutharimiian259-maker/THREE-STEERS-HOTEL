"use client";

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { setFunnelStep } from "@/lib/analytics/funnel";

export default function BlogPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <header className="text-center">

        <h1 className="text-3xl text-yellow-500 font-bold">
          Hotel Blog – Three Steers Meru
        </h1>

        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Travel guides, hotel tips, and conference insights in Meru Kenya.
        </p>

      </header>

      {/* BLOG GRID */}
      <section className="grid md:grid-cols-2 gap-6 mt-8">

        {blogPosts.map((post) => {
          const imageSrc =
            post.image || "/images/blog/default-blog.jpg";

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card overflow-hidden hover:scale-[1.01] transition block"
              onClick={() => {
                trackEvent("page_view", { blog: post.slug });
                setFunnelStep("VISIT");
              }}
            >

              {/* IMAGE */}
              <div className="relative w-full h-52">
                <Image
                  src={imageSrc}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">

                <h2 className="text-xl font-bold text-white">
                  {post.title}
                </h2>

                <p className="text-gray-400 mt-2 text-sm">
                  {post.excerpt}
                </p>

                <p className="text-yellow-500 mt-3 text-sm font-medium">
                  Read More →
                </p>

              </div>

            </Link>
          );
        })}

      </section>

    </main>
  );
}
