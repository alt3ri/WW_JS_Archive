"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerResetView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  BabelTowerController_1 = require("./BabelTowerController"),
  BabelTowerHardLevelChoseItem_1 = require("./BabelTowerHardLevelChoseItem");
class BabelTowerResetView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.yq = 0),
      (this.uHe = () => {
        this.CloseMe();
      }),
      (this.L3e = () => {
        BabelTowerController_1.BabelTowerController.ResetBabelTowerLevelRequest(
          this.yq,
        ),
          this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.uHe],
        [2, this.L3e],
      ]);
  }
  async OnBeforeStartAsync() {
    this.yq = this.OpenParam;
    var e = new BabelTowerHardLevelChoseItem_1.BabelTowerHardLevelChoseItem();
    await e.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    var r =
      BabelTowerController_1.BabelTowerController.GetBabelTowerData().HardLevelDataMap.get(
        this.yq,
      );
    r && (e.SetUiActive(!0), e.Refresh(r, !1, 0)), e.DisableButton();
  }
}
exports.BabelTowerResetView = BabelTowerResetView;
//# sourceMappingURL=BabelTowerResetView.js.map
