"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicFlowController = exports.CharacterDynamicFlowData = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  DEFAULT_TYPE_PRIORITY = 1;
class CharacterDynamicFlowData {
  constructor() {
    (this.BubbleData = void 0), (this.Type = void 0), (this.Callback = void 0);
  }
}
exports.CharacterDynamicFlowData = CharacterDynamicFlowData;
class DynamicFlowController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      this.jYo(),
      Net_1.Net.Register(15666, DynamicFlowController.WYo),
      Net_1.Net.Register(19190, DynamicFlowController.KYo),
      !0
    );
  }
  static OnClear() {
    return Net_1.Net.UnRegister(15666), Net_1.Net.UnRegister(19190), !0;
  }
  static jYo() {
    this.QYo.set(1, 5),
      this.QYo.set(2, 20),
      this.QYo.set(3, 20),
      this.QYo.set(4, 20);
  }
  static CreateCharacterFlowData(r) {
    var t = new CharacterDynamicFlowData();
    return (t.BubbleData = r), (t.Type = 3), t;
  }
  static AddDynamicFlow(r) {
    if (!r?.BubbleData?.EntityIds.length) return !1;
    var t = this.GetDynamicFlowPriority(r.Type);
    for (const i of r.BubbleData.EntityIds)
      if (this.XYo.has(i)) {
        var e = this.GetDynamicFlowByActor(i);
        if (t <= this.GetDynamicFlowPriority(e.Type)) return !1;
      }
    var o = r.BubbleData.EntityIds[0],
      a = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(o);
    a?.Entity?.IsInit && a.Entity?.GetComponent(31)?.PlayDynamicFlowBegin(r),
      this.$Yo.set(o, r);
    for (const n of r.BubbleData.EntityIds) this.XYo.set(n, o);
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "NPC",
          50,
          "添加动态冒泡",
          ["PbDataId", o],
          ["Type", r.Type],
          ["FlowName", r.BubbleData.Flow.FlowListName],
        ),
      !0
    );
  }
  static RemoveDynamicFlow(r) {
    r = this.XYo.get(r);
    if (!r) return !1;
    var t = this.$Yo.get(r);
    if (!t) return !1;
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(r);
    e?.Entity?.IsInit && e.Entity?.GetComponent(31)?.PlayDynamicFlowEnd();
    for (const o of t.BubbleData.EntityIds) this.XYo.delete(o);
    return (
      this.$Yo.delete(r),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "NPC",
          50,
          "移除动态冒泡",
          ["PbDataId", r],
          ["Type", t.Type],
          ["FlowName", t.BubbleData.Flow.FlowListName],
        ),
      !0
    );
  }
  static GetDynamicFlowByActor(r) {
    r = this.XYo.get(r);
    if (r) return this.$Yo.get(r);
  }
  static GetDynamicFlowByMasterActor(r) {
    if (r) return this.$Yo.get(r);
  }
  static GetDynamicFlowPriority(r) {
    return r && this.QYo.has(r) ? this.QYo.get(r) : DEFAULT_TYPE_PRIORITY;
  }
}
((exports.DynamicFlowController = DynamicFlowController).$Yo = new Map()),
  (DynamicFlowController.XYo = new Map()),
  (DynamicFlowController.QYo = new Map()),
  (DynamicFlowController.WYo = (r) => {
    var r = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(r.LIs);
    r &&
      r.EntityIds.length &&
      ((r = DynamicFlowController.CreateCharacterFlowData(r)),
      DynamicFlowController.AddDynamicFlow(r));
  }),
  (DynamicFlowController.KYo = (r) => {
    var r = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(r.LIs);
    r &&
      r.EntityIds.length &&
      ((r = r.EntityIds[0]), DynamicFlowController.RemoveDynamicFlow(r));
  });
//# sourceMappingURL=DynamicFlowController.js.map
