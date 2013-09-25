
package wgr.display;

class DisplayObjectContainer extends DisplayObject
{

    public var children:Array<DisplayObject>;

    public function new() {
        super();
        children = new Array<DisplayObject>();
    }

    public function addChild(child:DisplayObject) {
        if (child.parent!=null) {
            child.parent.removeChild(child);
        }
        children.push(child);
        child.parent = this;
    }

    public function removeChild(child:DisplayObject) {
        var index = Lambda.indexOf(children,child);
        if (index>0) {
            children.remove(child);
        }
        child.parent = null;
    }

    public override function updateTransform() {
        super.updateTransform();
        for (child in children) {
            child.updateTransform();
        }
    }

}