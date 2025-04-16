"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BcView =
    exports.Code12 =
    exports.Code54 =
    exports.Code64 =
    exports.Converter =
      void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class Converter {
  static Convert(e, t, r) {
    if (t === r) return e;
    if (r < 2 || 62 < r || t < 2 || 62 < t) return "";
    let o = this.mml(e, t),
      s = "";
    for (; 0 < o; ) (s = this.dml[o % r] + s), (o = Math.floor(o / r));
    return s;
  }
  static mml(t, r) {
    let o = 0;
    for (let e = 0; e < t.length; e++)
      o += this.dml.indexOf(t[e]) * Math.pow(r, t.length - e - 1);
    return o;
  }
}
(exports.Converter = Converter).dml =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
class CodeNBase {
  GetCodeTable() {
    return {};
  }
  SingleCodeLength() {
    return 0;
  }
  SupportCharCount() {
    return Object.keys(this.GetCodeTable()).length;
  }
}
class Code64 extends CodeNBase {
  GetCodeTable() {
    return Code64.CodeTable;
  }
  SingleCodeLength() {
    return 8;
  }
  SupportCharCount() {
    return 62;
  }
}
(exports.Code64 = Code64).CodeTable = {
  "+": [1, 0, 0, 0, 0, 0, 0],
  "-": [1, 0, 0, 0, 0, 0, 1],
  0: [1, 0, 0, 0, 0, 1, 0],
  1: [1, 0, 0, 0, 0, 1, 1],
  2: [1, 0, 0, 0, 1, 0, 0],
  3: [1, 0, 0, 0, 1, 0, 1],
  4: [1, 0, 0, 0, 1, 1, 0],
  5: [1, 0, 0, 0, 1, 1, 1],
  6: [1, 0, 0, 1, 0, 0, 0],
  7: [1, 0, 0, 1, 0, 0, 1],
  8: [1, 0, 0, 1, 0, 1, 0],
  9: [1, 0, 0, 1, 0, 1, 1],
  a: [1, 0, 0, 1, 1, 0, 0],
  b: [1, 0, 0, 1, 1, 0, 1],
  c: [1, 0, 0, 1, 1, 1, 0],
  d: [1, 0, 0, 1, 1, 1, 1],
  e: [1, 0, 1, 0, 0, 0, 0],
  f: [1, 0, 1, 0, 0, 0, 1],
  g: [1, 0, 1, 0, 0, 1, 0],
  h: [1, 0, 1, 0, 0, 1, 1],
  i: [1, 0, 1, 0, 1, 0, 0],
  j: [1, 0, 1, 0, 1, 0, 1],
  k: [1, 0, 1, 0, 1, 1, 0],
  l: [1, 0, 1, 0, 1, 1, 1],
  m: [1, 0, 1, 1, 0, 0, 0],
  n: [1, 0, 1, 1, 0, 0, 1],
  o: [1, 0, 1, 1, 0, 1, 0],
  p: [1, 0, 1, 1, 0, 1, 1],
  q: [1, 0, 1, 1, 1, 0, 0],
  r: [1, 0, 1, 1, 1, 0, 1],
  s: [1, 0, 1, 1, 1, 1, 0],
  t: [1, 0, 1, 1, 1, 1, 1],
  u: [1, 1, 0, 0, 0, 0, 0],
  v: [1, 1, 0, 0, 0, 0, 1],
  w: [1, 1, 0, 0, 0, 1, 0],
  x: [1, 1, 0, 0, 0, 1, 1],
  y: [1, 1, 0, 0, 1, 0, 0],
  z: [1, 1, 0, 0, 1, 0, 1],
  A: [1, 1, 0, 0, 1, 1, 0],
  B: [1, 1, 0, 0, 1, 1, 1],
  C: [1, 1, 0, 1, 0, 0, 0],
  D: [1, 1, 0, 1, 0, 0, 1],
  E: [1, 1, 0, 1, 0, 1, 0],
  F: [1, 1, 0, 1, 0, 1, 1],
  G: [1, 1, 0, 1, 1, 0, 0],
  H: [1, 1, 0, 1, 1, 0, 1],
  I: [1, 1, 0, 1, 1, 1, 0],
  J: [1, 1, 0, 1, 1, 1, 1],
  K: [1, 1, 1, 0, 0, 0, 0],
  L: [1, 1, 1, 0, 0, 0, 1],
  M: [1, 1, 1, 0, 0, 1, 0],
  N: [1, 1, 1, 0, 0, 1, 1],
  O: [1, 1, 1, 0, 1, 0, 0],
  P: [1, 1, 1, 0, 1, 0, 1],
  Q: [1, 1, 1, 0, 1, 1, 0],
  R: [1, 1, 1, 0, 1, 1, 1],
  S: [1, 1, 1, 1, 0, 0, 0],
  T: [1, 1, 1, 1, 0, 0, 1],
  U: [1, 1, 1, 1, 0, 1, 0],
  V: [1, 1, 1, 1, 0, 1, 1],
  W: [1, 1, 1, 1, 1, 0, 0],
  X: [1, 1, 1, 1, 1, 0, 1],
  Y: [1, 1, 1, 1, 1, 1, 0],
  Z: [1, 1, 1, 1, 1, 1, 1],
};
class Code54 extends CodeNBase {
  GetCodeTable() {
    return Code54.CodeTable;
  }
  SingleCodeLength() {
    return 5;
  }
  SupportCharCount() {
    return 52;
  }
}
(exports.Code54 = Code54).CodeTable = {
  "+": [1, 0, 0, 0],
  "-": [1, 0, 0, 1],
  0: [1, 0, 0, 2],
  1: [1, 0, 1, 0],
  2: [1, 0, 1, 1],
  3: [1, 0, 1, 2],
  4: [1, 0, 2, 0],
  5: [1, 0, 2, 1],
  6: [1, 0, 2, 2],
  7: [1, 1, 0, 0],
  8: [1, 1, 0, 1],
  9: [1, 1, 0, 2],
  a: [1, 1, 1, 0],
  b: [1, 1, 1, 1],
  c: [1, 1, 1, 2],
  d: [1, 1, 2, 0],
  e: [1, 1, 2, 1],
  f: [1, 1, 2, 2],
  g: [1, 2, 0, 0],
  h: [1, 2, 0, 1],
  i: [1, 2, 0, 2],
  j: [1, 2, 1, 0],
  k: [1, 2, 1, 1],
  l: [1, 2, 1, 2],
  m: [1, 2, 2, 0],
  n: [1, 2, 2, 1],
  o: [1, 2, 2, 2],
  p: [2, 0, 0, 0],
  q: [2, 0, 0, 1],
  r: [2, 0, 0, 2],
  s: [2, 0, 1, 0],
  t: [2, 0, 1, 1],
  u: [2, 0, 1, 2],
  v: [2, 0, 2, 0],
  w: [2, 0, 2, 1],
  x: [2, 0, 2, 2],
  y: [2, 1, 0, 0],
  z: [2, 1, 0, 1],
  A: [2, 1, 0, 2],
  B: [2, 1, 1, 0],
  C: [2, 1, 1, 1],
  D: [2, 1, 1, 2],
  E: [2, 1, 2, 0],
  F: [2, 1, 2, 1],
  G: [2, 1, 2, 2],
  H: [2, 2, 0, 0],
  I: [2, 2, 0, 1],
  J: [2, 2, 0, 2],
  K: [2, 2, 1, 0],
  L: [2, 2, 1, 1],
  M: [2, 2, 1, 2],
  N: [2, 2, 2, 0],
  O: [2, 2, 2, 1],
  P: [2, 2, 2, 2],
};
class Code12 extends CodeNBase {
  GetCodeTable() {
    return Code12.CodeTable;
  }
  SingleCodeLength() {
    return 4;
  }
  SupportCharCount() {
    return 10;
  }
}
(exports.Code12 = Code12).CodeTable = {
  "+": [2, 0, 0, 0],
  "-": [2, 0, 0, 1],
  0: [2, 0, 1, 0],
  1: [2, 0, 1, 1],
  2: [2, 1, 0, 0],
  3: [2, 1, 0, 1],
  4: [2, 1, 1, 0],
  5: [2, 1, 1, 1],
  6: [2, 0, 2, 0],
  7: [2, 0, 2, 1],
  8: [2, 1, 2, 0],
  9: [2, 1, 2, 1],
};
const ITEM_WIDTH_MIN = 10,
  ITEM_WIDTH_MAX = 14,
  ITEM_HEIGHT_1 = 5,
  ITEM_HEIGHT_2 = 7;
