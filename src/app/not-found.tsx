import { ArrowLink, Meta } from "@/components/primitives";
import { Link } from "@/lib/router";

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <Meta className="text-wine-600">FR. 404 · UNEXPOSED FRAME</Meta>
      <h1 className="mt-6 font-display text-[clamp(3rem,9vw,7rem)] font-light leading-none tracking-tight text-ink-900">
        Lost in the <span className="italic text-wine-600">darkroom.</span>
      </h1>
      <p className="mt-6 max-w-sm text-sm leading-loose text-ink-500">
        This page slipped out of the contact sheet. The stories, however, are all still here.
      </p>
      <Link to="/" className="mt-9 inline-block">
        <ArrowLink>Back to the light</ArrowLink>
      </Link>
    </section>
  );
}
