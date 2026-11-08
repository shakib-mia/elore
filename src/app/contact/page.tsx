import { Suspense } from "react";
import Contact from "@/views/Contact";
export const metadata = { title: "Contact — ÉLORE" };
export default function Page() { return <Suspense><Contact /></Suspense>; }
