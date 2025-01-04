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
    qrCodeStatus: string;
    trxStatus: string;
    trxId: string;
    amount: number;
    dateTime: string;
    payerId: string;
    kzo: string;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  qrcId: string;
  data: T;
}>;
/* Метод для получения статуса кассового QR-кода. */
export const getCashboxQrcodeOperationInfo = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { qrcId } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/cashbox-qr-code/${qrcId}/operation`;

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
