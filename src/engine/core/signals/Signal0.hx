
package engine.core.signals;

typedef Listener0 = Void -> Void;

class Signal0 extends SignalBase {

    public function new (?listener :Listener0) {
        super(listener);
    }

    public function connect (listener :Listener0, prioritize :Bool = false) :SignalConnection {
        return connectImpl(listener, prioritize);
    }

    inline public function emit() {
        emit0();
    }
}