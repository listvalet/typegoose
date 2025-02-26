"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
function isPrimitive(Type) {
    return ['String', 'Number', 'Boolean', 'Date', 'Decimal128', 'ObjectID'].includes(Type.name);
}
exports.isPrimitive = isPrimitive;
function isObject(Type) {
    var prototype = Type.prototype;
    var name = Type.name;
    while (name) {
        if (name === 'Object') {
            return true;
        }
        prototype = Object.getPrototypeOf(prototype);
        name = prototype ? prototype.constructor.name : null;
    }
    return false;
}
exports.isObject = isObject;
function isNumber(Type) {
    return Type.name === 'Number';
}
exports.isNumber = isNumber;
function isString(Type) {
    return Type.name === 'String';
}
exports.isString = isString;
function initAsObject(name, key) {
    if (!data_1.schema[name]) {
        data_1.schema[name] = {};
    }
    if (!data_1.schema[name][key]) {
        data_1.schema[name][key] = {};
    }
}
exports.initAsObject = initAsObject;
function initAsArray(name, key) {
    if (!data_1.schema[name]) {
        data_1.schema[name] = {};
    }
    if (!data_1.schema[name][key]) {
        data_1.schema[name][key] = [{}];
    }
}
exports.initAsArray = initAsArray;
function getClassForDocument(document) {
    var modelName = document.constructor.modelName;
    return data_1.constructors[modelName];
}
exports.getClassForDocument = getClassForDocument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSwrQkFBOEM7QUFPOUMsU0FBZ0IsV0FBVyxDQUFDLElBQVM7SUFDbkMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvRixDQUFDO0FBRkQsa0NBRUM7QUFPRCxTQUFnQixRQUFRLENBQUMsSUFBUztJQUNoQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQy9CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsT0FBTyxJQUFJLEVBQUU7UUFDWCxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDckIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELFNBQVMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDdEQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFaRCw0QkFZQztBQU9ELFNBQWdCLFFBQVEsQ0FBQyxJQUFTO0lBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUM7QUFDaEMsQ0FBQztBQUZELDRCQUVDO0FBT0QsU0FBZ0IsUUFBUSxDQUFDLElBQVM7SUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQztBQUNoQyxDQUFDO0FBRkQsNEJBRUM7QUFPRCxTQUFnQixZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUc7SUFDcEMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNqQixhQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ25CO0lBQ0QsSUFBSSxDQUFDLGFBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN0QixhQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ3hCO0FBQ0gsQ0FBQztBQVBELG9DQU9DO0FBT0QsU0FBZ0IsV0FBVyxDQUFDLElBQVMsRUFBRSxHQUFRO0lBQzdDLElBQUksQ0FBQyxhQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDakIsYUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNuQjtJQUNELElBQUksQ0FBQyxhQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdEIsYUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDMUI7QUFDSCxDQUFDO0FBUEQsa0NBT0M7QUFNRCxTQUFnQixtQkFBbUIsQ0FBQyxRQUEyQjtJQUM3RCxJQUFNLFNBQVMsR0FBSSxRQUFRLENBQUMsV0FBK0MsQ0FBQyxTQUFTLENBQUM7SUFDdEYsT0FBTyxtQkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFIRCxrREFHQyJ9