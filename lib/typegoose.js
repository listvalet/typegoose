"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
require("reflect-metadata");
var data_1 = require("./data");
__export(require("./method"));
__export(require("./prop"));
__export(require("./hooks"));
__export(require("./plugin"));
__export(require("."));
var utils_1 = require("./utils");
exports.getClassForDocument = utils_1.getClassForDocument;
var Typegoose = (function () {
    function Typegoose() {
    }
    Typegoose.prototype.getModelForClass = function (t, _a) {
        var _b = _a === void 0 ? {} : _a, existingMongoose = _b.existingMongoose, schemaOptions = _b.schemaOptions, existingConnection = _b.existingConnection;
        var name = this.constructor.name;
        if (!data_1.models[name]) {
            this.setModelForClass(t, {
                existingMongoose: existingMongoose,
                schemaOptions: schemaOptions,
                existingConnection: existingConnection,
            });
        }
        return data_1.models[name];
    };
    Typegoose.prototype.setModelForClass = function (t, _a) {
        var _b = _a === void 0 ? {} : _a, existingMongoose = _b.existingMongoose, schemaOptions = _b.schemaOptions, existingConnection = _b.existingConnection;
        var name = this.constructor.name;
        var sch = this.buildSchema(t, { existingMongoose: existingMongoose, schemaOptions: schemaOptions });
        var model = mongoose.model.bind(mongoose);
        if (existingConnection) {
            model = existingConnection.model.bind(existingConnection);
        }
        else if (existingMongoose) {
            model = existingMongoose.model.bind(existingMongoose);
        }
        data_1.models[name] = model(name, sch);
        data_1.constructors[name] = this.constructor;
        return data_1.models[name];
    };
    Typegoose.prototype.buildSchema = function (t, _a) {
        var schemaOptions = (_a === void 0 ? {} : _a).schemaOptions;
        var name = this.constructor.name;
        var sch = _buildSchema(t, name, schemaOptions);
        var parentCtor = Object.getPrototypeOf(this.constructor.prototype).constructor;
        while (parentCtor && parentCtor.name !== 'Typegoose' && parentCtor.name !== 'Object') {
            sch = _buildSchema(t, parentCtor.name, schemaOptions, sch);
            parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
        }
        return sch;
    };
    return Typegoose;
}());
exports.Typegoose = Typegoose;
function _buildSchema(t, name, schemaOptions, sch) {
    var Schema = mongoose.Schema;
    if (!sch) {
        sch = schemaOptions ? new Schema(data_1.schema[name], schemaOptions) : new Schema(data_1.schema[name]);
    }
    else {
        sch.add(data_1.schema[name]);
    }
    var staticMethods = data_1.methods.staticMethods[name];
    if (staticMethods) {
        sch.statics = Object.assign(staticMethods, sch.statics || {});
    }
    else {
        sch.statics = sch.statics || {};
    }
    var instanceMethods = data_1.methods.instanceMethods[name];
    if (instanceMethods) {
        sch.methods = Object.assign(instanceMethods, sch.methods || {});
    }
    else {
        sch.methods = sch.methods || {};
    }
    if (data_1.hooks[name]) {
        data_1.hooks[name].pre.forEach(function (preHookArgs) {
            var _a;
            (_a = sch).pre.apply(_a, preHookArgs);
        });
        data_1.hooks[name].post.forEach(function (postHookArgs) {
            var _a;
            (_a = sch).post.apply(_a, postHookArgs);
        });
    }
    if (data_1.plugins[name]) {
        for (var _i = 0, _a = data_1.plugins[name]; _i < _a.length; _i++) {
            var plugin = _a[_i];
            sch.plugin(plugin.mongoosePlugin, plugin.options);
        }
    }
    var getterSetters = data_1.virtuals[name];
    if (getterSetters) {
        for (var _b = 0, _c = Object.keys(getterSetters); _b < _c.length; _b++) {
            var key = _c[_b];
            if (getterSetters[key].options && getterSetters[key].options.overwrite) {
                sch.virtual(key, getterSetters[key].options);
            }
            else {
                if (getterSetters[key].get) {
                    sch.virtual(key, getterSetters[key].options).get(getterSetters[key].get);
                }
                if (getterSetters[key].set) {
                    sch.virtual(key, getterSetters[key].options).set(getterSetters[key].set);
                }
            }
        }
    }
    var indices = Reflect.getMetadata('typegoose:indices', t) || [];
    for (var _d = 0, indices_1 = indices; _d < indices_1.length; _d++) {
        var index = indices_1[_d];
        sch.index(index.fields, index.options);
    }
    return sch;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWdvb3NlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3R5cGVnb29zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLG1DQUFxQztBQUNyQyw0QkFBMEI7QUFFMUIsK0JBQXlGO0FBR3pGLDhCQUF5QjtBQUN6Qiw0QkFBdUI7QUFDdkIsNkJBQXdCO0FBQ3hCLDhCQUF5QjtBQUN6Qix1QkFBa0I7QUFDbEIsaUNBQThDO0FBQXJDLHNDQUFBLG1CQUFtQixDQUFBO0FBaUI1QjtJQUFBO0lBaUZBLENBQUM7SUFyRVEsb0NBQWdCLEdBQXZCLFVBQ0UsQ0FBSSxFQUNKLEVBQXFGO1lBQXJGLDRCQUFxRixFQUFuRixzQ0FBZ0IsRUFBRSxnQ0FBYSxFQUFFLDBDQUFrQjtRQUVyRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZCLGdCQUFnQixrQkFBQTtnQkFDaEIsYUFBYSxlQUFBO2dCQUNiLGtCQUFrQixvQkFBQTthQUNuQixDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sYUFBTSxDQUFDLElBQUksQ0FBd0IsQ0FBQztJQUM3QyxDQUFDO0lBWU0sb0NBQWdCLEdBQXZCLFVBQ0UsQ0FBSSxFQUNKLEVBQXFGO1lBQXJGLDRCQUFxRixFQUFuRixzQ0FBZ0IsRUFBRSxnQ0FBYSxFQUFFLDBDQUFrQjtRQUVyRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUVuQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFJLENBQUMsRUFBRSxFQUFFLGdCQUFnQixrQkFBQSxFQUFFLGFBQWEsZUFBQSxFQUFFLENBQUMsQ0FBQztRQUV4RSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxJQUFJLGtCQUFrQixFQUFFO1lBQ3RCLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDM0Q7YUFBTSxJQUFJLGdCQUFnQixFQUFFO1lBQzNCLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdkQ7UUFFRCxhQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxtQkFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFdEMsT0FBTyxhQUFNLENBQUMsSUFBSSxDQUF3QixDQUFDO0lBQzdDLENBQUM7SUFRTSwrQkFBVyxHQUFsQixVQUFzQixDQUFJLEVBQUUsRUFBK0M7WUFBN0MsdURBQWE7UUFDekMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFHbkMsSUFBSSxHQUFHLEdBQUcsWUFBWSxDQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFbEQsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUUvRSxPQUFPLFVBQVUsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUVwRixHQUFHLEdBQUcsWUFBWSxDQUFJLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUU5RCxVQUFVLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBakZELElBaUZDO0FBakZZLDhCQUFTO0FBNkZ0QixTQUFTLFlBQVksQ0FBSSxDQUFJLEVBQUUsSUFBWSxFQUFFLGFBQWtCLEVBQUUsR0FBcUI7SUFFcEYsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUUvQixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1IsR0FBRyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsYUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxhQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUMxRjtTQUFNO1FBQ0wsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN2QjtJQUdELElBQU0sYUFBYSxHQUFHLGNBQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsSUFBSSxhQUFhLEVBQUU7UUFDakIsR0FBRyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQy9EO1NBQU07UUFDTCxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO0tBQ2pDO0lBR0QsSUFBTSxlQUFlLEdBQUcsY0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxJQUFJLGVBQWUsRUFBRTtRQUNuQixHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7S0FDakU7U0FBTTtRQUNMLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7S0FDakM7SUFFRCxJQUFJLFlBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNmLFlBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsV0FBVzs7WUFDakMsQ0FBQSxLQUFDLEdBQVcsQ0FBQSxDQUFDLEdBQUcsV0FBSSxXQUFXLEVBQUU7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxZQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFlBQVk7O1lBQ25DLENBQUEsS0FBQyxHQUFXLENBQUEsQ0FBQyxJQUFJLFdBQUksWUFBWSxFQUFFO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLGNBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNqQixLQUFxQixVQUFhLEVBQWIsS0FBQSxjQUFPLENBQUMsSUFBSSxDQUFDLEVBQWIsY0FBYSxFQUFiLElBQWEsRUFBRTtZQUEvQixJQUFNLE1BQU0sU0FBQTtZQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkQ7S0FDRjtJQUdELElBQU0sYUFBYSxHQUFHLGVBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxJQUFJLGFBQWEsRUFBRTtRQUNqQixLQUFrQixVQUEwQixFQUExQixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQTFCLGNBQTBCLEVBQTFCLElBQTBCLEVBQUU7WUFBekMsSUFBTSxHQUFHLFNBQUE7WUFDWixJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7Z0JBQ3RFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM5QztpQkFBTTtnQkFDTCxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUU7b0JBQzFCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMxRTtnQkFFRCxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUU7b0JBQzFCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMxRTthQUNGO1NBQ0Y7S0FDRjtJQUdELElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xFLEtBQW9CLFVBQU8sRUFBUCxtQkFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTyxFQUFFO1FBQXhCLElBQU0sS0FBSyxnQkFBQTtRQUNkLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDeEM7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMifQ==