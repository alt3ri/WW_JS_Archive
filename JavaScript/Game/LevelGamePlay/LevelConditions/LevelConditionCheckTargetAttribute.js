"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckTargetAttribute = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ICondition_1 = require("../../../UniverseEditor/Interface/ICondition"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTargetAttribute extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    e = e.Option;
    return e.Type === ICondition_1.ETargetType.Player && this.iLe(e);
  }
  iLe(e) {
    return (
      e.Option === ICondition_1.EPlayerCheckType.AnyRole &&
      this.oLe(
        ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(),
        e.AttributeTypes,
      )
    );
  }
  oLe(e, r) {
    let t = !1;
    for (const o of e) {
      let e = !0;
      for (const n of r)
        if (
          (n.Type === ICondition_1.EPlayerAttributeType.Health &&
            (e &&= this.rLe(o, n)),
          !e)
        )
          break;
      if ((t ||= e)) return !0;
    }
    return t;
  }
  rLe(e, r) {
    e = e.Entity?.GetComponent(158);
    if (!e) return !1;
    var t =
      (e.GetCurrentValue(Protocol_1.Aki.Protocol.Bks.Proto_Life) /
        e.GetCurrentValue(Protocol_1.Aki.Protocol.Bks.e5n)) *
      100;
    switch (r.Compare) {
      case "Eq":
        return t === r.Value;
      case "Ne":
        return t !== r.Value;
      case "Ge":
        return t >= r.Value;
      case "Gt":
        return t > r.Value;
      case "Le":
        return t <= r.Value;
      case "Lt":
        return t < r.Value;
      default:
        return !1;
    }
  }
}
exports.LevelConditionCheckTargetAttribute = LevelConditionCheckTargetAttribute;
//# sourceMappingURL=LevelConditionCheckTargetAttribute.js.map
