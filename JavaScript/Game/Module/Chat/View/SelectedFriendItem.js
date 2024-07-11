"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectedFriendItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FriendController_1 = require("../../Friend/FriendController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
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
    const e = this.sSt.PlayerHeadPhoto;
    const i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleHeadIcon(e);
    const t = this.GetTexture(1);
    this.SetRoleIcon(i, t, e);
  }
  C4e() {
    const e = this.GetText(2);
    const i = this.GetText(3);
    const t = this.sSt.FriendRemark;
    e.SetText(this.sSt.PlayerName),
      t
        ? (i.SetText(this.sSt.FriendRemark), i.SetUIActive(!0))
        : i.SetUIActive(!1);
  }
  sct() {
    const e = this.sSt.PlayerLevel;
    const i = this.GetText(5);
    LguiUtil_1.LguiUtil.SetLocalText(i, "LevelShow", e);
  }
  EEt() {
    let e = this.sSt.PlayerIsOnline;
    const i = this.GetText(4);
    var t = e ? "00D67E" : "D64600";
    var t = UE.Color.FromHex(t);
    i.SetColor(t),
      e
        ? LguiUtil_1.LguiUtil.SetLocalText(i, "FriendOnline")
        : this.sSt.PlayerLastOfflineTime === 0
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
// # sourceMappingURL=SelectedFriendItem.js.map
