"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AimHandle = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
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
  LockOnController_1 = require("../../LockOn/LockOnController"),
  ArmUnit_1 = require("../HudUnit/ArmUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  MAX_AIM_DISTANCE = 5e3,
  aimTagId = -1058855731,
  jmxjTagId = -41569768,
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
      (this.VWl = 0),
      (this.jWl = 0),
      (this.HWl = void 0),
      (this.fHe = () => {
        this.uoi();
      }),
      (this.coi = () => {
        this.moi(), this.doi();
      }),
      (this.HRn = (t, e) => {
        (this.VRn = t && e), this.uoi();
      }),
      (this.WWl = (t, e, i, s) => {
        try {
          if (
            !(i < this.VWl) &&
            !(i === this.VWl && s < this.jWl) &&
            ((this.VWl = i), (this.jWl = s), this.noi) &&
            this.noi.GetTargetVisible() &&
            this.noi.GetActive()
          ) {
            if (t) {
              var r = e.HitResult;
              if (r) {
                var o = r.Actors,
                  h = o.Num();
                if (!(h <= 0)) {
                  var n = r.Components;
                  for (let e = 0; e < h; e++) {
                    var a = o.Get(e);
                    if (!a?.IsValid()) return void this.noi.SetAimStatus(1);
                    let t = ActorUtils_1.ActorUtils.GetEntityByActor(a, !1);
                    if (
                      !(t =
                        t ||
                        ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
                          a,
                          !0,
                        ))
                    )
                      return void this.noi.SetAimStatus(1);
                    var _,
                      l = t.Entity.GetComponent(0),
                      v = l?.GetEntityType();
                    if (v === Protocol_1.Aki.Protocol.kks.Proto_Npc)
                      return void this.noi.SetAimStatus(1);
                    if (v === Protocol_1.Aki.Protocol.kks.Proto_SceneItem)
                      return void (void 0 === t.Entity.GetComponent(152) ||
                      7 !== l.GetBaseInfo().Camp
                        ? this.noi.SetAimStatus(1)
                        : this.noi.SetAimStatus(2));
                    if (v === Protocol_1.Aki.Protocol.kks.Proto_Animal)
                      return void ((_ = t.Entity.GetComponent(2)) &&
                      LockOnController_1.LockOnController.CheckFriendCamp(
                        _.Actor.Camp,
                      )
                        ? this.noi.SetAimStatus(1)
                        : this.noi.SetAimStatus(2));
                    if (v !== Protocol_1.Aki.Protocol.kks.Proto_Monster)
                      return void this.noi.SetAimStatus(1);
                    var m = n.Get(e);
                    if (m?.IsValid()) {
                      var d,
                        c = m.GetName();
                      if ("CollisionCylinder" !== c)
                        return (d = t.Entity.GetComponent(2)) &&
                          LockOnController_1.LockOnController.CheckFriendCamp(
                            d.Actor.Camp,
                          )
                          ? void this.noi.SetAimStatus(1)
                          : t.Entity.GetComponent(68)?.IsWeakness(c)
                            ? void this.noi.SetAimStatus(3)
                            : void this.noi.SetAimStatus(2);
                    }
                  }
                }
              }
            }
            this.noi.SetAimStatus(1);
          }
        } catch (t) {
          t instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Role",
                20,
                "AimTraceHitResultHandle异常",
                t,
                ["error", t.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Role", 20, "AimTraceHitResultHandle异常", [
                "error",
                t,
              ]);
        }
      });
  }
  OnInitialize() {
    super.OnInitialize(),
      this.uoi(),
      (this.HWl = (0, puerts_1.toManualReleaseDelegate)(this.WWl));
  }
  OnDestroyed() {
    super.OnDestroyed(),
      (0, puerts_1.releaseManualReleaseDelegate)(this.WWl),
      this.hoi?.Dispose(),
      (this.hoi = void 0);
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
    AimHandle.Ult.Start(), this.doi(), AimHandle.Ult.Stop();
  }
  OnShowHud() {
    super.OnShowHud(), this.moi(), this.doi();
  }
  moi() {
    if (this.noi && this.loi) {
      var i,
        s = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (s?.Valid) {
        let t = !1,
          e = !0;
        this.VRn
          ? (t = !0)
          : ((i = s.Entity.GetComponent(173)),
            (s = s.Entity.GetComponent(203)),
            (i = i.DirectionState),
            !(t =
              i ===
              CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) &&
              this._oi &&
              (t = s.HasTag(aimTagId)),
            s.HasTag(jmxjTagId) && (e = !1)),
          this.noi.SetArrowLineVisible(e),
          this.noi.SetTargetVisible(t, !1);
      } else this.noi.SetTargetVisible(!1, !0);
    }
  }
  doi() {
    this.noi &&
      this.noi.GetTargetVisible() &&
      this.noi.GetActive() &&
      this.Coi();
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
        (e.FromUeVector(t.D_GetCameraLocation()),
        i.FromUeVector(t.GetActorForwardVector()),
        i.MultiplyEqual(MAX_AIM_DISTANCE),
        i.AdditionEqual(e),
        (this.hoi =
          this.hoi ??
          ModelManager_1.ModelManager.BulletModel.NewTraceElement(
            UE.TraceLineElement,
            ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim,
          )),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.hoi, e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.hoi, i),
        TraceElementCommon_1.TraceElementCommon.AsyncLineTrace(
          this.hoi,
          PROFILE_AIM_TRACE,
          this.HWl,
        ));
    (this.VWl = t.Frame), (this.jWl = t.Index);
  }
}
(exports.AimHandle = AimHandle).Ult = Stats_1.Stat.Create(
  "[BattleView]AimHandleTick",
);
//# sourceMappingURL=AimHandle.js.map
