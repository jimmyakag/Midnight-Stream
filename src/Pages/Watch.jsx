import { useParams, useNavigate } from 'react-router-dom'
import { getStreamUrl, getArabicSubtitles } from '../services/api'
import { useEffect, useState } from "react";
import CustomPlayer from '../components/CustomPlayer'

const WatchPage = () => {
    const { type, id } = useParams()
    const navigate = useNavigate()

    const [language, setLanguage] = useState("en");
    const [arabicAvailable, setArabicAvailable] = useState(false);
    const [loadingSubs, setLoadingSubs] = useState(true);
    const [subtitles, setSubtitles] = useState([]);

    const subtitleFile = subtitles[0]?.unpack_files?.[0];

    const subtitleUrl = subtitleFile
        ? `https://dl.subdl.com/subtitle/${subtitles[0].n_id}/${subtitleFile.file_n_id}`
        : null;

    useEffect(() => {
        const checkArabic = async () => {
            try {
                const results = await getArabicSubtitles(type, id);

                console.log("Arabic subtitles:", results);
                console.log("FILES:", results[0]?.unpack_files);
                setSubtitles(results);
                setArabicAvailable(results.length > 0);

            } catch (error) {
                console.error("Subtitle error:", error);
                setArabicAvailable(false);
                setSubtitles([]);
            } finally {
                setLoadingSubs(false);
            }
        };

        checkArabic();
    }, [type, id]);

    const embedUrl = getStreamUrl(
        type,
        id,
        1,
        1,
        language
    );

    return (
        <div className="min-h-screen bg-black p-5">

            <button
                onClick={() => navigate(-1)}
                className="text-white bg-blue-600 px-4 py-2 rounded-lg mb-5"
            >
                ← Back
            </button>

            <div className="flex gap-3 mb-5">

                <button
                    onClick={() => setLanguage("en")}
                    className={`px-4 py-2 rounded-lg ${language === "en"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300"
                        }`}
                >
                    English
                </button>

                {arabicAvailable && (
                    <button
                        onClick={() => setLanguage("ar")}
                        className={`px-4 py-2 rounded-lg ${language === "ar"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300"
                            }`}
                    >
                        العربية
                    </button>
                )}

            </div>

            {loadingSubs && (
                <p className="text-gray-400 mb-4">
                    Checking Arabic subtitles...
                </p>
            )}

            {!loadingSubs && arabicAvailable && (
                <p className="text-green-400 mb-4">
                    ✓ Arabic subtitles available ({subtitles.length})
                </p>
            )}

            {!loadingSubs && !arabicAvailable && (
                <p className="text-gray-400 mb-4">
                    Arabic subtitles are not available.
                </p>
            )}

            <div className="w-full max-w-6xl mx-auto aspect-video bg-black">

                <iframe
                    key={embedUrl}
                    src={embedUrl}
                    title="Watch"
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                />

            </div>

        </div>
    )
}

export default WatchPage