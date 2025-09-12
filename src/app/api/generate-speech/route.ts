import { openai } from "@ai-sdk/openai";
import { experimental_generateSpeech as generateSpeech } from "ai";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const { audio } = await generateSpeech({
      model: openai.speech("tts-1"),
      text: text,
    });

    return new Response(
      new Blob([new Uint8Array(audio.uint8Array)], {
        type: audio.mediaType || "audio/mpeg",
      }),
      {
        headers: {
          "Content-Type": audio.mediaType || "audio/mpeg",
        },
      }
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
