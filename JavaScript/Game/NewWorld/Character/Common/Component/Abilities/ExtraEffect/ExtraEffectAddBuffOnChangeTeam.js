"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BindBuffToTeam = exports.AddBuffOnChangeTeam = void 0);
const RegisterComponent_1 = require("../../../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
class AddBuffOnChangeTeam extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.jQo = []),
      (this.WQo = void 0),
      (this.yvi = () => {
        const i = this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
        var t;
        i?.IsValid() &&
          ((t =
            ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()).forEach(
            (t) => {
              if (!this.WQo.includes(t.Id)) {
                var e = t.Entity.GetComponent(172);
                for (const s of this.jQo)
                  e?.AddIterativeBuff(
                    s,
                    i,
                    void 0,
                    !1,
                    `新入队角色加Buff（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
                  );
              }
            },
          ),
          (this.WQo = t.map((t) => t.Id)));
      });
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    (this.jQo = t[0].split("#").map((t) => Number(t))),
      (this.WQo =
        ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities().map(
          (t) => t.Id,
        ));
  }
  OnCreated() {
    this.OwnerBuffComponent.HasBuffAuthority() &&
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.yvi,
      );
  }
  OnRemoved() {
    this.OwnerBuffComponent?.HasBuffAuthority() &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.yvi,
      );
  }
  OnExecute() {}
}
exports.AddBuffOnChangeTeam = AddBuffOnChangeTeam;
class BindBuffToTeam extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.jQo = []),
      (this.WQo = []),
      (this.aFl = "BindBuffToTeam"),
      (this.qie = "BindBuffToTeam"),
      (this.yvi = () => {
        if (this.PendingBuff) {
          var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities();
          for (const i of t) {
            var e = i.Entity?.GetComponent(207);
            if (e && !this.WQo.includes(i.Id))
              for (const n of this.jQo)
                e.AddIterativeBuff(n, this.PendingBuff, void 0, !1, this.aFl);
          }
          for (const f of this.WQo) {
            var s =
              ModelManager_1.ModelManager.CharacterModel?.GetHandle(
                f,
              )?.Entity?.GetComponent(207);
            if (s && !t.some((t) => t.Id === f))
              for (const o of this.jQo)
                s.RemoveBuff(o, -1, this.qie, this.PendingBuff.MessageId);
          }
          this.WQo = t.map((t) => t.Id);
        }
      });
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    this.jQo = t[0].split("#").map((t) => Number(t));
  }
  OnCreated() {
    (0, RegisterComponent_1.isComponentInstance)(this.OwnerBuffComponent, 197)
      ? this.OwnerBuffComponent.HasBuffAuthority() &&
        (EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnUpdateSceneTeam,
          this.yvi,
        ),
        (this.aFl = `额外效果为进入小队角色附加buff（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`),
        (this.qie = `额外效果为退出小队角色移除buff（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`),
        (this.WQo = []),
        this.yvi())
      : CombatLog_1.CombatLog.Error(
          "Buff",
          this.ExactOwnerEntity,
          "小队附加buff的额外效果只能附加在玩家编队实体上",
          ["buffId", this.BuffId],
          ["handle", this.ActiveHandleId],
        );
  }
  OnRemoved() {
    if (this.OwnerBuffComponent?.HasBuffAuthority()) {
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.yvi,
      );
      for (const e of this.WQo) {
        var t =
          ModelManager_1.ModelManager.CharacterModel?.GetHandle(
            e,
          )?.Entity?.GetComponent(207);
        if (t)
          for (const s of this.jQo)
            t.RemoveBuff(s, -1, this.qie, this.PendingBuff?.MessageId);
      }
      this.WQo = [];
    }
  }
  OnExecute() {}
  GetDebugEffectString() {
    return "为小队绑定buff" + this.jQo.join("、");
  }
}
exports.BindBuffToTeam = BindBuffToTeam;
//# sourceMappingURL=ExtraEffectAddBuffOnChangeTeam.js.map
