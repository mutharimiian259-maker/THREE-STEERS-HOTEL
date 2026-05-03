"use client";

import { useEffect } from "react";
import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import { generateSEO } from "@/lib/seo";
import { HOTEL } from "@/lib/config";
import { trackLead } from "@/lib/analytics/trackLead";

type Props = {
  params: { slug: string };
};

function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

/* ---------------- SEO ---------------- */
export async function generateMetadata({ params }: Props) {
  const post = getPost(params.slug);

  if (!post) {
    return generateSEO({
      title: "Blog Not Found | Three Steers Hotel",
      description: "The requested blog article does not exist.",
      path: "/blog",
    });
  }

  return generateSEO({
    title: post.title,
    description: post.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    image: post.image,
  });
}

/* ---------------- PAGE ---------------- */
export default function BlogPost({ params }: Props) {
  const post = getPost(params.slug);

  if (!post) return notFound();

  const whatsappNumber = HOTEL.contact.phone.whatsapp;

  /* ---------------- SAFE ANALYTICS FIX ---------------- */
  useEffect(() => {
    trackLead("blog_click");
  }, [params.slug]);

  return (
    <main className="p-6 max-w-3xl mx-auto">

      {post.image && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl text-yellow-500 font-bold">
        {post.title}
      </h1>

      <p className="text-gray-400 mt-2">
        {post.excerpt}
      </p>

      <article className="mt-6 text-gray-300 leading-relaxed whitespace-pre-line">
        {post.content}
      </article>

      <div className="mt-10 p-6 bg-zinc-900 rounded-lg text-center">

        <h3 className="text-yellow-500 text-xl font-bold">
          Stay at {HOTEL.identity.name} in {HOTEL.location.city}
        </h3>

        <p className="text-gray-400 mt-2">
          Enjoy premium comfort, dining, and hospitality near Mt Kenya.
          Book directly now for best available rates.
        </p>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            `Hello, I just read "${post.title}" and would like to book a stay at ${HOTEL.identity.name}. Please assist with availability and pricing.`
          )}`}
          className="btn btn-green mt-4 inline-block"
          onClick={() => trackLead("booking_intent")}
        >
          💬 Book via WhatsApp
        </a>

      </div>

    </main>
  );
}
