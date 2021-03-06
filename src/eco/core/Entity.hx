
package eco.core;

#if macro
import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;
using haxe.macro.ExprTools;
#end

import eco.core.Component;
import eco.core.Entity;
import eco.signals.Signal2;

@:final class Entity 
{

    public var name:String;

    public var components:Array<Component>;
    public var componentMap:Dynamic<Component>;

    public var engine:Engine;

    public var events:Signal2<String,Dynamic>;

    public function new(name:String = null) {
        this.name = name;
        components = [];
        componentMap = {};
        events = new Signal2<String,Dynamic>();
    }

    public function add(component:Component):Entity {
        if (component.owner!=null) {
            component.owner.remove(component);
        }

        var name = component.name;
        var prev = getComponent(name);
        if (prev != null) {
            remove(prev);
        }

        untyped componentMap[name] = component;
        components.push(component);

        component.owner = this;
        component.onAdded();

        if (engine!=null) {
            engine.setComponentPriority(component);
            engine.componentAdded.dispatch(this,Type.getClass(component));
            sortComponents();
        }

        return this;
    }

    public function remove(component:Component):Entity {
        if (component.owner!=this)
            return this;
        untyped __js__("delete")(componentMap[p.name]);
        var i = components.indexOf(component);
        if (i>=0)
            components.splice(i,1);
        return this;
    }

    public function onAdded(engine:Engine) {
        this.engine = engine;
        for (component in components) {
            engine.setComponentPriority(component);
            engine.componentAdded.dispatch(this,Type.getClass(component));
        }
        sortComponents();
    }

    public function onRemoved() {
        for (component in components) {
            engine.componentRemoved.dispatch(this,Type.getClass(component));
        }        
        
        this.engine = null;
    }

    public function update(time:Float) {
        for (component in components) {
            if (!component.started) {
                component.started = true;
                component.onStarted();
            }
            component.update(time);
        }
    }

    public function sortComponents() {
        components.sort(function(a:Component,b:Component):Int {
            return b.priority - a.priority;
        });
    }
 
    public inline function getComponent(name:String):Component {
        return untyped componentMap[name];
    }

    public inline function getComponentByClass(component:Class<Component>):Component {
        return untyped componentMap[component.NAME];
    }

    //Hmmm more than a litte dirty, should be a macro i think...
    //Pretty much just optimized for speed
    public inline function get<A:Component> (componentClass :Class<A>) :A {
        return untyped componentMap[componentClass.NAME];
    }

    public function registerEvent(type:String,listener:Dynamic->Void) {
        
    }

    public static function Create(components:Array<Component>):Entity {
        var entity = new Entity();
        for (component in components)
            entity.add(component);
        return entity;
    }

}