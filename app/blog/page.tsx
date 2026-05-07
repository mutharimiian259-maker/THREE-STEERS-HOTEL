"use client";

import Link from "next/link";
import Image from "next/image";

import { blogPosts } from "@/data/blog";

import { track } from "@/lib/core/analytics";

import { getImage } from "@/lib/domain/images";

export default function BlogPage() {

  function handleBlogClick(slug: string) {
    track(
      "blog_view",
      {
        blog: slug,
      },
      "page"
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-6">

      <header className="text-center">

        <h1 className="text-3xl font-bold text-yellow-500">
          Hotel Blog – Three Steers Meru
        </h1>

        <p className="mx-auto mt-2 max-w-2xl text-gray-400">
          Travel guides, hotel tips,
          and conference insights in Meru Kenya.
        </p>

      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">

        {blogPosts.map((post) => {

          const imageSrc = getImage(
            post.imageKey
          );

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card block overflow-hidden transition hover:scale-[1.01]"
              onClick={() => {
                handleBlogClick(post.slug);
              }}
            >

              <div className="relative h-52 w-full">

                <Image
                  src={imageSrc}
                  alt={post.title}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="p-4">

                <h2 className="text-xl font-bold text-white">
                  {post.title}
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  {post.excerpt}
                </p>

                <p className="mt-3 text-sm font-medium text-yellow-500">
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
