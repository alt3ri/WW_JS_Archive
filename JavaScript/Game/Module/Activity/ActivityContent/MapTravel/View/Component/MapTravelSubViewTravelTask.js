"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTravelSubViewTravelTask = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  LevelGeneralCommons_1 = require("../../../../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  SkipTaskManager_1 = require("../../../../../SkipInterface/SkipTaskManager"),
  UiNavigationNewController_1 = require("../../../../../UiNavigation/New/UiNavigationNewController"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  DynScrollView_1 = require("../../../../../Util/ScrollView/DynScrollView"),
  GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew"),
  ActivitySmallItemGrid_1 = require("../../../UniversalComponents/ActivitySmallItemGrid"),
  ActivityMapTravelController_1 = require("../../ActivityMapTravelController"),
  ActivityMapTravelDefine_1 = require("../../ActivityMapTravelDefine"),
  MapTravelTabDynamicItem_1 = require("./MapTravelTabDynamicItem"),
  MapTravelTabDynamicScrollItem_1 = require("./MapTravelTabDynamicScrollItem"),
  MapTravelTaskItem_1 = require("./MapTravelTaskItem"),
  LAYOUT_PADDING = 20;
class MapTravelSubViewTravelTask extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.ActivityBaseData = t),
      (this.AreaLayoutList = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.TabLayout = void 0),
      (this.MVl = void 0),
      (this.EVl = []),
      (this.fVl = -1),
      (this.B5l = !1),
      (this.sGe = () => {
        return new AreaLayout(this.ActivityBaseData);
      }),
      (this.Hwn = (t, i, e) => {
        var s =
          new MapTravelTabDynamicScrollItem_1.MapTravelTabDynamicScrollItem(
            this.ActivityBaseData,
          );
        return (
          s.BindSelectedCallBack(this.pVl), s.BindIsSelectedOn(this.IVl), s
        );
      }),
      (this.OnMapTravelTaskNavigationNext = () => {
        var t = this.AreaLayoutList.GetScrollItemByIndex(
          this.fVl,
        ).GetFirstItem();
        t &&
          UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
            t,
          );
      }),
      (this.RefreshCurrent = () => {
        this.MVl?.Refresh();
        var t = this.ActivityBaseData.GetAllAreaData().filter(
          (t) => 0 < t.TravelTaskIdSet.size,
        );
        this.TabLayout.RefreshByData(t, !0, !1),
          this.AreaLayoutList.RefreshByDataAsync(t, !0);
      }),
      (this.TVl = () => {
        if (!this.B5l) {
          var i,
            e = this.GetItem(6).GetAnchorOffsetY(),
            s = this.TabLayout.GetDisplayGridStartIndex(),
            r = this.TabLayout.GetDisplayGridEndIndex();
          for (let t = 0; t < this.EVl.length; t++)
            if (this.EVl[t] <= e && e < this.EVl[t + 1])
              return t === this.fVl
                ? void 0
                : (this.XN(this.fVl, !1, !1),
                  (t < s || t > r) &&
                    ((i = 0 === t ? 0 : (t + 1) / (this.EVl.length - 1)),
                    this.GetUIDynScrollViewComponent(1).SetScrollProgress(i)),
                  (this.fVl = t),
                  void this.XN(this.fVl, !0, !1));
        }
      }),
      (this.pVl = (t, i) => {
        i !== this.fVl && this.XN(this.fVl, !1, !1),
          (this.fVl = i),
          this.GetScrollViewWithScrollbar(3).StopMovement(),
          this.q5l(i);
      }),
      (this.IVl = (t, i) => this.fVl === i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIDynScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIScrollViewWithScrollbarComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = [];
    (this.MVl = new RewardPanel(this.ActivityBaseData)),
      t.push(this.MVl.CreateByActorAsync(this.GetItem(0).GetOwner())),
      this.AddChild(this.MVl),
      (this.AreaLayoutList = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(3),
        this.sGe,
      )),
      this.AreaLayoutList.BindScrollValueChange(this.TVl),
      (this.TabLayout = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(1),
        this.GetItem(2),
        new MapTravelTabDynamicItem_1.MapTravelTabDynamicItem(),
        this.Hwn,
      )),
      t.push(this.TabLayout.Init()),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      await Promise.all(t);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MapTravelTaskRefresh,
      this.RefreshCurrent,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MapTravelTaskNavigationNext,
        this.OnMapTravelTaskNavigationNext,
      );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MapTravelTaskRefresh,
      this.RefreshCurrent,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MapTravelTaskNavigationNext,
        this.OnMapTravelTaskNavigationNext,
      );
  }
  OnStart() {}
  async bl() {
    var i = this.ActivityBaseData.GetAllAreaData().filter(
      (t) => 0 < t.TravelTaskIdSet.size,
    );
    let e = 0;
    for (let t = 0; t < i.length; t++)
      if (this.ActivityBaseData.GetAreaNewUnlockState(i[t].AreaId)) {
        e = t;
        break;
      }
    this.TabLayout.RefreshByData(i, !1),
      await this.AreaLayoutList.RefreshByDataAsync(i, !1);
    var t = [];
    for (const r of this.AreaLayoutList.GetScrollItemList())
      t.push(r.WaitRefreshDone());
    await Promise.all(t), this.bVl(i);
    var s = 0 === (this.fVl = e) ? 0 : (e + 1) / (this.EVl.length - 1);
    this.GetUIDynScrollViewComponent(1).SetScrollProgress(s),
      this.XN(e, !0, !1),
      this.AreaLayoutList.BindLateUpdate(() => {
        this.q5l(e), this.AreaLayoutList.UnBindLateUpdate();
      });
  }
  bVl(t) {
    this.EVl.length = 0;
    var i,
      e = this.GetScrollViewWithScrollbar(3).RootUIComp.GetHeight(),
      s = this.AreaLayoutList.GetScrollItemList();
    let r = 0,
      a = 0;
    this.EVl.push(-MathUtils_1.MathUtils.Int32Max);
    for (let t = 0; t < s.length; t++)
      t === s.length - 1
        ? ((r += s[t].GetRootItem().GetHeight()),
          (a = s[t].GetRootItem().GetHeight()))
        : ((r += s[t].GetRootItem().GetHeight() + LAYOUT_PADDING),
          this.EVl.push(r));
    this.EVl.push(MathUtils_1.MathUtils.Int32Max),
      a >= e
        ? ((i = a % e), this.GetItem(5).SetHeight(i))
        : ((i = e - a), this.GetItem(5).SetHeight(i)),
      this.GetItem(5).SetHierarchyIndex(t.length + 1);
  }
  XN(t, i, e) {
    this.TabLayout.GetScrollItemFromIndex(t)?.SetSelected(i, e);
  }
  q5l(t) {
    t = Math.max(this.EVl[t], 0);
    this.GetItem(6).SetAnchorOffsetY(t);
  }
  async PlayStartSequence() {
    (this.B5l = !0),
      this.bl(),
      await this.LevelSequencePlayer.PlaySequenceAsync(
        "Start",
        new CustomPromise_1.CustomPromise(),
        !0,
      ),
      (this.B5l = !1);
  }
  async PlayCloseSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync(
      "Close",
      new CustomPromise_1.CustomPromise(),
      !0,
    ),
      this.yjl();
  }
  yjl() {
    this.XN(this.fVl, !1, !1), (this.fVl = -1);
  }
}
exports.MapTravelSubViewTravelTask = MapTravelSubViewTravelTask;
class RewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.ActivityBaseData = t),
      (this.gOe = void 0),
      (this.UFe = () => {
        ActivityMapTravelController_1.ActivityMapTravelController.RequestTakeTaskFinalReward();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.UFe]]);
  }
  async OnBeforeStartAsync() {
    var t = new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    await t.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.gOe = t);
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    var t = this.ActivityBaseData.GetActivityConfig(),
      i = this.ActivityBaseData.TaskFinalRewardData,
      t =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
          t.FinalRewardId,
        )[0],
      e = i.Current === i.Target,
      s = i.IsReceived,
      i =
        (this.GetSprite(3).SetFillAmount(i.Current / i.Target),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(5),
          "MapTravelAllTaskProgress_Text",
          i.Current,
          i.Target,
        ),
        this.GetButton(1).RootUIComp.SetUIActive(e && !s),
        this.GetItem(4).SetUIActive(!e),
        this.GetItem(2).SetUIActive(s),
        { Item: t, HasClaimed: s });
    this.gOe.Refresh(i);
  }
}
class AreaLayout extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super(),
      (this.ActivityBaseData = t),
      (this.TaskLayout = void 0),
      (this.fuo = void 0),
      (this.Sjl = void 0),
      (this.v$e = !1),
      (this.gQl = !1),
      (this.LevelSequencePlayer = void 0),
      (this.sGe = () => {
        return new TaskNormalItem(this.ActivityBaseData);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    (this.fuo = new TaskLockItem(this.ActivityBaseData)),
      await this.fuo.CreateByActorAsync(this.GetItem(3).GetOwner()),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      ));
  }
  OnStart() {
    this.TaskLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(1),
      this.sGe,
    );
  }
  Refresh(t) {
    (this.v$e = !0), (this.gQl = t.IsUnlock);
    var i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t.AreaId),
      e = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAreaConfig(
        t.AreaId,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.Title);
    let s = !0;
    for (const a of t.TravelTaskIdSet)
      if (2 !== this.ActivityBaseData.AreaTaskMap.get(a).Status) {
        s = !1;
        break;
      }
    this.GetText(0).SetChangeColor(!t.IsUnlock, this.GetText(0).changeColor),
      this.GetTexture(7).SetChangeColor(
        !t.IsUnlock,
        this.GetTexture(7).changeColor,
      ),
      this.GetItem(5).SetUIActive(!t.IsUnlock),
      this.GetItem(6).SetUIActive(s);
    let r = [];
    this.fuo.SetActive(!t.IsUnlock),
      t.IsUnlock
        ? (this.LVl(t),
          (r = this.ActivityBaseData.GetAreaTaskDataList(t.AreaId)))
        : (((i = new ActivityMapTravelDefine_1.MapTravelLockAreaData(
            t.AreaId,
          )).ConditionGroupId = e.UnLockCondition),
          (i.JumpId = e.UnlockAccessId),
          this.fuo.Refresh(i)),
      this.TaskLayout.RefreshByData(
        r,
        () => {
          (this.v$e = !1),
            this.TaskLayout.BindLateUpdate(() => {
              this.TaskLayout.UnBindLateUpdate(), this.Sjl?.SetResult();
            });
        },
        !1,
      );
  }
  async WaitRefreshDone() {
    this.v$e &&
      ((this.Sjl = new CustomPromise_1.CustomPromise()),
      await this.Sjl?.Promise);
  }
  LVl(t) {
    this.ActivityBaseData.GetAreaNewUnlockState(t.AreaId) &&
      (this.ActivityBaseData.SaveFirstCheckRedDotState(5, t.AreaId),
      this.LevelSequencePlayer.PlayLevelSequenceByName("Unlock", !0));
  }
  GetFirstItem() {
    return this.gQl
      ? this.TaskLayout.GetItemByIndex(0)
      : this.fuo?.GetRootItem();
  }
}
class TaskNormalItem extends MapTravelTaskItem_1.TaskItemBase {
  constructor() {
    super(...arguments),
      (this.TaskData = void 0),
      (this.OnClickedButton = () => {
        var t =
          ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetTravelTaskConfig(
            this.TaskData.Id,
          );
        t.JumpId && SkipTaskManager_1.SkipTaskManager.RunByConfigId(t.JumpId);
      }),
      (this.OnClickedRewardButton = () => {
        ActivityMapTravelController_1.ActivityMapTravelController.RequestTakeTravelTaskReward(
          this.TaskData.Id,
        );
      });
  }
  Refresh(t) {
    this.TaskData = t;
    var i =
        ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetTravelTaskConfig(
          this.TaskData.Id,
        ),
      e = 2 === t.Status,
      s = 0 < i.JumpId && 1 === t.Status,
      r = 0 === t.Status;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.Name),
      this.GetText(1).SetText(Math.min(t.Current, t.Target) + "/" + t.Target),
      this.SVl(i.TaskReward),
      this.ButtonItem.SetUiActive(s),
      this.RewardButtonItem.SetUiActive(r),
      this.GetItem(6).SetUIActive(0 === i.JumpId && !e),
      this.GetItem(5).SetUIActive(e);
  }
  SVl(t) {
    var i = [];
    for (const s of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
      t,
    )) {
      var e = { Item: s, HasClaimed: 2 === this.TaskData.Status };
      i.push(e);
    }
    this.RewardScrollView.RefreshByData(i);
  }
}
class TaskLockItem extends MapTravelTaskItem_1.TaskItemBase {
  constructor() {
    super(...arguments),
      (this.TaskData = void 0),
      (this.OnClickedButton = () => {
        this.TaskData.JumpId &&
          SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.TaskData.JumpId);
      });
  }
  Refresh(t) {
    (this.TaskData = t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
          t.ConditionGroupId,
        ) ?? "",
      ),
      this.GetText(1).SetUIActive(!1),
      this.ButtonItem.SetUiActive(0 < t.JumpId),
      this.GetItem(6).SetUIActive(0 === t.JumpId),
      this.GetItem(5).SetUIActive(!0);
  }
}
//# sourceMappingURL=MapTravelSubViewTravelTask.js.map
