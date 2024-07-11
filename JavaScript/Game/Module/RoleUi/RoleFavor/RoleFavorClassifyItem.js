"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorClassifyItem = exports.initContentItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoleFavorContentItem_1 = require("./RoleFavorContentItem"),
  RoleFavorDefine_1 = require("./RoleFavorDefine"),
  RoleFavorUtil_1 = require("./RoleFavorUtil"),
  initContentItem = (e, t, i) => {
    return {
      Key: i,
      Value: new RoleFavorContentItem_1.RoleFavorContentItem(e, t),
    };
  };
exports.initContentItem = initContentItem;
class RoleFavorClassifyItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.ContentGenericLayout = void 0),
      (this.C1o = []),
      (this.g1o = () => {
        this.C1o = this.f1o();
      }),
      (this.p1o = e),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalText(e, this.p1o.TitleTableId),
      this.g1o(),
      (this.ContentGenericLayout = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetVerticalLayout(0),
        exports.initContentItem,
      )),
      this.ContentGenericLayout.RebuildLayoutByDataNew(this.C1o);
  }
  OnBeforeDestroy() {
    this.ContentGenericLayout &&
      (this.ContentGenericLayout.ClearChildren(),
      (this.ContentGenericLayout = void 0)),
      (this.p1o = void 0),
      (this.C1o = []);
  }
  f1o() {
    if (RoleFavorUtil_1.RoleFavorUtil.IsRoleInfo(this.p1o)) return this.v1o();
    var t = [],
      i = this.p1o.RoleId,
      r = this.p1o.TypeParam,
      a = this.p1o.FavorTabType;
    let o = void 0;
    switch (this.p1o.FavorTabType) {
      case 2:
        o = ConfigManager_1.ConfigManager.MotionConfig.GetRoleMotionByType(
          i,
          r,
        );
        break;
      case 1:
        o =
          ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorStoryConfig(i);
        break;
      case 3:
        o =
          ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorGoodsConfig(i);
        break;
      case 0:
        o = ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorWordConfig(
          i,
          r,
        );
    }
    var s = o.length;
    for (let e = 0; e < s; e++) {
      var n = o[e],
        n = new RoleFavorDefine_1.ContentItemData(a, i, n, r);
      t.push(n);
    }
    return t;
  }
  v1o() {
    var e = [],
      t = this.M1o(1),
      i = this.M1o(2);
    return e.push(t, i), e;
  }
  M1o(e) {
    var t = this.p1o.RoleId,
      i =
        ConfigManager_1.ConfigManager.RoleFavorConfig.GetFavorRoleInfoConfig(t);
    return new RoleFavorDefine_1.ContentItemData(1, t, i, e);
  }
}
exports.RoleFavorClassifyItem = RoleFavorClassifyItem;
//# sourceMappingURL=RoleFavorClassifyItem.js.map
