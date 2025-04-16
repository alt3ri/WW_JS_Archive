"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisibleStateUtil = void 0);
const trueNumber = [
    -2, -3, -5, -9, -17, -33, -65, -129, -257, -513, -1025, -2049, -4097, -8193,
    -16385, -32769, -65537, -131073, -262145, -524289,
  ],
  falseNumber = [
    1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768,
    65536, 131072, 262144, 524288,
  ];
class VisibleStateUtil {
  static SetVisible(e, t, s = 0) {
    return t ? e & trueNumber[s] : e | falseNumber[s];
  }
  static GetVisible(e) {
    return 0 === e;
  }
  static GetVisibleByType(e, t) {
    return 0 == (e & falseNumber[t]);
  }
}
exports.VisibleStateUtil = VisibleStateUtil;
//# sourceMappingURL=VisibleStateUtil.js.map
