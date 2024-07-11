"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeOfDaySecondCircleItem = void 0);
const UE = require("ue");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem");
const TimeOfDayDefine_1 = require("../TimeOfDayDefine");
const TimeOfDayModel_1 = require("../TimeOfDayModel");
const ANIMAL_SCALE = 0.9;
const MIDDLE_TIME = 12;
const FULL_ANGLE = 360;
const ONE_HOUR_ANGLE = 30;
const LEFT_RANGE = 0.4;
const MIDDLE_RANGE = 0.5;
const RIGHT_RANGE = 0.6;
const BORDER_ALPHA = 0.65;
const BORDER_RIGHT = 0.9;
const BORDER_LEFT = 0.1;
const BORDER_LEFT_HIDE = 0.04;
const BORDER_RIGHT_HIDE = 0.96;
const BORDER_MIDDLE = 0.5;
const STONE2_BORDER_LEFT = 0.3;
const STONE2_BORDER_RIGHT = 0.7;
class TimeOfDaySecondCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.osi = void 0),
      (this._it = Rotator_1.Rotator.Create()),
      (this.rsi = new UE.Vector(ANIMAL_SCALE, ANIMAL_SCALE, ANIMAL_SCALE)),
      (this.yTo = () => {});
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UITexture],
      [5, UE.UIItem],
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
  RefreshItem(E) {
    (this.CurrentShowItemIndex = E),
      (this.osi = this.Pe[E]),
      this.$8e(),
      this.Cni();
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
      const R = FULL_ANGLE - ONE_HOUR_ANGLE * E;
      const _ = this.GetItem(0);
      (this._it.Yaw = R), _.SetUIRelativeRotation(this._it.ToUeRotator());
    }
  }
  SetData(E) {
    this.Pe = E;
  }
  OnMoveItem(E) {
    let R;
    var _ = this.GetAttachItem().ExhibitionView.ItemActor.GetWidth();
    const t = this.GetRootItem();
    var _ = (t.GetAnchorOffsetX() + _ / 2) / _;
    const e = t.RelativeScale3D;
    let D = 0;
    let i = 0;
    _ > BORDER_LEFT && _ < BORDER_MIDDLE
      ? ((D = (_ - BORDER_LEFT) / (BORDER_MIDDLE - BORDER_LEFT)),
        (i = MathUtils_1.MathUtils.Lerp(BORDER_ALPHA, 1, D)))
      : _ > BORDER_LEFT_HIDE && _ < BORDER_LEFT
        ? ((D = (_ - BORDER_LEFT_HIDE) / (BORDER_LEFT - BORDER_LEFT_HIDE)),
          (i = MathUtils_1.MathUtils.Lerp(0, BORDER_ALPHA, D)))
        : _ <= BORDER_LEFT_HIDE && (i = 0),
      _ >= BORDER_MIDDLE && _ < BORDER_RIGHT
        ? ((D = (_ - BORDER_MIDDLE) / (BORDER_RIGHT - BORDER_MIDDLE)),
          (i = MathUtils_1.MathUtils.Lerp(1, BORDER_ALPHA, D)))
        : _ >= BORDER_RIGHT && _ < BORDER_RIGHT_HIDE
          ? ((D = (_ - BORDER_RIGHT) / (BORDER_RIGHT_HIDE - BORDER_RIGHT)),
            (i = MathUtils_1.MathUtils.Lerp(BORDER_ALPHA, 0, D)))
          : _ >= BORDER_RIGHT_HIDE && (i = 0),
      this.GetItem(5).SetAlpha(i),
      (i =
        _ > STONE2_BORDER_LEFT && _ < BORDER_MIDDLE
          ? ((D =
              (_ - STONE2_BORDER_LEFT) / (BORDER_MIDDLE - STONE2_BORDER_LEFT)),
            MathUtils_1.MathUtils.Lerp(0, 1, D))
          : _ >= BORDER_MIDDLE && _ < STONE2_BORDER_RIGHT
            ? ((D =
                (_ - BORDER_MIDDLE) / (STONE2_BORDER_RIGHT - BORDER_MIDDLE)),
              MathUtils_1.MathUtils.Lerp(1, 0, D))
            : 0),
      this.GetTexture(4).SetAlpha(i),
      _ >= LEFT_RANGE && _ <= RIGHT_RANGE
        ? _ >= LEFT_RANGE && _ <= MIDDLE_RANGE
          ? ((D = _ - LEFT_RANGE),
            (R = MathUtils_1.MathUtils.Lerp(ANIMAL_SCALE, 1, 10 * D)),
            (R = new UE.Vector(R, R, R)),
            t.SetUIItemScale(R))
          : ((D = _ - MIDDLE_RANGE),
            (R = MathUtils_1.MathUtils.Lerp(1, ANIMAL_SCALE, 10 * D)),
            (_ = new UE.Vector(R, R, R)),
            t.SetUIItemScale(_))
        : e.X !== this.rsi.X && t.SetUIItemScale(this.rsi);
  }
  OnUnSelect() {}
  OnSelect() {
    (ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt =
      this.osi),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectTimeItem);
  }
}
exports.TimeOfDaySecondCircleItem = TimeOfDaySecondCircleItem;
// # sourceMappingURL=TimeOfDaySecondCircleItem.js.map
