"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharBodyEffect = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharBodyEffect extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.Entity = void 0),
      (this.vJ = void 0),
      (this.CastShadow = !0),
      (this.Visible = !0),
      (this.Opacity = 1),
      (this.PendingCastShadow = !0),
      (this.PendingVisible = !0),
      (this.PendingOpacity = 1),
      (this.EffectHandles = []),
      (this.NeedUpdate = !1),
      (this.gfn = (t) => {
        var e = this.EffectHandles.indexOf(t);
        e < 0 ||
          (this.EffectHandles.splice(e, 1),
          EffectSystem_1.EffectSystem.RemoveFinishCallback(t, this.gfn));
      }),
      (this.OnSetActorVisible = (t, e) => {
        (this.Entity && t !== this.Entity.Id) ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Render",
              25,
              "BodyEffect OnSetActorVisible",
              ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()],
              ["Entity", this.Entity],
              ["visible", e],
            ),
          this.ehr(e));
      }),
      (this.yvi = () => {
        for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
          if (t.IsControl() && t.EntityHandle?.Entity === this.Entity)
            return (
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Render",
                  25,
                  "BodyEffect OnChangeTeam",
                  ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()],
                  ["Entity", this.Entity],
                  ["visible", !0],
                ),
              void this.ehr(!0)
            );
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Render",
            25,
            "BodyEffect OnChangeTeam",
            ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()],
            ["Entity", this.Entity],
            ["visible", !1],
          ),
          this.ehr(!1);
      }),
      (this.xie = (t, e) => {
        t.Entity === this.Entity &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Render",
              25,
              "BodyEffect OnChangeRole",
              ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()],
              ["Entity", this.Entity],
              ["visible", !0],
            ),
          this.ehr(!0));
      }),
      (this.M9s = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Render",
            25,
            "BodyEffect OnGoDownFinish",
            ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()],
            ["Entity", this.Entity],
            ["visible", !1],
          ),
          this.ehr(!1);
      });
  }
  GetStatName() {
    return "CharBodyEffect";
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdBodyEffect;
  }
  Awake(t) {
    super.Awake(t);
  }
  RegisterEffect(t) {
    0 <= this.EffectHandles.indexOf(t)
      ? EffectSystem_1.EffectSystem.UpdateBodyEffect(
          t,
          this.Opacity,
          this.Visible,
          this.CastShadow,
        )
      : (this.EffectHandles.push(t),
        (1 === this.Opacity && this.Visible && this.CastShadow) ||
          EffectSystem_1.EffectSystem.UpdateBodyEffect(
            t,
            this.Opacity,
            this.Visible,
            this.CastShadow,
          ),
        EffectSystem_1.EffectSystem.AddFinishCallback(t, this.gfn));
  }
  UnregisterEffect(t) {
    var e = this.EffectHandles.indexOf(t);
    e < 0 ||
      (EffectSystem_1.EffectSystem.UpdateBodyEffect(t, 1, !0, !0),
      this.EffectHandles.splice(e, 1),
      EffectSystem_1.EffectSystem.RemoveFinishCallback(t, this.gfn));
  }
  Start() {
    this.Opacity = 1;
    var t = this.GetRenderingComponent().GetOwner();
    t instanceof TsBaseCharacter_1.default &&
      t.CharacterActorComponent?.Entity &&
      ((this.Entity = t.CharacterActorComponent.Entity),
      (this.vJ = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
        this.Entity.Id,
      )),
      EventSystem_1.EventSystem.AddWithTarget(
        this.vJ,
        EventDefine_1.EEventName.OnSetActorHidden,
        this.OnSetActorVisible,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.yvi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnRoleGoDownFinish,
        this.M9s,
      )),
      this.OnInitSuccess();
  }
  Update() {
    if (this.NeedUpdate) {
      (this.Visible = this.PendingVisible),
        (this.Opacity = this.PendingOpacity),
        (this.CastShadow = this.PendingCastShadow);
      for (const t of this.EffectHandles)
        EffectSystem_1.EffectSystem.UpdateBodyEffect(
          t,
          this.Opacity,
          this.Visible,
          this.CastShadow,
        );
      (this.NeedUpdate = !1),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Render",
            25,
            "BodyEffectUpdate",
            ["Actor", this.GetRenderingComponent()?.GetCachedOwnerName()],
            ["Opacity", this.Opacity],
            ["Visible", this.Visible],
            ["CastShadow", this.CastShadow],
          );
    }
  }
  LateUpdate() {}
  Destroy() {
    this.Entity &&
      (EventSystem_1.EventSystem.RemoveWithTarget(
        this.vJ,
        EventDefine_1.EEventName.OnSetActorHidden,
        this.OnSetActorVisible,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.yvi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnRoleGoDownFinish,
        this.M9s,
      ));
  }
  SetOpacity(t) {
    (!this.NeedUpdate &&
      MathUtils_1.MathUtils.IsNearlyEqual(this.Opacity, t)) ||
      ((this.PendingOpacity = t),
      (this.NeedUpdate = !0),
      TimerSystem_1.TimerSystem.Next(() => {
        this.Update();
      }));
  }
  ehr(t) {
    (!this.NeedUpdate && this.Visible === t) ||
      ((this.PendingVisible = t),
      (this.NeedUpdate = !0),
      TimerSystem_1.TimerSystem.Next(() => {
        this.Update();
      }));
  }
  SetCastShadow(t) {
    (!this.NeedUpdate && this.CastShadow === t) ||
      ((this.PendingCastShadow = t),
      (this.NeedUpdate = !0),
      TimerSystem_1.TimerSystem.Next(() => {
        this.Update();
      }));
  }
}
exports.CharBodyEffect = CharBodyEffect;
//# sourceMappingURL=CharBodyEffect.js.map
