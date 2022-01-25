const addContactBtn = document.getElementById("contact-add");
const contactModal = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const newContactList = document.getElementById("contact-list");
const cancelBtn = contactModal.querySelector(".btn--passive");
const addBtn = cancelBtn.nextElementSibling;
const userInputs = contactModal.querySelectorAll("input");
const enteryText = document.getElementById("entry-text");
const deleteModal = document.getElementById("delete-modal");
const dangerBtn = document.getElementById("btn-danger");
const editContactModal = document.getElementById("edit-contact-modal");
const editModalCancelBtn = document.getElementById("cancel-btn-edit");
const editModalUpdateBtn = document.getElementById("update-btn-edit");
const editModalInputs = editContactModal.querySelectorAll("input");

let successBtn = document.getElementById("btn-success");
const contacts = [];

let selectedContactForEdit = {};

const resetUi = () => {
  const ToBeDeletedContacts = document.querySelectorAll("li");
  ToBeDeletedContacts.forEach((contact) => newContactList.removeChild(contact));
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeEditContactModal = () => {
  editContactModal.classList.remove("visible");
};

const removeBackdrop = () => {
  clearUsrInputs();
  closeAddContactModal();
  cancelContactDeletion();
  closeEditContactModal();
  // closeContactModal();
};

const clearUsrInputs = () => {
  for (const usrInput of userInputs) {
    if (usrInput.type === "radio") {
      usrInput.checked = false;
    } else {
      usrInput.value = "";
    }
  }
};

const cancelAddContactModal = () => {
  toggleBackdrop();
  closeAddContactModal();
  clearUsrInputs();
};

const updateUi = () => {
  if (contacts.length == "") {
    enteryText.style.display = "block";
  } else {
    enteryText.style.display = "none";
  }
};

const cancelContactDeletion = () => {
  toggleBackdrop();
  deleteModal.classList.remove("visible");
  updateUi();
};

const deleteContactElement = (contactId) => {
  deleteModal.classList.add("visible");
  toggleBackdrop();
  successBtn.replaceWith(successBtn.cloneNode(true));
  successBtn = document.getElementById("btn-success");
  dangerBtn.addEventListener("click", cancelDeletionModal);
  successBtn.addEventListener(
    "click",
    deleteContactConfirmation.bind(null, contactId)
  );
};

const deleteContactConfirmation = (contactId) => {
  let contactIndex = 0;
  // for (const contact of contacts) {
  //   if (contact.id === contactId) {
  //     break;
  //   }
  //   contactIndex++;
  // }

  contacts.find(
    (contact, idx) =>
      (contactIndex = contact.id === contactId ? idx : contactIndex)
    // if (contact.id === contactId) {
    //   return contactIndex = idx;
    // }
  );

  contacts.splice(contactIndex, 1);
  const newContactList = document.getElementById("contact-list");
  newContactList.children[contactIndex].remove();
  cancelContactDeletion();
  updateUi();
};
// ----------------------- Edit Contact Operation --------------
const editModalOperations = (id) => {
  const obj = contacts.find((contact) => (newObject = contact.id === id));
  console.log(obj);
  console.log(editModalInputs);
  editModalInputs[0].value = obj.firstName;
  editModalInputs[1].value = obj.lastName;
  editModalInputs[2].value = obj.image;
  editModalInputs[3].value = obj.email;
  editModalInputs[4].value = obj.phone;
  if (obj.status === "Active") {
    editModalInputs[5].checked = true;
  } else editModalInputs[6].checked = true;
};

// ----------------------- Edit Contact Operation --------------

//------------------------  Edit Contact ----------------------//

const editContactHandler = (obj) => {
  // const selectedContact = contacts.filter((el) => el.id === contId);
  // console.log(selectedContact);
  toggleBackdrop();
  editContactModal.classList.add("visible");
  editModalOperations(obj.id);
  selectedContactForEdit = obj;
};

//------------------------  Edit Contact ----------------------//

const renderContactElement = () => {
  resetUi();
  contacts.map((contact) => {
    const editId = `edit${Math.random()}`;
    const deleteId = `delete${Math.random()}`;

    const newContactElement = document.createElement("div");
    newContactElement.className = "contact-element";
    newContactElement.innerHTML = `
       <div class="contact-element__image">
       <img src="${contact.image}" alt="${contact.firstName}">
       </div>
       <div class="contact-element__info">
       <h2>${contact.firstName} ${contact.lastName}</h2>
       <p><i class="fa fa-envelope"></i> E-mail : ${contact.email}</p>
       <p><i class="fa fa-phone" style=color:blue"></i> Phone : ${
         contact.phoneNo
       }</p>
       <p>Status : <bold style="color : ${
         contact.status === "Active" ? "green" : "red"
       }">${contact.status}</bold></p>
       <div class="edit-box">
       <button class="btn btn--edit " id="${editId}"><edit</button>
       <button class="btn btn--delete " id="${deleteId}">delete</button>
       </div>
       </div>
      `;

    newContactList.append(newContactElement);
    const deleteBtn = document.getElementById(deleteId);
    deleteBtn.addEventListener("click", () => deleteContactElement(contact.id));
    const editBtn = document.getElementById(editId);
    editBtn.addEventListener("click", () => editContactHandler({ ...contact }));
  });
};

const closeAddContactModal = () => {
  contactModal.classList.remove("visible");
};

const addContactModal = () => {
  contactModal.classList.add("visible");
  toggleBackdrop();
};

const addContactHandler = () => {
  const firstName = userInputs[0].value;
  const lastName = userInputs[1].value;
  const imageValue = userInputs[2].value;
  const emailValue = userInputs[3].value;
  const phoneNoVal = userInputs[4].value;
  const statusVal = userInputs[5].checked
    ? userInputs[5].value
    : userInputs[6].value;
  console.log(statusVal);

  if (
    firstName === "" ||
    imageValue === "" ||
    lastName === "" ||
    emailValue === "" ||
    +phoneNoVal < 1 // ||
    // +phoneNoVal.length > 10 ||
    // +phoneNoVal.length < 10
  ) {
    alert("Please Enter a Valid Input");
    return;
  }
  // const setErrorMsg = (input, errorMsg) => {
  //   const modalContact = input.parentElement;
  //   const small = modalContact.querySelector("small");
  //   modalContact.className = "modal__contact error";
  //   small.innerHTML = errorMsg;
  // };
  // const setSuccessMsg = (input, errorMsg) => {
  //   const modalContact = input.parentElement;
  //   modalContact.className = "modal__contact success";
  // };

  // const isEmail = (emailValue) => {
  //   let atSymbol = emailValue.indexOf("@");
  //   if (atSymbol < 1) {
  //     return false;
  //   }
  //   let dot = emailValue.lastIndexOf(".");
  //   if (dot <= atSymbol + 3) {
  //     return false;
  //   } else if (dot === emailValue.length - 1) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };
  // // firstname & lastname Vadiation
  // if (firstName === "" || lastName === "") {
  //   setErrorMsg(firstName, "firstname cannot be blank");
  //   setErrorMsg(lastName, "lastname cannot be blank");
  // } else if (firstName.length <= 2 || lastName.length <= 2) {
  //   setErrorMsg(firstName, "firstname min 3 char");
  //   setErrorMsg(lastName, "lastname min 3 char");
  // } else {
  //   setSuccessMsg(firstName);
  //   setSuccessMsg(lastName);
  // }
  // // email ValidATION
  // if (emailValue === "") {
  //   setErrorMsg(emailValue, "email cannot be blank");
  // } else if (!isEmail(emailValue)) {
  //   setErrorMsg(emailValue, "Not a valid email");
  // } else {
  //   setSuccessMsg(emailValue);
  // }
  // // phone Validation
  // if (phoneNoVal === "") {
  //   setErrorMsg(phoneNoVal, "phone cannot be blank");
  // } else if (phoneNoVal !== 10) {
  //   setErrorMsg(phoneNoVal, "Not Valid phone number");
  // } else {
  //   setSuccessMsg(phoneNoVal);
  // }
  let newContacts = {
    id: Math.random(),
    firstName,
    lastName,
    image: imageValue,
    email: emailValue,
    phone: phoneNoVal,
    status: statusVal,
  };
  contacts.push(newContacts);
  console.log(contacts);

  closeAddContactModal();
  toggleBackdrop();
  renderContactElement();
  clearUsrInputs();
  updateUi();
};

const cancelDeletionModal = () => {
  deleteModal.classList.remove("visible");
  toggleBackdrop();
};

const editModalUpdateBtnHandler = () => {
  // console.log(contacts);
  const editedContact = { ...selectedContactForEdit };

  console.log(editedContact);
  console.log(contacts);

  editedContact.firstName = editModalInputs[0].value;
  editedContact.lastName = editModalInputs[1].value;
  editedContact.image = editModalInputs[2].value;
  editedContact.email = editModalInputs[3].value;
  editedContact.phone = editModalInputs[4].value;
  editedContact.status =
    editModalInputs[5].checked === true
      ? editModalInputs[5].value
      : editModalInputs[6].value;

  contacts.splice(
    contacts.findIndex((contact) => contact.id === editedContact.id),
    1,
    editedContact
  );

  closeEditContactModal();
  removeBackdrop();
  // console.log(editedContact);

  renderContactElement();
};

const editModalCancelBtnHandler = () => {
  closeEditContactModal();
  removeBackdrop();
};

addContactBtn.addEventListener("click", addContactModal);
backdrop.addEventListener("click", removeBackdrop);
cancelBtn.addEventListener("click", cancelAddContactModal);
addBtn.addEventListener("click", addContactHandler);
editModalCancelBtn.addEventListener("click", editModalCancelBtnHandler);
editModalUpdateBtn.addEventListener("click", editModalUpdateBtnHandler);
