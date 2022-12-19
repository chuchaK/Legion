const constants = {
  app: {
    URL: "http://localhost:3000",
  },
};

const toggleVisibility = (elemId) => {
  const elem = document.getElementById(elemId);
  if (elem.style.display !== "none") {
    elem.style.display = "none";
  } else {
    elem.style.display = "block";
  }
};

const updateUser = async (inputId, fieldId) => {
  const inputValue = document.getElementById(inputId).value;
  const formData = new FormData();
  formData.append(fieldId, inputValue);
  // console.log("NELSON formData", formData);
  const result = await fetch(constants.app.URL + "/profile/update", {
    method: "POST",
    credentials: "same-origin",
    body: formData,
  });
  const newObj = await result.json();
  const fieldCont = document.getElementById(fieldId);
  fieldCont.innerHTML = newObj[fieldId];
};
