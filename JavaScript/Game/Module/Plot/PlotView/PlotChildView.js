"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotChildView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class PlotChildView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.PlaySpineAnimation = (i, t = !0) => {
        var e = (0, puerts_1.$ref)(void 0);
        if ("" !== i) {
          this.RootItem?.GetAllAttachUIChildren(e);
          var s = (0, puerts_1.$unref)(e);
          for (let e = 0; e < s.Num(); e++) {
            var o = s.Get(e);
            o.IsA(UE.UISpineRenderable.StaticClass()) &&
              ((o = o
                .GetOwner()
                ?.GetComponentByClass(
                  UE.SpineSkeletonAnimationComponent.StaticClass(),
                )),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Plot",
                  45,
                  "Ui预览图:播放Spine动画",
                  ["spineName", i],
                  ["isLoop", t],
                ),
              o.SetAnimation(0, i, t));
          }
        }
      }),
      (this.CloseSpineAnimation = (i) => {
        var e = (0, puerts_1.$ref)(void 0);
        if (!i && "" !== i) {
          this.RootItem?.GetAllAttachUIChildren(e);
          var t = (0, puerts_1.$unref)(e);
          for (let e = 0; e < t.Num(); e++) {
            var s = t.Get(e);
            s.IsA(UE.UISpineRenderable.StaticClass()) &&
              ((s = s
                .GetOwner()
                ?.GetComponentByClass(
                  UE.SpineSkeletonAnimationComponent.StaticClass(),
                )),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Plot", 45, "Ui预览图:关闭Spine动画", [
                  "spineName",
                  i,
                ]),
              s.HasAnimation(i)) &&
              s.ClearTrack(0);
          }
        }
      });
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlayPlotSpine,
      this.PlaySpineAnimation,
    );
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlayPlotSpine,
      this.PlaySpineAnimation,
    );
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear();
  }
  async PreOpenAsync(e, i) {
    i
      ? await this.CreateByResourceIdAsync(i, e, !1)
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Plot",
          45,
          "Ui预览图:预加载Ui预览图，但Ui预制体名称为空",
          ["uiName", i],
        );
  }
  async OpenAsync(e, i, t, s = !0) {
    i
      ? (await this.CreateThenShowByResourceIdAsync(i, e, !1),
        (this.LevelSequencePlayer =
          new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
        this.LevelSequencePlayer?.PlayLevelSequenceByName("Start", !1),
        this.LevelSequencePlayer?.PlayLevelSequenceByName("Loop", !1),
        this.PlaySpineAnimation(t, s))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Plot",
          45,
          "Ui预览图:打开Ui预览图，但Ui预制体名称为空",
          ["uiName", i],
        );
  }
  async OpenAsyncInArray(e, i, t) {
    if (i) {
      await this.CreateThenShowByResourceIdAsync(i, e, !1),
        (this.LevelSequencePlayer =
          new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
        this.LevelSequencePlayer?.PlayLevelSequenceByName("Start", !1),
        this.LevelSequencePlayer?.PlayLevelSequenceByName("Loop", !1);
      for (let e = 0; e < t.Num(); e++)
        this.PlaySpineAnimation(t.Get(e).Name, t.Get(e).NeedLoop);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Plot",
          45,
          "Ui预览图:打开Ui预览图，但Ui预制体名称为空",
          ["uiName", i],
        );
  }
  async PlayUiLevelSequence(e) {
    var i = new CustomPromise_1.CustomPromise();
    return (
      this.LevelSequencePlayer?.StopCurrentSequence(!1, !0),
      this.LevelSequencePlayer?.PlaySequencePurely(e, !1, !1, i),
      i.Promise
    );
  }
  async CloseAsync() {
    await this.LevelSequencePlayer?.PlaySequenceAsync(
      "Close",
      new CustomPromise_1.CustomPromise(),
    ),
      await this.HideAsync(),
      await this.DestroyAsync();
  }
}
exports.PlotChildView = PlotChildView;
//# sourceMappingURL=PlotChildView.js.map
