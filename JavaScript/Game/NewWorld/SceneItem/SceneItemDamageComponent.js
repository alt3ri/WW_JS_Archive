"use strict";
var SceneItemDamageComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, n) {
      var o,
        s = arguments.length,
        r =
          s < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(e, t, i, n);
      else
        for (var h = e.length - 1; 0 <= h; h--)
          (o = e[h]) &&
            (r = (s < 3 ? o(r) : 3 < s ? o(t, i, r) : o(t, i)) || r);
      return 3 < s && r && Object.defineProperty(t, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemDamageComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneTeamController_1 = require("../../Module/SceneTeam/SceneTeamController"),
  SceneItemHitUtils_1 = require("./Util/SceneItemHitUtils");
let SceneItemDamageComponent =
  (SceneItemDamageComponent_1 = class SceneItemDamageComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.inn = void 0),
        (this.Xln = void 0),
        (this.Qdn = -0),
        (this.Xdn = -0),
        (this.$dn = void 0),
        (this.Qlt = void 0),
        (this.Lo = void 0),
        (this.n$t = void 0),
        (this.Ydn = void 0),
        (this.gIe = () => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("SceneItem", 32, "[可破坏物] 改变状态", [
              "State",
              this.inn.GetTagNames(),
            ]);
        });
    }
    OnInitData(e) {
      var e = e.GetParam(SceneItemDamageComponent_1)[0],
        e =
          ((this.Lo = e),
          (this.n$t = this.Entity.GetComponent(1)),
          (this.Ydn = Vector_1.Vector.Create(
            this.Lo.HitPoint.X || 0,
            this.Lo.HitPoint.Y || 0,
            this.Lo.HitPoint.Z || 0,
          )),
          this.Entity.GetComponent(0)),
        t = this.Lo.Durability;
      return (
        (this.Qdn = t || 100),
        (this.Xdn = e.GetDurabilityValue()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Entity",
            18,
            "初始化破坏组件完成",
            ["最大耐久度", this.Qdn],
            ["当前耐久度", this.Xdn],
            ["PbDataId", e.GetPbDataId()],
          ),
        !0
      );
    }
    OnStart() {
      return (
        (this.inn = this.Entity.GetComponent(180)),
        (this.Xln = this.Entity.GetComponent(140)),
        this.Xln.RegisterComponent(this, this.Lo),
        (this.$dn = (e) => {
          this.Zln(e);
        }),
        EventSystem_1.EventSystem.AddWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          this.$dn,
        ),
        (this.Qlt = (e) => {
          this.Xdn !== e && (this.Xdn = e);
        }),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemDurabilityChange,
          this.Qlt,
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
        void 0 !== this.$dn &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.$dn,
          ),
          (this.$dn = void 0)),
        void 0 !== this.Qlt &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemDurabilityChange,
            this.Qlt,
          ),
          (this.Qlt = void 0)),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnGameplayTagChanged,
          this.gIe,
        ),
        !0
      );
    }
    Zln(e) {
      if (this.Lo.MatchRoleOption && 0 < this.Lo.MatchRoleOption.length) {
        if (
          !SceneTeamController_1.SceneTeamController.IsMatchRoleOption(
            this.Lo.MatchRoleOption,
          )
        )
          return;
      } else if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam)
        return;
      var t = e.Attacker.GetComponent(3),
        i = SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchPlayerAttack(
          { Type: IComponent_1.EHitBulletType.PlayerAttack },
          e,
          this.Entity,
        );
      t?.Valid &&
        i &&
        (this.Xdn <= 0 ||
          (e.ReBulletData.Base.DamageId &&
            0 < this.Xdn &&
            ((t =
              this.Entity.GetComponent(0).GetBaseInfo()?.Category
                ?.ControlMatchType) &&
              "关卡.Common.被控物.爆裂鸣晶" === t &&
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
            ))));
    }
    GetHitPoint() {
      var e = Vector_1.Vector.Create(this.Ydn),
        t = Vector_1.Vector.Create(),
        i = Vector_1.Vector.Create();
      return (
        this.n$t.ActorForwardProxy.Multiply(e.X, i),
        t.AdditionEqual(i),
        this.n$t.ActorRightProxy.Multiply(e.Y, i),
        t.AdditionEqual(i),
        this.n$t.ActorUpProxy.Multiply(e.Z, i),
        t.AdditionEqual(i),
        this.n$t.ActorLocationProxy.Addition(t, t),
        t
      );
    }
    GetMaxDurablePoint() {
      return this.Qdn;
    }
  });
(SceneItemDamageComponent = SceneItemDamageComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(134)],
    SceneItemDamageComponent,
  )),
  (exports.SceneItemDamageComponent = SceneItemDamageComponent);
//# sourceMappingURL=SceneItemDamageComponent.js.map
