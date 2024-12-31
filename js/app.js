let finalDates = {
    "seven_release": new Date("2025/1/1 23:59:59 GMT+03:00"),
};

let finalDatesKeys = Object.keys(finalDates);

let finalDatesDescriptions = {
    "six_release": "Релиз шестого выпуска 🤯",
    "new_year": "До нового года осталось",
    "seven_release": "Релиз седьмого выпуска"
}

let currentKey = window.location.search.replace("?", "");
if (finalDates[currentKey] === undefined) {
    let currentKeyIndex = 0;
    while (finalDates[finalDatesKeys[currentKeyIndex]] < (new Date() - 1800 * 1000)) {
        currentKeyIndex++;
        if (currentKeyIndex === finalDatesKeys.length - 1) {
            break;
        }
    }
    currentKey = finalDatesKeys[currentKeyIndex];
}
let nextKey = finalDatesKeys[finalDatesKeys.indexOf(currentKey) + 1];
let prevKey = finalDatesKeys[finalDatesKeys.indexOf(currentKey) - 1];

document.getElementById("dateDescription").innerText = finalDatesDescriptions[currentKey];
let leftLink = document.getElementById("leftLink");
let rightLink = document.getElementById("rightLink");
if (prevKey !== undefined) {
    leftLink.href = "?" + prevKey;
    leftLink.classList.remove("hidden");
}

function paintWithColor(frame, color) {
    document.getElementById(frame).classList.add(color);
    if (frame !== "seconds") {
        document.getElementById( frame + "Divider").classList.add(color);
    }
}

function updateColors(delta) {
    if (delta < 86400) {
        paintWithColor("days", "red");
    } else if (delta < 86400 * 2) {
        paintWithColor("days", "orange");
    }

    if (delta < 3600) {
        paintWithColor("hours", "red");
        paintWithColor("minutes", "orange");
    } else if (delta < 86400) {
        paintWithColor("hours", "orange");
    }

    if (delta < 60) {
        paintWithColor("minutes", "red");
    }
    if (delta <= 0) {
        paintWithColor("seconds", "red");
    }
}

function updateCountdown(force) {
    let now = new Date();
    let delta = Math.floor((finalDates[currentKey] - now) / 1000);

    let elements = [
        document.getElementById("days"),
        document.getElementById("hours"),
        document.getElementById("minutes"),
        document.getElementById("seconds"),
    ]
    let values = ["00", "00", "00", "00"];

    if (delta > 0) {
        values[0] = Math.floor(delta / 86400);
        values[1] = Math.floor(delta % 86400 / 3600);
        values[2] = Math.floor(delta % 3600 / 60);
        values[3] = delta % 60;

        for (let i = 0; i < 4; i++) {
            values[i] = (values[i] < 10 ? "0" : "") + values[i];
        }
    }

    for (let i = 0; i < 4; i++) {
        elements[i].innerText = values[i];
    }

    if (delta % 60 === 59 || delta < 0 || force) {
        updateColors(delta);
    }
}

updateCountdown(true);
setInterval(updateCountdown, 1000);
document.getElementById("timer").classList.remove("hidden");
