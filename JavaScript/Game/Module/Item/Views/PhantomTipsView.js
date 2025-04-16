"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomTipsView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  VisionFetterSuitItem_1 = require("../../Phantom/Vision/View/VisionFetterSuitItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhantomTipsAttributeItem_1 = require("../SpecialItem/PhantomTipsAttributeItem");
class PhantomTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.rgi = !1),
      (this.poh = void 0),
      (this.voh = void 0),
      (this.bxt = void 0),
      (this.Moh = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UINiagara],
    ];
  }
  async OnBeforeStartAsync() {
    (this.poh = new PhantomTipsAttributeItem_1.PhantomTipsAttributeItem()),
      await this.poh.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
      (this.voh = new PhantomTipsAttributeItem_1.PhantomTipsAttributeItem()),
      await this.voh.CreateThenShowByActorAsync(this.GetItem(6).GetOwner());
    var i = this.GetItem(4);
    (this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(i)),
      await this.bxt.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i,
      e = this.OpenParam;
    void 0 === e
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Phantom", 58, "PhantomTipsView无效输入"),
        this.CloseMe())
      : void 0 ===
          (i =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(
              e,
            ))
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Phantom", 58, "PhantomTipsView无效uniqueId", [
              "uniqueId",
              e,
            ]),
          this.CloseMe())
        : (this.Hqe(i),
          (e = this.rgi ? "Golden" : "Start01"),
          (this.UiViewSequence.StartSequenceName = e),
          this.UiViewSequence.AddSequenceFinishEvent(e, this.Moh));
  }
  Hqe(i) {
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
        i.GetQuality(),
      ),
      t = UE.Color.FromHex(e.TextColor),
      s = this.GetText(0),
      s =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(s, i.GetMonsterName()),
        s.SetColor(t),
        this.GetText(1).SetText(i.GetCost().toString()),
        this.SetItemIcon(this.GetTexture(2), i.GetConfigId(!0)),
        this.SetTextureByPath(
          e.AcquireNewItemQualityTexPath,
          this.GetTexture(3),
        ),
        (this.rgi = 5 === e?.Id),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
          i.GetFetterGroupId(),
        ));
    this.bxt.Update(s), this.fvt(i), this.Soh(e);
  }
  fvt(i) {
    i = i.GetMainPropShowAttributeList(1);
    i.length < 2 || (this.poh.RefreshUi(i[0]), this.voh.RefreshUi(i[1]));
  }
  Soh(i) {
    const t = UE.Color.FromHex(i.TextColor);
    this.rgi = 5 === i?.Id;
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      this.rgi ? "NS_Fx_LGUI_Item_Golden" : "NS_Fx_LGUI_Item_Other",
    );
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.NiagaraSystem, (i) => {
      var e;
      i &&
        UiManager_1.UiManager.IsViewOpen("PhantomTipsView") &&
        this.RootItem &&
        ((e = this.GetUiNiagara(7)).SetNiagaraSystem(i),
        this.rgi ||
          (e.ColorParameter.Get("Color").Constant =
            UE.LinearColor.FromSRGBColor(t)));
    });
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ItemModel.LastCloseTimeStamp =
      TimeUtil_1.TimeUtil.GetServerTimeStamp();
  }
}
exports.PhantomTipsView = PhantomTipsView;
//# sourceMappingURL=PhantomTipsView.js.map
