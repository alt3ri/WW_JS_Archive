"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSideEnergyUnit = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  CharacterAttributeTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  HudUnitBase_1 = require("../HudUnitBase"),
  MAX_DELTA_TIME = 200,
  MIN_DELTA_OFFSET = 0.5,
  MAX_POS_OFFSET = 500,
  OFFSET_X = -150;
class RoleSideEnergyUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.CueConfig = void 0),
      (this.RoleData = void 0),
      (this.AttrId = 0),
      (this.MaxAttrId = 0),
      (this.OffsetX = 0),
      (this.OffsetY = 0),
      (this.SpeedX = 0),
      (this.SpeedY = 0),
      (this.OnAttrChanged = (t, i, s) => {
        this.RefreshBarPercent();
      });
  }
  InitInfo(t, i) {
    (this.CueConfig = t),
      (this.RoleData = i),
      (this.AttrId = t.AttrId),
      (this.MaxAttrId =
        CharacterAttributeTypes_1.attributeIdsWithMax.get(this.AttrId) ?? 0),
      this.AddEvents(),
      this.RefreshBarPercent();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnBeforeDestroy() {
    this.RemoveEvents(),
      (this.CueConfig = void 0),
      (this.RoleData = void 0),
      super.OnBeforeDestroy();
  }
  AddEvents() {
    0 !== this.AttrId &&
      this.RoleData?.AttributeComponent &&
      (this.RoleData.AttributeComponent.AddListener(
        this.AttrId,
        this.OnAttrChanged,
      ),
      this.RoleData.AttributeComponent.AddListener(
        this.MaxAttrId,
        this.OnAttrChanged,
      ));
  }
  RemoveEvents() {
    0 !== this.AttrId &&
      this.RoleData?.AttributeComponent &&
      (this.RoleData.AttributeComponent.RemoveListener(
        this.AttrId,
        this.OnAttrChanged,
      ),
      this.RoleData.AttributeComponent.RemoveListener(
        this.MaxAttrId,
        this.OnAttrChanged,
      ));
  }
  RefreshBarPercent() {
    var t, i;
    0 !== this.AttrId &&
      this.RoleData?.AttributeComponent &&
      ((i = this.RoleData.AttributeComponent.GetCurrentValue(this.AttrId)),
      (i =
        0 ===
        (t = this.RoleData.AttributeComponent.GetCurrentValue(this.MaxAttrId))
          ? 0
          : i / t),
      this.GetSprite(0).SetFillAmount(i));
  }
  RefreshTargetPosition(t, i) {
    var s = i.X,
      i = i.Y;
    Math.abs(s - this.OffsetX) > MAX_POS_OFFSET ||
    Math.abs(i - this.OffsetY) > MAX_POS_OFFSET
      ? ((this.OffsetX = s),
        (this.OffsetY = i),
        this.SetAnchorOffset(this.OffsetX, this.OffsetY))
      : ((this.SpeedX = this.jii(t, s, this.OffsetX, this.SpeedX)),
        (this.SpeedY = this.jii(t, i, this.OffsetY, this.SpeedY)),
        (s = this.SpeedX * t),
        (i = this.SpeedY * t),
        (s < MIN_DELTA_OFFSET &&
          s > -MIN_DELTA_OFFSET &&
          i < MIN_DELTA_OFFSET &&
          i > -MIN_DELTA_OFFSET) ||
          ((this.OffsetX += s),
          (this.OffsetY += i),
          this.SetAnchorOffset(this.OffsetX + OFFSET_X, this.OffsetY)));
  }
  jii(t, i, s, h) {
    let e = i - s,
      r = !1;
    if ((e < 0 && ((e = -e), (r = !0)), e < 1)) return 0;
    let _ = 0;
    return (
      (_ = t >= MAX_DELTA_TIME ? e / t : e / MAX_DELTA_TIME),
      r && (_ = -_),
      MathUtils_1.MathUtils.Lerp(h, _, 0.5)
    );
  }
}
exports.RoleSideEnergyUnit = RoleSideEnergyUnit;
//# sourceMappingURL=RoleSideEnergyUnit.js.map
