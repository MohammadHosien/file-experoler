"use client";
import { useState } from "react";
import { BiSolidFileTxt } from "react-icons/bi";
import { FaCss3Alt, FaJsSquare } from "react-icons/fa";
import { IoLogoHtml5 } from "react-icons/io";

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
  const [input, setInput] = useState("");

  const extentions = [
    { name: "html", icon: <IoLogoHtml5 size={30} /> },
    { name: "css", icon: <FaCss3Alt size={30} /> },
    { name: "js", icon: <FaJsSquare size={30} /> },
    { name: "txt", icon: <BiSolidFileTxt size={30} /> },
  ];
  return (
    <>
      {extentions.map((i) => (
        <>
          {index === i.name && (
            <div className="w-fit text-center mt-4">
              {i.icon}
              {!openInput ? (
                <div onClick={() => setOpenInput(true)}>
                  {name}.{index}
                </div>
              ) : (
                <input
                  className="outline border w-[100px]"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateNameHandler(input);
                    }
                  }}
                />
              )}
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default File;
