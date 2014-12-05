package eco.core;

import haxe.macro.Expr;
import haxe.macro.Context;
import haxe.macro.Type;



class ComponentBuilder 
{

    public static function build () :Array<Field> {
        var pos = Context.currentPos();
        var cl = Context.getLocalClass().get();

        var name = Context.makeExpr(getComponentName(cl), pos);
        var componentType = TPath({pack: cl.pack, name: cl.name, params: []});

        var fields = buildFields(macro {
            #if doc @:noDoc #end
            var public__static__inline__NAME = $name;
        });

        // Only override get_name if this component directly extends a @:componentBase and creates a
        // new namespace
        if (extendsComponentBase(cl)) {
            fields = fields.concat(buildFields(macro {
                function override__private__get_name () :String {
                    return $name;
                }
            }));
        }

        // if (extendsComponentBase(cl)) {
        //     fields = fields.concat(buildFields(macro {
        //         function override__private__get_name () :String {
        //             return $name;
        //         }
        //     }));
        // }

        return fields.concat(Context.getBuildFields());
    }

    private static function getComponentName (cl :ClassType) :String
    {
        // Traverse up to the last non-component base
        while (true) {
            if (extendsComponentBase(cl)) {
                break;
            }
            cl = cl.superClass.t.get();
        }

        // Look up the ID, otherwise generate one
        var fullName = cl.pack.concat([cl.name]).join(".");
        var name = _nameCache.get(fullName);
        if (name == null) {
            name = cl.name;// + "_" + _nextId;
            _nameCache.set(fullName, name);
            ++_nextId;
        }

        return name;
    }

    private static function extendsComponentBase (cl :ClassType)
    {
        var superClass = cl.superClass.t.get();
        return superClass.meta.has(":componentBase");
    }

    public static function buildFields (block :Expr) :Array<Field>
    {
        var fields :Array<Field> = [];
        switch (block.expr) {
            case EBlock(exprs):
                var metas = [];
                for (expr in exprs) {
                    switch (expr.expr) {
                        case EMeta(meta, e):
                            metas.push(meta);
                        case EVars(vars):
                            for (v in vars) {
                                fields.push({
                                    name: getFieldName(v.name),
                                    doc: null,
                                    access: getAccess(v.name),
                                    kind: FVar(v.type, v.expr),
                                    pos: v.expr.pos,
                                    meta: metas,
                                });
                            }
                            metas = [];
                        case EFunction(name, f):
                            fields.push({
                                name: getFieldName(name),
                                doc: null,
                                access: getAccess(name),
                                kind: FFun(f),
                                pos: f.expr.pos,
                                meta: metas,
                            });
                            metas = [];
                        default:
                    }
                }
            default:
        }
        return fields;
    }

    private static function getAccess (name :String) :Array<Access>
    {
        var result = [];
        for (token in name.split("__")) {
            var access = switch (token) {
                case "public": APublic;
                case "private": APrivate;
                case "static": AStatic;
                case "override": AOverride;
                case "dynamic": ADynamic;
                case "inline": AInline;
                default: null;
            }
            if (access != null) {
                result.push(access);
            }
        }
        return result;
    }

    private static function getFieldName (name :String) :String
    {
        var parts = name.split("__");
        return parts[parts.length-1];
    }

    private static var _nameCache = new Map<String,String>();
    private static var _nextId = 0;    

}