"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UpWeaponGachaPoolItem = void 0);
const UE = require("ue"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GachaPoolItem_1 = require("./GachaPoolItem"),
  WeaponDescribeComponent_1 = require("./WeaponDescribeComponent");
class UpWeaponGachaPoolItem extends GachaPoolItem_1.GachaPoolItem {
  constructor() {
    super(...arguments),
      (this.mWt = void 0),
      (this.dWt = new Map()),
      (this.CWt = void 0),
      (this.gWt = new Queue_1.Queue()),
      (this.pjt = !1);
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = !0;
  }
  Jft() {
    var t;
    (this.pjt = !1), 0 !== this.gWt.Size && (t = this.gWt.Pop()) && this.fWt(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    (this.mWt = new WeaponDescribeComponent_1.WeaponDescribeComponent()),
      await this.mWt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  Refresh() {
    var t;
    this.GachaViewInfo && ((t = this.GachaViewInfo.ShowIdList[0]), this.fWt(t));
  }
  fWt(t) {
    this.Rjt
      ? this.gWt.Push(t)
      : (this.Ujt(),
        this.pWt(t).finally(() => {
          this.Jft();
        }));
  }
  async pWt(t) {
    var e, i;
    this.IsDestroyOrDestroying ||
      (this.mWt.Update(t),
      this.SetTextureByPath(this.GachaViewInfo.TextTexture, this.GetTexture(2)),
      (t = this.GetItem(0)),
      (e = this.GachaViewInfo.WeaponPrefabPath),
      (i = this.dWt.get(e)) && i === this.CWt) ||
      (this.CWt?.SetUIActive(!1),
      i
        ? (i.SetUIActive(!0), (this.CWt = i))
        : ((i = (
            await LguiUtil_1.LguiUtil.LoadPrefabByAsync(e, t)
          ).GetComponentByClass(UE.UIItem.StaticClass())).SetUIActive(!0),
          (this.CWt = i),
          this.dWt.set(e, i)));
  }
}
exports.UpWeaponGachaPoolItem = UpWeaponGachaPoolItem;
//# sourceMappingURL=UpWeaponGachaPoolItem.js.map
