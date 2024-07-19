import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/moving-border";

function HeroSection() {
  return (
    <div className="h-auto md:h-screen w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="gray" />

      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-20 md:mt-0 text-xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Transform Your Text with AI Insights
        </h1>
        <p className="mt-8 font-normal text-base md:text-lg text-neutral-300 max-w-2xl mx-auto">
          Experience the future of content analysis with our AI-Powered
          Summarization Tool. Effortlessly upload your text content—be it
          articles, documents, or emails—and receive a concise summary with
          actionable insights. Our advanced AI, integrated with Next.js and
          Node.js, provides deep analysis, sentiment evaluation, and topic
          identification, turning complex information into clear, valuable
          summaries. Whether for research, content creation, or personal use,
          unlock the power of your data today.
        </p>
        <div className="mt-8">
          <Link href={"/upload"}>
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Explore Uploads
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
