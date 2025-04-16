"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      n = arguments.length,
      r =
        n < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, s);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (o = t[a]) && (r = (n < 3 ? o(r) : 3 < n ? o(e, i, r) : o(e, i)) || r);
    return 3 < n && r && Object.defineProperty(e, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterBehaviorComponent = void 0);
const UE = require("ue"),
  MonsterBattleConfById_1 = require("../../../../../../Core/Define/ConfigQuery/MonsterBattleConfById"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  SkeletalMeshEffectContext_1 = require("../../../../../Effect/EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  CharacterUnifiedStateTypes_1 = require("../../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  MONSTER_ENTER_WUYINQU_EFFCT =
    "/Game/Aki/Effect/DataAsset/Niagara/Common/Wuyinqu/DA_Fx_Wuyinqu_Ordinary_Origin.DA_Fx_Wuyinqu_Ordinary_Origin",
  ELITE_MONSTER_ENTER_WUYINQU_EFFCT =
    "/Game/Aki/Effect/DataAsset/Niagara/Common/Wuyinqu/DA_Fx_Wuyinqu_Elite_Origin.DA_Fx_Wuyinqu_Elite_Origin";
let MonsterBehaviorComponent = class MonsterBehaviorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.Xte = void 0),
      (this.N1t = void 0),
      (this.S7a = void 0),
      (this.Rne = 0),
      (this.y7a = 0),
      (this.tVr = void 0),
      (this.Llt = !0),
      (this.K1_ = !1),
      (this.Kqr = (t, e) => {
        var i;
        e !== CharacterUnifiedStateTypes_1.ECharPositionState.Water ||
          this.Xte.HasTag(-1714966381) ||
          ((e = this.Hte.ActorLocationProxy),
          ((i = Protocol_1.Aki.Protocol.Ve_.create()).l8n = e),
          CombatMessage_1.CombatNet.Send(18912, this.Entity, i));
      }),
      (this.qtn = () => {
        ModelManager_1.ModelManager.GameModeModel.IsMulti ||
          this.tVr.SetEnableMovementSync(
            !1,
            "MonsterBehaviorComponent LeaveFight",
          );
      }),
      (this.Ntn = (t, e) => {
        !e ||
          ModelManager_1.ModelManager.GameModeModel.IsMulti ||
          this.tVr.SetEnableMovementSync(
            !0,
            "MonsterBehaviorComponent InFight",
          );
      }),
      (this.E7a = (t, e) => {
        if (e) {
          var i,
            s,
            e = this.Entity?.GetComponent(3)?.SkeletalMesh;
          e &&
            (((i = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
              this.Entity.Id,
            )).SkeletalMeshComp = e),
            (s = this.Llt
              ? MONSTER_ENTER_WUYINQU_EFFCT
              : ELITE_MONSTER_ENTER_WUYINQU_EFFCT),
            (this.y7a = EffectSystem_1.EffectSystem.SpawnEffect(
              GlobalData_1.GlobalData.World,
              e.D_GetSocketTransform(new UE.FName("Root")),
              s,
              "MonsterBehaviorComponent.DisableTag exist",
              i,
            ))),
            (this.Rne = this.Entity.Disable(
              "MonsterBehaviorComponent.DisableTag exist",
            ));
        } else if (
          (0 !== this.y7a &&
            (EffectSystem_1.EffectSystem.StopEffectById(
              this.y7a,
              "MonsterBehaviorComponent.DisableTag do not exist",
              !1,
            ),
            (this.y7a = 0)),
          this.Entity.Enable(
            this.Rne,
            "MonsterBehaviorComponent.DisableTag do not exist",
          ),
          !this.Llt)
        ) {
          const o = this.Hte?.Actor?.GetComponentByClass(
            UE.SkeletalMeshComponent.StaticClass(),
          );
          o &&
            (o.SetVisibility(!1),
            TimerSystem_1.TimerSystem.Delay(() => {
              o.SetVisibility(!0);
            }, 100));
        }
      });
  }
  OnStart() {
    (this.Hte = this.Entity.CheckGetComponent(3)),
      (this.Xte = this.Entity.CheckGetComponent(203)),
      (this.tVr = this.Entity.CheckGetComponent(67)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.Kqr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiTaskWanderForResetEnd,
        this.qtn,
      ),
      (this.N1t = this.Xte.ListenForTagAddOrRemove(1996802261, this.Ntn)),
      (this.S7a = this.Xte.ListenForTagAddOrRemove(1681491134, this.E7a));
    var t = this.Entity?.GetComponent(0),
      t =
        ((this.Llt = 0 === t?.GetBaseInfo()?.Category?.MonsterMatchType),
        t?.GetMonsterComponent()?.FightConfigId);
    return (
      t &&
        (t =
          MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(t)) &&
        t.FixedLocation &&
        ((this.K1_ = !0), (this.Hte.NeedFixBornLocation = !1)),
      !0
    );
  }
  OnActivate() {
    var t = !!this.Entity.GetComponent(219);
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      t ||
      this.tVr?.SetEnableMovementSync(
        !1,
        "MonsterBehaviorComponent OnActivate",
      ),
      this.K1_ &&
        (MathUtils_1.MathUtils.CommonTempVector.DeepCopy(
          this.Hte.CreatureData.GetInitLocation(),
        ),
        this.Hte.Actor.KuroSetMovementMode({
          Mode: 5,
          Context: "怪物固定位置",
        }),
        this.Hte.SetActorLocation(
          MathUtils_1.MathUtils.CommonTempVector.ToUeVector(),
          "怪物固定位置",
          !1,
        ),
        this.Entity.GetComponent(111)?.Disable("怪物固定位置"));
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.Kqr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiTaskWanderForResetEnd,
        this.qtn,
      ),
      this.N1t && this.N1t.EndTask(),
      (this.N1t = void 0),
      this.S7a && (this.S7a.EndTask(), (this.S7a = void 0)),
      0 !== this.y7a &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.y7a,
          "MonsterBehaviorComponent.OnEnd",
          !0,
        ),
        (this.y7a = 0)),
      !0
    );
  }
};
(MonsterBehaviorComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(87)],
  MonsterBehaviorComponent,
)),
  (exports.MonsterBehaviorComponent = MonsterBehaviorComponent);
//# sourceMappingURL=MonsterBehaviorComponent.js.map
