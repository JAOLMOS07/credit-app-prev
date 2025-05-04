import { Product } from "@/models/Product";

export function validateProduct(form: Product): Record<string, string> {
    const errors: Record<string, string> = {};
    const {
        name,
        rate,
        min_amount,
        max_amount,
        min_term,
        max_term,
    } = form;

    if (!name) errors.name = "El nombre es obligatorio";
    if (!rate || Number(rate) <= 0) errors.rate = "Tasa inválida";

    if (!min_amount || !max_amount) {
        errors.minAmount = "Requerido";
        errors.maxAmount = "Requerido";
    } else if (Number(min_amount) >= Number(max_amount)) {
        errors.minAmount = "El mínimo debe ser menor que el máximo";
    }

    if (!min_term || !max_term) {
        errors.minTerm = "Requerido";
        errors.maxTerm = "Requerido";
    } else if (Number(min_term) >= Number(max_term)) {
        errors.minTerm = "El plazo mínimo debe ser menor que el máximo";
    }

    return errors;
}
