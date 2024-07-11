"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemGrid = void 0);
const UE = require("ue"),
  QualityInfoById_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoById"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ItemGridAbstract_1 = require("./ItemGridAbstract");
class ItemGrid extends ItemGridAbstract_1.ItemGridAbstract {
  constructor() {
    super(...arguments),
      (this.iPt = void 0),
      (this.oPt = void 0),
      (this.rPt = ""),
      (this.nPt = 0),
      (this.sPt = () => {
        var t;
        this.iPt || this.oPt
          ? ((t = this.GetClickToggle().ToggleState),
            this.iPt?.(this.GetItemId(), this.GetItemConfig()),
            this.oPt?.(t))
          : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              this.GetItemId(),
            );
      }),
      (this.IsItemGrid = !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIExtendToggle],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UISprite],
      [9, UE.UIText],
      [10, UE.UISprite],
      [11, UE.UISprite],
    ];
    this.BtnBindInfo = [
      [
        4,
        () => {
          this.sPt();
        },
      ],
    ];
  }
  GetClickToggle() {
    return this.GetExtendToggle(4);
  }
  GetDownText() {
    return this.GetText(2);
  }
  RefreshQualitySprite() {
    var t = QualityInfoById_1.configQualityInfoById.GetConfig(
      this.GetItemConfig().QualityId,
    ).BackgroundSprite;
    this.SetSpriteByPath(t, this.GetSprite(0), !1, this.GetBelongView());
  }
  RefreshTextureByPath(t) {
    this.SetTextureByPath(t, this.GetTexture(1), this.GetBelongView());
  }
  RefreshTextureIcon() {
    this.SetTextureByPath(
      this.GetItemConfig().Icon,
      this.GetTexture(1),
      this.GetBelongView(),
    );
  }
  RefreshTextDown(t, e) {
    this.GetItem(3).SetUIActive(t), t && this.GetText(2).SetText(e);
  }
  RefreshTextDownByTextId(t, e, ...i) {
    this.GetItem(3).SetUIActive(t),
      t && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e, ...i);
  }
  SetToggleClickEvent(i) {
    this.iPt = (t, e) => {
      i(t, e);
    };
  }
  RefreshNewItem(t) {
    this.GetItem(5).SetUIActive(t);
  }
  SetToggleClickStateEvent(t) {
    this.oPt = t;
  }
  BindRedPointWithKeyAndId(t, e) {
    this.aPt(),
      (this.rPt = t),
      (this.nPt = e),
      RedDotController_1.RedDotController.BindRedDot(
        t,
        this.GetItem(6),
        void 0,
        e,
      );
  }
  aPt() {
    StringUtils_1.StringUtils.IsEmpty(this.rPt) ||
      RedDotController_1.RedDotController.UnBindGivenUi(
        this.rPt,
        this.GetItem(6),
        this.nPt,
      );
  }
  RefreshCdPanel(t, e, i) {
    this.GetItem(7).SetUIActive(t),
      t && (this.GetSprite(8).SetFillAmount(e), this.GetText(9).SetText(i));
  }
  RefreshDarkSprite(t) {
    this.GetSprite(10).SetUIActive(t);
  }
  RefreshLockSprite(t) {
    this.GetSprite(11).SetUIActive(t);
  }
  OnBeforeDestroy() {
    this.aPt();
  }
}
exports.ItemGrid = ItemGrid;
//# sourceMappingURL=ItemGrid.js.map
