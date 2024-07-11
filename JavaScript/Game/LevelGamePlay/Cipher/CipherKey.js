"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CipherKey = void 0);
const UE = require("ue"),
  CircleAttachView_1 = require("../../Module/AutoAttach/CircleAttachView"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  CipherCircleAttachItem_1 = require("./CipherCircleAttachItem"),
  INITGP = 0,
  LEN = 10;
class CipherKey extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super(),
      (this.yye = void 0),
      (this.Iye = void 0),
      (this.Tye = void 0),
      (this.Lye = void 0),
      (this.Dye = void 0),
      (this.Rye = 0),
      (this.Uye = (t, i, e) => {
        t = new CipherCircleAttachItem_1.CipherCircleAttachItem(t);
        return t.InitData(this.KeyIndex, this.Dye), this.Lye.push(t), t;
      }),
      (this.KeyIndex = i),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.Tye = new Array();
    for (let t = 0; t < 10; t++) this.Tye.push(t);
    (this.Lye = new Array()),
      (this.Dye = (t) => {
        this.Aye(t);
      }),
      this.Iye?.Clear(),
      (this.Iye = void 0),
      (this.Iye = new CircleAttachView_1.CircleAttachView(
        this.GetItem(0).GetOwner(),
      )),
      this.Iye.SetAudioEvent("ui_cipher_picker_tick"),
      this.Iye.CreateItems(this.GetItem(1).GetOwner(), INITGP, this.Uye, 1),
      this.GetItem(1).SetUIActive(!1),
      this.Iye.ReloadView(LEN, this.Tye),
      this.Iye.AttachToIndex(0),
      this.AddEvent();
  }
  OnBeforeDestroy() {
    this.RemoveEvent(), this.Iye.Clear();
  }
  AddEvent() {}
  RemoveEvent() {}
  InitKey(t) {
    this.yye = t;
  }
  Aye(t) {
    (this.Rye = t), this.yye && this.yye(this.KeyIndex, t);
  }
  HandleConfirm(t) {
    for (const i of this.Lye)
      if (i.GetNumber() === this.Rye) return void i.HandleConfirm(t);
  }
  HandleRest() {
    this.Iye.ReloadView(LEN, this.Tye), this.Iye.AttachToIndex(0);
  }
}
exports.CipherKey = CipherKey;
//# sourceMappingURL=CipherKey.js.map
