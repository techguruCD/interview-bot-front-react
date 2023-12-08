import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as MicrophoneSVG } from '../assets/images/svgs/microphone.svg'
import { ReactComponent as AirplaneSVG } from '../assets/images/svgs/airplane.svg'
import { cn } from "../utils";

const Message = ({
  text,
  avatar,
  isRight = false,
}) => {
  if (!text) return <></>;

  return (
    <div
      className={cn({
        "flex gap-4 items-center max-w-[90%]": true,
        "flex-row-reverse ml-auto": isRight,
      })}
    >
      <img src={avatar} className="w-10 sm:w-12 md:w-14" />
      <div className="px-4 py-3 sm:py-6 bg-[#6355D830] rounded-md font-[500] max-w-[600px]">
        {text}
      </div>
    </div>
  );
};

export default function ChatBox({
  greeting = "",
  prompt = "",
}) {
  const chatBoxRef = useRef(null);
  const [history, setHistory] = useState([["", greeting]]);

  const [payload, setPayload] = useState("");

  useEffect(() => {
    setHistory([["", greeting]]);
  }, [greeting]);

  const handleSend = async () => {
    
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  return (
    <div className="flex min-h-[500px] flex-col w-full justify-between px-2 sm:px-10 md:px-28 mb-3 sm:mb-20">
      <div
        ref={chatBoxRef}
        className="flex flex-col gap-3 sm:gap-8 mb-3 sm:mb-8 text-[14px] sm:text-[16px] max-h-[500px] overflow-y-auto scrollbar px-4"
      >
        {history &&
          history
            .flat()
            .map((item, index) => (
              <Message
                text={item}
                avatar={
                  index % 2 ? "/images/logo.png" : "/images/interviewer.png"
                }
                isRight={index % 2 === 0}
                key={index}
              />
            ))}
      </div>
      <div>
        <div className="flex items-center pr-4 gap-3 border-[1px] border-[#6355D8] rounded-md mt-5 sm:mt-0">
          <input
            className="py-2 px-4 w-full bg-transparent"
            placeholder="Send your message"
            value={payload}
            onChange={(e) => {
              setPayload(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="flex gap-3 text-gray-500">
            <button>
              <MicrophoneSVG width={20} />
            </button>
            <button onClick={handleSend}>
              <AirplaneSVG width={20} className="-rotate-45" />
            </button>
          </div>
        </div>
        <p className="text-center mt-4 text-gray-600 text-[14px] sm:text-[16px]">
          Interview Bot may produce inaccurate information about people, places,
          of fact.{" "}
          <span className="text-[#6355D8] underline">Privacy Notice</span>
        </p>
      </div>
    </div>
  );
};
