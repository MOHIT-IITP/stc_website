export const PAYMENT_UPI_ID = "9199454035@yespop";

export const PAYMENT_QR_CODE_URL =
  "/phoenix/qr-code.jpeg";

export type RegistrationFeeScope = "per-person" | "per-team";

export const REGISTRATION_FEE_SCOPE_LABELS: Record<
  RegistrationFeeScope,
  string
> = {
  "per-person": "per person",
  "per-team": "per team",
};

export function formatRegistrationFee(
  fee?: number,
  scope: RegistrationFeeScope = "per-person",
) {
  if (typeof fee !== "number" || !Number.isFinite(fee)) {
    return `Rs. 0/- ${REGISTRATION_FEE_SCOPE_LABELS[scope]}`;
  }

  return `Rs. ${fee}/- ${REGISTRATION_FEE_SCOPE_LABELS[scope]}`;
}
