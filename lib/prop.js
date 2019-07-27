"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var util_1 = require("util");
var data_1 = require("./data");
var errors_1 = require("./errors");
var utils_1 = require("./utils");
var WhatIsIt;
(function (WhatIsIt) {
    WhatIsIt["ARRAY"] = "Array";
    WhatIsIt["MAP"] = "Map";
    WhatIsIt["NONE"] = "";
})(WhatIsIt || (WhatIsIt = {}));
function isWithStringValidate(options) {
    return !util_1.isNullOrUndefined(options.match
        || options.enum
        || options.minlength
        || options.maxlength);
}
function isWithStringTransform(options) {
    return !util_1.isNullOrUndefined(options.lowercase || options.uppercase || options.trim);
}
function isWithNumberValidate(options) {
    return !util_1.isNullOrUndefined(options.min || options.max);
}
function baseProp(rawOptions, Type, target, key, whatis) {
    if (whatis === void 0) { whatis = WhatIsIt.NONE; }
    var name = target.constructor.name;
    var isGetterSetter = Object.getOwnPropertyDescriptor(target, key);
    if (isGetterSetter) {
        if (isGetterSetter.get) {
            if (!data_1.virtuals[name]) {
                data_1.virtuals[name] = {};
            }
            if (!data_1.virtuals[name][key]) {
                data_1.virtuals[name][key] = {};
            }
            data_1.virtuals[name][key] = __assign({}, data_1.virtuals[name][key], { get: isGetterSetter.get, options: rawOptions });
        }
        if (isGetterSetter.set) {
            if (!data_1.virtuals[name]) {
                data_1.virtuals[name] = {};
            }
            if (!data_1.virtuals[name][key]) {
                data_1.virtuals[name][key] = {};
            }
            data_1.virtuals[name][key] = __assign({}, data_1.virtuals[name][key], { set: isGetterSetter.set, options: rawOptions });
        }
        return;
    }
    if (whatis === WhatIsIt.ARRAY) {
        utils_1.initAsArray(name, key);
    }
    else {
        utils_1.initAsObject(name, key);
    }
    var ref = rawOptions.ref;
    if (typeof ref === 'string') {
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key], { type: mongoose.Schema.Types.ObjectId, ref: ref });
        return;
    }
    else if (ref) {
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key], { type: mongoose.Schema.Types.ObjectId, ref: ref.name });
        return;
    }
    var itemsRef = rawOptions.itemsRef;
    if (itemsRef) {
        data_1.schema[name][key][0] = __assign({}, data_1.schema[name][key][0], { type: mongoose.Schema.Types.ObjectId, ref: itemsRef.name });
        return;
    }
    var refPath = rawOptions.refPath;
    if (refPath && typeof refPath === 'string') {
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key], { type: mongoose.Schema.Types.ObjectId, refPath: refPath });
        return;
    }
    var itemsRefPath = rawOptions.itemsRefPath;
    if (itemsRefPath && typeof itemsRefPath === 'string') {
        data_1.schema[name][key][0] = __assign({}, data_1.schema[name][key][0], { type: mongoose.Schema.Types.ObjectId, itemsRefPath: itemsRefPath });
        return;
    }
    var enumOption = rawOptions.enum;
    if (enumOption) {
        if (!Array.isArray(enumOption)) {
            rawOptions.enum = Object.keys(enumOption).map(function (propKey) { return enumOption[propKey]; });
        }
    }
    var selectOption = rawOptions.select;
    if (typeof selectOption === 'boolean') {
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key], { select: selectOption });
    }
    if (isWithStringValidate(rawOptions) && !utils_1.isString(Type)) {
        throw new errors_1.NotStringTypeError(key);
    }
    if (isWithNumberValidate(rawOptions) && !utils_1.isNumber(Type)) {
        throw new errors_1.NotNumberTypeError(key);
    }
    if (isWithStringTransform(rawOptions) && !utils_1.isString(Type)) {
        throw new errors_1.NotStringTypeError(key);
    }
    var instance = new Type();
    var subSchema = data_1.schema[instance.constructor.name];
    if (!subSchema && !utils_1.isPrimitive(Type) && !utils_1.isObject(Type)) {
        throw new errors_1.InvalidPropError(Type.name, key);
    }
    var r = rawOptions["ref"], i = rawOptions["items"], o = rawOptions["of"], _a = rawOptions["schemaOptions"], schemaOptions = _a === void 0 ? {} : _a, options = __rest(rawOptions, ['ref', 'items', 'of', 'schemaOptions']);
    if (utils_1.isPrimitive(Type)) {
        if (whatis === WhatIsIt.ARRAY) {
            data_1.schema[name][key] = __assign({}, data_1.schema[name][key][0], options, { type: [Type] });
            return;
        }
        if (whatis === WhatIsIt.MAP) {
            var mapDefault = options.mapDefault;
            delete options.mapDefault;
            data_1.schema[name][key] = __assign({}, data_1.schema[name][key], { type: Map, default: mapDefault, of: __assign({ type: Type }, options) });
            return;
        }
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key], options, { type: Type });
        return;
    }
    if (utils_1.isObject(Type) && !subSchema) {
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key], options, { type: Object });
        return;
    }
    var Schema = mongoose.Schema;
    var supressSubschemaId = rawOptions._id === false;
    if (supressSubschemaId) {
        schemaOptions._id = false;
    }
    if (whatis === WhatIsIt.ARRAY) {
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key][0], options, { type: [new Schema(__assign({}, subSchema), schemaOptions)] });
        return;
    }
    if (whatis === WhatIsIt.MAP) {
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key], { type: Map }, options);
        data_1.schema[name][key].of = __assign({}, data_1.schema[name][key].of, subSchema);
        return;
    }
    var virtualSchema = new Schema(__assign({}, subSchema), schemaOptions);
    var schemaInstanceMethods = data_1.methods.instanceMethods[instance.constructor.name];
    if (schemaInstanceMethods) {
        virtualSchema.methods = schemaInstanceMethods;
    }
    data_1.schema[name][key] = __assign({}, data_1.schema[name][key], options, { type: virtualSchema });
    return;
}
function prop(options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        var Type = Reflect.getMetadata('design:type', target, key);
        if (!Type) {
            throw new errors_1.NoMetadataError(key);
        }
        baseProp(options, Type, target, key, WhatIsIt.NONE);
    };
}
exports.prop = prop;
function mapProp(options) {
    return function (target, key) {
        var Type = options.of;
        baseProp(options, Type, target, key, WhatIsIt.MAP);
    };
}
exports.mapProp = mapProp;
function arrayProp(options) {
    return function (target, key) {
        var Type = options.items;
        baseProp(options, Type, target, key, WhatIsIt.ARRAY);
    };
}
exports.arrayProp = arrayProp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLG1DQUFxQztBQUVyQyw2QkFBeUM7QUFDekMsK0JBQW1EO0FBQ25ELG1DQUFxRztBQUNyRyxpQ0FBK0Y7QUFvRy9GLElBQUssUUFJSjtBQUpELFdBQUssUUFBUTtJQUNYLDJCQUFlLENBQUE7SUFDZix1QkFBVyxDQUFBO0lBQ1gscUJBQVMsQ0FBQTtBQUNYLENBQUMsRUFKSSxRQUFRLEtBQVIsUUFBUSxRQUlaO0FBTUQsU0FBUyxvQkFBb0IsQ0FBQyxPQUFzQztJQUNsRSxPQUFPLENBQUMsd0JBQWlCLENBQ3ZCLE9BQU8sQ0FBQyxLQUFLO1dBQ1YsT0FBTyxDQUFDLElBQUk7V0FDWixPQUFPLENBQUMsU0FBUztXQUNqQixPQUFPLENBQUMsU0FBUyxDQUNyQixDQUFDO0FBQ0osQ0FBQztBQU1ELFNBQVMscUJBQXFCLENBQUMsT0FBc0M7SUFDbkUsT0FBTyxDQUFDLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEYsQ0FBQztBQU1ELFNBQVMsb0JBQW9CLENBQUMsT0FBc0M7SUFDbEUsT0FBTyxDQUFDLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFVRCxTQUFTLFFBQVEsQ0FBQyxVQUFlLEVBQUUsSUFBUyxFQUFFLE1BQVcsRUFBRSxHQUFXLEVBQUUsTUFBZ0M7SUFBaEMsdUJBQUEsRUFBQSxTQUFtQixRQUFRLENBQUMsSUFBSTtJQUN0RyxJQUFNLElBQUksR0FBVyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztJQUM3QyxJQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFB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