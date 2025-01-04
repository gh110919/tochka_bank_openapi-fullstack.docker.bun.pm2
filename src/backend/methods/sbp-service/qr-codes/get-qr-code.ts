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
    payload: string;
    accountId: string;
    status: string;
    createdAt: string;
    merchantId: string;
    legalId: string;
    qrcId: string;
    amount: number;
    commissionPercent: number;
    currency: string;
    paymentPurpose: string;
    qrcType: string;
    templateVersion: string;
    sourceName: string;
    ttl: string;
    image: {
      width: number;
      height: number;
      mediaType: string;
      content: string;
    };
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
/* Метод для получения информации о QR-коде */
export const getQrCode = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { qrcId } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/qr-code/${qrcId}`;

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
