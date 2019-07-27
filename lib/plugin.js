"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
function plugin(mongoosePlugin, options) {
    return function (constructor) {
        var name = constructor.name;
        if (!data_1.plugins[name]) {
            data_1.plugins[name] = [];
        }
        data_1.plugins[name].push({ mongoosePlugin: mongoosePlugin, options: options });
    };
}
exports.plugin = plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLCtCQUFpQztBQU9qQyxTQUFnQixNQUFNLENBQUMsY0FBbUIsRUFBRSxPQUFhO0lBQ3ZELE9BQU8sVUFBQyxXQUFnQjtRQUN0QixJQUFNLElBQUksR0FBVyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbEIsY0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNwQjtRQUNELGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxjQUFjLGdCQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQztBQUNKLENBQUM7QUFSRCx3QkFRQyJ9