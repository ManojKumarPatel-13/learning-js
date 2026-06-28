const canvas = document.querySelector("#main-canvas");
const ctx = canvas.getContext('2d');
const threadSelector = document.querySelector("#threads-selector");
const timeMetric = document.querySelector("#time-metric");
const fpsCounter = document.querySelector("#fps-counter");
const imageUpload = document.querySelector("#image-loader");
const btnInvert = document.querySelector("#btn-invert");
const btnGrayscale = document.querySelector("#btn-grayscale");
const btnBlur = document.querySelector("#btn-blur");
const blurSlider = document.querySelector("#blur-intensity");
const btnReset = document.querySelector("#btn-reset");
const btnDownload = document.querySelector("#btn-download");

const coreCounts = navigator.hardwareConcurrency;
let loadedImage = null;

const fragment = new DocumentFragment();
for (let i = 1; i <= coreCounts; i++) {
    const option = document.createElement('option');
    if (i == coreCounts) {
        option.setAttribute('selected', 'selected');
    }
    option.textContent = `${i} cores`;
    option.value = i;
    fragment.appendChild(option);
}
threadSelector.appendChild(fragment);

let lastTime = performance.now();
const monitorLoop = () => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    fpsCounter.textContent = `${(1000 / deltaTime).toFixed(2)} FPS`;
    lastTime = currentTime;
    requestAnimationFrame(monitorLoop);
};
requestAnimationFrame(monitorLoop);

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const image = new Image();
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            loadedImage = image;
        };
        image.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

const dispatchParallelFilter = (filterType, radius = 1) => {
    if (!loadedImage) {
        alert("Please upload an image matrix first before applying filters.");
        return;
    }

    const startTime = performance.now();
    let finishedWorkersCount = 0;
    const noOfThreads = threadSelector.value;
    const chunkHeight = Math.floor(canvas.height / noOfThreads);

    for (let i = 0; i < noOfThreads; i++) {
        const startY = i * chunkHeight;
        let endY = startY + chunkHeight;

        if (i == noOfThreads - 1) {
            endY = canvas.height;
        }

        const chunkData = ctx.getImageData(0, startY, canvas.width, (endY - startY));
        const chunkDataBuffer = chunkData.data.buffer;

        const worker = new Worker(new URL("./pixelWorker.js", import.meta.url), { type: "module" });

        worker.postMessage({
            buffer: chunkDataBuffer,
            startY,
            endY,
            filterType,
            width: canvas.width,
            radius
        }, [chunkDataBuffer]);

        worker.onmessage = (MessageEvent) => {
            const { newBuffer, startY, endY } = MessageEvent.data;
            const newBlankCanvas = ctx.createImageData(canvas.width, (endY - startY));

            const clampedView = new Uint8ClampedArray(newBuffer);
            newBlankCanvas.data.set(clampedView);

            ctx.putImageData(newBlankCanvas, 0, startY);

            worker.terminate();
            finishedWorkersCount++;

            if (finishedWorkersCount === Number(noOfThreads)) {
                const totalElapsedTime = performance.now() - startTime;
                timeMetric.textContent = `${(totalElapsedTime).toFixed(2)}ms`;
            }
        };
    }
};

btnInvert.addEventListener('click', () => {
    dispatchParallelFilter("invert");
});

btnGrayscale.addEventListener('click', () => {
    dispatchParallelFilter("grayscale");
});

btnBlur.addEventListener('click', () => {
    const intensityRadius = parseInt(blurSlider.value, 10) || 1;
    dispatchParallelFilter("blur", intensityRadius);
});

btnReset.addEventListener('click', () => {
    if (!loadedImage) {
        alert("No image matrix has been loaded to reset.");
        return;
    }
    ctx.drawImage(loadedImage, 0, 0);
    timeMetric.textContent = "0.00ms (Cleared)";
});

btnDownload.addEventListener('click', () => {
    if (!loadedImage) {
        alert("There is no processed image matrix available to export.");
        return;
    }
    const imageStreamUrl = canvas.toDataURL("image/png");
    const virtualLink = document.createElement("a");
    virtualLink.href = imageStreamUrl;
    virtualLink.download = "parallel-processed-image.png";
    virtualLink.click();
});