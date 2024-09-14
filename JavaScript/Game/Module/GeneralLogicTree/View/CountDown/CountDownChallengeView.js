"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CountDownChallengeView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ONE_HUNDRED = 100,
  SWITCH_ANIM = "Switch",
  ADD_ANIM = "Add";
class CountDownChallengeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.k3a = 0),
      (this.mNe = 0),
      (this.MYt = 0),
      (this.Sqa = ""),
      (this.AYt = void 0),
      (this.yqa = void 0),
      (this.Iqa = void 0),
      (this.Tqa = void 0),
      (this.SequencePlayer = void 0),
      (this.PYt = (e, t) => {
        var i, s, h;
        (this.k3a = this.mNe),
          (this.mNe = e),
          this.mNe <= 0
            ? ((ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing =
                !0),
              this.CloseMe((e) => {
                e &&
                  (ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing =
                    !1);
              }))
            : ((e = 10 <= this.mNe),
              10 <= this.k3a &&
                !e &&
                (this.SequencePlayer.GetCurrentSequence() === SWITCH_ANIM &&
                  this.SequencePlayer.StopCurrentSequence(!1, !0),
                this.SequencePlayer.PlayLevelSequenceByName(SWITCH_ANIM)),
              (s =
                ((s = Math.floor(
                  (this.mNe % TimeUtil_1.TimeUtil.Hour) /
                    TimeUtil_1.TimeUtil.Minute,
                )) < 10
                  ? "0"
                  : "") + s),
              (h =
                ((h = Math.floor(this.mNe % TimeUtil_1.TimeUtil.Minute)) < 10
                  ? "0"
                  : "") + h),
              (i = Math.floor((this.mNe - Math.floor(this.mNe)) * ONE_HUNDRED)),
              this.AYt?.SetText(s + `:${h}:` + ((i < 10 ? "0" : "") + i)),
              this.AYt?.SetArtTextData(e ? this.Iqa : this.Tqa),
              t &&
                (this.yqa?.SetArtTextData(e ? this.Iqa : this.Tqa),
                (s = Math.round((t - this.MYt) / 1e3)),
                (this.MYt = t),
                0 !== s) &&
                (this.yqa?.SetText(0 < s ? `+${s}s` : s + "s"),
                this.SequencePlayer.GetCurrentSequence() === ADD_ANIM &&
                  this.SequencePlayer.StopCurrentSequence(!1, !0),
                this.SequencePlayer.PlayLevelSequenceByName(ADD_ANIM)),
              (h = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Sqa)),
              this.GetText(1)?.SetText(h));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIArtText],
      [3, UE.UIArtText],
    ];
  }
  OnStart() {
    var e = this.OpenParam,
      e =
        ((this.MYt = e.TimerEndTime),
        (this.Sqa = e.UiTitleKey),
        (this.AYt = this.GetArtText(2)),
        (this.yqa = this.GetArtText(3)),
        (this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.RootItem,
        )),
        (this.Iqa = this.AYt.GetArtTextData()),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "TextData_NumB1",
        ));
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUIArtTextData, (e, t) => {
      e && e.IsValid()
        ? (this.Tqa = e)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiImageSetting",
            19,
            "CountDownChallengeView找不到artTextData：TextData_NumB1",
          );
    });
  }
  OnAddEventListener() {
    super.OnAddEventListener(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGamePlayCdChanged,
        this.PYt,
      );
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGamePlayCdChanged,
        this.PYt,
      );
  }
}
exports.CountDownChallengeView = CountDownChallengeView;
//# sourceMappingURL=CountDownChallengeView.js.map
