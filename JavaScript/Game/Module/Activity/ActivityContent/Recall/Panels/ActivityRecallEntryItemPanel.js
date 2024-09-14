"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallEntryItemPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityRecallHelper_1 = require("../Misc/ActivityRecallHelper");
class ActivityRecallEntryItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.bda = void 0),
      (this.Lo = void 0),
      (this.Bda = () => {
        var [e] = ActivityRecallHelper_1.ActivityRecallHelper.CheckIfEntryOpen(
          this.Lo,
        );
        if (e)
          switch (this.bda) {
            case 2:
              ActivityRecallHelper_1.ActivityRecallHelper.ReportRecallLog1023(
                3,
              ),
                UiManager_1.UiManager.OpenView("ActivityRecallMainView", 1);
              break;
            case 1:
              ActivityRecallHelper_1.ActivityRecallHelper.ReportRecallLog1023(
                1,
              ),
                UiManager_1.UiManager.OpenView("ActivityRecallMainView", 0);
              break;
            case 3:
              ActivityRecallHelper_1.ActivityRecallHelper.ReportRecallLog1023(
                2,
              ),
                UiManager_1.UiManager.OpenView("ActivityRecallMainView", 2);
              break;
            case 4:
              ActivityRecallHelper_1.ActivityRecallHelper.ReportRecallLog1023(
                2,
              ),
                UiManager_1.UiManager.OpenView("ActivityRecallMainView", 3);
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
      (this.BtnBindInfo = [[2, this.Bda]]);
  }
  RefreshData(e, i) {
    this.bda = e;
    e = void 0 !== (this.Lo = i);
    this.SetUiActive(e), e && this.Og();
  }
  Og() {
    var e, i, t;
    void 0 === this.Lo
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActivityRecall",
            64,
            "ActivityRecallEntryItemPanel.RefreshView->回流活动入口配置为空",
          ),
        this.SetUiActive(!1))
      : (this.SetUiActive(!0),
        (e = this.GetText(0)),
        (i = this.Lo.Title),
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, i),
        (this.GetText(1).text = ""),
        (e = this.QCa(this.Lo)),
        (i = this.GetTexture(3)),
        ([t] = ActivityRecallHelper_1.ActivityRecallHelper.CheckIfEntryOpen(
          this.Lo,
        )),
        i.SetUIActive(t),
        this.SetTextureByPath(e, i));
  }
  QCa(e) {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    return 1 === i ? e.IconPath : 0 === i ? e.IconPathF : "";
  }
}
exports.ActivityRecallEntryItemPanel = ActivityRecallEntryItemPanel;
//# sourceMappingURL=ActivityRecallEntryItemPanel.js.map
