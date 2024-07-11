"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowShowTalk = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  PlotController_1 = require("../PlotController");
class FlowShowTalk {
  constructor() {
    (this.CurShowTalk = void 0),
      (this.CurTalkItemIndex = 0),
      (this.Context = void 0),
      (this.B8 = void 0),
      (this.S$i = void 0),
      (this.U$i = -1),
      (this.A$i = !1),
      (this.O$i = !1),
      (this.obn = !1),
      (this.XHs = !1),
      (this.YHs = !1),
      (this.F$i = (t) => {
        var i;
        t &&
          ((t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]).Options &&
          0 < t.Options.length
            ? ((this.Context.CurOptionId = -1),
              (this.YHs = !0),
              this.Context.IsBackground
                ? ((t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]),
                  (i =
                    ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
                      t,
                    )),
                  this.HandleShowTalkItemOption(i, t.Options[i].Actions))
                : EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.ShowPlotSubtitleOptions,
                  ))
            : this.V$i());
      }),
      (this.OnOptionActionCompleted = (t) => {
        t && this.V$i();
      }),
      (this.SubmitSubtitle = (t) => {
        this.Context && !this.Context.IsBackground && this.nbn(t);
      });
  }
  FinishShowTalk() {
    this.H$i(),
      (this.A$i = !1),
      ModelManager_1.ModelManager.PlotModel.CenterTextTransition(!1),
      ModelManager_1.ModelManager.PlotModel?.GrayOptionMap.clear(),
      (ModelManager_1.ModelManager.PlotModel.CurShowTalk = void 0),
      (ModelManager_1.ModelManager.PlotModel.OptionEnable = !0),
      (this.Context.CurTalkId = -1),
      (this.XHs = !1),
      (this.YHs = !1),
      (this.Context.CurOptionId = -1),
      (this.Context.CurSubActionId = 0),
      (this.Context.CurShowTalk = void 0),
      (this.Context.CurShowTalkActionId = 0),
      (this.CurTalkItemIndex = -1),
      (this.CurShowTalk = void 0),
      (this.Context = void 0),
      (this.B8 = void 0),
      (this.obn = !1),
      PlotController_1.PlotController.ClearUi(),
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
      ControllerHolder_1.ControllerHolder.FlowController.RunNextAction();
  }
  Start(t, i) {
    (this.CurShowTalk = t),
      (this.Context = i),
      (this.CurTalkItemIndex = -1),
      (this.B8 = ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel),
      "LevelC" === this.B8 &&
        LevelLoadingController_1.LevelLoadingController.CloseLoading(
          0,
          void 0,
          0,
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PlotStartShowTalk,
        this.CurShowTalk,
      ),
      (ModelManager_1.ModelManager.PlotModel.CurShowTalk = t),
      "Prompt" === this.B8 || this.Context.IsBackground
        ? this.V$i()
        : ControllerHolder_1.ControllerHolder.PlotController.WaitViewCallback(
            (t) => {
              t && this.V$i();
            },
          );
  }
  V$i() {
    var t;
    this.CurShowTalk
      ? (this.CurTalkItemIndex++,
        !this.CurShowTalk.TalkItems ||
        this.CurTalkItemIndex >= this.CurShowTalk.TalkItems.length
          ? this.FinishShowTalk()
          : ((t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]),
            this.j$i(t)))
      : ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "当前不在ShowTalk节点",
        );
  }
  SwitchTalkItem(i) {
    var e = this.CurShowTalk.TalkItems.length;
    for (let t = 0; t < e; t++) {
      var s = this.CurShowTalk.TalkItems[t];
      if (s.Id === i) return (this.CurTalkItemIndex = t), void this.j$i(s);
    }
    this.FinishShowTalk();
  }
  async j$i(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Plot", 27, "[FlowShowTalk][Subtitle] 字幕显示", [
        "id",
        t.Id,
      ]),
      (this.Context.CurTalkId = t.Id),
      (this.Context.CurOptionId = -1),
      (this.XHs = !1),
      (this.S$i = t),
      this.H$i(),
      (this.O$i = !1),
      (this.obn = !1),
      await this.sbn(),
      await this.abn(t),
      await this.hbn(),
      (this.obn = !0),
      this.Fc(),
      this.lbn(),
      this.Context.IsBackground && this.nbn();
  }
  nbn(t) {
    this.CurShowTalk &&
      !this.XHs &&
      ((t = t ?? this.S$i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[FlowShowTalk][Subtitle] 字幕完成", [
          "id",
          t.Id,
        ]),
      (this.XHs = !0),
      (this.S$i = void 0),
      ControllerHolder_1.ControllerHolder.PlotController.PlotViewManager.OnSubmitSubtitle(),
      ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
        t.Actions,
        this.F$i,
      ));
  }
  HandleShowTalkItemOption(t, i) {
    this.Context?.CurShowTalk &&
      -1 === this.Context.CurOptionId &&
      this.YHs &&
      ((this.O$i = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 27, "[FlowShowTalk][Subtitle] 选择选项", [
          "index",
          t,
        ]),
      (this.Context.CurOptionId = t),
      (this.YHs = !1),
      ControllerHolder_1.ControllerHolder.FlowController.SelectOption(
        this.Context.CurTalkId,
        t,
      ),
      ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
        i,
        this.OnOptionActionCompleted,
      ));
  }
  Skip() {
    var t, i;
    -1 === this.CurTalkItemIndex
      ? this.V$i()
      : this.CurTalkItemIndex < this.CurShowTalk.TalkItems.length
        ? this.YHs
          ? ((t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]),
            (i =
              ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
                t,
              )),
            this.HandleShowTalkItemOption(i, t.Options[i].Actions))
          : !this.XHs &&
            this.obn &&
            this.nbn(this.CurShowTalk.TalkItems[this.CurTalkItemIndex])
        : this.FinishShowTalk();
  }
  H$i() {
    this.A$i &&
      !this.O$i &&
      ControllerHolder_1.ControllerHolder.FlowController.LogError(
        "遗漏选项C级",
        ["Miss TalkItem Id", this.U$i],
      ),
      !this.CurShowTalk?.TalkItems ||
        this.CurTalkItemIndex >= this.CurShowTalk.TalkItems.length ||
        ((this.A$i =
          !!this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Options &&
          0 < this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Options.length),
        (this.U$i = this.CurShowTalk.TalkItems[this.CurTalkItemIndex].Id));
  }
  Fc() {
    this.Context?.IsBackground ||
      ModelManager_1.ModelManager.PlotModel.HandlePlayMontage(this.S$i.Montage);
  }
  async sbn() {
    var t = this.S$i?.BackgroundConfig;
    if (t && "LevelC" === this.B8 && !this.Context.IsBackground) {
      const s = new CustomPromise_1.CustomPromise();
      var i = () => {
        s.SetResult();
      };
      switch (t.Type) {
        case "Clean":
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadePhoto,
            !1,
            !0,
            void 0,
            i,
          );
          break;
        case "Image":
          var e = t;
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadePhoto,
            !0,
            !0,
            e?.ImageAsset,
            i,
          );
          break;
        case "Icon":
          e = t;
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadePhoto,
            !0,
            !1,
            e?.ImageAsset,
            i,
          );
          break;
        default:
          i();
      }
      await s.Promise;
    }
  }
  async abn(t) {
    "LevelC" === this.B8 &&
      (await ModelManager_1.ModelManager.PlotModel.PlotTemplate.HandleTemplateShowTalk(
        t,
      ));
  }
  async hbn() {
    if ("LevelC" === this.B8 && !this.Context.IsBackground) {
      const t = new CustomPromise_1.CustomPromise(),
        i = "CenterText" === this.S$i.Type;
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
        ModelManager_1.ModelManager.PlotModel.CenterTextTransition(i, () => {
          i ||
            ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!0),
            t.SetResult();
        }),
        await t.Promise;
    }
  }
  lbn() {
    this.Context.IsBackground ||
      ("Prompt" === this.B8 &&
        ControllerHolder_1.ControllerHolder.PlotController.ShowTipsView(
          this.S$i,
          this.Context.UiParam,
        )) ||
      ("LevelC" === this.B8 && "CenterText" === this.S$i?.Type
        ? ModelManager_1.ModelManager.PlotModel.ShowTalkCenterText(
            this.S$i,
            this.SubmitSubtitle,
          )
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdatePlotSubtitle,
            this.S$i,
          ));
  }
  SelectOption(t, i) {
    this.Context &&
      !this.Context.IsBackground &&
      this.HandleShowTalkItemOption(t, i);
  }
}
exports.FlowShowTalk = FlowShowTalk;
//# sourceMappingURL=FlowShowTalk.js.map
