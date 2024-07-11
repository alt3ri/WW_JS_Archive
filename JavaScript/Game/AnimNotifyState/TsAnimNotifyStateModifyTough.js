"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  ToughCalcRatioById_1 = require("../../Core/Define/ConfigQuery/ToughCalcRatioById"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  CombatMessage_1 = require("../Module/CombatMessage/CombatMessage");
class TsAnimNotifyStateModifyTough extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.ToughModifierId = "");
  }
  K2_NotifyBegin(e, o, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      let t = void 0;
      try {
        t = BigInt(this.ToughModifierId);
      } catch (e) {
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "在修改被削韧倍率中配置了不合法的id",
              ["id", t],
              ["animationName", o?.GetName()],
            ),
          !0
        );
      }
      var e = e.CharacterActorComponent?.Entity,
        a = e?.CheckGetComponent(18),
        i = ToughCalcRatioById_1.configToughCalcRatioById.GetConfig(t);
      void 0 === i
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            20,
            "韧性系数计算表对应id非法",
            ["id", t],
            ["animationName", o?.GetName()],
          )
        : a?.Valid &&
          (a.AddToughModifier("ToughRate", i.RatioNormal),
          a.AddToughModifier("ToughRateOnCounter", i.RatioSpecial),
          a.ActorComponent.IsAutonomousProxy) &&
          CombatMessage_1.CombatNet.Call(
            13180,
            e,
            Protocol_1.Aki.Protocol.dNn.create({
              Ekn: MathUtils_1.MathUtils.BigIntToLong(t),
              Skn: r,
            }),
          );
    }
    return !0;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      let e = void 0;
      try {
        e = BigInt(this.ToughModifierId);
      } catch (e) {
        return !0;
      }
      var t = t.CharacterActorComponent?.Entity?.CheckGetComponent(18),
        o = ToughCalcRatioById_1.configToughCalcRatioById.GetConfig(e);
      void 0 === o
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 20, "韧性系数计算表对应id非法", [
            "id",
            e,
          ])
        : t?.Valid &&
          (t.RemoveToughModifier("ToughRate", o.RatioNormal),
          t.RemoveToughModifier("ToughRateOnCounter", o.RatioSpecial));
    }
    return !0;
  }
  GetNotifyName() {
    return "修改被削韧倍率";
  }
}
exports.default = TsAnimNotifyStateModifyTough;
//# sourceMappingURL=TsAnimNotifyStateModifyTough.js.map
