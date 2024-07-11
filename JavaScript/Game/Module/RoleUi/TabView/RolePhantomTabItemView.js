"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleMainPhantomItem =
    exports.RolePhantomItem =
    exports.RolePhantomAttributeItem =
      void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class RolePhantomAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(), this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  ShowTemp(t) {
    const e =
      ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
        t.Id,
      );
    e
      ? (this.GetText(0).ShowTextNew(e.Name),
        this.SetTextureByPath(e.Icon, this.GetTexture(2)),
        this.GetText(1).SetText(
          ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
            t.Id,
            t.Value,
          ),
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 8, "属性表中找不到对应的属性ID配置数据");
  }
}
exports.RolePhantomAttributeItem = RolePhantomAttributeItem;
class RolePhantomItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, s) {
    super(),
      (this.Id = 0),
      (this.OnClick = () => {
        this.ClickFunction && this.ClickFunction(this.Index);
      }),
      (this.OnClickSkillButton = () => {
        var t =
          ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance()
            .GetPhantomData()
            .GetDataByIndex(this.Index);
        var t = {
          SkillInfoData: 0,
          SkillId: this.Id,
          SkillLevel: t.GetPhantomLevel(),
        };
        UiManager_1.UiManager.OpenView("PhantomBattleSkillInfoView", t);
      }),
      this.CreateThenShowByActor(t.GetOwner()),
      (this.ClickFunction = e),
      (this.Index = s);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.OnClick]]);
  }
  UpdateItem(t) {
    (this.Id = t), this.Kbe(), this.Pqt(), this.sct();
  }
  UpdateTrialItem(t) {
    let e;
    this.GetSprite(2).SetUIActive(t !== 0),
      this.GetTexture(1).SetUIActive(t !== 0),
      this.GetItem(4).SetUIActive(t !== 0),
      t !== 0 &&
        ((e =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t)),
        (e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
          e.QualityId,
        )),
        this.SetSpriteByPath(e.BackgroundSprite, this.GetSprite(2), !1),
        this.SetItemIcon(this.GetTexture(1), t),
        this.odo());
  }
  Kbe() {
    let t;
    this.GetTexture(1).SetUIActive(this.Id !== 0),
      this.Id !== 0 &&
        (t =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            this.Id,
          )) &&
        this.SetItemIcon(this.GetTexture(1), t.GetConfigId());
  }
  Pqt() {
    let t;
    this.GetSprite(2).SetUIActive(this.Id !== 0),
      this.Id !== 0 &&
        ((t =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            this.Id,
          )),
        (t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
          t.GetQuality(),
        )),
        this.SetSpriteByPath(t.BackgroundSprite, this.GetSprite(2), !1));
  }
  sct() {
    this.GetItem(4).SetUIActive(this.Id !== 0), this.Id !== 0 && this.odo();
  }
  odo() {
    let t =
      ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
    t &&
      ((t = t.GetPhantomData().GetDataByIndex(this.Index))
        ? this.GetText(5).SetText(t.GetPhantomLevel().toString())
        : this.GetItem(4).SetUIActive(!1));
  }
}
class RoleMainPhantomItem extends (exports.RolePhantomItem = RolePhantomItem) {
  constructor() {
    super(...arguments), (this.rdo = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.OnClick]]);
  }
  OnStart() {
    this.rdo = new SkillButtonCompose(this.GetItem(3), this.OnClickSkillButton);
  }
  UpdateItem(t) {
    super.UpdateItem(t), this.rdo.Update(t);
  }
}
exports.RoleMainPhantomItem = RoleMainPhantomItem;
class SkillButtonCompose extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super(),
      (this.xe = 0),
      (this.Kyt = () => {
        this.EBt && this.EBt();
      }),
      (this.EBt = e),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIButtonComponent],
      [0, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[1, this.Kyt]]);
  }
  Update(t) {
    (this.xe = t),
      this.xe !== 0 &&
      ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsMain(
        this.xe,
      )
        ? (this.SetActive(!0), this.RefreshTexture())
        : this.SetActive(!1);
  }
  RefreshTexture() {
    var t =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.xe,
      );
    var t =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
        t.GetConfigId(),
      );
    this.SetTextureByPath(
      t.GetPhantomSkillInfoByLevel().BattleViewIcon,
      this.GetTexture(0),
    );
  }
}
// # sourceMappingURL=RolePhantomTabItemView.js.map
