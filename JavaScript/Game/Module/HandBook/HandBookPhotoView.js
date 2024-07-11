"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookPhotoView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  HandBookController_1 = require("./HandBookController");
class HandBookPhotoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Wei = void 0),
      (this.Kei = 0),
      (this.tNe = () => {
        this.Wei && 0 !== this.Kei && ((this.Kei = this.Kei - 1), this.bl());
      }),
      (this.iNe = () => {
        this.Wei &&
          this.Kei !== this.Wei.TextureList.length - 1 &&
          ((this.Kei = this.Kei + 1), this.bl());
      }),
      (this.lyt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
      [10, UE.UIButtonComponent],
      [11, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [9, this.tNe],
        [10, this.iNe],
        [2, this.lyt],
        [11, this.lyt],
      ]);
  }
  OnStart() {
    (this.Wei = this.OpenParam),
      this.Wei && ((this.Kei = this.Wei.Index), this.Qei(this.Kei));
  }
  Qei(t) {
    var i = this.Wei.TextureList.length,
      i =
        (this.GetButton(9).RootUIComp.SetUIActive(!(0 === t)),
        this.GetButton(10).RootUIComp.SetUIActive(!(t === i - 1)),
        this.GetText(6)),
      i =
        (this.Wei.DateText
          ? (i.SetUIActive(!0),
            LguiUtil_1.LguiUtil.SetLocalText(
              i,
              "DateOfAcquisition",
              this.Wei.DateText[t],
            ))
          : i.SetUIActive(!1),
        this.GetText(5)),
      i =
        (this.Wei.NameText
          ? (i.SetUIActive(!0), i.SetText(this.Wei.NameText[t]))
          : i.SetUIActive(!1),
        this.GetText(4)),
      i =
        (this.Wei.TypeText
          ? (i.SetUIActive(!0), i.SetText(this.Wei.TypeText[t]))
          : i.SetUIActive(!1),
        this.GetText(8)),
      i =
        (this.Wei.DescrtptionText
          ? (i.SetUIActive(!0), i.SetText(this.Wei.DescrtptionText[t]))
          : i.SetUIActive(!1),
        this.GetTexture(3));
    this.Wei.TextureList
      ? (i.SetUIActive(!0), this.UTt(this.Wei.TextureList[t]))
      : i.SetUIActive(!1);
  }
  UTt(t) {
    this.SetTextureByPath(t, this.GetTexture(3));
  }
  bl() {
    2 === this.Wei.HandBookType
      ? this.Xei(this.Kei)
      : 6 === this.Wei.HandBookType
        ? this.$ei(this.Kei)
        : 7 === this.Wei.HandBookType && this.Yei(this.Kei);
  }
  $ei(t) {
    t = this.Wei.TextureList[t];
    this.UTt(t);
  }
  Xei(t) {
    this.Jei(t), this.Qei(t);
  }
  Jei(t) {
    var t = this.Wei.ConfigId[t],
      i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, t);
    i &&
      !i.IsRead &&
      HandBookController_1.HandBookController.SendIllustratedReadRequest(2, t);
  }
  Yei(t) {
    this.zei(t), this.Qei(t);
  }
  zei(t) {
    var t = this.Wei.ConfigId[t],
      i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(7, t);
    i &&
      !i.IsRead &&
      HandBookController_1.HandBookController.SendIllustratedReadRequest(7, t);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPhotoSelect,
      this.Wei.ConfigId[this.Kei],
    ),
      (this.Wei = void 0),
      (this.Kei = 0);
  }
}
exports.HandBookPhotoView = HandBookPhotoView;
//# sourceMappingURL=HandBookPhotoView.js.map
