"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionVisibleCondition =
    exports.unionToUnionVisibleCondition =
    exports.UnionVisibleCondition =
      void 0);
const clock_js_1 = require("../fb-condition/clock.js"),
  compare_var_js_1 = require("../fb-condition/compare-var.js"),
  pre_child_quest_js_1 = require("../fb-condition/pre-child-quest.js"),
  pre_quest_js_1 = require("../fb-condition/pre-quest.js"),
  time_period_js_1 = require("../fb-condition/time-period.js"),
  weather_js_1 = require("../fb-condition/weather.js");
var UnionVisibleCondition;
function unionToUnionVisibleCondition(e, r) {
  switch (UnionVisibleCondition[e]) {
    case "NONE":
      return;
    case "Clock":
      return r(new clock_js_1.Clock());
    case "CompareVar":
      return r(new compare_var_js_1.CompareVar());
    case "PreChildQuest":
      return r(new pre_child_quest_js_1.PreChildQuest());
    case "PreQuest":
      return r(new pre_quest_js_1.PreQuest());
    case "TimePeriod":
      return r(new time_period_js_1.TimePeriod());
    case "Weather":
      return r(new weather_js_1.Weather());
    default:
      return;
  }
}
function unionListToUnionVisibleCondition(e, r, i) {
  switch (UnionVisibleCondition[e]) {
    case "NONE":
      return;
    case "Clock":
      return r(i, new clock_js_1.Clock());
    case "CompareVar":
      return r(i, new compare_var_js_1.CompareVar());
    case "PreChildQuest":
      return r(i, new pre_child_quest_js_1.PreChildQuest());
    case "PreQuest":
      return r(i, new pre_quest_js_1.PreQuest());
    case "TimePeriod":
      return r(i, new time_period_js_1.TimePeriod());
    case "Weather":
      return r(i, new weather_js_1.Weather());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.Clock = 1)] = "Clock"),
    (e[(e.CompareVar = 2)] = "CompareVar"),
    (e[(e.PreChildQuest = 3)] = "PreChildQuest"),
    (e[(e.PreQuest = 4)] = "PreQuest"),
    (e[(e.TimePeriod = 5)] = "TimePeriod"),
    (e[(e.Weather = 6)] = "Weather");
})(
  (UnionVisibleCondition =
    exports.UnionVisibleCondition || (exports.UnionVisibleCondition = {})),
),
  (exports.unionToUnionVisibleCondition = unionToUnionVisibleCondition),
  (exports.unionListToUnionVisibleCondition = unionListToUnionVisibleCondition);
//# sourceMappingURL=union-visible-condition.js.map
