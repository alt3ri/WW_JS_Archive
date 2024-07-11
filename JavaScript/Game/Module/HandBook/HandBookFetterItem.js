"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookFetterItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
  HandBookCommonItem_1 = require("./HandBookCommonItem");
class HandBookFetterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.PhantomFetter = void 0),
      (this.HandBookCommonItemDataList = []),
      (this.ContentGenericLayout = void 0),
      (this.Lei = 0),
      (this.FetterToggleFunction = void 0),
      (this.Gei = (t) => {
        this.FetterToggleFunction && 1 === t && this.FetterToggleFunction(this);
      }),
      (this.GetPhantomFetter = () => this.PhantomFetter),
      (this.Nei = (t, e, i) => {
        var s = new HandBookCommonItem_1.HandBookCommonItem();
        return (
          s.Initialize(e.GetOwner()),
          s.Refresh(t, !1, 0),
          s.SetToggleInteractive(!1),
          { Key: i, Value: s }
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [4, UE.UIText],
      [3, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UIHorizontalLayout],
    ]),
      (this.BtnBindInfo = [[0, this.Gei]]);
  }
  Refresh(t, e, i) {
    (this.PhantomFetter = t),
      (this.Lei = i),
      this.GetTexture(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetText(3).SetUIActive(!1),
      this.GetSprite(5).SetUIActive(!1),
      this.GetText(4).ShowTextNew(this.PhantomFetter.Name),
      this.ContentGenericLayout && this.ContentGenericLayout.ClearChildren(),
      (this.ContentGenericLayout = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(6),
        this.Nei,
      )),
      (this.HandBookCommonItemDataList = []),
      this.ContentGenericLayout.RebuildLayoutByDataNew(
        this.HandBookCommonItemDataList,
      ),
      this.Oei(e);
  }
  GetGirdIndex() {
    return this.Lei;
  }
  BindFetterToggleCallback(t) {
    this.FetterToggleFunction = t;
  }
  Oei(t) {
    var e = this.GetExtendToggle(0);
    t ? e.SetToggleState(1, !1) : e.SetToggleState(0, !1);
  }
  OnDeselected(t) {
    this.Oei(!1);
  }
  SetToggleStateForce(t, e = !1) {
    this.GetExtendToggle(0).SetToggleState(t, e);
  }
  OnSelected(t) {
    t && (this.SetToggleStateForce(1), this.Gei(1));
  }
  OnBeforeDestroy() {
    (this.PhantomFetter = void 0),
      (this.HandBookCommonItemDataList = []),
      this.ContentGenericLayout &&
        (this.ContentGenericLayout.ClearChildren(),
        (this.ContentGenericLayout = void 0)),
      (this.FetterToggleFunction = void 0);
  }
}
exports.HandBookFetterItem = HandBookFetterItem;
//# sourceMappingURL=HandBookFetterItem.js.map
