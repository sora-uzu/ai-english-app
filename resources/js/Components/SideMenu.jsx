"use client";

import { Link, useForm } from "@inertiajs/react";

const iconBaseClasses = "flex-shrink-0";

const ChatBubbleIcon = ({ className = "" }) => (
    <svg
        className={`${iconBaseClasses} ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M4 4.5a3.5 3.5 0 0 1 3.5-3.5h9A3.5 3.5 0 0 1 20 4.5v6a3.5 3.5 0 0 1-3.5 3.5H13l-3.708 3.707A1 1 0 0 1 8.5 17V14H7.5A3.5 3.5 0 0 1 4 10.5v-6Z" />
    </svg>
);

const PlusCircleIcon = ({ className = "" }) => (
    <svg
        className={`${iconBaseClasses} ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm0 5.25a.75.75 0 0 1 .75.75v2.25H15a.75.75 0 0 1 0 1.5h-2.25V14a.75.75 0 0 1-1.5 0v-2.25H9a.75.75 0 0 1 0-1.5h2.25V8a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
        />
    </svg>
);

export function SideMenu({ threads = [] }) {
    const { post, processing } = useForm();

    const handleCreateThread = () => {
        if (processing) {
            return;
        }

        post(route("thread.store"), {
            preserveScroll: true,
        });
    };

    return (
        <aside className="flex w-72 h-screen flex-col overflow-hidden bg-green-700 text-white">
            <div className="flex items-center gap-3 px-6 py-7 border-b border-green-600">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900/50">
                    <ChatBubbleIcon className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold leading-none">
                    MyEnglishApp
                </span>
            </div>

            <div className="px-6 py-5">
                <button
                    type="button"
                    className={`flex w-full items-center gap-3 rounded-full px-5 py-3 text-left text-lg font-semibold transition ${
                        processing
                            ? "cursor-not-allowed bg-green-900/40 opacity-60"
                            : "bg-green-900/70 hover:bg-green-800"
                    }`}
                    onClick={handleCreateThread}
                    disabled={processing}
                    aria-disabled={processing}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-800">
                        <PlusCircleIcon className="h-6 w-6 text-white" />
                    </div>
                    <span>新規スレッド作成</span>
                </button>
            </div>

            <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 pb-6">
                {threads.length > 0 ? (
                    threads.map((thread) => (
                        <Link
                            key={thread.id}
                            href={route("thread.show", { threadId: thread.id })}
                            className="flex items-center gap-3 rounded-full px-5 py-3 text-left text-base font-semibold transition hover:bg-green-800/80 focus:outline-none focus:ring-2 focus:ring-white/60"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-800/70">
                                <ChatBubbleIcon className="h-6 w-6 text-white/90" />
                            </div>
                            <span>{thread.title}</span>
                        </Link>
                    ))
                ) : (
                    <p className="px-5 py-3 text-sm text-white/70">
                        スレッドがまだありません
                    </p>
                )}
            </nav>
        </aside>
    );
}
