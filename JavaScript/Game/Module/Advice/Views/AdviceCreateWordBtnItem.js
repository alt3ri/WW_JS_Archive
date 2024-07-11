"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceCreateWordBtnItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class AdviceCreateWordBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.S9 = 0),
      (this.Xy = 0),
      (this.YP = () => {
        this.S9 === 0
          ? (this.b9e(), UiManager_1.UiManager.OpenView("AdviceSortWordView"))
          : (this.w9e(), UiManager_1.UiManager.OpenView("AdviceWordView"));
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
    this.S9 = e;
  }
  SetIndex(e) {
    this.Xy = e;
  }
  b9e() {
    let e;
    const i = ModelManager_1.ModelManager.AdviceModel;
    const r = i.CurrentWordMap.get(this.Xy);
    void 0 !== r && r > 0
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
  w9e() {
    const e = ModelManager_1.ModelManager.AdviceModel;
    (e.CurrentChangeWordType = 1),
      (e.CurrentSelectWordId = e.CurrentConjunctionId);
  }
  RefreshView() {
    this.q9e();
  }
  q9e() {
    let e;
    this.S9 === 0
      ? (e = ModelManager_1.ModelManager.AdviceModel.CurrentWordMap.get(
          this.Xy,
        )) > 0
        ? ((e =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(e)),
          this.GetText(1).SetText(e))
        : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeWord")
      : (e = ModelManager_1.ModelManager.AdviceModel.CurrentConjunctionId) > 0
        ? ((e =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
              e,
            )),
          this.GetText(1).SetText(e))
        : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeWord");
  }
}
exports.AdviceCreateWordBtnItem = AdviceCreateWordBtnItem;
// # sourceMappingURL=AdviceCreateWordBtnItem.js.map
