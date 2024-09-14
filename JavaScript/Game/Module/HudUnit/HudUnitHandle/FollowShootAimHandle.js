"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShootAimHandle = void 0);
const UE = require("ue"),
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
      (this.Aka = 0),
      (this.sDe = void 0),
      (this.Xte = void 0),
      (this.ldt = []),
      (this.Dka = !1),
      (this.soi = Vector_1.Vector.Create()),
      (this.aoi = Vector_1.Vector.Create()),
      (this.hoi = void 0),
      (this.zpe = (t, e) => {
        this.sDe === e && this.m$e();
      }),
      (this.ZHa = (t, e) => {
        (this.Dka = e), this.j2a();
      }),
      (this.Rka = (t) => {
        if (t) {
          var e =
            ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle();
          if ((this.eja(e), !this.noi)) return void this.Soi();
        }
        this.noi && this.noi.SetVisible(t);
      });
  }
  OnInitialize() {
    super.OnInitialize(), (this.Aka = 1101008132);
    var t =
      ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle();
    this.eja(t);
  }
  eja(t) {
    t !== this.sDe &&
      (this.m$e(),
      t?.Valid
        ? ((this.sDe = t),
          (this.Xte = this.sDe.Entity?.GetComponent(190)),
          this.c$e(),
          (this.Dka = this.Xte?.HasTag(this.Aka) ?? !1),
          this.j2a())
        : (this.sDe = void 0));
  }
  j2a() {
    this.noi && this.noi.RefreshState(this.Dka);
  }
  OnDestroyed() {
    this.yoi();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SetFollowShootAimVisible,
      this.Rka,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetFollowShootAimVisible,
        this.Rka,
      );
  }
  c$e() {
    this.mdt(this.Aka, this.ZHa),
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
  mdt(t, e) {
    t = this.Xte?.ListenForTagAddOrRemove(t, e);
    t && this.ldt.push(t);
  }
  Soi() {
    (this.noi = this.NewHudUnitWithReturn(
      FollowShootAimUnit_1.FollowShootAimUnit,
      "UiItem_AimTransmit",
      !0,
      () => {
        this.j2a();
      },
    )),
      this.noi.SetVisible(!0);
  }
  yoi() {
    this.noi && (this.DestroyHudUnit(this.noi), (this.noi = void 0));
  }
  doi() {
    if (this.noi?.GetVisible()) {
      var t = this.Coi();
      if (t) {
        var i = t.Actors,
          s = i.Num();
        if (!(s <= 0))
          for (let e = 0; e < s; e++) {
            var o = i.Get(e);
            if (!o?.IsValid()) return void this.noi.SetIsAimTarget(!1);
            let t = ActorUtils_1.ActorUtils.GetEntityByActor(o, !1);
            if (
              !(t =
                t ||
                ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
                  o,
                  !1,
                ))
            )
              return void this.noi.SetIsAimTarget(!1);
            var o = t.Entity.GetComponent(0),
              r = o?.GetEntityType();
            if (
              r !== Protocol_1.Aki.Protocol.kks.Proto_Player &&
              r !== Protocol_1.Aki.Protocol.kks.Proto_Npc
            )
              return r === Protocol_1.Aki.Protocol.kks.Proto_SceneItem &&
                "PortalCreater" === o.GetBaseInfo()?.Category.MechanismType &&
                void 0 !== t.Entity.GetComponent(141)
                ? void this.noi.SetIsAimTarget(!0)
                : void this.noi.SetIsAimTarget(!1);
          }
      }
      this.noi.SetIsAimTarget(!1);
    }
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
(exports.FollowShootAimHandle = FollowShootAimHandle).Ult = Stats_1.Stat.Create(
  "[BattleView]FollowShootAimHandleTick",
);
//# sourceMappingURL=FollowShootAimHandle.js.map
