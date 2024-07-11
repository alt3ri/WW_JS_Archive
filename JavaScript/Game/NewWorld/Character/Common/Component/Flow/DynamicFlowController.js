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
      Net_1.Net.Register(18847, DynamicFlowController.WYo),
      Net_1.Net.Register(5877, DynamicFlowController.KYo),
      !0
    );
  }
  static OnClear() {
    return Net_1.Net.UnRegister(18847), Net_1.Net.UnRegister(5877), !0;
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
        if (t <= this.GetDynamicFlowPriority(e.Type))
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "NPC",
                51,
                "添加动态冒泡失败，演员已被占用",
                ["PbDataId", i],
                ["NewType", r.Type],
                ["NewFlowName", r.BubbleData.Flow.FlowListName],
                ["OldType", e.Type],
                ["OldFlowName", e.BubbleData.Flow.FlowListName],
              ),
            !1
          );
      }
    var o = r.BubbleData.EntityIds[0],
      a = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(o);
    a?.Entity?.IsInit && a.Entity?.GetComponent(28)?.PlayDynamicFlowBegin(r),
      this.$Yo.set(o, r);
    for (const n of r.BubbleData.EntityIds) this.XYo.set(n, o);
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "NPC",
          51,
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
    e?.Entity?.IsInit && e.Entity?.GetComponent(28)?.PlayDynamicFlowEnd();
    for (const o of t.BubbleData.EntityIds) this.XYo.delete(o);
    return (
      this.$Yo.delete(r),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "NPC",
          51,
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
    var r = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(r.pIs);
    r &&
      r.EntityIds.length &&
      ((r = DynamicFlowController.CreateCharacterFlowData(r)),
      DynamicFlowController.AddDynamicFlow(r));
  }),
  (DynamicFlowController.KYo = (r) => {
    var r = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(r.pIs);
    r &&
      r.EntityIds.length &&
      ((r = r.EntityIds[0]), DynamicFlowController.RemoveDynamicFlow(r));
  });
//# sourceMappingURL=DynamicFlowController.js.map
