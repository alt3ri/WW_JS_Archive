"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextDecoder = void 0;
class TextDecoder {
  decode(buffer) {
    return global.newStringFromBuffer(buffer, 0, 0);
  }
}
exports.TextDecoder = TextDecoder;
//# sourceMappingURL=kuro-text-encoding.js.map
