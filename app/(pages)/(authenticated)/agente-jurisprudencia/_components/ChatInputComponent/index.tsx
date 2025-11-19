import * as React from "react";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/Button";
import { LuArrowUp } from "react-icons/lu";

interface ChatInputComponentProps {
  onSend?: (message: string) => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
}

function ChatInputComponent({
  onSend,
  placeholder = "Escreva uma mensagem...",
  disabled = false,
}: ChatInputComponentProps) {
  const [message, setMessage] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const send = async () => {
    const text = message.trim();
    if (!text || isSending || disabled) return;
    try {
      setIsSending(true);
      await onSend?.(text);
      setMessage("");
      // keep focus in textarea after send
      textareaRef.current?.focus();
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    // Allow plain Enter to insert a newline. Send only on Ctrl/Cmd+Enter.
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div className="flex gap-3 items-end bg-white p-4 rounded-full shadow-custom">
      <div className="flex-1">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isSending}
          aria-label="Mensagem do chat"
          // rows={1}
          className="min-h-0 h-12 rounded-full"
        />
        {/* <p className="mt-1 text-xs text-muted-foreground">
          Enter para nova linha — pressione Ctrl+Enter (ou ⌘+Enter) para enviar.
        </p> */}
      </div>

      <div className={`flex-shrink-0 w-12 h-12 ${message.trim() ? "" : "opacity-50"}`}>
        <Button
          onClick={() => void send()}
          disabled={disabled || isSending}
          size="sm"
          className="rounded-full w-12 h-12 p-0 !text-xl"
        >
          {/* {isSending ? "Enviando..." : "Enviar"} */}
          <LuArrowUp className="text-xl" width="2rem" height="2rem" />
        </Button>
      </div>
    </div>
  );
}

export default ChatInputComponent;
