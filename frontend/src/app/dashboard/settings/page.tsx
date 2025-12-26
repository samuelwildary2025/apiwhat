'use client';

import { useState } from 'react';
import {
    Book,
    Code,
    Copy,
    Check,
    Server,
    Shield,
    Terminal,
    MessageSquare,
    Image as ImageIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Documentação</h2>
                    <p className="text-[var(--muted-foreground)] mt-1">Guia de integração da API WhatsApp</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Navigation (Optional, maybe for future) or Info Cards */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-[var(--primary)]" />
                            </div>
                            <h3 className="font-semibold">Autenticação</h3>
                        </div>
                        <p className="text-sm text-[var(--muted-foreground)]">
                            Todas as requisições de envio de mensagem devem incluir o cabeçalho de autenticação com o token da instância.
                        </p>
                        <div className="p-3 bg-[var(--background)] rounded-lg border border-[var(--border)] font-mono text-xs">
                            X-Instance-Token: &lt;seu_token&gt;
                        </div>
                    </div>

                    <div className="card p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Server className="w-5 h-5 text-blue-500" />
                            </div>
                            <h3 className="font-semibold">Base URL</h3>
                        </div>
                        <p className="text-sm text-[var(--muted-foreground)]">
                            Utilize a URL base do seu servidor para todas as chamadas.
                        </p>
                        <div className="p-3 bg-[var(--background)] rounded-lg border border-[var(--border)] font-mono text-xs break-all">
                            {typeof window !== 'undefined' ? window.location.origin : 'https://api.seudominio.com'}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Send Text Section */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
                            <MessageSquare className="w-5 h-5 text-[var(--primary)]" />
                            <h3 className="text-xl font-semibold">Enviar Mensagem de Texto</h3>
                        </div>
                        
                        <div className="card overflow-hidden">
                            <div className="border-b border-[var(--border)] bg-[var(--secondary)]/30 px-4 py-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-500">POST</span>
                                    <span className="font-mono text-sm text-[var(--muted-foreground)]">/message/text</span>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-3 text-[var(--foreground)]">Corpo da Requisição (JSON)</h4>
                                    <CodeBlock 
                                        language="json"
                                        code={`{
  "to": "5511999999999",
  "text": "Olá! Esta é uma mensagem de teste."
}`}
                                    />
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-3 text-[var(--foreground)]">Exemplo cURL</h4>
                                    <CodeBlock 
                                        language="bash"
                                        code={`curl -X POST ${typeof window !== 'undefined' ? window.location.origin : 'API_URL'}/message/text \\
  -H "Content-Type: application/json" \\
  -H "X-Instance-Token: SEU_TOKEN_AQUI" \\
  -d '{
    "to": "5511999999999",
    "text": "Olá! Enviado via API."
  }'`}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Send Media Section */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
                            <ImageIcon className="w-5 h-5 text-purple-500" />
                            <h3 className="text-xl font-semibold">Enviar Mídia</h3>
                        </div>
                        
                        <div className="card overflow-hidden">
                            <div className="border-b border-[var(--border)] bg-[var(--secondary)]/30 px-4 py-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-500">POST</span>
                                    <span className="font-mono text-sm text-[var(--muted-foreground)]">/message/media</span>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-3 text-[var(--foreground)]">Corpo da Requisição (JSON)</h4>
                                    <CodeBlock 
                                        language="json"
                                        code={`{
  "to": "5511999999999",
  "mediaUrl": "https://exemplo.com/imagem.png",
  "caption": "Legenda da imagem (opcional)"
}`}
                                    />
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-3 text-[var(--foreground)]">Exemplo cURL</h4>
                                    <CodeBlock 
                                        language="bash"
                                        code={`curl -X POST ${typeof window !== 'undefined' ? window.location.origin : 'API_URL'}/message/media \\
  -H "Content-Type: application/json" \\
  -H "X-Instance-Token: SEU_TOKEN_AQUI" \\
  -d '{
    "to": "5511999999999",
    "mediaUrl": "https://exemplo.com/imagem.png",
    "caption": "Olha essa imagem!"
  }'`}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function CodeBlock({ code, language }: { code: string; language: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success('Copiado para a área de transferência!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                    title="Copiar código"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
            <pre className="p-4 rounded-lg bg-[#0c0c0e] border border-[var(--border)] overflow-x-auto font-mono text-sm leading-relaxed text-[var(--foreground)]">
                <code>{code}</code>
            </pre>
        </div>
    );
}
