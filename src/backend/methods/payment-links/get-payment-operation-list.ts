import axios from "axios";
import { stringify } from "qs";
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
    first: string;
    prev: string;
    next: string;
    last: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  customerCode: string;
  fromDate: string;
  toDate: string;
  page: number;
  perPage: number;
  status:
    | "CREATED"
    | "APPROVED"
    | "ON-REFUND"
    | "REFUNDED"
    | "EXPIRED"
    | "REFUNDED_PARTIALLY";
  data: T;
}>;
/* Метод для получения списка операций */
export const getPaymentOperationList = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { customerCode, ...rest } = params;

  const optionalQueries = Object.fromEntries(
    Object.entries(rest).filter(([_, v]) => v !== undefined)
  );

  const query = `?${stringify({
    customerCode,
    ...optionalQueries,
  })}`;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/acquiring/${apiVersion}/payments${query}`;

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
