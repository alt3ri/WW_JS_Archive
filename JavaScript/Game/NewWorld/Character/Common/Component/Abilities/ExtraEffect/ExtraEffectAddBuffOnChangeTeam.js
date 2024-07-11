"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AddBuffOnChangeTeam = void 0);
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
class AddBuffOnChangeTeam extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.jQo = void 0),
      (this.WQo = void 0),
      (this.yvi = () => {
        const n = this.OwnerBuffComponent.GetBuffByHandle(this.ActiveHandleId);
        var e;
        n?.IsValid() &&
          ((e =
            ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities()).forEach(
            (e) => {
              if (!this.WQo.includes(e.Id)) {
                var t = e.Entity.GetComponent(159);
                for (const s of this.jQo)
                  t?.AddIterativeBuff(
                    s,
                    n,
                    void 0,
                    !1,
                    `新入队角色加Buff（前置buff Id=${this.BuffId}, handle=${this.ActiveHandleId}）`,
                  );
              }
            },
          ),
          (this.WQo = e.map((e) => e.Id)));
      });
  }
  InitParameters(e) {
    e = e.ExtraEffectParameters;
    (this.jQo = e[0].split("#").map((e) => BigInt(e))),
      (this.WQo =
        ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities().map(
          (e) => e.Id,
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
//# sourceMappingURL=ExtraEffectAddBuffOnChangeTeam.js.map
