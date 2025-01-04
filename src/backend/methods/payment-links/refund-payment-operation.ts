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
    amount: string;
  };
};

type TResponse = {
  Data: {
    isRefund: boolean;
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
/* Метод для возврата платежа по карте */
export const refundPaymentOperation = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { operationId, data } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/acquiring/${apiVersion}/payments/${operationId}/refund`;

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
