"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
var hooks = {
    pre: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (constructor) {
            addToHooks(constructor.name, 'pre', args);
        };
    },
    post: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (constructor) {
            addToHooks(constructor.name, 'post', args);
        };
    },
};
function addToHooks(name, hookType, args) {
    if (!data_1.hooks[name]) {
        data_1.hooks[name] = { pre: [], post: [] };
    }
    data_1.hooks[name][hookType].push(args);
}
exports.pre = hooks.pre;
exports.post = hooks.post;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaG9va3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSwrQkFBNEM7QUFpRTVDLElBQU0sS0FBSyxHQUFVO0lBQ25CLEdBQUcsRUFBSDtRQUFJLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAseUJBQU87O1FBQ1QsT0FBTyxVQUFDLFdBQWdCO1lBQ3RCLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBSSxFQUFKO1FBQUssY0FBTzthQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87WUFBUCx5QkFBTzs7UUFDVixPQUFPLFVBQUMsV0FBZ0I7WUFDdEIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDO0FBUUYsU0FBUyxVQUFVLENBQUMsSUFBWSxFQUFFLFFBQXdCLEVBQUUsSUFBUztJQUNuRSxJQUFJLENBQUMsWUFBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3BCLFlBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO0tBQ3pDO0lBQ0QsWUFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRVksUUFBQSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUNoQixRQUFBLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDIn0=