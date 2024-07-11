"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallAreaActivityInfoPanel = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
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
      (this.n_a = void 0),
      (this.s_a = void 0),
      (this.a_a = void 0),
      (this.h_a = void 0),
      (this.l_a = void 0),
      (this.__a = () => {
        ActivityRecallHelper_1.ActivityRecallHelper.ReportRecallLog1024(3);
        var i = this.n_a.ArgId[0];
        MapController_1.MapController.OpenMapViewAndFocusMark(5, i, void 0, !1);
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
        ((this.s_a = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      e =
        ((this.a_a = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB()),
        this.GetItem(2)),
      s =
        (e.SetUIActive(!1),
        (this.h_a = new ActivityRewardList_1.ActivityRewardList()),
        this.GetItem(3));
    (this.l_a = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA()),
      await Promise.all([
        this.s_a.CreateThenShowByActorAsync(i.GetOwner()),
        this.a_a.CreateThenShowByActorAsync(t.GetOwner()),
        this.h_a.CreateByActorAsync(e.GetOwner()),
        this.l_a.CreateThenShowByActorAsync(s.GetOwner()),
      ]);
  }
  OnStart() {
    this.l_a.FunctionButton.BindCallback(this.__a),
      this.l_a.FunctionButton.RefreshTextNew("RecallActivity_Go"),
      this.h_a.InitGridLayout(this.h_a.InitCommonGridItem),
      this.s_a.SetTimeTextVisible(!1);
  }
  RefreshByData(i) {
    (this.n_a = i), this.mGe(), this.Pqe(), this.jqe();
  }
  mGe() {
    this.s_a.SetTitleByTextId(this.n_a.Title);
  }
  Pqe() {
    var i = this.n_a.SubTitle,
      t = this.n_a.Description,
      e = !StringUtils_1.StringUtils.IsEmpty(i);
    this.s_a.SetSubTitleVisible(e),
      e && this.s_a.SetSubTitleByTextId(i),
      this.a_a.SetContentByTextId(t);
  }
  jqe() {}
}
exports.ActivityRecallAreaActivityInfoPanel =
  ActivityRecallAreaActivityInfoPanel;
//# sourceMappingURL=ActivityRecallAreaActivityInfoPanel.js.map
