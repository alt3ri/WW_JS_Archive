"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeOfDaySecondCircleItem = void 0);
const UE = require("ue"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem"),
  TimeOfDayDefine_1 = require("../TimeOfDayDefine"),
  TimeOfDayModel_1 = require("../TimeOfDayModel"),
  ANIMAL_SCALE = 0.9,
  MIDDLE_TIME = 12,
  FULL_ANGLE = 360,
  ONE_HOUR_ANGLE = 30,
  LEFT_RANGE = 0.4,
  MIDDLE_RANGE = 0.5,
  RIGHT_RANGE = 0.6,
  BORDER_ALPHA = 0.65,
  BORDER_RIGHT = 0.9,
  BORDER_LEFT = 0.1,
  BORDER_LEFT_HIDE = 0.04,
  BORDER_RIGHT_HIDE = 0.96,
  BORDER_MIDDLE = 0.5,
  STONE2_BORDER_LEFT = 0.3,
  STONE2_BORDER_RIGHT = 0.7;
class TimeOfDaySecondCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.rai = void 0),
      (this.Iot = Rotator_1.Rotator.Create()),
      (this.nai = new UE.Vector(ANIMAL_SCALE, ANIMAL_SCALE, ANIMAL_SCALE)),
      (this.MLo = () => {});
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
          this.MLo();
        },
      ],
    ];
  }
  RefreshItem(E) {
    (this.CurrentShowItemIndex = E),
      (this.rai = this.Pe[E]),
      this.l7e(),
      this.gsi();
  }
  l7e() {
    var E;
    this.rai &&
      (this.GetText(2).SetText(this.rai.ShowName),
      (E = TimeOfDayModel_1.TodDayTime.ConvertToHourMinuteString(
        this.rai.SetTime,
      )),
      this.GetText(1).SetText(E));
  }
  gsi() {
    if (this.rai) {
      let E = this.rai.SetTime / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR;
      E > MIDDLE_TIME && (E -= MIDDLE_TIME);
      var R = FULL_ANGLE - ONE_HOUR_ANGLE * E,
        _ = this.GetItem(0);
      (this.Iot.Yaw = R), _.SetUIRelativeRotation(this.Iot.ToUeRotator());
    }
  }
  SetData(E) {
    this.Pe = E;
  }
  OnMoveItem(E) {
    var R,
      _ = this.GetAttachItem().ExhibitionView.ItemActor.GetWidth(),
      t = this.GetRootItem(),
      _ = (t.GetAnchorOffsetX() + _ / 2) / _,
      e = t.RelativeScale3D;
    let D = 0,
      i = 0;
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
        : e.X !== this.nai.X && t.SetUIItemScale(this.nai);
  }
  OnUnSelect() {}
  OnSelect() {
    (ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt =
      this.rai),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectTimeItem);
  }
}
exports.TimeOfDaySecondCircleItem = TimeOfDaySecondCircleItem;
//# sourceMappingURL=TimeOfDaySecondCircleItem.js.map
