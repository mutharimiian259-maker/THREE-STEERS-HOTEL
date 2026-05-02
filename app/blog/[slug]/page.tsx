import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import { generateSEO } from "@/lib/seo";
import { HOTEL } from "@/lib/config";

type Props = {
  params: { slug: string };
};

/* ---------------- BLOG LOOKUP (SINGLE SOURCE) ---------------- */
function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

/* ---------------- SEO METADATA ---------------- */
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
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

/* ---------------- PAGE COMPONENT ---------------- */
export default function BlogPost({ params }: Props) {
  const post = getPost(params.slug);

  if (!post) return notFound();

  const whatsappNumber = HOTEL.contact.phone.whatsapp;

  return (
    <main className="p-6 max-w-3xl mx-auto">

      {/* TITLE */}
      <h1 className="text-3xl text-gold font-bold">
        {post.title}
      </h1>

      {/* EXCERPT */}
      <p className="text-gray-400 mt-2">
        {post.excerpt}
      </p>

      {/* CONTENT */}
      <article className="mt-6 text-gray-300 leading-relaxed whitespace-pre-line">
        {post.content}
      </article>

      {/* CTA SECTION */}
      <div className="mt-10 p-6 bg-zinc-900 rounded-lg text-center">

        <h3 className="text-gold text-xl font-bold">
          Book Your Stay at Three Steers Hotel
        </h3>

        <p className="text-gray-400 mt-2">
          Get the best rates by booking directly via WhatsApp.
        </p>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            "Hello I want to book a room at Three Steers Hotel Meru"
          )}`}
          className="btn btn-green mt-4 inline-block"
        >
          💬 WhatsApp Booking
        </a>

      </div>

    </main>
  );
}
