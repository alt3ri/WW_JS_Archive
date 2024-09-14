"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockReasonItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager");
class LockReasonItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.hno = ""),
      (this.lno = ""),
      (this.rSa = ""),
      (this.$mt = BigInt(0)),
      (this.YP = () => {
        var e =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
            this.$mt,
          );
        e &&
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnNavigationQuest,
            e.TreeConfigId,
          ),
          UiManager_1.UiManager.CloseView("QuestLockPreview"));
      }),
      (this.hno =
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeName(
          e.TreeIncId,
        )),
      (this.lno =
        ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationResourceName(
          e.ResourceName,
        )),
      (this.rSa =
        ConfigManager_1.ConfigManager.QuestNewConfig.GetOccupationType(
          e.ResourceName,
        )),
      (this.$mt = e.TreeIncId);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.YP]]);
  }
  OnStart() {
    this.UpdateItem();
  }
  UpdateItem() {
    this.GetText(0)?.SetText(this.hno);
    let e = "";
    var t =
      (e =
        "Area" === this.rSa
          ? (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_OccupiedArea",
            ) ?? "")
          : (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_OccupiedRole",
            ) ?? "")) +
      ":" +
      this.lno;
    this.GetText(1)?.SetText(t);
  }
}
exports.LockReasonItem = LockReasonItem;
//# sourceMappingURL=LockReasonItem.js.map
