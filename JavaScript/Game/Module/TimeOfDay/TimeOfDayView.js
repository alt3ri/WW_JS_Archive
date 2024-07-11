"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeOfDayView = void 0);
const ue_1 = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
  TimeOfDayController_1 = require("./TimeOfDayController"),
  TimeOfDayDefine_1 = require("./TimeOfDayDefine"),
  TimeOfDayModel_1 = require("./TimeOfDayModel"),
  TodTimeAdjustingAnimation_1 = require("./TodTimeAdjustingAnimation");
class UiItemSwitcher {
  constructor(i, t) {
    (this.bTo = t), (this.qTo = i);
  }
  SwitchTo(i) {
    this.bTo.SetUIActive(i), this.qTo.SetUIActive(!i);
  }
}
class TodTimeAdjustingClock {
  constructor() {
    (this.StartSecond = -1), (this.ToSecond = -1);
  }
  get DeltaSecond() {
    return this.ToSecond - this.StartSecond;
  }
  get DeltaMinute() {
    return (
      Math.floor(this.ToSecond / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR) -
      Math.floor(this.StartSecond / TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR)
    );
  }
  get DeltaSecondOneDay() {
    return TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(this.DeltaSecond);
  }
  get DeltaDayOneDay() {
    return TimeOfDayModel_1.TodDayTime.ConvertToDay(this.DeltaSecondOneDay);
  }
  get ToSecondOneDay() {
    return TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(this.ToSecond);
  }
  get StartSecondOneDay() {
    return TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(this.StartSecond);
  }
  get IsAdjusting() {
    return 0 <= this.StartSecond;
  }
  get IsTomorrow() {
    return this.ToSecond >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
  }
  get DayTextId() {
    switch (Math.floor(this.ToSecond / TimeOfDayDefine_1.TOD_SECOND_PER_DAY)) {
      case 2:
        return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "TimeOfDayPlusTwoDay",
        );
      case 1:
        return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "TimeOfDayTomorrow",
        );
      default:
        return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "TimeOfDayToday",
        );
    }
  }
  get IsAdjustingMoreThanOneDay() {
    return this.DeltaSecond >= TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
  }
  get IsAdjustingMoreThanMinLimit() {
    return this.DeltaMinute >= TimeOfDayDefine_1.TOD_MIN_ADJUST_MINUTE;
  }
  get IsAdjustingToMaxLimit() {
    return (
      this.DeltaSecond >=
      TimeOfDayDefine_1.TOD_MAX_ADJUST_DAY *
        TimeOfDayDefine_1.TOD_SECOND_PER_DAY
    );
  }
  Start() {
    (this.StartSecond =
      ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second),
      (this.ToSecond = this.StartSecond);
  }
  Reset() {
    (this.StartSecond = -1), (this.ToSecond = -1);
  }
  AdjustToSecond(i, t) {
    if (!i || isNaN(i)) return [!1, 0];
    if (!this.IsAdjusting) return [!1, 0];
    let e = 0;
    if (t) {
      if (
        (e = this.ToSecond + i) >
        this.StartSecond +
          TimeOfDayDefine_1.TOD_MAX_ADJUST_DAY *
            TimeOfDayDefine_1.TOD_SECOND_PER_DAY
      )
        return [
          !1,
          this.StartSecond +
            TimeOfDayDefine_1.TOD_MAX_ADJUST_DAY *
              TimeOfDayDefine_1.TOD_SECOND_PER_DAY -
            this.ToSecond,
        ];
    } else if ((e = this.ToSecond - i) < this.StartSecond)
      return [!1, this.ToSecond - this.StartSecond];
    return (this.ToSecond = e), [!0, 0];
  }
  AdjustStartSecond(i) {
    i &&
      !isNaN(i) &&
      this.IsAdjusting &&
      ((this.StartSecond = i), this.StartSecond > this.ToSecond) &&
      (this.StartSecond = this.ToSecond);
  }
  DebugPrint() {
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "TimeOfDay",
        17,
        "TodTimeAdjustingClock",
        ["this.StartSecond", this.StartSecond],
        ["this.ToSecond", this.ToSecond],
      );
  }
}
class TimeOfDayView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.GTo = Vector_1.Vector.Create()),
      (this.NTo = Vector_1.Vector.Create()),
      (this.gme = Vector_1.Vector.Create()),
      (this.fz = Vector_1.Vector.Create()),
      (this.OTo = Vector_1.Vector.Create()),
      (this.kTo = Rotator_1.Rotator.Create()),
      (this.FTo = Rotator_1.Rotator.Create(0, 0, 180)),
      (this.VTo = new Map()),
      (this.HTo = void 0),
      (this.jTo = void 0),
      (this.WTo = void 0),
      (this.KTo = void 0),
      (this.O3t = void 0),
      (this.QTo = () => {
        if (!this.jTo.IsAdjusting) {
          var i =
            ModelManager_1.ModelManager.TimeOfDayModel.GameTime
              .HourMinuteString;
          this.GetText(0).SetText(i), this.GetText(4).SetText(i);
          const e =
            ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState;
          this.VTo.forEach((i, t) => {
            i.SwitchTo(t === e);
          }),
            (this.kTo.Yaw = this.XTo(
              ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
            )),
            this.GetTexture(16).SetUIRelativeRotation(this.kTo.ToUeRotator()),
            this.GetItem(17).SetUIRelativeRotation(this.kTo.ToUeRotator()),
            this.GetItem(25).SetUIRelativeRotation(this.kTo.ToUeRotator()),
            this.GetItem(18).SetUIRelativeRotation(this.FTo.ToUeRotator()),
            this.GetItem(19).SetUIRelativeRotation(this.FTo.ToUeRotator());
        }
      }),
      (this.$To = (i) => {
        this.jTo.IsAdjusting ||
          (this.jTo.Start(),
          this.GTo.DeepCopy(i.pointerPosition),
          this.NTo.DeepCopy(i.pointerPosition),
          (this.FTo.Yaw = this.XTo(this.jTo.StartSecond)),
          this.GetItem(19).SetUIRelativeRotation(this.FTo.ToUeRotator()),
          this.GetItem(18).SetUIRelativeRotation(this.FTo.ToUeRotator()),
          this.GetTexture(2).SetFillDirectionFlip(!1),
          this.GetTexture(3).SetFillDirectionFlip(!1));
      }),
      (this.YTo = (i) => {
        var t, e;
        this.NTo.IsZero() || this.GTo.IsZero()
          ? (this.NTo.DeepCopy(i.pointerPosition),
            this.GTo.DeepCopy(i.pointerPosition))
          : ((i = Vector_1.Vector.Create(i.pointerPosition)),
            (t = this.JTo(this.NTo, i)),
            (e = this.zTo(this.NTo, i)),
            (e = this.ZTo(e)),
            (e = this.jTo.AdjustToSecond(e, t))[0]
              ? this.NTo.DeepCopy(i)
              : e[1] &&
                (this.jTo.AdjustToSecond(e[1], t), this.NTo.DeepCopy(this.GTo)),
            this.eLo());
      }),
      (this.tLo = (i) => {
        this.NTo.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
          this.GTo.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
      }),
      (this.iLo = (i, t) => {
        t &&
          (this.GTo.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
          this.NTo.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
          (t = ue_1.LGUIBPLibrary.GetUIItemPositionInViewPort(
            GlobalData_1.GlobalData.World,
            this.GetItem(17),
          )),
          (this.HTo = Vector_1.Vector.Create(t.X, t.Y, 0)));
      }),
      (this.L1i = () => {
        TimeOfDayController_1.TimeOfDayController.AdjustTime(
          this.jTo.ToSecond,
          Protocol_1.Aki.Protocol.h4s.Proto_PlayerOperate,
        ),
          TimeOfDayController_1.TimeOfDayController.PauseTime(),
          UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Test",
              8,
              "OnClickBtnConfirm:" +
                ModelManager_1.ModelManager.CameraModel.CurrentCameraActor.GetName(),
            );
        var i = CommonParamById_1.configCommonParamById.GetIntConfig(
            "TimeCameraSettingName",
          ),
          t = CommonParamById_1.configCommonParamById.GetIntConfig(
            "TimeCameraBlendDataName",
          ),
          t =
            ((this.O3t =
              UiCameraAnimationManager_1.UiCameraAnimationManager.PlayCameraAnimationFromCurrent(
                i.toString(),
                t.toString(),
              )),
            ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationConfig(
              i.toString(),
            ));
        this.oLo(),
          (this.KTo = TimerSystem_1.TimerSystem.Delay(() => {
            this.rLo(), this.WTo.Play(this.jTo.StartSecond, this.jTo.ToSecond);
          }, CommonDefine_1.MILLIONSECOND_PER_SECOND * t.BlendInTime));
      }),
      (this.xli = () => {
        this.CloseMe();
      }),
      (this.rLo = () => {
        (this.FTo.Yaw = this.XTo(this.jTo.ToSecond)),
          this.GetTexture(2).SetFillDirectionFlip(!0),
          this.GetTexture(3).SetFillDirectionFlip(!0),
          this.GetItem(18).SetUIRelativeRotation(this.FTo.ToUeRotator()),
          this.GetItem(19).SetUIRelativeRotation(this.FTo.ToUeRotator()),
          this.GetItem(23).SetUIActive(!1),
          this.GetItem(24).SetUIActive(!1);
      }),
      (this.nLo = (i) => {
        this.jTo.AdjustStartSecond(i);
        var t,
          e = this.jTo.StartSecondOneDay;
        this.jTo.IsAdjustingMoreThanOneDay
          ? (this.GetTexture(2).SetFillAmount(1),
            (t = this.jTo.IsAdjustingToMaxLimit ? 1 : this.jTo.DeltaDayOneDay),
            this.GetTexture(3).SetFillAmount(t))
          : (this.GetTexture(2).SetFillAmount(this.jTo.DeltaDayOneDay),
            this.GetTexture(3).SetFillAmount(0));
        const s = TimeOfDayModel_1.TodDayTime.ConvertToDayState(e);
        this.VTo.forEach((i, t) => {
          i.SwitchTo(t === s);
        }),
          (this.kTo.Yaw = this.XTo(e)),
          this.GetTexture(16).SetUIRelativeRotation(this.kTo.ToUeRotator()),
          this.GetText(0).SetText(
            TimeOfDayModel_1.TodDayTime.ConvertToHourMinuteString(e),
          ),
          TimeOfDayController_1.TimeOfDayController.SyncGlobalGameTime(
            TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(i),
          );
      }),
      (this.sLo = () => {
        UiLayer_1.UiLayer.SetShowNormalMaskLayer(!1);
        var i = CommonParamById_1.configCommonParamById.GetIntConfig(
          "TimeCameraBlendDataName",
        );
        UiCameraAnimationManager_1.UiCameraAnimationManager.PlayCameraAnimationFromCurrent(
          this.O3t.GetHandleName(),
          i.toString(),
        ),
          TimeOfDayController_1.TimeOfDayController.ResumeTimeScale(),
          this.jTo.Reset(),
          this.Z9e();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, ue_1.UIText],
      [1, ue_1.UIButtonComponent],
      [15, ue_1.UIButtonComponent],
      [2, ue_1.UITexture],
      [3, ue_1.UITexture],
      [4, ue_1.UIText],
      [5, ue_1.UIText],
      [6, ue_1.UIItem],
      [7, ue_1.UIItem],
      [8, ue_1.UIItem],
      [9, ue_1.UIItem],
      [10, ue_1.UIItem],
      [11, ue_1.UIItem],
      [12, ue_1.UIItem],
      [13, ue_1.UIItem],
      [14, ue_1.UIDraggableComponent],
      [16, ue_1.UITexture],
      [17, ue_1.UIItem],
      [18, ue_1.UIItem],
      [19, ue_1.UIItem],
      [20, ue_1.UIItem],
      [21, ue_1.UIText],
      [22, ue_1.UIInteractionGroup],
      [23, ue_1.UIItem],
      [24, ue_1.UIItem],
      [25, ue_1.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.L1i],
        [15, this.xli],
      ]);
  }
  OnStart() {
    this.VTo.set(0, new UiItemSwitcher(this.GetItem(6), this.GetItem(7))),
      this.VTo.set(1, new UiItemSwitcher(this.GetItem(8), this.GetItem(9))),
      this.VTo.set(2, new UiItemSwitcher(this.GetItem(10), this.GetItem(11))),
      this.VTo.set(3, new UiItemSwitcher(this.GetItem(12), this.GetItem(13)));
    var i = ue_1.LGUIBPLibrary.GetUIItemPositionInViewPort(
      GlobalData_1.GlobalData.World,
      this.GetItem(17),
    );
    (this.HTo = Vector_1.Vector.Create(i.X, i.Y, 0)),
      (this.jTo = new TodTimeAdjustingClock()),
      (this.WTo = new TodTimeAdjustingAnimation_1.TodTimeAdjustingAnimation(
        ConfigManager_1.ConfigManager.TimeOfDayConfig.GetMaxV(),
        ConfigManager_1.ConfigManager.TimeOfDayConfig.GetA(),
        this.nLo,
        this.sLo,
      )),
      this.Z9e(),
      this.QTo();
  }
  OnBeforeDestroy() {
    this.jTo.Reset(), this.WTo.Stop(), this.oLo();
  }
  OnTick(i) {
    this.WTo?.Tick(i);
  }
  OnAddEventListener() {
    var i = this.GetDraggable(14);
    i.OnPointerBeginDragCallBack.Bind((i) => {
      this.$To(i);
    }),
      i.OnPointerDragCallBack.Bind((i) => {
        this.YTo(i);
      }),
      i.OnPointerEndDragCallBack.Bind((i) => {
        this.tLo(i);
      }),
      i.OnUIDimensionsChangedCallBack.Bind((i, t) => {
        this.iLo(i, t);
      }),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TodTimeChange,
        this.QTo,
      );
  }
  OnRemoveEventListener() {
    var i = this.GetDraggable(14);
    i.OnPointerBeginDragCallBack.Unbind(),
      i.OnPointerDragCallBack.Unbind(),
      i.OnPointerEndDragCallBack.Unbind(),
      i.OnUIDimensionsChangedCallBack.Unbind(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TodTimeChange,
        this.QTo,
      );
  }
  oLo() {
    TimerSystem_1.TimerSystem.Has(this.KTo) &&
      TimerSystem_1.TimerSystem.Remove(this.KTo),
      (this.KTo = void 0);
  }
  Z9e() {
    this.GetTexture(2).SetFillAmount(0),
      this.GetTexture(3).SetFillAmount(0),
      this.GetItem(18).SetUIActive(!0),
      this.GetItem(19).SetUIActive(!0),
      this.GetItem(23).SetUIActive(!0),
      this.GetItem(24).SetUIActive(!0),
      this.aLo(!1),
      this.GetText(5).ShowTextNew(this.jTo.DayTextId);
  }
  eLo() {
    var i;
    this.jTo.IsAdjustingMoreThanOneDay
      ? (this.GetTexture(2).SetFillAmount(1),
        (i = this.jTo.IsAdjustingToMaxLimit ? 1 : this.jTo.DeltaDayOneDay),
        this.GetTexture(3).SetFillAmount(i))
      : (this.GetTexture(2).SetFillAmount(this.jTo.DeltaDayOneDay),
        this.GetTexture(3).SetFillAmount(0)),
      this.GetText(5).ShowTextNew(this.jTo.DayTextId),
      this.aLo(this.jTo.IsAdjustingMoreThanMinLimit),
      (this.kTo.Yaw = this.XTo(this.jTo.ToSecondOneDay)),
      this.GetItem(17).SetUIRelativeRotation(this.kTo.ToUeRotator()),
      this.GetItem(25).SetUIRelativeRotation(this.kTo.ToUeRotator()),
      this.GetText(4).SetText(
        TimeOfDayModel_1.TodDayTime.ConvertToHourMinuteString(
          this.jTo.ToSecondOneDay,
        ),
      );
  }
  aLo(i) {
    this.GetInteractionGroup(22).SetInteractable(i);
    i = i ? "TimeOfDayConfirmTextOn" : "TimeOfDayConfirmTextOff";
    this.GetText(21).ShowTextNew(
      ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(i),
    );
  }
  XTo(i) {
    return (
      -(
        TimeOfDayModel_1.TodDayTime.ConvertToOneDaySecond(i) /
        TimeOfDayDefine_1.TOD_SECOND_PER_DAY
      ) * TimeOfDayDefine_1.TOD_CIRCLE_ANGLE
    );
  }
  ZTo(i) {
    return (
      (i / TimeOfDayDefine_1.TOD_CIRCLE_ANGLE) *
      TimeOfDayDefine_1.TOD_SECOND_PER_DAY
    );
  }
  zTo(i, t) {
    i.Subtraction(this.HTo, this.gme), t.Subtraction(this.HTo, this.fz);
    t = this.gme.CosineAngle2D(this.fz);
    let e = Math.acos(t) * MathUtils_1.MathUtils.RadToDeg;
    return (e = i.X < 0 ? TimeOfDayDefine_1.TOD_CIRCLE_ANGLE - e : e);
  }
  JTo(i, t) {
    return (
      i.Subtraction(this.HTo, this.gme),
      t.Subtraction(this.HTo, this.fz),
      Vector_1.Vector.CrossProduct(this.gme, this.fz, this.OTo),
      0 < this.OTo.Z
    );
  }
}
exports.TimeOfDayView = TimeOfDayView;
//# sourceMappingURL=TimeOfDayView.js.map
