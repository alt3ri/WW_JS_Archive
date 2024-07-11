"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardTargetTabView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../../../../Ui/Base/UiTabViewBase"),
  UiTabSequence_1 = require("../../../../../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
  GenericLayout_1 = require("../../../../../../Util/Layout/GenericLayout"),
  LoopScrollView_1 = require("../../../../../../Util/ScrollView/LoopScrollView"),
  TaskItem_1 = require("../../../../Common/TaskItem/TaskItem"),
  MoonChasingRewardDefine_1 = require("../MoonChasingRewardDefine"),
  RewardTargetTabItem_1 = require("./RewardTargetTabItem");
class RewardTargetTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.TabLayout = void 0),
      (this.dla = -1),
      (this.LoopScroll = void 0),
      (this.ypt = []),
      (this.GIa = !0),
      (this.nOn = (e) => {
        ModelManager_1.ModelManager.MoonChasingRewardModel.GetTaskDataById(e) &&
          (this.TabLayout.GetLayoutItemByIndex(this.dla).RefreshRedDot(),
          this.Sla(this.dla));
      }),
      (this.sOn = () => new TaskItem_1.TaskItem()),
      (this.fqe = () => new RewardTargetTabItem_1.RewardTargetTabItem()),
      (this.Wwn = (e) => {
        this.dla !== e &&
          -1 !== this.dla &&
          this.TabLayout.GetLayoutItemByIndex(this.dla)?.SetToggleState(!1, !1),
          (this.dla = e),
          this.Sla(this.dla);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    (this.GIa = this.ExtraParams ?? !0),
      (this.TabLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(0),
        this.fqe,
      )),
      (this.LoopScroll = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(2),
        this.GetItem(3).GetOwner(),
        this.sOn,
      ));
  }
  rOn(t) {
    var i = [];
    for (let e = 0; e < t.length; e++) {
      var s = new MoonChasingRewardDefine_1.RewardTabData();
      (s.NameTextId = t[e].Name),
        (s.Index = e),
        (s.ClickedCallback = this.Wwn),
        (s.RefreshRedDot = (e) =>
          ModelManager_1.ModelManager.MoonChasingRewardModel.GetTaskDataRedDotStateByTabId(
            e,
          )),
        i.push(s);
    }
    return i;
  }
  async OnBeforeShowAsyncImplement() {
    var e =
      ModelManager_1.ModelManager.MoonChasingRewardModel.GetRewardTargetTabList();
    await this.TabLayout.RefreshByDataAsync(this.rOn(e)),
      this.TabLayout.GetLayoutItemByIndex(0).SetToggleState(!0, !0);
  }
  OnBeforeShow() {
    this.GetTabBehavior(UiTabSequence_1.UiTabSequence)
      ?.GetLevelSequencePlayer()
      ?.PlayLevelSequenceByName("Start");
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TakenRewardTargetData,
      this.nOn,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TakenRewardTargetData,
      this.nOn,
    );
  }
  Sla(e) {
    this.ypt.length = 0;
    e = ModelManager_1.ModelManager.MoonChasingRewardModel.GetTaskDataByTabId(
      e + 1,
    ).sort(ModelManager_1.ModelManager.MoonChasingRewardModel.SortTaskData);
    if (this.GIa) this.ypt = e;
    else
      for (const i of e) {
        var t = i.DeepCopy(i);
        (t.JumpId = 0),
          (t.DoingTextId = "Moonfiesta_TargetDone"),
          this.ypt.push(t);
      }
    this.LoopScroll.RefreshByDataAsync(this.ypt, !1, !0);
  }
}
exports.RewardTargetTabView = RewardTargetTabView;
//# sourceMappingURL=RewardTargetTabView.js.map
