import { withPluginApi } from "discourse/lib/plugin-api";

function generateOtp($elem) {
  const key = $elem.data("secret");
  const totp = new jsOTP.totp();
  $elem.html("<div class='totp-code'>" + totp.getOtp(key) + "</div>");
  Em.run.later(() => attachButton($elem), 30000);
}

function attachButton($elem) {
  $elem.html("<button class='btn'>Generate OTP</button>");
  $elem.find("button").on("click", () => generateOtp($elem));
}

function attachOtp($elem, helper) {
  $elem.find("div[data-wrap=discourse-otp]").each((idx, val) => {
    attachButton($(val));
  });
}

function initialize(api) {
  api.decorateCooked(attachOtp, { id: "discourse-otp" });
}

export default {
  name: "discourse-otp",

  initialize() {
    withPluginApi("0.8.28", initialize);
  }
};
