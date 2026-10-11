import { useEffect, useRef, useState } from "react";

const CustomPlayer = ({
    videoUrl,
    subtitleUrl,
    title = "Video",
}) => {
    const videoRef = useRef(null);
    const [subtitleReady, setSubtitleReady] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        // Set video source
        video.src = videoUrl || "";

        // Remove old subtitle tracks
        video.querySelectorAll("track").forEach((track) => {
            track.remove();
        });

        setSubtitleReady(false);

        if (!subtitleUrl) {
            return () => {
                video.removeAttribute("src");
                video.load();
            };
        }

        let subtitleBlobUrl = null;

        const loadSubtitle = async () => {
            try {
                const response = await fetch(subtitleUrl);

                if (!response.ok) {
                    throw new Error(
                        `Subtitle download failed: ${response.status}`
                    );
                }

                const srtText = await response.text();

                const vttText =
                    "WEBVTT\n\n" +
                    srtText
                        .replace(/\r+/g, "")
                        .replace(
                            /(\d{2}):(\d{2}):(\d{2}),(\d{3})/g,
                            "$1:$2:$3.$4"
                        );

                const blob = new Blob([vttText], {
                    type: "text/vtt",
                });

                subtitleBlobUrl = URL.createObjectURL(blob);

                const track = document.createElement("track");

                track.kind = "subtitles";
                track.label = "العربية";
                track.srclang = "ar";
                track.src = subtitleBlobUrl;
                track.default = true;

                video.appendChild(track);

                setSubtitleReady(true);
            } catch (error) {
                console.error("Subtitle loading error:", error);
                setSubtitleReady(false);
            }
        };

        loadSubtitle();

        return () => {
            if (subtitleBlobUrl) {
                URL.revokeObjectURL(subtitleBlobUrl);
            }

            video.removeAttribute("src");
            video.load();
        };
    }, [videoUrl, subtitleUrl]);

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="relative bg-black aspect-video rounded-xl overflow-hidden">
                <video
                    ref={videoRef}
                    controls
                    playsInline
                    className="w-full h-full"
                    title={title}
                >
                    Your browser does not support HTML5 video.
                </video>
            </div>

            {subtitleReady && (
                <p className="text-green-400 text-sm mt-2">
                    ✓ Arabic subtitles loaded
                </p>
            )}
        </div>
    );
};

export default CustomPlayer;