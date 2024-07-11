"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallSubView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivityRecallHelper_1 = require("./Misc/ActivityRecallHelper"),
  ActivityRecallBottomPanel_1 = require("./Panels/ActivityRecallBottomPanel"),
  ActivityRecallEntryItemPanel_1 = require("./Panels/ActivityRecallEntryItemPanel");
class ActivityRecallSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.J1a = void 0),
      (this.G1a = void 0),
      (this.Zua = void 0),
      (this.eca = void 0),
      (this.z1a = new Map()),
      (this.Z1a = () => {
        UiManager_1.UiManager.OpenView("ActivityRecallMainView", 5);
      }),
      (this.e_a = () => {
        UiManager_1.UiManager.OpenView("ActivityRecallMainView", 4);
      }),
      (this.t_a = () => {
        var t = this.G1a.GetRecallTaskProgressFloat01();
        this.GetText(8).SetText(100 * t + "%");
      }),
      (this.itt = () => {
        this.bNe(), this.G1a && this.OnRefreshView();
      }),
      (this.cIa = () => {
        this.G1a && this.t_a();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[6, this.Z1a]]);
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(0),
      e =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        this.GetItem(1)),
      i =
        ((this.J1a =
          new ActivityRecallBottomPanel_1.ActivityRecallBottomPanel()),
        this.z1a.set(
          1,
          new ActivityRecallEntryItemPanel_1.ActivityRecallEntryItemPanel(),
        ),
        this.z1a.set(
          2,
          new ActivityRecallEntryItemPanel_1.ActivityRecallEntryItemPanel(),
        ),
        this.z1a.set(
          3,
          new ActivityRecallEntryItemPanel_1.ActivityRecallEntryItemPanel(),
        ),
        this.z1a.set(
          4,
          new ActivityRecallEntryItemPanel_1.ActivityRecallEntryItemPanel(),
        ),
        this.GetItem(4).GetOwner()),
      s = this.GetItem(3).GetOwner(),
      r = this.GetItem(5).GetOwner(),
      n = this.GetItem(2).GetOwner(),
      a = this.GetItem(9).GetOwner();
    this.Zua = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var h = this.GetItem(10).GetOwner();
    (this.eca = new ActivityRewardList_1.ActivityRewardList()),
      await Promise.all([
        this.LNe.CreateThenShowByActorAsync(t.GetOwner()),
        this.J1a.CreateThenShowByActorAsync(e.GetOwner()),
        ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallController.RequestGachaInfo(),
        this.Zua.CreateThenShowByActorAsync(a),
        this.eca.CreateThenShowByActorAsync(h),
        this.z1a.get(1).CreateByActorAsync(i),
        this.z1a.get(2).CreateByActorAsync(s),
        this.z1a.get(3).CreateByActorAsync(r),
        this.z1a.get(4).CreateByActorAsync(n),
      ]),
      this.eca.InitGridLayout(this.eca.InitCommonGridItem);
  }
  OnStart() {
    this.Zua.SetContentByTextId("Activity_101800001_Desc"),
      RedDotController_1.RedDotController.BindRedDot(
        "ActivityRecallSignEntry",
        this.GetItem(11),
      );
  }
  OnBeforeDestroy() {
    for (var [, t] of this.z1a) t.DestroyAsync();
    this.z1a.clear(),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "ActivityRecallSignEntry",
        this.GetItem(11),
      );
  }
  OnRefreshView() {
    this.bNe(), this.mGe(), this.i_a(), this.t_a(), this.jqe();
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
        this.cIa,
      ),
      this.J1a.BindCallback(this.e_a);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivityUpdate,
      this.itt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.cIa,
      ),
      this.J1a.UnBindCallBack();
  }
  mGe() {
    this.LNe.SetTitleByText(this.G1a.GetTitle());
    var [t, e] =
      ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(
        this.G1a,
      );
    this.LNe.SetTimeTextVisible(t), t && this.LNe.SetTimeTextByText(e);
  }
  i_a() {
    this.r_a(1), this.r_a(2), this.o_a();
  }
  r_a(t) {
    var e =
      ModelManager_1.ModelManager.ActivityRecallModel.GetRecallEntryConfigByEntryType(
        t,
      );
    this.z1a.get(t).RefreshData(t, e);
  }
  o_a() {
    var t =
        ActivityRecallHelper_1.ActivityRecallHelper.GetSortedOpenRecallEntryConfigList(),
      e = t[0],
      t = t[1];
    this.z1a.get(3).RefreshData(3, e), this.z1a.get(4).RefreshData(4, t);
  }
  bNe() {
    this.G1a = ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData;
  }
  jqe() {
    var t = this.ActivityBaseData.GetPreviewReward();
    this.eca.SetTitleByTextId("FragmentMemoryCollectReward"),
      this.eca.RefreshItemLayout(t);
  }
}
exports.ActivityRecallSubView = ActivityRecallSubView;
//# sourceMappingURL=ActivityRecallSubView.js.map
