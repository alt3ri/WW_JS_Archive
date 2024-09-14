"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharBodyEffect = void 0);
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharBodyEffect extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.Entity = void 0),
      (this.vJ = void 0),
      (this.Visible = !1),
      (this.Opacity = 0),
      (this.EffectHandles = []),
      (this.NeedUpdate = !1),
      (this.gfn = (e) => {
        var t,
          s = this.EffectHandles.findIndex((t) => t.Id === e);
        s < 0 ||
          ((t = this.EffectHandles[s]),
          this.EffectHandles.splice(s, 1),
          t.RemoveFinishCallback(this.gfn));
      }),
      (this.OnSetActorVisible = (t, e) => {
        (this.Entity && t !== this.Entity.Id) || this.ehr(e);
      }),
      (this.yvi = () => {
        for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
          if (t.IsControl() && t.EntityHandle?.Entity === this.Entity)
            return void this.ehr(!0);
        this.ehr(!1);
      }),
      (this.xie = (t, e) => {
        t.Entity === this.Entity && this.ehr(!0);
      }),
      (this.M9s = () => {
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
    this.EffectHandles.push(t),
      (1 === this.Opacity && this.Visible) ||
        t.GetEffectSpec()?.UpdateBodyEffect(this.Opacity, this.Visible),
      t.AddFinishCallback(this.gfn);
  }
  UnregisterEffect(t) {
    var e = this.EffectHandles.indexOf(t);
    e < 0 ||
      (this.EffectHandles.splice(e, 1), t.RemoveFinishCallback(this.gfn));
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
      for (const t of this.EffectHandles)
        t.GetEffectSpec()?.UpdateBodyEffect(this.Opacity, this.Visible);
      this.NeedUpdate = !1;
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
    MathUtils_1.MathUtils.IsNearlyEqual(this.Opacity, t) ||
      ((this.Opacity = t), (this.NeedUpdate = !0));
  }
  ehr(t) {
    this.Visible !== t && ((this.Visible = t), (this.NeedUpdate = !0));
  }
}
exports.CharBodyEffect = CharBodyEffect;
//# sourceMappingURL=CharBodyEffect.js.map
