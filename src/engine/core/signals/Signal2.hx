
package engine.core.signals;

typedef Listener2<A,B> = A -> B -> Void;

class Signal2<A,B> extends Signal {

    public function new (?listener:Dynamic) {
        super(listener);
    }

    public function dispatch(arg1:A,arg2:B) {
        var slot = slots.head;
        while (slot!=null) {
            slot.listener(arg1,arg2);
            slot = slot.once ? slots.remove(slot) : slot.next;
        }
    }

}