import { notFound } from "next/navigation";
import Image from "next/image";

import { blogPosts } from "@/data/blog";

import { generateSEO } from "@/lib/seo";

import { HOTEL } from "@/lib/config";

import { track } from "@/lib/core/analytics";

import { getWhatsAppNumber } from "@/lib/domain/contact";

import {
  buildWhatsAppLink,
} from "@/lib/domain/whatsapp";

import { formatWhatsAppMessage } from "@/lib/domain/whatsapp";

import { getImage } from "@/lib/domain/images";

type Props = {
  params: {
    slug: string;
  };
};

/* ---------------------------------------
   DOMAIN QUERY
--------------------------------------- */

function getPost(slug: string) {
  return (
    blogPosts.find(
      (post) => post.slug === slug
    ) ?? null
  );
}

/* ---------------------------------------
   SEO
--------------------------------------- */

export async function generateMetadata({
  params,
}: Props) {
  const post = getPost(params.slug);

  if (!post) {
    return generateSEO({
      title:
        "Blog Not Found | Three Steers Hotel",

      description:
        "The requested blog article does not exist.",

      path: "/blog",
    });
  }

  return generateSEO({
    title: post.title,

    description:
      post.metaDescription ||
      post.excerpt,

    path: `/blog/${post.slug}`,

    keywords: post.keywords,

    image: post.imageKey,
  });
}

/* ---------------------------------------
   PAGE
--------------------------------------- */

export default function BlogPostPage({
  params,
}: Props) {
  const post = getPost(params.slug);

  if (!post) {
    return notFound();
  }

  const phone =
    getWhatsAppNumber();

  const message =
    formatWhatsAppMessage(
      `Hello, I just read "${post.title}" and would like to book a stay at ${HOTEL.identity.name}. Please assist with availability and pricing.`,
      {
        source: "blog",
      }
    );

  const whatsappLink =
    buildWhatsAppLink(message);

  return (
    <main className="p-6 max-w-3xl mx-auto">

      {post.imageKey && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={getImage(post.imageKey)}
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

      <article className="mt-6 whitespace-pre-line text-gray-300 leading-relaxed">
        {post.content}
      </article>

      <div className="mt-10 rounded-lg bg-zinc-900 p-6 text-center">

        <h3 className="text-xl font-bold text-yellow-500">
          Stay at {HOTEL.identity.name} in{" "}
          {HOTEL.location.city}
        </h3>

        <p className="mt-2 text-gray-400">
          Enjoy premium comfort,
          dining, and hospitality
          near Mt Kenya.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-green mt-4 inline-block"
          onClick={() => {
            track(
              "booking_intent",
              {
                blog: post.slug,
              },
              "page"
            );
          }}
        >
          💬 Book via WhatsApp
        </a>

      </div>

    </main>
  );
}
