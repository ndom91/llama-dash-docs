import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "llama-dash — self-hosted inference gateway",
      },
      {
        name: "description",
        content:
          "One UI for model state, request history, API keys, routing rules, and proxy metrics — fronting llama-swap and any OpenAI- or Anthropic-compatible upstream.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return <LandingPage />;
}
