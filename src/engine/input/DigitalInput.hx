
package engine.input;

import js.html.EventTarget;

class DigitalInput 
{

    public var keyMap : Array<Int>;
    // public var mousePosition : Vector2D;
    // public var mousePreviousPosition : Vector2D;
    private var frameRef : Int;
    private var target : EventTarget;

    public function new() {
        keyMap = new Array<Int>();
        for (i in 0...255) {
            keyMap[i] = 0;
        }
        // mousePosition = new Vector2D();
        // mousePreviousPosition = new Vector2D();
        frameRef = 1;       
    }
    
    public function InputTarget(target : EventTarget) : Void {
        this.target = target;
        target.addEventListener("keydown",KeyDown,false);
        target.addEventListener("keyup",KeyUp,false);
        // target.addEventListener(MouseEvent.MOUSE_DOWN, MouseDown, false, 0, true);
        // target.addEventListener(MouseEvent.MOUSE_UP, MouseUp, false, 0, true);
        // target.addEventListener(MouseEvent.RIGHT_MOUSE_DOWN, RightMouseDown, false, 0, true);
        // target.addEventListener(MouseEvent.RIGHT_MOUSE_UP, RightMouseUp, false, 0, true);
        
    }

    public function Update() : Void {
        if ( target == null ) return;
        frameRef++;
        // mousePreviousPosition.x = mousePosition.x;
        // mousePreviousPosition.y = mousePosition.y;
        // mousePosition.x = target.mouseX + screenOffset.x;
        // mousePosition.y = target.mouseY + screenOffset.y;
    }

    public function KeyDown(event : Dynamic) : Void {
        if (keyMap[event.keyCode] == 0) {           
            keyMap[event.keyCode] = frameRef;
        }
    }

    public function KeyUp(event : Dynamic) : Void {
        keyMap[event.keyCode] = 0;
    }

    // public function MouseDown(event : MouseEvent) : Void {
    //     keyMap[200] = frameRef;
    // }

    // public function MouseUp(event : MouseEvent) : Void {
    //     keyMap[200] = 0;
    // }

    // public function RightMouseDown(event : MouseEvent) : Void {
    //     keyMap[201] = frameRef;
    // }

    // public function RightMouseUp(event : MouseEvent) : Void {
    //     keyMap[201] = 0;
    // }
    
    inline public function Pressed(keyCode : Int) : Bool {
        return (keyMap[keyCode] > 0);
    }

    inline public function JustPressed(keyCode : Int) : Bool {
        return (keyMap[keyCode] == frameRef-1);
    }
    
    inline public function PressedDuration(keyCode : Int) : Int {
        var duration = keyMap[keyCode];
        return (duration > 0) ? (frameRef - duration) : 0;
    }
    
    inline public function Released(keyCode : Int) : Bool {
        return (keyMap[keyCode] == 0);
    }

}