"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaitEntityTaskModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase");
class WaitEntityTaskModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.QY = void 0),
      (this.qi_ = 1e4),
      (this.OnAddEntity = (t, s) => {
        this.ki_(t, s, !0);
      }),
      (this.OnRemoveEntity = (t, s) => {
        this.ki_(t, s, !1);
      });
  }
  OnInit() {
    return (this.QY = new Map()), !0;
  }
  OnClear() {
    return this.QY.clear(), !0;
  }
  AddTask(t, s) {
    this.QY.has(t)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          72,
          "[WaitEntityTaskModel] AddTask 尝试用一个已经存在的任务ID添加新任务, 阻止添加",
          ["taskId", t],
          ["task", s],
          ["TaskMap", this.QY],
        )
      : this.QY.set(t, s);
  }
  RemoveTask(t) {
    this.QY.delete(t);
  }
  ki_(t, s, e) {
    var a = this.QY.size;
    let i = 0;
    for (const o of this.QY.values())
      if (
        (e ? o.OnAddEntity(t, s) : o.OnRemoveEntity(t, s), ++i - a >= this.qi_)
      ) {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            72,
            "[WaitEntityTaskModel] 可能是WaitEntityTask的Callback中又创建了WaitEntityTask，导致死循环, 请检查",
            ["creatureDataId", t],
            ["pbDataId", s],
            ["task", o],
          );
        break;
      }
  }
}
exports.WaitEntityTaskModel = WaitEntityTaskModel;
//# sourceMappingURL=WaitEntityTaskModel.js.map
