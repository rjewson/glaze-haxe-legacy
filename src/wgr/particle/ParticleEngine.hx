
package wgr.particle;

import js.html.ArrayBuffer;
import js.html.Worker;

class ParticleEngine 
{

    public var worker:Worker;

    public function new() {
        this.worker = new Worker("particleWorker.js");
    }

    public function start(data:ArrayBuffer) {
        this.worker.postMessage(data,[data]);
    }

}