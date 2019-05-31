export default {
    methods: {
        readFileSrc (file) {
            return new Promise((resolve, reject) => {
                if (!(file instanceof File)) {
                    reject();

                    return;
                }

                function arrayBufferToBase64 (buffer) {
                    let binary = '';
                    const bytes = new Uint8Array(buffer);
                    const len = bytes.byteLength;

                    for (let i = 0; i < len; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }

                    return window.btoa(binary);
                }

                const reader = new FileReader();

                const callback = (inputFile, base64, rotate) => {
                    const rotation = {
                        1: 0,
                        3: 180,
                        6: 90,
                        8: 270,
                    };

                    resolve({
                        file: inputFile,
                        name: inputFile.name,
                        type: inputFile.type,
                        base64,
                        rotate: rotation[rotate],
                    });
                };

                const listener = () => {
                    const base64 = `data:${file.type};base64,${arrayBufferToBase64(reader.result)}`;

                    if (!/\.(jpe?g|png|gif|svg)$/i.test(file.name)) {
                        callback(file, base64, 1);

                        return;
                    }

                    const scanner = new DataView(reader.result);
                    let idx = 0;
                    let rotate = 1; // Non-rotated is the default

                    if (reader.result.length < 2 || scanner.getUint16(idx) !== 0xffd8) {
                        // Not a JPEG
                        callback(file, base64, rotate);

                        return;
                    }

                    idx += 2;
                    let maxBytes = scanner.byteLength;
                    let uint16;

                    while (idx < maxBytes - 2) {
                        uint16 = scanner.getUint16(idx);

                        idx += 2;

                        switch (uint16) {
                            case 0xffe1: // Start of EXIF
                                maxBytes = uint16 - idx;
                                idx += 2;
                                break;

                            case 0x0112: // Orientation tag
                                // Read the value, its 6 bytes further out
                                // See page 102 at the following URL
                                // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
                                rotate = scanner.getUint16(idx + 6, false);
                                maxBytes = 0; // Stop scanning
                                break;

                            default:
                                break;
                        }
                    }

                    callback(file, base64, rotate);
                };

                reader.addEventListener('load', listener, false);
                reader.readAsArrayBuffer(file);
            });
        },
    },
};
