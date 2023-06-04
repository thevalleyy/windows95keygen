export default (req, res) => {
    res.status(200).json("sus");
};

import checkers from "./checkers";

function generateNumber(digitsNumber) {
    const maxNumber = parseInt("9".repeat(digitsNumber)) + 1;
    const generatedNumber = Math.floor(Math.random() * maxNumber);
    return String(generatedNumber).padStart(digitsNumber, "0");
}

module.exports = {
    generate10Key,
    generate11Key,
    generateOemKey,
};

function generate10Key(amount = 1) {
    const keys = [];
    for (let i = 0; i < amount; i++) {
        keys.push(`${FIRST_10()}-${SECOND_10()}`);
    }
    return keys;

    function FIRST_10() {
        let newSite = "";

        while (!checkers.CHECK_FIRST_10(newSite)) {
            newSite = generateNumber(3);
        }

        return newSite;
    }

    function SECOND_10() {
        let newSite = "";

        while (!checkers.CHECK_SECOND_10(newSite)) {
            newSite = generateNumber(7);
        }

        return newSite;
    }
}

function generate11Key(amount = 1) {
    const keys = [];
    for (let i = 0; i < amount; i++) {
        keys.push(`${FIRST_11()}-${SECOND_11()}`);
    }
    return keys;

    function FIRST_11() {
        let newSite = "";

        while (!checkers.CHECK_FIRST_11(newSite)) {
            let first = String(Math.floor(Math.random() * 9992)).padStart(4, "0");
            let weirdNumber = Number.parseInt(first[2]) + Number.parseInt(Math.ceil(Math.random() * 2));
            if (weirdNumber > 9) weirdNumber = weirdNumber - 10;
            first = first.substring(0, 3).toString() + weirdNumber.toString();

            newSite = first;
        }

        return newSite;
    }

    function SECOND_11() {
        let newSite = "";

        // we can call CHECK_SECOND_10 here, since the 11-digit-algorithm uses the same pattern to check the second digit as the 10-digit-algorithm.
        while (!checkers.CHECK_SECOND_10(newSite)) {
            newSite = generateNumber(7);
        }

        return newSite;
    }
}

function generateOemKey(amount = 1) {
    const keys = [];
    for (let i = 0; i < amount; i++) {
        keys.push(`${DATE_OEM()}-OEM-${SECOND_SEGMENT_OEM()}-${LAST_SEGMENT_OEM()}`);
    }
    return keys;

    function DATE_OEM() {
        let day = Math.floor(Math.random() * 367);
        let years = ["95", "96", "97", "98", "99", "00", "01", "02", "03"];
        let year = years[Math.floor(Math.random() * years.length)];
        return `${String(day)}${year}`.padStart(5, "0");
    }

    function SECOND_SEGMENT_OEM() {
        let newSite = "";
        while (!checkers.CHECK_SECOND_SEGMENT_OEM(newSite)) {
            newSite = "0" + generateNumber(6);
        }

        return newSite;
    }

    function LAST_SEGMENT_OEM() {
        return generateNumber(5);
    }
}
