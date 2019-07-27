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
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
function baseMethod(target, key, descriptor, methodType) {
    var _a;
    if (descriptor === undefined) {
        descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    var name;
    if (methodType === 'instanceMethods') {
        name = target.constructor.name;
    }
    if (methodType === 'staticMethods') {
        name = target.name;
    }
    if (!data_1.methods[methodType][name]) {
        data_1.methods[methodType][name] = {};
    }
    var method = descriptor.value;
    data_1.methods[methodType][name] = __assign({}, data_1.methods[methodType][name], (_a = {}, _a[key] = method, _a));
}
function staticMethod(target, key, descriptor) {
    return baseMethod(target, key, descriptor, 'staticMethods');
}
exports.staticMethod = staticMethod;
function instanceMethod(target, key, descriptor) {
    return baseMethod(target, key, descriptor, 'instanceMethods');
}
exports.instanceMethod = instanceMethod;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21ldGhvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRUEsK0JBQWlDO0FBV2pDLFNBQVMsVUFBVSxDQUFDLE1BQVcsRUFBRSxHQUFXLEVBQUUsVUFBd0MsRUFBRSxVQUFzQjs7SUFDNUcsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1FBQzVCLFVBQVUsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzNEO0lBRUQsSUFBSSxJQUFTLENBQUM7SUFDZCxJQUFJLFVBQVUsS0FBSyxpQkFBaUIsRUFBRTtRQUNwQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7S0FDaEM7SUFDRCxJQUFJLFVBQVUsS0FBSyxlQUFlLEVBQUU7UUFDbEMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDcEI7SUFFRCxJQUFJLENBQUMsY0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzlCLGNBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDaEM7SUFFRCxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2hDLGNBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQ3BCLGNBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFDM0IsR0FBRyxJQUFHLE1BQU0sTUFDZCxDQUFDO0FBQ0osQ0FBQztBQWNELFNBQWdCLFlBQVksQ0FBQyxNQUFXLEVBQUUsR0FBVyxFQUFFLFVBQXdDO0lBQzdGLE9BQU8sVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFGRCxvQ0FFQztBQWFELFNBQWdCLGNBQWMsQ0FBQyxNQUFXLEVBQUUsR0FBVyxFQUFFLFVBQXdDO0lBQy9GLE9BQU8sVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDaEUsQ0FBQztBQUZELHdDQUVDIn0=