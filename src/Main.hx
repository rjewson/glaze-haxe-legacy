package ;

import js.Browser;

class Main 
{

	public static function main() {
        var exile = new game.exile.Exile();

        Browser.document.getElementById("stopbutton").addEventListener("click",function(event){
            exile.gameLoop.stop();
        });
        Browser.document.getElementById("startbutton").addEventListener("click",function(event){
            exile.gameLoop.start();
        });
        Browser.document.getElementById("debugbutton").addEventListener("click",function(event){
        });
        Browser.document.getElementById("action1").addEventListener("click",function(event){
        });
        Browser.document.getElementById("action2").addEventListener("click",function(event){
        });        
    }	
    
}