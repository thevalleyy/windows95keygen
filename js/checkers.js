global.erroroem = [];
global.error10 = [];
global.error11 = [];

module.exports = {
    CHECK_FIRST_10,
    CHECK_SECOND_10,
    CHECK_FIRST_11,
    CHECK_DATE_OEM,
    CHECK_SECOND_SEGMENT_OEM,
    CHECK_THIRD_SEGMENT_OEM,
    CHECK_KEY_10,
    CHECK_KEY_11,
    CHECK_OEM,
};

function CHECK_FIRST_10(numberString) {
    if (!/^\d+$/.test(numberString)) {
        error10.push("Numeric control failed");
        return false;
    }

    if (typeof numberString != "string") {
        console.warn(`${numberString} is ${typeof numberString}, should be string`);
        error10.push("Internal error!");
        return false;
    }

    // First segment must be 3 digits long and not included in the rejectedNumbers array.
    if (numberString.length != 3) {
        error10.push("First segment length control failed");
        return false;
    }

    const rejectedNumbers = ["333", "444", "555", "666", "777", "888", "999"];
    if (rejectedNumbers.includes(numberString)) {
        error10.push("Reject control failed");
        return false;
    }
    return true;
}

function CHECK_SECOND_10(numberString) {
    if (!/^\d+$/.test(numberString)) {
        error10.push("Numeric control failed");
        error11.push("Numeric control failed");
        return false;
    }

    // Second segment must be 7 digits long
    // The sum of the first 6 digits must be a mutiple of 7
    // Last digit (7th) can't be 0 or greater than 8.
    if (numberString.length != 7) {
        error10.push("Second segment length control failed");
        error11.push("Second segment length control failed");
        return false;
    }

    const lastDigit = parseInt(numberString[numberString.length - 1]);
    if (lastDigit == 0 || lastDigit >= 8) {
        error10.push("Second segment last digit control failed");
        error11.push("Second segment last digit control failed");
        return false;
    }

    let digitSum = 0;
    for (let i = 0; i < numberString.length; i++) {
        digitSum += parseInt(numberString.charAt(i));
    }
    if (digitSum % 7 != 0) {
        error10.push("Second segment digit sum control failed");
        error11.push("Second segment digit sum control failed");
        return false;
    }

    return true;
}

function CHECK_FIRST_11(numberString) {
    if (!/^\d+$/.test(numberString)) {
        error10.push("Numeric control failed");
        return false;
    }

    // First segment must be 4 digits long. Can be anything from 0001 to 9991. 4th digit = 3rd digit + 1 or 2 (>9 overflows)
    if (numberString.length != 4) {
        error11.push("Numeric control failed");
        return false;
    }

    if (numberString < 1 || numberString > 9991) {
        error11.push("First segment number range control failed");
        return false;
    }

    const digitCheck = Number.parseInt(numberString[2]);
    var possibleDigit0 = digitCheck + 1;
    if (possibleDigit0 > 9) possibleDigit0 -= 10;
    var possibleDigit1 = digitCheck + 2;
    if (possibleDigit1 > 9) possibleDigit1 -= 10;

    switch (Number.parseInt(numberString[3])) {
        case possibleDigit0:
            return true;
        case possibleDigit1:
            return true;
        default:
            error11.push("First segment last digit control failed");
            return false;
    }
}

function CHECK_DATE_OEM(numberString) {
    if (!/^\d+$/.test(numberString)) {
        erroroem.push("Numeric control failed");
        return false;
    }
    // Segment must be 5 digit long
    // First 3 digit must be a number between 0 and 366 (a day in a year, leap year is not checked)
    // Last two numbers must be in years array.
    if (numberString.length != 5) {
        erroroem.push("Date segment length control failed");
        return false;
    }

    const day = parseInt(numberString.slice(0, 3));
    const year = numberString.slice(3, 5);
    const years = ["95", "96", "97", "98", "99", "00", "01", "02", "03"];
    if (day <= 0 || day >= 367) {
        erroroem.push("Date segment day control failed");
        return false;
    }
    if (!years.includes(year)) {
        erroroem.push("Date segment year control failed");
        return false;
    }

    return true;
}

function CHECK_SECOND_SEGMENT_OEM(numberString) {
    if (!/^\d+$/.test(numberString)) {
        erroroem.push("Numeric control failed");
        return false;
    }
    // Segment must be 7 digit long
    // First digit must be 0
    // Sum of digits must be divisable by 7
    // Last digit (7th) can't be 0 or greater than 8.
    if (numberString.length != 7) {
        erroroem.push("Second segment length control failed");
        return false;
    }

    if (numberString.charAt(0) != "0") {
        erroroem.push("Second segment first digit 0 control failed");
        return false;
    }

    let digitSum = 0;
    for (let i = 0; i < numberString.length; i++) {
        digitSum += parseInt(numberString.charAt(i));
    }
    if (digitSum % 7 != 0) {
        erroroem.push("Second segment digit sum control failed");
        return false;
    }

    const lastDigit = parseInt(numberString[numberString.length - 1]);
    if (lastDigit == 0 || lastDigit >= 8) {
        erroroem.push("Second segment last digit control failed");
        return false;
    }
    return true;
}

function CHECK_THIRD_SEGMENT_OEM(numberString) {
    // Last segment can be any 5 digits number.
    if (!/^\d+$/.test(numberString)) {
        erroroem.push("Numeric control failed");
        return false;
    }
    if (numberString.length != 5) {
        erroroem.push("Second segment length control failed");
        return false;
    }
    return true;
}

function CHECK_OEM(key) {
    const keySegments = key.trim().split("-");
    if (keySegments.length != 4) erroroem.push("Amount of segments control failed");
    return [
        keySegments.length == 4 &&
            CHECK_DATE_OEM(keySegments[0]) &&
            keySegments[1].toUpperCase() == "OEM" &&
            CHECK_SECOND_SEGMENT_OEM(keySegments[2]) &&
            CHECK_THIRD_SEGMENT_OEM(keySegments[3]),
        erroroem[0] ? erroroem[0] : "",
    ];
}

function CHECK_KEY_10(key) {
    const keySegments = key.trim().split("-");
    if (keySegments.length != 2) error10.push("Amount of segments control failed");
    return [keySegments.length == 2 && CHECK_FIRST_10(keySegments[0]) && CHECK_SECOND_10(keySegments[1]), error10[0] ? error10[0] : ""];
}

function CHECK_KEY_11(key) {
    const keySegments = key.trim().split("-");
    if (keySegments.length != 2) error11.push("Amount of segments control failed");
    return [keySegments.length == 2 && CHECK_FIRST_11(keySegments[0]) && CHECK_SECOND_10(keySegments[1]), error11[0] ? error11[0] : ""];
}
