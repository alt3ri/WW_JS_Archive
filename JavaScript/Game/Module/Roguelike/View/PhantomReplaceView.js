"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomReplaceView = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeController_1 = require("../RoguelikeController");
const PhantomSelectItem_1 = require("./PhantomSelectItem");
const PhantomSelectView_1 = require("./PhantomSelectView");
class PhantomReplaceView extends PhantomSelectView_1.PhantomSelectView {
  constructor() {
    super(...arguments),
      (this.Sao = void 0),
      (this.ConfirmBtn = () => {
        const e = this.RoguelikeChooseData.RogueGainEntryList[0];
        e
          ? ((ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
              e),
            RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
              1,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Roguelike", 9, "当前没有选中的声骸");
      }),
      (this.GiveUpBtn = () => {
        RoguelikeController_1.RoguelikeController.RoguelikeGiveUpGainRequest(
          this.RoguelikeChooseData.Index,
        );
      }),
      (this.RefreshBtnEnableClick = () => {}),
      (this.CreatePhantomSelectItem = () => {
        return new PhantomSelectItem_1.PhantomSelectItem(!1);
      });
  }
  OnStart() {
    super.OnStart(),
      (this.IsShowChooseTips = !0),
      (this.Sao = new ButtonItem_1.ButtonItem(this.GetItem(6))),
      this.Sao.SetFunction(this.GiveUpBtn);
  }
  RefreshTopPanel() {
    this.TopPanel.RefreshTitle(RoguelikeDefine_1.ROGUELIKEVIEW_1_TEXT);
    var e = this.Eao();
    const t =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
        e[0].ConfigId,
      );
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
      e[1].ConfigId,
    );
    this.TopPanel.RefreshSelectTipsText(
      RoguelikeDefine_1.ROGUELIKEVIEW_2_TEXT,
      !0,
      new LguiUtil_1.TableTextArgNew(t?.PokemonName),
      new LguiUtil_1.TableTextArgNew(e?.PokemonName),
      !0,
    );
  }
  RefreshPhantomSelectItemList() {
    const e = this.Eao();
    this.PhantomSelectItemLayout.RefreshByData(e);
  }
  RefreshBtnText() {
    this.ButtonItem.SetShowText(RoguelikeDefine_1.ROGUELIKEVIEW_14_TEXT),
      this.Sao.SetShowText("RoguelikeView_26_Text");
  }
  Eao() {
    const e = new Array();
    const t = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry;
    return (
      t && e.push(t),
      this.RoguelikeChooseData.RogueGainEntryList.length > 0 &&
        e.push(this.RoguelikeChooseData.RogueGainEntryList[0]),
      e
    );
  }
}
exports.PhantomReplaceView = PhantomReplaceView;
// # sourceMappingURL=PhantomReplaceView.js.map
