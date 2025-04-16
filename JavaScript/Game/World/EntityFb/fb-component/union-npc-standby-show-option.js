"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionNpcStandbyShowOption =
    exports.unionToUnionNpcStandbyShowOption =
    exports.UnionNpcStandbyShowOption =
      void 0);
const npc_standby_show_finitely_js_1 = require("../fb-component/npc-standby-show-finitely.js"),
  npc_standby_show_looply_js_1 = require("../fb-component/npc-standby-show-looply.js"),
  npc_standby_sit_js_1 = require("../fb-component/npc-standby-sit.js");
var UnionNpcStandbyShowOption;
function unionToUnionNpcStandbyShowOption(n, t) {
  switch (UnionNpcStandbyShowOption[n]) {
    case "NONE":
      return;
    case "NpcStandbyShowFinitely":
      return t(new npc_standby_show_finitely_js_1.NpcStandbyShowFinitely());
    case "NpcStandbyShowLooply":
      return t(new npc_standby_show_looply_js_1.NpcStandbyShowLooply());
    case "NpcStandbySit":
      return t(new npc_standby_sit_js_1.NpcStandbySit());
    default:
      return;
  }
}
function unionListToUnionNpcStandbyShowOption(n, t, o) {
  switch (UnionNpcStandbyShowOption[n]) {
    case "NONE":
      return;
    case "NpcStandbyShowFinitely":
      return t(o, new npc_standby_show_finitely_js_1.NpcStandbyShowFinitely());
    case "NpcStandbyShowLooply":
      return t(o, new npc_standby_show_looply_js_1.NpcStandbyShowLooply());
    case "NpcStandbySit":
      return t(o, new npc_standby_sit_js_1.NpcStandbySit());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.NpcStandbyShowFinitely = 1)] = "NpcStandbyShowFinitely"),
    (n[(n.NpcStandbyShowLooply = 2)] = "NpcStandbyShowLooply"),
    (n[(n.NpcStandbySit = 3)] = "NpcStandbySit");
})(
  (UnionNpcStandbyShowOption =
    exports.UnionNpcStandbyShowOption ||
    (exports.UnionNpcStandbyShowOption = {})),
),
  (exports.unionToUnionNpcStandbyShowOption = unionToUnionNpcStandbyShowOption),
  (exports.unionListToUnionNpcStandbyShowOption =
    unionListToUnionNpcStandbyShowOption);
//# sourceMappingURL=union-npc-standby-show-option.js.map
