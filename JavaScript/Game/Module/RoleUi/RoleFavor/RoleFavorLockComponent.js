"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorLockComponent = exports.initLockItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoleFavorDefine_1 = require("./RoleFavorDefine"),
  RoleFavorLockItem_1 = require("./RoleFavorLockItem"),
  initLockItem = (e, t, i) => {
    return { Key: i, Value: new RoleFavorLockItem_1.RoleFavorLockItem(t, e) };
  };
exports.initLockItem = initLockItem;
class RoleFavorLockComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.Sui = void 0),
      (this.huo = []),
      (this.luo = t),
      e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    this.nOe();
  }
  OnBeforeDestroy() {
    (this.luo = void 0), this._uo(), (this.huo = []);
  }
  Refresh(e) {
    (this.luo = e), this._uo(), (this.huo = []), this.nOe();
  }
  nOe() {
    this.Ubt(), this.uuo(), this.cuo();
  }
  _uo() {
    this.Sui && (this.Sui.ClearChildren(), (this.Sui = void 0));
  }
  cuo() {
    (this.Sui = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetVerticalLayout(0),
      exports.initLockItem,
      this.GetItem(5),
    )),
      (this.huo = this.muo()),
      this.Sui.RebuildLayoutByDataNew(this.huo);
  }
  Ubt() {
    var e = this.duo();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), e);
  }
  uuo() {
    var e = this.GetItem(4),
      t = this.GetItem(3);
    2 === this.luo.FavorTabType && 1 === this.luo.TypeParam
      ? (e.SetUIActive(!0),
        t.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(1),
          "FavorUnlockNewIdleAction",
        ))
      : (e.SetUIActive(!1), t.SetUIActive(!1));
  }
  duo() {
    let e = "";
    switch (this.luo.FavorTabType) {
      case 2:
        e = "FavorUnlockActionCondition";
        break;
      case 1:
        e = "FavorUnlockkStoryCondition";
        break;
      case 3:
        e = "FavorUnlockPreciousItemCondition";
        break;
      case 0:
        e = "FavorUnlockVoiceCondition";
    }
    return e;
  }
  muo() {
    let e = [];
    var t = this.luo.Config,
      i = this.luo.FavorTabType,
      o = t.Id,
      t = t.CondGroupId;
    return (e = 2 !== i && 1 !== i && 3 !== i && 0 !== i ? e : this.Cuo(o, t));
  }
  Cuo(i, e) {
    var o = [],
      r = this.luo.RoleId,
      a = this.luo.FavorTabType,
      e =
        ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
          e,
        );
    if (e) {
      var s = e.GroupId,
        n = s.length;
      for (let t = 0; t < n; t++) {
        var l = s[t],
          h =
            ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(l);
        let e = !1;
        e =
          2 === a
            ? ModelManager_1.ModelManager.MotionModel.IsCondtionFinish(r, i, l)
            : ModelManager_1.ModelManager.RoleFavorConditionModel.IsCondtionFinish(
                r,
                a,
                i,
                l,
              );
        l = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(h.Description);
        o.push(new RoleFavorDefine_1.RoleFavorLockItemData(!e, l ?? ""));
      }
    }
    return o;
  }
}
exports.RoleFavorLockComponent = RoleFavorLockComponent;
//# sourceMappingURL=RoleFavorLockComponent.js.map
