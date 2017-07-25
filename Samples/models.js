export const Address = {
    id: 0 /* int */,
    label: '' /* string */,
    streetAddress1: '' /* string */,
    streetAddress2: '' /* string */,
    city: '' /* string */,
    state: '' /* string */,
    country: '' /* string */,
    zip: '' /* string */,
    zipPlusFour: '' /* string */
}
Address.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, Address, obj);
}

export const BankAccount = {
    id: 0 /* int */,
    contactId: 0 /* int */,
    contact: {} /* Contact */,
    routingNumber: '' /* string */,
    accountNumber: '' /* string */,
    exactNameOnAccount: '' /* string */
}
BankAccount.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, BankAccount, obj);
}

var LoanStatus;
(function (LoanStatus) {
    LoanStatus[LoanStatus["New"] = 0] = "New";
    LoanStatus[LoanStatus["Pending"] = 1] = "Pending";
    LoanStatus[LoanStatus["Open"] = 2] = "Open";
    LoanStatus[LoanStatus["Assumed"] = 3] = "Assumed";
    LoanStatus[LoanStatus["Cancelled"] = 4] = "Cancelled";
    LoanStatus[LoanStatus["Foreclosed"] = 5] = "Foreclosed";
    LoanStatus[LoanStatus["Paid"] = 6] = "Paid";
})(LoanStatus = exports.LoanStatus || (exports.LoanStatus = {}));

var LoanType;
(function (LoanType) {
    LoanType[LoanType["None"] = 0] = "None";
    LoanType[LoanType["Standard"] = 1] = "Standard";
    LoanType[LoanType["LineOfCredit"] = 2] = "LineOfCredit";
})(LoanType = exports.LoanType || (exports.LoanType = {}));

var RateType;
(function (RateType) {
    RateType[RateType["None"] = 0] = "None";
    RateType[RateType["Fixed"] = 1] = "Fixed";
    RateType[RateType["Adjustable"] = 2] = "Adjustable";
})(RateType = exports.RateType || (exports.RateType = {}));

var PaymentType;
(function (PaymentType) {
    PaymentType[PaymentType["None"] = 0] = "None";
    PaymentType[PaymentType["InterestOnly"] = 1] = "InterestOnly";
    PaymentType[PaymentType["Amortized"] = 2] = "Amortized";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));

var FeeType;
(function (FeeType) {
    FeeType[FeeType["None"] = 0] = "None";
    FeeType[FeeType["Setup"] = 1] = "Setup";
    FeeType[FeeType["Escrow"] = 2] = "Escrow";
    FeeType[FeeType["Title"] = 3] = "Title";
    FeeType[FeeType["TaxService"] = 4] = "TaxService";
    FeeType[FeeType["Recording"] = 5] = "Recording";
    FeeType[FeeType["LoanBroker"] = 6] = "LoanBroker";
    FeeType[FeeType["Wiring"] = 7] = "Wiring";
    FeeType[FeeType["BeneficiaryDemand"] = 8] = "BeneficiaryDemand";
    FeeType[FeeType["Reconveyance"] = 9] = "Reconveyance";
    FeeType[FeeType["Other"] = 10] = "Other";
})(FeeType = exports.FeeType || (exports.FeeType = {}));

var CorrespondenceMethod;
(function (CorrespondenceMethod) {
    CorrespondenceMethod[CorrespondenceMethod["None"] = 0] = "None";
    CorrespondenceMethod[CorrespondenceMethod["Mail"] = 1] = "Mail";
    CorrespondenceMethod[CorrespondenceMethod["Email"] = 2] = "Email";
})(CorrespondenceMethod = exports.CorrespondenceMethod || (exports.CorrespondenceMethod = {}));

var ContactFlag;
(function (ContactFlag) {
    ContactFlag[ContactFlag["None"] = 0] = "None";
    ContactFlag[ContactFlag["Partner"] = 1] = "Partner";
    ContactFlag[ContactFlag["Bank"] = 2] = "Bank";
    ContactFlag[ContactFlag["Borrower"] = 4] = "Borrower";
    ContactFlag[ContactFlag["Employee"] = 8] = "Employee";
    ContactFlag[ContactFlag["Escrow"] = 16] = "Escrow";
    ContactFlag[ContactFlag["Title"] = 32] = "Title";
})(ContactFlag = exports.ContactFlag || (exports.ContactFlag = {}));

