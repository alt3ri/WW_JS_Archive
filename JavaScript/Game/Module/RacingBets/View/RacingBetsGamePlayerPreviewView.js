"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsGamePlayPreviewView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController"),
  RacingBetsDangoRankPanel_1 = require("./Item/RacingBetsDangoRankPanel");
class RacingBetsGamePlayPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.MBc = []),
      (this.Gv1 = void 0),
      (this.lyt = () => {
        ModelManager_1.ModelManager.RacingBetsModel.CloseDangoGamePlayPreviewView();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.lyt]]);
  }
  async OnBeforeStartAsync() {
    (this.MBc =
      ModelManager_1.ModelManager.RacingBetsModel.GetDungeonDangoList()),
      (this.Gv1 = new RacingBetsDangoRankPanel_1.RacingBetsDangoRankPanel()),
      await this.Gv1.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
      await this.Gv1.InitAsync(this.MBc);
  }
  PushCameraHandle(e, a, i) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
      e,
      a,
      !0,
    );
  }
  PopCameraHandle(e, a, i, n) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
      e,
      a,
      i,
      n,
    );
  }
}
exports.RacingBetsGamePlayPreviewView = RacingBetsGamePlayPreviewView;
//# sourceMappingURL=RacingBetsGamePlayerPreviewView.js.map
