"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionIdentifyView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid"),
  NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent"),
  RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
  UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  VisionIdentifyComponent_1 = require("./VisionIdentifyComponent"),
  VisionMainAttributeComponent_1 = require("./VisionMainAttributeComponent"),
  VisionNameText_1 = require("./VisionNameText");
class VisionIdentifyView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.BHi = void 0),
      (this.bHi = void 0),
      (this.qHi = 0),
      (this.GHi = void 0),
      (this.NHi = !1),
      (this.p9i = void 0),
      (this.OHi = new Map()),
      (this.kHi = new Array()),
      (this.FHi = () => {
        this.Rft();
      }),
      (this.VHi = (e, t) => {
        this.HHi(e, t);
      }),
      (this.jHi = () => {
        this.WHi();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.BHi = new VisionIdentifyComponent_1.LevelUpIdentifyComponent(
      this.GetItem(2),
    )),
      await this.BHi.Init(this.GetViewName()),
      (this.bHi =
        new VisionMainAttributeComponent_1.VisionMainAttributeComponent()),
      await this.bHi.CreateByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    (this.GHi = new VisionIdentifyCostItem(this.GetItem(1))),
      this.GHi.Init(),
      this.GHi.SetOnChangeValueCallBack(this.FHi),
      (this.p9i = new VisionNameText_1.VisionNameText(this.GetText(3)));
  }
  OnBeforeShow() {
    this.mSe(), (this.qHi = this.ExtraParams), this.WHi(), this.Og();
  }
  mSe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnVisionIdentify,
      this.jHi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnVisionIdentifyDoAnimation,
        this.VHi,
      ),
      (this.NHi = !0);
  }
  dSe() {
    this.NHi &&
      ((this.NHi = !1),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnVisionIdentify,
        this.jHi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnVisionIdentifyDoAnimation,
        this.VHi,
      ));
  }
  Og() {
    this.KHi(), this.sqi(), this.P5e();
  }
  P5e() {
    var e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.qHi,
      );
    this.p9i.Update(e);
  }
  async HHi(e, t) {
    UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !0),
      this.QHi(),
      0 < this.kHi?.length && (await this.BHi.PlayUpdateAnimation(this.kHi));
    const i =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        e,
      );
    UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
      UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle().Model,
      "VisionChangeController",
    );
    e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionIdentifyDelay();
    TimerSystem_1.TimerSystem.Delay(() => {
      var e = i.GetNewSubPropSuccessData(t);
      RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
        e,
      ),
        UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !1);
    }, e),
      this.Og();
  }
  QHi() {
    var e, t;
    0 < this.kHi.length &&
      ((e = (t =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          this.qHi,
        )).GetCurrentCanIdentifyCount()),
      0 <
        (t = t.GetSubPropIdentifyPreviewData(
          t.GetPhantomLevel(),
          0 === e ? 0 : this.GHi.CurrentConsumeSelectNum(),
        )).length) &&
      this.BHi.Update(t, !0);
  }
  WHi() {
    this.kHi = [];
    var e =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          this.qHi,
        ),
      t = e.GetCurrentCanIdentifyCount(),
      i = e.GetSubPropIdentifyPreviewData(
        e.GetPhantomLevel(),
        0 === t ? 0 : this.GHi.CurrentConsumeSelectNum(),
      ),
      s = i.length;
    if (0 < s)
      for (let e = 0; e < s; e++) {
        var r = this.OHi.get(e);
        (5 !== r && 1 !== r) ||
          r === i[e].SlotState ||
          3 !== i[e].SlotState ||
          this.kHi.push(e);
      }
    for (let e = 0; e < s; e++) {
      var n = i[e].SlotState;
      this.OHi.set(e, n);
    }
  }
  sqi() {
    var e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.qHi,
      );
    this.GHi.Update(e);
  }
  KHi() {
    var e =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          this.qHi,
        ),
      e = e.GetLevelUpPreviewData(e.GetPhantomLevel());
    this.bHi.Update(e);
  }
  Rft() {
    var e =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          this.qHi,
        ),
      t = e.GetCurrentCanIdentifyCount(),
      e = e.GetSubPropIdentifyPreviewData(
        e.GetPhantomLevel(),
        0 === t ? 0 : this.GHi.CurrentConsumeSelectNum(),
      ),
      t = 0 < e.length;
    t && this.BHi.Update(e, !1), this.BHi.SetActive(t);
  }
  OnBeforeHide() {
    this.dSe(), UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !1);
  }
  OnBeforeDestroy() {
    this.dSe(), this.BHi.Destroy(), this.bHi.Destroy(), this.GHi.Destroy();
  }
}
exports.VisionIdentifyView = VisionIdentifyView;
class VisionIdentifyCostItem extends UiComponentsAction_1.UiComponentsAction {
  constructor(e) {
    super(),
      (this.wqe = void 0),
      (this.WGe = void 0),
      (this.Pe = void 0),
      (this.XHi = void 0),
      (this.$Hi = void 0),
      (this.ebt = void 0),
      (this.wYt = (e) => {
        this.ebt?.SetSelected(!1, !0);
        var t = this.Pe.GetCurrentIdentifyCostId(),
          i =
            ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
              t,
            );
        let s = 0;
        void 0 !== (s = 0 < i.length ? i[0].GetUniqueId() : s) && 0 < s
          ? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(
              s,
              t,
            )
          : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              t,
            );
      }),
      (this.YHi = () => {
        this.JHi(this.Pe)
          ? this.Pe.GetIfHaveEnoughIdentifyGold(this.CurrentConsumeSelectNum())
            ? this.zHi()
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "IdentifyNotEnoughMoney",
              )
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "LevelUpMaterialShort",
            );
      }),
      (this.KGe = (e) => {
        var t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "IdentifyCount",
          );
        return new LguiUtil_1.TableTextArgNew(t, e);
      }),
      (this.QGe = (e) => {
        this.Og(), this.$Hi?.();
      }),
      (this.wqe = e);
  }
  Init() {
    this.SetRootActor(this.wqe.GetOwner(), !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UITexture],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText],
    ];
  }
  OnStart() {
    (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
      this.GetItem(8),
    )),
      (this.XHi = new ButtonItem_1.ButtonItem(this.GetItem(11))),
      this.XHi.SetFunction(this.YHi),
      (this.ebt = new MediumItemGrid_1.MediumItemGrid()),
      this.ebt.Initialize(this.GetItem(12).GetOwner()),
      this.ebt.BindOnExtendToggleStateChanged(this.wYt);
  }
  async zHi() {
    UiLayer_1.UiLayer.SetShowMaskLayer("PhantomIdentify", !0),
      await ControllerHolder_1.ControllerHolder.PhantomBattleController.RequestPhantomIdentify(
        this.Pe.GetIncrId(),
        this.CurrentConsumeSelectNum(),
      ),
      UiLayer_1.UiLayer.SetShowMaskLayer("PhantomIdentify", !1);
  }
  ZHi() {}
  eji(e) {
    var t = e.GetCurrentIdentifyCostId(),
      i = {
        Type: 4,
        ItemConfigId: t,
        StarLevel:
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t)
            .QualityId,
      },
      e = e.GetCurrentIdentifyCostValue(),
      t =
        ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(t);
    let s = 0,
      r = (0 < t.length && (s = t[0].GetCount()), 0);
    0 < this.CurrentConsumeSelectNum() &&
      (r = e * this.CurrentConsumeSelectNum()),
      s >= e
        ? (i.BottomText = StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_CollectProgress_Text",
            ),
            s.toString(),
            r.toString(),
          ))
        : (i.BottomText = StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_ItemCostNotEnough_Text",
            ),
            s.toString(),
            r.toString(),
          )),
      this.ebt.Apply(i);
  }
  tji(e) {
    var e = e.GetCurrentCanIdentifyCount(),
      t = {
        MaxNumber: e,
        GetExchangeTableText: this.KGe,
        ValueChangeFunction: this.QGe,
      };
    this.WGe.SetMinValue(0),
      this.WGe.Init(t),
      this.WGe.SetAddReduceButtonActive(!0),
      this.WGe.SetMinTextShowState(!0),
      this.WGe.SetAddReduceButtonInteractive(1 < e),
      this.WGe.SetReduceButtonInteractive(1 < this.CurrentConsumeSelectNum());
  }
  Pke(e) {
    var t = e.GetIdentifyCostItemId(),
      t = (this.SetItemIcon(this.GetTexture(9), t), this.GetText(10));
    t.SetText(
      (
        e.GetIdentifyCostItemValue() * this.CurrentConsumeSelectNum()
      ).toString(),
    ),
      t.SetChangeColor(
        !e.GetIfHaveEnoughIdentifyGold(this.CurrentConsumeSelectNum()),
        t.changeColor,
      );
  }
  iji(e) {
    e = this.oji(e);
    this.GetItem(3).SetUIActive(e);
  }
  oji(e) {
    let t = !0;
    for (const i of e.GetLevelSubPropData(e.GetPhantomLevel()))
      if (3 !== i.SlotState) {
        t = !1;
        break;
      }
    return t;
  }
  o6e(e) {
    var t = this.rji(e);
    this.GetItem(4).SetUIActive(t),
      t &&
        (e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum())
          ? LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(5),
              "IdentifyNeedLevelText",
              e.GetNextIdentifyLevel(),
            )
          : this.GetText(5).SetText(
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "IdentifyNotEnough",
              ),
            ));
  }
  JHi(e) {
    return e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum());
  }
  rji(e) {
    var t = e.GetIfHaveEnoughIdentifyConsumeItem(
        this.CurrentConsumeSelectNum(),
      ),
      i = e.GetIfHaveUnIdentifySubProp();
    return !(this.oji(e) || (i && t));
  }
  nji(e) {
    var t = this.oji(e),
      i = this.rji(e),
      s = t || i;
    this.GetItem(7).SetUIActive(!s),
      this.GetItem(11).SetUIActive(!s),
      i &&
        ((s = e.GetIfHaveEnoughIdentifyConsumeItem(
          this.CurrentConsumeSelectNum(),
        )),
        this.GetItem(2).SetUIActive(!s)),
      t && this.GetItem(2).SetUIActive(!1),
      i || t || this.GetItem(2).SetUIActive(!0);
  }
  CurrentConsumeSelectNum() {
    return this.WGe.GetSelectNumber();
  }
  Update(e) {
    (this.Pe = e), this.tji(this.Pe), this.Og();
  }
  SetOnChangeValueCallBack(e) {
    this.$Hi = e;
  }
  sji(e) {
    e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum()) ||
      1 !== this.CurrentConsumeSelectNum() ||
      ((e =
        ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "IdentifyCount",
        )),
      (e = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e),
        "0",
      )),
      this.WGe.SetNumberSelectTipsText(e));
  }
  Og() {
    this.Pke(this.Pe),
      this.o6e(this.Pe),
      this.iji(this.Pe),
      this.nji(this.Pe),
      this.eji(this.Pe),
      this.ZHi(),
      this.sji(this.Pe);
  }
}
//# sourceMappingURL=VisionIdentifyView.js.map
