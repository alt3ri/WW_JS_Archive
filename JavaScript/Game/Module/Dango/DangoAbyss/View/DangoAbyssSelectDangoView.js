"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssSelectDangoView = exports.DangoSelectViewData = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  AbyssDangoItem_1 = require("./AbyssDangoItem"),
  DangoAbyssRootView_1 = require("./DangoAbyssRootView");
class DangoSelectViewData {
  constructor() {
    (this.Index = 0),
      (this.RoleConfigId = 0),
      (this.CurrentSelectDangoId = 0),
      (this.GroupIndex = 0);
  }
}
exports.DangoSelectViewData = DangoSelectViewData;
class DangoAbyssSelectDangoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.oRc = 0),
      (this.rLc = 0),
      (this.vVt = void 0),
      (this.oLc = void 0),
      (this.nLc = void 0),
      (this.sLc = void 0),
      (this.aLc = void 0),
      (this.hLc = void 0),
      (this.Qgc = void 0),
      (this.sGe = () => {
        return new AbyssDangoItem_1.AbyssDangoItem();
      }),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.iLc = (e) => {
        (this.rLc = e.DangoId),
          0 < this.rLc &&
            (ModelManager_1.ModelManager.DangoAbyssModel.SetDangoFormationIfNew(
              this.rLc,
              !1,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshAbyssDangoRedDot,
              this.rLc,
            )),
          this.lLc(),
          this.nOe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.AMo]]);
  }
  async OnBeforeStartAsync() {
    this.vVt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(1),
      this.GetItem(2).GetOwner(),
      this.sGe,
    );
    var e = [];
    (this.oLc = new RoleInfoPanel()),
      e.push(this.oLc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())),
      (this.nLc = new BuffPanel()),
      e.push(this.nLc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())),
      (this.sLc = new SkillPanel()),
      e.push(this.sLc.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())),
      (this.aLc = new SkillPanel()),
      e.push(this.aLc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())),
      (this.aLc.SkillType = 1),
      (this.hLc = new ButtonItem_1.ButtonItem()),
      e.push(this.hLc.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())),
      this.hLc.SetFunction(() => {
        var e,
          t =
            ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData();
        t &&
          (((e = new DangoAbyssRootView_1.DangoRootViewData()).ActivityId =
            t.Id),
          (e.DangoId = this.rLc),
          UiManager_1.UiManager.OpenView("DangoAbyssRootView", e));
      }),
      (this.Qgc = new ButtonItem_1.ButtonItem()),
      e.push(this.Qgc.CreateThenShowByActorAsync(this.GetItem(10).GetOwner())),
      this.Qgc.SetFunction(() => {
        if (0 < this.rLc) {
          if (
            ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
              this.rLc,
            )?.GetIfLock()
          )
            return;
          var e = ModelManager_1.ModelManager.DangoAbyssModel.CacheDangoSelect(
            ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
            this.oRc,
            this.rLc,
          );
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAbyssDangoSelect,
            e,
          );
        }
        this.CloseMe();
      }),
      await Promise.all(e);
  }
  OnStart() {
    var e = this.OpenParam;
    (this.oRc = e.RoleConfigId),
      (this.rLc = e.CurrentSelectDangoId),
      0 < this.rLc &&
        (ModelManager_1.ModelManager.DangoAbyssModel.SetDangoFormationIfNew(
          this.rLc,
          !1,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshAbyssDangoRedDot,
          this.rLc,
        ));
  }
  OnBeforeShow() {
    this.lLc(), this.nOe();
  }
  W11(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable();
    this.hLc?.SetActive(
      void 0 !== e && t && !ModelManager_1.ModelManager.GameModeModel.IsMulti,
    );
  }
  P7e(e) {
    this.Qgc?.SetActive(void 0 !== e);
  }
  Q11(e) {
    e
      ? ((e = e.GetIfLock()), this.GetItem(8)?.SetUIActive(e))
      : this.GetItem(8)?.SetUIActive(!1);
  }
  lLc() {
    var e = [];
    for (const i of ModelManager_1.ModelManager.DangoAbyssModel.GetAllDangoList()) {
      var t = new AbyssDangoItem_1.AbyssDangoItemData();
      (t.DangoId = i.GetId()),
        (t.PlayerId = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
        (t.RoleId =
          ModelManager_1.ModelManager.DangoAbyssModel.GetDangoBelongRoleId(
            ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
            i.GetId(),
          )),
        (t.SelectState = i.GetId() === this.rLc),
        (t.OnSelectCallBack = this.iLc),
        e.push(t);
    }
    this.vVt.RefreshByData(e);
  }
  nOe() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
      this.rLc,
    );
    this.U5t(e),
      this.tst(e),
      this._Lc(e),
      this.cLc(e),
      this.Q11(e),
      this.W11(e),
      this.P7e(e);
  }
  U5t(e) {
    e
      ? (this.oLc?.SetActive(!0), this.oLc?.Refresh(e))
      : this.oLc?.SetActive(!1);
  }
  tst(e) {
    var t;
    e
      ? ((t = e.GetId()),
        (t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoTagData(t, 1)),
        this.nLc?.SetActive(0 < t.length),
        this.nLc?.Refresh(e))
      : this.nLc?.SetActive(!1);
  }
  _Lc(e) {
    e
      ? (this.sLc?.SetActive(!0), this.sLc?.Refresh(e))
      : this.sLc?.SetActive(!1);
  }
  cLc(e) {
    e ? this.aLc?.Refresh(e) : this.aLc?.SetActive(!1);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return 2 === e.length &&
      void 0 !== (e = Number(e[1])) &&
      !isNaN(e) &&
      (e = this.vVt?.GetGridByDisplayIndex(e))
      ? [e, e]
      : void 0;
  }
}
exports.DangoAbyssSelectDangoView = DangoAbyssSelectDangoView;
class RoleInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.eGe = void 0),
      (this.mvt = () => {
        return new AttributeItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIMultiTemplateLayout],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(
      this.GetMultiTemplateLayout(1),
      this.mvt,
      this.GetItem(2).GetOwner(),
    );
  }
  Refresh(e) {
    var t = e.GetName();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t), this.fvt(e);
  }
  fvt(e) {
    var t = new AttributeItemData();
    (t.DangoRoleData = e), this.eGe?.RefreshByData([t]);
  }
}
class BuffPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.Ogc = void 0),
      (this.ije = () => {
        var e =
          ModelManager_1.ModelManager.DangoAbyssModel.GetDangoShowAttributeList(
            this.$8i.GetId(),
          );
        UiManager_1.UiManager.OpenView("DangoAbyssAttributeDetailView", e);
      }),
      (this.qgc = () => {
        return new DangoAbyssTagItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIMultiTemplateLayout],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.ije]]);
  }
  OnStart() {
    this.Ogc = new GenericLayout_1.GenericLayout(
      this.GetMultiTemplateLayout(1),
      this.qgc,
      this.GetItem(2).GetOwner(),
    );
  }
  Refresh(e) {
    (this.$8i = e), this.qSo(e);
  }
  qSo(e) {
    (e = e.GetId()),
      (e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoTagData(e, 1));
    e.sort((e, t) => t.Value - e.Value), this.Ogc?.RefreshByData(e);
  }
}
class SkillPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.SkillType = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  Refresh(t) {
    if (0 === this.SkillType) {
      var i = t.GetSkillDesc(),
        e = t.GetSkillDescAddition();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i, ...e),
        this.SetActive(!0);
    } else {
      i = t.GetEffectPassiveSkillDescList();
      let e = "";
      for (const r of i) {
        var s = r;
        e += s + "\n";
      }
      this.GetText(2)?.SetText(e), this.SetActive(0 < i.length);
    }
  }
}
class AttributeItemData {
  constructor() {
    this.DangoRoleData = void 0;
  }
}
class AttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  Refresh(e, t, i) {
    var s;
    e.DangoRoleData &&
      ((s = (e = e.DangoRoleData).GetSkillCastTypeName()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s),
      (s = e.GetSkillCastTypeIconPath()),
      this.SetTextureByPath(s, this.GetTexture(2)));
  }
}
class DangoAbyssTagItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
    ];
  }
  Refresh(e, t, i) {
    var s =
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(
        e.TagId,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.Name),
      this.Hgc(s.BgColor),
      this.Iwn(e),
      this.Yy1(e);
  }
  Iwn(e) {
    var t =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(
          e.TagId,
        ).AddType,
      e =
        ModelManager_1.ModelManager.DangoAbyssModel.GetFormatAttributeValueByAddType(
          e.Value,
          t,
        );
    this.GetText(2).SetText(e), this.GetText(2).SetUIActive(!0);
  }
  Hgc(e) {
    e = UE.Color.FromHex(e);
    this.GetSprite(0).SetColor(e);
  }
  Yy1(e) {
    this.GetItem(3).SetUIActive(!0);
  }
}
//# sourceMappingURL=DangoAbyssSelectDangoView.js.map
