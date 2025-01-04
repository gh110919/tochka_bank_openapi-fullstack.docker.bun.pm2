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
    Transactions: {
      accountId: string;
      pan: string;
      dateTime: string;
      Amount: { amount: number; currency: string };
      AccountAmount: { amount: number; currency: string };
      TerminalData: {
        city: string;
        location: string;
        owner: string;
      };
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
  accountId: string;
  data: T;
}>;
/* Метод получения авторизованных карточных транзакций конкретного счета */
export const getAuthorizedCardTransactions = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { accountId } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/open-banking/${apiVersion}/accounts/${accountId}/authorized-card-transactions`;

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
