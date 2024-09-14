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
  GeneralLogicTreeDefine_1 = require("../../../GeneralLogicTree/Define/GeneralLogicTreeDefine"),
  TreeStepBase_1 = require("../../../GeneralLogicTree/View/TreeStep/TreeStepBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  MissionPanelChildStep_1 = require("./MissionPanelChildStep");
class MissionPanelStep extends TreeStepBase_1.TreeStepBase {
  constructor() {
    super(...arguments),
      (this.Kct = void 0),
      (this.Qct = []),
      (this.TitleSequencePlayer = void 0),
      (this.Zut = 0),
      (this.C2a = 0),
      (this.pxn = void 0),
      (this.PlayStartSequence = (e, i, t) => {
        return (
          (this.Zut = e),
          this.ZOn(i, t),
          this.g2a(!1),
          this.vxn()
            ? (this.TitleSequencePlayer.StopCurrentSequence(!0, !0),
              this.TitleSequencePlayer.PlayLevelSequenceByName("Start"),
              "Disabled" !==
                ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() &&
                this.TitleSequencePlayer.StopCurrentSequence(!0, !0),
              !1)
            : (this.SetUiActive(!0), this.Mxn(this.Zut))
        );
      }),
      (this.Ict = () => {
        this.Zut &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MissionPanelProcessEnd,
            this.Zut,
          ),
          (this.Zut = 0));
      }),
      (this.owt = (e) => {
        switch (e) {
          case "Start":
            this.SetUiActive(!0);
            break;
          case "Close":
          case "Finish":
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.MissionPanelStepTitleAnimStart,
              this.TreeIncId,
            );
        }
      }),
      (this.yct = (e) => {
        switch (e) {
          case "Start":
            this.Mxn(this.Zut);
            break;
          case "Close":
          case "Finish":
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.MissionPanelStepTitleAnimEnd,
              this.TreeIncId,
            ),
              this.pxn ? this.pxn() : this.Ict();
        }
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([2, ue_1.UIItem]),
      this.ComponentRegisterInfos.push([3, ue_1.UIItem]);
  }
  OnStart() {
    super.OnStart();
    var e = this.GetItem(3),
      e =
        (e.SetUIActive(!0),
        (this.TitleSequencePlayer =
          new LevelSequencePlayer_1.LevelSequencePlayer(e)),
        this.TitleSequencePlayer.BindSequenceStartEvent(this.owt),
        this.TitleSequencePlayer.BindSequenceCloseEvent(this.yct),
        this.GetItem(2)),
      i = new MissionPanelChildStep_1.MissionPanelChildStep();
    i.SetRootActor(e.GetOwner(), !0), this.Qct.push(i), e?.SetUIActive(!1);
  }
  Dispose() {
    if ((super.Dispose(), this.Qct)) for (const e of this.Qct) e.Dispose();
    this.TitleSequencePlayer?.Clear(), (this.TitleSequencePlayer = void 0);
  }
  PlayCloseSequence(e) {
    if (!this.vxn()) return e(), !0;
    (this.pxn = e), this.TitleSequencePlayer.StopCurrentSequence(!0, !0);
    (e = this.Cjs() ? "Finish" : "Close"),
      this.TitleSequencePlayer.PlayLevelSequenceByName(e),
      (e =
        "Disabled" !==
        ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode());
    return !!e && (this.TitleSequencePlayer.StopCurrentSequence(!0, !0), !0);
  }
  PauseSequence() {
    this.TitleSequencePlayer.GetCurrentSequence() &&
      this.TitleSequencePlayer.PauseSequence();
  }
  ResumeSequence() {
    this.TitleSequencePlayer.GetCurrentSequence() &&
      this.TitleSequencePlayer.ResumeSequence();
  }
  async ExecuteSequenceOnUpdate(i, t, s) {
    this.Zut = i;
    var r = this.Kct,
      h = t.TrackTextConfig;
    if (
      (0, GeneralLogicTreeDefine_1.checkMainTitleSame)(r.MainTitle, h.MainTitle)
    )
      return (
        await this.i2n(0, r.SubTitles),
        s(),
        this.ZOn(t.TreeIncId, h),
        this.Mxn(this.Zut)
      );
    {
      await this.i2n(0, r.SubTitles);
      r = r.MainTitle;
      let e = void 0;
      if (
        (r &&
          (StringUtils_1.StringUtils.IsBlank(r.TidTitle)
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Quest",
                19,
                "找不到任务主标题文本配置",
                ["treeConfigId", t.TreeConfigId],
                ["nextMainTitle", t.TrackTextConfig?.MainTitle],
              )
            : (e = PublicUtil_1.PublicUtil.GetConfigTextByKey(r.TidTitle))),
        e && !StringUtils_1.StringUtils.IsBlank(e))
      ) {
        const n = new CustomPromise_1.CustomPromise();
        this.PlayCloseSequence(() => {
          n.SetResult(!0);
        }),
          await n.Promise;
      }
      return s(), this.PlayStartSequence(i, t.TreeIncId, h);
    }
  }
  Mxn(i) {
    this.Xct();
    var t = this.Kct?.SubTitles;
    if (!t?.length) return this.Ict(), !0;
    for (let e = 0; e < t.length; e++) this.Qct[e].PlayStartSequence(i);
    return !1;
  }
  async i2n(i, t) {
    if (t?.length) {
      this.C2a = 0;
      const s = new CustomPromise_1.CustomPromise();
      for (let e = 0; e < t.length; e++)
        this.Qct[e].PlayCloseSequence(i, () => {
          this.C2a++, this.C2a === t.length && s.SetResult(!0);
        });
      await s.Promise;
    }
  }
  Update(e, i) {
    this.ZOn(e, i), this.Xct();
  }
  ZOn(e, i) {
    (this.Kct = i), this.UpdateData(e, this.Kct?.MainTitle);
  }
  Xct() {
    const r = this.GetItem(2);
    if (r) {
      const t = this.Kct;
      if (t && t.SubTitles) {
        let s = 0;
        t.SubTitles.forEach((e) => {
          let i = void 0;
          var t;
          this.Qct.length > s
            ? (i = this.Qct[s])
            : ((t = LguiUtil_1.LguiUtil.CopyItem(r, r.GetParentAsUIItem())),
              (i =
                new MissionPanelChildStep_1.MissionPanelChildStep()).SetRootActor(
                t.GetOwner(),
                !0,
              ),
              this.Qct.push(i)),
            i.UpdateData(this.TreeIncId, e),
            s++;
        }),
          this.Qct.forEach((e, i) => {
            e.SetUiVisible(i < t.SubTitles.length);
          });
      } else this.g2a(!1);
    }
  }
  g2a(e) {
    for (const i of this.Qct) i.SetUiVisible(e);
  }
  vxn() {
    var e;
    return (
      void 0 !== this.Kct?.MainTitle &&
      ((e = PublicUtil_1.PublicUtil.GetConfigTextByKey(
        this.Kct?.MainTitle.TidTitle,
      )),
      !StringUtils_1.StringUtils.IsBlank(e))
    );
  }
  Cjs() {
    var e = this.Kct?.MainTitle?.QuestScheduleType;
    if (e && e.Type === IQuest_1.EQuestScheduleType.ChildQuestCompleted) {
      var i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
        this.TreeIncId,
      );
      if (i) {
        i = i.GetNode(e.ChildQuestId);
        if (i) return i.IsSuccess;
      }
    }
    return !0;
  }
}
exports.MissionPanelStep = MissionPanelStep;
//# sourceMappingURL=MissionPanelStep.js.map
