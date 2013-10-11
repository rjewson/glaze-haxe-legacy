
package wgr.display;

import wgr.geom.AABB;

class DisplayObjectContainer extends DisplayObject
{

    public var children:Array<DisplayObject>;
    public var subTreeAABB:AABB;

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

}