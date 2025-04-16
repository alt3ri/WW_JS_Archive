"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreDownloadButtonItemB = exports.PreDownloadButtonItemA = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RedDotController_1 = require("../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../Util/LguiUtil");
class PreDownloadButtonItemA extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.YP = () => {
        ControllerHolder_1.ControllerHolder.PreDownloadController.OnPreDownloadBtnClick(
          !0,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.YP]]);
  }
  Refresh(e = !1) {
    e &&
    (ModelManager_1.ModelManager.PreDownloadModel.IsPreDownloadAvailable() ||
      ModelManager_1.ModelManager.PreDownloadModel.IsComplete())
      ? (this.SetUiActive(!0),
        (e = ModelManager_1.ModelManager.PreDownloadModel.IsComplete()
          ? "PreDownload_Complete_Btn_Text"
          : "PreDownload_Downloading_Btn_Text"),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e))
      : this.SetUiActive(!1);
  }
  RefreshDot() {
    var e =
        ModelManager_1.ModelManager.PreDownloadModel.HasClickBtnCheck() &&
        !ModelManager_1.ModelManager.PreDownloadModel.IsComplete(),
      o = ModelManager_1.ModelManager.PreDownloadModel.IsComplete();
    this.GetItem(2)?.SetUIActive(e), this.GetItem(3)?.SetUIActive(o);
  }
}
exports.PreDownloadButtonItemA = PreDownloadButtonItemA;
class PreDownloadButtonItemB extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), (this.Xxt = e), this.CreateThenShowByActor(this.Xxt.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  BindRedDot() {
    var e = this.GetItem(0),
      e =
        (RedDotController_1.RedDotController.BindRedDot("PreDownload", e),
        this.GetItem(1));
    RedDotController_1.RedDotController.BindRedDot("PreDownloadComplete", e);
  }
  UnBindRedDot() {
    var e = this.GetItem(0),
      e =
        (RedDotController_1.RedDotController.UnBindGivenUi("PreDownload", e),
        this.GetItem(1));
    RedDotController_1.RedDotController.UnBindGivenUi("PreDownloadComplete", e);
  }
}
exports.PreDownloadButtonItemB = PreDownloadButtonItemB;
//# sourceMappingURL=PreDownloadButton.js.map
