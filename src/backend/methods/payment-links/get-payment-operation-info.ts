import axios from "axios";
import { parsed } from "src/backend/main";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = null;

type TResponse = {
  Data: {
    Operation: {
      customerCode: string;
      taxSystemCode: string;
      paymentType: string;
      paymentId: string;
      transactionId: string;
      createdAt: string;
      paymentMode: string[];
      redirectUrl: string;
      failRedirectUrl: string;
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
      purpose: string;
      amount: string;
      status: string;
      operationId: string;
      paymentLink: string;
      merchantId: string;
      consumerId: string;
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
  operationId: string;
  data: T;
}>;
/* Метод для получения информации о конкретной операции */
export const getPaymentOperationInfo = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { operationId } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/acquiring/${apiVersion}/payments/${operationId}`;

  const headers = {
    Authorization: `Bearer ${parsed?.JWT_KEY_TOKEN}`,
  };

  try {
    return {
      success: true,
      message: await axios.get(url, { headers }),
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
