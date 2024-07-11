"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemUseComponent = exports.BattleSkillSwitchComponent = void 0);
const UE = require("ue"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  rotatorAngles = [90, 45, 0, -45, -90, -135, -180];
class BattleSkillSwitchComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.yot = -1),
      (this.Iot = Rotator_1.Rotator.Create()),
      (this.Tot = void 0),
      (this.vot = new Map()),
      (this.Lot = () => new ItemUseComponent());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIHorizontalLayout],
    ];
  }
  OnStart() {
    this.Tot = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(4),
      this.Lot,
    );
    for (const t of this.vot.values()) t();
  }
  OnBeforeDestroy() {
    this.vot.clear();
  }
  SetComponentActive(t) {
    var e = () => {
      this.SetActive(t);
    };
    this.InAsyncLoading() ? this.vot.set("SetActive", e) : e();
  }
  RefreshSwitch() {
    var t = () => {
      var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
        e =
          ModelManager_1.ModelManager.RouletteModel.ExploreSkillIdList.indexOf(
            t,
          );
      0 <= e
        ? this.UpdateSwitch(e)
        : (3002 !== t && 3001 !== t) || this.UpdateItemGridSwitch();
    };
    this.InAsyncLoading() ? this.vot.set("RefreshComponent", t) : t();
  }
  UpdateSwitch(i) {
    var t;
    this.yot === i ||
      i < 0 ||
      i >= rotatorAngles.length ||
      ((t = () => {
        this.GetSprite(1).SetUIActive(!1);
        var t = this.GetSprite(0),
          e =
            (t.SetUIActive(!0),
            (this.Iot.Yaw = rotatorAngles[i]),
            this.Iot.ToUeRotator());
        t.SetUIRelativeRotation(e), (this.yot = i);
      }),
      this.InAsyncLoading() ? this.vot.set("UpdateSwitch", t) : t());
  }
  UpdateItemGridSwitch() {
    var t = () => {
      this.GetSprite(0).SetUIActive(!1),
        this.GetSprite(1).SetUIActive(!0),
        (this.yot = -1);
    };
    this.InAsyncLoading() ? this.vot.set("UpdateSwitchByAngle", t) : t();
  }
  UpdateNumPanel(t, e) {
    var i = () => {
      this.GetItem(2).SetUIActive(t),
        t && void 0 !== e && this.GetText(3).SetText(e.toString());
    };
    this.InAsyncLoading() ? this.vot.set("UpdateNumPanel", i) : i();
  }
  UpdatePointPanel(i, s, r) {
    var t = () => {
      var t, e;
      this.GetHorizontalLayout(4).RootUIComp.SetUIActive(i),
        !i ||
          void 0 === s ||
          void 0 === r ||
          s < r ||
          ((e = new Array(s - r).fill(!0)),
          (t = new Array(r).fill(!1)),
          (e = e.concat(t)),
          this.Tot.RefreshByData(e));
    };
    this.InAsyncLoading() ? this.vot.set("UpdatePointPanel", t) : t();
  }
}
exports.BattleSkillSwitchComponent = BattleSkillSwitchComponent;
class ItemUseComponent extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(t, e, i) {
    this.SetSpriteVisible(t);
  }
  SetSpriteVisible(t) {
    this.GetSprite(0).SetUIActive(t);
  }
}
exports.ItemUseComponent = ItemUseComponent;
//# sourceMappingURL=BattleSkillSwitchComponent.js.map