var PropertyFinanceType;
(function (PropertyFinanceType) {
    PropertyFinanceType[PropertyFinanceType["None"] = 0] = "None";
    PropertyFinanceType[PropertyFinanceType["Purchase"] = 1] = "Purchase";
    PropertyFinanceType[PropertyFinanceType["Refinance"] = 2] = "Refinance";
})(PropertyFinanceType = exports.PropertyFinanceType || (exports.PropertyFinanceType = {}));

export const Property = {
    id: 0 /* int */,
    loanId: 0 /* int */,
    loan: {} /* Loan */,
    liens: 0 /* decimal */,
    taxesArePaid: false /* bool */,
    taxesComment: '' /* string */,
    isReconveyed: false /* bool */,
    frRecordingNumber: '' /* string */,
    apn: '' /* string */,
    priorityOfTLCLoan: 0 /* int */,
    addressId: 0 /* int */,
    address: {} /* Address */,
    appraisal: {} /* PropertyAppraisal */,
    isEnterpriseZoned: false /* bool */,
    isResidence: false /* bool */,
    requiresFloodInsurance: false /* bool */,
    vesting: '' /* string */,
    fireInsuranceAmount: 0 /* decimal */,
    fireInsurancePremium: 0 /* decimal */,
    insuranceMaturity: '' /* DateTime */,
    legalDescription: '' /* string */,
    basisForEstimatedValue: '' /* string */,
    detail: {} /* PropertyDetail */
}
Property.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, Property, obj);
}

export const PropertyAppraisal = {
    id: 0 /* int */,
    property: {} /* Property */,
    appraisedOn: '' /* DateTime */,
    appraisedById: 0 /* int */,
    appraisedBy: {} /* Contact */,
    fee: 0 /* decimal */,
    value: 0 /* decimal */
}
PropertyAppraisal.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, PropertyAppraisal, obj);
}

export const PropertyDetail = {
    id: 0 /* int */,
    property: {} /* Property */,
    newLTV: 0 /* decimal */,
    financeType: 0 /* enum PropertyFinanceType */,
    isOwnerOccupied: false /* bool */,
    siteSquareFeet: 0 /* int */,
    buildingSquareFeet: 0 /* int */,
    units: 0 /* int */,
    annualNOI: 0 /* decimal */,
    dscr: '' /* string */,
    estimatedLoss: 0 /* decimal */,
    summary: '' /* string */
}
PropertyDetail.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, PropertyDetail, obj);
}

var AccountType;
(function (AccountType) {
    AccountType[AccountType["Loan"] = 1] = "Loan";
    AccountType[AccountType["Partner"] = 11] = "Partner";
})(AccountType = exports.AccountType || (exports.AccountType = {}));

export const Account = {
    id: 0 /* int */,
    contactId: 0 /* int */,
    contact: {} /* Contact */,
    accountType: 0 /* enum AccountType */,
    lastStatementId: 0 /* int */,
    lastStatement: {} /* AccountStatement */,
    statements: [] /* List<AccountStatement> */,
    transactions: [] /* List<AccountTransaction> */
}
Account.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, Account, obj);
}

export const AccountStatement = {
    id: 0 /* int */,
    accountId: 0 /* int */,
    account: {} /* Account */,
    openingDate: '' /* DateTime */,
    openingBalance: 0 /* decimal */,
    closingDate: '' /* DateTime */,
    closingBalance: 0 /* decimal */,
    firstTransactionId: 0 /* int */,
    lastTransactionId: 0 /* int */
}
AccountStatement.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, AccountStatement, obj);
}

var AccountTransactionType;
(function (AccountTransactionType) {
    AccountTransactionType[AccountTransactionType["None"] = 0] = "None";
    AccountTransactionType[AccountTransactionType["Deposit"] = 1] = "Deposit";
    AccountTransactionType[AccountTransactionType["Withdrawal"] = 2] = "Withdrawal";
    AccountTransactionType[AccountTransactionType["Adjustment"] = 3] = "Adjustment";
    AccountTransactionType[AccountTransactionType["Refund"] = 4] = "Refund";
    AccountTransactionType[AccountTransactionType["Fee"] = 5] = "Fee";
    AccountTransactionType[AccountTransactionType["Interest"] = 6] = "Interest";
})(AccountTransactionType = exports.AccountTransactionType || (exports.AccountTransactionType = {}));

