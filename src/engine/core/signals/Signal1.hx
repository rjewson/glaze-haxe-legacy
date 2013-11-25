
package engine.core.signals;

typedef Listener1<A> = A -> Void;

class Signal1<A> extends Signal {

    public function new (?listener:Dynamic) {
        super(listener);
    }

    public function dispatch(arg1:A) {
        var slot = slots.head;
        while (slot!=null) {
            slot.listener(arg1);
            slot = slot.once ? slots.remove(slot) : slot.next;
        }
    }
 
}