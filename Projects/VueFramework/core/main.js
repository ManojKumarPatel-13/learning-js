import { createObserver } from "./observer.js";
import { compile } from "./compiler.js";
import { queueJob } from "./scheduler.js";

const rootApp = document.getElementById('app');
const ledger = compile(rootApp);

const initialState = { username: "", systemStatus: "" };

const proxyState = createObserver(initialState, (prop, newValue) => {

    queueJob(() => {
        if (ledger[prop]) {
            ledger[prop].bindElements.forEach(element => {
                element.textContent = newValue
            });
            ledger[prop].modelElements.forEach(element => {
                if (element.value !== newValue) {
                    element.value = newValue
                }
            });
        }
    })
})

for (const key in ledger) {
    ledger[key].modelElements.forEach(element => {
        element.addEventListener('input', (e) => {
            proxyState[key] = e.target.value;
        })
    });
}

proxyState.username = "Architect Core";
proxyState.systemStatus = "Systems Operational";

document.getElementById('stress-test-btn').addEventListener('click', () => {
    console.time("Stress Test Timing");
    for (let i = 0; i < 1000; i++) {
        proxyState.systemStatus = `Stress Delta: ${i}`;
    }
    console.timeEnd("Stress Test Timing");
});