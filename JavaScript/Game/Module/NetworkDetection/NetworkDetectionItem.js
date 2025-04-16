"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NetworkDetectionItem = void 0);
const UE = require("ue"),
  LauncherNetworkDetectionController_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionController"),
  LauncherNetworkDetectionModel_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionModel"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
class NetworkDetectionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.Aic = void 0), (this.SPe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIText],
    ];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(e, t, r) {
    (this.Aic = e), this.FTt();
  }
  FTt() {
    var e = this.Aic.EntryData,
      t = this.Aic.Result,
      r =
        (this.GetText(0).ShowTextNew(e.NameLocalKey),
        this.GetSprite(1).SetUIActive(void 0 !== t && !t?.Success),
        this.GetSprite(2).SetUIActive(void 0 !== t && t?.Success),
        this.GetSprite(3).SetUIActive(this.Aic.Proceed),
        !1 === t?.Success && void 0 !== t?.Code);
    r &&
      ((e =
        LauncherNetworkDetectionModel_1.LauncherNetworkDetectionModel.GetGenericErrorCodeTips(
          e.Type,
          t.Code,
          t,
        )),
      this.GetText(5).SetText(e),
      (this.Aic.ErrorCodeText = e)),
      this.GetItem(4).SetUIActive(r);
  }
  OnBeforeDestroy() {
    4 === this.Aic.EntryData.Type &&
      UE.KuroNetworkDetection.DetectionFinish(this.Aic.Result?.Success ?? !1);
  }
  async Proceed() {
    if (this.Aic.Proceed) return !1;
    (this.Aic.Proceed = !0),
      this.GetSprite(3).SetUIActive(!0),
      this.SPe.PlayLevelSequenceByName("Load_Loop", !1);
    var e = this.Aic.EntryData,
      e =
        await LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.StartDetection(
          e,
        );
    return (
      void 0 !== this.Aic && (this.Aic.Proceed = !1),
      !!this.IsShowOrShowing &&
        (this.SPe.StopSequenceByKey("Load_Loop", !1),
        (this.Aic.Result = e),
        this.FTt(),
        !0)
    );
  }
}
exports.NetworkDetectionItem = NetworkDetectionItem;
//# sourceMappingURL=NetworkDetectionItem.js.map
