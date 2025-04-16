"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  CiacconaGalDefine_1 = require("../../CiacconaGalDefine"),
  CiacconaGalTextConfig_1 = require("../../CiacconaGalTextConfig"),
  CiacconaGalTitleItem_1 = require("../CiacconaGalTitleItem"),
  CiacconaGalStepPlayerNormalPanel_1 = require("./CiacconaGalStepPlayerNormalPanel"),
  CiacconaGalStepPlayerRechoosePanel_1 = require("./CiacconaGalStepPlayerRechoosePanel");
class CiacconaGalView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.jbc = void 0),
      (this.oUc = void 0),
      (this.lqe = void 0),
      (this.l4c = void 0),
      (this.L2c = 0),
      (this.w2c = 0),
      (this.C01 = ""),
      (this.Zy1 = 0),
      (this.AOe = (e) => {
        if ((this.jbc.Refresh(), this.L2c !== e)) {
          this.L2c = e;
          var e =
            ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(e);
          if ((e.ImagePath && this.p01(e.ImagePath), !this.C01)) {
            var i =
              ModelManager_1.ModelManager.CiacconaGalModel.GetCurStepDataList();
            for (let e = i.length - 1; 0 <= e; e--) {
              var t = i[e];
              if (t.ImagePath) {
                this.p01(t.ImagePath);
                break;
              }
            }
          }
          e.AudioEvent &&
            (this.w2c &&
              AudioSystem_1.AudioSystem.ExecuteAction(this.w2c, 0, {
                TransitionDuration:
                  CiacconaGalDefine_1.CIACCONA_VO_CROSSFADE_DURATION,
              }),
            (this.w2c = AudioSystem_1.AudioSystem.PostEvent(e.AudioEvent))),
            e.MusicState &&
              ((e = e.MusicState),
              AudioSystem_1.AudioSystem.SetState(
                CiacconaGalDefine_1.CIACCONA_MUSIC_STATE_NAME,
                e,
              ));
        }
      }),
      (this.Zqc = (e) => {
        this.GetItem(4).SetUIActive(2 === e || 3 === e),
          this.GetItem(5).SetUIActive(1 === e);
      }),
      (this.cmc = () => {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.OnClick();
      }),
      (this.nUc = (e, i) => {
        this.jbc.SetActive(!1), this.oUc.SetActive(!0), this.oUc.Refresh(e, i);
      }),
      (this.sUc = (e, i) => {
        this.jbc.SetActive(!0), this.oUc.SetActive(!1), (e.ChosenId = i.Id);
        e = 0 === i.ToStepId ? e.NextStepId : i.ToStepId;
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.TryContinue(
          e,
        );
      }),
      (this.aUc = () => {
        this.jbc.SetActive(!0), this.oUc.SetActive(!1);
      }),
      (this._4c = () => {}),
      (this.B_e = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(295);
        e.FunctionMap.set(2, () => {
          5 ===
          ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState()
            ? ControllerHolder_1.ControllerHolder.CiacconaGalController.ExitAvg()
            : this.CloseMe();
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.cmc],
        [6, this._4c],
      ]);
  }
  OnBeforeShow() {
    this.v01(), this.GetTexture(3).SetUIActive(!1);
  }
  async OnBeforeStartAsync() {
    (this.jbc =
      new CiacconaGalStepPlayerNormalPanel_1.CiacconaGalStepPlayerNormalPanel()),
      (this.oUc =
        new CiacconaGalStepPlayerRechoosePanel_1.CiacconaGalStepPlayerReChoosePanel()),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      (this.l4c = new CiacconaGalTitleItem_1.CiacconaTitleInspirationItem(
        ModelManager_1.ModelManager.CiacconaGalModel.ActivityData,
      ));
    var e = this.GetItem(1);
    await Promise.all([
      this.jbc.CreateThenShowByResourceIdAsync("UiItem_PlotReasoningInfoA", e),
      this.oUc.CreateByResourceIdAsync("UiItem_PlotReasoningInfoB", e),
      this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
    ]),
      await this.l4c.CreateThenShowByResourceIdAsync(
        "PnlTimeInfo",
        this.lqe.GetToggleRootItem(),
      ),
      this.lqe.SetCloseCallBack(this.B_e),
      this.lqe.SetHelpBtnActive(!1),
      this.lqe.SetTitleByTextIdAndArgNew(
        CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(
          CiacconaGalDefine_1.TEXT_ID_CIACCONA_AVG_TITLE,
        ),
      );
  }
  OnStart() {
    ControllerHolder_1.ControllerHolder.CiacconaGalController.AddOnStepDataUpdate(
      this.AOe,
    ),
      ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.AddOnStateChange(
        this.Zqc,
      ),
      ControllerHolder_1.ControllerHolder.CiacconaGalController.SetGalViewReady(
        !0,
      );
    var e =
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer
          .CurHandlingChapterId,
      e = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(e);
    e.MusicEvent &&
      (this.Zy1 = AudioSystem_1.AudioSystem.PostEvent(e.MusicEvent));
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.CiacconaGalController.SetGalViewReady(
      !1,
    ),
      ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.RemoveOnStateChange(
        this.Zqc,
      ),
      ControllerHolder_1.ControllerHolder.CiacconaGalController.RemoveOnStepDataUpdate(
        this.AOe,
      ),
      this.w2c &&
        AudioSystem_1.AudioSystem.ExecuteAction(this.w2c, 0, {
          TransitionDuration:
            CiacconaGalDefine_1.CIACCONA_VO_CROSSFADE_DURATION,
        }),
      this.Zy1 &&
        AudioSystem_1.AudioSystem.ExecuteAction(this.Zy1, 0, {
          TransitionDuration:
            CiacconaGalDefine_1.CIACCONA_VO_CROSSFADE_DURATION,
        }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnCiacconaAvgInspirationChoiceShow,
        !1,
      );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCiacconaAvgReChoose,
      this.nUc,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCiacconaReChooseConfirm,
        this.sUc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCiacconaReChooseCancel,
        this.aUc,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCiacconaAvgReChoose,
      this.nUc,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCiacconaReChooseConfirm,
        this.sUc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCiacconaReChooseCancel,
        this.aUc,
      );
  }
  async p01(e) {
    (this.C01 = e),
      await this.SetTextureAsync(e, this.GetTexture(3)),
      this.GetTexture(3).SetUIActive(!0);
  }
  v01() {
    ResourceSystem_1.ResourceSystem.Load(
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "T_PlotReasoningIcon01",
      ),
      UE.Texture,
    ),
      ResourceSystem_1.ResourceSystem.Load(
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_PlotReasoningIcon02",
        ),
        UE.Texture,
      ),
      ResourceSystem_1.ResourceSystem.Load(
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_PlotReasoningIcon03",
        ),
        UE.Texture,
      ),
      ResourceSystem_1.ResourceSystem.Load(
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_PlotReasoningIcon04",
        ),
        UE.Texture,
      ),
      ResourceSystem_1.ResourceSystem.Load(
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_PlotReasoningIcon05",
        ),
        UE.Texture,
      );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length) {
      var i = e[0];
      if ("ChoicesSelect" === i || "FirstChoice" === i)
        return this.jbc.GetGuideUiItemAndUiItemForShowEx(e);
      if ("Inspiration" === i) {
        e = this.l4c?.GetRootItem();
        if (e) return [e, e];
      }
    }
  }
}
exports.CiacconaGalView = CiacconaGalView;
//# sourceMappingURL=CiacconaGalView.js.map
