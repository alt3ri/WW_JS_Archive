"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemTipsAbyssDangoComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  DangoAbyssActivityController_1 = require("../../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityController"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  InActiveRedItem_1 = require("../../../Common/InActiveRedItem"),
  ItemTipsBaseSubComponent_1 = require("../../../Common/ItemTips/SubComponents/ItemTipsBaseSubComponent"),
  ItemTipsLockButton_1 = require("../../../Common/ItemTips/SubComponents/ItemTipsLockButton"),
  MediumItemGridDangoPluginIconComponent_1 = require("../../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridDangoPluginIconComponent"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DangoAbyssDefine_1 = require("../DangoAbyssDefine"),
  DangoAbyssTagItem_1 = require("./DangoAbyssTagItem"),
  DangoAbyssTipsAttributeItem_1 = require("./DangoAbyssTipsAttributeItem");
class ItemTipsAbyssDangoComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(e) {
    super(e),
      (this.$8i = void 0),
      (this.ugc = void 0),
      (this.Qgc = void 0),
      (this.BGc = void 0),
      (this.kgc = void 0),
      (this.wxt = void 0),
      (this.Ogc = void 0),
      (this.CFc = 0),
      (this.L3a = (e) => {
        this.Og(this.$8i);
      }),
      (this.qgc = () => {
        var e = new DangoAbyssTagItem_1.DangoAbyssTagItem();
        return (e.GetValueByAddType = !0), e;
      }),
      (this.Bqe = () => {
        return new DangoAbyssTipsAttributeItem_1.DangoAbyssTipsAttributeItem();
      }),
      (this.tWt = () => {
        var e;
        2 === this.CFc
          ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              303,
            )).FunctionMap.set(2, this.pFc),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ))
          : this.pFc(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Activity", 75, "当前按钮状态：" + this.CFc);
      }),
      (this.pFc = () => {
        var e;
        this.$8i &&
          ((e = {
            DangoId: this.$8i.DangoId,
            SlotIndex: this.$8i.SlotIndex,
            IncId: this.$8i.IncId,
          }),
          (e =
            ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssItemNewEquip(
              e,
              this.CFc,
            )),
          DangoAbyssActivityController_1.DangoAbyssActivityController.RequestPutPluginOnDango(
            this.$8i.DangoId,
            e,
            this.CFc,
          ));
      }),
      this.CreateThenShowByResourceIdAsync("UiItem_TipsChipInfo", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UITexture],
      [12, UE.UITexture],
      [13, UE.UINiagara],
      [14, UE.UIText],
    ];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnItemFuncValueChange,
      this.L3a,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemFuncValueChange,
      this.L3a,
    );
  }
  async OnBeforeStartAsync() {
    var e = [];
    (this.ugc = new InActiveRedItem_1.InActiveRedItem()),
      e.push(this.ugc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())),
      (this.Qgc = new ButtonItem_1.ButtonItem()),
      e.push(this.Qgc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())),
      this.Qgc.SetFunction(this.tWt),
      (this.BGc =
        new MediumItemGridDangoPluginIconComponent_1.MediumItemGridDangoPluginIconComponent()),
      e.push(this.BGc.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())),
      (this.wxt = new ItemTipsLockButton_1.TipsLockButton(this.GetItem(0))),
      await Promise.all(e);
  }
  OnStart() {
    (this.kgc = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(1),
      this.Bqe,
      this.GetItem(2).GetOwner(),
    )),
      (this.Ogc = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(3),
        this.qgc,
        this.GetItem(4).GetOwner(),
      ));
  }
  Refresh(e) {
    var t = () => {
      this.Og(e);
    };
    this.InAsyncLoading() ? this.OperationMap.set("Refresh", t) : t();
  }
  Og(e) {
    this.$8i = e;
    var t =
        ModelManager_1.ModelManager.DangoAbyssModel.GetPluginShowAttributeList(
          e.ConfigId,
        ),
      t =
        (this.fvt(t),
        ModelManager_1.ModelManager.DangoAbyssModel.GetPluginShowTagDataList(
          e.ConfigId,
        )),
      t =
        (this.qSo(t),
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetItemBgDesc(
          e.ConfigId,
        )),
      t =
        (this.GetText(6).SetText(t),
        { DangoId: e.DangoId, SlotIndex: e.SlotIndex, IncId: e.IncId });
    (this.CFc =
      ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssItemTipsConfirmState(
        t,
      )),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Activity", 75, "当前按钮状态：" + this.CFc),
      this.Cgc(e),
      this.P7e(e),
      this.Kgc(e),
      this.Kbe(e),
      this.P5e(e),
      this.BGt(e),
      this.qS1(e);
  }
  Kbe(e) {
    e = { PluginItemId: e.ConfigId };
    this.BGc?.RefreshByInfo(e);
  }
  Kgc(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemConfig(
        e.ConfigId,
      ),
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemTypeConfig(
        t.ItemType,
      );
    e.IncId && 0 < e.IncId
      ? (this.wxt.Refresh(e.IncId, e.CanClickLockButton),
        this.wxt.SetDeprecateToggleVisible(t.Deprecate),
        this.wxt?.SetUiActive(!0))
      : this.wxt?.SetUiActive(!1);
  }
  P7e(e) {
    switch ((this.Qgc.SetUiActive(!0), this.CFc)) {
      case 2:
        this.Qgc.TrySetLocalTextNew("Text_PhantomReplace_Text");
        break;
      case 3:
        this.Qgc.TrySetLocalTextNew("Text_PhantomTakeOff_Text");
        break;
      case 4:
        this.Qgc.TrySetLocalTextNew("Text_PhantomReplace_Text");
        break;
      case 5:
        this.Qgc.TrySetLocalTextNew("Text_PhantomPutOn_Text");
        break;
      case 6:
        this.Qgc.TrySetLocalTextNew("Text_PhantomReplace_Text");
        break;
      case 7:
        this.Qgc.TrySetLocalTextNew("Text_PhantomPutOn_Text");
        break;
      default:
        this.Qgc.SetUiActive(!1);
    }
  }
  Cgc(e) {
    switch (
      (this.ugc.SetUiActive(!0), this.ugc.SetDetailButtonVisible(!1), this.CFc)
    ) {
      case 1:
        var t =
            ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemBelongId(
              e.IncId,
            ),
          t =
            ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(
              t,
            ).Name,
          t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
        this.ugc.SetText(DangoAbyssDefine_1.TEXT_EQUIP_ERROR_DANGO, t);
        break;
      case 8:
        this.ugc.SetText(DangoAbyssDefine_1.TEXT_EQUIP_SAME);
        break;
      case 9:
        this.ugc.SetText(DangoAbyssDefine_1.TEXT_EQUIP_REPEAT);
        break;
      default:
        this.ugc.SetUiActive(!1);
    }
  }
  fvt(e) {
    this.kgc.RefreshByData(e);
  }
  qSo(e) {
    this.Ogc.RefreshByData(e);
  }
  P5e(e) {
    var t = this.GetText(10),
      i =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(
          e.ConfigId,
        ),
      i = UE.Color.FromHex(i.DropColor);
    t.SetColor(i), LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Title);
  }
  BGt(e) {
    var t = this.GetUiNiagara(13),
      i = (t.DeactivateSystem(), this.GetTexture(11)),
      e =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(
          e.ConfigId,
        ),
      s = e.TipsQualityTexturePath,
      e = e.QualityColor,
      e = UE.Color.FromHex(e);
    t.SetColor(e), t.ActivateSystem(!0), this.SetTextureByPath(s, i);
  }
  qS1(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(
      e.ConfigId,
    ).SlotType;
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(
      this.GetText(14),
      DangoAbyssDefine_1.textPluginType.get(e),
    );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length < 2))
      return (e = e[1]), (e = this.GetGuideUiItem(e)) ? [e, e] : void 0;
  }
}
exports.ItemTipsAbyssDangoComponent = ItemTipsAbyssDangoComponent;
//# sourceMappingURL=ItemTipsAbyssDangoComponent.js.map
