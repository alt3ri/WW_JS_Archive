"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkPayProductInformationViewData =
    exports.SdkLoadPopUpViewData =
    exports.SdkPayTipData =
    exports.SdkLoginViewLayoutData =
    exports.SdkLoginViewData =
    exports.SdkPopUpViewData =
      void 0);
class SdkPopUpViewData {
  constructor() {
    this.TextId = "";
  }
}
exports.SdkPopUpViewData = SdkPopUpViewData;
class SdkLoginViewData {
  constructor() {
    (this.DescTextId = ""),
      (this.EnterCallback = () => {}),
      (this.CancelCallback = () => {}),
      (this.LayoutData = []);
  }
  static Create(t, a, s, o) {
    var i = new SdkLoginViewData();
    return (
      (i.DescTextId = t),
      (i.EnterCallback = a),
      (i.CancelCallback = s),
      (i.LayoutData = o),
      i
    );
  }
}
exports.SdkLoginViewData = SdkLoginViewData;
class SdkLoginViewLayoutData {
  constructor() {
    (this.TextId = ""), (this.ClickCallBack = () => {});
  }
}
exports.SdkLoginViewLayoutData = SdkLoginViewLayoutData;
class SdkPayTipData {
  constructor() {
    (this.PayStateSpritePath = ""),
      (this.PayResultTextId = ""),
      (this.PayContentTextId = ""),
      (this.CountDownTime = 0),
      (this.CountDownTextId = "");
  }
  static Create(t, a, s, o, i) {
    var r = new SdkPayTipData();
    return (
      (r.PayStateSpritePath = t),
      (r.PayResultTextId = a),
      (r.PayContentTextId = s),
      (r.CountDownTime = o),
      (r.CountDownTextId = i),
      r
    );
  }
}
exports.SdkPayTipData = SdkPayTipData;
class SdkLoadPopUpViewData {
  constructor() {
    (this.ForceCloseTime = 0), (this.OpenReason = "");
  }
}
exports.SdkLoadPopUpViewData = SdkLoadPopUpViewData;
class SdkPayProductInformationViewData {
  constructor() {
    (this.ProductName = ""),
      (this.ContentName = ""),
      (this.ProductId = ""),
      (this.OnClickConfirmBtn = () => {});
  }
  static Create(t, a, s, o) {
    var i = new SdkPayProductInformationViewData();
    return (
      (i.ProductName = t ?? ""),
      (i.ContentName = a ?? ""),
      (i.ProductId = s ?? ""),
      (i.OnClickConfirmBtn = o),
      i
    );
  }
}
exports.SdkPayProductInformationViewData = SdkPayProductInformationViewData;
//# sourceMappingURL=SdkViewData.js.map
