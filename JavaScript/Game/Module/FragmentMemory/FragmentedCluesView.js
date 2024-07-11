"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentedCluesView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../Util/LguiUtil");
class FragmentedCluesView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.uwn = void 0),
      (this.cwn = void 0),
      (this.mwn = void 0),
      (this.eBo = 0),
      (this.dwn = 0),
      (this.Cwn = () => {
        this.gwn(), this.eBo--, this.eBo < 0 && (this.eBo = 0), this.Og();
      }),
      (this.fwn = () => {
        this.gwn(),
          this.eBo++,
          this.eBo > this.dwn - 1 && (this.eBo = this.dwn - 1),
          this.Og();
      }),
      (this.pwn = () => new MemoryPageDot());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.Cwn],
        [5, this.fwn],
      ]);
  }
  gwn() {
    this.uwn[this.eBo] = !1;
  }
  OnStart() {
    this.mwn = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.pwn,
    );
  }
  OnBeforeShow() {
    (this.cwn = this.OpenParam), (this.uwn = []);
    var i = this.cwn.GetClueContent().length;
    for (let t = 0; t < i; t++) this.uwn?.push(!1);
    (this.dwn = this.uwn.length),
      (this.eBo = 0),
      (this.uwn[this.eBo] = !0),
      this.Og();
  }
  Og() {
    this.vwn(), this.Aqe(), this.P5e(), this.ufo(), this.Mwn(), this.Swn();
  }
  Ewn(t) {
    return this.cwn.GetClueContent()[t].Texture;
  }
  ywn(t) {
    return this.cwn.GetClueContent()[t].Desc;
  }
  P5e() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(3),
      this.cwn.GetClueEntrance().Title,
    );
  }
  ufo() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.ywn(this.eBo));
  }
  Mwn() {
    var t = this.eBo < this.dwn - 1;
    this.GetButton(5)?.SetSelfInteractive(t);
  }
  Swn() {
    var t = 0 < this.eBo;
    this.GetButton(4)?.SetSelfInteractive(t);
  }
  Aqe() {
    var t = this.Ewn(this.eBo);
    this.SetTextureByPath(t, this.GetTexture(1));
  }
  vwn() {
    (this.uwn[this.eBo] = !0), this.mwn.RefreshByData(this.uwn);
  }
}
exports.FragmentedCluesView = FragmentedCluesView;
class MemoryPageDot extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  Refresh(t, i, e) {
    this.GetItem(0)?.SetUIActive(t);
  }
}
//# sourceMappingURL=FragmentedCluesView.js.map
