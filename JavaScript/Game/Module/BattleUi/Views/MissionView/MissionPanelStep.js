"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MissionPanelStep = void 0);
const ue_1 = require("ue"),
  GeneralLogicTreeDefine_1 = require("../../../GeneralLogicTree/Define/GeneralLogicTreeDefine"),
  TreeStepBase_1 = require("../../../GeneralLogicTree/View/TreeStep/TreeStepBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  MissionPanelChildStep_1 = require("./MissionPanelChildStep"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
class MissionPanelStep extends TreeStepBase_1.TreeStepBase {
  constructor() {
    super(...arguments),
      (this.But = void 0),
      (this.but = []),
      (this.TitleSequencePlayer = void 0),
      (this.G_t = 0),
      (this.gAn = void 0),
      (this.PlayStartSequence = (e, i, t) => {
        return (
          (this.G_t = e),
          this.Kbn(i, t),
          this.fAn()
            ? (this.TitleSequencePlayer.StopCurrentSequence(!0, !0),
              this.TitleSequencePlayer.PlayLevelSequenceByName("Start"),
              "Disabled" !==
                ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() &&
                this.TitleSequencePlayer.StopCurrentSequence(!0, !0),
              !1)
            : (this.SetUiActive(!0), this.pAn(this.G_t))
        );
      }),
      (this.hut = () => {
        this.G_t &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MissionPanelProcessEnd,
            this.G_t,
          ),
          (this.G_t = 0));
      }),
      (this.ZPt = (e) => {
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
      (this.aut = (e) => {
        switch (e) {
          case "Start":
            this.pAn(this.G_t);
            break;
          case "Close":
          case "Finish":
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.MissionPanelStepTitleAnimEnd,
              this.TreeIncId,
            ),
              this.gAn ? this.gAn() : this.hut();
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
        this.TitleSequencePlayer.BindSequenceStartEvent(this.ZPt),
        this.TitleSequencePlayer.BindSequenceCloseEvent(this.aut),
        this.GetItem(2)),
      i = new MissionPanelChildStep_1.MissionPanelChildStep();
    i.SetRootActor(e.GetOwner(), !0), this.but.push(i), e?.SetUIActive(!1);
  }
  Dispose() {
    if ((super.Dispose(), this.but)) for (const e of this.but) e.Dispose();
    this.TitleSequencePlayer?.Clear(), (this.TitleSequencePlayer = void 0);
  }
  PlayCloseSequence(e) {
    if (!this.fAn()) return e(), !0;
    (this.gAn = e), this.TitleSequencePlayer.StopCurrentSequence(!0, !0);
    (e = this.j4s() ? "Finish" : "Close"),
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
  async ExecuteSequenceOnUpdate(e, i, t) {
    this.G_t = e;
    var s = this.But,
      r = i.TrackTextConfig;
    if (
      (0, GeneralLogicTreeDefine_1.CheckMainTitleSame)(s.MainTitle, r.MainTitle)
    )
      return (
        await this.Qbn(0, s.SubTitles),
        t(),
        this.Kbn(i.TreeIncId, r),
        this.pAn(this.G_t)
      );
    await this.Qbn(0, s.SubTitles);
    s = PublicUtil_1.PublicUtil.GetConfigTextByKey(s.MainTitle?.TidTitle ?? "");
    if (!StringUtils_1.StringUtils.IsBlank(s)) {
      const h = new CustomPromise_1.CustomPromise();
      this.PlayCloseSequence(() => {
        h.SetResult(!0);
      }),
        await h.Promise;
    }
    return t(), this.PlayStartSequence(e, i.TreeIncId, r);
  }
  pAn(i) {
    this.qut();
    var t = this.But?.SubTitles;
    if (!t?.length) return this.hut(), !0;
    for (let e = 0; e < t.length; e++) this.but[e].PlayStartSequence(i);
    return !1;
  }
  async Qbn(t, s) {
    if (s?.length) {
      let i = 0;
      const r = new CustomPromise_1.CustomPromise();
      for (let e = 0; e < s.length; e++)
        this.but[e].PlayCloseSequence(t, () => {
          ++i === s.length && r.SetResult(!0);
        });
      await r.Promise;
    }
  }
  Update(e, i) {
    this.Kbn(e, i), this.qut();
  }
  Kbn(e, i) {
    (this.But = i), this.UpdateData(e, this.But?.MainTitle);
  }
  qut() {
    const r = this.GetItem(2);
    if (r) {
      const t = this.But;
      if (t && t.SubTitles) {
        let s = 0;
        t.SubTitles.forEach((e) => {
          let i = void 0;
          var t;
          this.but.length > s
            ? (i = this.but[s])
            : ((t = LguiUtil_1.LguiUtil.CopyItem(r, r.GetParentAsUIItem())),
              (i =
                new MissionPanelChildStep_1.MissionPanelChildStep()).SetRootActor(
                t.GetOwner(),
                !0,
              ),
              this.but.push(i)),
            i.UpdateData(this.TreeIncId, e),
            s++;
        }),
          this.but.forEach((e, i) => {
            e.DisableUi(i < t.SubTitles.length);
          });
      } else
        this.but.forEach((e, i) => {
          e.DisableUi(!1);
        });
    }
  }
  fAn() {
    var e;
    return (
      void 0 !== this.But?.MainTitle &&
      ((e = PublicUtil_1.PublicUtil.GetConfigTextByKey(
        this.But?.MainTitle.TidTitle,
      )),
      !StringUtils_1.StringUtils.IsBlank(e))
    );
  }
  j4s() {
    var e = this.But?.MainTitle?.QuestScheduleType;
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
