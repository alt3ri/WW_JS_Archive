"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssRoleInfoItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  InActiveRedItem_1 = require("../../../Common/InActiveRedItem"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DangoAbyssDefine_1 = require("../DangoAbyssDefine"),
  DangoAbyssPluginItem_1 = require("./DangoAbyssPluginItem"),
  DangoAbyssRoleAttributeItem_1 = require("./DangoAbyssRoleAttributeItem"),
  DangoAbyssTagItem_1 = require("./DangoAbyssTagItem");
class DangoAbyssRoleInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Agc = 0),
      (this.ViewModel = void 0),
      (this.gmc = void 0),
      (this.ygc = void 0),
      (this.$a_ = void 0),
      (this.Mko = void 0),
      (this.ugc = void 0),
      (this.AOe = (t) => {
        0 === t && this.wGc();
      }),
      (this.Pgc = () => {
        (this.Agc = 1), this.RefreshView();
      }),
      (this.wgc = () => {
        (this.Agc = 0), this.RefreshView();
      }),
      (this.DGc = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Activity", 75, "点击升级按钮");
        var t = this.ViewModel.GetDangoId();
        UiManager_1.UiManager.OpenView("DangoAbyssLevelUpView", t);
      }),
      (this.OS1 = () => {
        this.ViewModel.SetSlotIndex(1),
          UiManager_1.UiManager.OpenView(
            "DangoAbyssPluginEquipView",
            this.ViewModel,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UIExtendToggle],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [1, this.wgc],
        [2, this.Pgc],
      ]);
  }
  OnAfterDestroy() {
    this.ViewModel.UnBind(this.AOe);
  }
  async OnBeforeStartAsync() {
    this.GetItem(5).SetUIActive(!1);
    var t = [];
    (this.gmc = new AttributePanel()),
      (this.gmc.ViewModel = this.ViewModel),
      t.push(this.gmc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())),
      (this.ygc = new PluginPanel()),
      (this.ygc.ViewModel = this.ViewModel),
      t.push(this.ygc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())),
      (this.$a_ = new ButtonItem_1.ButtonItem()),
      t.push(this.$a_.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())),
      this.$a_.SetFunction(this.DGc),
      (this.Mko = new ButtonItem_1.ButtonItem()),
      t.push(this.Mko.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())),
      this.Mko.SetFunction(this.OS1),
      (this.ugc = new InActiveRedItem_1.InActiveRedItem()),
      t.push(this.ugc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())),
      await Promise.all(t);
  }
  OnBeforeShow() {
    this.ViewModel.Bind(this.AOe), this.RefreshView();
  }
  xgc() {
    var t = 0 === this.Agc ? 1 : 0,
      t = (this.GetExtendToggle(1).SetToggleState(t), 1 === this.Agc),
      t = t ? 1 : 0;
    this.GetExtendToggle(2).SetToggleState(t);
  }
  OnDangoInfoUpdate() {
    this.RefreshView();
  }
  wGc() {
    0 !== this.ViewModel.GetDangoId() && this.RefreshView();
  }
  RefreshView() {
    var t = this.ViewModel.GetDangoId(),
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t);
    this.P5e(t), this.Sil(t), this.Cgc(t), this.vgc(t), this.xgc(), this.Ugc();
  }
  P5e(t) {
    t &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.GetName()),
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(
        this.GetText(9),
        DangoAbyssDefine_1.TEXT_DANGO_LEVEL,
        t.GetLevel().toString(),
        t.GetMaxLevel().toString(),
      ),
      this.GetText(9).SetUIActive(!t.GetIfLock()));
  }
  Ugc() {
    switch (this.Agc) {
      case 0:
        this.Dgc();
        break;
      case 1:
        this.Bgc();
    }
  }
  Dgc() {
    this.GetItem(4).SetUIActive(!0),
      this.GetItem(3).SetUIActive(!1),
      this.ygc.Refresh();
  }
  Bgc() {
    this.GetItem(4).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!0),
      this.gmc.Refresh();
  }
  Sil(t) {
    t
      ? ((t = t.GetIfLock()),
        this.Mko.SetActive(!t),
        this.Mko?.SetRedDotVisible(!1))
      : this.Mko?.SetActive(!1);
  }
  Cgc(t) {
    var e;
    t
      ? ((e = t.GetConfig()),
        (t = t.GetIfLock()),
        this.ugc?.SetActive(t),
        this.ugc?.SetDetailButtonVisible(!1),
        this.ugc?.SetText(e.UnlockDesc))
      : this.ugc?.SetActive(!1);
  }
  vgc(t) {
    var e, i;
    t
      ? ((e = t.GetIfCanLevelUp()),
        (i = t.GetIfLock()),
        this.$a_?.SetActive(!i),
        (i =
          ModelManager_1.ModelManager.DangoAbyssModel.GetDangoLevelUpRedDotById(
            t.GetId(),
            !1,
          )),
        this.$a_?.SetRedDotVisible(e && i))
      : this.$a_?.SetActive(!1);
  }
}
exports.DangoAbyssRoleInfoItem = DangoAbyssRoleInfoItem;
class AttributePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.CurrentData = void 0),
      (this.kgc = void 0),
      (this.Ogc = void 0),
      (this.ViewModel = void 0),
      (this.AOe = (t) => {
        0 === t && this.wGc();
      }),
      (this.qgc = () => {
        return new DangoAbyssTagItem_1.DangoAbyssTagItem();
      }),
      (this.Bqe = () => {
        return new DangoAbyssRoleAttributeItem_1.DangoAbyssRoleAttributeItem();
      }),
      (this.Ggc = () => {
        var t = this.ViewModel.GetDangoId(),
          t =
            ModelManager_1.ModelManager.DangoAbyssModel.GetDangoShowAttributeList(
              t,
            );
        UiManager_1.UiManager.OpenView("DangoAbyssAttributeDetailView", t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.Ggc]]);
  }
  OnBeforeCreate() {
    this.ViewModel.Bind(this.AOe);
  }
  OnAfterDestroy() {
    this.ViewModel.UnBind(this.AOe);
  }
  OnStart() {
    (this.kgc = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.Bqe,
      this.GetItem(1).GetOwner(),
    )),
      (this.Ogc = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(3),
        this.qgc,
        this.GetItem(4).GetOwner(),
      ));
  }
  Refresh() {
    var t = this.ViewModel.GetDangoId(),
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t);
    e &&
      ((this.CurrentData = e),
      (e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoTagData(t, 1)),
      this.Ogc.RefreshByData(e),
      (e =
        ModelManager_1.ModelManager.DangoAbyssModel.GetDangoShowAttributeList(
          t,
        )),
      this.kgc.RefreshByData(
        e.slice(0, DangoAbyssDefine_1.ROLE_ATTRIBUTE_LENGTH),
      ));
  }
  wGc() {
    this.Refresh();
  }
}
class PluginPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.bgc = new Map()),
      (this.Ngc = void 0),
      (this.ViewModel = void 0),
      (this.qgc = () => {
        return new TagItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UITexture],
      [11, UE.UIText],
      [12, UE.UIMultiTemplateLayout],
      [13, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (let t = 0; t < DangoAbyssDefine_1.SLOT_COUNT; t++) {
      var i = new DangoAbyssPluginItem_1.DangoAbyssPluginItem(t, !1);
      (i.ViewModel = this.ViewModel),
        e.push(i.CreateThenShowByActorAsync(this.GetItem(0 + t).GetOwner())),
        this.bgc.set(t, i);
    }
    await Promise.all(e);
    var t = this.GetMultiTemplateLayout(12),
      s = this.GetItem(13).GetOwner();
    this.Ngc = new GenericLayout_1.GenericLayout(t, this.qgc, s);
  }
  Refresh() {
    var t,
      e = this.ViewModel.GetDangoId();
    e <= 0 ||
      ((t =
        ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e)),
      this.Tgc(t),
      this.Vgc(),
      this.jgc(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAbyssPluginDangoSelect,
        e,
      ));
  }
  Tgc(i) {
    this.bgc.forEach((t, e) => {
      e = i.GetPluginSlotData(e);
      t.Refresh(e);
    });
  }
  Vgc() {
    var t = this.ViewModel.GetDangoId(),
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoTagData(t, 1);
    this.Ngc.RefreshByData(t);
  }
  jgc(t) {
    var e = t.GetSkillCastTypeName(),
      e =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e),
        t.GetSkillCastTypeIconPath()),
      e =
        (this.SetTextureByPath(e, this.GetTexture(10)),
        ModelManager_1.ModelManager.DangoAbyssModel.GetSkillDescByDangoId(
          t.GetId(),
        ));
    this.GetText(11).SetText(e);
  }
}
class TagItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  Refresh(t, e, i) {
    var t =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(
          t.TagId,
        ),
      s = t.Name,
      s =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s),
        UE.Color.FromHex(t.BgColor));
    this.GetSprite(0).SetColor(s);
  }
}
//# sourceMappingURL=DangoAbyssRoleInfoItem.js.map
