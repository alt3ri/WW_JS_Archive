"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemGridVariantSelect = void 0);
const UE = require("ue"),
  ItemGridAbstract_1 = require("./ItemGridAbstract"),
  ItemGridVariantOne_1 = require("./ItemGridVariantOne");
class ItemGridVariantSelect extends ItemGridAbstract_1.ItemGridAbstract {
  constructor() {
    super(...arguments),
      (this.IsItemGridVariantOne = !0),
      (this.IsItemGrid = !0),
      (this.IsItemGridVariantSelect = !0),
      (this._Pt = void 0),
      (this.uPt = void 0),
      (this.cPt = void 0),
      (this.sMt = () => {
        this._Pt?.();
      });
  }
  RefreshItemShowState(t) {
    this.GetItem(0).SetUIActive(t);
  }
  RefreshReduceButtonShowState(t) {
    this.GetButton(4).RootUIComp.SetUIActive(t);
  }
  GetFinishSelectItem() {
    return this.GetItem(1);
  }
  GetFinishMiddleItem() {
    return this.GetItem(2);
  }
  GetControlItem() {
    return this.GetItem(3);
  }
  GetReduceButton() {
    return this.GetButton(4);
  }
  GetAddButton() {
    return this.GetButton(5);
  }
  SetAddButtonCallBack(t) {
    this._Pt = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
    ];
    this.BtnBindInfo = [
      [
        5,
        () => {
          this.sMt();
        },
      ],
      [
        4,
        () => {
          this.uPt?.();
        },
      ],
    ];
  }
  OnStart() {
    (this.cPt = new ItemGridVariantOne_1.ItemGridVariantOne(
      this.GetItem(0).GetOwner(),
      this,
      this.GetBelongView(),
    )),
      this.RefreshReduceButtonShowState(!1);
  }
  RefreshQualitySprite() {
    this.cPt.RefreshQualitySprite();
  }
  RefreshTextureIcon() {
    this.cPt.RefreshTextureIcon();
  }
  RefreshTextDown(t, e) {
    this.cPt.RefreshTextDown(t, e);
  }
  RefreshTextDownByTextId(t, e, ...i) {
    this.cPt.RefreshTextDownByTextId(t, e, ...i);
  }
  SetReduceClickEvent(t) {
    this.uPt = t;
  }
  SetToggleClickEvent(t) {
    this.cPt.SetToggleClickEvent(t);
  }
  SetToggleClickStateEvent(t) {
    this.cPt.SetToggleClickStateEvent(t);
  }
  BindRedPointWithKeyAndId(t, e) {
    this.cPt.BindRedPointWithKeyAndId(t, e);
  }
  RefreshCdPanel(t, e, i) {
    this.cPt.RefreshCdPanel(t, e, i);
  }
  RefreshDarkSprite(t) {
    this.cPt.RefreshDarkSprite(t);
  }
  RefreshLockSprite(t) {
    this.cPt.RefreshLockSprite(t);
  }
  RefreshStar(t) {
    this.cPt.RefreshStar(t);
  }
  RefreshRecoverSprite(t) {
    this.cPt.RefreshRecoverSprite(t);
  }
  RefreshRightDownLockSprite(t) {
    this.cPt.RefreshRightDownLockSprite(t);
  }
  RefreshUpgradePanel(t, e) {
    this.cPt.RefreshUpgradePanel(t, e);
  }
  GetClickToggle() {
    return this.cPt.GetClickToggle();
  }
  GetDownText() {
    return this.cPt.GetDownText();
  }
  GetConfigId() {
    return this.GetItemId();
  }
  OnBeforeDestroy() {
    this.cPt.Destroy();
  }
}
exports.ItemGridVariantSelect = ItemGridVariantSelect;
//# sourceMappingURL=ItemGridVariantSelect.js.map
