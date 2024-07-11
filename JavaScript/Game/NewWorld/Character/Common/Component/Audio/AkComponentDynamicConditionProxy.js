"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AkComponentDynamicConditionProxy = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  BONE_HIDDEN_SWITCH = 4;
class BoneHiddenSwitch {
  constructor() {
    (this.BoneName = ""),
      (this.SwitchGroup = ""),
      (this.HiddenSwitch = ""),
      (this.VisibleSwitch = ""),
      (this.LastHidden = !1);
  }
  Init(t, i) {
    var o = i.BoneHiddenSwitch;
    o.length !== BONE_HIDDEN_SWITCH &&
      Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "Audio",
        58,
        "[BoneHiddenSwitch] BoneHiddenSwitch配置无效",
        ["ConfigId:", i.Id],
      ),
      (this.BoneName = o[0]),
      (this.SwitchGroup = o[1]),
      (this.HiddenSwitch = o[2]),
      (this.VisibleSwitch = o[3]),
      (this.LastHidden = t.Actor.Mesh.IsBoneHiddenByName(
        FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName),
      )),
      this.S$o(this.LastHidden, t);
  }
  Do(t) {
    var i = t.Actor.Mesh.IsBoneHiddenByName(
        FNameUtil_1.FNameUtil.GetDynamicFName(this.BoneName),
      ),
      o = i !== this.LastHidden;
    (this.LastHidden = i), o && this.S$o(this.LastHidden, t);
  }
  S$o(t, i) {}
  Clear() {}
}
class AkComponentDynamicConditionProxy {
  constructor() {
    this.Qte = new Array();
  }
  Init(t, i) {
    var o;
    this.Clear(),
      0 < i.BoneHiddenSwitch.length &&
        ((o = new BoneHiddenSwitch()).Init(t, i), this.Qte.push(o));
  }
  Do(t) {
    for (const i of this.Qte) i.Do(t);
  }
  Clear() {
    for (const t of this.Qte) t.Clear();
    this.Qte.length = 0;
  }
}
exports.AkComponentDynamicConditionProxy = AkComponentDynamicConditionProxy;
//# sourceMappingURL=AkComponentDynamicConditionProxy.js.map
