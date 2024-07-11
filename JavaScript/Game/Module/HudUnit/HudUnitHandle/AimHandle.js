"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AimHandle = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  ArmUnit_1 = require("../HudUnit/ArmUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  MAX_AIM_DISTANCE = 5e3,
  aimTagId = -1058855731,
  PROFILE_AIM_TRACE = "ProfileAimTrace";
class AimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.roi = !1),
      (this.noi = void 0),
      (this.soi = Vector_1.Vector.Create()),
      (this.aoi = Vector_1.Vector.Create()),
      (this.hoi = void 0),
      (this.loi = !1),
      (this._oi = !1),
      (this.VRn = !1),
      (this.fHe = () => {
        this.uoi();
      }),
      (this.coi = () => {
        this.moi(), this.doi();
      }),
      (this.HRn = (t) => {
        (this.VRn = t), this.uoi();
      });
  }
  OnInitialize() {
    super.OnInitialize(), this.uoi();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.fHe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAimStateChanged,
        this.coi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiFollowerAimStateChanged,
        this.HRn,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.fHe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAimStateChanged,
        this.coi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiFollowerAimStateChanged,
        this.HRn,
      );
  }
  OnTick(t) {
    this.doi();
  }
  OnShowHud() {
    super.OnShowHud(), this.moi(), this.doi();
  }
  moi() {
    if (this.noi && this.loi) {
      var e,
        i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (i?.Valid) {
        let t = !1;
        this.VRn
          ? (t = !0)
          : ((e = i.Entity.GetComponent(160).DirectionState),
            !(t =
              e ===
              CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) &&
              this._oi &&
              (t = i.Entity.GetComponent(188).HasTag(aimTagId))),
          this.noi.SetTargetVisible(t, !1);
      } else this.noi.SetTargetVisible(!1, !0);
    }
  }
  doi() {
    if (this.noi && this.noi.GetTargetVisible() && this.noi.GetActive()) {
      var t = this.Coi();
      if (t) {
        var i = t.Actors,
          s = i.Num();
        if (!(s <= 0)) {
          var r = t.Components;
          for (let e = 0; e < s; e++) {
            var n = i.Get(e);
            if (!n?.IsValid()) return void this.noi.SetAimStatus(1);
            let t = ActorUtils_1.ActorUtils.GetEntityByActor(n, !1);
            if (
              !(t =
                t ||
                ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
                  n,
                  !0,
                ))
            )
              return void this.noi.SetAimStatus(1);
            var n = t.Entity.GetComponent(0),
              h = n?.GetEntityType();
            if (h === Protocol_1.Aki.Protocol.wks.Proto_Npc)
              return void this.noi.SetAimStatus(1);
            if (h === Protocol_1.Aki.Protocol.wks.Proto_SceneItem)
              return void (void 0 === t.Entity.GetComponent(140) ||
              7 !== n.GetBaseInfo().Camp
                ? this.noi.SetAimStatus(1)
                : this.noi.SetAimStatus(2));
            if (h === Protocol_1.Aki.Protocol.wks.Proto_Animal)
              return void (this.goi(n.GetBaseInfo().Camp)
                ? this.noi.SetAimStatus(1)
                : this.noi.SetAimStatus(2));
            if (h !== Protocol_1.Aki.Protocol.wks.Proto_Monster)
              return void this.noi.SetAimStatus(1);
            h = r.Get(e);
            if (h?.IsValid()) {
              h = h.GetName();
              if ("CollisionCylinder" !== h)
                return this.goi(n.GetBaseInfo().Camp)
                  ? void this.noi.SetAimStatus(1)
                  : t.Entity.GetComponent(60)?.IsWeakness(h)
                    ? void this.noi.SetAimStatus(3)
                    : void this.noi.SetAimStatus(2);
            }
          }
        }
      }
      this.noi.SetAimStatus(1);
    }
  }
  goi(t) {
    return 0 === t || 2 === t || 4 === t;
  }
  uoi() {
    this.loi = !1;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    t?.Valid &&
    (t = t.Entity.GetComponent(0)) &&
    ((t = t.GetRoleConfig()),
    (this._oi = 2 === t.RoleType),
    t.IsAim || this._oi || this.VRn)
      ? ((this.loi = !0), this.foi())
      : this.poi();
  }
  foi() {
    this.noi
      ? (this.moi(), this.doi())
      : this.roi ||
        ((this.roi = !0),
        this.NewHudUnit(ArmUnit_1.AimUnit, "UiItem_Aim")
          .then((t) => {
            (this.noi = t),
              this.loi
                ? (this.moi(), this.doi())
                : this.noi.SetTargetVisible(!1, !0);
          })
          .finally(() => {
            this.roi = !1;
          }));
  }
  poi() {
    this.noi && this.noi.SetTargetVisible(!1, !0);
  }
  Coi() {
    var t = Global_1.Global.CharacterCameraManager,
      e = this.soi,
      i = this.aoi,
      t =
        (e.FromUeVector(t.GetCameraLocation()),
        i.FromUeVector(t.GetActorForwardVector()),
        i.MultiplyEqual(MAX_AIM_DISTANCE),
        i.AdditionEqual(e),
        (this.hoi =
          this.hoi ??
          ModelManager_1.ModelManager.BulletModel.NewTraceElement(
            UE.TraceLineElement.StaticClass(),
            ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim,
          )),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.hoi, e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.hoi, i),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.hoi,
          PROFILE_AIM_TRACE,
        ));
    if (t) return this.hoi.HitResult;
  }
}
(exports.AimHandle = AimHandle).Ult = void 0;
//# sourceMappingURL=AimHandle.js.map
