"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function index(fields, options) {
    return function (constructor) {
        var indices = Reflect.getMetadata('typegoose:indices', constructor) || [];
        indices.push({ fields: fields, options: options });
        Reflect.defineMetadata('typegoose:indices', indices, constructor);
    };
}
exports.index = index;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF3RUEsU0FBZ0IsS0FBSyxDQUFDLE1BQVcsRUFBRSxPQUFzQjtJQUN2RCxPQUFPLFVBQUMsV0FBZ0I7UUFDdEIsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNwRSxDQUFDLENBQUM7QUFDSixDQUFDO0FBTkQsc0JBTUMifQ==