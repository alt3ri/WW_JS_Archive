"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GravityFlipView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class GravityFlipView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.wK_ = void 0),
      (this.RK_ = void 0),
      (this.AK_ = void 0),
      (this.Y_c = void 0),
      (this.zRc = void 0),
      (this.Hea = void 0),
      (this.z_e = -1),
      (this.z_c = !1),
      (this.lPe = () => {
        var e;
        this.z_c ||
          ((e = this.OpenParam.SelectCallback),
          ControllerHolder_1.ControllerHolder.GravityFlipController.ListenTeleportCompleteEvent(
            e,
          ),
          ModelManager_1.ModelManager.GravityFlipModel.GravityFlipComp?.OnExitInteract(),
          this.UY_(),
          this.CloseMe());
      }),
      (this.BK_ = () => {
        this.kK_(0);
      }),
      (this.qK_ = () => {
        this.kK_(1);
      }),
      (this.OK_ = () => {
        this.kK_(2);
      }),
      (this.J_c = () => {
        this.kK_(4);
      }),
      (this.YK_ = () => {
        this.zK_(),
          this.Hea?.PlayLevelSequenceByName("Turn_Finish"),
          this.UiViewSequence?.PlaySequence("Turn_Finish"),
          (this.z_c = !1);
      }),
      (this.hWe = () => {
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.PlotNetworkEnd,
          this.hWe,
        ),
          ModelManager_1.ModelManager.GravityFlipModel.GravityFlipComp.OnNotifyUpdateGravityDirection(
            ModelManager_1.ModelManager.GravityFlipModel.CacheCorrectDirection,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.BK_],
        [1, this.qK_],
        [2, this.OK_],
        [3, this.lPe],
        [4, this.J_c],
      ]);
  }
  OnStart() {
    (this.wK_ = this.GetButton(0)),
      (this.AK_ = this.GetButton(1)),
      (this.RK_ = this.GetButton(2)),
      (this.Y_c = this.GetButton(4)),
      (this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.zRc = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.Y_c.RootUIComp,
      )),
      (this.z_e = ModelManager_1.ModelManager.GravityFlipModel.TargetDirection),
      -1 === this.z_e && this.GetItem(6)?.SetUIActive(!1),
      (ModelManager_1.ModelManager.GravityFlipModel.ViewCallBackCache =
        this.OpenParam.SelectCallback);
  }
  OnBeforeShow() {
    this.zK_(!0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGravityFlipAnimFinish,
      this.YK_,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGravityFlipAnimFinish,
      this.YK_,
    );
  }
  kK_(s) {
    if (!this.z_c) {
      let e = -1,
        t = 0,
        i = "Turn_180";
      switch (s) {
        case 0:
          (t = 180), (e = 2), (i = "Turn_180");
          break;
        case 1:
          (t = 90), (e = 1), (i = "Turn_90_Zheng");
          break;
        case 2:
          (t = 270), (e = 0), (i = "Turn_90_Fu");
          break;
        case 4:
          t = 0;
      }
      s = ModelManager_1.ModelManager.GravityFlipModel.CurrentGravityDirection;
      (ModelManager_1.ModelManager.GravityFlipModel.CurrentGravityDirection =
        (t + s) % 360),
        -1 !== e &&
          ((0, this.OpenParam.SelectCallback)?.(e),
          this.Hea?.PlayLevelSequenceByName("Turn"),
          this.UiViewSequence?.PlaySequence(i),
          ControllerHolder_1.ControllerHolder.GravityFlipController.OnChangeGravityDirection(
            t,
          ),
          (this.z_c = !0)),
        this.Xxe(!1);
    }
  }
  zK_(e = !1) {
    this.Xxe(!1);
    let t = !1,
      i = !1,
      s = !1;
    var r = -1 === this.z_e ? 0 : this.z_e,
      r =
        (360 +
          ModelManager_1.ModelManager.GravityFlipModel.GravityFlipComp
            .CurGravityDirection -
          r) %
        360,
      e =
        (e &&
          -1 !== this.z_e &&
          this.GetItem(6)?.SetUIRelativeRotation(new UE.Rotator(0, r, 0)),
        ModelManager_1.ModelManager.GravityFlipModel.ValidGravityDirections);
    for (const o of e)
      switch (
        (360 -
          ModelManager_1.ModelManager.GravityFlipModel.CurrentGravityDirection +
          o) %
        360
      ) {
        case 270:
          i = !0;
          break;
        case 180:
          s = !0;
          break;
        case 90:
          t = !0;
      }
    i !== this.RK_.GetSelfInteractive() &&
      (this.RK_?.SetSelfInteractive(i), this.RK_?.RootUIComp.SetUIActive(i)),
      t !== this.AK_.GetSelfInteractive() &&
        (this.AK_?.SetSelfInteractive(t), this.AK_?.RootUIComp.SetUIActive(t)),
      s !== this.wK_.GetSelfInteractive() &&
        (this.wK_?.SetSelfInteractive(s), this.wK_?.RootUIComp.SetUIActive(s)),
      this.zRc?.StopCurrentSequence(),
      this.zRc?.PlayLevelSequenceByName("Gray");
  }
  Xxe(e) {
    this.wK_?.SetSelfInteractive(e),
      this.wK_?.RootUIComp.SetUIActive(e),
      this.AK_?.SetSelfInteractive(e),
      this.AK_?.RootUIComp.SetUIActive(e),
      this.RK_?.SetSelfInteractive(e),
      this.RK_?.RootUIComp.SetUIActive(e),
      this.Y_c?.SetSelfInteractive(e);
  }
  UY_() {
    if (ModelManager_1.ModelManager.GravityFlipModel.NeedChangeGravity()) {
      var e =
        ModelManager_1.ModelManager.GravityFlipModel
          .GravityFlipEntityCreatureDataId;
      if (-1 === e)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            31,
            "[GravityFlipView] 未找到重力翻转实体",
          ),
          ControllerHolder_1.ControllerHolder.GravityFlipController.CancelWaitTeleport();
      else {
        const i =
          ModelManager_1.ModelManager.GravityFlipModel.CurGravityFlipType;
        var t = Protocol_1.Aki.Protocol.MY_.create();
        (t.bY_ = MathUtils_1.MathUtils.NumberToLong(e)),
          (t.LY_ = i),
          Net_1.Net.Call(24494, t, (e) => {
            switch (e.Q4n) {
              case Protocol_1.Aki.Protocol.Q4n.KRs:
                break;
              case Protocol_1.Aki.Protocol.Q4n.Proto_ErrOnlineInteractNotOpen:
              case Protocol_1.Aki.Protocol.Q4n
                .Proto_ErrOnlineInteractNoPermission:
              case Protocol_1.Aki.Protocol.Q4n.Proto_GravityFlipLocked:
                ControllerHolder_1.ControllerHolder.GravityFlipController.CancelWaitTeleport();
                break;
              default:
                ControllerHolder_1.ControllerHolder.GravityFlipController.CancelWaitTeleport(),
                  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.Q4n,
                    19926,
                  );
            }
            ModelManager_1.ModelManager.GravityFlipModel.GravityFlipComp.SetGravityDirection(
              i,
            ),
              i !== e.RY_ &&
                (EventSystem_1.EventSystem.Add(
                  EventDefine_1.EEventName.PlotNetworkEnd,
                  this.hWe,
                ),
                (ModelManager_1.ModelManager.GravityFlipModel.CacheCorrectDirection =
                  e.RY_));
          });
      }
    } else
      ControllerHolder_1.ControllerHolder.GravityFlipController.CancelWaitTeleport();
  }
}
exports.GravityFlipView = GravityFlipView;
//# sourceMappingURL=GravityFlipView.js.map
