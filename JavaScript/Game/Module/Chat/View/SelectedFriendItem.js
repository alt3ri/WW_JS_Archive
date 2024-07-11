"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectedFriendItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FriendController_1 = require("../../Friend/FriendController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class SelectedFriendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.sSt = void 0),
      (this.Wgt = void 0),
      (this.MEt = () => {
        this.Wgt && this.Wgt(this.sSt.PlayerId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.MEt]]);
  }
  BindOnClicked(e) {
    this.Wgt = e;
  }
  OnBeforeDestroy() {
    this.Wgt = void 0;
  }
  Refresh(e, i, t) {
    (this.sSt = ModelManager_1.ModelManager.FriendModel.GetFriendById(e)),
      this.sSt && (this.SEt(), this.C4e(), this.sct(), this.EEt(), this.yEt());
  }
  SEt() {
    var e = this.sSt.PlayerHeadPhoto,
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleHeadIcon(e),
      t = this.GetTexture(1);
    this.SetRoleIcon(i, t, e);
  }
  C4e() {
    var e = this.GetText(2),
      i = this.GetText(3),
      t = this.sSt.FriendRemark;
    e.SetText(this.sSt.PlayerName),
      t
        ? (i.SetText(this.sSt.FriendRemark), i.SetUIActive(!0))
        : i.SetUIActive(!1);
  }
  sct() {
    var e = this.sSt.PlayerLevel,
      i = this.GetText(5);
    LguiUtil_1.LguiUtil.SetLocalText(i, "LevelShow", e);
  }
  EEt() {
    var e = this.sSt.PlayerIsOnline,
      i = this.GetText(4),
      t = e ? "00D67E" : "D64600",
      t = UE.Color.FromHex(t);
    i.SetColor(t),
      e
        ? LguiUtil_1.LguiUtil.SetLocalText(i, "FriendOnline")
        : 0 === this.sSt.PlayerLastOfflineTime
          ? i.SetText("")
          : ((t = this.sSt.GetOfflineDay()),
            (e = FriendController_1.FriendController.GetOfflineTimeString(t)),
            LguiUtil_1.LguiUtil.SetLocalText(i, e, t));
  }
  yEt() {
    this.GetItem(6).SetUIActive(!1);
  }
}
exports.SelectedFriendItem = SelectedFriendItem;
//# sourceMappingURL=SelectedFriendItem.js.map
