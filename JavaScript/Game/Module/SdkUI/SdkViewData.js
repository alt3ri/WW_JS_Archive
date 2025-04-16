"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkPayProductInformationViewData =
    exports.SdkLoadPopUpViewData =
    exports.SdkPayTipData =
    exports.SdkLoginViewLayoutData =
    exports.SdkLoginViewData =
    exports.SdkPopUpViewData =
    exports.SdkEnterTipsViewData =
    exports.SdkProtocolData =
    exports.SdkMailViewData =
      void 0);
class SdkMailViewData {
  constructor() {
    this.ProtocolData = [];
  }
}
exports.SdkMailViewData = SdkMailViewData;
class SdkProtocolData {
  constructor() {
    (this.Url = ""), (this.Title = "");
  }
  static Create(t, a) {
    var s = new SdkProtocolData();
    return (s.Url = t), (s.Title = a), s;
  }
}
exports.SdkProtocolData = SdkProtocolData;
class SdkEnterTipsViewData {
  constructor() {
    (this.Text = ""), (this.NeedMask = !1);
  }
}
exports.SdkEnterTipsViewData = SdkEnterTipsViewData;
class SdkPopUpViewData {
  constructor() {
    (this.ViewType = 0), (this.Text = ""), (this.NeedMask = !1);
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
    var r = new SdkLoginViewData();
    return (
      (r.DescTextId = t),
      (r.EnterCallback = a),
      (r.CancelCallback = s),
      (r.LayoutData = o),
      r
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
  static Create(t, a, s, o, r) {
    var i = new SdkPayTipData();
    return (
      (i.PayStateSpritePath = t),
      (i.PayResultTextId = a),
      (i.PayContentTextId = s),
      (i.CountDownTime = o),
      (i.CountDownTextId = r),
      i
    );
  }
}
exports.SdkPayTipData = SdkPayTipData;
class SdkLoadPopUpViewData {
  constructor() {
    (this.ForceCloseTime = 5), (this.OpenReason = "");
  }
  static Create(t, a) {
    var s = new SdkLoadPopUpViewData();
    return (s.ForceCloseTime = t), (s.OpenReason = a), s;
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
    var r = new SdkPayProductInformationViewData();
    return (
      (r.ProductName = t ?? ""),
      (r.ContentName = a ?? ""),
      (r.ProductId = s ?? ""),
      (r.OnClickConfirmBtn = o),
      r
    );
  }
}
exports.SdkPayProductInformationViewData = SdkPayProductInformationViewData;
//# sourceMappingURL=SdkViewData.js.map
