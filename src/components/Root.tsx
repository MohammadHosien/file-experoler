import { useEffect, useState } from "react";
import { BiFolder } from "react-icons/bi";
import { CgFileRemove, CgFolderAdd } from "react-icons/cg";
import { FiFilePlus } from "react-icons/fi";
import { MdOutlineFolderDelete } from "react-icons/md";
import { v4 as uuid } from "uuid";
import File from "./File";
import { useImmer } from "use-immer";

const Root = ({
  name,
  getData,
  deleteHandler,
  defaultValues,
  fileIndex,
  updateHandler,
}: {
  name: string;
  updateHandler?: (name: string) => void;
  getData?: (e: any) => void;
  deleteHandler?: (e: any) => void;
  defaultValues?: any;
  addFileHandler?: any;
  fileIndex?: string;
}) => {
  const [direction, setDirection] = useImmer<
    { name: string; subset?: string[]; id: string; index?: string }[]
  >(defaultValues ?? []);

  const [num, setNum] = useState(0);
  const [isOpenFileInput, setIsOpenFileInput] = useState(false);
  const [fileInput, setFileInput] = useState("");
  const [error, setError] = useState("");
  const [openUpdataNameInput, setOpenUpdateNameInput] = useState(false);
  const [updateNameInput, setUpdateNameInput] = useState(name??"");

  useEffect(() => {
    if (direction.length > 0) {
      getData?.(direction);
    }
  }, [direction]);

  const fileValidator = (input: string) => {
    let status = true;
    let errorMessage;
    let regex = /\.(html|txt|css|js)$/;

    if (!input.includes(".")) {
      status = false;
      errorMessage = "file must have prefix";
    }

    if (!regex.test(input)) {
      status = false;
      errorMessage = "just format html , css , js , txt";
    }

    if (input.length <= 0) {
      status = false;
      errorMessage = "required";
    }

    return { message: errorMessage, status };
  };

  return (
    <>
      <div className="flex gap-3 items-center">
        {fileIndex ? (
          <File updateNameHandler={updateHandler!} index={fileIndex} name={name} />
        ) : (
          <>
            <div className="text-center w-fit">
              <BiFolder size={80} />
              <div
                className="cursor-pointer"
                onClick={() => {
                  setOpenUpdateNameInput(true);
                }}
              >
                {!openUpdataNameInput ? (
                  name
                ) : (
                  <input
                    className="w-[100px] border outline-none"
                    value={updateNameInput}
                    autoFocus
                    onChange={(e) => {
                      setUpdateNameInput(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateHandler?.(updateNameInput);
                        setOpenUpdateNameInput(false)
                      }
                    }}
                    onBlur={() => {
                      setOpenUpdateNameInput(false);
                    }}
                  />
                )}
              </div>
            </div>
            <CgFolderAdd
              className="cursor-pointer"
              onClick={() => {
                setNum(num + 1);
                const id = uuid();
                setDirection([
                  ...direction,
                  { name: `new folder (${num})`, subset: [], id },
                ]);
              }}
              size={30}
            />
          </>
        )}

        {name !== "root" ? (
          <>
            {fileIndex ? (
              <CgFileRemove size={30} onClick={deleteHandler} />
            ) : (
              <MdOutlineFolderDelete
                className="inline cursor-pointer"
                size={35}
                onClick={deleteHandler}
              />
            )}
            {!fileIndex ? (
              <FiFilePlus
                onClick={() => {
                  setIsOpenFileInput(true);
                }}
                size={25}
                className="cursor-pointer"
              />
            ) : null}
          </>
        ) : null}
      </div>

      <div className="ms-6">
        {isOpenFileInput ? (
          <>
            <input
              autoFocus
              onBlur={() => {
                setIsOpenFileInput(false);
                setError("");
              }}
              onChange={(e) => {
                setFileInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (fileValidator(fileInput)?.status) {
                    setDirection((dir) => {
                      dir.push({
                        name: fileInput.split(".")[0],
                        index: fileInput.split(".")[1],
                        id: uuid(),
                      });
                    });
                    setIsOpenFileInput(false);
                  }
                  setError(fileValidator(fileInput)?.message!);
                }
              }}
              className="border mt-2 ps-1 rounded-md outline-none"
            />
            <div className="text-red-700">{error}</div>
          </>
        ) : null}

        {direction.map((i: any) => (
          <div className="items-center gap-3" key={i.id}>
            <Root
              name={i.name}
              fileIndex={i.index}
              updateHandler={(name) => {
                setDirection((dir) => {
                  let findedDirectory = dir.find((d) => d.id === i.id);
                  if (findedDirectory) {
                    findedDirectory.name = name;
                    return;
                  }
                  return dir;
                });
              }}
              defaultValues={i.subset ?? []}
              deleteHandler={() => {
                setDirection(direction.filter((d) => d.id !== i.id));
              }}
              getData={(e) => {
                setDirection((dir) => {
                  let findedDirectory = dir.find((d) => d.id === i.id);
                  if (findedDirectory) {
                    findedDirectory.subset = e;
                    return;
                  }
                  return dir;
                });
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Root;
