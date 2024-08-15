let tds = document.querySelectorAll("td");

let iso = document.getElementById("iso");
let din = document.getElementById("din");
let exposures = document.getElementById("exposures");
let exposureTolerance = document.getElementById("exposureTolerance");


const code = [true, true, true, true, true, true, true, true, true, true, true, true];

const DXtoISO = [
    { speed: 25, G: true, S1: false, S2: false, S3: false, S4: true, S5: false },
    { speed: 32, G: true, S1: false, S2: false, S3: false, S4: false, S5: true },
    { speed: 40, G: true, S1: false, S2: false, S3: false, S4: true, S5: true },
    { speed: 50, G: true, S1: true, S2: false, S3: false, S4: true, S5: false },
    { speed: 64, G: true, S1: true, S2: false, S3: false, S4: false, S5: true },
    { speed: 80, G: true, S1: true, S2: false, S3: false, S4: true, S5: true },
    { speed: 100, G: true, S1: false, S2: true, S3: false, S4: true, S5: false },
    { speed: 125, G: true, S1: false, S2: true, S3: false, S4: false, S5: true },
    { speed: 160, G: true, S1: false, S2: true, S3: false, S4: true, S5: true },
    { speed: 200, G: true, S1: true, S2: true, S3: false, S4: true, S5: false },
    { speed: 250, G: true, S1: true, S2: true, S3: false, S4: false, S5: true },
    { speed: 320, G: true, S1: true, S2: true, S3: false, S4: true, S5: true },
    { speed: 400, G: true, S1: false, S2: false, S3: true, S4: true, S5: false },
    { speed: 500, G: true, S1: false, S2: false, S3: true, S4: false, S5: true },
    { speed: 640, G: true, S1: false, S2: false, S3: true, S4: true, S5: true },
    { speed: 800, G: true, S1: true, S2: false, S3: true, S4: true, S5: false },
    { speed: 1000, G: true, S1: true, S2: false, S3: true, S4: false, S5: true },
    { speed: 1250, G: true, S1: true, S2: false, S3: true, S4: true, S5: true },
    { speed: 1600, G: true, S1: false, S2: true, S3: true, S4: true, S5: false },
    { speed: 2000, G: true, S1: false, S2: true, S3: true, S4: false, S5: true },
    { speed: 2500, G: true, S1: false, S2: true, S3: true, S4: true, S5: true },
    { speed: 3200, G: true, S1: true, S2: true, S3: true, S4: true, S5: false },
    { speed: 4000, G: true, S1: true, S2: true, S3: true, S4: false, S5: true },
    { speed: 5000, G: true, S1: true, S2: true, S3: true, S4: true, S5: true }
];

const DXtoExposures = [
    { exposures: "Other", G: true, S1: false, S2: false, S3: false },
    { exposures: 12, G: true, S1: true, S2: false, S3: false },
    { exposures: 20, G: true, S1: false, S2: true, S3: false },
    { exposures: 24, G: true, S1: true, S2: true, S3: false },
    { exposures: 36, G: true, S1: false, S2: false, S3: true },
    { exposures: 48, G: true, S1: true, S2: false, S3: true },
    { exposures: 60, G: true, S1: false, S2: true, S3: true },
    { exposures: 72, G: true, S1: true, S2: true, S3: true },
]

const DXtoExposureTolerance = [
    { tolerance: "±½", T1: false, T2: false },
    { tolerance: "±1", T1: true, T2: false },
    { tolerance: "+2 -1", T1: false, T2: true },
    { tolerance: "+3 -1", T1: true, T2: true }
]

function isoToDin(iso) {
    return Math.ceil(10 * Math.log10(iso) + 0.1);
}

tds.forEach((td, i) => {
    if (!(i == 0 || i == 6)) {
        td.white = Math.random() < 0.5 ? true : false;
        td.num = i;
        code[td.num] = td.white;

        td.onclick = () => {
            td.white = !td.white;
            code[td.num] = td.white;
            td.style.background = td.white ? "linear-gradient(105deg, #d1d1d1, whitesmoke)" : "black";

            decodeDX(code);
        }

        td.style.background = td.white ? "linear-gradient(105deg, #d1d1d1, whitesmoke)" : "black";
    } else {
        td.style.background = "linear-gradient(105deg, #d1d1d1, whitesmoke)";
        code[i] = true;
    }
});


/**
 * 
 * @param {Array<Boolean>} code 
 */
function decodeDX(code) {
    let temp_iso;
    let temp_exposures;
    let temp_exposures_tolerance;

    for (const row of DXtoISO) {
        if (
            row.G === code[0] &&
            row.S1 === code[1] &&
            row.S2 === code[2] &&
            row.S3 === code[3] &&
            row.S4 === code[4] &&
            row.S5 === code[5]
        ) {
            temp_iso = row.speed;
            break;
        } else {
            temp_iso = "Unknown/Custom (check with the manufacturer of the film)";
        }
    }

    for (const row of DXtoExposures) {
        if (
            row.G === code[6] &&
            row.S1 === code[7] &&
            row.S2 === code[8] &&
            row.S3 === code[9]
        ) {
            temp_exposures = row.exposures;
            break;
        } else {
            temp_exposures = "Other";
        }
    }

    for (const row of DXtoExposureTolerance) {
        if (
            row.T1 === code[10] &&
            row.T2 === code[11]
        ) {
            temp_exposures_tolerance = row.tolerance;
            console.log(temp_exposures_tolerance);
        }
    }

    iso.innerHTML = temp_iso;
    din.innerHTML = typeof temp_iso !== "number" ? temp_iso : isoToDin(temp_iso).toString() + "°";
    exposures.innerHTML = temp_exposures;
    exposureTolerance.innerHTML = temp_exposures_tolerance;
}

// yep here is the hello command
console.log("%cHi! I see you are looking at the code (or maybe you accidentally opened the console...) so you are up to something here...anyway...publish any issues you if you find any on github (login required (free)): https://github.com/nikeedev/dx!", "font-size: 20px; font-weight: 900;")
