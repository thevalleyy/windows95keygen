import Head from "next/head";
const config = require("../config.json");
const metaData = config["html-meta-data"];
const oEmbed = "oembed.json";

export default function FourOhFour() {
    return (
        <>
            <Head>
                <title>404 - Not Found</title>
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
                <div className="container">
                    <div className="moveable" id="404Card" style={{ top: 20, left: 20 }}>
                        <div className="card">
                            <div className="card-title no-select" id="404Cardtitle">
                                <img className="image" src="/warning.png" style={{ width: 12, height: 12 }}></img>
                                <b>404 - Not Found</b>
                                <button
                                    className="custom-btn"
                                    onClick={() => {
                                        window.location.href = "/";
                                    }}
                                    style={{ fontSize: 0.48 + "rem" }}
                                >
                                    <span className="btn-text">X</span>
                                </button>
                            </div>
                            <p className="no-select">This page does not exist.</p>
                            <p className="no-select"></p>
                            <div className="no-select btns">
                                <button
                                    className="btn"
                                    id="backbutton"
                                    style={{ marginRight: "2px", marginLeft: "auto" }}
                                    type="submit"
                                    onClick={() => {
                                        history.go(-1);
                                    }}
                                >
                                    <span className="btn-text">
                                        <u>B</u>ack
                                    </span>
                                </button>
                                <button
                                    className="btn"
                                    id="homebutton"
                                    style={{ marginRight: "2px" }}
                                    type="submit"
                                    onClick={() => {
                                        window.location.href = "/";
                                    }}
                                >
                                    <span className="btn-text">
                                        <u>H</u>ome
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <script src="/drag.js"> defer</script>
            </div>
        </>
    );
}
