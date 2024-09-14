"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeSuspendComponent = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../GeneralLogicTreeUtil");
class BehaviorTreeSuspendComponent {
  constructor(e, t) {
    (this.$mt = BigInt(0)),
      (this.Yre = void 0),
      (this._Qt = void 0),
      (this.uQt = void 0),
      (this.Wjs = 0),
      (this.Yre = t),
      (this._Qt = []),
      (this.$mt = e);
  }
  GetSuspendType() {
    return this.Wjs
      ? 2 == (2 & this.Wjs)
        ? 2
        : 1 == (1 & this.Wjs)
          ? 1
          : 0
      : 0;
  }
  GetSuspendText() {
    if (this.Yre.IsSuspend()) {
      let e = void 0;
      switch (this.GetSuspendType()) {
        case 1:
          this._Qt && 0 < this._Qt.length && (e = this.cQt(this._Qt[0]));
          break;
        case 2:
          e =
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "SuspendByOnline",
            );
      }
      return e;
    }
  }
  GetOccupations() {
    return this._Qt;
  }
  cQt(e) {
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "QuestResourcesIsOccupied",
      ),
      i = UE.NewArray(UE.BuiltinString),
      s =
        ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationResourceName(
          e.ResourceName,
        ),
      e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeName(
        e.TreeIncId,
      );
    return i.Add(s), i.Add(e), UE.KuroStaticLibrary.KuroFormatText(t, i);
  }
  UpdateOccupations(e, t, i) {
    if (0 === (this.Wjs = t)) this.ClearOccupations();
    else {
      this.Yre.RemoveTag(9), this._Qt.splice(0, this._Qt.length);
      for (const n of i) {
        var s = MathUtils_1.MathUtils.LongToBigInt(n.w5n),
          s =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              s,
            );
        let e = "";
        s &&
          ((s =
            GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
              s.BtType,
              s.TreeConfigId,
            )),
          (e = s.Name)),
          this._Qt.push({
            ResourceName: n.qEs,
            QuestName: e,
            TreeIncId: MathUtils_1.MathUtils.LongToBigInt(n.w5n),
          });
      }
      this.Yre.AddTag(9), (this.uQt = void 0);
      (t = this.Yre.GetNode(e)),
        (i =
          (t && t.ContainTag(1) && (t.AddTag(0), (this.uQt = e)),
          this.GetSuspendType()));
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeSuspend,
        this.$mt,
        e,
        i,
      ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Yre,
          EventDefine_1.EEventName.GeneralLogicTreeSuspend,
          this.$mt,
          e,
          i,
        );
    }
  }
  ClearOccupations() {
    this._Qt.splice(0, this._Qt.length),
      this.Yre.RemoveTag(9),
      this.uQt &&
        (this.Yre.GetNode(this.uQt)?.RemoveTag(0), (this.uQt = void 0)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.$mt,
      ),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Yre,
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.$mt,
      );
  }
}
exports.BehaviorTreeSuspendComponent = BehaviorTreeSuspendComponent;
//# sourceMappingURL=BehaviorTreeSuspendComponent.js.map
