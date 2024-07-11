"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceAllViewShowContent = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdviceAllViewShowContent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.T2e = () => {
        1 === ModelManager_1.ModelManager.AdviceModel.CurrentLineModel
          ? (this.GetText(8).SetUIActive(!0),
            this.GetText(8).SetText(
              ModelManager_1.ModelManager.AdviceModel.GetSecondLineText(),
            ))
          : this.GetText(8).SetUIActive(!1);
        var e = ModelManager_1.ModelManager.AdviceModel.GetFirstLineText();
        this.GetText(4).SetText(e);
      }),
      (this.W7e = () => {
        var e = ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId;
        0 < e
          ? (this.GetTexture(1).SetUIActive(!0),
            (e =
              ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(e)),
            this.SetTextureByPath(e.ExpressionTexturePath, this.GetTexture(1)))
          : this.GetTexture(1).SetUIActive(!1);
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIVerticalLayout],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIExtendToggle],
      [7, UE.UIExtendToggle],
      [8, UE.UIText],
    ];
  }
  OnStart() {
    this.GetExtendToggle(6).RootUIComp.SetUIActive(!1),
      this.GetExtendToggle(7).RootUIComp.SetUIActive(!1),
      this.GetText(5).SetUIActive(!1),
      this.GetText(8).SetUIActive(!1),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectAdviceExpression,
        this.W7e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectAdviceWord,
        this.T2e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeAdviceWord,
        this.T2e,
      ),
      this.K7e(),
      this.W7e(),
      this.T2e();
  }
  K7e() {
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    this.GetText(2).SetText(e);
  }
  RefreshView() {
    this.T2e();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectAdviceExpression,
      this.W7e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectAdviceWord,
        this.T2e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeAdviceWord,
        this.T2e,
      );
  }
}
exports.AdviceAllViewShowContent = AdviceAllViewShowContent;
//# sourceMappingURL=AdviceAllViewShowContent.js.map
