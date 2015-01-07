Glaze Haxe Game Engine
======================

2D game engine in alpha development state.

Primary requirement:
- 2D tiled world with arbitary shaped convex tiles
- Massive worlds (>1000x1000 tiles)
- World state management to support world size

Current features:
- HTML5 Browser target only, contains specific platform optimizations
- Custom 2D Webgl rendering engine (under /wgr)
  - Standard (hierachical) display list with nested transforms
  - Point and quad sprite based particle engines
  - High performance tile drawing shader (1 quad/draw for full screen tile draw) using virtual texturing
- Custom physics engine
  - Losely based on Glaze physics engine
- Entity Component System
- Behavior Tree
- Broadphase management for optimal ai, rendering, phsyics etc
- Tiled map editor integration
- TexturePacker integration 
- Input management etc etc

Pretty much only tested on Chrome/Mac atm.  

Demo at http://www.rjewson.com/glaze/

Much more to come...