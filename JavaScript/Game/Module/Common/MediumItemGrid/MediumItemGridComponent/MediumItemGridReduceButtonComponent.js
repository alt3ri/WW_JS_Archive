"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridReduceButtonComponent = void 0);
const UE = require("ue");
const LongPressButtonItem_1 = require("../../Button/LongPressButtonItem");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridReduceButtonComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments),
      (this.Wgt = void 0),
      (this.Ixt = void 0),
      (this.Txt = void 0),
      (this.Lxt = void 0),
      (this.Dxt = (t) => {
        this.Txt && this.Txt(t);
      }),
      (this.Rxt = () => {
        this.Wgt && this.Wgt();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]]),
      (this.BtnBindInfo = [[0, this.Rxt]]);
  }
  GetResourceId() {
    return "UiItem_ItemBtnReduce";
  }
  OnInitialize() {
    this.Ixt = new LongPressButtonItem_1.LongPressButtonItem();
  }
  OnStart() {
    const t = this.GetButton(0);
    this.Ixt.Initialize(t, this.Dxt);
  }
  OnDeactivate() {
    const t = this.GetButton(0);
    t.OnPointDownCallBack.Unbind(),
      t.OnPointUpCallBack.Unbind(),
      this.Ixt?.Clear(),
      (this.Ixt = void 0),
      (this.Lxt = void 0),
      (this.Wgt = void 0);
  }
  OnRefresh(t) {
    const e = t.IsVisible;
    var t = t.LongPressConfigId;
    (this.Lxt = t),
      this.SetActive(e),
      void 0 === this.Lxt ||
        this.Ixt.IsActivate() ||
        this.Ixt.Activate(this.Lxt);
  }
  BindReduceButtonCallback(t) {
    this.Wgt = t;
  }
  UnBindReduceButtonCallback() {
    this.Wgt = void 0;
  }
  BindLongPressCallback(t) {
    this.Txt = t;
  }
  UnBindLongPressCallback() {
    (this.Txt = void 0), this.Ixt.Deactivate();
  }
  GetReduceButton() {
    return this.GetButton(0);
  }
}
exports.MediumItemGridReduceButtonComponent =
  MediumItemGridReduceButtonComponent;
// # sourceMappingURL=MediumItemGridReduceButtonComponent.js.map
