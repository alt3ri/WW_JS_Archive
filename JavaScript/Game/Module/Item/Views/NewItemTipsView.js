"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewItemTipsView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class NewItemTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), (this.SPe = void 0), (this.rgi = !1);
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
    var e = ModelManager_1.ModelManager.ItemModel.ShiftWaitItemList();
    if (void 0 === e)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Item", 9, "新物品提示错误, 没有物品id!"),
        this.CloseMe();
    else {
      var i =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
      if (void 0 === i)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Item", 9, "新物品提示错误, 没有物品配置!", [
            "itemId",
            e,
          ]),
          this.CloseMe();
      else {
        var t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
          i.QualityId,
        );
        const s = UE.Color.FromHex(t.TextColor);
        this.GetText(1).SetColor(s), (this.rgi = 5 === t?.Id);
        var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            this.rgi ? "NS_Fx_LGUI_Item_Golden" : "NS_Fx_LGUI_Item_Other",
          ),
          r =
            (ResourceSystem_1.ResourceSystem.LoadAsync(
              r,
              UE.NiagaraSystem,
              (e) => {
                var i;
                e &&
                  UiManager_1.UiManager.IsViewOpen("NewItemTipsView") &&
                  this.RootItem &&
                  ((i = this.GetUiNiagara(5)).SetNiagaraSystem(e),
                  this.rgi ||
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
            (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
              this.RootItem,
            )),
            this.SPe.BindSequenceCloseEvent((e) => {
              ("Golden" !== e && "Start01" !== e) || this.CloseMe();
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
    this.SPe?.PlayLevelSequenceByName(this.rgi ? "Golden" : "Start01");
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ItemModel.LastCloseTimeStamp =
      TimeUtil_1.TimeUtil.GetServerTimeStamp();
  }
}
exports.NewItemTipsView = NewItemTipsView;
//# sourceMappingURL=NewItemTipsView.js.map
