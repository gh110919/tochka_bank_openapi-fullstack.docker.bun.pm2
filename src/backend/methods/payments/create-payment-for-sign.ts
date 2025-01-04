import axios from "axios";
import { parsed } from "src/backend/main";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  Data: {
    accountCode: string;
    bankCode: string;
    payerINN: string;
    payerKPP: string;
    counterpartyBankBic: string;
    counterpartyAccountNumber: string;
    counterpartyINN: string;
    counterpartyKPP: string;
    counterpartyName: string;
    counterpartyBankCorrAccount: string;
    paymentAmount: string;
    paymentDate: string;
    paymentNumber: string;
    paymentPriority: string;
    paymentPurpose: string;
    codePurpose: string;
    supplierBillId: string;
    taxInfoDocumentDate: string;
    taxInfoDocumentNumber: string;
    taxInfoKBK: string;
    taxInfoOKATO: string;
    taxInfoPeriod: string;
    taxInfoReasonCode: string;
    taxInfoStatus: string;
    budgetPaymentCode: string;
    email: string;
  };
};

type TResponse = {
  Data: {
    requestId: string;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  data: T;
}>;
/* Метод для создания платежа. */
export const createPaymentForSign = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/payment/${apiVersion}/for-sign`;

  const headers = {
    Authorization: `Bearer ${parsed?.JWT_KEY_TOKEN}`,
  };

  try {
    return {
      success: true,
      message: await axios.post(url, data, { headers }),
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
