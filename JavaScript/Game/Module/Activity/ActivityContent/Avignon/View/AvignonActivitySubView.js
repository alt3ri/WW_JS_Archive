"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AvignonActivitySubView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase"),
  ActivitySubViewGeneralInfo_1 = require("../../../View/SubView/ActivitySubViewGeneralInfo");
class AvignonActivitySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.CommonInfoPanel = void 0),
      (this.tWt = () => {
        ModelManager_1.ModelManager.AvignonModel.ReadRedDot(),
          UiManager_1.UiManager.OpenView(
            "AvignonActivityMainView",
            this.ActivityBaseData,
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.CommonInfoPanel =
      new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo()),
      this.CommonInfoPanel.SetData(this.ActivityBaseData);
    var e = [
        this.CommonInfoPanel.CreateThenShowByActorAsync(
          this.GetItem(0).GetOwner(),
        ),
      ],
      e =
        (await Promise.all(e),
        this.CommonInfoPanel?.SetBtnText("LongShanStage_Join01"),
        this.CommonInfoPanel?.SetClickFunc(this.tWt),
        0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender());
    this.GetItem(1)?.SetUIActive(e), this.GetItem(2)?.SetUIActive(!e);
  }
  OnRefreshView() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshActivityTab,
      this.ActivityBaseData.Id,
    ),
      this.CommonInfoPanel.SetFunctionRedDotVisible(
        ModelManager_1.ModelManager.AvignonModel.CheckRedDot() ||
          this.ActivityBaseData.HasStageRewardRedDot(),
      ),
      this.CommonInfoPanel?.OnRefreshView();
  }
}
exports.AvignonActivitySubView = AvignonActivitySubView;
//# sourceMappingURL=AvignonActivitySubView.js.map
