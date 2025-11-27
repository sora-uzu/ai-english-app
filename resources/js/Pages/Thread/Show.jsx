import { useRef, useState } from "react";
import axios from "axios";
import { Head } from "@inertiajs/react";
import { FiMic, FiVolume2 } from "react-icons/fi";
import { LogoutButton } from "../../Components/LogoutButton";
import { SideMenu } from "../../Components/SideMenu";

export default function ThreadShow({
    user,
    threads = [],
    messages = [],
    threadId,
}) {
    const userName = user?.name;
    const hasMessages = messages?.length > 0;
    const [isRecording, setIsRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [recordingError, setRecordingError] = useState("");
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const uploadRecording = async () => {
        if (!threadId || audioChunksRef.current.length === 0) {
            return;
        }

        const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
        });
        const file = new File([audioBlob], "recording.webm", {
            type: "audio/webm",
        });
        const formData = new FormData();
        formData.append("audio", file);

        try {
            setIsUploading(true);
            setRecordingError("");
            await axios.post(`/thread/${threadId}/message`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error("音声のアップロードに失敗しました", error);
            setRecordingError("音声のアップロードに失敗しました");
        } finally {
            setIsUploading(false);
            audioChunksRef.current = [];
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
    };

    const startRecording = async () => {
        if (
            typeof window === "undefined" ||
            typeof window.MediaRecorder === "undefined" ||
            !navigator?.mediaDevices?.getUserMedia
        ) {
            setRecordingError("このブラウザでは録音がサポートされていません。");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            audioChunksRef.current = [];
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                stream.getTracks().forEach((track) => track.stop());
                setIsRecording(false);
                uploadRecording();
            };

            mediaRecorder.start();
            setRecordingError("");
            setIsRecording(true);
        } catch (error) {
            console.error("録音を開始できませんでした", error);
            setRecordingError("録音の開始に失敗しました。");
        }
    };

    const handleMicClick = () => {
        if (isUploading) {
            return;
        }

        if (isRecording) {
            stopRecording();
            return;
        }

        startRecording();
    };

    return (
        <>
            <Head title="Thread Show" />
            <div className="flex min-h-screen bg-gray-900">
                <SideMenu threads={threads} />
                <main className="relative flex h-screen flex-1 flex-col overflow-hidden bg-gray-800 px-10 py-12 text-white">
                    <header className="flex items-center justify-end gap-4">
                        {userName && (
                            <span className="text-lg font-semibold text-gray-200">
                                {userName}
                            </span>
                        )}
                        <LogoutButton />
                    </header>
                    <section className="mt-12 flex flex-1 flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto pr-24">
                            <div className="flex flex-col gap-6">
                                {hasMessages ? (
                                    messages.map((message) => {
                                        const isUserMessage =
                                            message.sender === 1 ||
                                            message.sender === "1" ||
                                            message.role === "user";
                                        const englishText =
                                            message.message_en ??
                                            message.text ??
                                            message.content ??
                                            "";
                                        const japaneseText =
                                            message.message_ja ??
                                            message.translation ??
                                            "";

                                        return isUserMessage ? (
                                            <div
                                                key={message.id}
                                                className="flex justify-end"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="max-w-lg rounded-3xl bg-gray-100 px-6 py-4 text-base font-medium text-gray-900 shadow-lg shadow-black/20">
                                                        <p className="leading-relaxed">
                                                            {englishText}
                                                        </p>
                                                        {japaneseText && (
                                                            <p className="mt-2 text-sm font-normal text-gray-600">
                                                                {japaneseText}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-gray-900 shadow-sm shadow-black/10">
                                                        You
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                key={message.id}
                                                className="flex justify-start"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold uppercase tracking-wide text-gray-900 shadow-sm shadow-black/10">
                                                        AI
                                                    </span>
                                                    <div className="max-w-lg rounded-3xl bg-gray-100 px-6 py-4 text-base font-medium text-gray-900 shadow-lg shadow-black/20">
                                                        <p className="leading-relaxed">
                                                            {englishText}
                                                        </p>
                                                        {japaneseText && (
                                                            <p className="mt-2 text-sm font-normal text-gray-600">
                                                                {japaneseText}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            aria-label="再生する"
                                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-800 shadow-sm shadow-black/10 transition hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white/60"
                                                            type="button"
                                                        >
                                                            <FiVolume2
                                                                aria-hidden="true"
                                                                className="h-5 w-5"
                                                            />
                                                        </button>
                                                        <button
                                                            className="rounded-2xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm shadow-black/10 transition hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-white/60"
                                                            type="button"
                                                        >
                                                            Aあ
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        まだメッセージがありません。
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                    <button
                        aria-label="音声入力"
                        aria-pressed={isRecording}
                        className={`fixed bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full shadow-xl shadow-black/30 transition focus:outline-none focus:ring-4 focus:ring-emerald-400/60 ${
                            isRecording
                                ? "bg-red-500 text-white animate-pulse"
                                : "bg-white text-gray-900 hover:scale-105"
                        } ${isUploading ? "opacity-70" : ""}`}
                        disabled={isUploading}
                        onClick={handleMicClick}
                        type="button"
                    >
                        <FiMic
                            aria-hidden="true"
                            className="h-7 w-7"
                        />
                    </button>
                    {recordingError && (
                        <p className="fixed bottom-28 right-10 rounded-md bg-red-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/30">
                            {recordingError}
                        </p>
                    )}
                </main>
            </div>
        </>
    );
}
