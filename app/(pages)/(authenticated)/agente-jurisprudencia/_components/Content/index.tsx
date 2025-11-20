"use client";

import { apiLeggere } from "@/app/_services/api";
import ChatInputComponent from "../ChatInputComponent";
import { useState } from "react";

type MessageDataType = {
  id: number;
  userMessage: string;
  agentMessage: string;
};
function Content() {
  const [messages, setMessages] = useState<MessageDataType[]>([]);

  //   const renderAgentMessage = (text: string) => {
  //     if (!text) return null;

  //     // Split into paragraph blocks separated by one or more blank lines
  //     const blocks = text.split(/\n\s*\n/);

  //     return blocks.map((block, bi) => {
  //       const trimmed = block.trim();

  //       // Bold heading: **...** -> render as heading
  //       const headingMatch = trimmed.match(/^\*\*(.+)\*\*$/);
  //       if (headingMatch) {
  //         return (
  //           <h3 key={bi} className="font-semibold text-sm mt-2">
  //             {headingMatch[1].trim()}
  //           </h3>
  //         );
  //       }

  //       // Bullet blocks: lines starting with '* '
  //       const lines = block.split("\n").map((l) => l.replace(/^\s+/, ""));
  //       if (lines.some((l) => l.startsWith("* "))) {
  //         // Group lines into bullet items: lines starting with '* ' begin a new item; following lines belong to same item
  //         const items: string[] = [];
  //         let current: string | null = null;
  //         for (const line of lines) {
  //           if (line.startsWith("* ")) {
  //             if (current !== null) items.push(current);
  //             current = line.slice(2).trim();
  //           } else {
  //             if (current === null) current = line.trim();
  //             else current = current + "\n" + line.trim();
  //           }
  //         }
  //         if (current !== null) items.push(current);

  //         return (
  //           <ul key={bi} className="list-disc pl-5 mt-1 text-sm">
  //             {items.map((it, ii) => (
  //               <li key={ii} className="mb-1">
  //                 {it.split("\n").map((ln, lli) => (
  //                   <p key={lli} className={lli === 0 ? "m-0" : "mt-1 text-sm"}>
  //                     {ln}
  //                   </p>
  //                 ))}
  //               </li>
  //             ))}
  //           </ul>
  //         );
  //       }

  //       // Default: paragraph with line breaks preserved
  //       return (
  //         <div key={bi} className="text-sm leading-relaxed">
  //           {block.split("\n").map((line, li) => (
  //             <p key={li} className={li === 0 ? "m-0" : "mt-2"}>
  //               {line}
  //             </p>
  //           ))}
  //         </div>
  //       );
  //     });
  //   };

  const handleSendMessage = async (userMessage: string) => {
    const newListMessage = messages;

    newListMessage.push({
      id: messages.length,
      userMessage,
      agentMessage: "Pensando...",
    });

    setMessages(newListMessage);
    setMessages(() => [...newListMessage]);

    try {
      const response = await apiLeggere({
        method: "POST",
        url: "/graph/sendMessage/jurisprudence",
        data: {
          message: userMessage,
        },
      });

      const { data } = response;

      newListMessage[newListMessage.length - 1].agentMessage = data.message;
      setMessages(() => [...newListMessage]);
    } catch (error) {
      console.error("Error sending message to jurisprudence agent:", error);
    }
  };

  return (
    <div className="h-full">
      <div className="max-w-5xl m-auto h-full grid grid-rows-[1fr_auto] gap-4">
        <div className="overflow-y-auto" id="chat-container">
          <div className="flex flex-col p-4" role="log" aria-live="polite">
            {messages.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground">
                Nenhuma mensagem ainda. Envie uma pergunta sobre jurisprudência.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map((m, idx) => (
                  <div key={idx} className="space-y-2">
                    {/* user message (right) */}
                    <div className="flex w-full">
                      <div className="flex-1" />
                      <div className="max-w-[70%] bg-primary text-primary-foreground px-4 py-2 rounded-lg rounded-tr-none shadow-sm">
                        {m.userMessage}
                      </div>
                    </div>

                    {/* agent message (left) */}
                    <div className="flex w-full">
                      <div className="max-w-[70%] bg-muted/80 text-foreground px-4 py-2 rounded-lg rounded-bl-none whitespace-pre-line">
                        {m.agentMessage}
                      </div>
                      <div className="flex-1" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <ChatInputComponent placeholder="Escreva uma mensagem sobre jurisprudência" onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default Content;
