"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattlePhantomItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueBattlePhantomAffix_1 = require("./RogueBattlePhantomAffix");
class RogueBattlePhantomItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.SelectCallBack = void 0),
      (this.Data = void 0),
      (this.AffixLayout = void 0),
      (this.eTt = () => {
        this.SelectCallBack &&
          (1 === this.GetExtendToggle(5).GetToggleState()
            ? this.SelectCallBack(this.GridIndex)
            : this.SelectCallBack(void 0));
      }),
      (this.gVc = () =>
        new RogueBattlePhantomAffix_1.RogueBattlePhantomAffix());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIExtendToggle],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.eTt]]);
  }
  async OnBeforeStartAsync() {
    (this.AffixLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(3),
      this.gVc,
    )),
      await Promise.resolve();
  }
  Refresh(e, t, i) {
    var s;
    e.Pac
      ? ((this.Data = e),
        (s = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResPokemon(
          e.Pac.v9n,
        )) &&
          (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.PokemonName),
          this.SetTextureByPath(s.PokemonIcon, this.GetTexture(0)),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            s.PokemonSkillDesc,
          ),
          this.GetText(2).SetUIActive(
            1 === ModelManager_1.ModelManager.RogueBattleModel.DescMode,
          ),
          (s =
            ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResQualityConfig(
              s.Quality,
            )) &&
            (this.SetTextureByPath(s.PhantomBgA, this.GetTexture(6)),
            this.SetTextureByPath(s.PhantomBgB, this.GetTexture(7))),
          (s = new UiAsyncTask_1.UiAsyncTask(
            "RogueBattlePhantomItem.Refresh",
            async () => {
              await this.AffixLayout.RefreshByDataAsync(e.Pac.rVc);
            },
          )),
          this.RunAsyncTask(s)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("RogueBattle", 34, "不是声骸类型的数据", [
          "Type",
          e.Lac,
        ]);
  }
  OnSelected(e) {
    ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = this.Data;
  }
  OnDeselected(e) {
    ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = void 0;
  }
}
exports.RogueBattlePhantomItem = RogueBattlePhantomItem;
//# sourceMappingURL=RogueBattlePhantomItem.js.map
