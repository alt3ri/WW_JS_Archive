"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceCreateWordBtnItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class AdviceCreateWordBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.E9 = 0),
      (this.Xy = 0),
      (this.YP = () => {
        0 === this.E9
          ? (this.$7e(), UiManager_1.UiManager.OpenView("AdviceSortWordView"))
          : (this.Q7e(), UiManager_1.UiManager.OpenView("AdviceWordView"));
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.YP]]);
  }
  SetType(e) {
    this.E9 = e;
  }
  SetIndex(e) {
    this.Xy = e;
  }
  $7e() {
    var e,
      i = ModelManager_1.ModelManager.AdviceModel,
      r = i.CurrentWordMap.get(this.Xy);
    void 0 !== r && 0 < r
      ? ((e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordType(r)),
        (i.CurrentSelectSortTypeId = e),
        (i.CurrentSelectSortWordId = r))
      : ((e =
          ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordTypeConfigs()[0]
            .Id),
        (i.CurrentSelectSortTypeId = e),
        (i.CurrentSelectSortWordId = -1)),
      (i.CurrentSelectWordIndex = this.Xy);
  }
  Q7e() {
    var e = ModelManager_1.ModelManager.AdviceModel;
    (e.CurrentChangeWordType = 1),
      (e.CurrentSelectWordId = e.CurrentConjunctionId);
  }
  RefreshView() {
    this.Y7e();
  }
  Y7e() {
    var e;
    0 === this.E9
      ? 0 <
        (e = ModelManager_1.ModelManager.AdviceModel.CurrentWordMap.get(
          this.Xy,
        ))
        ? ((e =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(e)),
          this.GetText(1).SetText(e))
        : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeWord")
      : 0 < (e = ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId)
        ? ((e =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
              e,
            )),
          this.GetText(1).SetText(e))
        : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeWord");
  }
}
exports.AdviceCreateWordBtnItem = AdviceCreateWordBtnItem;
//# sourceMappingURL=AdviceCreateWordBtnItem.js.map
