"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeneralLogicTreeConfigUtil = void 0);
const puerts_1 = require("puerts");
const ue_1 = require("ue");
const IQuest_1 = require("../../../UniverseEditor/Interface/IQuest");
const configNodesFilter = {
  Action: !0,
  ChildQuest: !0,
  QuestFailed: !0,
  ParallelSelect: !0,
  Start: !1,
  QuestSucceed: !0,
  AlwaysTrue: !1,
  AlwaysFalse: !1,
  Sequence: !0,
  Select: !1,
  Condition: !1,
  ConditionSelector: !0,
  Repeater: !1,
};
class GeneralLogicTreeConfigUtil {
  static InitConfig(e, t) {
    const r = ue_1.KuroStaticLibrary.GetFilesRecursive(e, "*.json", !0, !1);
    for (let e = 0; e < r.Num(); e++) {
      var i;
      var o;
      const s = r.Get(e);
      ue_1.BlueprintPathsLibrary.FileExists(s) &&
        ((o = ((i = ""), puerts_1.$ref)("")),
        ue_1.KuroStaticLibrary.LoadFileToString(o, s),
        (i = (0, puerts_1.$unref)(o))) &&
        t(i);
    }
  }
  static InitBehaviorNodeConfig(e, t, r) {
    let i = e.get(t);
    i || ((i = new Map()), e.set(t, i));
    e = (0, IQuest_1.flatBehaviorTree)(r);
    if (e) {
      i.clear();
      for (const [o, s] of e) configNodesFilter[s.Type] && i.set(o, s);
    }
  }
}
exports.GeneralLogicTreeConfigUtil = GeneralLogicTreeConfigUtil;
// # sourceMappingURL=GeneralLogicTreeConfigUtil.js.map
