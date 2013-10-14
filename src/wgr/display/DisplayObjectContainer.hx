
package wgr.display;

import wgr.geom.AABB;
import wgr.display.DisplayObject;

class DisplayObjectContainer extends DisplayObject
{

    public var children:Array<DisplayObject>;
    public var subTreeAABB:AABB;

    public var firstDO:DisplayObject;
    public var lastDO:DisplayObject;
    public var childCount:Int;

    public function new() {
        super();
        children = new Array<DisplayObject>();
        subTreeAABB = new AABB();
    }

    public function addChild(child:DisplayObject) {
        // trace(this);
        if (child.parent!=null) {
            child.parent.removeChild(child);
        }
        children.push(child);
        child.parent = this;
        child.applySlot(function(target:DisplayObject,p:Dynamic){target.stage=cast p;},stage);
        if (stage!=null) stage.dirty = true;
    }

    public function addChildX(child:DisplayObject) {
        if (child.parent!=null) {
            child.parent.removeChild(child);
        }
        insertEnd(child);
        child.parent = this;
        child.applySlot(function(target:DisplayObject,p:Dynamic){target.stage=cast p;},stage);
        if (stage!=null) stage.dirty = true;
    }   

    public function removeChild(child:DisplayObject) {
        var index = Lambda.indexOf(children,child);
        if (index>0) {
            children.remove(child);
            child.parent = null;
            child.applySlot(function(target:DisplayObject,p:Dynamic){target.stage=null;},null);
            if (stage!=null) stage.dirty = true;
        }
    }

    public override function updateTransform() {
        //Reset AABB
        aabb.reset();
        super.updateTransform();
        calcExtents();
        subTreeAABB.reset();
        subTreeAABB.addAABB(aabb);
        //Expand AAABB to this DisplayObject -> New function required
        for (child in children) {
            child.updateTransform();
            //Inflate this AABB to encapsulate child
            subTreeAABB.addAABB(child.aabb);
        }
    }

    //TODO Probably get rid of this...
    public override function applySlot(slot:DisplayObject->Dynamic->Void,p:Dynamic=null) {
        super.applySlot(slot,p);        
        for (child in children) {
            child.applySlot(slot,p);
        }        
    }

    public inline function insertAfter(node:DisplayObject,newNode:DisplayObject) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next==null)
            lastDO = newNode;
        else
            node.next.prev = newNode;
        node.next = newNode;
        childCount++;
    }

    public inline function insertBefore(node:DisplayObject,newNode:DisplayObject) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev == null)
            firstDO = newNode;
        else
            node.prev.next = newNode;
        node.prev = newNode;
        childCount++;
    }

    public inline function insertBeginning(newNode:DisplayObject) {
        if (firstDO == null) {
            firstDO = newNode;
            lastDO = newNode;
            newNode.prev = null;
            newNode.next = null;
            childCount++;
        } else  
            insertBefore(firstDO, newNode);
     }

     public inline function insertEnd(newNode:DisplayObject) {
        if (lastDO == null)
            insertBeginning(newNode);
        else
            insertAfter(lastDO, newNode);
     }

    public inline function remove(node:DisplayObject) {
        if (node.prev == null)
            firstDO = node.next;
        else
            node.prev.next = node.next;
        if (node.next == null)
            lastDO = node.prev;
        else
            node.next.prev = node.prev;
        childCount--;
    }
}