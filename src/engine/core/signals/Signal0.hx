
package engine.core.signals;

typedef Listener0 = Void -> Void;

class Signal0 extends Signal {

    public function new (?listener:Dynamic) {
        super(listener);
    }

    public function dispatch() {
        var slot = slots.head;
        while (slot!=null) {
            slot.listener();
            slot = slot.once ? slots.remove(slot) : slot.next;
        }
    }

}