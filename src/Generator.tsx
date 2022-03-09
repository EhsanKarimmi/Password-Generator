import React, { useState } from "react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    uppercaseCharacters,
    lowercaseCharacters,
    numbersCharacters,
    symbolsCharacters,
} from "./components/Characters";

function Generator() {
    const [password, setPassword] = useState("");
    //
    const [passwordLength, setPasswordLength] = useState<number | null>(10);
    //
    const [uppercase, setUppercase] = useState(false);
    //
    const [lowercase, setLowercase] = useState(false);
    //
    const [numbers, setNumbers] = useState(false);
    //
    const [symbols, setSymbols] = useState(false);
    //
    const generatePassword = () => {
        let characterList = "";
        if (uppercase) {
            characterList += uppercaseCharacters;
        }
        if (lowercase) {
            characterList += lowercaseCharacters;
        }
        if (numbers) {
            characterList += numbersCharacters;
        }
        if (symbols) {
            characterList += symbolsCharacters;
        }
        createPassword(characterList);
    };
    //
    const createPassword = (charList: string) => {
        let password = "";
        if (passwordLength) {
            for (let i = 0; i < passwordLength; i++) {
                password += charList.charAt(
                    Math.round(Math.random() * charList.length)
                );
            }
        }
        setPassword(password);
    };
    //
    const copyPassword = () => {
        if (password) {
            const textArea = document.createElement("textarea");
            textArea.innerText = password;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            textArea.remove();
            notification();
        }
    };
    //
    const notification = () => {
        toast.success("Password copied to clipboard.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className="mainContainer text-gray-200 h-screen flex items-center justify-center w-screen m-0">
            <div className="passGenerator p-5  lg:w-4/12 md:w-6/12  sm:w-1/2 rounded-xl  shadow-2xl">
                <div className="title font-medium text-3xl text-center ">
                    <span>Password Generator</span>
                </div>
                <div className="password flex justify-between items-center bg-gray-700 shadow-inner font-medium text-xl p-2  rounded-md mt-10">
                    {passwordLength &&
                    password &&
                    (uppercase || lowercase || numbers || symbols) ? (
                        <span>{password}</span>
                    ) : (
                        <span>Password</span>
                    )}
                    <span>
                        <HiOutlineClipboardCopy
                            onClick={() => copyPassword()}
                            className="text-3xl hover:text-cpy cursor-pointer transition-all duration-200 ease-linear"
                        />
                    </span>
                </div>
                <div className="passwordOptions  mt-4">
                    <h2 className="font-medium text-lg">Password Options &#123;</h2>
                    <div className="my-2 space-y-3">
                        <div className="flex items-center justify-between">
                            <label htmlFor="passwordLength">Password Length</label>
                            <input
                                type="number"
                                id="passwordLength"
                                min={8}
                                max={30}
                                value={passwordLength || ""}
                                onChange={(event) =>
                                    setPasswordLength(parseInt(event.target.value))
                                }
                                className="input input-bordered input-accent input-sm w-14 text-center"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="uppercase">UpperCase Letters</label>
                            <input
                                type="checkbox"
                                checked={uppercase}
                                onChange={(event) =>
                                    setUppercase(event.target.checked)
                                }
                                id="uppercase"
                                className="checkbox checkbox-accent"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="lowercase">LowerCase Letters</label>
                            <input
                                type="checkbox"
                                checked={lowercase}
                                onChange={(event) =>
                                    setLowercase(event.target.checked)
                                }
                                id="lowercase"
                                className="checkbox checkbox-accent"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="numbers">Numbers</label>
                            <input
                                type="checkbox"
                                checked={numbers}
                                onChange={(event) =>
                                    setNumbers(event.target.checked)
                                }
                                id="numbers"
                                className="checkbox checkbox-accent"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="symbols">Symbols</label>
                            <input
                                type="checkbox"
                                checked={symbols}
                                onChange={(event) =>
                                    setSymbols(event.target.checked)
                                }
                                id="symbols"
                                className="checkbox checkbox-accent"
                            />
                        </div>
                    </div>
                    <h2 className="font-medium text-lg"> &#125;</h2>
                </div>
                <div className="generatorButton  flex justify-center mt-4 ">
                    <button
                        onClick={() => generatePassword()}
                        className="btn btn-outline btn-success  w-full rounded-2xl font-bold md:text-lg "
                    >
                        Generate Password
                    </button>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={"colored"}
            />
        </div>
    );
}

export default Generator;
