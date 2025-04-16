"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShootVisionCarUnit = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  HudUnitBase_1 = require("../HudUnitBase");
class FollowShootVisionCarUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.Kti = void 0),
      (this.SPe = void 0),
      (this.dce = !1),
      (this.Yti = !1),
      (this.kQ_ = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    (this.Kti = this.GetItem(0)),
      this.Kti.SetUIActive(!1),
      (this.dce = !1),
      (this.Yti = !1),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnBeforeDestroy() {
    (this.Kti = void 0),
      this.SPe?.Clear(),
      (this.SPe = void 0),
      super.OnBeforeDestroy();
  }
  SetActive(t) {
    this.IsCreateOrCreating ||
      (t !== this.dce &&
        ((this.dce = t)
          ? (super.SetActive(!0),
            this.SPe?.StopSequenceByKey("Close"),
            this.SPe?.PlaySequencePurely("Start"),
            (this.Yti = !1),
            (this.kQ_ = !1))
          : (this.SetTargetAimVisible(!1, !1),
            (this.kQ_ = !0),
            this.SPe?.StopSequenceByKey("Start"),
            this.SPe?.PlaySequenceAsync(
              "Close",
              new CustomPromise_1.CustomPromise(),
            ).then(() => {
              this.dce || ((this.kQ_ = !1), super.SetActive(!1));
            }))));
  }
  SetTargetItemOffset(t, s) {
    this.Kti && (this.Kti.SetAnchorOffsetX(t), this.Kti.SetAnchorOffsetY(s));
  }
  SetTargetAimVisible(t, s) {
    !this.kQ_ &&
      this.Kti &&
      (this.Yti === t
        ? t && s && this.SPe?.PlaySequencePurely("Start_Red")
        : ((this.Yti = t)
            ? (this.Kti.SetUIActive(!0),
              this.SPe?.StopSequenceByKey("CloseL"),
              this.SPe?.PlaySequencePurely("StartL"))
            : (this.SPe?.StopSequenceByKey("StartL"),
              this.SPe?.PlaySequenceAsync(
                "CloseL",
                new CustomPromise_1.CustomPromise(),
              ).then(() => {
                this.Yti || this.Kti?.SetUIActive(!1);
              })),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "HudUnit",
              67,
              "[FollowShootVisionCarAutoAimUnit]设置目标准心是否可见",
              ["isVisible", t],
            )));
  }
}
exports.FollowShootVisionCarUnit = FollowShootVisionCarUnit;
//# sourceMappingURL=FollowShootVisionCarUnit.js.map
