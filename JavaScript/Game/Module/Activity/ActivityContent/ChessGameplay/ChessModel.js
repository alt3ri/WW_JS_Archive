"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChessModel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  ChessManagerCreator_1 = require("./ChessBase/ChessManagerCreator");
class ChessModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Q1c = void 0),
      (this.K1c = 0),
      (this.X1c = new Map()),
      (this.Y1c = new Map()),
      (this.skc = void 0),
      (this.CacheRankingItemIdList = void 0);
  }
  OnLeaveLevel() {
    return this.ClearAll(), !0;
  }
  OnClear() {
    return this.ClearAll(), !0;
  }
  ClearAll() {
    (this.Q1c = void 0), this.X1c.clear();
    for (const s of this.Y1c.values()) s.OnClear();
    this.Y1c.clear(),
      (this.skc = void 0),
      (this.CacheRankingItemIdList = void 0);
  }
  GetChessManager() {
    return this.Q1c;
  }
  GetChessItem(s) {
    return this.Y1c.get(s);
  }
  GetChessItemIdList(s = void 0) {
    var e = [];
    if (s) {
      var t = [];
      for (const o of this.Y1c.values()) t.push(o);
      t.sort(s);
      for (const r of t) e.push(r.GetId());
    } else for (const i of this.Y1c.keys()) e.push(i);
    return e;
  }
  GetChessboardPoint(s) {
    return this.X1c.get(s);
  }
  GetTerminalPoint() {
    return this.skc;
  }
  UpdateChessMode(s, e = 0) {
    (this.K1c = e),
      (this.Q1c = (0, ChessManagerCreator_1.createChessManager)(s));
  }
  AddChessboardPoint(s, e, t, o) {
    var r;
    this.Q1c
      ? ((r = this.Q1c.CreateChessboardPoint()).Init(s, e, t, o),
        this.X1c.set(s, r))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Chess", 48, "请先设置正确的棋局模式");
  }
  AddChessItem(s, e) {
    var t;
    this.Q1c
      ? (e = this.Q1c.GetChessAgent(this.K1c, e))
        ? ((t = this.Q1c.CreateChessItem()).Init(s, e), this.Y1c.set(s, t))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Chess", 48, "创建棋子代理失败")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Chess", 48, "请设置正确的棋局模式");
  }
  UpdateTerminalPoint(s) {
    this.skc = this.X1c.get(s);
  }
}
exports.ChessModel = ChessModel;
//# sourceMappingURL=ChessModel.js.map
