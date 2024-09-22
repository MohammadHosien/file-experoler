"use client";
import { useState } from "react";
import { BiSolidFileTxt } from "react-icons/bi";
import { FaCss3Alt, FaJsSquare } from "react-icons/fa";
import { IoLogoHtml5 } from "react-icons/io";
import { PiFileJsLight } from "react-icons/pi";

const File = ({
  index,
  name,
  updateNameHandler,
}: {
  index: string;
  name: string;
  updateNameHandler: (e: string) => void;
}) => {
  const [openInput, setOpenInput] = useState(false);
  const [input, setInput] = useState(name);

  const extentions = [
    { name: "html", icon: <IoLogoHtml5 size={60} /> },
    { name: "css", icon: <FaCss3Alt size={60} /> },
    { name: "js", icon: <PiFileJsLight size={60}/>},
    { name: "txt", icon: <BiSolidFileTxt size={60} /> },
  ];
  return (
    <>
      {extentions.map((i) => (
        <div key={i.name}>
          {index === i.name && (
            <div className="w-fit text-center mt-4">
              {i.icon}
              {!openInput ? (
                <div className="cursor-pointer" onClick={() => setOpenInput(true)}>
                  {name}.{index}
                </div>
              ) : (
                <input
                  value={name}
                  className="outline-none border w-[100px]"
                  onChange={(e) => setInput(e.target.value)}
                  onBlur={() => {
                    setOpenInput(false);
                    updateNameHandler(input);
                  }}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateNameHandler(input);
                      setOpenInput(false);
                    }
                  }}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default File;
