
package engine.components.action;

import engine.components.action.Action;

class Sync extends Action
{

    public function new() {
        super();
    }

    override public function onUpdate(dt :Float) {
        if (ownerList.actions.head==this) {
            isFinished = true;
        }
    }

}