import { fetchMetadata } from "frames.js/next";
// import type { Metadata } from "next";
import Link from "next/link";
import Head from "../node_modules/next/head";
import Swap from "./components/Swap"
import { appURL } from "./utils";
import { DebugLink } from "./components/DebugLink";

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "frames.js starter",
//     description: "This is a frames.js starter template",
//     other: {
//       ...(await fetchMetadata(new URL("/frames", appURL()))),
//     },
//   };
// }

// This is a react server component only
export default async function Home() {
  // then, when done, return next frame
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <Head>
        <title>DEX Swap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     
      <main className="flex flex-col items-center  w-full flex-1 px-20 text-center">

        <Swap />
      </main>
      
    </div>
  );
}
