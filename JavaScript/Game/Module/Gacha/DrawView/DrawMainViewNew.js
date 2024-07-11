"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DrawMainViewNew = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const SHOW_TIPS_DELAY = 2e3;
class DrawMainViewNew extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Delay = 0),
      (this.IsHold = !1),
      (this.IsShowTips = !1),
      (this.IsEnd = !1),
      (this.MaxQuality = 0),
      (this.HasNewItems = !1),
      (this.LevelSequencePlayer = void 0),
      (this.GachaBP = void 0),
      (this.InitGachaBp = (e, i) => {
        let t = 0;
        e === 1
          ? i === 3
            ? (t = 0)
            : i === 4
              ? (t = 1)
              : i === 5 && (t = 2)
          : i === 4
            ? (t = 3)
            : i === 5 && (t = 4),
          (this.MaxQuality = i),
          (this.GachaBP = UE.KuroCollectActorComponent.GetActorWithTag(
            FNameUtil_1.FNameUtil.GetDynamicFName("GachaBP"),
            0,
          )),
          this.GachaBP.TSInitParameters(t),
          this.GachaBP.SetTickableWhenPaused(!0),
          this.GachaBP.Timeline_0?.SetTickableWhenPaused(!0);
      }),
      (this.InitAudioState = (e, i) => {
        AudioSystem_1.AudioSystem.SetState(
          "ui_gacha_times",
          e === 1 ? "one" : "ten",
        ),
          i === 3
            ? AudioSystem_1.AudioSystem.SetState(
                "ui_gacha_quality_max",
                "normal",
              )
            : i === 4
              ? AudioSystem_1.AudioSystem.SetState(
                  "ui_gacha_quality_max",
                  "purple",
                )
              : i === 5 &&
                AudioSystem_1.AudioSystem.SetState(
                  "ui_gacha_quality_max",
                  "golden",
                );
      }),
      (this.OnClickSkip = () => {
        (this.GachaBP.IsSkip = !0),
          this.GachaBP.WhiteScreen &&
            (this.GachaBP.Timeline_0?.Stop(), this.GachaBP.WhiteScreenOff()),
          this.OnEndGacha();
      }),
      (this.OnEndGacha = () => {
        if (((this.IsShowTips = !0), this.GachaBP.IsSkip))
          if (this.MaxQuality === 5 || this.HasNewItems) {
            let e = this.OpenParam;
            e
              ? (e.IsOnlyShowGold = !0)
              : (e = {
                  SkipOnLoadResourceFinish: !1,
                  ResultViewHideExtraReward: !1,
                  IsOnlyShowGold: !0,
                }),
              UiManager_1.UiManager.OpenView("GachaScanView", e, () => {
                UiManager_1.UiManager.CloseView(this.Info.Name);
              });
          } else
            UiManager_1.UiManager.OpenView(
              "GachaResultView",
              this.OpenParam,
              () => {
                UiManager_1.UiManager.CloseView(this.Info.Name);
              },
            );
        else
          UiManager_1.UiManager.OpenView(
            "GachaScanView",
            this.OpenParam,
            () => {
              UiManager_1.UiManager.CloseView(this.Info.Name);
            },
          );
      }),
      (this.OnGachaInteractFinish = () => {
        (this.IsEnd = !0), this.IsShowTips;
      }),
      (this.OnGachaClick = (e) => {
        e
          ? ((this.IsHold = !0), (this.Delay = 0), (this.IsShowTips = !1))
          : (this.IsHold = !1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIDraggableComponent],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.OnClickSkip]]);
  }
  async OnBeforeStartAsync() {
    const e = [];
    for (const i of ModelManager_1.ModelManager.GachaModel.CurGachaResult)
      e.push(i.u5n.G3n);
    await ModelManager_1.ModelManager.GachaModel.PreloadGachaSequence(e);
  }
  OnBeforeShow() {
    const e = ModelManager_1.ModelManager.GachaModel.CurGachaResult.length;
    const i = ModelManager_1.ModelManager.GachaModel.CurGachaResult.reduce(
      (e, i) => {
        var t = i.u5n.G3n;
        var t =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t)
            ?.QualityId ?? 0;
        return (
          (this.HasNewItems = this.HasNewItems || (t >= 4 && i.IsNew)),
          Math.max(e, t)
        );
      },
      0,
    );
    this.InitGachaBp(e, i), this.InitAudioState(e, i);
  }
  OnStart() {
    this.GetButton(1).RootUIComp.SetUIActive(!0),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      ));
  }
  OnTick(e) {
    this.IsHold ||
      this.IsShowTips ||
      this.IsEnd ||
      ((this.Delay += e),
      this.Delay > SHOW_TIPS_DELAY && (this.IsShowTips = !0));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.EndGachaScene,
      this.OnEndGacha,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GachaClick,
        this.OnGachaClick,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GachaInteractFinish,
        this.OnGachaInteractFinish,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.EndGachaScene,
      this.OnEndGacha,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GachaClick,
        this.OnGachaClick,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GachaInteractFinish,
        this.OnGachaInteractFinish,
      );
  }
}
exports.DrawMainViewNew = DrawMainViewNew;
// # sourceMappingURL=DrawMainViewNew.js.map
