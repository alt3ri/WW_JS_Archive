"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestTask = void 0;
const TaskBase_1 = require("./TaskBase");
class TestTask extends TaskBase_1.TaskBase {
  static StartTask(message) {
    const num = ++this._private_Num;
    global.log("[TestTask] StartTask: " + num);
    return { bbb: 2 };
  }
}
exports.TestTask = TestTask;
TestTask._private_Num = 0;
//# sourceMappingURL=TestTask.js.map
