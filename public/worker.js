// Import the Wasm loader generated from our Emscripten build.
self.importScripts("ffmpeg.js");

console.log("Module:", Module);

onmessage = (e) => {
    const file = e.data[0];
    // Create and mount FS work directory.
    if (!FS.analyzePath('/work').exists)
        FS.mkdir('/work');
    FS.mount(WORKERFS, { files: [file] }, '/work');

    const info = Module.callMain([ "-i", "/work/" + file.name, "-c:a", "libvorbis", "out.ogg" ]);
    console.log("Info:", info);
    postMessage({ "code": "OK", info });

    // // Run the Wasm function we exported.
    // const info = Module.run('/work/' + file.name);
    // console.log(info);

    // // Post message back to main thread.
    // postMessage(info);

    // // Unmount the work directory.
    FS.unmount('/work');
}
