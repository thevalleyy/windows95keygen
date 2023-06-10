import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";

const config = require("../config.json");
const punArr = config["pun-arr"];
const metaData = config["html-meta-data"];
const oEmbed = "oembed.json";

// import dynamic from "next/dynamic";
// const DynamicComponentWithNoSSR = dynamic(() => import("../components/hello3"), { ssr: false });

export default function Home() {
    const [check, setCheck] = useState("-");
    const [key, setKey] = useState("-");
    const [keyToCheck, setKeyToCheck] = useState("");
    const [category, setCategory] = useState("general");

    const getKey = async (keyType) => {
        setKey("Getting Key...");
        const url = `/api/generate/${keyType}`;

        axios
            .get(url)
            .then((response) => {
                setKey(response.data.keys[0]);
            })
            .catch((error) => {
                if (error.toString().includes("429")) {
                    setKey("Too many requests! " + `Timeout will be: ${config.limits.requests.block_duration} seconds`);
                    return;
                }
                if (error.toString().includes("403")) {
                    setKey("Blocked!");
                    return;
                }
                setKey("Internal error");
                return console.warn(error);
            });
    };

    const copyKey = () => {
        if (!Number.isNaN(+key[0])) navigator.clipboard.writeText(key);
    };

    const checkKey = () => {
        if (!keyToCheck.replace(/[👨🏻‍🚀 ​         ⠀]/g, "")) return setCheck("Please specify a Key!");
        setCheck("Checking Key...");
        const url = "/api/validate";

        axios
            .get(url, {
                params: {
                    key: keyToCheck,
                },
            })
            .then((response) => {
                setCheck(response.data.message);
            })
            .catch((error) => {
                if (error.toString().includes("429")) {
                    setCheck({ check: "Too many requests!", details: `Timeout will be: ${config.limits.requests.block_duration} seconds` });
                    return;
                }
                if (error.toString().includes("403")) {
                    setCheck({ check: "Blocked!", details: "You are blocked from using this API" });
                    return;
                }
                setCheck("Internal error");
                return console.warn(error);
            });
    };

    const keyInput = (event) => {
        setKeyToCheck(event.target.value);
    };

    useEffect(() => {
        document.addEventListener("keydown", function (event) {
            const visibility = document.getElementById("cardHelp").style.visibility;
            if (visibility == "hidden") return;
            if (event.key.toLowerCase() == "a") document.getElementById("apiHelpButton")?.click();
            if (event.key.toLowerCase() == "k") document.getElementById("keysHelpButton")?.click();
            if (event.key.toLowerCase() == "g") document.getElementById("generalHelpButton")?.click();
        });
        document.getElementById("replaceThis").innerHTML = punArr[Math.floor(Math.random() * punArr.length)];
        // document.getElementById("oembed").href = window.location.origin + "/" + oEmbed;
    }, []);
    return (
        <>
            <Head>
                <title>Key Generator</title>
                <link rel="icon" href="/favicon.ico" />
                <meta content={metaData.title} property="og:title" />
                <meta content="website" property="og:type" />
                <meta content={metaData.description} property="og:description" />
                <meta content={metaData.url} property="og:url" />
                <meta content={metaData.image} property="og:image" />
                <meta content={metaData.color} name="theme-color" />
                {metaData.large_image ? <meta content="summary_large_image" name="twitter:card" /> : ""}
                <link type="application/json+oembed" href={`${config.url}/${oEmbed}`} id="oembed" />
            </Head>
            <div className="center fullscreen">
                {/* <DynamicComponentWithNoSSR /> */}
                <div className="container">
                    <div className="moveable" id="cardGenerator" style={{ top: 20, left: 20 }}>
                        <div className="card">
                            <div className="card-title no-select" id="cardGeneratortitle">
                                <img className="image" src="/calculator.png" style={{ width: 18, height: 12 }}></img>
                                <b>Key Generator</b>
                                <button
                                    className="custom-btn"
                                    onClick={() => {
                                        window.close();
                                        // if window.close() doesn't work, use this:
                                        window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                                    }}
                                    style={{ fontSize: 0.48 + "rem" }}
                                >
                                    <span className="btn-text">X</span>
                                </button>
                                <button
                                    className="custom-btn"
                                    onClick={() => {
                                        // cardHelp
                                        document.dispatchEvent(new KeyboardEvent("keydown", { key: "?" }));
                                    }}
                                    style={{ fontSize: 0.5 + "rem", cursor: "help" }}
                                >
                                    <span className="btn-text">?</span>
                                </button>
                                <button
                                    className="custom-btn"
                                    onClick={() => {
                                        // cardInfo
                                        document.dispatchEvent(new KeyboardEvent("keydown", { key: "i" }));
                                    }}
                                    style={{ fontSize: 0.5 + "rem", cursor: "help" }}
                                >
                                    <span className="btn-text">i</span>
                                </button>
                            </div>

                            <p className="no-select">{key.startsWith("Too") ? <b>{key}</b> : "Key: " + key}</p>
                            <div className="no-select btns">
                                <button
                                    className="btn"
                                    onClick={() => {
                                        getKey("10");
                                    }}
                                    id="10button"
                                >
                                    <span className="btn-text">
                                        1<u>0</u>-Digit
                                    </span>
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        getKey("11");
                                    }}
                                    id="11button"
                                >
                                    <span className="btn-text">
                                        1<u>1</u>-Digit
                                    </span>
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        getKey("oem");
                                    }}
                                    id="oembutton"
                                >
                                    <span className="btn-text">
                                        <u>O</u>EM
                                    </span>
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        copyKey();
                                    }}
                                    id="copybutton"
                                >
                                    <span className="btn-text">
                                        <u>C</u>opy
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="moveable" id="cardValidator" style={{ top: 20 + 136, left: 20 }}>
                        <div className="card">
                            <div className="card-title no-select" id="cardValidatortitle">
                                <img className="image" src="/validator.png" style={{ width: 12, height: 12 }}></img>
                                <b>Key Validator</b>
                            </div>
                            <input
                                type="text"
                                className="key-input"
                                // placeholder="space"
                                id="keyInput"
                                onChange={function (event) {
                                    keyInput(event);
                                }}
                                onKeyDown={function (event) {
                                    if (event.key == "Enter") document.getElementById("runCheck").click();
                                }}
                            />
                            <p className="no-select">
                                Check: {check.check ? check.check.startsWith("Too") ? <b>{check.check}</b> : check.check : check}
                            </p>
                            <p className="no-select">Details: {check.details ? check.details : "-"}</p>
                            <div className="no-select btns">
                                <button
                                    className="btn"
                                    id="runCheck"
                                    type="submit"
                                    onClick={() => {
                                        checkKey();
                                    }}
                                >
                                    <span className="btn-text">Check</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="moveable" id="cardHelp" style={{ visibility: "hidden", top: 20, left: 20 + 395 }}>
                        <div className="outer-help-card" id="helpCard">
                            <div className="card-title no-select" id="cardHelptitle">
                                <img className="image" src="/help.png" style={{ width: 12, height: 12 }}></img>
                                <b>Key Generator Help</b>
                                <button
                                    className="custom-btn"
                                    onClick={() => {
                                        document.getElementById("cardHelp").style.visibility = "hidden";
                                    }}
                                    style={{ fontSize: 0.48 + "rem" }}
                                >
                                    <span className="btn-text">X</span>
                                </button>
                            </div>

                            <div className="help-button-bar">
                                <div className="no-select help-btns">
                                    <div className="help-button-second-border">
                                        <button
                                            className={category == "general" ? "disabled-help-button" : "help-button"}
                                            onClick={() => {
                                                setCategory("general");
                                            }}
                                            id="generalHelpButton"
                                        >
                                            <span className="btn-text">
                                                <u>G</u>eneral
                                            </span>
                                        </button>
                                    </div>

                                    <div className="help-button-second-border">
                                        <button
                                            className={category == "keys" ? "disabled-help-button" : "help-button"}
                                            onClick={() => {
                                                setCategory("keys");
                                            }}
                                            id="keysHelpButton"
                                        >
                                            <span className="btn-text">
                                                <u>K</u>eys
                                            </span>
                                        </button>
                                    </div>

                                    <div className="help-button-second-border">
                                        <button
                                            className={category == "api" ? "disabled-help-button" : "help-button"}
                                            onClick={() => {
                                                setCategory("api");
                                            }}
                                            id="apiHelpButton"
                                        >
                                            <span className="btn-text">
                                                <u>A</u>PI
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="inner-help-card no-select">
                                {category == "general" ? ( // General
                                    <>
                                        <b className="help-headline">To use this website</b>

                                        <span>
                                            <span className="help-firstletter-triangle">🞂</span>
                                            <span style={{ fontSize: "0.49em" }}> </span>

                                            <span className="help-firstline">Select the type of key you wish to generate.</span>
                                        </span>

                                        <p className="help-text">
                                            This can be done in the Key Generator window on the left. Pressing the 'Copy' button will copy the key to
                                            the clipboard. copied to the clipboard.
                                        </p>
                                        <p className="help-text">
                                            There is also a 'Key Validator', which, as the name suggests, will validate the key you have entered.
                                        </p>

                                        <b className="help-headline">Tips</b>
                                        <span>
                                            <span className="help-firstletter-square">⯀</span>
                                            <span className="help-firstline">There are some nice features.</span>
                                        </span>

                                        <p className="help-text">
                                            You can press the underlined letters to press their button. To enter a key, press the space bar.
                                        </p>
                                        <p className="help-text">All windows can be dragged around!</p>
                                        <p className="help-text">Almost everything here is as interactive as in Windows 95.</p>
                                    </>
                                ) : category == "keys" ? ( // Keys
                                    <>
                                        <b className="help-headline">To use these keys</b>

                                        <span>
                                            <span className="help-firstletter-triangle">🞂</span>
                                            <span style={{ fontSize: "0.49em" }}> </span>

                                            <span className="help-firstline">There are three types of keys to choose from.</span>
                                        </span>

                                        <p className="help-text">10-digit: Used for retail CDs</p>
                                        <p className="help-text">11-digit: Used to activate Office 97</p>
                                        <p className="help-text">OEM: Original Equipment Manufacturer versions</p>

                                        <b className="help-headline">Tip</b>
                                        <span>
                                            <span className="help-firstletter-square">⯀</span>
                                            <span className="help-firstline">Windows versions</span>
                                        </span>

                                        <p className="help-text">All of these keys can be used to activate the appropriate versions of Windows.</p>
                                        <p className="help-text">10-digit: Windows NT 4 & Windows 95</p>
                                        <p className="help-text">11-digit: Office 97</p>
                                        <p className="help-text">10-digit: Windows NT 4 & Windows 95</p>
                                        <p className="help-text">
                                            You can read more about the keys and the algorithm behind them{" "}
                                            <a href="https://gurney.dev/posts/mod7/" target="_blank">
                                                here
                                            </a>
                                            .
                                        </p>
                                    </>
                                ) : (
                                    // API
                                    <>
                                        <b className="help-headline">To access the public API</b>

                                        <span>
                                            <span className="help-firstletter-triangle">🞂</span>
                                            <span style={{ fontSize: "0.49em" }}> </span>

                                            <span className="help-firstline">
                                                Read the documentation on my{" "}
                                                <a href="https://github.com/thevalleyy/windows95keygen#api-documentation" target="_blank">
                                                    GitHub
                                                </a>
                                                .
                                            </span>
                                        </span>

                                        <p className="help-text">You can either generate keys or validate them</p>
                                        <p className="help-text">
                                            To validate a key, send a request to{" "}
                                            <a href="/api/validate" target="_blank">
                                                /api/validate
                                            </a>{" "}
                                            and add the key as a query parameter.
                                        </p>

                                        <p className="help-text">
                                            To generate a key, send a request to{" "}
                                            <a href="/api/generate/10" target="_blank">
                                                /api/generate/10
                                            </a>
                                            . You can also generate keys of the type "OEM" or "11" by replacing the 10 with "oem" or "11". A detailed
                                            list describing the different types can be found in this project's readme on{" "}
                                            <a href="https://github.com/thevalleyy/windows95keygen#readme" target="_blank">
                                                GitHub
                                            </a>
                                            .
                                        </p>

                                        <b className="help-headline">Tip</b>
                                        <span>
                                            <span className="help-firstletter-square">⯀</span>
                                            <span className="help-firstline">You can generate multiple keys at once. </span>
                                        </span>
                                        <span className="help-text">
                                            Just specify an amount as a query parameter. See my{" "}
                                            <a href="https://github.com/thevalleyy/windows95keygen/#readme" target="_blank">
                                                GitHub
                                            </a>{" "}
                                            for more details.
                                        </span>
                                        <b className="help-text">
                                            {config.config.rate_limit_requests
                                                ? `There is a rate limit on the API. You can send up to ${config.limits.requests.requests} requests every ${config.limits.requests.specified_time} seconds.`
                                                : ""}
                                        </b>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="moveable" id="cardInfo" style={{ visibility: "hidden", top: 20 + 36, left: 20 + 95 }}>
                        <div className="card" id="infoCard">
                            <div className="card-title no-select" id="cardInfotitle">
                                <b>About Key Generator</b>
                                <button
                                    className="custom-btn"
                                    onClick={() => {
                                        document.getElementById("cardInfo").style.visibility = "hidden";
                                    }}
                                    style={{ fontSize: 0.48 + "rem" }}
                                >
                                    <span className="btn-text">X</span>
                                </button>
                            </div>

                            <div className="no-select">
                                <div className="grid-container">
                                    <div>
                                        <img className="image" src="/notepad.png" style={{ width: 32, height: 32 }}></img>
                                    </div>
                                    <div>
                                        <p>Key Generator</p>
                                        <p>Windows 95</p>
                                        <p>
                                            Copyright <sup>©</sup> {new Date().getFullYear()}{" "}
                                            <a target="_blank" href="https://www.github.com/thevalleyy">
                                                thevalleyy
                                            </a>
                                        </p>
                                        <br style={{ marginBottom: "4em" }}></br>
                                        <p>This product is licensed to:</p>
                                        <p id="replaceThis">You</p>
                                    </div>
                                </div>
                            </div>

                            <div className="no-select btns">
                                <button
                                    className="btn"
                                    id="closeHelp"
                                    style={{ marginRight: "2px", marginLeft: "auto" }}
                                    type="submit"
                                    onClick={() => {
                                        document.getElementById("cardInfo").style.visibility = "hidden";
                                    }}
                                >
                                    <span className="btn-text">OK</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <script src="./drag.js"> defer</script>
            </div>
        </>
    );
}
