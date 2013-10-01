
package wgr.display;

import wgr.display.DisplayObject;
import wgr.display.DisplayObjectContainer;
import wgr.display.Sprite;

class Stage extends DisplayObjectContainer
{

    public var head:Sprite;
    public var tail:Sprite;

    public function new() {
        super();
        id = "Stage";
    }

    public override function updateTransform() {
        for (child in children) {
            child.updateTransform();
        }
    }

    /*
     *   Depth-first Pre-order traversal of tree
     */
    public function Flatten() {
        head = null;
        tail = null;
        Traverse(this);
        var sprite = head;
        while (sprite!=null) {
            trace(sprite);
            sprite = sprite.next;
        }
    }

    public function Traverse(node:DisplayObject) {
        trace(node.id);
        if (Std.is(node, Sprite)) {
            if (head==null) {
                head = cast node;
                head.prev = head.next = null;
            } else {
                var sprite:Sprite = cast node;
                if (tail==null) {
                    tail = sprite;
                    head.next = tail;
                    tail.prev = head;
                } else {
                    tail.next = sprite;
                    sprite.prev = tail;
                    tail = sprite;                    
                }
            }
        }
        if (Std.is(node, DisplayObjectContainer)) {
            var doc:DisplayObjectContainer = cast node;
            for (child in doc.children) {
                Traverse(child);
            }
        }
    }

}