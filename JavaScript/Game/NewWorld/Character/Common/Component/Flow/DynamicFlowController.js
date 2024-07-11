"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicFlowController = exports.CharacterDynamicFlowData = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../../../Core/Net/Net");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const DEFAULT_TYPE_PRIORITY = 1;
class CharacterDynamicFlowData {
  constructor() {
    (this.BubbleData = void 0), (this.Type = void 0), (this.Callback = void 0);
  }
}
exports.CharacterDynamicFlowData = CharacterDynamicFlowData;
class DynamicFlowController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      this.Q$o(),
      Net_1.Net.Register(24376, DynamicFlowController.X$o),
      Net_1.Net.Register(12700, DynamicFlowController.$$o),
      !0
    );
  }
  static OnClear() {
    return Net_1.Net.UnRegister(24376), Net_1.Net.UnRegister(12700), !0;
  }
  static Q$o() {
    this.Y$o.set(1, 5),
      this.Y$o.set(2, 20),
      this.Y$o.set(3, 20),
      this.Y$o.set(4, 20);
  }
  static CreateCharacterFlowData(r) {
    const t = new CharacterDynamicFlowData();
    return (t.BubbleData = r), (t.Type = 3), t;
  }
  static AddDynamicFlow(r) {
    if (!r?.BubbleData?.EntityIds.length) return !1;
    const t = this.GetDynamicFlowPriority(r.Type);
    for (const i of r.BubbleData.EntityIds)
      if (this.J$o.has(i)) {
        const e = this.GetDynamicFlowByActor(i);
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
    const o = r.BubbleData.EntityIds[0];
    const a = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(o);
    a?.Entity?.IsInit && a.Entity?.GetComponent(28)?.PlayDynamicFlowBegin(r),
      this.z$o.set(o, r);
    for (const n of r.BubbleData.EntityIds) this.J$o.set(n, o);
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
    r = this.J$o.get(r);
    if (!r) return !1;
    const t = this.z$o.get(r);
    if (!t) return !1;
    const e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(r);
    e?.Entity?.IsInit && e.Entity?.GetComponent(28)?.PlayDynamicFlowEnd();
    for (const o of t.BubbleData.EntityIds) this.J$o.delete(o);
    return (
      this.z$o.delete(r),
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
    r = this.J$o.get(r);
    if (r) return this.z$o.get(r);
  }
  static GetDynamicFlowByMasterActor(r) {
    if (r) return this.z$o.get(r);
  }
  static GetDynamicFlowPriority(r) {
    return r && this.Y$o.has(r) ? this.Y$o.get(r) : DEFAULT_TYPE_PRIORITY;
  }
}
((exports.DynamicFlowController = DynamicFlowController).z$o = new Map()),
  (DynamicFlowController.J$o = new Map()),
  (DynamicFlowController.Y$o = new Map()),
  (DynamicFlowController.X$o = (r) => {
    var r = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(r.rMs);
    r &&
      r.EntityIds.length &&
      ((r = DynamicFlowController.CreateCharacterFlowData(r)),
      DynamicFlowController.AddDynamicFlow(r));
  }),
  (DynamicFlowController.$$o = (r) => {
    var r = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(r.rMs);
    r &&
      r.EntityIds.length &&
      ((r = r.EntityIds[0]), DynamicFlowController.RemoveDynamicFlow(r));
  });
// # sourceMappingURL=DynamicFlowController.js.map
