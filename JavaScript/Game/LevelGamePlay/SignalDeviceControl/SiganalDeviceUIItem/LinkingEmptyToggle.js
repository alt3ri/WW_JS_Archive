"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LinkingEmptyToggle = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LongPressButtonItem_1 = require("../../../Module/Common/Button/LongPressButtonItem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const SignalDeviceController_1 = require("../SignalDeviceController");
const SignalDeviceModel_1 = require("../SignalDeviceModel");
const LinkingDotItem_1 = require("./LinkingDotItem");
class LinkingEmptyToggle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Xy = -1),
      (this.FromIndex = -1),
      (this.IsFromDot = !1),
      (this.lRe = IAction_1.EPieceColorType.White),
      (this.jAe = void 0),
      (this.WAe = void 0),
      (this.KAe = void 0),
      (this.QAe = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Temp", 36, "OnToggleHover", ["index", this.Xy]),
          ModelManager_1.ModelManager.SignalDeviceModel.CurrentColor !==
          IAction_1.EPieceColorType.White
            ? AudioSystem_1.AudioSystem.PostEvent(
                "play_amb_interact_signal_ui_drag",
              )
            : AudioSystem_1.AudioSystem.PostEvent(
                "play_amb_interact_signal_ui_move",
              ),
          SignalDeviceController_1.SignalDeviceController.OnHovering(this.Xy);
      }),
      (this.XAe = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Temp", 36, "OnTogglePress", ["index", this.Xy]),
          this.WAe.SetLight(!0),
          SignalDeviceController_1.SignalDeviceController.OnDotPressed(
            this.Xy,
            this.lRe,
          ),
          ModelManager_1.ModelManager.SignalDeviceModel.CurrentColor !==
            IAction_1.EPieceColorType.White &&
            AudioSystem_1.AudioSystem.PostEvent(
              "play_amb_interact_signal_ui_choose",
            );
      }),
      (this.$Ae = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Temp", 36, "OnToggleRelease", ["index", this.Xy]),
          SignalDeviceController_1.SignalDeviceController.CheckLinking(this.Xy);
      }),
      (this.YAe = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Temp", 36, "OnToggleCancel", ["index", this.Xy]),
          SignalDeviceController_1.SignalDeviceController.CheckLinking(this.Xy);
      }),
      (this.JAe = (e, i) => {
        e &&
          i.includes(this.Xy) &&
          (this.WAe?.SetLight(!0),
          this.WAe?.SetFxBoost(!0),
          this.GetExtendToggle(0).SetEnable(!1)),
          !e &&
            i.includes(this.Xy) &&
            (this.WAe?.SetLight(!1),
            this.WAe?.RotateLine(!1),
            this.KAe?.Destroy());
      }),
      (this.zAe = () => {
        this.GetExtendToggle(0).SetEnable(!0),
          this.WAe?.SetLight(!1),
          this.WAe?.RotateLine(!1),
          this.KAe?.Destroy();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSignalDeviceLinkingCheck,
      this.JAe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignalDeviceReset,
        this.zAe,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSignalDeviceLinkingCheck,
      this.JAe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignalDeviceReset,
        this.zAe,
      );
  }
  InitData(e) {
    (this.Xy = e), this.GetExtendToggle(0).OnHover.Add(this.QAe);
  }
  SetDotData(e, i) {
    (this.WAe = new LinkingDotItem_1.LinkingDotItem()),
      this.WAe.CreateThenShowByActor(e.GetOwner()),
      this.WAe.InitIcon(i),
      (this.lRe = i),
      (this.jAe = new LongPressButtonItem_1.LongPressButtonItem(
        void 0,
        1,
        void 0,
      )),
      this.jAe.Initialize(
        this.GetExtendToggle(0),
        void 0,
        this.XAe,
        this.$Ae,
        this.YAe,
      );
  }
  SetLineData(e, i, t, s, n) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Temp", 36, "SetLineData", ["neighborType", t]),
      (this.KAe = i),
      this.KAe.CreateThenShowByActor(e.GetOwner()),
      this.KAe.InitIcon(t, !0),
      (this.FromIndex = s),
      (this.IsFromDot = n);
  }
  ResetStraightLineData(e, i, t) {
    this.KAe.Destroy(),
      (this.KAe = i),
      this.KAe.CreateThenShowByActor(e.GetOwner()),
      i.LineType === 3
        ? this.KAe.InitIcon(Math.abs(this.FromIndex - t) === 2 ? 1 : 4, !1)
        : i.LineType === 4 &&
          (this.FromIndex - t == 2 * -SignalDeviceModel_1.ROWNUM
            ? this.KAe.InitIcon(this.IsFromDot ? 4 : 3, !1)
            : this.FromIndex - t == 2 * SignalDeviceModel_1.ROWNUM
              ? this.KAe.InitIcon(this.IsFromDot ? 3 : 4, !1)
              : this.FromIndex - t == 2
                ? this.KAe.InitIcon(this.IsFromDot ? 1 : 2, !1)
                : this.KAe.InitIcon(this.IsFromDot ? 2 : 1, !1));
  }
  ClearLineData() {
    this.KAe.Destroy(), (this.KAe = void 0);
  }
  SetLineHalf() {
    const e = ModelManager_1.ModelManager.SignalDeviceModel.NeighboringType(
      this.FromIndex,
      this.Xy,
    );
    this.KAe.SetLineHalf(e);
  }
  ResetCornerLineData(e, i, t, s, n) {
    this.KAe.Destroy(),
      (this.KAe = i),
      this.KAe.CreateThenShowByActor(e.GetOwner());
    (e = t - this.FromIndex), (s -= t);
    i.LineType === 2 || i.LineType === 0
      ? e * s == -SignalDeviceModel_1.ROWNUM
        ? this.KAe.InitIcon(e < s ? 1 : 2)
        : this.KAe.InitIcon(e < s ? 3 : 4)
      : e * s === SignalDeviceModel_1.ROWNUM
        ? this.KAe.InitIcon(e < s ? 1 : 2)
        : this.KAe.InitIcon(e < s ? 4 : 3);
  }
  SetDotRay(e, i = 0) {
    this.WAe?.RotateLine(e, i);
  }
}
exports.LinkingEmptyToggle = LinkingEmptyToggle;
// # sourceMappingURL=LinkingEmptyToggle.js.map
