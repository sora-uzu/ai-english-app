
import { Head } from "@inertiajs/react";
import { LogoutButton } from "../Components/LogoutButton";
import { SideMenu } from "../Components/SideMenu";

const GRID_ROWS = 7;
const GRID_COLS = 12;
const highlightedCells = new Set(["0-10", "0-11", "1-11"]);

export default function Top({ user, threads = [] }) {
    const userName = user?.name ?? "ゲスト";

    return (
        <>
            <Head title="Top" />
            <div className="flex min-h-screen bg-gray-900">
                <SideMenu threads={threads} />
                <main className="flex flex-1 flex-col bg-gray-800 px-10 py-12 text-white">
                    <div className="flex items-center justify-end gap-4">
                        <span className="text-lg font-semibold text-gray-200">
                            {userName}
                        </span>
                        <LogoutButton />
                    </div>

                    <section className="mt-12">
                        <h2 className="text-2xl font-bold">英会話学習記録</h2>
                        <div className="mt-6 inline-block rounded-xl bg-gray-700 p-5 shadow-lg">
                            <div className="rounded-lg border border-gray-500 bg-gray-600 p-[3px]">
                                <div className="grid grid-cols-12 gap-[3px]">
                                    {Array.from({ length: GRID_ROWS }).map(
                                        (_, row) =>
                                            Array.from({
                                                length: GRID_COLS,
                                            }).map((_, col) => {
                                                const key = `${row}-${col}`;
                                                const isHighlighted =
                                                    highlightedCells.has(key);
                                                return (
                                                    <div
                                                        key={key}
                                                        className={`h-6 w-6 border border-gray-500 sm:h-8 sm:w-8 md:h-10 md:w-10 ${
                                                            isHighlighted
                                                                ? "bg-green-500"
                                                                : "bg-gray-300"
                                                        }`}
                                                    />
                                                );
                                            })
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
