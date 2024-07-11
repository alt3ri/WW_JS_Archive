"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectManagerBusinessProxy = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global");
class EffectManagerBusinessProxy {
  constructor() {
    (this.c1r = void 0),
      (this.m1r = void 0),
      (this.d1r = void 0),
      (this.C1r = 0),
      (this.g1r = (e) => {
        EffectSystem_1.EffectSystem.GetHideOnBurstSkill(e) && this.m1r.add(e);
      }),
      (this.f1r = (e) => {
        this.m1r.delete(e);
      }),
      (this.xie = () => {
        (this.d1r = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()),
          (this.C1r =
            Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() ?? 0);
      }),
      (this.BJe = (e, t, s) => {
        this.d1r &&
          e === this.C1r &&
          (e = this.d1r.GetComponent(33)?.GetSkillInfo(t)) &&
          3 === e.SkillGenre &&
          this.m1r.forEach((e) => {
            EffectSystem_1.EffectSystem.IsValid(e) &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("RenderEffect", 26, "Effect Recycled By Burst", [
                  "path",
                  EffectSystem_1.EffectSystem.GetPath(e),
                ]),
              EffectSystem_1.EffectSystem.StopEffectById(
                e,
                "[EffectManagerBusinessProxy.OnCharUseSkill]",
                !0,
              ));
          });
      });
  }
  static Get() {
    return (
      this.Me || ((this.Me = new EffectManagerBusinessProxy()), this.Me.Init()),
      this.Me
    );
  }
  Init() {
    (this.c1r = void 0),
      (this.m1r = new Set()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BeforePlayEffect,
        this.g1r,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FinishEffect,
        this.f1r,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharUseSkill,
        this.BJe,
      );
  }
}
exports.EffectManagerBusinessProxy = EffectManagerBusinessProxy;
//# sourceMappingURL=EffectManagerBusinessProxy.js.map
