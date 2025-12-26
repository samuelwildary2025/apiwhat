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
    Image as ImageIcon,
    Settings,
    Activity,
    Users,
    Phone,
    Share2,
    Database,
    Zap,
    MessageCircle,
    UserCheck,
    Globe,
    Lock,
    Tag
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('instance');

    const sections = [
        { id: 'admin', label: 'Administração', icon: Shield },
        { id: 'instance', label: 'Instância', icon: Settings },
        { id: 'messages', label: 'Enviar Mensagem', icon: MessageSquare },
        { id: 'actions', label: 'Ações e Buscar', icon: Activity },
        { id: 'chats', label: 'Chats', icon: MessageCircle },
        { id: 'contacts', label: 'Contatos', icon: Users },
        { id: 'groups', label: 'Grupos', icon: Users },
        { id: 'labels', label: 'Etiquetas', icon: Tag },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Documentação da API</h2>
                    <p className="text-[var(--muted-foreground)] mt-1">Guia completo de endpoints do uazapiGO</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card p-4 space-y-2 sticky top-24">
                        <h3 className="text-sm font-semibold text-[var(--muted-foreground)] px-3 mb-2 uppercase tracking-wider">Módulos</h3>
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    activeSection === section.id
                                        ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                                        : 'text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]'
                                }`}
                            >
                                <section.icon className="w-4 h-4" />
                                {section.label}
                            </button>
                        ))}

                        <div className="pt-6 mt-6 border-t border-[var(--border)]">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Autenticação</h3>
                                    <div className="p-3 bg-[var(--background)] rounded-lg border border-[var(--border)] font-mono text-xs text-[var(--foreground)]">
                                        X-Instance-Token: &lt;token&gt;
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Base URL</h3>
                                    <div className="p-3 bg-[var(--background)] rounded-lg border border-[var(--border)] font-mono text-xs break-all text-[var(--foreground)]">
                                        {typeof window !== 'undefined' ? window.location.origin : 'API_URL'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">
                    {activeSection === 'admin' && (
                        <div className="space-y-6 animate-fade-in">
                            <EndpointCard
                                method="POST"
                                path="/instance/create"
                                title="Criar Instância"
                                description="Cria uma nova instância do WhatsApp."
                                body={`{
  "instanceName": "Minha Instância"
}`}
                            />
                            <EndpointCard
                                method="GET"
                                path="/instance/fetchInstances"
                                title="Listar Instâncias"
                                description="Lista todas as instâncias criadas."
                            />
                        </div>
                    )}

                    {activeSection === 'instance' && (
                        <div className="space-y-6 animate-fade-in">
                            <EndpointCard
                                method="GET"
                                path="/instance/:id/connect"
                                title="Conectar Instância"
                                description="Gera o QR Code para conexão."
                            />
                            <EndpointCard
                                method="DELETE"
                                path="/instance/:id/logout"
                                title="Desconectar"
                                description="Desconecta a instância do WhatsApp."
                            />
                            <EndpointCard
                                method="GET"
                                path="/instance/:id/status"
                                title="Verificar Status"
                                description="Retorna o status atual da conexão."
                            />
                        </div>
                    )}

                    {activeSection === 'messages' && (
                        <div className="space-y-6 animate-fade-in">
                            <EndpointCard
                                method="POST"
                                path="/message/text"
                                title="Enviar mensagem de texto"
                                description="Envia uma mensagem de texto simples."
                                body={`{
  "to": "5511999999999",
  "text": "Olá mundo!"
}`}
                            />
                            <EndpointCard
                                method="POST"
                                path="/message/media"
                                title="Enviar mídia"
                                description="Envia imagem, vídeo, áudio ou documento."
                                body={`{
  "to": "5511999999999",
  "mediaUrl": "https://exemplo.com/foto.jpg",
  "caption": "Legenda da foto"
}`}
                            />
                            <EndpointCard
                                method="POST"
                                path="/message/contact"
                                title="Enviar cartão de contato"
                                description="Envia um contato (vCard) para o chat."
                                body={`{
  "to": "5511999999999",
  "contactId": "5511888888888@c.us"
}`}
                            />
                            <EndpointCard
                                method="POST"
                                path="/message/location"
                                title="Enviar localização geográfica"
                                description="Envia uma localização com latitude e longitude."
                                body={`{
  "to": "5511999999999",
  "latitude": -23.550520,
  "longitude": -46.633308,
  "description": "São Paulo, SP"
}`}
                            />
                            <EndpointCard
                                method="POST"
                                path="/message/presence"
                                title="Enviar atualização de presença"
                                description="Simula ações como 'Digitando...' ou 'Gravando áudio'."
                                body={`{
  "to": "5511999999999",
  "presence": "composing" 
  // composing, recording, available, unavailable
}`}
                            />
                            <EndpointCard
                                method="POST"
                                path="/message/poll"
                                title="Enviar enquete (Poll)"
                                description="Cria uma enquete com múltiplas opções."
                                body={`{
  "to": "5511999999999",
  "title": "Qual sua cor favorita?",
  "options": ["Azul", "Vermelho", "Verde"],
  "allowMultipleAnswers": true
}`}
                            />
                        </div>
                    )}

                    {activeSection === 'actions' && (
                        <div className="space-y-6 animate-fade-in">
                            <EndpointCard
                                method="POST"
                                path="/message/download"
                                title="Baixar arquivo de uma mensagem"
                                description="Baixa o arquivo associado a uma mensagem de mídia."
                                body={`{
  "id": "7E8F0D17244B421048F0763C8638760",
  "return_base64": false,
  "generate_mp3": false,
  "return_link": false,
  "transcribe": false,
  "openai_apikey": "sk-...",
  "download_quoted": false
}`}
                            />
                             <EndpointCard
                                method="POST"
                                path="/message/react"
                                title="Enviar reação a uma mensagem"
                                description="Envia uma reação (emoji) para uma mensagem específica."
                                body={`{
  "messageId": "ID_DA_MENSAGEM",
  "reaction": "❤️"
}`}
                            />
                             <EndpointCard
                                method="POST"
                                path="/message/edit"
                                title="Editar uma mensagem enviada"
                                description="Edita o conteúdo de uma mensagem de texto enviada anteriormente."
                                body={`{
  "messageId": "ID_DA_MENSAGEM",
  "newText": "Texto corrigido"
}`}
                            />
                             <EndpointCard
                                method="POST"
                                path="/message/read"
                                title="Marcar mensagens como lidas"
                                description="Marca um chat como lido."
                                body={`{
  "chatId": "5511999999999@s.whatsapp.net"
}`}
                            />
                             <EndpointCard
                                method="POST"
                                path="/message/delete"
                                title="Apagar Mensagem Para Todos"
                                description="Deleta uma mensagem para todos no chat."
                                body={`{
  "messageId": "ID_DA_MENSAGEM",
  "forEveryone": true
}`}
                            />
                             <EndpointCard
                                method="POST"
                                path="/message/search"
                                title="Buscar mensagens em um chat"
                                description="Busca histórico de mensagens de um chat."
                                body={`{
  "chatId": "5511999999999@s.whatsapp.net",
  "limit": 50
}`}
                            />
                        </div>
                    )}

                    {activeSection === 'chats' && (
                        <div className="space-y-6 animate-fade-in">
                            <EndpointCard
                                method="POST"
                                path="/chat/delete"
                                title="Deleta chat"
                                description="Deleta um chat e todas as mensagens."
                                body={`{
  "chatId": "5511999999999@c.us"
}`}
                            />
                            <EndpointCard
                                method="POST"
                                path="/chat/archive"
                                title="Arquivar/desarquivar chat"
                                description="Arquiva ou desarquiva um chat. Use /chat/unarchive para desarquivar."
                                body={`{
  "chatId": "5511999999999@c.us"
}`}
                            />
                            <EndpointCard
                                method="POST"
                                path="/chat/read"
                                title="Marcar chat como lido/não lido"
                                description="Marca como lido. Use /chat/unread para marcar como não lido."
                                body={`{
  "chatId": "5511999999999@c.us"
}`}
                            />
                            <EndpointCard
                                method="POST"
                                path="/chat/mute"
                                title="Silenciar chat"
                                description="Silencia notificações de um chat."
                                body={`{
  "chatId": "5511999999999@c.us",
  "duration": "8h" // 8h, 1w, forever
}`}
                            />
                            <EndpointCard
                                method="POST"
                                path="/chat/pin"
                                title="Fixar/desafixar chat"
                                description="Fixa um chat no topo. Use /chat/unpin para desafixar."
                                body={`{
  "chatId": "5511999999999@c.us"
}`}
                            />
                            <EndpointCard
                                method="POST"
                                path="/chats/search"
                                title="Busca chats com filtros"
                                description="Busca e filtra chats."
                                body={`{
  "page": 1,
  "limit": 10,
  "filter": "all" // all, unread, groups, contacts, archived
}`}
                            />
                        </div>
                    )}

                    {activeSection === 'labels' && (
                        <div className="space-y-6 animate-fade-in">
                             <EndpointCard
                                method="POST"
                                path="/labels/chat"
                                title="Gerencia labels de um chat"
                                description="Adiciona ou remove uma etiqueta de um chat."
                                body={`{
  "chatId": "5511999999999@c.us",
  "labelId": "72",
  "action": "add" // add, remove
}`}
                            />
                            <EndpointCard
                                method="POST"
                                path="/labels/edit"
                                title="Editar etiqueta"
                                description="Edita propriedades de uma etiqueta."
                                body={`{
  "labelId": "72",
  "name": "Novo Nome",
  "color": "#ff0000"
}`}
                            />
                            <EndpointCard
                                method="GET"
                                path="/labels"
                                title="Buscar todas as etiquetas"
                                description="Retorna todas as etiquetas disponíveis."
                            />
                        </div>
                    )}

                    {activeSection === 'groups' && (
                        <div className="space-y-6 animate-fade-in">
                             <EndpointCard
                                method="GET"
                                path="/group/list"
                                title="Listar Grupos"
                                description="Lista todos os grupos que a instância participa."
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function EndpointCard({ 
    method, 
    path, 
    title, 
    description, 
    body 
}: { 
    method: 'GET' | 'POST' | 'DELETE' | 'PUT', 
    path: string, 
    title: string, 
    description: string, 
    body?: string 
}) {
    const methodColors = {
        GET: 'bg-blue-500/20 text-blue-500',
        POST: 'bg-green-500/20 text-green-500',
        DELETE: 'bg-red-500/20 text-red-500',
        PUT: 'bg-orange-500/20 text-orange-500',
    };

    return (
        <div className="card overflow-hidden group hover:border-[var(--primary)]/30 transition-all">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2.5 py-1 rounded text-xs font-bold ${methodColors[method]}`}>
                                {method}
                            </span>
                            <h3 className="font-semibold text-lg">{title}</h3>
                        </div>
                        <p className="text-[var(--muted-foreground)] text-sm">{description}</p>
                    </div>
                </div>

                <div className="bg-[var(--background)] rounded-lg border border-[var(--border)] p-3 font-mono text-sm text-[var(--foreground)] mb-4 flex items-center justify-between">
                    <span>{path}</span>
                    <CopyButton text={path} />
                </div>

                {body && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase">Body (JSON)</span>
                            <CopyButton text={body} />
                        </div>
                        <pre className="p-4 rounded-lg bg-[#0c0c0e] border border-[var(--border)] overflow-x-auto font-mono text-sm leading-relaxed text-[var(--foreground)]">
                            <code>{body}</code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success('Copiado!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            title="Copiar"
        >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
    );
}