export const AccountTransaction = {
    id: 0 /* int */,
    accountId: 0 /* int */,
    account: {} /* Account */,
    transactionDate: '' /* DateTime */,
    description: '' /* string */,
    amount: 0 /* decimal */,
    transactionType: 0 /* enum AccountTransactionType */
}
AccountTransaction.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, AccountTransaction, obj);
}

export const Document = {
    id: 0 /* int */,
    filename: '' /* string */,
    description: '' /* string */,
    categoryId: 0 /* int */,
    category: {} /* DocumentCategory */
}
Document.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, Document, obj);
}

export const DocumentCategory = {
    id: 0 /* int */,
    name: '' /* string */
}
DocumentCategory.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, DocumentCategory, obj);
}

export const DocumentTemplate = {
    id: 0 /* int */,
    name: '' /* string */,
    template: '' /* string */,
    categoryId: 0 /* int */,
    category: {} /* DocumentCategory */
}
DocumentTemplate.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, DocumentTemplate, obj);
}

export const Contact = {
    id: 0 /* int */,
    rolodexId: '' /* string */,
    firstName: '' /* string */,
    lastName: '' /* string */,
    suffix: '' /* string */,
    displayAs: '' /* string */,
    nickname: '' /* string */,
    company: '' /* string */,
    jobTitle: '' /* string */,
    _created: '' /* DateTime */,
    _createdById: 0 /* int */,
    _modified: '' /* DateTime */,
    _modifiedById: 0 /* int */,
    flags: 0 /* enum ContactFlag */,
    addresses: [] /* ICollection<Address> */,
    phoneNumbers: [] /* ICollection<ContactPhone> */,
    emailAddresses: [] /* ICollection<ContactEmail> */,
    customFields: [] /* ICollection<ContactField> */,
    notes: [] /* ICollection<ContactNote> */
}
Contact.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, Contact, obj);
}

export const ContactEmail = {
    id: 0 /* int */,
    contactId: 0 /* int */,
    label: '' /* string */,
    email: '' /* string */,
    contact: {} /* Contact */
}
ContactEmail.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, ContactEmail, obj);
}

export const ContactField = {
    id: 0 /* int */,
    contactId: 0 /* int */,
    label: '' /* string */,
    value: '' /* string */,
    contact: {} /* Contact */
}
ContactField.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, ContactField, obj);
}

export const ContactNote = {
    id: 0 /* int */,
    text: '' /* string */,
    contactId: 0 /* int */,
    contact: {} /* Contact */,
    _created: '' /* DateTime */,
    _createdById: 0 /* int */,
    _modified: '' /* DateTime */,
    _modifiedById: 0 /* int */
}
ContactNote.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, ContactNote, obj);
}

export const ContactPhone = {
    id: 0 /* int */,
    contactId: 0 /* int */,
    label: '' /* string */,
    number: '' /* string */,
    extension: '' /* string */,
    contact: {} /* Contact */
}
ContactPhone.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, ContactPhone, obj);
}

export const Borrower = {
    id: 0 /* int */,
    contactId: 0 /* int */,
    contact: {} /* Contact */,
    legalName: '' /* string */,
    spouseLegalName: '' /* string */,
    referredById: 0 /* int */,
    referredBy: {} /* Contact */,
    loanId: 0 /* int */,
    loan: {} /* Loan */
}
Borrower.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, Borrower, obj);
}

export const Fee = {
    id: 0 /* int */,
    feeType: 0 /* enum FeeType */,
    amount: 0 /* decimal */,
    otherDescription: '' /* string */,
    loanId: 0 /* int */,
    loan: {} /* Loan */
}
Fee.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, Fee, obj);
}

export const Loan = {
    id: 0 /* int */,
    status: 0 /* enum LoanStatus */,
    type: 0 /* enum LoanType */,
    accountNumber: '' /* string */,
    fundedDate: '' /* DateTime */,
    correspondenceMethod: 0 /* enum CorrespondenceMethod */,
    borrowers: [] /* List<Borrower> */,
    bankAccountId: 0 /* int */,
    achPaymentAccount: {} /* BankAccount */,
    details: {} /* LoanDetail */,
    escrow: {} /* LoanEscrow */,
    title: {} /* LoanTitle */,
    fees: [] /* ICollection<Fee> */
}
Loan.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, Loan, obj);
}

