"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiTagComponent = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
class UiTagComponent {
  constructor() {
    (this.PPo = new Map()), (this.xPo = new Map());
  }
  AddTagById(i, ...e) {
    if (void 0 !== i) {
      let t = 0;
      this.PPo.has(i) && (t = this.PPo.get(i)),
        this.PPo.set(i, t + 1),
        this.wPo(i, t, t + 1, ...e);
    }
  }
  ReduceTagById(t, ...i) {
    var e;
    void 0 !== t &&
      this.PPo.has(t) &&
      0 !== (e = this.PPo.get(t)) &&
      (1 === e ? this.PPo.delete(t) : this.PPo.set(t, e - 1),
      this.wPo(t, e, e - 1, ...i));
  }
  RemoveTagById(t, ...i) {
    var e;
    void 0 !== t &&
      this.PPo.has(t) &&
      ((e = this.PPo.get(t)), this.PPo.delete(t), this.wPo(t, e, 0, ...i));
  }
  ContainsTagById(t) {
    return this.PPo.has(t);
  }
  ContainsTagByName(t) {
    t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
    return !!t && this.ContainsTagById(t);
  }
  GetTagCountById(t) {
    return void 0 === t ? 0 : this.PPo.get(t) ?? 0;
  }
  wPo(t, i, e, ...s) {
    void 0 !== t &&
      i !== e &&
      (0 === i) != (0 === e) &&
      this.BPo(t, 0 < e, this.xPo.get(t), ...s);
  }
  BPo(t, i, e, ...s) {
    if (void 0 !== t && void 0 !== e) {
      var o = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
      for (const a of [...e])
        try {
          a(t, i, ...s);
        } catch (t) {
          t instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Event",
                44,
                "tag事件回调执行异常",
                t,
                ["tag", o],
                ["error", t.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Event",
                44,
                "tag事件回调执行异常",
                ["tag", o],
                ["error", t],
              );
        }
    }
  }
  AddListener(t, i) {
    let e = this.xPo.get(t);
    e || this.xPo.set(t, (e = new Set())), e.add(i);
  }
  RemoveListener(t, i) {
    t = this.xPo.get(t);
    t && t.delete(i);
  }
  RemoveAllTag() {
    for (const t of this.PPo.keys()) this.RemoveTagById(t);
  }
}
exports.UiTagComponent = UiTagComponent;
//# sourceMappingURL=UiTagComponent.js.map
