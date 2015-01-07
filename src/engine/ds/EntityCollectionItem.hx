
package engine.ds;

import ds.DLL;
import eco.core.Entity;

class EntityCollectionItem implements DLLNode<EntityCollectionItem>
{

    public var prev:EntityCollectionItem;
    public var next:EntityCollectionItem;

    public var entity:Entity;

    public var distance:Float;
    public var priority:Float;
    public var visible:Bool;

    public function new() {

    }

    public function reset() {
        
    }

}