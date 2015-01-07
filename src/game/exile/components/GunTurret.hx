
package game.exile.components;

import eco.core.Component;
import engine.ai.behaviors.actions.Delay;
import engine.ai.behaviors.actions.GetLocalEntities;
import engine.components.Display;
import engine.components.Physics;
import engine.components.Position;
import engine.components.Script;
import physics.geometry.Circle;
import physics.geometry.Vector2D;

class GunTurret extends Component
{

    private var startPosition:physics.geometry.Vector2D;
    private var physics:Physics;

    public function new(startPosition:Vector2D) {
        this.startPosition = startPosition;
    }

    override public function onStarted() {
        var script = new Script();
        script.bt.addChild(new Delay(1000));
        script.bt.addChild(new GetLocalEntities(100));
        owner.add(script);
    }

    override public function onAdded() {
        owner.name = "GunTurret";
        var shape = new Circle(30,new Vector2D(0,0));
        physics = new Physics(startPosition.x,startPosition.y,0,0,[shape]);
        physics.body.MakeStatic();

        owner
            .add(new Position())
            .add(physics)
            .add(new Display("turret","turretA.png"));

    }

}