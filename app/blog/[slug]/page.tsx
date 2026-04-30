import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

/* ---------------- SEO METADATA ---------------- */
export async function generateMetadata({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Blog Not Found | Three Steers Hotel",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,

    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://threesteershotel.com/blog/${post.slug}`,
      siteName: "Three Steers Hotel",
      type: "article",
    },
  };
}

/* ---------------- PAGE COMPONENT ---------------- */
export default function BlogPost({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto">

      {/* TITLE */}
      <h1 className="text-3xl gold font-bold">
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

        <h3 className="gold text-xl font-bold">
          Book Your Stay at Three Steers Hotel
        </h3>

        <p className="text-gray-400 mt-2">
          Get the best rates by booking directly via WhatsApp.
        </p>

        <a
          href="https://wa.me/254728588005?text=Hello%20I%20want%20to%20book%20a%20room%20at%20Three%20Steers%20Hotel%20Meru"
          className="btn btn-green mt-4 inline-block"
        >
          💬 WhatsApp Booking
        </a>

      </div>

    </main>
  );
}
