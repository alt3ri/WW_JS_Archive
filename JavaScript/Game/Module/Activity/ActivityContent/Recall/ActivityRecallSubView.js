"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallSubView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityRecallHelper_1 = require("./Misc/ActivityRecallHelper"),
  ActivityRecallEntryItemPanel_1 = require("./Panels/ActivityRecallEntryItemPanel");
class ActivityRecallSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.Kca = void 0),
      (this.tCa = void 0),
      (this.aPa = void 0),
      (this.lda = new Map()),
      (this._da = () => {
        UiManager_1.UiManager.OpenView("ActivityRecallMainView", 5);
      }),
      (this.uda = () => {
        UiManager_1.UiManager.OpenView("ActivityRecallMainView", 4);
      }),
      (this.cda = () => {
        var t = this.Kca.GetRecallTaskProgressFloat01();
        this.GetText(5).SetText(100 * t + "%"),
          this.GetTexture(7).SetFillAmount(t);
      }),
      (this.itt = () => {
        this.bNe(), this.Kca && this.OnRefreshView();
      }),
      (this.SDa = () => {
        this.Kca && this.cda();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[9, this._da]]);
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0),
      e =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(8)),
      e =
        ((this.aPa = new ButtonItem_1.ButtonItem(e)),
        this.aPa.SetFunction(this.uda),
        this.lda.set(
          1,
          new ActivityRecallEntryItemPanel_1.ActivityRecallEntryItemPanel(),
        ),
        this.lda.set(
          2,
          new ActivityRecallEntryItemPanel_1.ActivityRecallEntryItemPanel(),
        ),
        this.lda.set(
          3,
          new ActivityRecallEntryItemPanel_1.ActivityRecallEntryItemPanel(),
        ),
        this.GetItem(3).GetOwner()),
      i = this.GetItem(2).GetOwner(),
      s = this.GetItem(4).GetOwner(),
      n = this.GetItem(6).GetOwner();
    (this.tCa = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(t.GetOwner()),
        ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallController.RequestGachaInfo(),
        this.tCa.CreateThenShowByActorAsync(n),
        this.lda.get(1).CreateByActorAsync(e),
        this.lda.get(2).CreateByActorAsync(i),
        this.lda.get(3).CreateByActorAsync(s),
      ]);
  }
  OnStart() {
    this.tCa.SetContentByTextId("Activity_101800001_Desc"),
      RedDotController_1.RedDotController.BindRedDot(
        "ActivityRecallSignEntry",
        this.GetItem(10),
      ),
      this.aPa.BindRedDot("ActivityRecallTask");
  }
  OnBeforeDestroy() {
    for (var [, t] of this.lda) t.DestroyAsync();
    this.lda.clear(),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "ActivityRecallSignEntry",
        this.GetItem(10),
      ),
      this.aPa.UnBindRedDot();
  }
  OnRefreshView() {
    this.bNe(), this.mGe(), this.dda(), this.cda();
  }
  OnTimer(t) {
    this.mGe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivityUpdate,
      this.itt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.SDa,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivityUpdate,
      this.itt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.SDa,
      );
  }
  mGe() {
    this.LNe.SetTitleByText(this.Kca.GetTitle());
    var [t, e] =
      ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(
        this.Kca,
      );
    this.LNe.SetTimeTextVisible(t), t && this.LNe.SetTimeTextByText(e);
  }
  dda() {
    this.mda(1), this.mda(2), this.Cda();
  }
  mda(t) {
    var e =
      ModelManager_1.ModelManager.ActivityRecallModel.GetRecallEntryConfigByEntryType(
        t,
      );
    this.lda.get(t).RefreshData(t, e);
  }
  Cda() {
    var t =
      ActivityRecallHelper_1.ActivityRecallHelper.GetSortedOpenRecallEntryConfigList()[0];
    this.lda.get(3).RefreshData(3, t);
  }
  bNe() {
    this.Kca = ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData;
  }
}
exports.ActivityRecallSubView = ActivityRecallSubView;
//# sourceMappingURL=ActivityRecallSubView.js.map
