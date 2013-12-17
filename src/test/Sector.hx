package test;

class Sector {
    public var alpha:Float;
    public var theta:Float;

    public function beta():Float
    {
        return alpha + theta;           
    }

    public function Sector(alphaRadian:Float = 0, betaRadian:Float = 0)
    {
        alpha = alphaRadian;
        theta = betaRadian - alphaRadian;
    }
        
    public function clear()
    {
        alpha = theta = 0;  
    }

    public function setFullCircle()
    {
        alpha = 0;
        theta = Math.PI*2;
    }

    public function setCone(x:Float,y:Float, coneAngle:Float, normalize:Bool = false)
    {
        alpha = Math.atan2(y, x) - 0.5 * coneAngle;
        if(normalize)
            alpha = normalizeRad2(alpha);
        theta = coneAngle;
    }

    public function setFromCoords(cx:Float, cy:Float, ax:Float, ay:Float, bx:Float, by:Float, normalize:Bool = false)
    {
        alpha = Math.atan2(ay-cy, ax-cx);
        var newBeta:Float = Math.atan2(by-cy, bx-cx);
        if(normalize)
        {   
            alpha = normalizeRad2(alpha);
            newBeta = normalizeRad2(newBeta);
        }
        if(alpha >= newBeta)
            alpha = theta = 0;  //clear
        else
            theta = newBeta - alpha;
    }

    public function copy(a:Sector)
    {
        alpha = a.alpha;
        theta = a.theta;        
    }

    public function setIntersection(a:Sector, b:Sector)
    {
        if(a.theta == 0 || b.theta == 0)
            alpha = theta = 0;  //clear
        else
        {
            alpha = Math.max(a.alpha, b.alpha);
            var newBeta:Float = Math.min(a.alpha + a.theta, b.alpha + b.theta);
            if(newBeta <= alpha)
                alpha = theta = 0;//clear
            else
                theta = newBeta - alpha;                
        }
    }

    public function setUnion(a:Sector, b:Sector)
    {
        if(a.theta == 0)
        {
            //copy b
            alpha = b.alpha;
            theta = b.theta;
        }
        else if(b.theta == 0)
        {
            //copy a
            alpha = a.alpha;
            theta = a.theta;
        }
        else
        {
            alpha = Math.min(a.alpha, b.alpha);
            var newBeta:Float = Math.max(a.beta(), b.beta());
            if(newBeta <= alpha)
                alpha = theta = 0;  //clear
            else
                theta = newBeta - alpha;
        }
    }

    public static function normalizeRad2(angle:Float):Float
    {
        while( angle < 0)
            angle += Math.PI*2;
        while( angle > Math.PI*2)
            angle -= Math.PI*2;
        return angle;
    }       

}