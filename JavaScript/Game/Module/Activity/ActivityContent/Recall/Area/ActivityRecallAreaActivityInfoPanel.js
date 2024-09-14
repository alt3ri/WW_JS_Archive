"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallAreaActivityInfoPanel = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  MapController_1 = require("../../../../Map/Controller/MapController"),
  ActivityDescriptionTypeB_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeB"),
  ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityRecallHelper_1 = require("../Misc/ActivityRecallHelper");
class ActivityRecallAreaActivityInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.gda = void 0),
      (this.fda = void 0),
      (this.vda = void 0),
      (this.pda = void 0),
      (this.Mda = void 0),
      (this.Sda = () => {
        ActivityRecallHelper_1.ActivityRecallHelper.ReportRecallLog1024(3);
        var i = this.gda.ArgId[0],
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
        ((this.fda = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      e =
        ((this.vda = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
        this.GetItem(2)),
      s =
        (e.SetUIActive(!1),
        (this.pda = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.Mda = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(void 0)),
      await Promise.all([
        this.fda.CreateThenShowByActorAsync(i.GetOwner()),
        this.vda.CreateThenShowByActorAsync(t.GetOwner()),
        this.pda.CreateByActorAsync(e.GetOwner()),
        this.Mda.CreateThenShowByActorAsync(s.GetOwner()),
      ]);
  }
  OnStart() {
    this.Mda.FunctionButton.SetFunction(this.Sda),
      this.Mda.FunctionButton.SetLocalTextNew("RecallActivity_Go"),
      this.pda.InitGridLayout(this.pda.InitCommonGridItem),
      this.fda.SetTimeTextVisible(!1);
  }
  RefreshByData(i) {
    (this.gda = i), this.mGe(), this.Pqe(), this.jqe();
  }
  mGe() {
    this.fda.SetTitleByTextId(this.gda.Title);
  }
  Pqe() {
    var i = this.gda.SubTitle,
      t = this.gda.Description,
      e = !StringUtils_1.StringUtils.IsEmpty(i);
    this.fda.SetSubTitleVisible(e),
      e && this.fda.SetSubTitleByTextId(i),
      this.vda.SetContentByTextId(t);
  }
  jqe() {}
}
exports.ActivityRecallAreaActivityInfoPanel =
  ActivityRecallAreaActivityInfoPanel;
//# sourceMappingURL=ActivityRecallAreaActivityInfoPanel.js.map
