"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressEntryItemPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressEntryItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Xda = void 0),
      (this.Lo = void 0),
      (this.Yda = () => {
        var [e] =
          ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(
            this.Lo,
          );
        if (e)
          switch (this.Xda) {
            case 2:
              ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1023(
                3,
              ),
                UiManager_1.UiManager.OpenView("ActivityRegressMainView", 1);
              break;
            case 1:
              ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1023(
                1,
              ),
                UiManager_1.UiManager.OpenView("ActivityRegressMainView", 0);
              break;
            case 3:
              ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1023(
                2,
              ),
                UiManager_1.UiManager.OpenView("ActivityRegressMainView", 2);
              break;
            case 4:
              ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1023(
                2,
              ),
                UiManager_1.UiManager.OpenView("ActivityRegressMainView", 3);
          }
        else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            "RecallActivity_Role_Lock",
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[2, this.Yda]]);
  }
  RefreshData(e, i) {
    this.Xda = e;
    e = void 0 !== (this.Lo = i);
    this.SetUiActive(e), e && this.Og();
  }
  Og() {
    var e, i, r;
    void 0 === this.Lo
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActivityRecall",
            63,
            "ActivityRegressEntryItemPanel.RefreshView->回流活动入口配置为空",
          ),
        this.SetUiActive(!1))
      : (this.SetUiActive(!0),
        (e = this.GetText(0)),
        (i = this.Lo.Title),
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, i),
        (this.GetText(1).text = ""),
        (e = this.KCa(this.Lo)),
        (i = this.GetTexture(3)),
        ([r] =
          ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(
            this.Lo,
          )),
        i.SetUIActive(r),
        this.SetTextureByPath(e, i));
  }
  KCa(e) {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    return 1 === i ? e.IconPath : 0 === i ? e.IconPathF : "";
  }
}
exports.ActivityRegressEntryItemPanel = ActivityRegressEntryItemPanel;
//# sourceMappingURL=ActivityRegressEntryItemPanel.js.map
