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
    Statement: {
      accountId: string;
      startDateTime: string;
      endDateTime: string;
    };
  };
};

type TResponse = {
  Statement: {
    accountId: string;
    statementId: string;
    status: string;
    startDateTime: string;
    endDateTime: string;
    startDateBalance: number;
    endDateBalance: number;
    creationDateTime: string;
    Transaction: {
      transactionId: string;
      paymentId: string;
      creditDebitIndicator: string;
      status: string;
      documentNumber: string;
      transactionTypeCode: string;
      documentProcessDate: string;
      description: string;
      Amount: {
        amount: number;
        amountNat: number;
        currency: string;
      };
      DebtorParty: {
        inn: string;
        name: string;
        kpp: string;
      };
      DebtorAccount: {
        schemeName: string;
        identification: string;
      };
      DebtorAgent: {
        schemeName: string;
        identification: string;
        accountIdentification: string;
        name: string;
      };
      CreditorParty: {
        inn: string;
        name: string;
        kpp: string;
      };
      CreditorAccount: {
        schemeName: string;
        identification: string;
      };
      CreditorAgent: {
        schemeName: string;
        identification: string;
        accountIdentification: string;
        name: string;
      };
      TaxFields: {
        originatorStatus: string;
        kbk: string;
        oktmo: string;
        base: string;
        documentNumber: string;
        documentDate: number;
        type: string;
        field107: string;
      };
    }[];
  }[];
};

type TParams<T> = Partial<{
  data: T;
}>;
/* Метод для создания выписки по конкретному счёту */
export const initStatement = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/open-banking/${apiVersion}/statements`;

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
