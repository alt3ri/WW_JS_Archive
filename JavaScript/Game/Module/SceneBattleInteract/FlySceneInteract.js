"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlySceneInteract = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../Core/Common/Stats"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneBattleInteractDefine_1 = require("./SceneBattleInteractDefine");
class FlySceneInteract {
  constructor() {
    (this.cRl = !1),
      (this.hJ = 0),
      (this.Lz = Vector_1.Vector.Create()),
      (this.X9e = void 0),
      (this.Hte = void 0),
      (this.ldt = []),
      (this.xie = () => {
        this.m$e(), this.c$e();
      }),
      (this.CRl = (e, t) => {
        this.bl(t);
      }),
      (this.zpe = (e, t) => {
        this.X9e === t && this.m$e();
      }),
      (this.Swr = (e, t) => {
        this.Hte &&
          (t
            ? (this.Lz.FromUeVector(t),
              this.Hte.ActorQuatProxy.RotateVector(this.Lz, e),
              e.AdditionEqual(this.Hte.ActorLocationProxy))
            : e.FromUeVector(this.Hte.ActorLocationProxy));
      });
  }
  Init() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
      this.xie,
    );
    var e = ResourceSystem_1.ResourceSystem.Load(
      SceneBattleInteractDefine_1.FLY_INTERACT_CONFIG_PATH,
      UE.BP_SceneBattleInteract_C,
    );
    e &&
      (e =
        ModelManager_1.ModelManager.SceneBattleInteractModel.CreateSceneBattleInteract(
          e,
        )) &&
      ((this.hJ = e.Id), e.SetUpdateLocationFunc(this.Swr)),
      this.c$e();
  }
  Destroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
      this.xie,
    ),
      this.m$e(),
      ModelManager_1.ModelManager.SceneBattleInteractModel.DestroySceneBattleInteract(
        this.hJ,
      ),
      (this.hJ = 0);
  }
  c$e() {
    var e = ModelManager_1.ModelManager.BattleUiModel?.GetCurRoleData();
    e &&
      ((this.X9e = e.EntityHandle),
      (this.Hte = this.X9e?.Entity?.GetComponent(1)),
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
        this,
        this.X9e,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      (e = e.GameplayTagComponent)) &&
      this.mdt(e, -2027866845, this.CRl, !0);
  }
  m$e() {
    if (this.X9e) {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(
        this,
        this.X9e,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
      for (const e of this.ldt) e.EndTask();
      (this.ldt.length = 0), (this.X9e = void 0), (this.Hte = void 0);
    }
  }
  mdt(e, t, i, s = !1) {
    s && e.HasTag(t) && i(t, !0);
    s = e.ListenForTagAddOrRemove(t, i, FlySceneInteract.SYe);
    s && this.ldt.push(s);
  }
  bl(e) {
    var t;
    this.cRl !== e &&
      ((this.cRl = e), 0 < this.hJ) &&
      (t =
        ModelManager_1.ModelManager.SceneBattleInteractModel.GetSceneBattleInteract(
          this.hJ,
        )) &&
      (t.SetEnable(e), this.Hte) &&
      t.SetDownVector(this.Hte.ActorGravityDirectProxy);
  }
}
(exports.FlySceneInteract = FlySceneInteract).SYe = Stats_1.Stat.Create(
  "[StrengthHandle]ListenTag",
);
//# sourceMappingURL=FlySceneInteract.js.map
