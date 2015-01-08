
package engine.ds;

import eco.core.Entity;
import engine.ds.EntityCollectionItem;

class EntityCollection 
{

    public static var itempool = {
        var pool = new ds.DLL<EntityCollectionItem>();
        pool;
    }

    public var entities:ds.DLL<EntityCollectionItem>;

    public var length(get, never):Int;

    public function new() {
        entities = new ds.DLL<EntityCollectionItem>();
    }

    private inline function get_length():Int {
        return entities.length;
    }

    public function addItem(entity:Entity):EntityCollectionItem {
        var item;
        if (engine.ds.EntityCollection.itempool.length==0) {
            item = new EntityCollectionItem();
        } else {
            item = engine.ds.EntityCollection.itempool.remove(engine.ds.EntityCollection.itempool.tail);
        }
        item.entity = entity;
        entities.insertBeginning(item);
        return item;
    }

    public function getItem(entity:Entity):EntityCollectionItem {
        var item = entities.head;
        while (item!=null) {
            if (item.entity==entity)
                return item;
        }        
        return null;
    }

    public inline function removeItem(item:EntityCollectionItem):Void {
        item.reset();
        engine.ds.EntityCollection.itempool.insertEnd(item);
    }

    public function clear() {
        while (entities.length>0) {
            removeItem(entities.remove(entities.tail));
        }
    }

}