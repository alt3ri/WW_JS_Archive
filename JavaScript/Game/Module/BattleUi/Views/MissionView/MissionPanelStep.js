"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MissionPanelStep = void 0);
const ue_1 = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  MissionPanelChildStep_1 = require("./MissionPanelChildStep"),
  MissionViewStepTextUtil_1 = require("./MissionViewStepTextUtil"),
  StepBaseItem_1 = require("./TreeStep/StepBaseItem");
class MissionPanelStep extends StepBaseItem_1.StepBaseItem {
  constructor() {
    super(...arguments),
      (this.Qct = []),
      (this.TitleSequencePlayer = void 0),
      (this.YF_ = void 0),
      (this.zF_ = void 0),
      (this.yct = (t) => {
        switch (t) {
          case "Start":
            this.YF_?.IsPending() && this.YF_.SetResult(!0);
            break;
          case "Close":
          case "Finish":
            this.zF_?.IsPending() && this.zF_.SetResult(!0);
        }
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([2, ue_1.UIItem]),
      this.ComponentRegisterInfos.push([3, ue_1.UIItem]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var t = this.GetItem(3),
      t =
        (t.SetUIActive(!0),
        (this.TitleSequencePlayer =
          new LevelSequencePlayer_1.LevelSequencePlayer(t)),
        this.TitleSequencePlayer.BindSequenceCloseEvent(this.yct),
        new MissionPanelChildStep_1.MissionPanelChildStep(this.ViewId, 0)),
      i = this.GetItem(2);
    await t.CreateThenShowByActorAsync(i.GetOwner(), 0),
      await t.HideAsync(),
      this.Qct.push(t);
  }
  OnBeforeDestroy() {
    if (this.Qct) for (const t of this.Qct) t.Destroy();
    this.TitleSequencePlayer?.Clear(), (this.TitleSequencePlayer = void 0);
  }
  OnAfterShow() {
    this.TitleSequencePlayer.ResumeSequence();
    for (const t of this.Qct) t.Show();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionPanelStepShow");
  }
  OnAfterHide() {
    this.TitleSequencePlayer.PauseSequence();
    for (const t of this.Qct) t.Hide();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("BattleUiSet", 18, "MissionPanel:MissionPanelStepHide");
  }
  OnTick(t) {
    if (this.IsShowOrShowing) {
      super.OnTick(t);
      for (const i of this.Qct) i.OnTick(t);
    }
  }
  Update() {
    if ((this.UpdateByConfig(), this.ShowData && this.ShowData.SubStepTexts))
      for (let t = 0; t < this.ShowData.SubStepTexts.length; t++)
        this.Qct[t].UpdateByConfig();
  }
  async StartShow(t, i) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "BattleUiSet",
        18,
        "MissionPanel:MissionPanelStep.StartShow 更新自父步骤数据",
      ),
      await this.ZOn(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BattleUiSet",
          18,
          "MissionPanel:MissionPanelStep.StartShow 隐藏子步骤",
        ),
      await this.Fj_(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BattleUiSet",
          18,
          "MissionPanel:MissionPanelStep.StartShow 显示父步骤",
        ),
      await this.ShowAsync(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BattleUiSet",
          18,
          "MissionPanel:MissionPanelStep.StartShow 播放父步骤Start动画",
        ),
      await this.bco(i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BattleUiSet",
          18,
          "MissionPanel:MissionPanelStep.StartShow 播放子步骤Start动画",
        ),
      await this.Xct(),
      await this.Mxn(i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BattleUiSet",
          18,
          "MissionPanel:MissionPanelStep.StartShow 子步骤Start动画结束",
        );
  }
  async OnReset() {
    var t = [];
    for (const i of this.Qct) t.push(i.OnReset());
    await Promise.all(t), await super.OnReset(), await this.HideAsync();
  }
  async ExecuteSequenceOnUpdate(t, i, e) {
    var s = this.ShowData,
      a = t;
    MissionViewStepTextUtil_1.MissionViewStepTextUtil.CheckTextEqual(
      this.ShowData,
      t,
    )
      ? (i(t), await this.ZOn(t), await this.Xct())
      : ((a =
          MissionViewStepTextUtil_1.MissionViewStepTextUtil.CheckStepTextSame(
            s?.MainStepText,
            a.MainStepText,
          )),
        await this.i2n(s?.SubStepTexts, e),
        a || (await this.Gj_(e)),
        i(t),
        await this.ZOn(t),
        a || (await this.bco(e)),
        await this.Xct(),
        await this.Mxn(e));
  }
  async bco(t) {
    this.CheckVisible() &&
      this.TitleSequencePlayer &&
      (this.TitleSequencePlayer.PlayLevelSequenceByName("Start"),
      (this.YF_ = new CustomPromise_1.CustomPromise()),
      t && this.TitleSequencePlayer.EndSequenceLastFrame("Start"),
      await this.YF_.Promise);
  }
  async Gj_(t) {
    var i;
    return (
      this.CheckVisible() &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.MissionPanelStepTitleAnimStart,
          this.ShowData.Id,
        ),
        (i = this.Cjs() ? "Finish" : "Close"),
        this.TitleSequencePlayer.PlayLevelSequenceByName(i),
        (this.zF_ = new CustomPromise_1.CustomPromise()),
        t && this.TitleSequencePlayer.EndSequenceLastFrame(i),
        await this.zF_.Promise,
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.MissionPanelStepTitleAnimEnd,
          this.ShowData.Id,
        )),
      !0
    );
  }
  async Mxn(i) {
    var e = this.ShowData?.SubStepTexts;
    if (e?.length) {
      var s = [];
      for (let t = 0; t < e.length; t++) {
        var a = this.Qct[t];
        s.push(a.StartShow(i));
      }
      await Promise.all(s);
    }
  }
  async i2n(i, e) {
    if (i && i.length) {
      var s = [];
      for (let t = 0; t < i.length; t++) {
        var a = this.Qct[t];
        s.push(a.EndShow(e));
      }
      await Promise.all(s);
    }
  }
  async ZOn(t) {
    (this.ShowData = t), await this.Refresh(t, t.MainStepText);
  }
  async Xct() {
    const a = this.GetItem(2);
    if (a) {
      var i = this.ShowData;
      if (i && i.SubStepTexts && 0 !== i.SubStepTexts.length) {
        let s = 0;
        const n = [];
        i.SubStepTexts.forEach((t) => {
          let i = void 0;
          var e;
          this.Qct.length > s
            ? (i = this.Qct[s])
            : ((e = LguiUtil_1.LguiUtil.CopyItem(a, a.GetParentAsUIItem())),
              (i = new MissionPanelChildStep_1.MissionPanelChildStep(
                this.ViewId,
                s,
              )),
              n.push(i.CreateThenShowByActorAsync(e.GetOwner(), 0)),
              this.Qct.push(i)),
            s++;
        }),
          await Promise.all(n);
        for (let t = (n.length = 0); t < i.SubStepTexts.length; t++) {
          var e = i.SubStepTexts[t];
          n.push(this.Qct[t].Refresh(i, e));
        }
        await Promise.all(n);
      } else await this.Fj_();
    }
  }
  async Fj_() {
    var t = [];
    for (const i of this.Qct) t.push(i.HideAsync());
    await Promise.all(t);
  }
  CheckVisible() {
    var t;
    return (
      !!this.Config &&
      ((t = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Config.TidTitle)),
      !StringUtils_1.StringUtils.IsBlank(t)) &&
      super.CheckVisible()
    );
  }
  Cjs() {
    if (0 === this.ShowData?.DataSource) {
      var t = this.ShowData.MainStepText?.QuestScheduleType;
      if (t && t.Type === IQuest_1.EQuestScheduleType.ChildQuestCompleted) {
        var i =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
            this.ShowData.Id,
          );
        if (i) {
          i = i.GetNode(t.ChildQuestId);
          if (i) return i.IsSuccess;
        }
      }
    }
    return !0;
  }
  async ChildStepConditionIndexChange(i, t) {
    var e = this.Qct.find((t) => t.StepId === i);
    e && (await e.OnStepConditionIndexChange(t));
  }
}
exports.MissionPanelStep = MissionPanelStep;
//# sourceMappingURL=MissionPanelStep.js.map
