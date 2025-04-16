"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BirthdayModel = void 0);
const BirthDayByYear_1 = require("../../../Core/Define/ConfigQuery/BirthDayByYear"),
  RoleBirthdayAll_1 = require("../../../Core/Define/ConfigQuery/RoleBirthdayAll"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BirthdayController_1 = require("./BirthdayController");
class BirthdayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Lp1 = !1),
      (this.ResetYear = 0),
      (this.wp1 = new Map()),
      (this.ThisBirthdayYear = 0),
      (this.IsReceiveBirthdayReward = !1);
  }
  IsDuringBirthday() {
    if (!this.Lp1) return !1;
    var e = new Date(TimeUtil_1.TimeUtil.GetServerTimeStamp()).getFullYear(),
      t =
        ((this.ThisBirthdayYear = e),
        BirthDayByYear_1.configBirthDayByYear.GetConfig(e).ValidDay + 1);
    let r = 0;
    if (e - 1 >= this.ResetYear) {
      var i = this.GetBirthdayDate(e - 1);
      if (0 <= (r = this.CalculateDayGapBetweenNow(i)) && r <= t)
        return (this.ThisBirthdayYear = e - 1), !0;
    }
    i = this.GetBirthdayDate(e);
    return 0 <= (r = this.CalculateDayGapBetweenNow(i)) && r <= t;
  }
  GetBirthdayDate(e) {
    var t = ModelManager_1.ModelManager.PersonalModel.GetBirthday(),
      r = Math.floor(t / 100);
    let i = t % 100;
    return (
      (e % 4 == 0 && e % 100 != 0) ||
        e % 400 == 0 ||
        (2 === r && 29 === i && (i -= 1)),
      new Date(e, r - 1, i)
    );
  }
  CalculateDayGapBetweenNow(e) {
    return (
      (TimeUtil_1.TimeUtil.GetServerTimeStamp() - e.getTime()) /
      TimeUtil_1.TimeUtil.InverseMillisecond /
      86400
    );
  }
  UpdateBirthdayInfo(e) {
    if (((this.Lp1 = e.d01), e.d01)) {
      for (const r of e.fUs) this.wp1.set(r.u01, r.RUs);
      var t = this.IsDuringBirthday();
      e.m01 === this.ThisBirthdayYear && (this.IsReceiveBirthdayReward = !0),
        !this.IsReceiveBirthdayReward &&
          t &&
          BirthdayController_1.BirthdayController.TryOpenBirthdayView();
    }
  }
  GetRoleIdList() {
    var e = [],
      t = Array.from(
        RoleBirthdayAll_1.configRoleBirthdayAll.GetConfigList() ?? [],
      );
    t.sort((e, t) => {
      var r,
        i,
        a = e.RoleId,
        o = t.RoleId,
        s = this.IsRoleSelected(a),
        h = this.IsRoleSelected(o);
      return s || h
        ? s
          ? 1
          : -1
        : ((h = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(a)),
          (s = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o)),
          (i = !h && 0 !== e.Priority),
          (r = !s && 0 !== t.Priority),
          i && r
            ? t.Priority - e.Priority
            : i || r
              ? r
                ? 1
                : -1
              : h && s
                ? (t = h.GetFavorData().GetFavorExp()) !==
                  (e = s.GetFavorData().GetFavorExp())
                  ? e - t
                  : ((i = h.GetRoleCreateTime()), s.GetRoleCreateTime() - i)
                : h || s
                  ? s
                    ? 1
                    : -1
                  : o - a);
    });
    for (const r of t) r && e.push(r.RoleId);
    return e;
  }
  ResetBirthday() {
    (this.Lp1 = !0),
      this.IsDuringBirthday() &&
        BirthdayController_1.BirthdayController.TryOpenBirthdayView();
  }
  IsRoleSelected(e) {
    for (var [, t] of this.wp1) if (e === t) return !0;
    return !1;
  }
  GetBirthdayCount() {
    let e = 0;
    for (var [, t] of this.wp1) t && e++;
    return e;
  }
  GetSelectedRoleId(e) {
    return this.wp1.get(e);
  }
  GetBirthdayRedDotState() {
    return (
      !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10084) && !this.Lp1
    );
  }
  GetBirthdayIsReset() {
    return this.Lp1;
  }
  SetIsReceiveBirthdayReward(e) {
    this.IsReceiveBirthdayReward = e;
  }
  SetSelectedRole(e, t) {
    this.wp1.set(t, e);
  }
}
exports.BirthdayModel = BirthdayModel;
//# sourceMappingURL=BirthdayModel.js.map
