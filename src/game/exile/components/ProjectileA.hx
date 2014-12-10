
package game.exile.components;

import eco.core.Component;
import engine.components.Display;
import engine.components.Lifecycle;
import engine.components.ParticleEmitters;
import engine.components.Physics;
import engine.components.Position;
import physics.geometry.Polygon;
import physics.geometry.Vector2D;
import wgr.particle.emitter.Explosion;
import wgr.particle.emitter.RandomSpray;

class ProjectileA extends Component 
{

    private var startPosition:Vector2D;
    private var startVelocity:Vector2D;
    private var physics:Physics;

    public function new(startPosition:Vector2D,startVelocity:Vector2D) {
        this.startPosition = startPosition;
        this.startVelocity = startVelocity;
    }

    override public function onAdded() {
        
        physics = new Physics(startPosition.x,startPosition.y,0,0,[new Polygon(Polygon.CreateRectangle(16,16),new Vector2D(0,0))]);
        physics.body.SetMass(0.1);
        physics.body.group = 1;
        physics.body.SetVelocity(startVelocity);

        owner
            .add(new Position(0,0,0))
            .add(physics)
            .add(new Display("character","projectile1.png"))
            .add(new Lifecycle(1000))
            .add(new ParticleEmitters([new RandomSpray(60,60)]));

        owner.events.add(function(type:String,data:Dynamic){
            if (type=="lc")
                destroy();
        });

    }

    public function destroy() {
        owner.engine.removeEntity(owner);
        var pm:ParticleEmitters = cast owner.getComponentByClass(ParticleEmitters);
        pm.AddEmitter(new Explosion(10,100),true);
    }

}
            