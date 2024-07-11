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
      (this.BYt = void 0),
      (this.bYt = void 0),
      (this.CurrentGroupMap = void 0),
      (this.qYt = void 0),
      (this.GYt = void 0),
      (this.NYt = void 0),
      (this.OYt = !1),
      (this.kYt = void 0),
      (this.FYt = 0),
      (this.VYt = (i) => {
        for (let i = 0; i < this.qYt.length; i++)
          this.qYt[i].Tick(TimerSystem_1.MIN_TIME) &&
            (this.qYt.splice(i, 1), this.TryPauseTimer(), i--);
      });
  }
  get IsGuideLockingInput() {
    return 0 < this.FYt;
  }
  AddGuideLockInput() {
    this.FYt++ || this.HYt();
  }
  RemoveGuideLockInput() {
    --this.FYt || this.HYt();
  }
  HYt() {
    UiLayer_1.UiLayer.SetShowNormalMaskLayer(this.IsGuideLockingInput, "Guide"),
      ModelManager_1.ModelManager.InputDistributeModel?.RefreshInputDistributeTag();
  }
  OnInit() {
    (this.bYt = new Set()), (this.BYt = new Set());
    for (const i of ConfigManager_1.ConfigManager.GuideConfig.GetAllGroup())
      i.ResetInDungeon && this.BYt.add(i.Id);
    return (
      (this.CurrentGroupMap = new Map()),
      (this.kYt = new Map([
        [4, void 0],
        [1, void 0],
      ])),
      (this.FYt = 0),
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
    this.qYt || (this.qYt = []),
      this.qYt.push(i),
      this.GYt ||
        (this.GYt = TimerSystem_1.TimerSystem.Forever(
          this.VYt,
          TimerSystem_1.MIN_TIME,
        )),
      this.TryShowTutorial();
  }
  TryShowTutorial() {
    var i;
    this.qYt.length <= 0 ||
      ((i = this.qYt[this.qYt.length - 1]),
      this.NYt &&
        (2 === this.NYt.TipState ||
          (i.TutorialTip && 1 !== this.NYt.TipState))) ||
      this.jYt(i);
  }
  jYt(i) {
    (this.NYt = i),
      UiManager_1.UiManager.IsViewOpen("GuideTutorialTipsView") &&
        UiManager_1.UiManager.CloseView("GuideTutorialTipsView"),
      this.NYt.TutorialTip
        ? (this.WYt(),
          UiManager_1.UiManager.OpenView("GuideTutorialTipsView", this.NYt))
        : (this.TryPauseTimer(), this.TryShowGuideTutorialView());
  }
  TryShowGuideTutorialView() {
    UiManager_1.UiManager.OpenView("GuideTutorialView", this.NYt, (i) => {
      this.OYt = !i && !UiManager_1.UiManager.IsViewOpen("GuideTutorialView");
    });
  }
  ShowFailedOpenTutorialView() {
    this.OYt && this.TryShowGuideTutorialView();
  }
  ClipTipState() {
    for (const i of this.qYt) 0 === i.TipState && (i.TipState = 1);
  }
  RemoveCurrentTutorialInfo() {
    var i = this.qYt.indexOf(this.NYt);
    (this.NYt = void 0),
      0 <= i &&
        (this.qYt[i].StopGuide(), this.qYt.splice(i, 1), this.TryPauseTimer());
  }
  HaveCurrentTutorial() {
    return void 0 !== this.NYt;
  }
  TryPauseTimer() {
    this.GYt &&
      !this.GYt.IsPause() &&
      (0 === this.qYt.length || (this.NYt && 2 === this.NYt.TipState)) &&
      TimerSystem_1.TimerSystem.Pause(this.GYt);
  }
  WYt() {
    this.GYt &&
      this.GYt.IsPause() &&
      this.qYt.length &&
      (!this.NYt || 2 !== this.NYt.TipState) &&
      (TimerSystem_1.TimerSystem.Has(this.GYt)
        ? TimerSystem_1.TimerSystem.Resume(this.GYt)
        : (this.GYt = TimerSystem_1.TimerSystem.Forever(
            this.VYt,
            TimerSystem_1.MIN_TIME,
          )));
  }
  BreakTypeViewStep(i) {
    this.kYt.get(i)?.SwitchState(3), this.kYt.set(i, void 0);
  }
  OpenGuideView(i) {
    var e = i.Config.ContentType;
    this.kYt.set(e, i),
      4 === e
        ? UiManager_1.UiManager.OpenView("GuideFocusView", i)
        : UiManager_1.UiManager.OpenView("GuideTipsView", i);
  }
  RemoveStepViewSingletonMap(i) {
    var e = i.Config.ContentType;
    this.kYt.get(e) === i && this.kYt.set(e, void 0);
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
    for (const r of this.BYt)
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
      this.bYt.clear(),
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
    e && (e.Reset(), this.CurrentGroupMap.delete(i)), this.bYt.add(i);
  }
  ResetFinishedGuide(i) {
    this.bYt.delete(i);
  }
  IsGroupFinished(i) {
    return this.bYt?.has(i);
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
          var t,
            r = e.OpenLimitCondition;
          if (
            !r ||
            this.IsGmInvoke ||
            ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
              r.toString(),
              void 0,
            )
          ) {
            const s = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
            if (e.DungeonId.find((i) => i === s))
              return (
                (t = new GuideGroupInfo_1.GuideGroupInfo(i)),
                this.CurrentGroupMap.set(t.Id, t),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Guide", 17, "创建引导组数据成功", [
                    "组Id",
                    i,
                  ]),
                t
              );
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "引导组的副本Id与当前所在副本不匹配",
                ["组Id", i],
                ["当前所在副本Id", s],
                ["配置副本Id", e.DungeonId],
              );
          } else
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "引导组的入队条件组不通过",
                ["组Id", i],
                ["conditionGroupId", r],
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
    if (!this.bYt)
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
      this.bYt.has(i)
        ? (r = 4)
        : (i = this.CurrentGroupMap.get(i)) &&
          (r = i.StateMachine.CurrentState),
      GuideModel.KYt(r, e, t)
    );
  }
  static KYt(i, e, t) {
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
      this.bYt.clear(),
      this.CurrentGroupMap.clear(),
      this.BYt.clear(),
      this.qYt && (this.qYt.length = 0),
      this.GYt && TimerSystem_1.TimerSystem.Remove(this.GYt),
      (this.bYt = void 0),
      (this.CurrentGroupMap = void 0),
      (this.BYt = void 0),
      (this.qYt = void 0),
      (this.NYt = void 0),
      (this.GYt = void 0),
      !(this.OYt = !1)
    );
  }
}
((exports.GuideModel = GuideModel).IsLock = !1), (GuideModel.IsGmLock = !1);
//# sourceMappingURL=GuideModel.js.map
