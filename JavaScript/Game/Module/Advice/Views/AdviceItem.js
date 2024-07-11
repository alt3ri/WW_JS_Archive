"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const AdviceController_1 = require("../AdviceController");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class AdviceItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.S8e = void 0),
      (this.S7e = (e) => {
        e === this.S8e.GetAdviceId() && this.Og();
      }),
      (this.E7e = () => {
        const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(92);
        e.FunctionMap.set(2, () => {
          AdviceController_1.AdviceController.RequestDeleteAdvice(
            this.S8e.GetAdviceId(),
          );
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.E7e]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnModifyAdviceSuccess,
      this.S7e,
    );
  }
  Update(e) {
    (this.S8e = e), this.Og();
  }
  Og() {
    this.hke(), this.v7e(), this.u7e(), this.y7e();
  }
  hke() {
    this.GetText(1).SetText(this.S8e.GetAdviceShowText());
  }
  v7e() {
    let e;
    const t = this.S8e.GetAdviceExpressionId() > 0;
    t &&
      ((e = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(
        this.S8e.GetAdviceExpressionId(),
      )),
      this.SetTextureByPath(e.ExpressionTexturePath, this.GetTexture(4))),
      this.GetSprite(5).SetUIActive(!t),
      this.GetTexture(4).SetUIActive(t);
  }
  u7e() {
    const e = this.S8e.GetVote();
    this.GetText(2).SetText(e.toString());
  }
  y7e() {
    var e = this.S8e.GetAreaId();
    var e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e);
    var e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(e.Title);
    this.GetText(3).SetText(e);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnModifyAdviceSuccess,
      this.S7e,
    );
  }
}
exports.AdviceItem = AdviceItem;
// # sourceMappingURL=AdviceItem.js.map
