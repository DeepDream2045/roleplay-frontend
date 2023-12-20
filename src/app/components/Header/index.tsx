// app/components/Header.tsx

import Link from "next/link";

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    return (
        <header>
            <Link href="/" legacyBehavior>
                <a>{title}</a>
            </Link>

            <nav>
                <Link href="/app/profile" legacyBehavior>
                    <a>My Profile</a>
                </Link>

                <Link href="/app/settings" legacyBehavior>
                    <a>Settings</a>
                </Link>
            </nav>
        </header>
    );
}
