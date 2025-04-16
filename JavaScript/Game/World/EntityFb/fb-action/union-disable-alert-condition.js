"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionDisableAlertCondition =
    exports.unionToUnionDisableAlertCondition =
    exports.UnionDisableAlertCondition =
      void 0);
const disable_alert_area_dungeon_condition_js_1 = require("../fb-action/disable-alert-area-dungeon-condition.js"),
  disable_alert_area_quest_condition_js_1 = require("../fb-action/disable-alert-area-quest-condition.js");
var UnionDisableAlertCondition;
function unionToUnionDisableAlertCondition(e, n) {
  switch (UnionDisableAlertCondition[e]) {
    case "NONE":
      return;
    case "DisableAlertAreaDungeonCondition":
      return n(
        new disable_alert_area_dungeon_condition_js_1.DisableAlertAreaDungeonCondition(),
      );
    case "DisableAlertAreaQuestCondition":
      return n(
        new disable_alert_area_quest_condition_js_1.DisableAlertAreaQuestCondition(),
      );
    default:
      return;
  }
}
function unionListToUnionDisableAlertCondition(e, n, i) {
  switch (UnionDisableAlertCondition[e]) {
    case "NONE":
      return;
    case "DisableAlertAreaDungeonCondition":
      return n(
        i,
        new disable_alert_area_dungeon_condition_js_1.DisableAlertAreaDungeonCondition(),
      );
    case "DisableAlertAreaQuestCondition":
      return n(
        i,
        new disable_alert_area_quest_condition_js_1.DisableAlertAreaQuestCondition(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.DisableAlertAreaDungeonCondition = 1)] =
      "DisableAlertAreaDungeonCondition"),
    (e[(e.DisableAlertAreaQuestCondition = 2)] =
      "DisableAlertAreaQuestCondition");
})(
  (UnionDisableAlertCondition =
    exports.UnionDisableAlertCondition ||
    (exports.UnionDisableAlertCondition = {})),
),
  (exports.unionToUnionDisableAlertCondition =
    unionToUnionDisableAlertCondition),
  (exports.unionListToUnionDisableAlertCondition =
    unionListToUnionDisableAlertCondition);
//# sourceMappingURL=union-disable-alert-condition.js.map
