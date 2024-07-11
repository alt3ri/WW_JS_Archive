"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillTreeInfoView = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const CostMediumItemGrid_1 = require("../RoleBreach/CostMediumItemGrid");
const RoleController_1 = require("../RoleController");
const CommonAttributeData_1 = require("../View/ViewData/CommonAttributeData");
const RoleSkillInputPanel_1 = require("./RoleSkillInputPanel");
const RoleSkillTreeAttributeItem_1 = require("./RoleSkillTreeAttributeItem");
class RoleSkillTreeInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.zke = 0),
      (this.Ico = 0),
      (this.Nco = void 0),
      (this.Oco = void 0),
      (this.kco = void 0),
      (this.Fco = void 0),
      (this.lqe = void 0),
      (this.p8t = void 0),
      (this.Vco = void 0),
      (this.yco = !1),
      (this.Hco = !1),
      (this.jco = 1),
      (this.Wco = []),
      (this.Kco = []),
      (this.x4t = !1),
      (this.Qco = (i, t) => {
        this.Update(i, t), this.Xco(this.jco);
      }),
      (this.i2e = () => {
        UiManager_1.UiManager.CloseView("RoleSkillTreeInfoView"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRoleInternalViewQuit,
          );
      }),
      (this.$co = (i) => {
        (this.Hco = i), this.Yco(this.jco, i), this.Jco(i);
      }),
      (this.w4t = (i) => {
        (ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc = i),
          (this.x4t = i),
          this.Update(this.zke, this.Ico);
      }),
      (this.zco = () => {
        (this.Hco = !1),
          this.GetExtendToggle(19).SetToggleState(0),
          this.Zco(),
          this.Jco(!1);
      }),
      (this.emo = () => {
        (this.Hco = !1),
          this.GetExtendToggle(19).SetToggleState(0),
          this.tmo(),
          this.Jco(!1);
      }),
      (this.imo = () => {
        (this.jco = 1), this.Xco(this.jco);
      }),
      (this.omo = () => {
        (this.jco = 2), this.Xco(this.jco);
      }),
      (this.rmo = () => {
        var i = this.Nco.GetSkillNodeLevel(this.Oco);
        var i =
          ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(
            this.Ico,
            i + 1,
          );
        if (i)
          for (const [t, e] of i)
            if (
              ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                t,
              ) < e
            )
              return void (t === ItemDefines_1.EItemId.Gold
                ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "RoleNoMoney",
                  )
                : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "RoleNoMaterial",
                  ));
        i = this.Oco.NodeType;
        i === 1 || i === 2
          ? RoleController_1.RoleController.SendPbUpLevelSkillRequest(
              this.zke,
              this.Ico,
            )
          : RoleController_1.RoleController.SendRoleActivateSkillRequest(
              this.zke,
              this.Ico,
            );
      }),
      (this.nmo = () => {
        const i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(172);
        i.FunctionMap.set(2, () => {
          this.CloseMe(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.SelectRoleTabOutside,
              "RoleAttributeTabView",
            );
        }),
          (i.IsEscViewTriggerCallBack = !1),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          );
      }),
      (this.Wyt = () => {
        const i = new CostMediumItemGrid_1.CostMediumItemGrid();
        return (
          i.BindOnExtendToggleClicked((i) => {
            i = i.Data;
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              i.ItemId,
            );
          }),
          i.BindOnCanExecuteChange(() => !1),
          i
        );
      }),
      (this.Dje = (i, t, e) => {
        var t = new RoleSkillTreeAttributeItem_1.RoleSkillTreeAttributeItem(t);
        const s = this.Wco[e];
        const h = e < this.Kco.length ? this.Kco[e] : void 0;
        return t.Refresh(s, h), { Key: e, Value: t };
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [9, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIExtendToggle],
      [5, UE.UIExtendToggle],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIHorizontalLayout],
      [12, UE.UITexture],
      [13, UE.UIText],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIText],
      [17, UE.UIItem],
      [18, UE.UIText],
      [19, UE.UIExtendToggle],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIItem],
      [24, UE.UIButtonComponent],
      [25, UE.UIButtonComponent],
      [26, UE.UIButtonComponent],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIButtonComponent],
      [30, UE.UIExtendToggle],
      [31, UE.UIItem],
      [32, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [4, this.imo],
        [5, this.omo],
        [19, this.$co],
        [24, this.i2e],
        [25, this.zco],
        [26, this.nmo],
        [29, this.emo],
        [30, this.w4t],
      ]);
  }
  async OnBeforeStartAsync() {
    this.Vco = new RoleSkillInputPanel_1.RoleSkillInputPanel();
    const i = this.GetItem(28).GetOwner();
    await this.Vco.CreateThenShowByActorAsync(i);
  }
  OnStart() {
    (this.kco = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(11),
      this.Wyt,
    )),
      (this.Fco = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(8),
        this.Dje,
      )),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(21))),
      this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
      this.lqe.SetCurrencyItemVisible(!0),
      (this.p8t = new ButtonItem_1.ButtonItem(this.GetItem(14))),
      this.p8t.SetFunction(this.rmo),
      this.GetItem(20).SetUIActive(!1),
      this.SetItemIcon(this.GetTexture(12), ItemDefines_1.EItemId.Gold);
    var i = ModelManager_1.ModelManager.GameModeModel.IsMulti;
    var i =
      (this.GetItem(31).SetUIActive(i),
      (this.x4t =
        ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc && i),
      this.x4t ? 1 : 0);
    var i = (this.GetExtendToggle(30).SetToggleState(i), this.OpenParam);
    const t = i.RoleId;
    var i = i.SkillNodeId;
    (this.jco = 1), this.Update(t, i), this.smo(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateSkillTreeInfoView,
      this.Qco,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateSkillTreeInfoView,
      this.Qco,
    );
  }
  Update(i, t) {
    (this.zke = i),
      (this.Ico = t),
      (this.Oco =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
          this.Ico,
        ));
    let e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i);
    (e = e || ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i)),
      (this.Nco = e.GetSkillData()),
      this.Vco?.RefreshUi(i),
      this.Refresh(),
      e.IsTrialRole() && this.amo();
  }
  Refresh() {
    if (!this.InAsyncLoading())
      switch (
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(this.Ico)
          .NodeType
      ) {
        case 4:
          this.hmo();
          break;
        case 3:
          this.lmo();
          break;
        case 2:
          this._mo();
          break;
        case 1:
          this.umo();
      }
  }
  amo() {
    this.GetItem(22).SetUIActive(!1),
      this.GetItem(17).SetUIActive(!1),
      this.GetItem(15).SetUIActive(!1),
      this.p8t.SetActive(!1),
      this.GetExtendToggle(19).RootUIComp.SetUIActive(!1),
      this.lqe.SetCurrencyItemVisible(!1);
  }
  hmo() {
    (this.yco = !0),
      (this.jco = 1),
      this.GetText(3).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetExtendToggle(19).RootUIComp.SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "SkillType_AttributeNode_TypeName",
      );
    const i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
      this.Ico,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), i.PropertyNodeTitle),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(10),
        i.PropertyNodeDescribe,
        ...i.PropertyNodeParam,
      ),
      this.cmo(),
      this.mmo();
  }
  lmo() {
    (this.yco = !1),
      (this.jco = 1),
      this.GetText(3).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetExtendToggle(19).RootUIComp.SetUIActive(!1),
      this.tlo(),
      this.cmo(),
      this.mmo();
  }
  umo() {
    (this.yco = !1), this.dmo(), this.mmo();
  }
  _mo() {
    (this.yco = !1), this.dmo(), this.mmo();
  }
  dmo() {
    this.GetText(3).SetUIActive(!0), this.GetItem(6).SetUIActive(!0);
    const i = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(
      this.zke,
      this.Ico,
    );
    const t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(
      this.Oco.SkillId,
    ).MaxSkillLevel;
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "RoleResonanceLevel", i),
      i === t
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(32),
            "PrefabTextItem_3463157315_Text",
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(32),
            "PrefabTextItem_SkillNext_Text",
          ),
      this.tlo(),
      this.Cmo();
  }
  tlo() {
    let i;
    let t = this.Oco.SkillId;
    t &&
      t > 0 &&
      ((t =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t)),
      (i =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(
          t.SkillType,
        )) && this.GetText(2).SetText(i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.SkillName),
      this.x4t
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(10),
            t.MultiSkillDescribe,
            ...t.MultiSkillDetailNum,
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(10),
            t.SkillDescribe,
            ...t.SkillDetailNum,
          ));
  }
  mmo() {
    var i = this.Oco.SkillId;
    let t = void 0;
    t =
      i && i > 0
        ? ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(i)
            ?.Icon
        : this.Oco.PropertyNodeIcon;
    var i = this.GetTexture(1);
    const e = this.GetSprite(0);
    this.yco
      ? (i.SetUIActive(!0), e.SetUIActive(!1), this.SetTextureByPath(t, i))
      : (i.SetUIActive(!1), e.SetUIActive(!0), this.SetSpriteByPath(t, e, !1));
  }
  oHi(t = 1) {
    t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(
      this.Ico,
      t,
    );
    if (t && t.size !== 0) {
      this.GetItem(22).SetUIActive(!0), this.GetItem(23).SetUIActive(!0);
      let e;
      let s;
      let h;
      const r = [];
      let i = 0;
      for ([e, s] of t)
        e === ItemDefines_1.EItemId.Gold
          ? (i = s)
          : ((h = {
              ItemId: e,
              IncId: 0,
              Count: s,
              SelectedCount:
                ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
                  e,
                ),
            }),
            r.push(h));
      var t = this.GetText(13);
      const o =
        (t.SetText(i.toString()),
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          ItemDefines_1.EItemId.Gold,
        ));
      (t.useChangeColor = o < i), this.kco.RefreshByData(r);
    } else this.GetItem(22).SetUIActive(!1), this.GetItem(23).SetUIActive(!1);
  }
  cmo() {
    let i = this.Nco.GetSkillTreeNodeState(this.Oco, this.zke);
    this.p8t.SetActive(i === 2),
      this.GetItem(22).SetUIActive(i === 2),
      this.GetItem(23).SetUIActive(i === 2),
      this.GetItem(17).SetUIActive(i === 1),
      this.GetItem(15).SetUIActive(i === 3),
      i === 3
        ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "Actived")
        : (this.oHi(),
          i === 2
            ? this.p8t.SetLocalText("RoleResonActive")
            : i === 1 &&
              ((i = this.Nco.GetUnlockConditionTextId(this.Oco)),
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), i)),
          (i = this.Nco.GetSkillTreeUnsatisfiedCondition(this.Oco)),
          this.GetButton(26).RootUIComp.SetUIActive(!(i?.ConditionType === 2)));
  }
  Cmo() {
    let i;
    let t = this.Nco.GetSkillTreeNodeState(this.Oco, this.zke);
    this.p8t.SetActive(t === 2),
      this.GetItem(22).SetUIActive(t !== 3),
      this.GetItem(23).SetUIActive(t !== 3),
      this.GetItem(17).SetUIActive(t === 1),
      this.GetItem(15).SetUIActive(t === 3),
      this.GetExtendToggle(19).RootUIComp.SetUIActive(!0),
      this.gmo(),
      t === 3
        ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "RoleAlreadyMax")
        : ((i = this.Nco.GetSkillNodeLevel(this.Oco)),
          this.oHi(i + 1),
          t === 2
            ? this.p8t.SetLocalText("RoleLevelUp")
            : t === 1 &&
              ((i = this.Nco.GetUnlockConditionTextId(this.Oco)),
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), i)),
          (t = this.Nco.GetSkillTreeUnsatisfiedCondition(this.Oco)),
          this.GetButton(26).RootUIComp.SetUIActive(!(t?.ConditionType === 2)));
  }
  fmo(i) {
    const t = new CommonAttributeData_1.CommonAttributeData();
    const e =
      ModelManager_1.ModelManager.RoleModel.GetSkillAttributeNameByOneSkillEffect(
        i,
      );
    return (
      (t.AttrNameText =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? ""),
      (t.AttrBaseValue =
        ModelManager_1.ModelManager.RoleModel.GetSkillAttributeDescriptionByOneSkillEffect(
          i,
        )),
      t
    );
  }
  gmo() {
    (this.Wco.length = 0), (this.Kco.length = 0);
    const t =
      ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetSkillEffect()
        .EffectDescList;
    const e = void 0 !== t ? t.length : 0;
    const s =
      ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetNextLevelSkillEffect()
        ?.EffectDescList;
    for (let i = 0; i < e; i++)
      this.Wco.push(this.fmo(t[i])), s && this.Kco.push(this.fmo(s[i]));
    this.Fco.RefreshByData(this.Wco);
  }
  Xco(i) {
    i === 1 ? this.smo() : this.pmo();
  }
  smo(i = 0) {
    this.GetExtendToggle(4).SetToggleState(1),
      this.GetExtendToggle(5).SetToggleState(0),
      this.GetItem(7).SetUIActive(!0),
      this.GetScrollViewWithScrollbar(8).GetRootComponent().SetUIActive(!1),
      this.Zco(),
      this.Yco(this.jco, this.Hco);
  }
  pmo() {
    this.GetExtendToggle(4).SetToggleState(0),
      this.GetExtendToggle(5).SetToggleState(1),
      this.GetItem(7).SetUIActive(!1),
      this.GetScrollViewWithScrollbar(8).GetRootComponent().SetUIActive(!0),
      this.tmo(),
      this.Yco(this.jco, this.Hco);
  }
  Yco(i, t) {
    this.jco === 2
      ? t
        ? this.vmo()
        : this.Zco()
      : t
        ? this.Mmo()
        : this.tmo();
  }
  Mmo() {
    this.GetItem(27).SetUIActive(!0);
  }
  tmo() {
    this.GetItem(27).SetUIActive(!1);
  }
  vmo() {
    this.GetItem(20).SetUIActive(!0);
    for (const i of this.Fco.GetScrollItemList()) i.SetNextLevelItem(!0);
  }
  Zco() {
    this.GetItem(20).SetUIActive(!1);
    for (const i of this.Fco.GetScrollItemList()) i.SetNextLevelItem(!1);
  }
  Jco(i) {
    i
      ? (this.UiViewSequence.StopSequenceByKey("ViewShow"),
        this.UiViewSequence.PlaySequence("ViewShow"))
      : (this.UiViewSequence.StopSequenceByKey("ViewHide"),
        this.UiViewSequence.PlaySequence("ViewHide"));
  }
}
exports.RoleSkillTreeInfoView = RoleSkillTreeInfoView;
// # sourceMappingURL=RoleSkillTreeInfoView.js.map
