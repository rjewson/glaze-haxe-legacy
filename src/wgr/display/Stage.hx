
package wgr.display;

import wgr.display.DisplayObject;
import wgr.display.DisplayObjectContainer;
import wgr.display.Sprite;

class Stage extends DisplayObjectContainer
{

    public var head:Sprite;
    public var tail:Sprite;
    public var count:Int;
    public var dirty:Bool;

    public function new() {
        super();
        id = "Stage";
        worldAlpha = alpha;
        stage = this;
    }

    public override function updateTransform() { 
        var child = firstDO;
        while (child!=null) {
            child.updateTransform();
            child = child.next;
        }
    }

    public function PreRender() {
        if (dirty==true) {
            Flatten();
            dirty=false;
        }
    }

    /*
     *   Depth-first Pre-order traversal of tree
     */
    public function Flatten() {
        trace("Flatten");
        head = null;
        tail = null;
        count = 0;
        Traverse(this);
    }

    public function Traverse(node:DisplayObject) {
        //This node not visible? Snip it all off...
        if (node.visible==false)
            return;
        //Is this a Sprite? If so put it in the list
        if (Std.is(node, Sprite)) {
            if (head==null) {
                head = cast node;
                head.prevSprite = head.nextSprite = null;
            } else {
                var sprite:Sprite = cast node;
                sprite.prevSprite = sprite.nextSprite = null;
                if (tail==null) {
                    tail = sprite;
                    head.nextSprite = tail;
                    tail.prevSprite = head;
                } else {
                    tail.nextSprite = sprite;
                    sprite.prevSprite = tail;
                    tail = sprite;                    
                }
            }
            count++;
        }
        //Parse the other children
        if (Std.is(node, DisplayObjectContainer)) {
            var doc:DisplayObjectContainer = cast node;
            var child = doc.firstDO;
            while (child!=null) {
                Traverse(child);
                child = child.next;
            }
        }
    }

}