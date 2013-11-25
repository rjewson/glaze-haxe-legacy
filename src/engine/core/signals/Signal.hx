
package engine.core.signals;

import ds.DLL;
import engine.core.signals.Slot;

class Signal
{

    public var slots:DLL<Slot>;

    public function new(?listener:Dynamic,once:Bool=false) {
        slots = new DLL<Slot>();
        if (listener!=null)
            add(listener,once);
    }

    public function add(listener:Dynamic,once:Bool=false) {
        var slot = new Slot(listener,once);
        slots.insertEnd(slot);
    }

    public function remove(listener:Dynamic) {
        var slot = findSlot(listener);
        if (slot!=null)
            slots.remove(slot);
    }

    private function findSlot(listener:Dynamic):Slot {
        var slot = slots.head;
        while (slot!=null) {
            if (slot.listener==listener)
                return slot;
            slot = slot.next;
        }
        return null;
    }

}