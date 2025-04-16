"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymLordEntranceItem = void 0);
const UE = require("ue"),
  MonsterInfoById_1 = require("../../../../Core/Define/ConfigQuery/MonsterInfoById"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LordGymLordStarItem_1 = require("./LordGymLordStarItem");
class LordGymLordEntranceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.jSi = 0),
      (this.OnToggleClick = void 0),
      (this.CanExecuteChangeCallBack = void 0),
      (this.$be = void 0),
      (this.zbe = () => new LordGymLordStarItem_1.LordGymLordStarItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIHorizontalLayout],
      [2, UE.UITexture],
      [3, UE.UIExtendToggle],
    ]),
      this.OnToggleClick &&
        (this.BtnBindInfo = [
          [
            3,
            () => {
              this.OnToggleClick?.(this.GridIndex);
            },
          ],
        ]);
  }
  OnStart() {
    this.CanExecuteChangeCallBack &&
      this.GetExtendToggle(3)?.CanExecuteChange.Bind(
        () => this.CanExecuteChangeCallBack?.(this.GridIndex) ?? !0,
      ),
      (this.$be = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(1),
        this.zbe,
      ));
  }
  Refresh(e, r, t) {
    this.jSi = e;
    e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymEntranceConfig(
      this.jSi,
    );
    if (e) {
      var i = e.LordGymList;
      if (0 !== i.length) {
        e = ConfigManager_1.ConfigManager.LordGymConfig?.GetLordGymConfig(i[0]);
        if (e) {
          e = e.MonsterList;
          if (e && 0 !== e.length) {
            var e = MonsterInfoById_1.configMonsterInfoById.GetConfig(e[0]),
              s =
                (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name),
                this.SetTextureByPath(e.BigIcon, this.GetTexture(2)),
                new Array(i.length));
            for (let e = 0; e < s.length; e++)
              s[e] =
                ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(
                  i[e],
                );
            this.$be?.RefreshByData(s);
            e = r ? 1 : 0;
            this.GetExtendToggle(3)?.SetToggleState(e);
          }
        }
      }
    }
  }
  OnSelected(e) {
    this.GetExtendToggle(3)?.SetToggleState(1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(3)?.SetToggleState(0);
  }
  GetLordEntranceId() {
    return this.jSi;
  }
}
exports.LordGymLordEntranceItem = LordGymLordEntranceItem;
//# sourceMappingURL=LordGymLordEntranceItem.js.map
