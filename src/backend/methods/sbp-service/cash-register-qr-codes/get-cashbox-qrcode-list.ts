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
    qrCodes: {
      payload: string;
      accountId: string;
      merchantId: string;
      legalId: string;
      createdAt: string;
      qrcId: string;
      amount: number;
      currency: string;
      paymentPurpose: string;
      paramsId: string;
      ttl: number;
      commission: {
        mcc: string;
        percent: number;
        description: string;
      };
      redirectUrl: string;
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
  merchantId: string;
  accountId: string;
  data: T;
}>;

/* Метод для получения списка кассовых QR-кодов */
export const getCashboxQrcodeList = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { merchantId, accountId } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/cashbox-qr-code/merchant/${merchantId}/${accountId}`;

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
