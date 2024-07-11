"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ColorUtils = void 0);
const UE = require("ue");
const MAX_BYTE = 255;
class ColorUtils {}
((exports.ColorUtils = ColorUtils).LinearYellow = new UE.LinearColor(
  1,
  1,
  0,
  0,
)),
  (ColorUtils.LinearGreen = new UE.LinearColor(0, 1, 0, 0)),
  (ColorUtils.LinearRed = new UE.LinearColor(1, 0, 0, 0)),
  (ColorUtils.LinearBlue = new UE.LinearColor(0, 0, 1, 0)),
  (ColorUtils.LinearWhite = new UE.LinearColor(1, 1, 1, 0)),
  (ColorUtils.LinearCyan = new UE.LinearColor(0, 1, 1, 0)),
  (ColorUtils.LinearBlack = new UE.LinearColor(0, 0, 0, 1)),
  (ColorUtils.ColorWhile = new UE.Color(
    MAX_BYTE,
    MAX_BYTE,
    MAX_BYTE,
    MAX_BYTE,
  )),
  (ColorUtils.ColorBlack = new UE.Color(0, 0, 0, MAX_BYTE)),
  (ColorUtils.ColorYellow = new UE.Color(MAX_BYTE, MAX_BYTE, 0, 0)),
  (ColorUtils.ColorRed = new UE.Color(MAX_BYTE, 0, 0, 0));
// # sourceMappingURL=ColorUtils.js.map
