"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeSuspendComponent = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../GeneralLogicTreeUtil");
class BehaviorTreeSuspendComponent {
  constructor(e, t) {
    (this.Gct = BigInt(0)),
      (this.Yre = void 0),
      (this._Kt = void 0),
      (this.uKt = void 0),
      (this.h5s = 0),
      (this.Yre = t),
      (this._Kt = []),
      (this.Gct = e);
  }
  GetSuspendType() {
    return this.h5s
      ? (2 & this.h5s) == 2
        ? 2
        : (1 & this.h5s) == 1
          ? 1
          : 0
      : 0;
  }
  GetSuspendText() {
    if (this.Yre.IsSuspend()) {
      let e = void 0;
      switch (this.GetSuspendType()) {
        case 1:
          this._Kt && this._Kt.length > 0 && (e = this.cKt(this._Kt[0]));
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
    return this._Kt;
  }
  cKt(e) {
    const t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
      "QuestResourcesIsOccupied",
    );
    const i = UE.NewArray(UE.BuiltinString);
    const s =
      ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationResourceName(
        e.ResourceName,
      );
    return (
      i.Add(s), i.Add(e.QuestName), UE.KuroStaticLibrary.KuroFormatText(t, i)
    );
  }
  UpdateOccupations(e, t, i) {
    if ((this.h5s = t) === 0) this.ClearOccupations();
    else {
      this.Yre.RemoveTag(9), this._Kt.splice(0, this._Kt.length);
      for (const n of i) {
        var s = MathUtils_1.MathUtils.LongToBigInt(n.Ykn);
        var s =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(s);
        let e = "";
        s &&
          ((s =
            GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
              s.BtType,
              s.TreeConfigId,
            )),
          (e = s.Name)),
          this._Kt.push({
            ResourceName: n.cvs,
            QuestName: e,
            TreeIncId: MathUtils_1.MathUtils.LongToBigInt(n.Ykn),
          });
      }
      this.Yre.AddTag(9), (this.uKt = void 0);
      (t = this.Yre.GetNode(e)),
        (i =
          (t && t.ContainTag(1) && (t.AddTag(0), (this.uKt = e)),
          this.GetSuspendType()));
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeSuspend,
        this.Gct,
        e,
        i,
      ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Yre,
          EventDefine_1.EEventName.GeneralLogicTreeSuspend,
          this.Gct,
          e,
          i,
        );
    }
  }
  ClearOccupations() {
    this._Kt.splice(0, this._Kt.length),
      this.Yre.RemoveTag(9),
      this.uKt &&
        (this.Yre.GetNode(this.uKt)?.RemoveTag(0), (this.uKt = void 0)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.Gct,
      ),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Yre,
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.Gct,
      );
  }
}
exports.BehaviorTreeSuspendComponent = BehaviorTreeSuspendComponent;
// # sourceMappingURL=BehaviorTreeSuspendComponent.js.map
