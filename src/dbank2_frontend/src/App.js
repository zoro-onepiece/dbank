import { createActor, canisterId } from "../../declarations/dbank2_backend";
let dbank2_backend;

window.addEventListener("load", async function () {
  // console.log("Finished loading");
  dbank2_backend = await createActor(canisterId);
  console.log(typeof dbank2_backend); // should be 'object'
  console.log(dbank2_backend);        // inspect what's inside

  console.log("Actor methods:", Object.keys(dbank2_backend));

  update();
});

document.querySelector("form").addEventListener("submit", async function (event) {
  event.preventDefault();
  // console.log("Submitted.");

  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank2_backend.topUp(inputAmount);
  }

  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank2_backend.withdraw(outputAmount);
  }

  await dbank2_backend.compound();

  update()

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");

});

async function update() {
  const currentAmount = await dbank2_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
};

