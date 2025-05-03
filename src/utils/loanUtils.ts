type LoanOptions = {
    amount: number;
    term: number;
    rate: number;
};

export function calculateLoan({ amount, term, rate }: LoanOptions) {
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment =
        (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    const totalCost = monthlyPayment * term;

    return { monthlyPayment, totalCost };
}
