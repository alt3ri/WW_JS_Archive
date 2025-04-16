"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingButton = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
class FishingButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Qtt = void 0),
      (this.ZMe = ""),
      (this.UFe = () => {
        ControllerHolder_1.ControllerHolder.FishingController.FishingInputHandler(
          this.ZMe,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
    ]),
      Info_1.Info.IsInTouch() ||
        this.ComponentRegisterInfos.push([2, UE.UIItem]),
      (this.BtnBindInfo = [[0, this.UFe]]);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    (this.ZMe = e.ActionName),
      this.ZMe === InputMappingsDefine_1.actionMappings.切换角色3
        ? RedDotController_1.RedDotController.BindRedDot(
            "FishingTech",
            this.GetItem(1),
          )
        : this.GetItem(1).SetUIActive(!1),
      Info_1.Info.IsInTouch() ||
        ((e = this.GetItem(2)),
        (this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem()),
        await this.Qtt.CreateThenShowByActorAsync(e.GetOwner()),
        (e = { ActionOrAxisName: this.ZMe }),
        this.Qtt.RefreshByActionOrAxis(e));
  }
  OnBeforeShow() {
    this.ZMe === InputMappingsDefine_1.actionMappings.切换角色3 &&
      ModelManager_1.ModelManager.FishingModel.RefreshTechCanLevelUp();
  }
  OnBeforeDestroy() {
    this.ZMe === InputMappingsDefine_1.actionMappings.切换角色3 &&
      RedDotController_1.RedDotController.UnBindGivenUi(
        "FishingTech",
        this.GetItem(1),
      );
  }
}
exports.FishingButton = FishingButton;
//# sourceMappingURL=FishingButton.js.map
