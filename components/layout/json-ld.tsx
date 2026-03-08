/**
 * JSON-LD Structured Data — Schema.org Person
 * Improves Google rich results and SERP appearance.
 */
export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Christian John Duque",
    alternateName: "CJ Black",
    url: "https://cjblack.dev",
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer based in Iloilo City, Philippines. Specializing in Next.js, React, and modern web technologies.",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Full Stack Web Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Iloilo City",
      addressCountry: "PH",
    },
    sameAs: ["https://github.com/cjblack24", "https://twitter.com/cjblack_24"],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://cjblack.dev",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * JSON-LD Structured Data — Schema.org WebSite
 * Enables Google Sitelinks Search Box in SERPs.
 */
export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CJ Black Portfolio",
    url: "https://cjblack.dev",
    description:
      "Minimalistic modern portfolio of a passionate Full Stack Developer building digital experiences.",
    author: {
      "@type": "Person",
      name: "Christian John Duque",
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
