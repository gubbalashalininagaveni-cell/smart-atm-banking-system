// ================================
// LOGIN
// ================================

function login() {

    let accountNumber =
        document.getElementById("accountNumber").value;

    let pin =
        document.getElementById("pin").value;

    if (accountNumber === "1234567890" && pin === "1234") {

        window.location.href = "dashboard.html";

    } else {

        document.getElementById("message").innerText =
            "Invalid account number or PIN.";
    }
}


// ================================
// BANK BALANCE
// ================================

let balance = 25000;


// ================================
// UPDATE BALANCE
// ================================

function updateBalance() {

    let balanceText =
        "₹" + balance.toLocaleString("en-IN");

    let mainBalance =
        document.getElementById("balance");

    let depositBalance =
        document.getElementById("depositBalance");

    let withdrawBalance =
        document.getElementById("withdrawBalance");

    let transferBalance =
        document.getElementById("transferBalance");


    if (mainBalance) {
        mainBalance.innerText = balanceText;
    }

    if (depositBalance) {
        depositBalance.innerText = balanceText;
    }

    if (withdrawBalance) {
        withdrawBalance.innerText = balanceText;
    }

    if (transferBalance) {
        transferBalance.innerText = balanceText;
    }
}


// ================================
// HIDE ALL SCREENS
// ================================

function hideAllScreens() {

    document.getElementById("homeScreen").style.display = "none";

    document.getElementById("depositScreen").style.display = "none";

    document.getElementById("withdrawScreen").style.display = "none";

    document.getElementById("transferScreen").style.display = "none";

    document.getElementById("transactionScreen").style.display = "none";
}


// ================================
// HOME
// ================================

function showHome() {

    hideAllScreens();

    document.getElementById("homeScreen").style.display = "block";

    updateBalance();
}


// ================================
// DEPOSIT SCREEN
// ================================

function showDeposit() {

    hideAllScreens();

    document.getElementById("depositScreen").style.display = "block";

    updateBalance();
}


// ================================
// DEPOSIT MONEY
// ================================

function depositMoney() {

    let amount =
        Number(document.getElementById("depositAmount").value);

    let message =
        document.getElementById("depositMessage");


    if (amount <= 0 || isNaN(amount)) {

        message.innerText =
            "Please enter a valid amount.";

        return;
    }


    balance = balance + amount;

    updateBalance();


    addTransaction(
        "Deposited ₹" +
        amount.toLocaleString("en-IN")
    );


    message.innerText =
        "₹" +
        amount.toLocaleString("en-IN") +
        " deposited successfully.";

    document.getElementById("depositAmount").value = "";
}


// ================================
// WITHDRAW SCREEN
// ================================

function showWithdraw() {

    hideAllScreens();

    document.getElementById("withdrawScreen").style.display = "block";

    updateBalance();
}


// ================================
// WITHDRAW MONEY
// ================================

function withdrawMoney() {

    let amount =
        Number(document.getElementById("withdrawAmount").value);

    let message =
        document.getElementById("withdrawMessage");


    if (amount <= 0 || isNaN(amount)) {

        message.innerText =
            "Please enter a valid amount.";

        return;
    }


    if (amount > balance) {

        message.innerText =
            "Insufficient balance.";

        return;
    }


    balance = balance - amount;

    updateBalance();


    addTransaction(
        "Withdrawn ₹" +
        amount.toLocaleString("en-IN")
    );


    message.innerText =
        "₹" +
        amount.toLocaleString("en-IN") +
        " withdrawn successfully.";

    document.getElementById("withdrawAmount").value = "";
}


// ================================
// TRANSFER SCREEN
// ================================

function showTransfer() {

    hideAllScreens();

    document.getElementById("transferScreen").style.display = "block";

    updateBalance();
}


// ================================
// TRANSFER MONEY
// ================================

function transferMoney() {

    let account =
        document.getElementById("recipientAccount").value;

    let amount =
        Number(document.getElementById("transferAmount").value);

    let message =
        document.getElementById("transferMessage");


    if (account === "") {

        message.innerText =
            "Please enter recipient account number.";

        return;
    }


    if (amount <= 0 || isNaN(amount)) {

        message.innerText =
            "Please enter a valid amount.";

        return;
    }


    if (amount > balance) {

        message.innerText =
            "Insufficient balance.";

        return;
    }


    balance = balance - amount;

    updateBalance();


    addTransaction(
        "Transferred ₹" +
        amount.toLocaleString("en-IN") +
        " to account " +
        account
    );


    message.innerText =
        "₹" +
        amount.toLocaleString("en-IN") +
        " transferred successfully.";

    document.getElementById("recipientAccount").value = "";

    document.getElementById("transferAmount").value = "";
}


// ================================
// TRANSACTION HISTORY
// ================================

function showTransactions() {

    hideAllScreens();

    document.getElementById("transactionScreen").style.display = "block";
}


// ================================
// ADD TRANSACTION
// ================================

function addTransaction(text) {

    let transactions =
        document.getElementById("transactions");

    let item =
        document.createElement("li");

    item.innerText = text;

    transactions.appendChild(item);
}
