"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleLinkView = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../Core/Common/Time"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  PROGRESS_SEQ_DURATION = 1;
class BattleLinkView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.g8a = !1),
      (this.kJa = 0),
      (this.FJa = 1),
      (this.ae = 0),
      (this.VJa = 0),
      (this.HJa = 0),
      (this.Vee = 1),
      (this.$pt = void 0),
      (this.iJa = !1),
      (this.rJa = !1),
      (this.oJa = 0),
      (this.nJa = (e, t) => {
        "PlayProgress" === t &&
          ((this.HJa = Math.max(0, Time_1.Time.Now - this.VJa)), this.M8a());
      }),
      (this.f8a = () => {
        (this.g8a = !1),
          this.UiViewSequence?.StopSequenceByKey("Progress"),
          this.CloseMe();
      }),
      (this.tpi = () => {
        this.g8a
          ? ((this.g8a = !1), this.$pt?.PlayLevelSequenceByName("StartLink"))
          : this.CloseMe();
      }),
      (this.owt = (e) => {
        var t, i;
        "StartLink" === e &&
          ((t = new UE.FName("CameraActor")),
          (i =
            ModelManager_1.ModelManager.CameraModel.FightCamera.DisplayComponent
              .CameraActor)) &&
          (this.sJa(i), this.aJa(i), this.$pt.SetActorTag(e, t, i));
      }),
      (this._cr = (e) => {
        "StartLink" === e &&
          (e =
            ModelManager_1.ModelManager.CameraModel.FightCamera.DisplayComponent
              .CameraActor) &&
          this.hJa(e);
      }),
      (this.n5a = (e) => {
        (this.g8a = !0),
          (this.ae = e),
          this.UiViewSequence?.StopSequenceByKey("Progress");
      }),
      (this.p8a = () => {
        var e = this.Vee * Time_1.Time.TimeDilation;
        this.RootActor?.GetSequencePlayerByKey(
          "Progress",
        )?.SequencePlayer?.SetPlayRate(e);
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnBattleLinkStop,
      this.f8a,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleLinkRestart,
        this.n5a,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.p8a,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnBattleLinkStop,
      this.f8a,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleLinkRestart,
        this.n5a,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.p8a,
      );
  }
  OnStart() {
    this.OpenParam && (this.ae = this.OpenParam),
      (this.g8a = !1),
      (this.kJa =
        ModelManager_1.ModelManager.BattleLinkModel.GetLinkDuration() /
        TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.FJa = PROGRESS_SEQ_DURATION / this.kJa),
      this.RootActor.OnSequencePlayEvent.Bind(this.nJa),
      (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      )),
      this.$pt.BindSequenceStartEvent(this.owt),
      this.$pt.BindSequenceCloseEvent(this._cr);
  }
  OnBeforeDestroy() {
    this.$pt = void 0;
  }
  OnAfterShow() {
    (this.g8a = !1),
      (this.VJa = Time_1.Time.Now),
      this.$pt?.PlayLevelSequenceByName("StartLink");
  }
  OnBeforeHide() {
    var e =
      ModelManager_1.ModelManager.CameraModel.FightCamera.DisplayComponent
        .CameraActor;
    e && this.hJa(e);
  }
  sJa(e) {
    e = e.CameraComponent;
    e &&
      ((this.rJa = e.PostProcessSettings.bOverride_KuroRadialBlurIntensity),
      (this.oJa = e.PostProcessSettings.KuroRadialBlurIntensity));
  }
  aJa(e) {
    !this.iJa &&
      ((this.iJa = !0), (e = e.CameraComponent)) &&
      (e.PostProcessSettings.bOverride_KuroRadialBlurIntensity = !0);
  }
  hJa(e) {
    this.iJa &&
      ((this.iJa = !1), (e = e.CameraComponent)) &&
      ((e.PostProcessSettings.bOverride_KuroRadialBlurIntensity = this.rJa),
      (e.PostProcessSettings.KuroRadialBlurIntensity = this.oJa));
  }
  v8a() {
    this.Vee = this.FJa;
    let e = this.FJa * Time_1.Time.TimeDilation;
    var t;
    0 !== this.ae &&
      ((t = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
      (t = Math.max(0, t - this.ae) + this.HJa),
      (t = Math.max(
        1,
        this.kJa - t / TimeUtil_1.TimeUtil.InverseMillisecond - 0.2,
      )),
      (this.Vee = PROGRESS_SEQ_DURATION / t),
      (e = this.Vee * Time_1.Time.TimeDilation)),
      this.RootActor?.GetSequencePlayerByKey(
        "Progress",
      )?.SequencePlayer?.SetPlayRate(e);
  }
  M8a() {
    this.PlaySequence("Progress", () => {
      this.tpi();
    }),
      this.v8a();
  }
}
exports.BattleLinkView = BattleLinkView;
//# sourceMappingURL=BattleLinkView.js.map
