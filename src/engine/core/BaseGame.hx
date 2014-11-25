
package engine.core;

import utils.AssetLoader;

class BaseGame 
{

    public var assets:AssetLoader;

    public var gameLoop:GameLoop;

    public function new() {

        gameLoop = new GameLoop();

    }

    public function loadAssets(assetList:Array<String>) {
        assets = new AssetLoader();
        assets.addEventListener("loaded",prepare);
        assets.SetImagesToLoad( assetList );
        assets.Load();
    }

    public function prepare(event) {
        preInit();
        prepareRenderer();
        prepareEngine();
    }

    public function preInit() {

    }

    public function prepareEngine() {

    }

    public function prepareRenderer() {

    }

}