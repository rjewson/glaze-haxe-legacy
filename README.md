Unnamed Haxe Game Engine
========================

Haxe game engine:

- HTML5 Browser target only, contains specific optimizations
- Custom 2D Webgl rendering engine (under /wgr)
  - Standard (hierachical) display list with nested transforms
  - Point and quad sprite based particle engines
  - High performance tile drawing shader (1 quad/draw for full screen tile draw) using virtual texturing
- Custom physics engine
  - Losely based on Glaze physics engine
- Entity Component System
- Behavior Tree
- Broadphase management
- Input etc etc

Pretty much only tested on Chrome/Mac atm.  

Much more to come...