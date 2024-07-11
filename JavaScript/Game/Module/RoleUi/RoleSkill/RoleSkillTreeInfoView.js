"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillTreeInfoView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  CostMediumItemGrid_1 = require("../RoleBreach/CostMediumItemGrid"),
  RoleController_1 = require("../RoleController"),
  CommonAttributeData_1 = require("../View/ViewData/CommonAttributeData"),
  RoleSkillInputPanel_1 = require("./RoleSkillInputPanel"),
  RoleSkillTreeAttributeItem_1 = require("./RoleSkillTreeAttributeItem");
class RoleSkillTreeInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.dFe = 0),
      (this.Mmo = 0),
      (this.Bmo = void 0),
      (this.bmo = void 0),
      (this.qmo = void 0),
      (this.Gmo = void 0),
      (this.lqe = void 0),
      (this.p9t = void 0),
      (this.Nmo = void 0),
      (this.vmo = !1),
      (this.Omo = !1),
      (this.kmo = 1),
      (this.Fmo = []),
      (this.Vmo = []),
      (this.x5t = !1),
      (this.Hmo = (i, t) => {
        this.Update(i, t), this.jmo(this.kmo);
      }),
      (this.pFe = () => {
        UiManager_1.UiManager.CloseView("RoleSkillTreeInfoView"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRoleInternalViewQuit,
          );
      }),
      (this.Wmo = (i) => {
        (this.Omo = i), this.Kmo(this.kmo, i), this.Qmo(i);
      }),
      (this.w5t = (i) => {
        (ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc = i),
          (this.x5t = i),
          this.Update(this.dFe, this.Mmo);
      }),
      (this.Xmo = () => {
        (this.Omo = !1),
          this.GetExtendToggle(19).SetToggleState(0),
          this.$mo(),
          this.Qmo(!1);
      }),
      (this.Ymo = () => {
        (this.Omo = !1),
          this.GetExtendToggle(19).SetToggleState(0),
          this.Jmo(),
          this.Qmo(!1);
      }),
      (this.zmo = () => {
        (this.kmo = 1), this.jmo(this.kmo);
      }),
      (this.Zmo = () => {
        (this.kmo = 2), this.jmo(this.kmo);
      }),
      (this.edo = () => {
        var i = this.Bmo.GetSkillNodeLevel(this.bmo),
          i =
            ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(
              this.Mmo,
              i + 1,
            );
        if (i)
          for (var [t, e] of i)
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
        i = this.bmo.NodeType;
        1 === i || 2 === i
          ? RoleController_1.RoleController.SendPbUpLevelSkillRequest(
              this.dFe,
              this.Mmo,
            )
          : RoleController_1.RoleController.SendRoleActivateSkillRequest(
              this.dFe,
              this.Mmo,
            );
      }),
      (this.tdo = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(172);
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
      (this.ido = () => {
        var i = new CostMediumItemGrid_1.CostMediumItemGrid();
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
      (this.OWe = (i, t, e) => {
        var t = new RoleSkillTreeAttributeItem_1.RoleSkillTreeAttributeItem(t),
          s = this.Fmo[e],
          h = e < this.Vmo.length ? this.Vmo[e] : void 0;
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
        [4, this.zmo],
        [5, this.Zmo],
        [19, this.Wmo],
        [24, this.pFe],
        [25, this.Xmo],
        [26, this.tdo],
        [29, this.Ymo],
        [30, this.w5t],
      ]);
  }
  async OnBeforeStartAsync() {
    this.Nmo = new RoleSkillInputPanel_1.RoleSkillInputPanel();
    var i = this.GetItem(28).GetOwner();
    await this.Nmo.CreateThenShowByActorAsync(i);
  }
  OnStart() {
    (this.qmo = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(11),
      this.ido,
    )),
      (this.Gmo = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(8),
        this.OWe,
      )),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(21))),
      this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
      this.lqe.SetCurrencyItemVisible(!0),
      (this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(14))),
      this.p9t.SetFunction(this.edo),
      this.GetItem(20).SetUIActive(!1),
      this.SetItemIcon(this.GetTexture(12), ItemDefines_1.EItemId.Gold);
    var i = ModelManager_1.ModelManager.GameModeModel.IsMulti,
      i =
        (this.GetItem(31).SetUIActive(i),
        (this.x5t =
          ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc && i),
        this.x5t ? 1 : 0),
      i = (this.GetExtendToggle(30).SetToggleState(i), this.OpenParam),
      t = i.RoleId,
      i = i.SkillNodeId;
    (this.kmo = 1), this.Update(t, i), this.odo(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateSkillTreeInfoView,
      this.Hmo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateSkillTreeInfoView,
      this.Hmo,
    );
  }
  Update(i, t) {
    (this.dFe = i),
      (this.Mmo = t),
      (this.bmo =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
          this.Mmo,
        ));
    let e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i);
    (e = e || ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i)),
      (this.Bmo = e.GetSkillData()),
      this.Nmo?.RefreshUi(e),
      this.Refresh(),
      e.IsTrialRole() && this.rdo();
  }
  Refresh() {
    if (!this.InAsyncLoading())
      switch (
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(this.Mmo)
          .NodeType
      ) {
        case 4:
          this.ndo();
          break;
        case 3:
          this.sdo();
          break;
        case 2:
          this.ado();
          break;
        case 1:
          this.hdo();
      }
  }
  rdo() {
    this.GetItem(22).SetUIActive(!1),
      this.GetItem(17).SetUIActive(!1),
      this.GetItem(15).SetUIActive(!1),
      this.p9t.SetActive(!1),
      this.GetExtendToggle(19).RootUIComp.SetUIActive(!1),
      this.lqe.SetCurrencyItemVisible(!1);
  }
  ndo() {
    (this.vmo = !0),
      (this.kmo = 1),
      this.GetText(3).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetExtendToggle(19).RootUIComp.SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "SkillType_AttributeNode_TypeName",
      );
    var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(
      this.Mmo,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), i.PropertyNodeTitle),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(10),
        i.PropertyNodeDescribe,
        ...i.PropertyNodeParam,
      ),
      this.ldo(),
      this._do();
  }
  sdo() {
    (this.vmo = !1),
      (this.kmo = 1),
      this.GetText(3).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetExtendToggle(19).RootUIComp.SetUIActive(!1),
      this.Jlo(),
      this.ldo(),
      this._do();
  }
  hdo() {
    (this.vmo = !1), this.udo(), this._do();
  }
  ado() {
    (this.vmo = !1), this.udo(), this._do();
  }
  udo() {
    this.GetText(3).SetUIActive(!0), this.GetItem(6).SetUIActive(!0);
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(
        this.dFe,
        this.Mmo,
      ),
      t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(
        this.bmo.SkillId,
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
      this.Jlo(),
      this.cdo();
  }
  Jlo() {
    var i,
      t = this.bmo.SkillId;
    t &&
      0 < t &&
      ((t =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t)),
      (i =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(
          t.SkillType,
        )) && this.GetText(2).SetText(i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.SkillName),
      this.x5t
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
  _do() {
    var i = this.bmo.SkillId;
    let t = void 0;
    t =
      i && 0 < i
        ? ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(i)
            ?.Icon
        : this.bmo.PropertyNodeIcon;
    var i = this.GetTexture(1),
      e = this.GetSprite(0);
    this.vmo
      ? (i.SetUIActive(!0), e.SetUIActive(!1), this.SetTextureByPath(t, i))
      : (i.SetUIActive(!1), e.SetUIActive(!0), this.SetSpriteByPath(t, e, !1));
  }
  Pke(t = 1) {
    t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(
      this.Mmo,
      t,
    );
    if (t && 0 !== t.size) {
      this.GetItem(22).SetUIActive(!0), this.GetItem(23).SetUIActive(!0);
      var e,
        s,
        h,
        r = [];
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
      var t = this.GetText(13),
        o =
          (t.SetText(i.toString()),
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            ItemDefines_1.EItemId.Gold,
          ));
      (t.useChangeColor = o < i), this.qmo.RefreshByData(r);
    } else this.GetItem(22).SetUIActive(!1), this.GetItem(23).SetUIActive(!1);
  }
  ldo() {
    var i = this.Bmo.GetSkillTreeNodeState(this.bmo, this.dFe);
    this.p9t.SetActive(2 === i),
      this.GetItem(22).SetUIActive(2 === i),
      this.GetItem(23).SetUIActive(2 === i),
      this.GetItem(17).SetUIActive(1 === i),
      this.GetItem(15).SetUIActive(3 === i),
      3 === i
        ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "Actived")
        : (this.Pke(),
          2 === i
            ? this.p9t.SetLocalText("RoleResonActive")
            : 1 === i &&
              ((i = this.Bmo.GetUnlockConditionTextId(this.bmo)),
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), i)),
          (i = this.Bmo.GetSkillTreeUnsatisfiedCondition(this.bmo)),
          this.GetButton(26).RootUIComp.SetUIActive(!(2 === i?.ConditionType)));
  }
  cdo() {
    var i,
      t = this.Bmo.GetSkillTreeNodeState(this.bmo, this.dFe);
    this.p9t.SetActive(2 === t),
      this.GetItem(22).SetUIActive(3 !== t),
      this.GetItem(23).SetUIActive(3 !== t),
      this.GetItem(17).SetUIActive(1 === t),
      this.GetItem(15).SetUIActive(3 === t),
      this.GetExtendToggle(19).RootUIComp.SetUIActive(!0),
      this.mdo(),
      3 === t
        ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(16), "RoleAlreadyMax")
        : ((i = this.Bmo.GetSkillNodeLevel(this.bmo)),
          this.Pke(i + 1),
          2 === t
            ? this.p9t.SetLocalText("RoleLevelUp")
            : 1 === t &&
              ((i = this.Bmo.GetUnlockConditionTextId(this.bmo)),
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), i)),
          (t = this.Bmo.GetSkillTreeUnsatisfiedCondition(this.bmo)),
          this.GetButton(26).RootUIComp.SetUIActive(!(2 === t?.ConditionType)));
  }
  ddo(i) {
    var t = new CommonAttributeData_1.CommonAttributeData(),
      e =
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
  mdo() {
    (this.Fmo.length = 0), (this.Vmo.length = 0);
    var t =
        ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetSkillEffect()
          .EffectDescList,
      e = void 0 !== t ? t.length : 0,
      s =
        ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetNextLevelSkillEffect()
          ?.EffectDescList;
    for (let i = 0; i < e; i++)
      this.Fmo.push(this.ddo(t[i])), s && this.Vmo.push(this.ddo(s[i]));
    this.Gmo.RefreshByData(this.Fmo);
  }
  jmo(i) {
    1 === i ? this.odo() : this.Cdo();
  }
  odo(i = 0) {
    this.GetExtendToggle(4).SetToggleState(1),
      this.GetExtendToggle(5).SetToggleState(0),
      this.GetItem(7).SetUIActive(!0),
      this.GetScrollViewWithScrollbar(8).GetRootComponent().SetUIActive(!1),
      this.$mo(),
      this.Kmo(this.kmo, this.Omo);
  }
  Cdo() {
    this.GetExtendToggle(4).SetToggleState(0),
      this.GetExtendToggle(5).SetToggleState(1),
      this.GetItem(7).SetUIActive(!1),
      this.GetScrollViewWithScrollbar(8).GetRootComponent().SetUIActive(!0),
      this.Jmo(),
      this.Kmo(this.kmo, this.Omo);
  }
  Kmo(i, t) {
    2 === this.kmo
      ? t
        ? this.gdo()
        : this.$mo()
      : t
        ? this.fdo()
        : this.Jmo();
  }
  fdo() {
    this.GetItem(27).SetUIActive(!0);
  }
  Jmo() {
    this.GetItem(27).SetUIActive(!1);
  }
  gdo() {
    this.GetItem(20).SetUIActive(!0);
    for (const i of this.Gmo.GetScrollItemList()) i.SetNextLevelItem(!0);
  }
  $mo() {
    this.GetItem(20).SetUIActive(!1);
    for (const i of this.Gmo.GetScrollItemList()) i.SetNextLevelItem(!1);
  }
  Qmo(i) {
    i
      ? (this.UiViewSequence.StopSequenceByKey("ViewShow"),
        this.UiViewSequence.PlaySequence("ViewShow"))
      : (this.UiViewSequence.StopSequenceByKey("ViewHide"),
        this.UiViewSequence.PlaySequence("ViewHide"));
  }
}
exports.RoleSkillTreeInfoView = RoleSkillTreeInfoView;
//# sourceMappingURL=RoleSkillTreeInfoView.js.map
