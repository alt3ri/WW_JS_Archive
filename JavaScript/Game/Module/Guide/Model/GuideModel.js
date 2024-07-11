"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GuideController_1 = require("../GuideController"),
  GuideGroupInfo_1 = require("./GuideGroupInfo");
class GuideModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.IsGmInvoke = !1),
      (this.BJt = void 0),
      (this.bJt = void 0),
      (this.CurrentGroupMap = void 0),
      (this.qJt = void 0),
      (this.GJt = void 0),
      (this.NJt = void 0),
      (this.OJt = !1),
      (this.kJt = void 0),
      (this.FJt = 0),
      (this.VJt = (i) => {
        for (let i = 0; i < this.qJt.length; i++)
          this.qJt[i].Tick(TimerSystem_1.MIN_TIME) &&
            (this.qJt.splice(i, 1), this.TryPauseTimer(), i--);
      });
  }
  get IsGuideLockingInput() {
    return 0 < this.FJt;
  }
  AddGuideLockInput() {
    this.FJt++ || this.HJt();
  }
  RemoveGuideLockInput() {
    --this.FJt || this.HJt();
  }
  HJt() {
    UiLayer_1.UiLayer.SetShowNormalMaskLayer(this.IsGuideLockingInput, "Guide"),
      ModelManager_1.ModelManager.InputDistributeModel?.RefreshInputDistributeTag();
  }
  OnInit() {
    (this.bJt = new Set()), (this.BJt = new Set());
    for (const i of ConfigManager_1.ConfigManager.GuideConfig.GetAllGroup())
      i.ResetInDungeon && this.BJt.add(i.Id);
    return (
      (this.CurrentGroupMap = new Map()),
      (this.kJt = new Map([
        [4, void 0],
        [1, void 0],
      ])),
      (this.FJt = 0),
      !(this.IsGmInvoke = !1)
    );
  }
  CheckGuideInfoExist(i) {
    return this.CurrentGroupMap.has(i);
  }
  static IsLocked() {
    return GuideModel.IsGmLock || GuideModel.IsLock;
  }
  SetLock(i) {
    i !== GuideModel.IsLock &&
      (i && this.ClearAllGroup(), (GuideModel.IsLock = i));
  }
  SetGmLock(i) {
    i !== GuideModel.IsGmLock &&
      (i && this.ClearAllGroup(), (GuideModel.IsGmLock = i));
  }
  AddTutorialInfo(i) {
    this.qJt || (this.qJt = []),
      this.qJt.push(i),
      this.GJt ||
        (this.GJt = TimerSystem_1.TimerSystem.Forever(
          this.VJt,
          TimerSystem_1.MIN_TIME,
        )),
      this.TryShowTutorial();
  }
  TryShowTutorial() {
    var i;
    this.qJt.length <= 0 ||
      ((i = this.qJt[this.qJt.length - 1]),
      this.NJt &&
        (2 === this.NJt.TipState ||
          (i.TutorialTip && 1 !== this.NJt.TipState))) ||
      this.jJt(i);
  }
  jJt(i) {
    (this.NJt = i),
      UiManager_1.UiManager.IsViewOpen("GuideTutorialTipsView") &&
        UiManager_1.UiManager.CloseView("GuideTutorialTipsView"),
      this.NJt.TutorialTip
        ? (this.WJt(),
          UiManager_1.UiManager.OpenView("GuideTutorialTipsView", this.NJt))
        : (this.TryPauseTimer(), this.TryShowGuideTutorialView());
  }
  TryShowGuideTutorialView() {
    UiManager_1.UiManager.OpenView("GuideTutorialView", this.NJt, (i) => {
      this.OJt = !i && !UiManager_1.UiManager.IsViewOpen("GuideTutorialView");
    });
  }
  ShowFailedOpenTutorialView() {
    this.OJt && this.TryShowGuideTutorialView();
  }
  ClipTipState() {
    for (const i of this.qJt) 0 === i.TipState && (i.TipState = 1);
  }
  RemoveCurrentTutorialInfo() {
    var i = this.qJt.indexOf(this.NJt);
    (this.NJt = void 0),
      0 <= i &&
        (this.qJt[i].StopGuide(), this.qJt.splice(i, 1), this.TryPauseTimer());
  }
  HaveCurrentTutorial() {
    return void 0 !== this.NJt;
  }
  TryPauseTimer() {
    this.GJt &&
      !this.GJt.IsPause() &&
      (0 === this.qJt.length || (this.NJt && 2 === this.NJt.TipState)) &&
      TimerSystem_1.TimerSystem.Pause(this.GJt);
  }
  WJt() {
    this.GJt &&
      this.GJt.IsPause() &&
      this.qJt.length &&
      (!this.NJt || 2 !== this.NJt.TipState) &&
      (TimerSystem_1.TimerSystem.Has(this.GJt)
        ? TimerSystem_1.TimerSystem.Resume(this.GJt)
        : (this.GJt = TimerSystem_1.TimerSystem.Forever(
            this.VJt,
            TimerSystem_1.MIN_TIME,
          )));
  }
  BreakTypeViewStep(i) {
    this.kJt.get(i)?.SwitchState(3), this.kJt.set(i, void 0);
  }
  OpenGuideView(i) {
    var e = i.Config.ContentType;
    this.kJt.set(e, i),
      4 === e
        ? UiManager_1.UiManager.OpenView("GuideFocusView", i)
        : UiManager_1.UiManager.OpenView("GuideTipsView", i);
  }
  RemoveStepViewSingletonMap(i) {
    var e = i.Config.ContentType;
    this.kJt.get(e) === i && this.kJt.set(e, void 0);
  }
  EnsureCurrentDungeonId() {
    const e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    for (var [i, t] of this.CurrentGroupMap)
      ConfigManager_1.ConfigManager.GuideConfig.GetGroup(i)?.DungeonId.find(
        (i) => i === e,
      ) ||
        (t.Reset(),
        this.CurrentGroupMap.delete(i),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            "进入副本时清除不属于当前副本的引导数据",
            ["groupId", i],
          ));
    for (const r of this.BJt)
      ConfigManager_1.ConfigManager.GuideConfig.GetGroup(r)?.DungeonId.find(
        (i) => i === e,
      ) && GuideController_1.GuideController.ResetFinishedGuide(r);
  }
  GmResetAllGuideGroup() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Guide",
        17,
        "通过GM命令清除了本地缓存的所有已完成引导数据, 同时所有执行中引导状态被重置, 重登后恢复",
      ),
      this.bJt.clear(),
      this.ClearAllGroup();
  }
  ClearAllGroup() {
    this.CurrentGroupMap.forEach((i) => {
      i.Reset();
    }),
      this.CurrentGroupMap.clear();
  }
  FinishGroup(i) {
    var e = this.CurrentGroupMap.get(i);
    e && (e.Reset(), this.CurrentGroupMap.delete(i)), this.bJt.add(i);
  }
  ResetFinishedGuide(i) {
    this.bJt.delete(i);
  }
  IsGroupFinished(i) {
    return this.bJt?.has(i);
  }
  CanGroupInvoke(i) {
    return !this.IsGroupFinished(i) || this.IsGroupCanRepeat(i);
  }
  IsGroupCanRepeat(i) {
    var e =
      ConfigManager_1.ConfigManager.GuideConfig.GetLimitRepeatStepSetOfGroup(i);
    return (
      0 === e.size ||
      !(
        e.has(-1) ||
        (this.CheckGuideInfoExist(i) &&
          this.CurrentGroupMap.get(i).HasAnyFinishedStep(e))
      )
    );
  }
  TryGetGuideGroup(i) {
    if (this.CheckGuideInfoExist(i)) return this.CurrentGroupMap.get(i);
    if (GuideModel.IsLocked())
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Guide", 17, "引导当前处于屏蔽状态, 无法创建");
    else {
      var e = ConfigManager_1.ConfigManager.GuideConfig.GetGroup(i);
      if (e)
        if (this.CanGroupInvoke(i)) {
          var t = e.OnlineMode;
          if (GuideController_1.GuideController.CheckAvailableWhenOnline(t)) {
            var r,
              s = e.OpenLimitCondition;
            if (
              !s ||
              this.IsGmInvoke ||
              ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
                s.toString(),
                void 0,
              )
            ) {
              const o =
                ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
              if (e.DungeonId.find((i) => i === o))
                return (
                  (r = new GuideGroupInfo_1.GuideGroupInfo(i)),
                  this.CurrentGroupMap.set(r.Id, r),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Guide", 17, "创建引导组数据成功", [
                      "组Id",
                      i,
                    ]),
                  r
                );
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Guide",
                  17,
                  "引导组的副本Id与当前所在副本不匹配",
                  ["组Id", i],
                  ["当前所在副本Id", o],
                  ["配置副本Id", e.DungeonId],
                );
            } else
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "Guide",
                  17,
                  "引导组的入队条件组不通过",
                  ["组Id", i],
                  ["conditionGroupId", s],
                );
          } else
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                65,
                "引导组用于是否联机的情况不匹配",
                ["组Id", i],
                ["OnlineMode", t],
                [
                  "是否处于联机",
                  ModelManager_1.ModelManager.GameModeModel.IsMulti,
                ],
              );
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Guide",
              17,
              "引导组服务端已记录完成且未配置为可重复完成, 不能重复执行",
              ["组Id", i],
            );
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Guide", 17, "引导组的客户端配置不存在, 无法创建", [
            "组Id",
            i,
          ]);
    }
  }
  SwitchGroupState(i, e) {
    var t = this.CurrentGroupMap.get(i);
    t
      ? t.SwitchState(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Guide", 17, "引导组数据未创建", ["组Id", i]);
  }
  CheckGroupStatus(i, e, t) {
    if (!this.bJt)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "无法判定引导组状态, 引导数据尚未初始化",
            ["groupId", i],
            ["status", e],
            ["operator", t],
          ),
        !1
      );
    if (!ConfigManager_1.ConfigManager.GuideConfig.GetGroup(i))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "不存在ID的引导组数据, 请策划检查配置是否有误！",
            ["组Id", i],
          ),
        !1
      );
    let r = 0;
    return (
      this.bJt.has(i)
        ? (r = 4)
        : (i = this.CurrentGroupMap.get(i)) &&
          (r = i.StateMachine.CurrentState),
      GuideModel.KJt(r, e, t)
    );
  }
  static KJt(i, e, t) {
    return "" === t
      ? i === e
      : "!=" === t
        ? i !== e
        : ">" === t
          ? e < i
          : ">=" === t
            ? e <= i
            : "<" === t
              ? i < e
              : "<=" === t && i <= e;
  }
  OnClear() {
    return (
      this.bJt.clear(),
      this.CurrentGroupMap.clear(),
      this.BJt.clear(),
      this.qJt && (this.qJt.length = 0),
      this.GJt && TimerSystem_1.TimerSystem.Remove(this.GJt),
      (this.bJt = void 0),
      (this.CurrentGroupMap = void 0),
      (this.BJt = void 0),
      (this.qJt = void 0),
      (this.NJt = void 0),
      (this.GJt = void 0),
      !(this.OJt = !1)
    );
  }
  GetRunningGroupIdList() {
    var i,
      e,
      t = [];
    for ([i, e] of this.CurrentGroupMap) e.CheckIsGuideRunning() && t.push(i);
    return t;
  }
}
((exports.GuideModel = GuideModel).IsLock = !1), (GuideModel.IsGmLock = !1);
//# sourceMappingURL=GuideModel.js.map
