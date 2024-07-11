"use strict";
let SceneItemDamageComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    let o;
    const s = arguments.length;
    let r =
      s < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(e, t, i, n);
    else
      for (let h = e.length - 1; h >= 0; h--)
        (o = e[h]) && (r = (s < 3 ? o(r) : s > 3 ? o(t, i, r) : o(t, i)) || r);
    return s > 3 && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemDamageComponent = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneTeamController_1 = require("../../Module/SceneTeam/SceneTeamController");
let SceneItemDamageComponent =
  (SceneItemDamageComponent_1 = class SceneItemDamageComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Snn = void 0),
        (this.C1n = void 0),
        (this.dCn = -0),
        (this.CCn = -0),
        (this.gCn = void 0),
        (this.Bht = void 0),
        (this.Lo = void 0),
        (this.nXt = void 0),
        (this.fCn = void 0),
        (this.gIe = () => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("SceneItem", 32, "[可破坏物] 改变状态", [
              "State",
              this.Snn.GetTagNames(),
            ]);
        });
    }
    OnInitData(e) {
      var e = e.GetParam(SceneItemDamageComponent_1)[0];
      var e =
        ((this.Lo = e),
        (this.nXt = this.Entity.GetComponent(1)),
        (this.fCn = Vector_1.Vector.Create(
          this.Lo.HitPoint.X || 0,
          this.Lo.HitPoint.Y || 0,
          this.Lo.HitPoint.Z || 0,
        )),
        this.Entity.GetComponent(0));
      const t = this.Lo.Durability;
      return (
        (this.dCn = t || 100),
        (this.CCn = e.GetDurabilityValue()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Entity",
            18,
            "初始化破坏组件完成",
            ["最大耐久度", this.dCn],
            ["当前耐久度", this.CCn],
            ["PbDataId", e.GetPbDataId()],
          ),
        !0
      );
    }
    OnStart() {
      return (
        (this.Snn = this.Entity.GetComponent(177)),
        (this.C1n = this.Entity.GetComponent(138)),
        this.C1n.RegisterComponent(this, this.Lo),
        (this.gCn = (e) => {
          this.M1n(e);
        }),
        EventSystem_1.EventSystem.AddWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          this.gCn,
        ),
        (this.Bht = (e) => {
          this.CCn !== e && (this.CCn = e);
        }),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemDurabilityChange,
          this.Bht,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnGameplayTagChanged,
          this.gIe,
        ),
        !0
      );
    }
    OnEnd() {
      return (
        void 0 !== this.gCn &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.gCn,
          ),
          (this.gCn = void 0)),
        void 0 !== this.Bht &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemDurabilityChange,
            this.Bht,
          ),
          (this.Bht = void 0)),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnGameplayTagChanged,
          this.gIe,
        ),
        !0
      );
    }
    M1n(e) {
      if (this.Lo.MatchRoleOption && this.Lo.MatchRoleOption.length > 0) {
        if (
          !SceneTeamController_1.SceneTeamController.IsMatchRoleOption(
            this.Lo.MatchRoleOption,
          )
        )
          return;
      } else if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam)
        return;
      let t = e.Attacker.GetComponent(3);
      !t?.Valid ||
        (!t.IsRoleAndCtrlByMe && !t.IsSummonsAndCtrlByMe) ||
        this.CCn <= 0 ||
        (e.ReBulletData.Base.DamageId &&
          this.CCn > 0 &&
          ((t =
            this.Entity.GetComponent(0).GetBaseInfo()?.Category
              ?.ControlMatchType) &&
            t === "关卡.Common.被控物.爆裂鸣晶" &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              32,
              "[爆裂鸣晶] ThrowDamageChangeRequest",
              ["Entity.Valid", this.Entity.Valid],
            ),
          LevelGamePlayController_1.LevelGamePlayController.ThrowDamageChangeRequest(
            this.Entity.Id,
            e.ReBulletData.Base.DamageId,
          )));
    }
    GetHitPoint() {
      const e = Vector_1.Vector.Create(this.fCn);
      const t = Vector_1.Vector.Create();
      const i = Vector_1.Vector.Create();
      return (
        this.nXt.ActorForwardProxy.Multiply(e.X, i),
        t.AdditionEqual(i),
        this.nXt.ActorRightProxy.Multiply(e.Y, i),
        t.AdditionEqual(i),
        this.nXt.ActorUpProxy.Multiply(e.Z, i),
        t.AdditionEqual(i),
        this.nXt.ActorLocationProxy.Addition(t, t),
        t
      );
    }
    GetMaxDurablePoint() {
      return this.dCn;
    }
  });
(SceneItemDamageComponent = SceneItemDamageComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(132)],
    SceneItemDamageComponent,
  )),
  (exports.SceneItemDamageComponent = SceneItemDamageComponent);
// # sourceMappingURL=SceneItemDamageComponent.js.map
