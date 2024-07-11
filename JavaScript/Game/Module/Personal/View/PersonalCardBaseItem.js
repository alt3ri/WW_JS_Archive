"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalCardBaseItem = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PersonalCardBaseItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.OnToggleCallBack = void 0),
      (this.kqe = () => {
        this.OnToggleCallBack && this.OnToggleCallBack(this.CardConfig);
      }),
      (this.CardConfig = t),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[2, this.kqe]]);
  }
  OnStart() {
    this.SetTextureByPath(this.CardConfig.CardPath, this.GetTexture(0)),
      this.GetItem(1).SetUIActive(!1);
  }
  SetToggleCallBack(e) {
    this.OnToggleCallBack = e;
  }
  SetToggleState(e) {
    this.GetExtendToggle(2).SetToggleState(e);
  }
  RefreshRedDot() {
    const t = ModelManager_1.ModelManager.PersonalModel.GetCardUnlockList();
    const s = t.length;
    const i = this.GetItem(1);
    i.SetUIActive(!1);
    for (let e = 0; e < s; e++) {
      const a = t[e];
      if (a.CardId === this.CardConfig.Id && !a.IsRead) {
        i.SetUIActive(!0);
        break;
      }
    }
  }
  GetConfig() {
    return this.CardConfig;
  }
}
exports.PersonalCardBaseItem = PersonalCardBaseItem;
// # sourceMappingURL=PersonalCardBaseItem.js.map
