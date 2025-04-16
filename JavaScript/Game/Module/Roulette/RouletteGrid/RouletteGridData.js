"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.rouletteGridGenerator = exports.RouletteData = void 0);
const RouletteGridEquipItem_1 = require("./RouletteGridEquipItem"),
  RouletteGridExplore_1 = require("./RouletteGridExplore"),
  RouletteGridFunction_1 = require("./RouletteGridFunction");
class RouletteData {
  constructor() {
    (this.Id = 0),
      (this.ShowIndex = !1),
      (this.GridIndex = 0),
      (this.GridType = 0),
      (this.ShowNum = !1),
      (this.DataNum = 0),
      (this.DataIndex = 0),
      (this.Name = void 0),
      (this.State = 1),
      (this.ShowRedDot = !0);
  }
  DeepCopy() {
    var t = new RouletteData();
    return (
      (t.DataIndex = this.DataIndex),
      (t.GridIndex = this.GridIndex),
      (t.GridType = this.GridType),
      (t.Id = this.Id),
      (t.Name = this.Name),
      (t.State = this.State),
      (t.ShowIndex = this.ShowIndex),
      (t.ShowRedDot = this.ShowRedDot),
      t
    );
  }
}
(exports.RouletteData = RouletteData),
  (exports.rouletteGridGenerator = {
    [0]: RouletteGridExplore_1.RouletteGridExplore,
    1: RouletteGridFunction_1.RouletteGridFunction,
    2: RouletteGridEquipItem_1.RouletteGridEquipItem,
  });
//# sourceMappingURL=RouletteGridData.js.map
