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
    accountId: string;
    customerCode: string;
    SecondSide: {
      accountId: string;
      legalAddress: string;
      kpp: string;
      bankName: string;
      bankCorrAccount: string;
      taxCode: string;
      type: string;
      secondSideName: string;
    };
    Content: {
      Invoice: {
        Positions: {
          positionName: string;
          unitCode: string;
          ndsKind: string;
          price: string;
          quantity: string;
          totalAmount: string;
          totalNds: string;
        }[];
        date: string;
        totalAmount: string;
        totalNds: string;
        number: string;
        basedOn: string;
        comment: string;
        paymentExpiryDate: string;
      };
    };
  };
};

type TResponse = {
  Data: {
    documentId: string;
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
/* Метод создания счета на оплату */
export const createInvoice = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/invoice/${apiVersion}/bills`;

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
