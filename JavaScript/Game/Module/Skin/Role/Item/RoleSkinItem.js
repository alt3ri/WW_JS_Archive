"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkinItem = void 0);
const UE = require("ue"),
  AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem"),
  INDEXQUARTER = 0.25,
  INDEXHALF = 0.5,
  INDEXTHREEQUARTER = 0.75,
  MAXHIERARCHYINDEX = 2,
  MINHIERARCHYINDEX = 1;
class RoleSkinItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments),
      (this.ButtonFunction = void 0),
      (this.GIl = () => {
        this.ButtonFunction?.(this.CurrentShowItemIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UITexture],
      [10, UE.UITexture],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.GIl]]);
  }
  OnRefreshItem(t) {
    this.SetTextureByPath(
      t.GetBuyPreviewRoleQualityBgPath(),
      this.GetTexture(1),
    ),
      this.SetTextureByPath(t.GetBuyPreviewRoleCardPath(), this.GetTexture(2));
    var e,
      i = 0 < t.GetSuitWeaponSkinId();
    i
      ? ((e = t.GetSuitWeaponPreviewTexturePath()),
        this.SetTextureByPath(e, this.GetTexture(5)),
        this.GetTexture(5).SetUIActive(!0),
        (e = t.GetSuitWeaponQualityBgPath()),
        this.SetTextureByPath(e, this.GetTexture(4)),
        this.GetItem(4).SetUIActive(!0),
        (e = UE.Color.FromHex(t.GetRoleSkinConfig().SuitWeaponSkinColor)),
        this.GetTexture(10).SetColor(e))
      : (this.GetTexture(5).SetUIActive(!1), this.GetItem(4).SetUIActive(!1)),
      this.GetItem(15).SetUIActive(t.GetHasNewFlag()),
      this.GetItem(6).SetUIActive(t.IsWear()),
      this.GetItem(7).SetUIActive(t.IsLocked()),
      this.f7l(i);
  }
  f7l(t) {
    this.GetItem(14).SetUIActive(t), this.GetItem(13).SetUIActive(t);
  }
  OnSelect() {
    this.GIl(),
      this.GetItem(12).SetUIActive(!0),
      this.GetItem(11).SetUIActive(!1),
      this.GetItem(15).SetUIActive(!1);
  }
  OnUnSelect() {
    this.GetItem(12).SetUIActive(!1), this.GetItem(11).SetUIActive(!0);
  }
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage();
    this.Qkl(t), this.Kkl(t), this.$kl(t), this.Xkl(t);
  }
  Qkl(t) {
    (t = RoleSkinItem.ScaleCurve.GetFloatValue(t)),
      (t = new UE.Vector(t, t, t));
    this.RootItem.SetUIItemScale(t);
  }
  Kkl(t) {
    t = RoleSkinItem.AlphaCurve.GetFloatValue(t);
    this.RootItem.SetUIItemAlpha(t);
  }
  $kl(t) {
    var e = RoleSkinItem.OffsetCurve.GetFloatValue(t);
    t > INDEXHALF
      ? this.GetButton(0)?.RootUIComp.SetAnchorOffsetX(-1 * e)
      : this.GetButton(0)?.RootUIComp.SetAnchorOffsetX(e);
  }
  Xkl(t) {
    let e = MAXHIERARCHYINDEX;
    (t <= INDEXQUARTER || t >= INDEXTHREEQUARTER) && (e = MINHIERARCHYINDEX),
      this.RootItem.GetHierarchyIndex() !== e &&
        this.RootItem.SetHierarchyIndex(e);
  }
}
((exports.RoleSkinItem = RoleSkinItem).OffsetCurve = void 0),
  (RoleSkinItem.ScaleCurve = void 0),
  (RoleSkinItem.AlphaCurve = void 0);
//# sourceMappingURL=RoleSkinItem.js.map
