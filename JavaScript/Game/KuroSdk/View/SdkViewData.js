"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkLoadPopUpViewData =
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
  static Create(t, s, a, o) {
    var i = new SdkLoginViewData();
    return (
      (i.DescTextId = t),
      (i.EnterCallback = s),
      (i.CancelCallback = a),
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
  static Create(t, s, a, o, i) {
    var e = new SdkPayTipData();
    return (
      (e.PayStateSpritePath = t),
      (e.PayResultTextId = s),
      (e.PayContentTextId = a),
      (e.CountDownTime = o),
      (e.CountDownTextId = i),
      e
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
//# sourceMappingURL=SdkViewData.js.map
