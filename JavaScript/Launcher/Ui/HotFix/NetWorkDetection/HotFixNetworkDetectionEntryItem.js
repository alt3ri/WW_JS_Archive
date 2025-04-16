"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixNetworkDetectionEntryItem = void 0);
const UE = require("ue"),
  LauncherNetworkDetectionController_1 = require("../../../NetworkDetection/LauncherNetworkDetectionController"),
  LauncherNetworkDetectionModel_1 = require("../../../NetworkDetection/LauncherNetworkDetectionModel"),
  LaunchComponentsAction_1 = require("../../LaunchComponentsAction"),
  HotFixManager_1 = require("../HotFixManager");
class HotFixNetworkDetectionEntryItem extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments), (this.ItemClickCallBack = void 0), (this.Pe = void 0);
  }
  SetRootActor(t) {
    this.SetRootActorLaunchComponentsAction(t);
  }
  OnShow() {
    this.FTt();
  }
  FTt() {
    var t = this.Pe.EntryData,
      e = this.Pe.Result,
      o =
        (HotFixManager_1.HotFixManager.SetLocalText(
          this.GetText(0),
          t.NameLocalKey,
        ),
        this.GetTexture(1).SetUIActive(void 0 !== e && !e?.Success),
        this.GetTexture(2).SetUIActive(void 0 !== e && e?.Success),
        this.GetTexture(3).SetUIActive(this.Pe.Proceed),
        !1 === e?.Success && void 0 !== e?.Code);
    o &&
      ((t =
        LauncherNetworkDetectionModel_1.LauncherNetworkDetectionModel.GetGenericErrorCodeTips(
          t.Type,
          e.Code,
          e,
        )),
      this.GetText(5).SetText(t),
      (this.Pe.ErrorCodeText = t)),
      this.GetItem(4).SetUIActive(o);
  }
  Refresh(t) {
    this.Pe = t;
  }
  OnBeforeDestroy() {
    4 === this.Pe.EntryData.Type &&
      UE.KuroNetworkDetection.DetectionFinish(this.Pe.Result?.Success ?? !1);
  }
  async Proceed() {
    var t;
    this.Pe.Proceed ||
      ((this.Pe.Proceed = !0),
      this.GetTexture(3).SetUIActive(!0),
      this.SequencePlayer.PlaySequence("Load_Loop"),
      (t = this.Pe.EntryData),
      (this.Pe.Result =
        await LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.StartDetection(
          t,
        )),
      void 0 !== this.Pe && (this.Pe.Proceed = !1),
      this.IsClear) ||
      (this.SequencePlayer.StopSequence("Load_Loop"), this.FTt());
  }
}
exports.HotFixNetworkDetectionEntryItem = HotFixNetworkDetectionEntryItem;
//# sourceMappingURL=HotFixNetworkDetectionEntryItem.js.map
