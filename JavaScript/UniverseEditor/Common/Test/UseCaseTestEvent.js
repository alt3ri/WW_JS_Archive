"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.useCaseTestEventDispatcher = exports.UseCaseTestEventDispatcher =
    void 0);
const EventSystem_1 = require("../Misc/EventSystem"),
  eventDefine = {
    GameTestResult: (e, s) => {},
    RunningStateChanged: (e) => {},
  };
class UseCaseTestEventDispatcher extends EventSystem_1.EventDispatcher {}
(exports.UseCaseTestEventDispatcher = UseCaseTestEventDispatcher),
  (exports.useCaseTestEventDispatcher = new UseCaseTestEventDispatcher());
//# sourceMappingURL=UseCaseTestEvent.js.map
