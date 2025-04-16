"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewMapExplore = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  ActivityManager_1 = require("../../ActivityManager"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivitySubMapExploreItem_1 = require("./ActivitySubMapExploreItem");
class ActivitySubViewMapExplore extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.s4e = void 0),
      (this.wVl = void 0),
      (this.kuc = void 0),
      (this.OnBtnJump = () => {
        var e = this.kuc?.RecommendAreaList;
        if (e?.length) {
          var i = this.GetJumpExploreInfo();
          if (i) {
            var t = i.AreaId;
            if (!ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(t)) {
              (e = e.indexOf(t)), (e = this.kuc?.SourceList[e]);
              if (e)
                return void SkipTaskManager_1.SkipTaskManager.RunByConfigId(e);
            }
            e = i
              .GetRecommendExploreItemDataList(!1)
              ?.find((e) => !e.IsCompleted());
            SkipTaskManager_1.SkipTaskManager.Run(23, t, e?.ExploreType);
          }
        }
      }),
      (this.Bqe = () => {
        var e = new ActivitySubMapExploreItem_1.ActivitySubMapExploreItem();
        return (e.GetRewardCallBack = this.rJs), e;
      }),
      (this.rJs = (e) => {
        ActivityManager_1.ActivityManager.GetActivityController(
          this.ActivityBaseData.Type,
        ).RequestGetReward(e.TaskId);
      }),
      (this.Ouc = () => {
        this.quc();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIScrollViewWithScrollbarComponent],
      [11, UE.UIItem],
      [12, UE.UIButtonComponent],
      [13, UE.UIText],
      [14, UE.UIItem],
      [15, UE.UITexture],
      [16, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[12, this.OnBtnJump]]);
  }
  GetJumpExploreInfo() {
    var e = this.kuc.RecommendAreaList;
    if (1 === e.length)
      return ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
        e[0],
      );
    let i = void 0;
    return (
      e.forEach((e) => {
        e =
          ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
            e,
          );
        e && (!i || e.GetProgress() < i.GetProgress()) && (i = e);
      }),
      i
    );
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      await ControllerHolder_1.ControllerHolder.ExploreProgressController.AllExploreProgressAsyncRequest(),
      (this.s4e = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(10),
        this.Bqe,
      )),
      (this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock()),
      await this.wVl.CreateByActorAsync(this.GetItem(14).GetOwner()),
      (this.wVl.ButtonCallBack = () => {
        ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityConditionView(
          this.ActivityBaseData.Id,
        );
      });
  }
  OnStart() {
    this.ActivityBaseData.IsFirstUnlockState(1) &&
      (this.ActivityBaseData.SetFirstUnlockState(2),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.ActivityBaseData.Id,
      ));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ActivityMapExploreStateUpdate,
      this.Ouc,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ActivityMapExploreStateUpdate,
      this.Ouc,
    );
  }
  OnRefreshView() {
    this.quc(),
      (this.kuc =
        ConfigManager_1.ConfigManager.ActivityMapExploreConfig.GetActivityInfo(
          this.ActivityBaseData.Id,
        ));
    var e = this.kuc,
      i = e.PercentDesc,
      t = e.AreaTitle,
      r = !!i && !!t,
      s = this.GetText(0),
      n = this.GetText(1),
      a = this.GetText(2),
      o =
        (r &&
          ((o = e.RecommendAreaList[0]),
          (i = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
            i,
            i,
          )),
          s.SetText(i),
          (i =
            ModelManager_1.ModelManager.ExploreProgressModel?.GetExploreAreaData(
              o,
            )?.GetProgress() ?? 0),
          n.SetText(i + "%"),
          a.ShowTextNew(t)),
        s.SetUIActive(r),
        n.SetUIActive(r),
        a.SetUIActive(r),
        this.GetText(3).ShowTextNew(e.MainTitle),
        this.UpdateRemainTime(),
        this.GetText(6).ShowTextNew(e.Desc),
        this.GetText(8).SetText(e.SumRewardNum.toString()),
        this.GetText(9).ShowTextNew(e.SumRewardDesc),
        this.GetText(13).ShowTextNew("Activity_Exploration_Go"),
        this.Guc(),
        this.GetTexture(16)),
      i = this.GetTexture(15);
    this.SetTextureShowUntilLoaded(e.Bg, o),
      this.SetTextureShowUntilLoaded(e.Bg, i);
  }
  UpdateRemainTime() {
    var e, i, t;
    this.ActivityBaseData &&
      (([e, i] =
        ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(
          this.ActivityBaseData,
        )),
      (t = this.GetText(4)).SetText(i),
      t.SetUIActive(e));
  }
  OnTimer(e) {
    this.UpdateRemainTime();
  }
  quc() {
    this.s4e?.SelectGridProxy(-1),
      this.s4e?.RefreshByData(this.ActivityBaseData.TaskList, void 0, !0);
  }
  Guc() {
    var e,
      i = this.ActivityBaseData.CanPreOpen();
    this.wVl.SetUiActive(!i),
      this.GetButton(12).RootUIComp.SetUIActive(i),
      i ||
        (this.wVl.SetButtonVisible(!0),
        (i = this.ActivityBaseData.HasPreOpenCondition()),
        (e = this.ActivityBaseData.PreOpenConditionGroupId),
        (i = i ? e : this.ActivityBaseData.ConditionGroupId) &&
          (e =
            LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
              i,
            )) &&
          this.wVl.SetTextByTextId(e));
  }
}
exports.ActivitySubViewMapExplore = ActivitySubViewMapExplore;
//# sourceMappingURL=ActivitySubViewMapExplore.js.map
