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
    customerCode: string;
    amount: string;
    purpose: string;
    redirectUrl: string;
    failRedirectUrl: string;
    paymentMode: string[];
    saveCard: boolean;
    consumerId: string;
    taxSystemCode: string;
    merchantId: string;
    Client: {
      name: string;
      email: string;
      phone: string;
    };
    Items: {
      vatType: string;
      name: string;
      amount: string;
      quantity: number;
      paymentMethod: string;
      paymentObject: string;
      measure: string;
    }[];
  };
};

type TResponse = {
  Data: {
    purpose: string;
    status: string;
    amount: string;
    operationId: string;
    paymentLink: string;
    consumerId: string;
    customerCode: string;
    redirectUrl: string;
    failRedirectUrl: string;
    paymentMode: string[];
    merchantId: string;
    taxSystemCode: string;
    Client: {
      name: string;
      email: string;
      phone: string;
    };
    Items: {
      vatType: string;
      name: string;
      amount: string;
      quantity: number;
      paymentMethod: string;
      paymentObject: string;
      measure: string;
    }[];
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
/* Метод для создания ссылки на оплату и отправки чека */
export const createPaymentOperationWithReceipt = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/acquiring/${apiVersion}/payments_with_receipt`;

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
