self.onmessage = (event) => {
    const { buffer, startY, endY, filterType, width, radius } = event.data;
    const clampedView = new Uint8ClampedArray(buffer);

    if (filterType === "invert") {
        for (let i = 0; i < clampedView.length; i += 4) {
            clampedView[i] = 255 - clampedView[i];
            clampedView[i + 1] = 255 - clampedView[i + 1];
            clampedView[i + 2] = 255 - clampedView[i + 2];
        }
    }
    else if (filterType === "grayscale") {
        for (let i = 0; i < clampedView.length; i += 4) {
            const r = clampedView[i];
            const g = clampedView[i + 1];
            const b = clampedView[i + 2];
            const gray = (0.299 * r) + (0.587 * g) + (0.114 * b);
            clampedView[i] = gray;
            clampedView[i + 1] = gray;
            clampedView[i + 2] = gray;
        }
    }
    else if (filterType === "blur") {
        const readSource = new Uint8ClampedArray(buffer.slice(0));
        const chunkHeight = clampedView.length / (width * 4);

        for (let y = 0; y < chunkHeight; y++) {
            for (let x = 0; x < width; x++) {
                const targetIndex = (y * width + x) * 4;

                let sumR = 0;
                let sumG = 0;
                let sumB = 0;
                let neighborCount = 0;

                for (let ky = -radius; ky <= radius; ky++) {
                    for (let kx = -radius; kx <= radius; kx++) {
                        const nx = x + kx;
                        const ny = y + ky;

                        if (nx >= 0 && nx < width && ny >= 0 && ny < chunkHeight) {
                            const neighborIndex = (ny * width + nx) * 4;
                            sumR += readSource[neighborIndex];
                            sumG += readSource[neighborIndex + 1];
                            sumB += readSource[neighborIndex + 2];
                            neighborCount++;
                        }
                    }
                }

                clampedView[targetIndex] = sumR / neighborCount;
                clampedView[targetIndex + 1] = sumG / neighborCount;
                clampedView[targetIndex + 2] = sumB / neighborCount;
            }
        }
    }

    self.postMessage({ newBuffer: buffer, startY, endY }, [buffer]);
};