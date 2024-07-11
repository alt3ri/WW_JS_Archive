"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeTrackControlView = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LongPressButtonItem_1 = require("../../Module/Common/Button/LongPressButtonItem");
const SceneTeamEvent_1 = require("../../Module/SceneTeam/SceneTeamEvent");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const TimeTrackController_1 = require("./TimeTrackController");
const TimeTrackControlPoint_1 = require("./TimeTrackControlPoint");
const ANGLE_RANGE = 26;
const ANGLE_MIN = -13;
const ANGLE_MAX = 13;
const LOOP_AKEVENT = "play_ui_com_time_loop";
const HIGHLIGHT_AKEVENT = "play_ui_com_time_bell";
class TimeTrackControlView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.lwe = void 0),
      (this._we = 0),
      (this.uwe = void 0),
      (this.cwe = 0),
      (this.mwe = -0),
      (this.dwe = 0),
      (this.Cwe = 0),
      (this.gwe = -0),
      (this.fwe = -0),
      (this.pwe = -0),
      (this.vwe = !1),
      (this.Mwe = !1),
      (this.IAr = !1),
      (this.Swe = -0),
      (this.Ewe = void 0),
      (this.ywe = void 0),
      (this.Iwe = void 0),
      (this.Twe = void 0),
      (this.Lwe = () => {
        TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose(),
          (this.IAr = !0),
          this.CloseMe();
      }),
      (this.Dwe = (t, i) => {
        i === Protocol_1.Aki.Protocol.lkn.Proto_ErrTimelineMove
          ? this.Rwe()
          : this.dwe !== t &&
            (this.uwe && this.uwe[this.dwe].ToggleSelected(!1),
            (this.dwe = t),
            (this.fwe = this.Uwe(t)),
            (this.pwe =
              (this.fwe - this.gwe) /
              this.Swe /
              CommonDefine_1.MILLIONSECOND_PER_SECOND),
            (this.vwe = !0),
            AudioSystem_1.AudioSystem.PostEvent(LOOP_AKEVENT));
      }),
      (this.Awe = () => {
        TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose(),
          (this.Mwe = !0),
          this.CloseMe();
      }),
      (this.Pwe = () => {
        this.xwe(!0);
      }),
      (this.wwe = () => {
        this.xwe(!1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[7, this.Awe]]);
  }
  OnStart() {
    (this.cwe = ANGLE_RANGE),
      (this.Cwe =
        ModelManager_1.ModelManager.TimeTrackControlModel.GetConfigStatesCounts()),
      (this.Swe =
        ModelManager_1.ModelManager.TimeTrackControlModel.GetConfigSegmentTime()),
      (this._we = this.Cwe - 2 ? this.Cwe - 2 : 0),
      this._we ? this.Bwe() : ((this.mwe = this.cwe), (this._we = 0)),
      (this.dwe =
        ModelManager_1.ModelManager.TimeTrackControlModel.ControlPoint),
      (this.gwe = this.Uwe(this.dwe)),
      (this.Ewe = this.GetItem(5)),
      (this.ywe = Rotator_1.Rotator.Create(0, this.gwe, 0)),
      this.Ewe.SetUIRelativeRotation(this.ywe.ToUeRotator()),
      (this.vwe = !1);
    const i = this.GetItem(4);
    (this.lwe = this.GetItem(3)), (this.uwe = new Array()), i.SetUIActive(!1);
    for (let t = 0; t < this.Cwe; t++) {
      var e = LguiUtil_1.LguiUtil.CopyItem(i, this.lwe);
      const s = (e.SetUIActive(!0), this.Uwe(t));
      var e = new TimeTrackControlPoint_1.TimeTrackControlPoint(e, t, s);
      e.UpdateState(
        ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(
          t,
        ),
      ),
        this.uwe.push(e);
    }
    this.uwe[this.dwe].ToggleSelected(!0),
      this.bwe(),
      (this.Iwe = new LongPressButtonItem_1.LongPressButtonItem(
        this.GetButton(0),
        4,
        () => {
          this.wwe();
        },
      )),
      (this.Twe = new LongPressButtonItem_1.LongPressButtonItem(
        this.GetButton(1),
        4,
        () => {
          this.Pwe();
        },
      ));
  }
  Bwe() {
    this.mwe = this.cwe / (this._we + 1);
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTimeTrackControlUpdate,
      this.Dwe,
    );
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTimeTrackControlUpdate,
      this.Dwe,
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.HasWithTarget(
      SceneTeamEvent_1.SceneTeam.Local,
      EventDefine_1.EEventName.CharBeHitLocal,
      this.Lwe,
    ) ||
      EventSystem_1.EventSystem.AddWithTarget(
        SceneTeamEvent_1.SceneTeam.Local,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.Lwe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.HasWithTarget(
      SceneTeamEvent_1.SceneTeam.Local,
      EventDefine_1.EEventName.CharBeHitLocal,
      this.Lwe,
    ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        SceneTeamEvent_1.SceneTeam.Local,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.Lwe,
      );
  }
  OnBeforeDestroy() {
    this.Iwe?.Clear(),
      this.Twe?.Clear(),
      this.uwe.forEach((t) => {
        t.Destroy();
      }),
      (this.uwe = void 0),
      AudioSystem_1.AudioSystem.ExecuteAction(LOOP_AKEVENT, 0),
      this.Mwe ||
        this.IAr ||
        TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose();
  }
  OnTick(t) {
    this.vwe &&
      ((t = t * this.pwe),
      (this.gwe += t),
      Math.abs(this.fwe - this.gwe) < Math.abs(t) && this.qwe(),
      (this.ywe.Yaw = this.gwe),
      this.Ewe.SetUIRelativeRotation(this.ywe.ToUeRotator()));
  }
  qwe() {
    if (
      ((this.gwe = this.fwe),
      (this.ywe.Yaw = this.gwe),
      this.Ewe.SetUIRelativeRotation(this.ywe.ToUeRotator()),
      AudioSystem_1.AudioSystem.ExecuteAction(LOOP_AKEVENT, 0),
      (this.vwe = !1),
      this.uwe)
    ) {
      this.uwe[this.dwe].ToggleSelected(!0);
      for (const i of this.uwe) {
        const t =
          ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(
            i.Index,
          );
        i.UpdateState(t),
          t && AudioSystem_1.AudioSystem.PostEvent(HIGHLIGHT_AKEVENT);
      }
      this.bwe();
    }
  }
  Uwe(t) {
    return MathUtils_1.MathUtils.RangeClamp(
      t * this.mwe,
      0,
      ANGLE_RANGE,
      ANGLE_MIN,
      ANGLE_MAX,
    );
  }
  xwe(t) {
    this.vwe ||
      (ModelManager_1.ModelManager.TimeTrackControlModel.CanUpdated &&
        (t
          ? this.dwe < this.Cwe - 1 &&
            TimeTrackController_1.TimeTrackController.TimelineTraceControlRequest(
              !0,
            )
          : this.dwe > 0 &&
            TimeTrackController_1.TimeTrackController.TimelineTraceControlRequest(
              !1,
            )));
  }
  Rwe() {
    this.UiViewSequence.PlaySequencePurely("Shake", !0, !1);
  }
  bwe() {
    let t = this.dwe;
    let i = this.dwe;
    for (
      t -= 1;
      t >= 0 &&
      ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(t);
      t--
    );
    let e;
    for (
      t >= 0
        ? ((e = (t + 1) / (this.Cwe - 1)),
          this.GetSprite(2).SetUIActive(!0),
          this.GetSprite(2).SetFillAmount(e))
        : this.GetSprite(2).SetUIActive(!1),
        i += 1;
      i < this.Cwe &&
      ModelManager_1.ModelManager.TimeTrackControlModel.IsControlPointUsable(i);
      i++
    );
    i < this.Cwe
      ? ((e = (this.Cwe - i) / (this.Cwe - 1)),
        this.GetSprite(8).SetUIActive(!0),
        this.GetSprite(8).SetFillAmount(e))
      : this.GetSprite(8).SetUIActive(!1);
  }
}
exports.TimeTrackControlView = TimeTrackControlView;
// # sourceMappingURL=TimeTrackControlView.js.map