export const LoanDetail = {
    id: 0 /* int */,
    principal: 0 /* decimal */,
    interestRate: 0 /* decimal */,
    rateType: 0 /* enum RateType */,
    termMonths: 0 /* int */,
    numberOfPayments: 0 /* int */,
    balloonPayment: 0 /* decimal */,
    hasPrepaymentPenalty: false /* bool */,
    prepaymentPenaltyTermMonths: 0 /* int */,
    adjustmentMonth: 0 /* int */,
    initialAdjustmentDate: '' /* DateTime */,
    minimumRate: 0 /* decimal */,
    maximumRate: 0 /* decimal */,
    spreadOverIndex: 0 /* decimal */,
    paymentType: 0 /* enum PaymentType */,
    switchToAmortized: '' /* DateTime */,
    payment: 0 /* decimal */,
    allDueDate: '' /* DateTime */,
    dueDay: 0 /* int */,
    lateDay: 0 /* int */,
    lateFeePercent: 0 /* decimal */,
    achPaymentDay: 0 /* int */,
    loan: {} /* Loan */
}
LoanDetail.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, LoanDetail, obj);
}

export const LoanEscrow = {
    id: 0 /* int */,
    companyId: 0 /* int */,
    company: {} /* Contact */,
    number: '' /* string */,
    officer: '' /* string */,
    loan: {} /* Loan */
}
LoanEscrow.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, LoanEscrow, obj);
}

export const LoanNote = {
    id: 0 /* int */,
    text: '' /* string */,
    loanId: 0 /* int */,
    loan: {} /* Loan */,
    _created: '' /* DateTime */,
    _createdById: 0 /* int */,
    _modified: '' /* DateTime */,
    _modifiedById: 0 /* int */
}
LoanNote.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, LoanNote, obj);
}

export const LoanPoint = {
    id: 0 /* int */,
    amount: 0 /* int */,
    recipientId: 0 /* int */,
    recipient: {} /* PointsRecipient */,
    loanId: 0 /* int */,
    loan: {} /* Loan */
}
LoanPoint.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, LoanPoint, obj);
}

export const LoanTitle = {
    id: 0 /* int */,
    companyId: 0 /* int */,
    company: {} /* Contact */,
    orderNumber: '' /* string */,
    loan: {} /* Loan */
}
LoanTitle.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, LoanTitle, obj);
}

export const PointsRecipient = {
    id: 0 /* int */,
    name: '' /* string */,
    description: '' /* string */
}
PointsRecipient.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, PointsRecipient, obj);
}

export const Partner = {
    id: 0 /* int */,
    partnerNumber: 0 /* int */,
    contactId: 0 /* int */,
    contact: {} /* Contact */,
    beginningBalance: 0 /* decimal */,
    vesting: '' /* string */,
    dateOfBirth: '' /* DateTime */,
    custodian: '' /* string */,
    auditReportDelivery: 0 /* enum CorrespondenceMethod */,
    quarterlyStatementDelivery: 0 /* enum CorrespondenceMethod */,
    referredById: 0 /* int */,
    referredBy: {} /* Contact */,
    _created: '' /* DateTime */,
    _createdById: 0 /* int */,
    _modified: '' /* DateTime */,
    _modifiedById: 0 /* int */,
    notes: [] /* List<PartnerNote> */,
    accounts: [] /* HashSet<PartnerAccount> */
}
Partner.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, Partner, obj);
}

export const PartnerAccount = {
    id: 0 /* int */,
    partnerId: 0 /* int */,
    partner: {} /* Partner */,
    name: '' /* string */,
    nameOnAccount: '' /* string */,
    routingNumber: 0 /* int */,
    accountNumber: '' /* string */,
    accountType: 0 /* int */
}
PartnerAccount.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, PartnerAccount, obj);
}

export const PartnerNote = {
    id: 0 /* int */,
    text: '' /* string */,
    partnerId: 0 /* int */,
    partner: {} /* Partner */,
    _created: '' /* DateTime */,
    _createdById: 0 /* int */,
    _modified: '' /* DateTime */,
    _modifiedById: 0 /* int */
}
PartnerNote.prototype.create = function (obj) {
    obj = obj || {};
    return Object.assign({}, PartnerNote, obj);
}