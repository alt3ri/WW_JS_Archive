"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewItemTipsView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class NewItemTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), (this.EPe = void 0), (this.rCi = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UINiagara],
    ];
  }
  OnStart() {
    const e = ModelManager_1.ModelManager.ItemModel.ShiftWaitItemList();
    if (void 0 === e)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Item", 9, "新物品提示错误, 没有物品id!"),
        this.CloseMe();
    else {
      const i =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
      if (void 0 === i)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Item", 9, "新物品提示错误, 没有物品配置!", [
            "itemId",
            e,
          ]),
          this.CloseMe();
      else {
        const t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
          i.QualityId,
        );
        const s = UE.Color.FromHex(t.TextColor);
        this.GetText(1).SetColor(s), (this.rCi = t?.Id === 5);
        var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          this.rCi ? "NS_Fx_LGUI_Item_Golden" : "NS_Fx_LGUI_Item_Other",
        );
        var r =
          (ResourceSystem_1.ResourceSystem.LoadAsync(
            r,
            UE.NiagaraSystem,
            (e) => {
              let i;
              e &&
                UiManager_1.UiManager.IsViewOpen("NewItemTipsView") &&
                this.RootItem &&
                ((i = this.GetUiNiagara(5)).SetNiagaraSystem(e),
                this.rCi ||
                  (i.ColorParameter.Get("Color").Constant =
                    UE.LinearColor.FromSRGBColor(s)));
            },
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Name),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            i.ObtainedShowDescription,
          ),
          this.SetItemIcon(this.GetTexture(2), e),
          this.SetTextureByPath(
            t.AcquireNewItemQualityTexPath,
            this.GetTexture(4),
          ),
          (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
            this.RootItem,
          )),
          this.EPe.BindSequenceCloseEvent((e) => {
            (e !== "Golden" && e !== "Start01") || this.CloseMe();
          }),
          ConfigManager_1.ConfigManager.ItemConfig.GetMainTypeConfig(
            i.MainTypeId,
          ));
        r?.IconFirstAchieve &&
          this.SetTextureByPath(r.IconFirstAchieve, this.GetTexture(0));
      }
    }
  }
  OnAfterShow() {
    this.EPe?.PlayLevelSequenceByName(this.rCi ? "Golden" : "Start01");
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ItemModel.LastCloseTimeStamp =
      TimeUtil_1.TimeUtil.GetServerTimeStamp();
  }
}
exports.NewItemTipsView = NewItemTipsView;
// # sourceMappingURL=NewItemTipsView.js.map
