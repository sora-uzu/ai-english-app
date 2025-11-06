import { Head } from "@inertiajs/react";
import { LogoutButton } from "../../Components/LogoutButton";
import { SideMenu } from "../../Components/SideMenu";

export default function ThreadShow({ user }) {
    const userName = user?.name ?? "ゲスト";

    return (
        <>
            <Head title="Thread Show" />
            <div className="flex min-h-screen bg-gray-900">
                <SideMenu />
                <main className="flex flex-1 flex-col bg-gray-800 px-10 py-12 text-white">
                    <div className="flex items-center justify-end gap-4">
                        <span className="text-lg font-semibold text-gray-200">
                            {userName}
                        </span>
                        <LogoutButton />
                    </div>

                    <section className="mt-12">
                        <h2 className="text-2xl font-bold">英会話画面</h2>
                    </section>
                </main>
            </div>
        </>
    );
}
