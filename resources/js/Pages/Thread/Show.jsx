import { Head } from "@inertiajs/react";
import { FiMic, FiVolume2 } from "react-icons/fi";
import { LogoutButton } from "../../Components/LogoutButton";
import { SideMenu } from "../../Components/SideMenu";

export default function ThreadShow({ user }) {
    const userName = user?.name;
    const demoMessages = [
        { id: 1, role: "user", text: "Hello." },
        { id: 2, role: "ai", text: "How are you?" },
        { id: 3, role: "user", text: "I'm doing great, thank you!" },
    ];

    return (
        <>
            <Head title="Thread Show" />
            <div className="flex min-h-screen bg-gray-900">
                <SideMenu />
                <main className="relative flex flex-1 flex-col bg-gray-800 px-10 py-12 text-white">
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
                                {demoMessages.map((message) =>
                                    message.role === "user" ? (
                                        <div
                                            key={message.id}
                                            className="flex justify-end"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="max-w-lg rounded-3xl bg-gray-100 px-6 py-4 text-base font-medium text-gray-900 shadow-lg shadow-black/20">
                                                    {message.text}
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
                                                    {message.text}
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
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                    <button
                        aria-label="音声入力"
                        className="absolute bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-900 shadow-xl shadow-black/30 transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400/60"
                        type="button"
                    >
                        <FiMic
                            aria-hidden="true"
                            className="h-7 w-7"
                        />
                    </button>
                </main>
            </div>
        </>
    );
}
