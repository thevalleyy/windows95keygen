import checkers from "../../js/checkers";
import requestBlock from "../../js/request";

export default async (req, res) => {
    if (await requestBlock(req, res)) return;
    try {
        var key;
        if (req.query.key) key = req.query.key; // GET query parameter
        else if (req.body.key) key = req.body.key; // POST json body

        console.log(key, req.query, req.body);

        if (!key)
            return res.status(400).json({
                error: 'Please specify a key via the "key" query parameter or POST json body.',
            });

        if (key.includes("OEM")) {
            // checking oem key
            const result = checkers.CHECK_OEM(key);
            if (result[0]) {
                res.status(200).json({
                    message: "Valid OEM key",
                });
            } else {
                res.status(200).json({
                    message: { check: "Invalid OEM key", details: result[1] ? result[1] : "Internal error" },
                });
            }
        } else {
            const keySegments = key.trim().split("-");
            if (keySegments[0].length == 3 && /^\d+$/.test(keySegments[0])) {
                // checking 10 digit key
                const result = checkers.CHECK_KEY_10(key);
                if (result[0]) {
                    res.status(200).json({
                        message: "Valid 10-digit key",
                    });
                } else {
                    res.status(200).json({
                        message: { check: "Invalid 10-digit key", details: result[1] ? result[1] : "Internal error" },
                    });
                }
            } else if (keySegments[0].length == 4 && /^\d+$/.test(keySegments[0])) {
                // checking 11 digit key
                const result = checkers.CHECK_KEY_11(key);
                if (result[0]) {
                    res.status(200).json({
                        message: "Valid 11-digit key",
                    });
                } else {
                    res.status(200).json({
                        message: { check: "Invalid 11-digit key", details: result[1] ? result[1] : "Internal error" },
                    });
                }
            } else {
                // checking unkown string
                res.status(200).json({ message: "Unknown key" });
            }
        }

        global.erroroem = [];
        global.error10 = [];
        global.error11 = [];
    } catch (error) {
        console.warn(error);
        return res.status(400).json({ error: `${error}` });
    }
};

/* TODO:
 * Features:
 * Bildschirmgröße zu klein? -> Resizen (mit prozent arbeiten?)
 */
