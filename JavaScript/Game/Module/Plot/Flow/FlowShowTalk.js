"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowShowTalk = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
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
      (this.dbn = !1),
      (this.gjs = !1),
      (this.fjs = !1),
      (this.F$i = (t) => {
        var e;
        t &&
          ("SystemOption" ===
          (t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]).Type
            ? ((this.fjs = !0),
              ControllerHolder_1.ControllerHolder.PlotController.ShowSystemOption(
                t,
                (t, e) => {
                  this.SelectOption(t, e);
                },
              ))
            : t.Options && 0 < t.Options.length
              ? ((this.Context.CurOptionId = -1),
                (this.fjs = !0),
                this.Context.IsBackground
                  ? ((e =
                      ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
                        t,
                      )),
                    this.HandleShowTalkItemOption(e, t.Options[e].Actions))
                  : EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.ShowPlotSubtitleOptions,
                    ))
              : this.V$i());
      }),
      (this.OnOptionActionCompleted = (t) => {
        t && this.V$i();
      }),
      (this.SubmitSubtitle = (t) => {
        this.Context && !this.Context.IsBackground && this.mbn(t);
      });
  }
  FinishShowTalk() {
    this.H$i(),
      (this.A$i = !1),
      ModelManager_1.ModelManager.PlotModel.CenterTextTransition(!1),
      ModelManager_1.ModelManager.PlotModel?.GrayOptionMap.clear(),
      (ModelManager_1.ModelManager.PlotModel.CurShowTalk = void 0),
      (ModelManager_1.ModelManager.PlotModel.OptionEnable = !0),
      ModelManager_1.ModelManager.PlotModel.PlotTemplate.OnFinishShowTalk(),
      (this.Context.CurTalkId = -1),
      (this.gjs = !1),
      (this.fjs = !1),
      (this.Context.CurOptionId = -1),
      (this.Context.CurSubActionId = 0),
      (this.Context.CurShowTalk = void 0),
      (this.Context.CurShowTalkActionId = 0),
      (this.CurTalkItemIndex = -1),
      (this.CurShowTalk = void 0),
      (this.Context = void 0),
      (this.B8 = void 0),
      (this.dbn = !1),
      PlotController_1.PlotController.ClearUi(),
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotEndShowTalk),
      ControllerHolder_1.ControllerHolder.FlowController.RunNextAction();
  }
  Start(t, e) {
    (this.CurShowTalk = t),
      (this.Context = e),
      (this.CurTalkItemIndex = -1),
      (this.B8 = ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel),
      "LevelC" !== this.B8 ||
        t?.TalkItems[0]?.BackgroundConfig?.Type ||
        "CenterText" === t?.TalkItems[0]?.Type ||
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
  SwitchTalkItem(e) {
    var i = this.CurShowTalk.TalkItems.length;
    for (let t = 0; t < i; t++) {
      var s = this.CurShowTalk.TalkItems[t];
      if (s.Id === e) return (this.CurTalkItemIndex = t), void this.j$i(s);
    }
    this.FinishShowTalk();
  }
  async j$i(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Plot", 26, "[FlowShowTalk][Subtitle] 字幕显示", [
        "id",
        t.Id,
      ]),
      (this.Context.CurTalkId = t.Id),
      (this.Context.CurOptionId = -1),
      (this.gjs = !1),
      (this.S$i = t),
      this.H$i(),
      (this.O$i = !1),
      (this.dbn = !1),
      await this.Cbn(),
      await this.gbn(t),
      await this.fbn(),
      (this.dbn = !0),
      this.Fc(),
      this.vbn(),
      this.Context.IsBackground && this.mbn();
  }
  mbn(t) {
    this.CurShowTalk &&
      !this.gjs &&
      ((t = t ?? this.S$i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 26, "[FlowShowTalk][Subtitle] 字幕完成", [
          "id",
          t.Id,
        ]),
      (this.gjs = !0),
      (this.S$i = void 0),
      ControllerHolder_1.ControllerHolder.PlotController.PlotViewManager.OnSubmitSubtitle(),
      ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
        t.Actions,
        this.F$i,
      ));
  }
  HandleShowTalkItemOption(t, e) {
    this.Context?.CurShowTalk &&
      -1 === this.Context.CurOptionId &&
      this.fjs &&
      ((this.O$i = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Plot", 26, "[FlowShowTalk][Subtitle] 选择选项", [
          "index",
          t,
        ]),
      (this.Context.CurOptionId = t),
      (this.fjs = !1),
      ControllerHolder_1.ControllerHolder.FlowController.SelectOption(
        this.Context.CurTalkId,
        t,
      ),
      ControllerHolder_1.ControllerHolder.FlowController.ExecuteSubActions(
        e,
        this.OnOptionActionCompleted,
      ));
  }
  Skip() {
    var t, e;
    -1 === this.CurTalkItemIndex
      ? this.V$i()
      : this.CurTalkItemIndex < this.CurShowTalk.TalkItems.length
        ? this.fjs
          ? ((t = this.CurShowTalk.TalkItems[this.CurTalkItemIndex]),
            (e =
              ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption(
                t,
              )),
            this.HandleShowTalkItemOption(e, t.Options[e].Actions))
          : !this.gjs &&
            this.dbn &&
            this.mbn(this.CurShowTalk.TalkItems[this.CurTalkItemIndex])
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
  async Cbn() {
    var t = this.S$i?.BackgroundConfig,
      e = UiManager_1.UiManager.GetViewByName("PlotView");
    if (t && "LevelC" === this.B8 && !this.Context.IsBackground && e) {
      const o = new CustomPromise_1.CustomPromise();
      var i = () => {
        o.SetResult();
      };
      switch (t.Type) {
        case "Clean":
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadePhoto,
            !1,
            !0,
            void 0,
            i,
          ),
            o.IsFulfilled() || (await o.Promise),
            await e.CloseChildView();
          break;
        case "Image":
          var s = t;
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadePhoto,
            !0,
            !0,
            s?.ImageAsset,
            i,
          ),
            o.IsFulfilled() || (await o.Promise);
          break;
        case "Icon":
          s = t;
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlotViewBgFadePhoto,
            !0,
            !1,
            s?.ImageAsset,
            i,
          ),
            o.IsFulfilled() || (await o.Promise);
          break;
        case "ImageByMcGender":
          1 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.PlotViewBgFadePhoto,
                !0,
                !0,
                t.ImageAssetMale,
                i,
              )
            : 0 ===
                ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.PlotViewBgFadePhoto,
                !0,
                !0,
                t.ImageAssetFemale,
                i,
              ),
            o.IsFulfilled() || (await o.Promise);
          break;
        case "SpineImage":
          await e.OpenChildView(t.Id, t.IsLoop ?? !1);
      }
      LevelLoadingController_1.LevelLoadingController.CloseLoading(
        0,
        void 0,
        1,
      );
    }
  }
  async gbn(t) {
    "LevelC" === this.B8 &&
      (await ModelManager_1.ModelManager.PlotModel.PlotTemplate.HandleTemplateShowTalk(
        t,
      ));
  }
  async fbn() {
    if ("LevelC" === this.B8 && !this.Context.IsBackground) {
      const t = new CustomPromise_1.CustomPromise(),
        e = "CenterText" === this.S$i.Type;
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
        ModelManager_1.ModelManager.PlotModel.CenterTextTransition(e, () => {
          e ||
            ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!0),
            t.SetResult();
        }),
        await t.Promise;
    }
  }
  vbn() {
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
  SelectOption(t, e) {
    this.Context &&
      !this.Context.IsBackground &&
      this.HandleShowTalkItemOption(t, e);
  }
}
exports.FlowShowTalk = FlowShowTalk;
//# sourceMappingURL=FlowShowTalk.js.map
