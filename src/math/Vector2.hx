
package math;

typedef Vector2Shape =
{
    public var x:Float;
    public var y:Float;
}

class Vector2Default
{
    public var x:Float;
    public var y:Float;
    
    public function new(x:Float, y:Float)
    {
        this.x = x;
        this.y = y;
    }
}

@:forward(x, y)
abstract Vector2(Vector2Default) from Vector2Default to Vector2Default
{

    inline public function new(x:Float, y:Float)
    {
        this = new Vector2Default(x, y);
    }

}