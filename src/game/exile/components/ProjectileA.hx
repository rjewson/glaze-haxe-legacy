
package game.exile.components;

import eco.core.Component;
import engine.components.Display;
import engine.components.Lifecycle;
import engine.components.ParticleEmitters;
import engine.components.Physics;
import engine.components.Position;
import engine.components.Script;
import engine.components.Steering;
import physics.dynamics.Arbiter;
import physics.geometry.Circle;
import physics.geometry.Polygon;
import physics.geometry.Vector2D;
import wgr.particle.emitter.Explosion;
import wgr.particle.emitter.RandomSpray;

class ProjectileA extends Component 
{

    // private var startPosition:Vector2D;
    // private var startVelocity:Vector2D;
    private var physics:Physics;

    private var script:Script;

    private var totalContactCount:Int = 0;

    public function new(startPosition:Vector2D,startVelocity:Vector2D,group:Int=0) {
        // this.startPosition = startPosition;
        // this.startVelocity = startVelocity;
        var shape = new Circle(6,new Vector2D(0,0));
        physics = new Physics(startPosition.x,startPosition.y,0,0,[shape]);
        physics.body.SetMass(0.1);
        physics.body.group = group;
        physics.body.features[0].contactCallback = OnContact;
        physics.body.SetVelocity(startVelocity);
    }

    override public function onAdded() {
        owner.name = "ProjectileA";
        
        owner
            .add(new Position())
            .add(physics)
            .add(new Display("character","projectile1.png"))
            .add(new Lifecycle(utils.Random.RandomInteger(1000,1500)))
            .add(new ParticleEmitters([new RandomSpray(60,60)]));
            // .add(new Steering());


        owner.events.add(function(type:String,data:Dynamic){
            if (type=="lc")
                destroy();
        });

    }

    function OnContact(arbiter:Arbiter):Void {
        if (arbiter.isSensor)
            return;
        totalContactCount++;
        // trace(totalContactCount);
        // intraStepContactCount++;
        if (totalContactCount>1 || arbiter.OpposingBody(physics.body).id > 0) {
            //destroy();
        }
    }

    public function destroy() {
        var pm:ParticleEmitters = cast owner.getComponentByClass(ParticleEmitters);
        pm.AddEmitter(new Explosion(10,100),true);
        owner.engine.removeEntity(owner);
    }

}
            