import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../core/types';
import { api } from '../../core/api';

interface StudentAiChatDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: 'Xin chào bạn Hoàng Nam! 👋 Mình là Trợ lý AI SmartDorm. Mình có thể hỗ trợ bạn tra cứu thông tin phòng P.402, hướng dẫn chuyển phòng/gia hạn, giải thích hóa đơn hoặc tiếp nhận báo hỏng sự cố nhé!',
    time: '08:42'
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Hồ sơ xin chuyển sang phòng đơn học kỳ 2 của mình đã được duyệt chưa?',
    time: '08:44'
  },
  {
    id: 'msg-3',
    sender: 'bot',
    text: 'Dạ chào Nam, theo dữ liệu từ Ban Quản lý KTX lúc 08:45 hôm nay:\n⏱️ Thời gian dự kiến: Trước ngày 28/10/2024. Bạn sẽ nhận được SMS và thông báo trên Cổng ngay khi Quản lý Nguyễn Thu Trang duyệt nhé!\n💡 Cần hỗ trợ gấp, bạn có thể gọi hotline Tòa B: Máy lẻ 104.',
    time: '08:45',
    details: {
      code: '#DK-24098',
      wish: 'Chuyển sang B402 (Phòng 2 người/Đơn)',
      status: 'Chờ cán bộ xét duyệt'
    }
  }
];

export const StudentAiChatDrawer: React.FC<StudentAiChatDrawerProps> = ({
  isOpen,
  onToggle,
  onClose
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const res = await api.sendStudentAiChat(text);
      setIsTyping(false);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: res.reply,
        time: res.time
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Xin lỗi Nam, hiện tại máy chủ xử lý AI đang bận. Bạn vui lòng thử lại sau vài giây hoặc liên hệ hotline BQL 024 3754 7890 nhé!',
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <>
      {/* FLOATING CHAT WINDOW */}
      {isOpen && (
        <div
          id="ai-chat-window"
          className="fixed bottom-6 right-6 w-[390px] max-w-[calc(100vw-2rem)] h-[580px] bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl shadow-2xl z-50 flex flex-col border border-outline-variant/30 animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Chat Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-primary to-tertiary rounded-t-2xl text-on-primary flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-on-primary/20 backdrop-blur flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary-container ring-2 ring-primary" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-on-primary">Trợ lý AI SmartDorm</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-on-primary/20 text-on-primary font-medium">
                    v2.4
                  </span>
                </div>
                <span className="text-[11px] text-on-primary/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Hỗ trợ 24/7 • Quyền SV (RBAC)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg hover:bg-on-primary/20 text-on-primary transition-colors"
                title="Thu nhỏ"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-on-primary/20 text-on-primary transition-colors"
                title="Đóng"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : ''}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                  </div>
                )}

                <div
                  className={`flex flex-col gap-1 max-w-[85%] ${
                    m.sender === 'user' ? 'items-end' : ''
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'rounded-tr-sm bg-primary text-on-primary shadow-sm'
                        : 'rounded-tl-sm bg-surface-container text-on-surface'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>

                    {m.details && (
                      <div className="p-2.5 rounded-lg bg-surface-container-lowest mt-2 flex flex-col gap-1 text-[11px] text-on-surface border border-outline-variant/30">
                        <div className="flex items-center gap-1.5 text-primary font-semibold">
                          <span className="material-symbols-outlined text-[14px]">description</span>
                          <span>Mã đơn: {m.details.code}</span>
                        </div>
                        <p className="text-on-surface-variant">
                          Nguyện vọng: <strong>{m.details.wish}</strong>
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-semibold text-on-surface">Trạng thái:</span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                            {m.details.status}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-outline px-1">{m.time}</span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    HN
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                </div>
                <div className="p-3 rounded-2xl rounded-tl-sm bg-surface-container text-on-surface text-xs italic">
                  SmartDorm AI đang kiểm tra dữ liệu KTX...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions chips */}
          <div className="px-4 py-2 bg-surface-container-low flex items-center gap-1.5 overflow-x-auto border-t border-surface-container-high">
            {[
              'Tiền điện tháng 10?',
              'Quy định giờ giới nghiêm',
              'Thủ tục gia hạn hợp đồng'
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container text-[11px] font-medium transition-colors shadow-xs border border-outline-variant/30"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-surface-container-lowest rounded-b-2xl border-t border-surface-container-high">
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <button
                type="button"
                className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                title="Đính kèm ảnh hỏng hóc"
                onClick={() => alert('Đã mở công cụ tải ảnh đính kèm hiện trường.')}
              >
                <span className="material-symbols-outlined text-[20px]">attach_file</span>
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-surface-container-low h-10 px-3 rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary"
                placeholder="Hỏi AI về hóa đơn, quy định KTX..."
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-lg bg-primary text-on-primary hover:bg-primary-container flex items-center justify-center transition-colors shadow-sm shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING FAB TRIGGER BUTTON */}
      <button
        aria-label="Mở Trợ lý AI SmartDorm"
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-tertiary text-on-primary shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center z-40"
      >
        <span className="material-symbols-outlined text-[28px]">smart_toy</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-error ring-2 ring-surface-container-lowest text-[10px] font-bold text-on-error flex items-center justify-center">
          1
        </span>
      </button>
    </>
  );
};
