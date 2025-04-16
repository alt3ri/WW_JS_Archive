"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalCardPreviewComponent = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class PersonalCardPreviewComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.$8i = void 0), (this.SPe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UITexture],
      [6, UE.UITexture],
      [7, UE.UITexture],
      [8, UE.UIText],
    ];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.bco();
  }
  bco() {
    this.SPe?.PlaySequencePurely("Start");
  }
  async PlayCloseSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Close", e);
  }
  Refresh(e) {
    this.$8i = e;
    (e = ConfigManager_1.ConfigManager.InventoryConfig.GetCardItemConfig(
      this.$8i.ConfigId,
    )),
      this.GetText(3).ShowTextNew(e.Title),
      this.GetText(1).ShowTextNew(e.AttributesDescription),
      this.GetText(2).ShowTextNew(e.Tips),
      this.SetTextureShowUntilLoaded(e.CardPath, this.GetTexture(0)),
      this.SetTextureShowUntilLoaded(
        e.FunctionViewCardPath,
        this.GetTexture(4),
      ),
      this.SetTextureShowUntilLoaded(e.LongCardPath, this.GetTexture(7)),
      (e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4)),
      (e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e));
    if (void 0 !== e) {
      const s = this.GetTexture(5),
        i =
          (s.SetUIActive(!1),
          this.SetTextureShowUntilLoaded(e.GetRoleHeadIconCircle(), s, () => {
            s.SetUIActive(!0);
          }),
          this.GetTexture(6));
      i.SetUIActive(!1),
        this.SetTextureShowUntilLoaded(e.GetRoleHeadIconCircle(), i, () => {
          i.SetUIActive(!0);
        }),
        this.GetText(8).SetText(
          ModelManager_1.ModelManager.FunctionModel.GetPlayerName(),
        );
    }
  }
}
exports.PersonalCardPreviewComponent = PersonalCardPreviewComponent;
//# sourceMappingURL=PersonalCardPreviewComponent.js.map
