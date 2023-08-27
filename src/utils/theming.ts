import chroma from 'chroma-js';

export function isCloseToWhite(color: string | number | chroma.Color, threshold = 0.8) {
    // Convert the color to Lab space and get the luminance
    const luminance = chroma(color).lab()[0];
    // Lab luminance is in the range [0, 100], where 100 is white
    // We consider a color "close to white" if its luminance is greater than the threshold times 100
    return luminance > threshold * 100;
}

export function getZIndexScale() {
    const Z_INDEXES = {
        lowest: 1,
        lower: 10,
        medium: 100,
        high: 1000,
        highest: 10000,
    };

    return Z_INDEXES
}
