"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShootAimHandle = void 0);
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
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  FollowShootAimUnit_1 = require("../HudUnit/FollowShootAimUnit"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase"),
  MAX_AIM_DISTANCE = 5e3,
  PROFILE_AIM_TRACE = "ProfileAimTrace";
class FollowShootAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.noi = void 0),
      (this.UFa = 0),
      (this.sDe = void 0),
      (this.Xte = void 0),
      (this.ldt = []),
      (this.xFa = !1),
      (this.soi = Vector_1.Vector.Create()),
      (this.aoi = Vector_1.Vector.Create()),
      (this.hoi = void 0),
      (this.zpe = (t, i) => {
        this.sDe === i && this.m$e();
      }),
      (this.tKa = (t, i) => {
        (this.xFa = i), this.HGa();
      }),
      (this.PFa = (t) => {
        if (t) {
          var i =
            ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle();
          if ((this.iKa(i), !this.noi)) return void this.Soi();
        }
        this.noi && this.noi.SetVisible(t);
      }),
      (this.QWl = 0),
      (this.KWl = 0),
      (this.HWl = void 0),
      (this.WWl = (t, i, e, s) => {
        try {
          if (
            !(e < this.QWl) &&
            !(e === this.QWl && s < this.KWl) &&
            this.noi?.GetVisible()
          ) {
            if (t) {
              var o = i.HitResult;
              if (o) {
                var r = o.Actors,
                  h = r.Num();
                if (!(h <= 0))
                  for (let i = 0; i < h; i++) {
                    var n = r.Get(i);
                    if (!n?.IsValid()) return void this.noi.SetIsAimTarget(!1);
                    let t = ActorUtils_1.ActorUtils.GetEntityByActor(n, !1);
                    if (
                      !(t =
                        t ||
                        ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
                          n,
                          !1,
                        ))
                    )
                      return void this.noi.SetIsAimTarget(!1);
                    var a = t.Entity.GetComponent(0),
                      _ = a?.GetEntityType();
                    if (
                      _ !== Protocol_1.Aki.Protocol.kks.Proto_Player &&
                      _ !== Protocol_1.Aki.Protocol.kks.Proto_Npc
                    )
                      return _ ===
                        Protocol_1.Aki.Protocol.kks.Proto_SceneItem &&
                        "PortalCreater" ===
                          a.GetBaseInfo()?.Category.MechanismType &&
                        void 0 !== t.Entity.GetComponent(152)
                        ? void this.noi.SetIsAimTarget(!0)
                        : void this.noi.SetIsAimTarget(!1);
                  }
              }
            }
            this.noi.SetIsAimTarget(!1);
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
    super.OnInitialize(), (this.UFa = 1101008132);
    var t =
      ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle();
    this.iKa(t), (this.HWl = (0, puerts_1.toManualReleaseDelegate)(this.WWl));
  }
  iKa(t) {
    t !== this.sDe &&
      (this.m$e(),
      t?.Valid
        ? ((this.sDe = t),
          (this.Xte = this.sDe.Entity?.GetComponent(203)),
          this.c$e(),
          (this.xFa = this.Xte?.HasTag(this.UFa) ?? !1),
          this.HGa())
        : (this.sDe = void 0));
  }
  HGa() {
    this.noi && this.noi.RefreshState(this.xFa);
  }
  OnDestroyed() {
    this.yoi(),
      (0, puerts_1.releaseManualReleaseDelegate)(this.WWl),
      this.hoi?.Dispose(),
      (this.hoi = void 0);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SetFollowShootAimVisible,
      this.PFa,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetFollowShootAimVisible,
        this.PFa,
      );
  }
  c$e() {
    this.mdt(this.UFa, this.tKa),
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
        this,
        this.sDe,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
  m$e() {
    for (const t of this.ldt) t?.EndTask();
    (this.ldt.length = 0),
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(
        this,
        this.sDe,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
  OnTick(t) {
    FollowShootAimHandle.Ult.Start(),
      this.doi(),
      FollowShootAimHandle.Ult.Stop();
  }
  mdt(t, i) {
    t = this.Xte?.ListenForTagAddOrRemove(t, i);
    t && this.ldt.push(t);
  }
  Soi() {
    (this.noi = this.NewHudUnitWithReturn(
      FollowShootAimUnit_1.FollowShootAimUnit,
      "UiItem_AimTransmit",
      !0,
      () => {
        this.HGa();
      },
    )),
      this.noi.SetVisible(!0);
  }
  yoi() {
    this.noi && (this.DestroyHudUnit(this.noi), (this.noi = void 0));
  }
  doi() {
    this.noi?.GetVisible() && this.Coi();
  }
  Coi() {
    var t = Global_1.Global.CharacterCameraManager,
      i = this.soi,
      e = this.aoi,
      t =
        (i.FromUeVector(t.D_GetCameraLocation()),
        e.FromUeVector(t.GetActorForwardVector()),
        e.MultiplyEqual(MAX_AIM_DISTANCE),
        e.AdditionEqual(i),
        (this.hoi =
          this.hoi ??
          ModelManager_1.ModelManager.BulletModel.NewTraceElement(
            UE.TraceLineElement,
            ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim,
          )),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.hoi, i),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.hoi, e),
        TraceElementCommon_1.TraceElementCommon.AsyncLineTrace(
          this.hoi,
          PROFILE_AIM_TRACE,
          this.HWl,
        ));
    (this.QWl = t.Frame), (this.KWl = t.Index);
  }
}
(exports.FollowShootAimHandle = FollowShootAimHandle).Ult = Stats_1.Stat.Create(
  "[BattleView]FollowShootAimHandleTick",
);
//# sourceMappingURL=FollowShootAimHandle.js.map
