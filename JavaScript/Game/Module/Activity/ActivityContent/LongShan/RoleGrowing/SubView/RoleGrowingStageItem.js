"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleGrowingStageItem = void 0);
const UE = require("ue"),
  LongShanStageById_1 = require("../../../../../../../Core/Define/ConfigQuery/LongShanStageById"),
  LevelGeneralCommons_1 = require("../../../../../../LevelGamePlay/LevelGeneralCommons"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class RoleGrowingStageItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.StageId = e),
      (this.OnClickStageDetail = void 0),
      (this.qNn = () => {
        this.OnClickStageDetail?.(this.StageId);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ];
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.SetCanClickWhenDisable(!0),
      e.CanExecuteChange.Bind(() => !1),
      e.OnPointUpCallBack.Bind(this.qNn);
  }
  Refresh(e) {
    var i = e.GetStageInfoById(this.StageId),
      t = LongShanStageById_1.configLongShanStageById.GetConfig(this.StageId),
      i = void 0 === i,
      s = e.GetProgress(this.StageId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(2),
      "LongShanStage_ProgressPercentage02",
      s,
    ),
      this.GetItem(1).SetUIActive(100 === s);
    this.GetExtendToggle(0).SetToggleState(0),
      this.GetItem(5).SetUIActive(i),
      this.GetItem(6).SetUIActive(!i),
      i
        ? ((s =
            LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
              t.OpenConditionId,
            )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), s))
        : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Title),
      this.GetItem(4).SetUIActive(e.CheckStageRed(this.StageId));
  }
}
exports.RoleGrowingStageItem = RoleGrowingStageItem;
//# sourceMappingURL=RoleGrowingStageItem.js.map
