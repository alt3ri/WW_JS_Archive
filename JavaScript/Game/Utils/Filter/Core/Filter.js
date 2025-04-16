"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Filter =
    exports.tryCatchWrapper =
    exports.filterResult =
    exports.filterTypePriority =
      void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Criteria_1 = require("./Criteria");
function tryCatchWrapper(t, e, r) {
  try {
    return t();
  } catch (t) {
    t instanceof Error
      ? Log_1.Log.CheckError() &&
        Log_1.Log.ErrorWithStack(
          "FilterWithState",
          72,
          e,
          t,
          ["debugValue", r],
          ["error", t.message],
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "FilterWithState",
          72,
          e,
          ["debugValue", r],
          ["error", t],
        );
  }
}
(exports.filterTypePriority = [0, 1, 2]),
  (exports.filterResult = { [0]: !0, 1: !0, 2: !1 }),
  (exports.tryCatchWrapper = tryCatchWrapper);
class Filter {
  constructor() {
    (this.TargetCriteriaInternal = Criteria_1.alwaysTrueCriteria),
      (this.FilterType = 2);
  }
  get Criteria() {
    return this.TargetCriteriaInternal;
  }
  set Criteria(t) {
    (this.TargetCriteriaInternal = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FilterCriteriaChanged,
        this,
      );
  }
  Init() {
    tryCatchWrapper(
      this.OnInit.bind(this),
      "[Filter] OnInit执行出错",
      this.constructor.name,
    );
  }
  OnInit() {}
  Cleanup() {
    tryCatchWrapper(
      this.OnInit.bind(this),
      "[Filter] OnCleanup执行出错",
      this.constructor.name,
    );
  }
  OnCleanup() {}
  ExecuteCriteria(e) {
    try {
      return this.TargetCriteriaInternal(e);
    } catch (t) {
      t instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "FilterWithState",
            72,
            "业务层执行过滤器的判定标准的时候异常",
            t,
            ["target", e],
            ["error", t],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "FilterWithState",
            72,
            "业务层执行过滤器的判定标准的时候异常, 并且捕获的不是Error",
            ["target", e],
          );
    }
    return !1;
  }
}
exports.Filter = Filter;
//# sourceMappingURL=Filter.js.map
