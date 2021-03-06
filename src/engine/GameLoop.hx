package engine;

import engine.input.DigitalInput;
import js.Browser;
import wgr.renderers.webgl.WebGLRenderer;

class GameLoop 
{

    public var renderer:WebGLRenderer;
    public var isRunning:Bool;
    public var animationStartTimestamp:Float;
    public var prevAnimationTime:Float;
    public var delta:Float;
    private var rafID:Int;

    public var updateFunc:Float->Void;

    public function new() {
        isRunning = false;
    }

    public function update(timestamp:Float):Bool {
        //Do stuff
        delta = timestamp - prevAnimationTime;
        prevAnimationTime = timestamp;
        if (updateFunc!=null)
            updateFunc(delta);
        rafID = Browser.window.requestAnimationFrame(update);
        return false;
    }

    public function start() {
        if (isRunning==true)
            return;
        isRunning = true;
        prevAnimationTime = animationStartTimestamp = Browser.window.performance.now();
        rafID = Browser.window.requestAnimationFrame(update);
    }

    public function stop() {
        if (isRunning==false)
            return;
        isRunning = false;
        Browser.window.cancelAnimationFrame(rafID);
    }

}