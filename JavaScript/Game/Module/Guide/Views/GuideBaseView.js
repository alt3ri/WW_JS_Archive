"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideBaseView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LevelConditionRegistry_1 = require("../../../LevelGamePlay/LevelConditions/LevelConditionRegistry"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTimeDilation_1 = require("../../../Ui/Base/UiTimeDilation"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  guideConflictView = new Set([
    "MonthCardRewardView",
    "LoadingView",
    "QuestRewardView",
    "ExploreRewardView",
    "CommonRewardView",
    "ItemTipsView",
  ]);
class GuideBaseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.IgnoreState = !1),
      (this.IsFinished = !1),
      (this.GuideStepInfo = void 0),
      (this.CombineInputMap = new Map()),
      (this.RemainDuration = 0),
      (this.CJt = 0),
      (this.gJt = !1),
      (this.fJt = void 0),
      (this.pJt = void 0),
      (this.TimeTicker = void 0),
      (this.vJt = void 0),
      (this.MJt = (i) => {
        this.GetActive() && (i ? this.OnAfterShow() : this.OnAfterHide());
      }),
      (this.OnFinishConditionOk = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            "引导步骤  成功结束条件达成",
            ["this.GuideStepInfo!.Id", this.GuideStepInfo.Id],
            ["结束条件id", this.GuideStepInfo.Config.SuccessCondition],
          ),
          this.OnCheckBaseViewFinishConditionOk() && this.DoCloseByFinished();
      }),
      (this.OnFinishConditionFail = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            "引导步骤  失败结束条件达成",
            ["this.GuideStepInfo!.Id", this.GuideStepInfo.Id],
            ["结束条件id", this.GuideStepInfo.Config.FailureCondition],
          ),
          this.OnCheckBaseViewFinishConditionFail() && this.SJt();
      }),
      (this.OnTick = (e) => {
        if (!UiManager_1.UiManager.IsViewShow("LoadingView")) {
          this.OnGuideBaseViewTick(e);
          var t = this.RemainDuration;
          if (t && 0 < t) {
            let i = e;
            (t -= i =
              !this.GuideStepInfo?.ViewData?.IsAttachToBattleView || this.IsShow
                ? i
                : 0) <= 0 && this.EJt(),
              (this.RemainDuration = t),
              this.OnDurationChange(t);
          }
          this.IsShow && ((this.CJt -= e), this.yJt());
        }
      });
  }
  get TotalDuration() {
    return this.GuideStepInfo ? this.GuideStepInfo.Config.Duration : 0;
  }
  yJt() {
    var i,
      e = this.GuideStepInfo.Config;
    this.fJt ||
      ((i = e.SuccessCondition) &&
        ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
          i.toString(),
          void 0,
        ) &&
        this.OnFinishConditionOk()),
      this.pJt ||
        ((i = e.FailureCondition) &&
          ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
            i.toString(),
            void 0,
          ) &&
          this.OnFinishConditionFail());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnUiScreenRootVisibleChange,
      this.MJt,
    ),
      this.OnGuideBaseViewAddEvent();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnUiScreenRootVisibleChange,
      this.MJt,
    ),
      this.OnGuideBaseViewRemoveEvent();
  }
  HasConflictView() {
    for (const i of guideConflictView)
      if (UiManager_1.UiManager.IsViewShow(i)) return !0;
    return !1;
  }
  DoCloseByFinished() {
    this.IsFinished ||
      ((this.IsFinished = !0), this.OnGuideViewCloseWhenFinish(), this.SJt());
  }
  SJt() {
    var i = this.CJt;
    i < TimerSystem_1.MIN_TIME
      ? this.Jqt()
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            "[DoClose]引导步骤完成, 但显示时长未达到配置的最小显示时间",
            ["步骤Id", this.GuideStepInfo.Id],
            ["剩余倒计时", i],
          ),
        TimerSystem_1.TimerSystem.Delay(() => {
          this.Jqt();
        }, i));
  }
  Jqt() {
    this.TimeTicker && (this.TimeTicker.Remove(), (this.TimeTicker = void 0)),
      this.CloseMe();
  }
  BindInput(e, t, i) {
    if (e.length === t.length && this.vJt !== i) {
      this.vJt = i;
      for (let i = 0; i < t.length; i++) {
        var s = e[i];
        Object.values(InputMappingsDefine_1.actionMappings).includes(s)
          ? (InputDistributeController_1.InputDistributeController.BindAction(
              t[i],
              this.vJt,
            ),
            this.CombineInputMap.set(t[i], 1))
          : Object.values(InputMappingsDefine_1.axisMappings).includes(s)
            ? (InputDistributeController_1.InputDistributeController.BindAxis(
                t[i],
                this.vJt,
              ),
              this.CombineInputMap.set(t[i], 0))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Guide",
                17,
                "引导步骤  填的操作映射未定义",
                ["this.GuideStepInfo!.Id", this.GuideStepInfo.Id],
                ["错误的操作映射", s],
              );
      }
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Guide",
          17,
          "引导界面绑定输入",
          ["步骤Id", this.GuideStepInfo.Id],
          ["输入", t],
        );
    }
  }
  IsAllCombineInputPass() {
    let i = !0;
    for (const s of this.CombineInputMap) {
      var e = s[0],
        t = s[1];
      Object.values(InputMappingsDefine_1.actionMappings).includes(e)
        ? (i = i && 1 !== t)
        : Object.values(InputMappingsDefine_1.axisMappings).includes(e) &&
          (i = i && 0 < t);
    }
    return i;
  }
  UnbindInput(e, t) {
    if (e.length === t.length && this.vJt) {
      for (let i = 0; i < t.length; i++) {
        var s = e[i];
        Object.values(InputMappingsDefine_1.actionMappings).includes(s)
          ? InputDistributeController_1.InputDistributeController.UnBindAction(
              t[i],
              this.vJt,
            )
          : Object.values(InputMappingsDefine_1.axisMappings).includes(s)
            ? InputDistributeController_1.InputDistributeController.UnBindAxis(
                t[i],
                this.vJt,
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Guide",
                17,
                "引导步骤  填的操作映射未定义",
                ["this.GuideStepInfo!.Id", this.GuideStepInfo.Id],
                ["错误的操作映射", s],
              ),
          this.CombineInputMap.delete(t[i]);
      }
      this.vJt = void 0;
    }
  }
  OnBeforeCreate() {
    (this.gJt = !1),
      (this.GuideStepInfo = this.OpenParam),
      (this.RemainDuration = this.TotalDuration),
      (this.CJt = this.GuideStepInfo.Config.MinDuration),
      this.GuideStepInfo.AssignGuideView(this),
      this.IJt(),
      this.OnBeforeGuideBaseViewCreate();
  }
  OnStart() {
    this.OnGuideBaseViewStart(),
      (this.TimeTicker = TimerSystem_1.TimerSystem.Forever(
        this.OnTick,
        TimerSystem_1.MIN_TIME,
      ));
  }
  OnAfterShow() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Guide", 17, "[引导界面基类:OnShow]", [
        "引导步骤",
        this.GuideStepInfo.Id,
      ]);
    var i = this.GuideStepInfo.Config,
      i =
        (i.IsDangerous &&
          LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
            "UiItem_Danger_Tip",
            this.RootItem,
          ),
        i.TimeScale);
    i < 1 &&
      !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      (InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      UiTimeDilation_1.UiTimeDilation.SetTimeDilationHighLevel(i, "GuideBase")),
      this.IJt(),
      this.OnGuideViewAfterShow();
  }
  OnAfterHide() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Guide", 17, "[引导界面基类:OnHide]", [
        "引导步骤",
        this.GuideStepInfo.Id,
      ]),
      this.GuideStepInfo.Config.TimeScale < 1 &&
        !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        (UiTimeDilation_1.UiTimeDilation.ResetTimeDilationHighLevel(
          "GuideBase",
        ),
        InputDistributeController_1.InputDistributeController.RefreshInputTag()),
      this.TJt(),
      this.OnGuideBaseViewAfterHide();
  }
  IJt() {
    var i, e;
    this.gJt ||
      ((this.gJt = !0),
      (i = this.GuideStepInfo.Config).SuccessCondition &&
        ((e = new LevelConditionRegistry_1.ConditionPassCallback(
          this.OnFinishConditionOk,
        )),
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
          i.SuccessCondition,
          e,
        )) &&
        (this.fJt = e),
      i.FailureCondition &&
        ((e = new LevelConditionRegistry_1.ConditionPassCallback(
          this.OnFinishConditionFail,
        )),
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
          i.FailureCondition,
          e,
        )) &&
        (this.pJt = e));
  }
  TJt() {
    var i;
    this.gJt &&
      ((this.gJt = !1),
      (i = this.GuideStepInfo.Config).SuccessCondition &&
        this.fJt &&
        (LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(
          i.SuccessCondition,
          this.fJt,
        ),
        (this.fJt = void 0)),
      i.FailureCondition) &&
      this.pJt &&
      (LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(
        i.FailureCondition,
        this.pJt,
      ),
      (this.pJt = void 0));
  }
  OnBeforeDestroy() {
    this.TimeTicker && (this.TimeTicker.Remove(), (this.TimeTicker = void 0));
    var i = this.GuideStepInfo;
    this.OnGuideBaseViewDestroy(),
      this.IgnoreState ||
        (this.IsFinished
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Guide",
                17,
                "[OnDestroy]引导UI关闭时, 步骤已完成",
                ["步骤Id", i.Id],
              ),
            i.SwitchState(4))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Guide",
                17,
                "[OnDestroy]引导UI关闭时, 步骤未完成",
                ["步骤Id", i.Id],
              ),
            i.SwitchState(3)));
  }
  EJt() {
    this.Jqt();
  }
  OnBeforeGuideBaseViewCreate() {}
  OnGuideBaseViewStart() {}
  OnGuideBaseViewAfterHide() {}
  OnGuideViewAfterShow() {}
  OnGuideBaseViewDestroy() {}
  OnGuideBaseViewAddEvent() {}
  OnGuideBaseViewRemoveEvent() {}
  OnGuideBaseViewTick(i) {}
  OnDurationChange(i) {}
  OnGuideViewCloseWhenFinish() {}
  OnCheckBaseViewFinishConditionOk() {
    return !0;
  }
  OnCheckBaseViewFinishConditionFail() {
    return !0;
  }
}
exports.GuideBaseView = GuideBaseView;
//# sourceMappingURL=GuideBaseView.js.map
