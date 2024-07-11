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
      (this.WZt = void 0),
      (this.KZt = 0),
      (this.tNe = () => {
        this.WZt && 0 !== this.KZt && ((this.KZt = this.KZt - 1), this.bl());
      }),
      (this.iNe = () => {
        this.WZt &&
          this.KZt !== this.WZt.TextureList.length - 1 &&
          ((this.KZt = this.KZt + 1), this.bl());
      }),
      (this.JSt = () => {
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
        [2, this.JSt],
        [11, this.JSt],
      ]);
  }
  OnStart() {
    (this.WZt = this.OpenParam),
      this.WZt && ((this.KZt = this.WZt.Index), this.QZt(this.KZt));
  }
  QZt(t) {
    var i = this.WZt.TextureList.length,
      i =
        (this.GetButton(9).RootUIComp.SetUIActive(!(0 === t)),
        this.GetButton(10).RootUIComp.SetUIActive(!(t === i - 1)),
        this.GetText(6)),
      i =
        (this.WZt.DateText
          ? (i.SetUIActive(!0),
            LguiUtil_1.LguiUtil.SetLocalText(
              i,
              "DateOfAcquisition",
              this.WZt.DateText[t],
            ))
          : i.SetUIActive(!1),
        this.GetText(5)),
      i =
        (this.WZt.NameText
          ? (i.SetUIActive(!0), i.SetText(this.WZt.NameText[t]))
          : i.SetUIActive(!1),
        this.GetText(4)),
      i =
        (this.WZt.TypeText
          ? (i.SetUIActive(!0), i.SetText(this.WZt.TypeText[t]))
          : i.SetUIActive(!1),
        this.GetText(8)),
      i =
        (this.WZt.DescrtptionText
          ? (i.SetUIActive(!0), i.SetText(this.WZt.DescrtptionText[t]))
          : i.SetUIActive(!1),
        this.GetTexture(3));
    this.WZt.TextureList
      ? (i.SetUIActive(!0), this.IIt(this.WZt.TextureList[t]))
      : i.SetUIActive(!1);
  }
  IIt(t) {
    this.SetTextureByPath(t, this.GetTexture(3));
  }
  bl() {
    2 === this.WZt.HandBookType
      ? this.XZt(this.KZt)
      : 6 === this.WZt.HandBookType
        ? this.$Zt(this.KZt)
        : 7 === this.WZt.HandBookType && this.YZt(this.KZt);
  }
  $Zt(t) {
    t = this.WZt.TextureList[t];
    this.IIt(t);
  }
  XZt(t) {
    this.JZt(t), this.QZt(t);
  }
  JZt(t) {
    var t = this.WZt.ConfigId[t],
      i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, t);
    i &&
      !i.IsRead &&
      HandBookController_1.HandBookController.SendIllustratedReadRequest(2, t);
  }
  YZt(t) {
    this.zZt(t), this.QZt(t);
  }
  zZt(t) {
    var t = this.WZt.ConfigId[t],
      i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(7, t);
    i &&
      !i.IsRead &&
      HandBookController_1.HandBookController.SendIllustratedReadRequest(7, t);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPhotoSelect,
      this.WZt.ConfigId[this.KZt],
    ),
      (this.WZt = void 0),
      (this.KZt = 0);
  }
}
exports.HandBookPhotoView = HandBookPhotoView;
//# sourceMappingURL=HandBookPhotoView.js.map
