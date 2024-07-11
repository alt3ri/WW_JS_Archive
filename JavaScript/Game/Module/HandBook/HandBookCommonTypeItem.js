"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookCommonTypeItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
  HandBookCommonItem_1 = require("./HandBookCommonItem");
class HandBookCommonTypeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.HandBookCommonItemDataList = []),
      (this.HandBookCommonItemList = []),
      (this.TZt = void 0),
      (this.Gzt = void 0),
      (this.LZt = 0),
      (this.DZt = (t, i, e) => {
        var s = new HandBookCommonItem_1.HandBookCommonItem();
        return (
          s.Initialize(i.GetOwner()),
          s.Refresh(t, !1, 0),
          s.BindOnExtendToggleStateChanged(this.OnToggleClick),
          this.HandBookCommonItemList.push(s),
          { Key: e, Value: s }
        );
      }),
      (this.OnToggleClick = (t) => {
        var i = t.Data;
        this.Gzt && ((t = t.MediumItemGrid), this.Gzt(i, t));
      });
  }
  Initialize(t = void 0) {
    t && this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIGridLayout],
    ];
  }
  InitGridLayout() {
    this.TZt && (this.TZt.ClearChildren(), (this.TZt = void 0)),
      (this.HandBookCommonItemList = []),
      (this.TZt = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetGridLayout(1),
        this.DZt,
      )),
      this.TZt.RebuildLayoutByDataNew(this.HandBookCommonItemDataList);
  }
  InitTitle() {
    0 !== this.HandBookCommonItemDataList.length &&
      this.GetText(0).SetText(this.HandBookCommonItemDataList[0].Title);
  }
  SetToggleChecked() {
    var t;
    if (0 < this.HandBookCommonItemList.length)
      return (
        (t = this.HandBookCommonItemList[0]).SetSelected(!0),
        t.OnSelected(!0),
        t
      );
  }
  ResetAllToggleState() {
    var i = this.HandBookCommonItemList.length;
    for (let t = 0; t < i; t++) this.HandBookCommonItemList[t].SetSelected(!1);
  }
  Refresh(t, i, e) {
    (this.LZt = e),
      (this.HandBookCommonItemDataList = t),
      this.InitGridLayout(),
      this.InitTitle();
  }
  GetGirdIndex() {
    return this.LZt;
  }
  GetHandBookCommonItemList() {
    return this.HandBookCommonItemList;
  }
  BindToggleCallback(t) {
    this.Gzt = t;
  }
  OnBeforeDestroy() {
    this.TZt && (this.TZt.ClearChildren(), (this.TZt = void 0));
  }
}
exports.HandBookCommonTypeItem = HandBookCommonTypeItem;
//# sourceMappingURL=HandBookCommonTypeItem.js.map
