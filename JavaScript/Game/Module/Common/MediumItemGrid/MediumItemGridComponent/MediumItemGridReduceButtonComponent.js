"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridReduceButtonComponent = void 0);
const UE = require("ue"),
  LongPressButtonItem_1 = require("../../Button/LongPressButtonItem"),
  MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridReduceButtonComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments),
      (this.oft = void 0),
      (this.Dwt = void 0),
      (this.Rwt = void 0),
      (this.Uwt = void 0),
      (this.Awt = (t) => {
        this.Rwt && this.Rwt(t);
      }),
      (this.Pwt = () => {
        this.oft && this.oft();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]]),
      (this.BtnBindInfo = [[0, this.Pwt]]);
  }
  GetResourceId() {
    return "UiItem_ItemBtnReduce";
  }
  OnInitialize() {
    this.Dwt = new LongPressButtonItem_1.LongPressButtonItem();
  }
  OnStart() {
    var t = this.GetButton(0);
    this.Dwt.Initialize(t, this.Awt);
  }
  OnDeactivate() {
    var t = this.GetButton(0);
    t.OnPointDownCallBack.Unbind(),
      t.OnPointUpCallBack.Unbind(),
      this.Dwt?.Clear(),
      (this.Dwt = void 0),
      (this.Uwt = void 0),
      (this.oft = void 0);
  }
  OnRefresh(t) {
    var e = t.IsVisible,
      t = t.LongPressConfigId;
    (this.Uwt = t),
      this.SetActive(e),
      void 0 === this.Uwt ||
        this.Dwt.IsActivate() ||
        this.Dwt.Activate(this.Uwt);
  }
  BindReduceButtonCallback(t) {
    this.oft = t;
  }
  UnBindReduceButtonCallback() {
    this.oft = void 0;
  }
  BindLongPressCallback(t) {
    this.Rwt = t;
  }
  UnBindLongPressCallback() {
    (this.Rwt = void 0), this.Dwt.Deactivate();
  }
  GetReduceButton() {
    return this.GetButton(0);
  }
}
exports.MediumItemGridReduceButtonComponent =
  MediumItemGridReduceButtonComponent;
//# sourceMappingURL=MediumItemGridReduceButtonComponent.js.map
