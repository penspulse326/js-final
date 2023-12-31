import { getCartListApi, cartData, emptyCartblock } from "./cartController.js";

const apiPath = process.env.API_PATH;
const baseUrl = process.env.API_BASE;

const customerName = document.querySelector("#customerName");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const paymentMethod = document.querySelector("#paymentMethod");
const submitBtn = document.querySelector("#submitBtn");

let submitData = {
  data: {
    user: {},
  },
};

// 取得資料
export function getValue() {
  submitData.data.user.name = customerName.value;
  submitData.data.user.tel = phone.value;
  submitData.data.user.email = email.value;
  submitData.data.user.address = address.value;
  submitData.data.user.payment = paymentMethod.value;
}

// 送出訂單API
export function apiPostOrder() {
  axios
    .post(`${baseUrl}/customer/${apiPath}/orders`, submitData)
    .then((res) => {
      submitSuccess();
      getCartListApi();
      emptyCartblock();
    })
    .catch((err) => {
      console.log(err);
    });
}

// 表單驗證
const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  "input[type=text], input[type=tel], input[type=email]"
);

const constraints = {
  customerName: {
    presence: true,
  },
  phone: {
    presence: true,
  },
  email: {
    presence: true,
  },
  address: {
    presence: true,
  },
};

inputs.forEach((item) => {
  item.addEventListener("change", () => {
    item.nextElementSibling.textContent = "";
  });
});

export function submitBtnHandler() {
  document.querySelector("#submitBtn").addEventListener("click", () => {
    getValue();
    apiPostOrder();
  });
}

function checkValue() {
  const errors = validate(form, constraints);
  if (errors) {
    Object.keys(errors).forEach((keys) => {
      document.querySelector(`#${keys}Hint`).textContent = "必填！";
    });
  }
  // 送出按鈕設置
  if (!errors && cartData.length > 0) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", "true");
  }
}

function submitSuccess() {
  customerName.value = "";
  phone.value = "";
  email.value = "";
  address.value = "";

  Swal.fire({
    title: "訂單送出成功",
    icon: "success",
    confirmButtonText: "關閉",
  });
}

window.addEventListener("click", () => checkValue());
