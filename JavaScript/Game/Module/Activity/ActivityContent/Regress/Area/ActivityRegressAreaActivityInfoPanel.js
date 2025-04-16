"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressAreaActivityInfoPanel = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  MapController_1 = require("../../../../Map/Controller/MapController"),
  ActivityDescriptionTypeB_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeB"),
  ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressAreaActivityInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Lo = void 0),
      (this.Pda = void 0),
      (this.xda = void 0),
      (this.bda = void 0),
      (this.Bda = void 0),
      (this.qda = () => {
        ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1024(3);
        var i = this.Lo.ArgId[0],
          t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(i);
        MapController_1.MapController.OpenMapViewAndFocusMark(
          t.ObjectType,
          i,
          void 0,
          !1,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0),
      t =
        ((this.Pda = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      e =
        ((this.xda = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
        this.GetItem(2)),
      s =
        (e.SetUIActive(!1),
        (this.bda = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.Bda = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(void 0)),
      await Promise.all([
        this.Pda.CreateThenShowByActorAsync(i.GetOwner()),
        this.xda.CreateThenShowByActorAsync(t.GetOwner()),
        this.bda.CreateByActorAsync(e.GetOwner()),
        this.Bda.CreateThenShowByActorAsync(s.GetOwner()),
      ]);
  }
  OnStart() {
    this.Bda.FunctionButton.SetFunction(this.qda),
      this.Bda.FunctionButton.SetLocalTextNew("RecallActivity_Go"),
      this.bda.InitGridLayout(this.bda.InitCommonGridItem),
      this.Pda.SetTimeTextVisible(!1);
  }
  RefreshByData(i) {
    (this.Lo = i), this.mGe(), this.Pqe(), this.jqe();
  }
  mGe() {
    this.Pda.SetTitleByTextId(this.Lo.Title);
  }
  Pqe() {
    var i = this.Lo.SubTitle,
      t = this.Lo.Description,
      e = !StringUtils_1.StringUtils.IsEmpty(i);
    this.Pda.SetSubTitleVisible(e),
      e && this.Pda.SetSubTitleByTextId(i),
      this.xda.SetContentByTextId(t);
  }
  jqe() {}
}
exports.ActivityRegressAreaActivityInfoPanel =
  ActivityRegressAreaActivityInfoPanel;
//# sourceMappingURL=ActivityRegressAreaActivityInfoPanel.js.map
