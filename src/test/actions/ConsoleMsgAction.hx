
package test.actions;

import engine.components.action.Action;

class ConsoleMsgAction extends Action
{
    public var msg:String;

    public function new(msg:String) {
        super();
        this.msg = msg;
    }

    override public function onUpdate(dt :Float) {
        trace(msg);
        isFinished = true;
    }    

}