import { withPluginApi } from "discourse/lib/plugin-api";
import { later } from "@ember/runloop";
import TinyTOTP from "../vendor/tiny-totp";

async function generateOtp(element) {
  const key = element.dataset.secret;
  const totp = new TinyTOTP(key);
  const code = await totp.gen();
  element.innerHTML = `<div class='totp-code'>${code}</div>`;
  later(() => attachButton(element), 30000);
}

function attachButton(element) {
  element.innerHTML = "<button class='btn'>Generate OTP</button>";
  element
    .querySelector("button")
    .addEventListener("click", () => generateOtp(element));
}

function attachOtp(elem, helper) {
  elem.querySelectorAll("div[data-wrap=discourse-otp]").forEach(attachButton);
}

function initialize(api) {
  api.decorateCookedElement(attachOtp, { id: "discourse-otp" });
}

export default {
  name: "discourse-otp",

  initialize() {
    withPluginApi("0.8.28", initialize);
  },
};
