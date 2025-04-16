"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShootAutoAimHandle = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LockOnController_1 = require("../../LockOn/LockOnController"),
  FollowShootAutoAimUnit_1 = require("../HudUnit/FollowShootAutoAimUnit"),
  FollowShootVisionCarUnit_1 = require("../HudUnit/FollowShootVisionCarUnit"),
  HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
  HudUnitHandleBase_1 = require("./HudUnitHandleBase");
class FollowShootAutoAimHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments),
      (this.noi = void 0),
      (this.sDe = void 0),
      (this.BPl = void 0),
      (this.jma = new Vector2D_1.Vector2D()),
      (this.doh = 0),
      (this.F$_ = 0),
      (this.zpe = (t, i) => {
        this.sDe === i && this.m$e();
      }),
      (this.PFa = (t) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("HudUnit", 17, "FollowShootAutoAim", [
              "bVisible",
              t,
            ]),
          t)
        ) {
          var i =
              ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle(),
            i =
              (this.iKa(i),
              ModelManager_1.ModelManager.BattleUiModel.FormationData.GetFollowType());
          if (
            (i !== this.doh &&
              this.noi &&
              (this.DestroyHudUnit(this.noi), (this.noi = void 0)),
            (this.doh = i),
            !this.noi)
          )
            return void this.Soi();
        }
        this.noi && this.noi.SetVisible(t);
      });
  }
  OnInitialize() {
    super.OnInitialize();
    var t =
      ModelManager_1.ModelManager.BattleUiModel.FormationData?.GetFollowerEntityHandle();
    this.iKa(t);
  }
  iKa(t) {
    t !== this.sDe &&
      (this.m$e(),
      t?.Valid
        ? ((this.sDe = t),
          (this.BPl = this.sDe.Entity?.GetComponent(219)),
          this.c$e(),
          this.HGa())
        : ((this.sDe = void 0), (this.BPl = void 0)));
  }
  HGa() {}
  OnDestroyed() {
    this.yoi();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SetFollowShootAutoAimVisible,
      this.PFa,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetFollowShootAutoAimVisible,
        this.PFa,
      );
  }
  c$e() {
    EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
      this,
      this.sDe,
      EventDefine_1.EEventName.RemoveEntity,
      this.zpe,
    );
  }
  m$e() {
    EventSystem_1.EventSystem.RemoveWithTargetUseKey(
      this,
      this.sDe,
      EventDefine_1.EEventName.RemoveEntity,
      this.zpe,
    );
  }
  OnTick(t) {
    FollowShootAutoAimHandle.Ult.Start(),
      this.doi(),
      FollowShootAutoAimHandle.Ult.Stop();
  }
  Soi() {
    3 === this.doh
      ? (this.noi = this.NewHudUnitWithReturn(
          FollowShootAutoAimUnit_1.FollowShootAutoAimUnit,
          "UiView_SightB",
          !0,
          () => {
            this.HGa();
          },
        ))
      : 4 === this.doh
        ? (this.noi = this.NewHudUnitWithReturn(
            FollowShootVisionCarUnit_1.FollowShootVisionCarUnit,
            "UiView_VisionCarSight",
            !0,
            () => {
              this.noi?.SetActive(!0), this.HGa();
            },
          ))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "HudUnit",
            67,
            "[FollowShootAutoAimHandle]创建AimUnit失败, followType不合法",
            ["followType", this.doh],
          ),
      this.noi?.SetVisible(!0);
  }
  yoi() {
    this.noi && (this.DestroyHudUnit(this.noi), (this.noi = void 0));
  }
  doi() {
    var t, i, e;
    this.noi?.GetVisible() &&
      ((t = this.BPl?.LockOnTarget),
      (i = this.WRl(t)),
      (e = t?.Id !== this.F$_),
      i && (this.F$_ = t?.Id ?? 0),
      this.noi.SetTargetAimVisible(i, e));
  }
  WRl(t) {
    return (
      !!t &&
      ((t = LockOnController_1.LockOnController.GetLockOnTargetLocation(t)),
      !!HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(
        t,
        this.jma,
      )) &&
      (this.noi?.SetTargetItemOffset(this.jma.X, this.jma.Y), !0)
    );
  }
}
(exports.FollowShootAutoAimHandle = FollowShootAutoAimHandle).Ult =
  Stats_1.Stat.Create("[BattleView]FollowShootAimHandleTick");
//# sourceMappingURL=FollowShootAutoAimHandle.js.map
