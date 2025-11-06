import { Button } from "flowbite-react";
import { router } from "@inertiajs/react";

export function LogoutButton({ className = "" }) {
    const handleLogout = () => {
        router.post(route("logout"));
    };

    const baseClass = "bg-gray-200 px-6 py-2 text-lg font-semibold text-gray-900 shadow-md transition hover:bg-gray-300";

    return (
        <Button
            color="light"
            pill
            className={`${baseClass}${className ? ` ${className}` : ""}`}
            onClick={handleLogout}
        >
            ログアウト
        </Button>
    );
}
