"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeOfDaySecondCircleAttachItem = void 0);
const UE = require("ue");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem");
const TimeOfDayDefine_1 = require("../TimeOfDayDefine");
const TimeOfDayModel_1 = require("../TimeOfDayModel");
const ANIMAL_SCALE = 0.8;
const MIDDLE_TIME = 12;
const FULL_ANGLE = 360;
const ONE_HOUR_ANGLE = 30;
const LEFT_RANGE = 0.4;
const MIDDLE_RANGE = 0.5;
const RIGHT_RANGE = 0.6;
const BORDER_ALPHA = 0.8;
const BORDER_RIGHT = 0.65625;
const BORDER_LEFT = 0.34375;
const BORDER_LEFT_HIDE = 0.03125;
const BORDER_RIGHT_HIDE = 0.96875;
const BORDER_MIDDLE = 0.5;
const STONE2_BORDER_LEFT = 0.375;
const STONE2_BORDER_RIGHT = 0.625;
const NIAGARA_MIN_VALUE = 0.2;
class TimeOfDaySecondCircleAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments),
      (this.osi = void 0),
      (this._it = Rotator_1.Rotator.Create()),
      (this.rsi = new UE.Vector(ANIMAL_SCALE, ANIMAL_SCALE, ANIMAL_SCALE)),
      (this.yTo = () => {
        void 0 !== this.osi &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ClickTimeItem,
            this,
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UITexture],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
    this.BtnBindInfo = [
      [
        3,
        () => {
          this.yTo();
        },
      ],
    ];
  }
  OnRefreshItem(E) {
    (this.osi = E),
      this.GetItem(6).SetUIActive(void 0 === E),
      this.GetItem(7).SetUIActive(void 0 !== E),
      this.$8e(),
      this.Cni(),
      this.OnMoveItem();
  }
  $8e() {
    let E;
    this.osi &&
      (this.GetText(2).SetText(this.osi.ShowName),
      (E = TimeOfDayModel_1.TodDayTime.ConvertToHourMinuteString(
        this.osi.SetTime,
      )),
      this.GetText(1).SetText(E));
  }
  Cni() {
    if (this.osi) {
      let E = this.osi.SetTime / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR;
      E > MIDDLE_TIME && (E -= MIDDLE_TIME);
      const t = FULL_ANGLE - ONE_HOUR_ANGLE * E;
      const R = this.GetItem(0);
      (this._it.Yaw = t), R.SetUIRelativeRotation(this._it.ToUeRotator());
    }
  }
  OnMoveItem() {
    let E;
    let t = this.GetCurrentMovePercentage();
    const R = this.RootItem.RelativeScale3D;
    let e = 0;
    let _ = 0;
    let D = 0;
    t >= BORDER_LEFT && t < BORDER_MIDDLE
      ? ((e = (t - BORDER_LEFT) / (BORDER_MIDDLE - BORDER_LEFT)),
        (_ = MathUtils_1.MathUtils.Lerp(BORDER_ALPHA, 1, e)))
      : t > BORDER_LEFT_HIDE && t < BORDER_LEFT
        ? ((e = (t - BORDER_LEFT_HIDE) / (BORDER_LEFT - BORDER_LEFT_HIDE)),
          (_ = MathUtils_1.MathUtils.Lerp(0.4, BORDER_ALPHA, e)))
        : t <= BORDER_LEFT_HIDE && (_ = 0.4),
      t >= BORDER_MIDDLE && t < BORDER_RIGHT
        ? ((e = (t - BORDER_MIDDLE) / (BORDER_RIGHT - BORDER_MIDDLE)),
          (_ = MathUtils_1.MathUtils.Lerp(1, BORDER_ALPHA, e)))
        : t >= BORDER_RIGHT && t < BORDER_RIGHT_HIDE
          ? ((e = (t - BORDER_RIGHT) / (BORDER_RIGHT_HIDE - BORDER_RIGHT)),
            (_ = MathUtils_1.MathUtils.Lerp(BORDER_ALPHA, 0.4, e)))
          : t >= BORDER_RIGHT_HIDE && (_ = 0.4),
      this.GetItem(5).SetAlpha(_),
      (D =
        t > STONE2_BORDER_LEFT && t < BORDER_MIDDLE
          ? ((e =
              (t - STONE2_BORDER_LEFT) / (BORDER_MIDDLE - STONE2_BORDER_LEFT)),
            (_ = MathUtils_1.MathUtils.Lerp(0, 1, e)),
            -(
              TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve?.GetFloatValue(
                1 - e,
              ) ?? 0
            ))
          : t >= BORDER_MIDDLE && t < STONE2_BORDER_RIGHT
            ? ((e =
                (t - BORDER_MIDDLE) / (STONE2_BORDER_RIGHT - BORDER_MIDDLE)),
              (_ = MathUtils_1.MathUtils.Lerp(1, 0, e)),
              TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve?.GetFloatValue(
                e,
              ) ?? 0)
            : ((_ = 0),
              (E =
                TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve?.GetFloatValue(
                  1,
                ) ?? 0),
              t < STONE2_BORDER_LEFT ? -E : E)),
      this.GetItem(7).SetAnchorOffsetX(D),
      this.GetItem(6).SetAnchorOffsetX(D),
      this.GetItem(8).SetAlpha(Math.max(NIAGARA_MIN_VALUE, _)),
      this.GetTexture(4).SetAlpha(_),
      t >= LEFT_RANGE && t <= RIGHT_RANGE
        ? t >= LEFT_RANGE && t <= MIDDLE_RANGE
          ? ((e = t - LEFT_RANGE),
            (E = MathUtils_1.MathUtils.Lerp(ANIMAL_SCALE, 1, 10 * e)),
            (E = new UE.Vector(E, E, E)),
            this.RootItem.SetUIItemScale(E))
          : ((e = t - MIDDLE_RANGE),
            (E = MathUtils_1.MathUtils.Lerp(1, ANIMAL_SCALE, 10 * e)),
            (t = new UE.Vector(E, E, E)),
            this.RootItem.SetUIItemScale(t))
        : R.X !== this.rsi.X && this.RootItem.SetUIItemScale(this.rsi);
  }
  OnUnSelect() {}
  OnSelect() {
    (ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt =
      this.osi),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectTimeItem);
  }
}
(exports.TimeOfDaySecondCircleAttachItem =
  TimeOfDaySecondCircleAttachItem).MiddleOffsetCurve = void 0;
// # sourceMappingURL=TimeOfDaySecondCircleAttachItem.js.map
