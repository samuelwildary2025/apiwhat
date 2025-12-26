'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import {
    MessageSquare,
    BarChart3,
    Smartphone,
    Megaphone,
    Settings,
    Users,
    LogOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-64 border-r border-[var(--border)] p-4 flex flex-col h-screen sticky top-0">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-black" />
                </div>
                <div>
                    <h1 className="font-bold">WhatsApp API</h1>
                    <p className="text-xs text-[var(--muted)]">Painel Admin</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive('/dashboard')
                            ? 'bg-[var(--card)] text-[var(--primary)]'
                            : 'hover:bg-[var(--card)]'
                    }`}
                >
                    <BarChart3 className="w-5 h-5" />
                    Dashboard
                </Link>
                <Link
                    href="/dashboard/instances"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive('/dashboard/instances')
                            ? 'bg-[var(--card)] text-[var(--primary)]'
                            : 'hover:bg-[var(--card)]'
                    }`}
                >
                    <Smartphone className="w-5 h-5" />
                    Instâncias
                </Link>
                <Link
                    href="/dashboard/campaigns"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive('/dashboard/campaigns')
                            ? 'bg-[var(--card)] text-[var(--primary)]'
                            : 'hover:bg-[var(--card)]'
                    }`}
                >
                    <Megaphone className="w-5 h-5" />
                    Campanhas
                </Link>
                <Link
                    href="/dashboard/settings"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive('/dashboard/settings')
                            ? 'bg-[var(--card)] text-[var(--primary)]'
                            : 'hover:bg-[var(--card)]'
                    }`}
                >
                    <Settings className="w-5 h-5" />
                    Configurações
                </Link>
            </nav>

            <div className="border-t border-[var(--border)] pt-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center">
                        <Users className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{user?.name || user?.email}</p>
                        <p className="text-xs text-[var(--muted)]">{user?.role}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--danger)] transition-colors w-full px-3 py-2"
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </button>
            </div>
        </aside>
    );
}
