"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowSequence =
    exports.INVALID_INDEX =
    exports.FINISH_INDEX =
      void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  TeleportController_1 = require("../../Teleport/TeleportController"),
  PlotController_1 = require("../PlotController"),
  SequenceController_1 = require("../Sequence/SequenceController");
(exports.FINISH_INDEX = -1), (exports.INVALID_INDEX = -2);
class FlowSequence {
  constructor() {
    (this.f$i = !1),
      (this.p$i = !1),
      (this.v$i = void 0),
      (this.M$i = new Map()),
      (this.E$i = exports.INVALID_INDEX),
      (this.S$i = void 0),
      (this.nx = void 0),
      (this.y$i = !1),
      (this.I$i = !1),
      (this.T$i = !1),
      (this.L$i = 0),
      (this.D$i = void 0),
      (this.R$i = []),
      (this.sjs = new Map()),
      (this.ajs = new Map()),
      (this.SubtitleActionPromise = void 0),
      (this.OptionActionPromise = void 0),
      (this.U$i = -1),
      (this.A$i = !1),
      (this.owt = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "[FlowSequence] Seq开始播放允许跳过"),
          ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!0);
      }),
      (this.P$i = () => {
        (this.nx.CurTalkId = -1),
          (this.nx.CurOptionId = -1),
          (this.nx.CurSubActionId = 0),
          (this.nx.CurShowTalk = void 0),
          (this.nx.CurShowTalkActionId = 0),
          ModelManager_1.ModelManager.PlotModel.GrayOptionMap.clear(),
          (ModelManager_1.ModelManager.PlotModel.CurShowTalk = void 0),
          (ModelManager_1.ModelManager.PlotModel.OptionEnable = !0),
          ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.PlotSequencePlay,
            this.owt,
          ),
          this.Clear(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "[FlowSequence] 停止"),
          ControllerHolder_1.ControllerHolder.FlowController.RunNextAction();
      }),
      (this.x$i = (t) => {
        var e;
        this.SubtitleActionPromise &&
          ((e = this.SubtitleActionPromise),
          (this.SubtitleActionPromise = void 0),
          e.SetResult()),
          this.T$i &&
            t &&
            (this.w$i()
              ? this.OnSelectOption(
                  ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
                    this.S$i,
                  ),
                )
              : this.L$i >= this.v$i.TalkItems.length
                ? this.OnSequenceStop()
                : ((e = this.v$i.TalkItems[this.L$i].Id),
                  this.OnSubtitleStart(e),
                  this.OnSubtitleEnd(e)));
      }),
      (this.B$i = (t) => {
        var e;
        this.OptionActionPromise &&
          ((e = this.OptionActionPromise),
          (this.OptionActionPromise = void 0),
          e.SetResult()),
          t &&
            this.T$i &&
            (this.L$i >= this.v$i.TalkItems.length
              ? this.OnSequenceStop()
              : ((e = this.v$i.TalkItems[this.L$i].Id),
                this.OnSubtitleStart(e),
                this.OnSubtitleEnd(e)));
      }),
      (this.OnSequenceStop = () => {
        this.b$i(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "[FlowSequence] Seq播放完毕"),
          (this.p$i = !1),
          this.Stop();
      });
  }
  get IsInit() {
    return this.f$i;
  }
  get IsPlaying() {
    return this.p$i;
  }
  Clear() {
    (this.f$i = !1),
      (this.p$i = !1),
      (this.v$i = void 0),
      this.M$i.clear(),
      (this.E$i = exports.INVALID_INDEX),
      (this.S$i = void 0),
      (this.nx = void 0),
      (this.y$i = !1),
      (this.I$i = !1),
      (this.T$i = !1),
      (this.L$i = void 0),
      (this.D$i = void 0),
      (this.R$i.length = 0),
      this.sjs.clear(),
      this.ajs.clear(),
      (this.U$i = -1),
      (this.A$i = !1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 39, "清理引用数据-FlowSequence");
  }
  Init(t, e) {
    this.Clear(),
      (this.v$i = t),
      !this.v$i || StringUtils_1.StringUtils.IsEmpty(this.v$i.SequenceDataAsset)
        ? ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "[FlowSequence] 配置错误",
          )
        : (this.v$i.TalkSequence?.forEach((t, e) => {
            t.forEach((t) => {
              this.M$i.has(t)
                ? ControllerHolder_1.ControllerHolder.FlowController.LogError(
                    "[FlowSequence] 初始化分段时Id重复",
                  )
                : this.M$i.set(t, e);
            });
          }),
          (this.nx = e),
          (this.nx.CurTalkId = -1),
          (this.nx.CurOptionId = -1),
          (this.nx.CurSubActionId = 0),
          (this.E$i = 0),
          (this.L$i = 0),
          (this.f$i = !0),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.PlotSequencePlay,
            this.owt,
          ));
  }
  Start() {
    if (this.IsInit && !this.IsPlaying) {
      (this.p$i = !0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "[FlowSequence] 开始"),
        "LevelA" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel
          ? (ModelManager_1.ModelManager.SequenceModel.Type = 0)
          : "LevelB" ===
              ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
            (ModelManager_1.ModelManager.SequenceModel.Type = 1),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PlotStartShowTalk,
          this.v$i,
        ),
        (ModelManager_1.ModelManager.PlotModel.CurShowTalk = this.v$i);
      const i = new Array(),
        e =
          (this.v$i.TalkFrameEvents?.forEach((t) => {
            var e;
            i.push(t.FrameEvent),
              ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.has(
                t.Position?.TalkItemId,
              )
                ? (e =
                    ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.get(
                      t.Position.TalkItemId,
                    )) &&
                  (e.push(t.FrameEvent.EventKey),
                  ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.set(
                    t.Position.TalkItemId,
                    e,
                  ))
                : ((e = new Array()).push(t.FrameEvent.EventKey),
                  ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.set(
                    t.Position.TalkItemId,
                    e,
                  ));
          }),
          []);
      "LevelB" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
        this.v$i.TalkItems?.forEach((t) => {
          t.TidTalk && t.PlayVoice && e.push(t.TidTalk);
        }),
        SequenceController_1.SequenceController.Play(
          {
            Path: this.v$i.SequenceDataAsset,
            ResetCamera: this.v$i.ResetCamera,
            FrameEvents: i,
          },
          e,
          this.OnSequenceStop,
          !0,
          !0,
          this.nx.IsWaitRenderData,
          1,
        );
    }
  }
  Stop(t = 0) {
    this.IsInit &&
      (this.IsPlaying &&
        ((this.p$i = !1),
        SequenceController_1.SequenceController.ManualFinish()),
      this.q$i().finally(this.P$i));
  }
  async q$i() {
    var t;
    await PlotController_1.PlotController.CheckFormation(),
      this.T$i &&
        (0 <= (t = this.S$i ? this.M$i.get(this.S$i.Id) : 0) &&
          t < this.R$i.length &&
          this.R$i[t] &&
          (ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
        this.D$i) &&
        ((t = t < this.D$i.length ? this.D$i[t] : void 0)
          ? await TeleportController_1.TeleportController.TeleportToPositionNoLoading(
              t.GetLocation().ToUeVector(),
              t.GetRotation().Rotator().ToUeRotator(),
              "FlowSequence.Stop",
            )
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "剧情SeqDA的FinalPos未配置，跳过时最终位置将不准确，联系策划修改",
            ));
  }
  Skip() {
    var t;
    this.IsInit &&
      this.IsPlaying &&
      !this.T$i &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[FlowSequence] 执行跳过"),
      (this.T$i = !0),
      0 !== ModelManager_1.ModelManager.SequenceModel.CurFinalPos?.length &&
        (this.D$i = Object.assign(
          [],
          ModelManager_1.ModelManager.SequenceModel.CurFinalPos,
        )),
      ModelManager_1.ModelManager.SequenceModel.IsFadeEnd.forEach((t) => {
        this.R$i.push(t);
      }),
      ModelManager_1.ModelManager.SequenceModel.FrameEvents.forEach((t, e) => {
        this.ajs.set(e, t);
      }),
      ModelManager_1.ModelManager.SequenceModel.FrameEventsMap.forEach(
        (t, e) => {
          this.sjs.set(e, t);
        },
      ),
      SequenceController_1.SequenceController.ManualFinish(),
      (this.p$i = !1),
      this.y$i
        ? this.OnSubtitleEnd(this.S$i.Id)
        : this.w$i() && !this.I$i
          ? this.OnSelectOption(
              ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
                this.S$i,
              ),
            )
          : this.L$i >= this.v$i.TalkItems.length
            ? this.OnSequenceStop()
            : ((t = this.v$i.TalkItems[this.L$i].Id),
              this.OnSubtitleStart(t),
              this.OnSubtitleEnd(t)));
  }
  w$i() {
    return !!this.S$i?.Options && 0 < this.S$i?.Options?.length;
  }
  b$i() {
    this.A$i &&
      !this.I$i &&
      ControllerHolder_1.ControllerHolder.FlowController.LogError("遗漏选项", [
        "Miss TalkItem Id",
        this.U$i,
      ]),
      (this.U$i = this.S$i?.Id ?? -1),
      (this.A$i = this.w$i());
  }
  OnJumpTalk(e) {
    this.IsInit &&
      ((this.E$i = this.M$i.get(e) ?? exports.FINISH_INDEX),
      SequenceController_1.SequenceController.SetNextSequenceIndex(this.E$i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[FlowSequence] JumpTalk设置下个分支Seq", [
          "NextIndex",
          this.E$i,
        ]),
      (this.L$i = this.v$i.TalkItems.findIndex((t) => t.Id === e)),
      this.T$i) &&
      (this.OnSubtitleStart(e), this.OnSubtitleEnd(e));
  }
  OnFinishTalk() {
    this.IsInit &&
      ((this.E$i = exports.FINISH_INDEX),
      SequenceController_1.SequenceController.SetNextSequenceIndex(this.E$i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[FlowSequence] FinishTalk设置结束"),
      this.T$i) &&
      this.OnSequenceStop();
  }
  OnSubtitleStart(e) {
    var t;
    this.IsInit &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[FlowSequence][Subtitle] 字幕显示", [
          "talkId",
          e,
        ]),
      (t = this.v$i.TalkItems.find((t) => t.Id === e)),
      this.v$i.TalkItems[this.L$i].Id !== e &&
        (ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "[FlowSequence][Subtitle] Seq字幕顺序与编辑器对不上",
          ["talkId", e],
          ["SeqIndex", ModelManager_1.ModelManager.SequenceModel.SubSeqIndex],
          ["index in seq", this.L$i],
        ),
        (this.L$i = this.v$i.TalkItems.indexOf(t))),
      this.L$i++,
      t ||
        ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "[FlowSequence][Subtitle] 依赖编辑器的Seq找不到字幕",
          ["talkItem.ID", e],
        ),
      (this.y$i = !0),
      (this.nx.CurTalkId = e),
      (this.nx.CurOptionId = -1),
      (this.S$i = t),
      this.b$i(),
      (this.I$i = !1),
      this.T$i) &&
      this.RunSequenceFrameEventsWhenSkip(e);
  }
  OnSubtitleEnd(t) {
    return !(
      !this.IsInit ||
      !this.y$i ||
      (void 0 !== t && this.S$i.Id !== t
        ? (ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "[FlowSequence] 结束对话Id错误",
            ["id", t],
            ["cur", this.S$i.Id],
          ),
          1)
        : ((this.y$i = !1),
          (this.SubtitleActionPromise = new CustomPromise_1.CustomPromise()),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "[FlowSequence][Subtitle] 字幕关闭"),
          this.G$i(this.S$i.Actions, this.x$i),
          0))
    );
  }
  OnSelectOption(t) {
    if (!this.IsInit) return !1;
    if (-1 !== this.nx.CurOptionId || this.I$i) return !1;
    if (
      ((this.I$i = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[FlowSequence] 选择选项", ["index", t]),
      !this.S$i.Options || t >= this.S$i.Options.length)
    )
      return (
        ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "[FlowSequence] 选项超出下标",
        ),
        !1
      );
    ControllerHolder_1.ControllerHolder.FlowController.SelectOption(
      this.S$i.Id,
      t,
    );
    t = this.S$i.Options[t];
    return (
      (this.OptionActionPromise = new CustomPromise_1.CustomPromise()),
      this.G$i(t.Actions, this.B$i),
      !0
    );
  }
  G$i(t, e) {
    ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
      t,
      (t) => {
        e?.(t);
      },
    );
  }
  CreateSubtitleFromTalkItem(e) {
    var t;
    if (this.IsInit)
      return (
        (t = this.v$i.TalkItems.find((t) => t.Id === e)) ||
          ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "[FlowSequence] 剧情Seq找不到字幕",
            ["talkId", e],
          ),
        t
      );
  }
  GetNextTalkItem() {
    return void 0 !== this.L$i &&
      void 0 !== this.v$i &&
      0 < this.v$i.TalkItems.length &&
      this.v$i.TalkItems.length > this.L$i
      ? this.v$i.TalkItems[this.L$i]
      : void 0;
  }
  RunSequenceFrameEventsWhenSkip(i) {
    let t = void 0;
    (t = this.sjs.has(i) ? this.sjs.get(i) : t) &&
      t.forEach((t) => {
        var e = this.ajs.get(t);
        e &&
          0 !== e.length &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Plot",
              46,
              "RunSequenceFrameEventsWhenSkip",
              ["id", i],
              ["key", t],
            ),
          ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
            e,
            () => {},
          ));
      });
  }
}
exports.FlowSequence = FlowSequence;
//# sourceMappingURL=FlowSequence.js.map