class BcView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.gdl = new Code54());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ]),
      (this.gdl = new Code12());
  }
  OnStart() {
    if (
      !(
        (cpp_1.KuroApplication.IsBuildShipping() &&
          "Product" === cpp_1.KuroApplication.GetAppReleaseType()) ||
        "Marketing" === UE.KuroLauncherLibrary.GetAppInternalUseType()
      )
    ) {
      let e = ModelManager_1.ModelManager.LoginModel.GetLoginUid();
      var t = (e =
          Number.isNaN(Number(e)) &&
          ((e = "1"), ModelManager_1.ModelManager.FunctionModel.PlayerId)
            ? ModelManager_1.ModelManager.FunctionModel.PlayerId.toString()
            : e),
        r = this.GetItem(0),
        o = this.GetItem(1),
        r = (this.Ovi(r, o, t, 0), this.GetItem(2)),
        o = this.GetItem(3),
        r = (this.Ovi(r, o, t, 0), this.GetItem(4)),
        o = this.GetItem(5),
        r = (this.Ovi(r, o, t, 1), this.GetItem(6)),
        o = this.GetItem(7);
      this.Ovi(r, o, t, 1);
    }
  }
  Ovi(t, r, e, o) {
    t?.SetAlpha(0.4);
    var s,
      i,
      a =
        0 === o
          ? UiLayer_1.UiLayer.UiRootItem.GetWidth()
          : UiLayer_1.UiLayer.UiRootItem.GetHeight(),
      n = "+" + e + "-",
      u = this.gdl.SingleCodeLength(),
      _ = n.length * u,
      e = _ * ITEM_WIDTH_MAX,
      e = Math.floor(a / e);
    let C = ITEM_WIDTH_MAX,
      M = 1;
    1 < e
      ? ((s = Math.floor(a / (_ * ITEM_WIDTH_MIN))),
        (M =
          1 < s
            ? ((i = Math.floor(a / (_ * s))),
              (C = Math.max(ITEM_WIDTH_MIN, i)),
              s)
            : ((C = ITEM_WIDTH_MAX), e)))
      : (C = Math.floor(a / _)),
      0 === o ? r?.SetWidth(C) : r?.SetHeight(C);
    var h = M * _,
      d =
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("UiCommon", 30, "" + h, ["repeatCount", M]),
        []);
    d.push(r);
    for (let e = 1; e < h; e++) {
      var l = LguiUtil_1.LguiUtil.DuplicateActor(r.GetOwner(), t);
      d.push(l.GetComponentByClass(UE.UIItem.StaticClass()));
    }
    var p = [],
      c = this.gdl.GetCodeTable();
    for (let r = 0; r < M; r++)
      for (let t = 0; t < _; t++) {
        var E = d[t + r * _],
          I = n[Math.floor(t / u)],
          T = t % u,
          I = c[I],
          I = u - 1 < T ? 0 : I[T];
        p.push(I), E.SetAlpha(0 < I ? 1 : 0);
        let e = 0;
        switch (I) {
          case 1:
            e = ITEM_HEIGHT_1;
            break;
          case 2:
            e = ITEM_HEIGHT_2;
        }
        0 === o ? E.SetHeight(e) : E.SetWidth(e);
      }
  }
}
exports.BcView = BcView;
//# sourceMappingURL=BcView.js.map
