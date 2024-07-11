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
  constructor(i) {
    super(i),
      (this.Pe = void 0),
      (this.wxt = void 0),
      (this.Bxt = void 0),
      (this.eGe = void 0),
      (this.Axt = void 0),
      (this.bxt = void 0),
      (this.qxt = (i, t, e) => {
        const s = new VisionDetailDescItem(t);
        return (
          s.Init().finally(() => {
            s.Update(i), s.SetActive(!0);
          }),
          { Key: e, Value: s }
        );
      }),
      (this.mvt = (i, t, e) => {
        return {
          Key: e,
          Value: new ItemTipsAttribute_1.TipsAttributeItem(t, i),
        };
      }),
      this.CreateThenShowByResourceIdAsync("UiItem_TipsVision", i);
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
    var i = this.GetItem(2),
      i =
        ((this.wxt = new ItemTipsLockButton_1.TipsLockButton(i)),
        (this.Bxt = new GenericLayoutNew_1.GenericLayoutNew(
          this.GetVerticalLayout(3),
          this.mvt,
        )),
        (this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
          this.GetVerticalLayout(12),
          this.qxt,
        )),
        this.GetItem(5));
    this.Axt = new ItemTipsGetWay_1.TipsGetWayPanel(i);
  }
  OnBeforeDestroy() {
    this.Pe &&
      ((this.Pe = void 0),
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(void 0));
  }
  Refresh(i) {
    var t = () => {
      var i = this.Pe;
      this.GetText(0).SetText(i.Cost.toString()),
        this.GetText(1).SetUIActive(void 0 !== i.UpgradeLevel),
        this.GetText(1).SetText(i.UpgradeLevel),
        i.IncId && this.wxt.Refresh(i.IncId, i.CanClickLockButton),
        this.wxt?.SetUiActive(0 < i.IncId),
        this.Bxt.RebuildLayoutByDataNew(i.AttributeData),
        i.VisionDetailInfoComponentData.DataBase &&
          this.bxt.Update(
            i.VisionDetailInfoComponentData.DataBase.GetFetterGroupConfig(),
          ),
        this.bxt.SetUiActive(
          void 0 !== i.VisionDetailInfoComponentData.DataBase,
        ),
        this.Gxt(i.VisionDetailInfoComponentData),
        this.Pxt(i.GetWayData),
        this.xxt(i.LimitTimeTxt),
        this.Nxt(i);
    };
    (this.Pe = i),
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(i),
      this.InAsyncLoading() ? this.OperationMap.set("Refresh", t) : t();
  }
  Gxt(i) {
    this.eGe.RebuildLayoutByDataNew(i.DescData);
  }
  Pxt(i) {
    this.GetItem(5).SetUIActive(void 0 !== i && 0 < i.length),
      i && this.Axt.Refresh(i);
  }
  xxt(i) {
    this.GetItem(6).SetUIActive(void 0 !== i),
      i && this.GetText(7).ShowTextNew(i);
  }
  Nxt(i) {
    var t = i.EquippedId,
      e = i.IsEquip;
    let s = void 0;
    t && !(s = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t))
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ItemHint",
            28,
            "找不到装备角色但是认为被装备中",
            ["roleId", t],
            ["visionId", i.IncId],
            ["visionConfigId", i.ConfigId],
          ),
        this.GetItem(8).SetUIActive(!1))
      : (this.GetItem(8).SetUIActive(e),
        e &&
          s &&
          t &&
          (this.SetRoleIcon(
            s.GetRoleConfig().RoleHeadIcon,
            this.GetTexture(9),
            t,
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(10),
            "VisionEquipping",
            s.GetName(),
          )));
  }
  SetLockButtonShow(i) {
    var t = () => {
      this.GetItem(2).SetUIActive(i);
    };
    this.InAsyncLoading() ? this.OperationMap.set("SetLockButtonShow", t) : t();
  }
}
exports.TipsVisionComponent = TipsVisionComponent;
class VisionDetailDescItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(),
      (this.wqe = void 0),
      (this.Data = void 0),
      (this.bxt = void 0),
      (this.wqe = i);
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
  Update(i) {
    (this.Data = i),
      this.mGe(i),
      this.Dke(i),
      this.Oxt(i),
      this.kxt(i),
      this.Fxt(i),
      this.Vxt(i),
      this.Hxt(i);
  }
  mGe(i) {
    this.GetText(0).SetText(i.Title);
  }
  Dke(i) {
    var t,
      e,
      s = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(1);
    0 < i.FetterId
      ? ((t =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
            i.FetterId,
          )),
        (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name)),
        this.GetText(2).SetText(e ?? ""),
        s
          ? StringUtils_1.StringUtils.IsEmpty(t.SimplyEffectDesc)
            ? this.GetText(3).SetText("")
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(3),
                t.SimplyEffectDesc,
              )
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(3),
              t.EffectDescription,
              ...t.EffectDescriptionParam,
            ),
        this.GetItem(12).SetUIActive(!0),
        this.GetText(2).SetUIActive(!0),
        this.GetText(3).SetUIActive(!0))
      : i.SkillConfig &&
        (s
          ? StringUtils_1.StringUtils.IsEmpty(i.SkillConfig.SimplyDescription)
            ? this.GetText(3).SetText("")
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(3),
                i.SkillConfig.SimplyDescription,
              )
          : ((e =
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(
                i.SkillConfig.Id,
                i.Quality,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(3),
              i.SkillConfig.DescriptionEx,
              ...e,
            )),
        this.GetItem(12).SetUIActive(!1),
        this.GetText(2).SetUIActive(!1),
        this.GetText(3).SetUIActive(!0));
  }
  Hxt(i) {
    0 < i.FetterId
      ? (this.GetItem(9).SetUIActive(!0),
        (i =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
            i.FetterGroupId,
          )),
        this.bxt.Update(i),
        this.GetText(11).SetText(""))
      : this.GetItem(9).SetUIActive(!1);
  }
  Oxt(i) {
    this.GetItem(4).SetUIActive(i.EmptyState);
  }
  Fxt(i) {
    this.GetText(6).SetText(i.EmptyText);
  }
  Vxt(i) {
    var t = !StringUtils_1.StringUtils.IsEmpty(i.EmptyContentText);
    this.GetItem(7).SetUIActive(t), this.GetText(8).SetText(i.EmptyContentText);
  }
  kxt(i) {
    this.GetItem(5).SetUIActive(i.TitleItemShowState);
  }
}
//# sourceMappingURL=ItemTipsVisionComponent.js.map
