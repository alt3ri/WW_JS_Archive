"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsVisionComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem"),
  GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ItemTipsAttribute_1 = require("./ItemTipsAttribute"),
  ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent"),
  ItemTipsGetWay_1 = require("./ItemTipsGetWay"),
  ItemTipsLockButton_1 = require("./ItemTipsLockButton");
class TipsVisionComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(t) {
    super(t),
      (this.Pe = void 0),
      (this.wxt = void 0),
      (this.Bxt = void 0),
      (this.eGe = void 0),
      (this.Axt = void 0),
      (this.bxt = void 0),
      (this.qxt = (t, i, e) => {
        const s = new VisionDetailDescItem(i);
        return (
          s.Init().finally(() => {
            s.Update(t), s.SetActive(!0);
          }),
          { Key: e, Value: s }
        );
      }),
      (this.mvt = (t, i, e) => {
        return {
          Key: e,
          Value: new ItemTipsAttribute_1.TipsAttributeItem(i, t),
        };
      }),
      this.CreateThenShowByResourceIdAsync("UiItem_TipsVision", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UITexture],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIVerticalLayout],
    ];
  }
  async OnBeforeStartAsync() {
    (this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(11),
    )),
      await this.bxt.Init();
  }
  OnStart() {
    var t = this.GetItem(2),
      t =
        ((this.wxt = new ItemTipsLockButton_1.TipsLockButton(t)),
        (this.Bxt = new GenericLayoutNew_1.GenericLayoutNew(
          this.GetVerticalLayout(3),
          this.mvt,
        )),
        (this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
          this.GetVerticalLayout(12),
          this.qxt,
        )),
        this.GetItem(5));
    this.Axt = new ItemTipsGetWay_1.TipsGetWayPanel(t);
  }
  OnBeforeDestroy() {
    this.Pe &&
      ((this.Pe = void 0),
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(void 0));
  }
  Refresh(t) {
    var i = () => {
      var t = this.Pe,
        i =
          (this.GetText(0).SetText(t.Cost.toString()),
          this.GetText(1).SetUIActive(void 0 !== t.UpgradeLevel),
          this.GetText(1).SetText(t.UpgradeLevel),
          t.IncId &&
            (this.wxt.Refresh(t.IncId, t.CanClickLockButton),
            this.wxt.SetDeprecateToggleVisible(t.CanDeprecate())),
          this.wxt?.SetUiActive(0 < t.IncId),
          this.Bxt.RebuildLayoutByDataNew(t.AttributeData),
          t.VisionDetailInfoComponentData.DataBase);
      i && 0 < i.GetFetterGroupId()
        ? (this.bxt.Update(i.GetFetterGroupConfig()), this.bxt.SetUiActive(!0))
        : this.bxt.SetUiActive(!1),
        this.Gxt(t.VisionDetailInfoComponentData),
        this.Pxt(t.GetWayData),
        this.xxt(t.LimitTimeTxt),
        this.Nxt(t);
    };
    (this.Pe = t),
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(t),
      this.InAsyncLoading() ? this.OperationMap.set("Refresh", i) : i();
  }
  Gxt(t) {
    this.eGe.RebuildLayoutByDataNew(t.DescData);
  }
  Pxt(t) {
    this.GetItem(5).SetUIActive(void 0 !== t && 0 < t.length),
      t && this.Axt.Refresh(t);
  }
  xxt(t) {
    this.GetItem(6).SetUIActive(void 0 !== t),
      t && this.GetText(7).ShowTextNew(t);
  }
  Nxt(t) {
    var i = t.EquippedId,
      e = t.IsEquip;
    let s = void 0;
    i && !(s = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i))
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ItemHint",
            27,
            "找不到装备角色但是认为被装备中",
            ["roleId", i],
            ["visionId", t.IncId],
            ["visionConfigId", t.ConfigId],
          ),
        this.GetItem(8).SetUIActive(!1))
      : (this.GetItem(8).SetUIActive(e),
        s &&
          ((i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(
            s.GetRoleSkinId(),
          )),
          e) &&
          i &&
          (this.SetRoleSkinIcon(
            i.GetRoleSkinConfig().RoleHeadIcon,
            this.GetTexture(9),
            i.GetItemId(),
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(10),
            "VisionEquipping",
            s.GetName(),
          )));
  }
  SetLockButtonShow(t) {
    var i = () => {
      this.GetItem(2).SetUIActive(t);
    };
    this.InAsyncLoading() ? this.OperationMap.set("SetLockButtonShow", i) : i();
  }
}
exports.TipsVisionComponent = TipsVisionComponent;
class VisionDetailDescItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.wqe = void 0),
      (this.Data = void 0),
      (this.bxt = void 0),
      (this.wqe = t);
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(10),
    )),
      await this.bxt.Init(),
      this.bxt.SetActive(!0);
  }
  Update(t) {
    (this.Data = t),
      this.mGe(t),
      this.Dke(t),
      this.Oxt(t),
      this.kxt(t),
      this.Fxt(t),
      this.Vxt(t),
      this.Hxt(t);
  }
  mGe(t) {
    this.GetText(0).SetText(t.Title);
  }
  Dke(t) {
    var i,
      e,
      s = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(1);
    0 < t.FetterId
      ? ((i =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
            t.FetterId,
          )),
        (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name)),
        this.GetText(2).SetText(e ?? ""),
        s
          ? StringUtils_1.StringUtils.IsEmpty(i.SimplyEffectDesc)
            ? this.GetText(3).SetText("")
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(3),
                i.SimplyEffectDesc,
              )
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(3),
              i.EffectDescription,
              ...i.EffectDescriptionParam,
            ),
        this.GetItem(12).SetUIActive(!0),
        this.GetText(2).SetUIActive(!0),
        this.GetText(3).SetUIActive(!0))
      : t.SkillConfig &&
        (s
          ? StringUtils_1.StringUtils.IsEmpty(t.SkillConfig.SimplyDescription)
            ? this.GetText(3).SetText("")
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(3),
                t.SkillConfig.SimplyDescription,
              )
          : ((e =
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(
                t.SkillConfig.Id,
                t.Quality,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(3),
              t.SkillConfig.DescriptionEx,
              ...e,
            )),
        this.GetItem(12).SetUIActive(!1),
        this.GetText(2).SetUIActive(!1),
        this.GetText(3).SetUIActive(!0));
  }
  Hxt(t) {
    0 < t.FetterId
      ? (this.GetItem(9).SetUIActive(!0),
        (t =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
            t.FetterGroupId,
          )),
        this.bxt.Update(t),
        this.GetText(11).SetText(""))
      : this.GetItem(9).SetUIActive(!1);
  }
  Oxt(t) {
    this.GetItem(4).SetUIActive(t.EmptyState);
  }
  Fxt(t) {
    this.GetText(6).SetText(t.EmptyText);
  }
  Vxt(t) {
    var i = !StringUtils_1.StringUtils.IsEmpty(t.EmptyContentText);
    this.GetItem(7).SetUIActive(i), this.GetText(8).SetText(t.EmptyContentText);
  }
  kxt(t) {
    this.GetItem(5).SetUIActive(t.TitleItemShowState);
  }
}
//# sourceMappingURL=ItemTipsVisionComponent.js.map
