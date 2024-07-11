"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponDetailTipsComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  AttributeItem_1 = require("../Common/AttributeItem"),
  ButtonItem_1 = require("../Common/Button/ButtonItem"),
  CommonEquippedItem_1 = require("../Common/CommonEquippedItem"),
  StarItem_1 = require("../RoleUi/View/StarItem"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  WeaponInstance_1 = require("./WeaponInstance"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
class WeaponDetailTipsComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.WeaponData = void 0),
      (this.ReplaceButtonItem = void 0),
      (this.CultureButtonItem = void 0),
      (this.CanShowEquip = !1),
      (this.yOo = void 0),
      (this.CanShowLock = !0),
      (this.StarLayout = void 0),
      (this.AttributeLayout = void 0),
      (this.IOo = (t) => {
        var t = 1 !== t,
          e = this.GetWeaponIncId();
        e <= 0 ||
          ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(
            e,
            t,
          );
      }),
      (this.sAt = () => {
        return new StarItem_1.StarItem();
      }),
      (this.Flo = () => new AttributeItem_1.AttributeItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIExtendToggle],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIVerticalLayout],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.IOo]]);
  }
  OnStart() {
    (this.ReplaceButtonItem = new ButtonItem_1.ButtonItem(this.GetItem(11))),
      (this.CultureButtonItem = new ButtonItem_1.ButtonItem(this.GetItem(12))),
      (this.StarLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(4),
        this.sAt,
      )),
      (this.AttributeLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(5),
        this.Flo,
      )),
      (this.yOo = new CommonEquippedItem_1.CommonEquippedItem()),
      this.yOo.CreateThenShowByActor(this.GetItem(10).GetOwner());
  }
  SetCanShowEquip(t = !1) {
    (this.CanShowEquip = t),
      this.CanShowEquip || this.yOo?.SetIconRootItemState(!1);
  }
  SetCanShowLock(t) {
    this.CanShowLock = t;
  }
  jlo(t) {
    var t = [
        { PropId: t.FirstPropId, CurveId: t.FirstCurve },
        { PropId: t.SecondPropId, CurveId: t.SecondCurve },
      ],
      e = this.WeaponData.GetLevel(),
      i = this.WeaponData.GetBreachLevel(),
      o = [];
    for (const a of t) {
      var n = a.PropId,
        s = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
          a.CurveId,
          n.Value,
          e,
          i,
        ),
        n = { Id: n.Id, IsRatio: n.IsRatio, CurValue: s, BgActive: !0 };
      o.push(n);
    }
    this.AttributeLayout.RefreshByData(o);
  }
  kPt(e, i) {
    var o = new Array(i);
    for (let t = 0; t < i; ++t) {
      var n = {
        StarOnActive: t < e,
        StarOffActive: t >= e,
        StarNextActive: !1,
        StarLoopActive: !1,
        PlayLoopSequence: !1,
        PlayActivateSequence: !1,
      };
      o[t] = n;
    }
    this.StarLayout.RefreshByData(o);
  }
  vjt(t) {
    for (const e of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList())
      if (t === e.Value) {
        this.SetSpriteByPath(e.Icon, this.GetSprite(0), !1);
        break;
      }
  }
  UpdateComponent(t) {
    var e = (this.WeaponData = t).GetWeaponConfig(),
      i = t.GetLevel(),
      o = t.GetBreachLevel(),
      n = e.WeaponName,
      s = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(
        e.BreachId,
      ),
      a = t.GetBreachConfig(),
      r = t.GetResonanceLevel(),
      i =
        (LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(2),
          "LevelRichText",
          i,
          a.LevelLimit,
        ),
        ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e.QualityId)),
      a = UE.Color.FromHex(i.DropColor),
      i =
        (this.GetText(1).SetColor(a),
        this.GetText(1).ShowTextNew(n),
        this.vjt(e.WeaponType),
        this.jlo(e),
        this.kPt(o, s),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(6),
          "WeaponResonanceItemLevelText",
          r,
        ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.BgDescription),
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
          e.ResonId,
          r,
        )),
      n =
        (i
          ? (this.GetText(7).SetUIActive(!0),
            this.GetText(8).SetUIActive(!0),
            this.GetText(7).SetText(
              ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(
                i.Name,
              ),
            ),
            (a =
              ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
                e,
                r,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.Desc, ...a))
          : (this.GetText(7).SetUIActive(!1), this.GetText(8).SetUIActive(!1)),
        t);
    n instanceof WeaponInstance_1.WeaponInstance
      ? (this.TOo(!0),
        this.LOo(!0),
        (o = n.GetIncId()),
        this.ReplaceButtonItem.SetData(o),
        this.CultureButtonItem.SetData(o),
        this.UpdateWeaponLock(n.IsLock()))
      : (this.TOo(!1), this.LOo(!1));
  }
  UpdateWeaponLock(t) {
    t = t ? 0 : 1;
    this.GetExtendToggle(3).SetToggleState(t, !1);
  }
  SetReplaceFunction(t) {
    this.ReplaceButtonItem.SetFunction(t);
  }
  SetReplaceEnableClick(t) {
    this.ReplaceButtonItem.SetEnableClick(t);
  }
  SetCultureFunction(t) {
    this.CultureButtonItem.SetFunction(t);
  }
  UpdateEquip(t) {
    var e;
    this.CanShowEquip &&
      (e = this.WeaponData) instanceof WeaponInstance_1.WeaponInstance &&
      (0 === (e = e.GetRoleId())
        ? (this.yOo.SetCurrentEquippedState(!1),
          this.yOo.SetIconRootItemState(!1),
          this.ReplaceButtonItem.SetEnableClick(!0))
        : (this.ReplaceButtonItem.SetEnableClick(e !== t),
          this.yOo.SetCurrentEquippedState(!0),
          this.yOo.SetIconRootItemState(!0),
          (t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
          this.yOo.SetEquipIcon(t.GetRoleConfig().RoleHeadIcon),
          this.yOo.SetEquipText("WeaponTipsRoleText", t.GetName())));
  }
  GetWeaponIncId() {
    var t = this.WeaponData;
    return t instanceof WeaponInstance_1.WeaponInstance ? t.GetIncId() ?? 0 : 0;
  }
  TOo(t) {
    this.GetExtendToggle(3).RootUIComp.SetUIActive(t && this.CanShowLock);
  }
  LOo(t) {
    this.ReplaceButtonItem.SetActive(t), this.CultureButtonItem.SetActive(t);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length < 1)) {
      var e = this.GetGuideUiItem(t[1]);
      if (e) return [e, e];
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 17, "武器详情界面聚焦引导的额外参数配置错误", [
        "configParams",
        t,
      ]);
  }
}
exports.WeaponDetailTipsComponent = WeaponDetailTipsComponent;
//# sourceMappingURL=WeaponDetailTipsComponent.js.map
