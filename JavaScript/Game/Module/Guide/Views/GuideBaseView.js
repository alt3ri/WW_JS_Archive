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
      (this.Czt = 0),
      (this.gzt = !1),
      (this.fzt = void 0),
      (this.pzt = void 0),
      (this.TimeTicker = void 0),
      (this.vzt = void 0),
      (this.Mzt = (i) => {
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
          this.OnCheckBaseViewFinishConditionFail() && this.Ezt();
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
                : 0) <= 0 && this.Szt(),
              (this.RemainDuration = t),
              this.OnDurationChange(t);
          }
          this.IsShow && ((this.Czt -= e), this.yzt());
        }
      });
  }
  get TotalDuration() {
    return this.GuideStepInfo ? this.GuideStepInfo.Config.Duration : 0;
  }
  yzt() {
    var i,
      e = this.GuideStepInfo.Config;
    this.fzt ||
      ((i = e.SuccessCondition) &&
        ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
          i.toString(),
          void 0,
        ) &&
        this.OnFinishConditionOk()),
      this.pzt ||
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
      this.Mzt,
    ),
      this.OnGuideBaseViewAddEvent();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnUiScreenRootVisibleChange,
      this.Mzt,
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
      ((this.IsFinished = !0), this.OnGuideViewCloseWhenFinish(), this.Ezt());
  }
  Ezt() {
    var i = this.Czt;
    i < TimerSystem_1.MIN_TIME
      ? this.eNt()
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            "[DoClose]引导步骤完成, 但显示时长未达到配置的最小显示时间",
            ["步骤Id", this.GuideStepInfo.Id],
            ["剩余倒计时", i],
          ),
        TimerSystem_1.TimerSystem.Delay(() => {
          this.eNt();
        }, i));
  }
  eNt() {
    this.TimeTicker && (this.TimeTicker.Remove(), (this.TimeTicker = void 0)),
      this.CloseMe();
  }
  BindInput(e, t, i) {
    if (e.length === t.length && this.vzt !== i) {
      this.vzt = i;
      for (let i = 0; i < t.length; i++) {
        var s = e[i];
        Object.values(InputMappingsDefine_1.actionMappings).includes(s)
          ? (InputDistributeController_1.InputDistributeController.BindAction(
              t[i],
              this.vzt,
            ),
            this.CombineInputMap.set(t[i], 1))
          : Object.values(InputMappingsDefine_1.axisMappings).includes(s)
            ? (InputDistributeController_1.InputDistributeController.BindAxis(
                t[i],
                this.vzt,
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
    if (e.length === t.length && this.vzt) {
      for (let i = 0; i < t.length; i++) {
        var s = e[i];
        Object.values(InputMappingsDefine_1.actionMappings).includes(s)
          ? InputDistributeController_1.InputDistributeController.UnBindAction(
              t[i],
              this.vzt,
            )
          : Object.values(InputMappingsDefine_1.axisMappings).includes(s)
            ? InputDistributeController_1.InputDistributeController.UnBindAxis(
                t[i],
                this.vzt,
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
      this.vzt = void 0;
    }
  }
  OnBeforeCreate() {
    (this.gzt = !1),
      (this.GuideStepInfo = this.OpenParam),
      (this.RemainDuration = this.TotalDuration),
      (this.Czt = this.GuideStepInfo.Config.MinDuration),
      this.GuideStepInfo.AssignGuideView(this),
      this.Izt(),
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
      this.Izt(),
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
      this.Tzt(),
      this.OnGuideBaseViewAfterHide();
  }
  Izt() {
    var i, e;
    this.gzt ||
      ((this.gzt = !0),
      (i = this.GuideStepInfo.Config).SuccessCondition &&
        ((e = new LevelConditionRegistry_1.ConditionPassCallback(
          this.OnFinishConditionOk,
        )),
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
          i.SuccessCondition,
          e,
        )) &&
        (this.fzt = e),
      i.FailureCondition &&
        ((e = new LevelConditionRegistry_1.ConditionPassCallback(
          this.OnFinishConditionFail,
        )),
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
          i.FailureCondition,
          e,
        )) &&
        (this.pzt = e));
  }
  Tzt() {
    var i;
    this.gzt &&
      ((this.gzt = !1),
      (i = this.GuideStepInfo.Config).SuccessCondition &&
        this.fzt &&
        (LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(
          i.SuccessCondition,
          this.fzt,
        ),
        (this.fzt = void 0)),
      i.FailureCondition) &&
      this.pzt &&
      (LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(
        i.FailureCondition,
        this.pzt,
      ),
      (this.pzt = void 0));
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
  Szt() {
    this.eNt();
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
