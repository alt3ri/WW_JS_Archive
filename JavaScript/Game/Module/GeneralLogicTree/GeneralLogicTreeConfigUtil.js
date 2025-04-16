"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeneralLogicTreeConfigUtil = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  IQuest_1 = require("../../../UniverseEditor/Interface/IQuest"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  configNodesFilter = {
    Action: !0,
    ChildQuest: !0,
    QuestFailed: !0,
    ParallelSelect: !0,
    Start: !1,
    QuestSucceed: !0,
    AlwaysTrue: !1,
    AlwaysFalse: !0,
    Sequence: !0,
    Select: !1,
    Condition: !1,
    ConditionSelector: !0,
    Repeater: !1,
  };
class GeneralLogicTreeConfigUtil {
  static InitConfig(e, t) {
    var r = ue_1.KuroStaticLibrary.GetFilesRecursive(e, "*.json", !0, !1);
    for (let e = 0; e < r.Num(); e++) {
      var i,
        s,
        a = r.Get(e);
      ue_1.BlueprintPathsLibrary.FileExists(a) &&
        ((s = ((i = ""), puerts_1.$ref)("")),
        ue_1.KuroStaticLibrary.LoadFileToString(s, a),
        (i = (0, puerts_1.$unref)(s))) &&
        t(i);
    }
  }
  static InitBehaviorNodeConfig(e, t, r) {
    let i = e.get(t);
    i || ((i = new Map()), e.set(t, i));
    e = (0, IQuest_1.flatBehaviorTree)(r);
    if (e) {
      i.clear();
      for (var [s, a] of e) configNodesFilter[a.Type] && i.set(s, a);
    }
  }
  static IsAlwaysFalseChildNode(e, t) {
    var r;
    return (
      !!t &&
      !!(r =
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e)) &&
      !!(r = r.GetNodeConfig(t)) &&
      ("AlwaysFalse" === r.Type ||
        this.IsAlwaysFalseChildNode(e, r?.ParentNodeId))
    );
  }
}
exports.GeneralLogicTreeConfigUtil = GeneralLogicTreeConfigUtil;
//# sourceMappingURL=GeneralLogicTreeConfigUtil.js.map
